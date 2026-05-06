"""
Async OData HTTP client for the CAP backend.
All data access from the Python agent goes through this module.

Auth strategy (auto-detected at startup):
  - XSUAA present (XSUAA_URL + XSUAA_CLIENT_ID + XSUAA_CLIENT_SECRET):
      Fetches a client-credentials Bearer token; refreshes 60 s before expiry.
  - No XSUAA vars (local dev):
      Falls back to HTTP Basic auth using CAP_USER / CAP_PASSWORD.
"""
import os
import time
import logging
from typing import Any
from urllib.parse import urlencode, quote

import httpx

logger = logging.getLogger(__name__)

CAP_SERVICE_URL       = os.environ.get("CAP_SERVICE_URL",       "http://localhost:4004/CDMService")
CAP_ADMIN_SERVICE_URL = os.environ.get("CAP_ADMIN_SERVICE_URL", "http://localhost:4004/AdminService")

_XSUAA_URL    = os.environ.get("XSUAA_URL")
_CLIENT_ID    = os.environ.get("XSUAA_CLIENT_ID")
_CLIENT_SEC   = os.environ.get("XSUAA_CLIENT_SECRET")
_USE_XSUAA    = bool(_XSUAA_URL and _CLIENT_ID and _CLIENT_SEC)

_CDM_USER     = os.environ.get("CAP_USER",     "alex")
_CDM_PASSWORD = os.environ.get("CAP_PASSWORD", "alex")


class _TokenManager:
    """Fetches and caches a client-credentials token from XSUAA."""

    def __init__(self) -> None:
        self._token: str = ""
        self._expires_at: float = 0.0

    async def token(self) -> str:
        if time.monotonic() < self._expires_at - 60:
            return self._token
        async with httpx.AsyncClient(timeout=10.0) as c:
            resp = await c.post(
                f"{_XSUAA_URL}/oauth/token",
                data={
                    "grant_type": "client_credentials",
                    "client_id": _CLIENT_ID,
                    "client_secret": _CLIENT_SEC,
                    "response_type": "token",
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            if not resp.is_success:
                raise RuntimeError(f"XSUAA token fetch failed {resp.status_code}: {resp.text[:200]}")
            body = resp.json()
        self._token = body["access_token"]
        self._expires_at = time.monotonic() + int(body.get("expires_in", 900))
        logger.info("[XSUAA] token refreshed, expires_in=%s", body.get("expires_in"))
        return self._token


_token_mgr = _TokenManager() if _USE_XSUAA else None


async def _client() -> httpx.AsyncClient:
    if _USE_XSUAA:
        token = await _token_mgr.token()
        return httpx.AsyncClient(
            timeout=30.0,
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        )
    return httpx.AsyncClient(
        auth=(_CDM_USER, _CDM_PASSWORD),
        timeout=30.0,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
    )


def _raise(resp: httpx.Response, context: str) -> None:
    if not resp.is_success:
        raise RuntimeError(f"CAP {context} failed {resp.status_code}: {resp.text[:400]}")


def _url(base: str, params: dict[str, Any]) -> str:
    """Build URL with OData query params, encoding spaces as %20 (not +)."""
    if not params:
        return base
    qs = urlencode({k: str(v) for k, v in params.items()}, quote_via=quote)
    return f"{base}?{qs}"


# ── R&R ───────────────────────────────────────────────────────────────────────

async def get_rr_entries(
    search: str | None = None,
    category: str | None = None,
    chargeable: bool | None = None,
) -> list:
    filters = ["active eq true"]
    if category:
        filters.append(f"category eq '{category}'")
    if chargeable is not None:
        filters.append(f"chargeable eq {str(chargeable).lower()}")
    if search:
        filters.append(
            f"(contains(tolower(serviceCode),tolower('{search}')) or "
            f"contains(tolower(serviceName),tolower('{search}')))"
        )
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/RRTable", {"$filter": " and ".join(filters), "$orderby": "serviceCode"})
        resp = await c.get(url)
        _raise(resp, "get_rr_entries")
        return resp.json().get("value", [])


async def get_rr_entry_by_code(service_code: str) -> dict | None:
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/RRTable", {"$filter": f"serviceCode eq '{service_code}' and active eq true"})
        resp = await c.get(url)
        _raise(resp, "get_rr_entry_by_code")
        rows = resp.json().get("value", [])
        return rows[0] if rows else None


# Alias used by tests and subagents
async def get_rr_entry(service_code: str) -> dict | None:
    return await get_rr_entry_by_code(service_code)


async def get_rr_table() -> list:
    return await get_rr_entries()


# ── Pricing ───────────────────────────────────────────────────────────────────

async def get_pricing_entry(service_code: str) -> dict | None:
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/PricingTable", {"$filter": f"serviceCode eq '{service_code}' and active eq true"})
        resp = await c.get(url)
        _raise(resp, "get_pricing_entry")
        rows = resp.json().get("value", [])
        return rows[0] if rows else None


async def get_all_pricing(search: str | None = None) -> list:
    filters = ["active eq true"]
    if search:
        filters.append(
            f"(contains(tolower(serviceCode),tolower('{search}')) or "
            f"contains(tolower(serviceName),tolower('{search}')))"
        )
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/PricingTable", {"$filter": " and ".join(filters), "$orderby": "serviceCode"})
        resp = await c.get(url)
        _raise(resp, "get_all_pricing")
        return resp.json().get("value", [])


# Alias
async def get_pricing_entries(search: str | None = None) -> list:
    return await get_all_pricing(search)


async def update_pricing_entry(entry_id: str, data: dict) -> dict:
    async with await _client() as c:
        resp = await c.patch(f"{CAP_ADMIN_SERVICE_URL}/PricingTable('{entry_id}')", json=data)
        _raise(resp, "update_pricing_entry")
        return resp.json()


# ── AS Requests ───────────────────────────────────────────────────────────────

async def get_as_request(request_id: str) -> dict:
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/ASRequest('{request_id}')", {"$expand": "activityLog"})
        resp = await c.get(url)
        _raise(resp, "get_as_request")
        return resp.json()


async def get_open_requests(cdm_email: str | None = None) -> list:
    filters = ["status ne 'Invoiced'"]
    if cdm_email:
        filters.append(f"cdmOwner eq '{cdm_email}'")
    async with await _client() as c:
        url = _url(
            f"{CAP_SERVICE_URL}/ASRequest",
            {"$filter": " and ".join(filters), "$orderby": "createdAt desc", "$expand": "activityLog"},
        )
        resp = await c.get(url)
        _raise(resp, "get_open_requests")
        return resp.json().get("value", [])


async def create_as_request(data: dict) -> dict:
    async with await _client() as c:
        resp = await c.post(f"{CAP_SERVICE_URL}/ASRequest", json=data)
        _raise(resp, "create_as_request")
        return resp.json()


async def advance_status(request_id: str, new_status: str, comment: str = "") -> dict:
    async with await _client() as c:
        resp = await c.post(
            f"{CAP_SERVICE_URL}/ASRequest('{request_id}')/CDMService.advanceStatus",
            json={"newStatus": new_status, "comment": comment},
        )
        _raise(resp, "advance_status")
        return resp.json()


async def record_approval(request_id: str, approval_text: str, po_number: str = "") -> dict:
    async with await _client() as c:
        resp = await c.post(
            f"{CAP_SERVICE_URL}/ASRequest('{request_id}')/CDMService.recordApproval",
            json={"approvalText": approval_text, "poNumber": po_number},
        )
        _raise(resp, "record_approval")
        return resp.json()


async def generate_jira_ticket(request_id: str) -> str:
    async with await _client() as c:
        resp = await c.post(
            f"{CAP_SERVICE_URL}/ASRequest('{request_id}')/CDMService.generateJiraTicket",
            json={},
        )
        _raise(resp, "generate_jira_ticket")
        val = resp.json()
        return val.get("value", str(val))


async def confirm_invoiced(request_id: str) -> dict:
    return await advance_status(request_id, "Invoiced", "Marked as invoiced by CDM")


async def patch_as_request(request_id: str, data: dict) -> dict:
    async with await _client() as c:
        resp = await c.patch(f"{CAP_SERVICE_URL}/ASRequest('{request_id}')", json=data)
        _raise(resp, "patch_as_request")
        return resp.json() if resp.text else {}


# ── Card layout ────────────────────────────────────────────────────────────────

async def get_card_layouts(user_email: str | None = None) -> list:
    params: dict[str, Any] = {}
    if user_email:
        params["$filter"] = f"userEmail eq '{user_email}'"
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/CardLayout", params)
        resp = await c.get(url)
        _raise(resp, "get_card_layouts")
        return resp.json().get("value", [])


async def save_card_layout(layouts: list) -> bool:
    async with await _client() as c:
        resp = await c.post(
            f"{CAP_SERVICE_URL}/saveCardLayout",
            json={"layouts": layouts},
        )
        _raise(resp, "save_card_layout")
        return True


# ── Persona layout ────────────────────────────────────────────────────────────

async def get_persona_layout(user_id: str) -> dict | None:
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/PersonaLayouts", {"$filter": f"userId eq '{user_id}'"})
        resp = await c.get(url)
        _raise(resp, "get_persona_layout")
        rows = resp.json().get("value", [])
        return rows[0] if rows else None


async def save_persona_layout(user_id: str, layout_json: str) -> None:
    async with await _client() as c:
        resp = await c.post(
            f"{CAP_SERVICE_URL}/savePersonaLayout",
            json={"layoutJson": layout_json},
        )
        _raise(resp, "save_persona_layout")


# ── Conversation memory ────────────────────────────────────────────────────────

async def get_conversation_turns(user_id: str, session_id: str, limit: int = 20) -> list:
    async with await _client() as c:
        url = _url(
            f"{CAP_SERVICE_URL}/ConversationTurns",
            {
                "$filter": f"userId eq '{user_id}' and sessionId eq '{session_id}'",
                "$orderby": "createdAt asc",
                "$top": str(limit),
            },
        )
        resp = await c.get(url)
        _raise(resp, "get_conversation_turns")
        return resp.json().get("value", [])


async def save_conversation_turns(turns: list) -> None:
    """Batch-insert conversation turns via individual POSTs."""
    async with await _client() as c:
        for turn in turns:
            resp = await c.post(f"{CAP_SERVICE_URL}/ConversationTurns", json=turn)
            _raise(resp, "save_conversation_turn")


# ── Client / Contract agent hierarchy ─────────────────────────────────────────

async def get_client_agents() -> list:
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/ClientAgents", {"$orderby": "displayName"})
        resp = await c.get(url)
        _raise(resp, "get_client_agents")
        return resp.json().get("value", [])


async def get_contract_subagents(client_id: str | None = None) -> list:
    params: dict[str, Any] = {"$orderby": "displayName"}
    if client_id:
        params["$filter"] = f"clientId eq '{client_id}'"
    async with await _client() as c:
        url = _url(f"{CAP_SERVICE_URL}/ContractSubagents", params)
        resp = await c.get(url)
        _raise(resp, "get_contract_subagents")
        return resp.json().get("value", [])


async def register_client(customer_id: str, display_name: str, created_by: str) -> dict:
    import uuid
    data = {
        "ID": str(uuid.uuid4()),
        "customerId": customer_id,
        "displayName": display_name,
        "createdBy": created_by,
        "createdAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
    }
    async with await _client() as c:
        resp = await c.post(f"{CAP_SERVICE_URL}/ClientAgents", json=data)
        _raise(resp, "register_client")
        return resp.json()


async def register_contract(
    client_id: str, sid: str, display_name: str, contract_type: str
) -> dict:
    import uuid
    data = {
        "ID": str(uuid.uuid4()),
        "clientId": client_id,
        "sid": sid,
        "displayName": display_name,
        "contractType": contract_type,
        "createdAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
    }
    async with await _client() as c:
        resp = await c.post(f"{CAP_SERVICE_URL}/ContractSubagents", json=data)
        _raise(resp, "register_contract")
        return resp.json()


# ── Automation agents & Pending actions (Inbox) ────────────────────────────────

async def get_automation_agents() -> list:
    async with await _client() as c:
        resp = await c.get(f"{CAP_SERVICE_URL}/AutomationAgents")
        _raise(resp, "get_automation_agents")
        return resp.json().get("value", [])


async def get_pending_actions(user_id: str, status: str = "pending") -> list:
    async with await _client() as c:
        url = _url(
            f"{CAP_SERVICE_URL}/PendingActions",
            {
                "$filter": f"userId eq '{user_id}' and status eq '{status}'",
                "$orderby": "createdAt desc",
            },
        )
        resp = await c.get(url)
        _raise(resp, "get_pending_actions")
        return resp.json().get("value", [])


async def create_pending_action(data: dict) -> dict:
    async with await _client() as c:
        resp = await c.post(f"{CAP_SERVICE_URL}/PendingActions", json=data)
        _raise(resp, "create_pending_action")
        return resp.json()


async def resolve_pending_action(
    action_id: str, status: str, recorded_data: dict | None = None
) -> dict:
    patch_data: dict[str, Any] = {
        "status": status,
        "resolvedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
    }
    async with await _client() as c:
        resp = await c.patch(f"{CAP_SERVICE_URL}/PendingActions('{action_id}')", json=patch_data)
        _raise(resp, "resolve_pending_action")
        if recorded_data:
            pa_resp = await c.get(f"{CAP_SERVICE_URL}/PendingActions('{action_id}')")
            if pa_resp.is_success:
                pa = pa_resp.json()
                if pa.get("relatedRequestId") and recorded_data:
                    await patch_as_request(pa["relatedRequestId"], recorded_data)
        return resp.json() if resp.text else {"status": status}


# ── Admin config ───────────────────────────────────────────────────────────────

async def get_admin_config() -> dict:
    async with await _client() as c:
        resp = await c.get(f"{CAP_SERVICE_URL}/AdminConfigs")
        _raise(resp, "get_admin_config")
        rows = resp.json().get("value", [])
        return {r["configKey"]: r["configValue"] for r in rows}


async def update_admin_config(config_key: str, config_value: str) -> None:
    async with await _client() as c:
        url = _url(f"{CAP_ADMIN_SERVICE_URL}/AdminConfigs", {"$filter": f"configKey eq '{config_key}'"})
        resp = await c.get(url)
        _raise(resp, "find_admin_config")
        rows = resp.json().get("value", [])
        if rows:
            await c.patch(
                f"{CAP_ADMIN_SERVICE_URL}/AdminConfigs('{rows[0]['ID']}')",
                json={"configValue": config_value},
            )


# ── Reminder status (evaluated client-side against open requests) ──────────────

async def get_reminder_status(cdm_owner: str | None = None) -> list:
    """Load open requests and evaluate reminder rules client-side (mirrors CAP logic)."""
    records = await get_open_requests(cdm_email=cdm_owner)
    from datetime import datetime, timezone

    def days_since(date_str: str | None) -> int | None:
        if not date_str:
            return None
        try:
            d = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
            return (datetime.now(timezone.utc) - d).days
        except Exception:
            return None

    rules = [
        (
            lambda r: r.get("status") == "PriceCommunicated" and not r.get("approvalReceivedDate")
                      and 7 <= (days_since(r.get("priceCommunicatedDate")) or 0) < 14,
            lambda r: f"Follow up with {r['customerName']} — price sent {days_since(r.get('priceCommunicatedDate'))} days ago",
            "Warning",
        ),
        (
            lambda r: r.get("status") == "PriceCommunicated" and not r.get("approvalReceivedDate")
                      and 14 <= (days_since(r.get("priceCommunicatedDate")) or 0) < 85,
            lambda r: f"URGENT: {r['customerName']} approval overdue. Consider re-sending or escalating.",
            "Error",
        ),
        (
            lambda r: r.get("status") == "PriceCommunicated" and not r.get("approvalReceivedDate")
                      and (days_since(r.get("priceCommunicatedDate")) or 0) >= 85,
            lambda r: f"WARNING: Price validity expires in 5 days for {r['customerName']}. Act now.",
            "Error",
        ),
        (
            lambda r: r.get("status") == "Approved" and not r.get("checkSharePointUploaded")
                      and (days_since(r.get("approvalDate")) or 0) >= 3,
            lambda r: f"Upload pricing approval to SharePoint for {r['customerName']}",
            "Warning",
        ),
        (
            lambda r: r.get("status") == "InDelivery" and not r.get("customerClosureDate")
                      and (days_since(r.get("approvalDate")) or 0) >= 30,
            lambda r: f"Check delivery status for {r['customerName']} — ticket open 30+ days",
            "Warning",
        ),
        (
            lambda r: r.get("status") == "Delivered" and not r.get("checkAmsClosed")
                      and (days_since(r.get("customerClosureDate")) or 0) >= 3,
            lambda r: f"Close AMS for {r['customerName']} — customer confirmed {days_since(r.get('customerClosureDate'))} days ago",
            "Warning",
        ),
        (
            lambda r: r.get("status") == "Delivered" and not r.get("o2iTicketNo")
                      and (days_since(r.get("amsClosureDate")) or 0) >= 3,
            lambda r: f"Open O2I invoice ticket for {r['customerName']} — AMS closed {days_since(r.get('amsClosureDate'))} days ago",
            "Warning",
        ),
    ]

    active = []
    for record in records:
        for check_fn, text_fn, severity in rules:
            try:
                if check_fn(record):
                    active.append({
                        "text": text_fn(record),
                        "type": severity,
                        "recordId": record.get("ID"),
                        "customerName": record.get("customerName"),
                    })
            except Exception:
                pass
    return active


# ── Generic OData helpers (for orchestrator direct calls) ─────────────────────

async def get(path: str) -> dict:
    """GET CAP_SERVICE_URL + path, return the response JSON."""
    async with await _client() as c:
        resp = await c.get(f"{CAP_SERVICE_URL}{path}")
        _raise(resp, f"GET {path}")
        return resp.json()


async def patch(path: str, data: dict) -> dict:
    """PATCH CAP_SERVICE_URL + path with data, return the response JSON (or empty dict)."""
    async with await _client() as c:
        resp = await c.patch(f"{CAP_SERVICE_URL}{path}", json=data)
        _raise(resp, f"PATCH {path}")
        return resp.json() if resp.text else {}


async def post(path: str, data: dict) -> dict:
    """POST CAP_SERVICE_URL + path with data, return the response JSON."""
    async with await _client() as c:
        resp = await c.post(f"{CAP_SERVICE_URL}{path}", json=data)
        _raise(resp, f"POST {path}")
        return resp.json()


# ── R&R document store (RAG) ──────────────────────────────────────────────────

async def get_rr_chunks() -> list:
    """Fetch all RRChunks (id, document_ID, pageNumber, text, embedding) from AdminService."""
    async with await _client() as c:
        resp = await c.get(
            f"{CAP_ADMIN_SERVICE_URL}/RRChunks"
            "?$select=ID,document_ID,pageNumber,text,embedding&$top=5000",
            timeout=60.0,
        )
        _raise(resp, "get_rr_chunks")
        return resp.json().get("value", [])


async def get_rr_document(doc_id: str) -> dict:
    """Fetch a single RRDocument record by ID."""
    async with await _client() as c:
        resp = await c.get(f"{CAP_ADMIN_SERVICE_URL}/RRDocuments('{doc_id}')")
        _raise(resp, "get_rr_document")
        return resp.json()


# ── Pricing RAG ───────────────────────────────────────────────────────────────

async def get_pricing_chunks() -> list:
    """Fetch all PricingChunks (serviceCode, text, embedding, priceEur, unitOfMeasure, effortType)."""
    async with await _client() as c:
        resp = await c.get(
            f"{CAP_ADMIN_SERVICE_URL}/PricingChunks"
            "?$select=ID,serviceCode,text,embedding,priceEur,unitOfMeasure,effortType&$top=2000",
            timeout=60.0,
        )
        _raise(resp, "get_pricing_chunks")
        return resp.json().get("value", [])


# ── Personal templates & notes ─────────────────────────────────────────────────

async def get_personal_template(cdm_email: str, key: str) -> dict | None:
    try:
        async with await _client() as c:
            url = _url(f"{CAP_SERVICE_URL}/PersonalTemplates", {"$filter": f"templateKey eq '{key}'", "$top": 1})
            resp = await c.get(url)
            _raise(resp, "get_personal_template")
            items = resp.json().get("value", [])
            return items[0] if items else None
    except Exception:
        return None


async def get_shared_template(key: str) -> dict | None:
    try:
        async with await _client() as c:
            url = _url(f"{CAP_SERVICE_URL}/EmailTemplates", {"$filter": f"templateKey eq '{key}'", "$top": 1})
            resp = await c.get(url)
            _raise(resp, "get_shared_template")
            items = resp.json().get("value", [])
            return items[0] if items else None
    except Exception:
        return None


async def save_personal_template(cdm_email: str, key: str, content: str, description: str = "") -> dict:
    try:
        async with await _client() as c:
            resp = await c.post(
                f"{CAP_SERVICE_URL}/savePersonalTemplate",
                json={"templateKey": key, "content": content, "description": description}
            )
            _raise(resp, "save_personal_template")
            return resp.json()
    except Exception as e:
        raise Exception(f"Failed to save template: {e}")


async def get_personal_notes(cdm_email: str, query: str = "") -> list:
    try:
        async with await _client() as c:
            params = {"$orderby": "createdAt desc", "$top": 20}
            if query:
                params["$filter"] = f"contains(tolower(content),'{query.lower()}')"
            url = _url(f"{CAP_SERVICE_URL}/PersonalNotes", params)
            resp = await c.get(url)
            _raise(resp, "get_personal_notes")
            return resp.json().get("value", [])
    except Exception:
        return []


async def save_personal_note(cdm_email: str, content: str, tags: str = "", related_request: str = "", session_id: str = "") -> dict:
    try:
        async with await _client() as c:
            resp = await c.post(
                f"{CAP_SERVICE_URL}/savePersonalNote",
                json={
                    "content": content,
                    "tags": tags,
                    "relatedRequest": related_request or None,
                    "sessionId": session_id or None
                }
            )
            _raise(resp, "save_personal_note")
            return {"saved": True}
    except Exception as e:
        raise Exception(f"Failed to save note: {e}")
