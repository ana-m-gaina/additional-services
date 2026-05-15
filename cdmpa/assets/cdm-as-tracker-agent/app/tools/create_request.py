"""Tool: create_request — create a new AS request entry in the database."""
import logging
import uuid
from app import cap_client
from app.tools._shared import tool_span

logger = logging.getLogger(__name__)

TOOL_SCHEMA = {
    "name": "create_request",
    "description": (
        "Create a new AS request entry in the database. "
        "If creating from a raw customer email, call parse_email first to extract fields. "
        "If creating manually or with mock data, fill the fields directly — do NOT require an email. "
        "Always show the CDM a summary of what will be created and ask for confirmation before calling this. "
        "If an ACTIVE CUSTOMER SESSION is set, use that customer's name and ID automatically — do NOT ask the CDM which customer. "
        "Required: customerName, sid, assignedCDM. Include additionalServiceIds (R&R codes), description, poNumber, customerAccountId if available."
    ),
    "input_schema": {
        "type": "object",
        "required": ["customerName", "sid", "assignedCDM"],
        "properties": {
            "customerName":       {"type": "string", "description": "Customer display name"},
            "requestTitle":       {"type": "string", "description": "Short title for the request, e.g. 'HANA DB Upgrade — PRD'"},
            "customerAccountId":  {"type": "string", "description": "SAP customer account / IHC number"},
            "sid":                {"type": "string", "description": "System SID"},
            "additionalServiceIds": {"type": "string", "description": "Comma-separated R&R service codes e.g. MOVE_1.3.04"},
            "description":        {"type": "string", "description": "Free-text description of the requested service"},
            "poNumber":           {"type": "string", "description": "PO number if provided in the email"},
            "assignedCDM":        {"type": "string", "description": "CDM email address — use the logged-in CDM"},
            "status":             {"type": "string", "description": "Initial status — defaults to New"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str, session_id: str = "", refresh_data_ref: list, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Creating AS request…")
    description = tool_input.get("description", "")
    title = tool_input.get("requestTitle") or (description[:80] if description else "AS Request")
    data = {
        "ID":                   str(uuid.uuid4()),
        "requestTitle":         title,
        "customerName":         tool_input.get("customerName", ""),
        "customerAccountId":    tool_input.get("customerAccountId", ""),
        "sid":                  tool_input.get("sid", ""),
        "additionalServiceIds": tool_input.get("additionalServiceIds", ""),
        "description":          description,
        "poNumber":             tool_input.get("poNumber", ""),
        "assignedCDM":          tool_input.get("assignedCDM") or user_id,
        "cdmOwner":             tool_input.get("assignedCDM") or user_id,
        "status":               tool_input.get("status") or "New",
    }

    with tool_span("create_request", session_id=session_id, cdm_email=user_id) as span:
        result = await cap_client.create_as_request(data)
        refresh_data_ref[0] = True
        new_id = result.get("ID")
        logger.info(
            "[M3].achieved: AS request created id=%s customer=%s cdm=%s",
            new_id, data["customerName"], data["assignedCDM"],
        )
        if span:
            span.set_attribute("request_id", new_id or "")
            span.set_attribute("customer_name", data["customerName"])
        return {"created": True, "requestId": new_id, "record": result, "refreshData": True}
