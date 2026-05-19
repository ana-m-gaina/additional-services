"""FastAPI entrypoint for the CDM AS Tracker agent service."""
# auto_instrument MUST be called before any AI framework imports
try:
    from sap_cloud_sdk.telemetry import auto_instrument
    auto_instrument()
except ImportError:
    pass  # not available in local dev without SAP SDK

# Load .env for local development (no-op if python-dotenv not installed)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

import logging
import os
import time
import asyncio
import json
from pathlib import Path

import httpx
import jwt
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import BaseModel

from app.agents import orchestrator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

_XSUAA_URL = os.environ.get("XSUAA_URL")
_USE_XSUAA = bool(_XSUAA_URL)

# ── JWKS cache ────────────────────────────────────────────────────────────────

_jwks_cache: dict | None = None
_jwks_fetched_at: float = 0.0
_JWKS_TTL = 3600.0  # refresh JWKS once per hour


async def _get_jwks() -> dict:
    global _jwks_cache, _jwks_fetched_at
    if _jwks_cache and (time.monotonic() - _jwks_fetched_at) < _JWKS_TTL:
        return _jwks_cache
    async with httpx.AsyncClient(timeout=10.0) as c:
        resp = await c.get(f"{_XSUAA_URL}/token_keys")
        resp.raise_for_status()
    _jwks_cache = resp.json()
    _jwks_fetched_at = time.monotonic()
    return _jwks_cache


def _decode_token(token: str, jwks: dict) -> dict:
    """Validate token signature + expiry using the XSUAA JWKS."""
    header = jwt.get_unverified_header(token)
    kid = header.get("kid")
    key = None
    for jwk in jwks.get("keys", []):
        if jwk.get("kid") == kid or kid is None:
            key = jwt.algorithms.RSAAlgorithm.from_jwk(jwk)
            break
    if key is None:
        raise jwt.InvalidKeyError("No matching JWK found")
    return jwt.decode(token, key, algorithms=["RS256"], options={"verify_exp": True})


app = FastAPI(title="CDM AS Tracker Agent v2", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Bearer auth middleware (active only when XSUAA_URL is set) ────────────────

_UNPROTECTED = {"/health", "/.well-known/agent.json"}

@app.middleware("http")
async def xsuaa_auth(request: Request, call_next):
    if not _USE_XSUAA or request.url.path in _UNPROTECTED:
        return await call_next(request)

    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return JSONResponse(status_code=401, content={"detail": "Missing Bearer token"})

    token = auth_header[len("Bearer "):]
    try:
        jwks = await _get_jwks()
        claims = _decode_token(token, jwks)
    except jwt.ExpiredSignatureError:
        return JSONResponse(status_code=401, content={"detail": "Token expired"})
    except Exception as exc:
        logger.warning("JWT validation failed: %s", exc)
        return JSONResponse(status_code=401, content={"detail": "Invalid token"})

    # Expose claims so route handlers can read them (e.g. for cdm_email)
    request.state.jwt_claims = claims
    return await call_next(request)


class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"
    card_context: str | None = None
    cdm_email: str | None = None
    assistant_name: str | None = None
    customer_agent_id: str | None = None


class ChatResponse(BaseModel):
    reply: str
    panels: list | None = None
    proposedLayout: dict | None = None
    renameAssistant: str | None = None


@app.get("/.well-known/agent.json")
async def agent_card():
    return {
        "name": "CDM AS Tracker Agent v2",
        "version": "2.0.0",
        "description": (
            "Agent-native AI orchestrator for CDM Additional Services. Claude drives the UI by "
            "returning panel specs. Routes to R&R, Pricing, Request Management, and O2I specialist "
            "subagents. Maintains per-session conversation memory. Supports Customer→Contract agent "
            "delegation and Inbox/PendingActions automation."
        ),
        "capabilities": {
            "skills": [
                {"name": "rr-lookup",          "description": "Look up R&R service code chargeability and category"},
                {"name": "pricing-lookup",     "description": "Look up current prices for AS service codes"},
                {"name": "request-management", "description": "Create and manage AS request lifecycle"},
                {"name": "jira-o2i",           "description": "Generate and submit JIRA Order-to-Invoice tickets"},
                {"name": "panel-rendering",    "description": "Render UI panels (record-card, table, email-draft, kpi-strip, etc.)"},
                {"name": "inbox-management",   "description": "Surface and resolve PendingAction items in CDM Inbox"},
                {"name": "meeting-notes",      "description": "Process OPS meeting notes into structured JSON with 10 analysis sections"},
            ]
        },
        "authentication": {"type": "bearer"},
        "streaming": {"enabled": True, "endpoint": "/api/chat/stream"},
        "models": [{"name": "claude-opus-4-7", "executableId": "anthropic"}],
        "endpoints": [
            {"path": "/api/chat",        "method": "POST"},
            {"path": "/api/chat/stream", "method": "POST"},
        ],
    }


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest, request: Request):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    cdm_email = req.cdm_email
    if not cdm_email:
        claims = getattr(request.state, "jwt_claims", {})
        cdm_email = claims.get("email") or claims.get("user_name")
    try:
        result = await orchestrator.run(
            message=req.message,
            session_id=req.session_id,
            card_context=req.card_context,
            cdm_email=cdm_email,
            assistant_name=req.assistant_name,
            customer_agent_id=req.customer_agent_id,
        )
        return ChatResponse(**result)
    except Exception as exc:
        logger.exception("Orchestrator error")
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest, request: Request):
    """SSE endpoint — emits activity events while the orchestrator runs, then the final result."""
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    cdm_email = req.cdm_email
    if not cdm_email:
        claims = getattr(request.state, "jwt_claims", {})
        cdm_email = claims.get("email") or claims.get("user_name")

    queue: asyncio.Queue = asyncio.Queue()

    async def activity_cb(msg: str):
        await queue.put({"type": "activity", "text": msg})

    async def run_orchestrator():
        try:
            result = await orchestrator.run(
                message=req.message,
                session_id=req.session_id,
                card_context=req.card_context,
                cdm_email=cdm_email,
                assistant_name=req.assistant_name,
                activity_callback=activity_cb,
                customer_agent_id=req.customer_agent_id,
            )
            await queue.put({"type": "result", **result})
        except Exception as exc:
            logger.exception("Orchestrator stream error")
            await queue.put({"type": "error", "detail": str(exc)})
        finally:
            await queue.put(None)  # sentinel

    async def event_generator():
        asyncio.create_task(run_orchestrator())
        while True:
            item = await queue.get()
            if item is None:
                break
            yield f"data: {json.dumps(item)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/api/rr/document/{doc_id}/file")
async def serve_rr_document(doc_id: str):
    """Serve an ingested R&R PDF from disk so the browser can open it."""
    from app import cap_client as cc
    try:
        doc = await cc.get_rr_document(doc_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Document not found")
    filepath = doc.get("filepath", "")
    if not filepath or not Path(filepath).is_file():
        raise HTTPException(status_code=404, detail=f"File not on disk: {filepath}")
    return FileResponse(
        path=filepath,
        media_type="application/pdf",
        filename=doc.get("filename", "document.pdf"),
        headers={"Content-Disposition": "inline"},
    )


class SkillAnalysisRequest(BaseModel):
    skill_text: str


@app.post("/api/analyze-skill")
async def analyze_skill(req: SkillAnalysisRequest):
    """Analyze a pasted skill definition and return structured metadata."""
    if not req.skill_text.strip():
        raise HTTPException(status_code=400, detail="skill_text is required")

    from app.anthropic_client import chat_with_history

    system = (
        "You are a technical writer analyzing Claude Code skill definitions. "
        "Return ONLY valid JSON — no prose, no markdown fences."
    )
    prompt = f"""Analyze this skill definition and return a JSON object with exactly these keys:

{{
  "title": "short human-readable name for the skill",
  "summary": "one or two sentences describing what the skill does",
  "inputs": [
    {{"name": "...", "description": "..."}}
  ],
  "outputs": [
    {{"name": "...", "description": "..."}}
  ],
  "gotchas": [
    {{"severity": "high|medium|low", "text": "description of the risk or non-obvious constraint"}}
  ]
}}

Rules:
- inputs = what the user/caller must provide or what the skill reads
- outputs = what artefacts or side-effects the skill produces
- gotchas = risks, non-obvious constraints, tool calls it requires, or things that can silently fail
- severity: high = blocks the skill from working, medium = degrades result quality, low = minor quirk
- Be specific and concise. Maximum 5 items in each list.

Skill text:
\"\"\"
{req.skill_text[:12000]}
\"\"\"
"""

    try:
        raw = await chat_with_history(system, [{"role": "user", "content": prompt}], max_tokens=1024)
        result = json.loads(raw.strip())
    except json.JSONDecodeError:
        raise HTTPException(status_code=502, detail="LLM returned non-JSON response")
    except Exception as exc:
        logger.exception("analyze-skill error")
        raise HTTPException(status_code=500, detail=str(exc))

    return result


@app.post("/api/extract-text")
async def extract_text(file: UploadFile = File(...)):
    """Extract plain text from an uploaded PDF, DOCX, or text file."""
    content = await file.read()
    filename = (file.filename or "").lower()

    try:
        if filename.endswith(".pdf"):
            import io
            from pypdf import PdfReader
            reader = PdfReader(io.BytesIO(content))
            pages = [page.extract_text() or "" for page in reader.pages]
            text = "\n".join(pages).strip()

        elif filename.endswith(".docx"):
            import io
            import re
            import zipfile
            import xml.etree.ElementTree as ET
            with zipfile.ZipFile(io.BytesIO(content)) as z:
                with z.open("word/document.xml") as f:
                    tree = ET.parse(f)
            ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            lines = []
            for para in tree.findall(f".//{{{ns}}}p"):
                runs = "".join(r.text or "" for r in para.findall(f".//{{{ns}}}t"))
                if runs.strip():
                    lines.append(runs)
            text = "\n".join(lines).strip()

        elif filename.endswith((".txt", ".md", ".html", ".csv")):
            text = content.decode("utf-8", errors="replace").strip()

        else:
            raise HTTPException(status_code=415, detail=f"Unsupported file type: {file.filename}")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {e}")

    if not text:
        raise HTTPException(status_code=422, detail="No text could be extracted from the file.")

    return {"text": text, "filename": file.filename, "chars": len(text)}
