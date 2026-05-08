"""Pricing specialist subagent — RAG over PricingChunks, same two-stage retrieval as rr_agent."""
import json
import logging
import os
import re

import httpx
import numpy as np

from app import cap_client, anthropic_client

logger = logging.getLogger(__name__)

VOYAGE_URL       = "https://api.anthropic.com/v1/embeddings"
EMBED_MODEL      = "voyage-3"
COSINE_THRESHOLD = 0.25
COSINE_TOP_K     = 10
MAX_CONTEXT_CHARS = 20000

_SYSTEM = """You are an expert on SAP Enterprise Cloud Services Additional Services pricing.

You will be given entries from the official AS Pricing List. Each entry includes the service code,
name, price (if fixed), unit of measure, effort type, lead time, and remarks.

Answer the question based ONLY on the provided entries. Return a JSON object:

{
  "answer": "1-2 sentence plain-language answer",
  "price_entries": [
    {
      "code": "INFRA_1.8.10",
      "name": "On-demand backup / Extension of existing on-demand backup",
      "price_eur": 596.0,
      "unit": "per SID",
      "effort_type": "Standard",
      "notes": "optional clarification from the entry"
    }
  ],
  "confidence": "HIGH" | "MEDIUM" | "LOW"
}

Rules:
- If a fixed price is listed, set price_eur to that number
- If effort_type is "Case-by-case" or no price is listed, set price_eur to null and explain in notes
- Set confidence HIGH if the entry directly matches the code and has a fixed price
- Set confidence MEDIUM if it matches but price is case-by-case
- Set confidence LOW if no matching entry found
- NEVER invent prices. Only report what is explicitly in the entries.
- Return ONLY the JSON object, no markdown fences."""


def capabilities() -> list[str]:
    return ["price_lookup: retrieve current price and effort type for a service code"]


async def _embed(text: str) -> np.ndarray:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    async with httpx.AsyncClient(timeout=30.0) as c:
        resp = await c.post(
            VOYAGE_URL,
            headers={"x-api-key": api_key, "anthropic-version": "2023-06-01"},
            json={"model": EMBED_MODEL, "input": [text]},
        )
        resp.raise_for_status()
    return np.array(resp.json()["data"][0]["embedding"], dtype=np.float32)


def _cosine(a: np.ndarray, b: np.ndarray) -> float:
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    return float(np.dot(a, b) / denom) if denom else 0.0


def _keyword_terms(query: str) -> list[str]:
    stopwords = {'is', 'an', 'a', 'the', 'in', 'of', 'for', 'to', 'and', 'or',
                 'what', 'who', 'does', 'do', 'are', 'can', 'will', 'be', 'it',
                 'this', 'that', 'which', 'how', 'service', 'code', 'price', 'cost',
                 'much', 'does', 'pricing', 'charge', 'charged'}
    words = re.findall(r'\b\w{3,}\b', query.lower())
    return [w for w in words if w not in stopwords]


def _parse_structured(raw: str) -> dict:
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except Exception:
            pass
    return {"answer": raw, "price_entries": [], "confidence": "LOW"}


async def run(query: str) -> dict:
    # 1. Embed query
    try:
        query_vec = await _embed(query)
        use_embeddings = True
    except Exception as exc:
        logger.warning("Voyage embedding failed: %s — keyword-only mode", exc)
        query_vec = None
        use_embeddings = False

    # 2. Load pricing chunks
    chunks = await cap_client.get_pricing_chunks()
    if not chunks:
        return {
            "answer": "No pricing data has been ingested yet. Run scripts/ingest_pricing.py first.",
            "price_entries": [], "confidence": "LOW"
        }

    # 3. Score chunks
    terms = _keyword_terms(query)
    scored: list[tuple[dict, float, int]] = []
    for chunk in chunks:
        text_lower = chunk.get("text", "").lower()
        score = 0.0
        if use_embeddings:
            try:
                vec = np.array(json.loads(chunk["embedding"]), dtype=np.float32)
                score = _cosine(query_vec, vec)
            except Exception:
                pass
        kw_hits = sum(1 for t in terms if t in text_lower)
        # Also boost exact service code matches
        code = chunk.get("serviceCode", "")
        if code.lower() in query.lower():
            kw_hits += 3
        score += kw_hits * 0.1
        scored.append((chunk, score, kw_hits))

    scored.sort(key=lambda x: x[1], reverse=True)

    # 4. Select candidates
    candidates = []
    total_chars = 0
    for chunk, score, kw_hits in scored:
        if score < COSINE_THRESHOLD and kw_hits == 0:
            break
        text = chunk.get("text", "")
        if total_chars + len(text) > MAX_CONTEXT_CHARS:
            break
        candidates.append((chunk, score))
        total_chars += len(text)
        if len(candidates) >= COSINE_TOP_K:
            break

    if not candidates:
        candidates = [(c, s) for c, s, _ in scored[:5]]

    logger.info("pricing_agent: %d candidates for query %r", len(candidates), query[:60])

    # 5. Build context
    context = "\n\n---\n\n".join(c.get("text", "") for c, _ in candidates)
    prompt = f"PRICING ENTRIES ({len(candidates)} entries):\n\n{context}\n\nQUESTION: {query}"

    raw = await anthropic_client.chat(_SYSTEM, prompt)
    return _parse_structured(raw)
