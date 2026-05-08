"""
R&R PDF ingestion script — chunks PDFs by page, embeds with Anthropic Voyage, stores in CAP DB.

Setup (one-time):
  1. Set ANTHROPIC_API_KEY in .env
  2. Install deps:    pip install -r requirements.txt
  3. Start CAP:       cd ../cdm-as-tracker-cap && cds watch

Usage:
  python scripts/ingest_rr.py
  python scripts/ingest_rr.py --docs-dir /path/to/pdfs --cap-url http://localhost:4004
"""
import argparse
import asyncio
import json
import logging
import os
from datetime import datetime, timezone
from pathlib import Path

import httpx
import numpy as np
from pypdf import PdfReader

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
log = logging.getLogger(__name__)

DEFAULT_DOCS_DIR = Path(__file__).resolve().parents[4] / "specs"
DEFAULT_CAP_URL  = "http://localhost:4004"
VOYAGE_URL       = "https://api.anthropic.com/v1/embeddings"
EMBED_MODEL      = "voyage-3"
CAP_USER         = os.environ.get("CAP_USER", "pricingadmin")
CAP_PASSWORD     = os.environ.get("CAP_PASSWORD", "pricingadmin")

MAX_CHARS = 4000  # voyage-3 supports 32k tokens; 4000 chars ≈ 1000 tokens, safe chunking size


def _split(text: str) -> list[str]:
    """Split text into chunks of at most MAX_CHARS, breaking on newlines where possible."""
    if len(text) <= MAX_CHARS:
        return [text]
    chunks, start = [], 0
    while start < len(text):
        end = start + MAX_CHARS
        if end >= len(text):
            chunks.append(text[start:])
            break
        split_at = text.rfind('\n', start, end)
        if split_at <= start:
            split_at = end
        chunks.append(text[start:split_at].strip())
        start = split_at
    return [c for c in chunks if c]




async def embed(text: str) -> list[float]:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    async with httpx.AsyncClient(timeout=60.0) as c:
        resp = await c.post(
            VOYAGE_URL,
            headers={"x-api-key": api_key, "anthropic-version": "2023-06-01"},
            json={"model": EMBED_MODEL, "input": [text]},
        )
        resp.raise_for_status()
    return resp.json()["data"][0]["embedding"]


# ── CAP OData helpers ─────────────────────────────────────────────────────────

async def cap_get(client: httpx.AsyncClient, cap_url: str, path: str) -> dict:
    resp = await client.get(f"{cap_url}/AdminService/{path}", timeout=30.0)
    resp.raise_for_status()
    return resp.json()


async def cap_post(client: httpx.AsyncClient, cap_url: str, path: str, data: dict) -> dict:
    resp = await client.post(
        f"{cap_url}/AdminService/{path}",
        json=data,
        timeout=30.0,
    )
    resp.raise_for_status()
    return resp.json()


# ── Main ingestion ────────────────────────────────────────────────────────────

async def ingest(docs_dir: Path, cap_url: str) -> None:
    pdfs = sorted(docs_dir.glob("*.pdf"))
    if not pdfs:
        log.warning("No PDF files found in %s", docs_dir)
        return

    log.info("Found %d PDF(s) in %s", len(pdfs), docs_dir)

    auth = (CAP_USER, CAP_PASSWORD)
    async with httpx.AsyncClient(auth=auth, headers={"Accept": "application/json"}) as cap:
        # fetch already-ingested documents to allow idempotent re-runs
        existing = await cap_get(cap, cap_url, "RRDocuments?$select=filename")
        ingested_names = {d["filename"] for d in existing.get("value", [])}

        for pdf_path in pdfs:
            filename = pdf_path.name

            if filename in ingested_names:
                log.info("Skipping (already ingested): %s", filename)
                continue

            log.info("Ingesting: %s", filename)
            reader = PdfReader(str(pdf_path))
            page_count = len(reader.pages)

            # create document record
            doc = await cap_post(cap, cap_url, "RRDocuments", {
                "filename":   filename,
                "filepath":   str(pdf_path.resolve()),
                "pageCount":  page_count,
                "uploadedAt": datetime.now(timezone.utc).isoformat(),
            })
            doc_id = doc["ID"]
            log.info("  Created RRDocument %s (%d pages)", doc_id, page_count)

            # embed each page, splitting if the page text is too long
            chunk_count = 0
            for page_num, page in enumerate(reader.pages, start=1):
                text = (page.extract_text() or "").strip()
                if not text:
                    continue

                sub_chunks = _split(text)
                for sub_idx, chunk_text in enumerate(sub_chunks):
                    try:
                        vector = await embed(chunk_text)
                    except Exception as exc:
                        log.warning("  Skipping chunk p%d[%d]: %s", page_num, sub_idx, exc)
                        continue
                    await cap_post(cap, cap_url, "RRChunks", {
                        "document_ID": doc_id,
                        "pageNumber":  page_num,
                        "text":        chunk_text,
                        "embedding":   json.dumps(vector),
                    })
                    chunk_count += 1
                if chunk_count % 10 == 0 and chunk_count > 0:
                    log.info("  ... %d chunks embedded", chunk_count)

            log.info("  Done: %d chunks from %s", chunk_count, filename)

    log.info("Ingestion complete.")


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest R&R PDFs into CAP DB via Ollama embeddings")
    parser.add_argument("--docs-dir", type=Path, default=DEFAULT_DOCS_DIR,
                        help=f"Directory containing PDFs (default: {DEFAULT_DOCS_DIR})")
    parser.add_argument("--cap-url", default=DEFAULT_CAP_URL,
                        help=f"CAP service base URL (default: {DEFAULT_CAP_URL})")
    args = parser.parse_args()

    if not args.docs_dir.is_dir():
        raise SystemExit(f"docs-dir not found: {args.docs_dir}")

    asyncio.run(ingest(args.docs_dir, args.cap_url))


if __name__ == "__main__":
    main()
