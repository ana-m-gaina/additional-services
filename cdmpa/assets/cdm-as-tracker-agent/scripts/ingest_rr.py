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
import time
from dotenv import load_dotenv
load_dotenv()
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
VOYAGE_URL       = "https://api.voyageai.com/v1/embeddings"
EMBED_MODEL      = "voyage-4"
CAP_USER         = os.environ.get("CAP_USER", "pricingadmin")
CAP_PASSWORD     = os.environ.get("CAP_PASSWORD", "pricingadmin")
_API_KEY         = os.environ.get("VOYAGE_API_KEY", "")

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




async def embed_batch(texts: list[str]) -> list[list[float]]:
    for attempt in range(6):
        async with httpx.AsyncClient(timeout=60.0) as c:
            resp = await c.post(
                VOYAGE_URL,
                headers={"Authorization": f"Bearer {_API_KEY}", "Content-Type": "application/json"},
                json={"model": EMBED_MODEL, "input": texts},
            )
        if resp.status_code == 429:
            wait = 20 * (attempt + 1)
            log.info("  Rate limited — waiting %ds (attempt %d/6)", wait, attempt + 1)
            await asyncio.sleep(wait)
            continue
        resp.raise_for_status()
        data = resp.json()["data"]
        return [item["embedding"] for item in sorted(data, key=lambda x: x["index"])]
    raise RuntimeError("Exceeded retry limit on rate limit")


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
        existing_docs = await cap_get(cap, cap_url, "RRDocuments?$select=ID,filename,pageCount")
        doc_by_name = {d["filename"]: d for d in existing_docs.get("value", [])}

        for pdf_path in pdfs:
            filename = pdf_path.name
            reader = PdfReader(str(pdf_path))
            page_count = len(reader.pages)

            if filename in doc_by_name:
                doc = doc_by_name[filename]
                doc_id = doc["ID"]
                # check if fully ingested
                chunk_data = await cap_get(cap, cap_url,
                    f"RRChunks?$filter=document_ID eq '{doc_id}'&$select=pageNumber&$top=5000")
                ingested_pages = {c["pageNumber"] for c in chunk_data.get("value", [])}
                remaining = [i for i in range(1, page_count + 1) if i not in ingested_pages]
                if not remaining:
                    log.info("Skipping (fully ingested): %s", filename)
                    continue
                log.info("Resuming %s — %d pages already done, %d remaining",
                         filename, len(ingested_pages), len(remaining))
            else:
                doc = await cap_post(cap, cap_url, "RRDocuments", {
                    "filename":   filename,
                    "filepath":   str(pdf_path.resolve()),
                    "pageCount":  page_count,
                    "uploadedAt": datetime.now(timezone.utc).isoformat(),
                })
                doc_id = doc["ID"]
                remaining = list(range(1, page_count + 1))
                log.info("Created RRDocument %s (%d pages)", doc_id, page_count)

            # collect all chunks for remaining pages, then embed in batches of 10
            remaining_set = set(remaining)
            pending: list[tuple[int, str]] = []  # (page_num, chunk_text)
            for page_num, page in enumerate(reader.pages, start=1):
                if page_num not in remaining_set:
                    continue
                text = (page.extract_text() or "").strip()
                if not text:
                    continue
                for chunk_text in _split(text):
                    pending.append((page_num, chunk_text))

            BATCH = 10
            chunk_count = 0
            for i in range(0, len(pending), BATCH):
                batch = pending[i:i + BATCH]
                try:
                    vectors = await embed_batch([t for _, t in batch])
                except Exception as exc:
                    log.warning("  Skipping batch %d-%d: %s", i, i + BATCH, exc)
                    continue
                for (page_num, chunk_text), vector in zip(batch, vectors):
                    await cap_post(cap, cap_url, "RRChunks", {
                        "document_ID": doc_id,
                        "pageNumber":  page_num,
                        "text":        chunk_text,
                        "embedding":   json.dumps(vector),
                    })
                    chunk_count += 1
                log.info("  ... %d/%d chunks embedded", chunk_count, len(pending))

            log.info("  Done: %d new chunks from %s", chunk_count, filename)

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
