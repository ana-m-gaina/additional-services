"""R&R specialist subagent — two-stage retrieval: cosine + keyword, then Claude reasons over all candidates."""
import json
import logging
import os
import re

import httpx
import numpy as np

from app import cap_client, anthropic_client

logger = logging.getLogger(__name__)

VOYAGE_URL       = "https://api.voyageai.com/v1/embeddings"
EMBED_MODEL      = "voyage-4"
COSINE_THRESHOLD = 0.3
COSINE_TOP_K     = 15
MAX_CONTEXT_CHARS = 40000

_SYSTEM = """You are an expert on SAP CDM Additional Services Roles and Responsibilities.

You will be given excerpts from the official R&R PDF documents. Read ALL of them carefully, then answer the question.

Return a JSON object with this exact shape:

{
  "summary": "1-2 sentence plain-language answer based only on the excerpts",
  "matches": [
    {
      "code": "TO_PA_1.1.01",
      "name": "Short description of the task",
      "responsibility": "SAP",
      "chargeable": false,
      "note": "optional short clarification quoted from the excerpt"
    }
  ],
  "confidence": "HIGH" | "MEDIUM" | "LOW"
}

Rules:
- "responsibility" must be exactly one of: "SAP", "Customer", "Shared"
- "chargeable" is true if classified as "Additional Service" or "Packaged Service" (customer pays), false if "Standard Services" or "Excluded Tasks"
- Include ALL matching service codes you find across ALL excerpts — there may be several
- If no specific service code is found, return matches: [] and set confidence to "LOW"
- If the excerpts do not directly answer the question, say so honestly — do NOT invent an answer
- NEVER invent or guess service codes. Only return codes explicitly found in the excerpts.
- Set confidence to "HIGH" if an excerpt directly names the code and its responsibility/chargeability
- Set confidence to "MEDIUM" if the excerpt implies it but does not state it explicitly
- Return ONLY the JSON object, no other text, no markdown fences."""


def capabilities() -> list[str]:
    return ["rr_lookup: look up R&R chargeability and service category by description or code"]


async def _embed(text: str) -> np.ndarray:
    api_key = os.environ.get("VOYAGE_API_KEY", "")
    async with httpx.AsyncClient(timeout=30.0) as c:
        resp = await c.post(
            VOYAGE_URL,
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={"model": EMBED_MODEL, "input": [text]},
        )
        resp.raise_for_status()
    return np.array(resp.json()["data"][0]["embedding"], dtype=np.float32)


def _cosine(a: np.ndarray, b: np.ndarray) -> float:
    denom = np.linalg.norm(a) * np.linalg.norm(b)
    return float(np.dot(a, b) / denom) if denom else 0.0


def _keyword_terms(query: str) -> list[str]:
    """Extract meaningful search terms from the query (2+ char words, lowercased)."""
    stopwords = {'is', 'an', 'a', 'the', 'in', 'of', 'for', 'to', 'and', 'or',
                 'what', 'who', 'does', 'do', 'are', 'can', 'will', 'be', 'it',
                 'this', 'that', 'which', 'how', 'service', 'code', 'applies'}
    words = re.findall(r'\b\w{3,}\b', query.lower())
    return [w for w in words if w not in stopwords]


def _parse_structured(raw: str) -> dict:
    """Extract JSON from Claude response, tolerating markdown fences."""
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except Exception:
            pass
    return {"summary": raw, "matches": [], "confidence": "LOW"}


async def run(query: str) -> dict:
    # 1. Embed the query
    try:
        query_vec = await _embed(query)
        use_embeddings = True
    except Exception as exc:
        logger.warning("Voyage embedding failed: %s — using keyword-only retrieval", exc)
        query_vec = None
        use_embeddings = False

    # 2. Load all chunks
    chunks = await cap_client.get_rr_chunks()
    if not chunks:
        return {
            "summary": "No R&R documents have been ingested yet. Run scripts/ingest_rr.py first.",
            "matches": [], "confidence": "LOW", "sources": [], "answer": ""
        }

    # 3. Score every chunk — cosine similarity + keyword presence
    terms = _keyword_terms(query)
    scored: list[tuple[dict, float]] = []

    for chunk in chunks:
        text_lower = chunk.get("text", "").lower()
        score = 0.0

        # Cosine component
        if use_embeddings:
            try:
                vec = np.array(json.loads(chunk["embedding"]), dtype=np.float32)
                score = _cosine(query_vec, vec)
            except Exception:
                pass

        # Keyword boost: each matching term adds 0.1
        keyword_hits = sum(1 for t in terms if t in text_lower)
        score += keyword_hits * 0.1

        scored.append((chunk, score, keyword_hits))

    scored.sort(key=lambda x: x[1], reverse=True)

    # 4. Select candidates: above threshold OR has keyword hits, up to COSINE_TOP_K
    candidates = []
    total_chars = 0
    for chunk, score, kw_hits in scored:
        if score < COSINE_THRESHOLD and kw_hits == 0:
            break  # sorted descending — everything below here is irrelevant
        text = chunk.get("text", "")
        if total_chars + len(text) > MAX_CONTEXT_CHARS:
            break
        candidates.append((chunk, score))
        total_chars += len(text)
        if len(candidates) >= COSINE_TOP_K:
            break

    # Fall back to top-5 if nothing passed the threshold
    if not candidates:
        candidates = [(c, s) for c, s, _ in scored[:5]]

    logger.info("rr_agent: %d candidates selected for query %r", len(candidates), query[:60])

    # 5. Build context and deduplicate sources by page
    context_parts = []
    sources = []
    seen_docs: dict[str, dict] = {}
    seen_pages: set[tuple] = set()

    for chunk, score in candidates:
        doc_id = chunk.get("document_ID") or chunk.get("document", {}).get("ID", "")
        page   = chunk.get("pageNumber", "?")
        text   = chunk.get("text", "")

        if doc_id and doc_id not in seen_docs:
            try:
                seen_docs[doc_id] = await cap_client.get_rr_document(doc_id)
            except Exception:
                seen_docs[doc_id] = {"filename": "R&R Document", "filepath": ""}

        doc   = seen_docs.get(doc_id, {})
        fname = doc.get("filename", "R&R Document")
        fpath = doc.get("filepath", "")

        context_parts.append(f"[{fname}, page {page}]\n{text}")

        page_key = (doc_id, page)
        if page_key not in seen_pages:
            seen_pages.add(page_key)
            sources.append({
                "filename": fname,
                "filepath": fpath,
                "pageNumber": page,
                "docId": doc_id,
                "score": round(score, 3),
            })

    context = "\n\n---\n\n".join(context_parts)
    prompt  = f"EXCERPTS FROM R&R DOCUMENTS ({len(candidates)} sections):\n\n{context}\n\nQUESTION: {query}"

    raw = await anthropic_client.chat(_SYSTEM, prompt)
    structured = _parse_structured(raw)

    # Only surface pages that actually contain one of the matched codes
    matched_codes = {m["code"] for m in structured.get("matches", [])}
    if matched_codes:
        filtered_sources = []
        seen_pages: set[tuple] = set()
        for chunk, score in candidates:
            text = chunk.get("text", "")
            if not any(code in text for code in matched_codes):
                continue
            doc_id = chunk.get("document_ID") or chunk.get("document", {}).get("ID", "")
            page   = chunk.get("pageNumber", "?")
            page_key = (doc_id, page)
            if page_key in seen_pages:
                continue
            seen_pages.add(page_key)
            doc   = seen_docs.get(doc_id, {})
            filtered_sources.append({
                "filename":   doc.get("filename", "R&R Document"),
                "filepath":   doc.get("filepath", ""),
                "pageNumber": page,
                "docId":      doc_id,
                "score":      round(score, 3),
            })
        structured["sources"] = filtered_sources
    else:
        structured["sources"] = []  # no codes → no pages to open

    structured["answer"] = structured.get("summary", "")
    return structured


async def _keyword_fallback(query: str) -> dict:
    """Fallback when Ollama is unavailable — use structured RRTable entries."""
    rr_data = await cap_client.get_rr_entries()
    context = "\n".join(
        f"- {r.get('serviceCode', '?')}: {r.get('serviceName', '?')} "
        f"[{r.get('category', '?')}] Chargeable={r.get('chargeable', '?')}"
        for r in rr_data
    )
    raw = await anthropic_client.chat(_SYSTEM, f"R&R TABLE:\n{context}\n\nQUESTION: {query}")
    structured = _parse_structured(raw)
    structured["sources"] = []
    structured["answer"] = structured.get("summary", "")
    return structured
