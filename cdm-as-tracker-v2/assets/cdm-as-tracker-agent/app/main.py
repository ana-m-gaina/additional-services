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
from fastapi import FastAPI, HTTPException, Request
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
        "description": "Agent-native AI orchestrator for CDM Additional Services.",
        "capabilities": {"skills": [
            {"name": "rr-lookup"},
            {"name": "pricing-lookup"},
            {"name": "request-management"},
            {"name": "jira-o2i"},
            {"name": "panel-rendering"},
            {"name": "client-routing"},
            {"name": "inbox-management"},
        ]},
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
