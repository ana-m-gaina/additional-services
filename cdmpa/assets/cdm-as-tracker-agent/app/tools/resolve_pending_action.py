"""Tool: resolve_pending_action — mark a PendingAction as responded or dismissed."""
import logging
from app import cap_client
from app.tools._shared import tool_span

logger = logging.getLogger(__name__)

TOOL_SCHEMA = {
    "name": "resolve_pending_action",
    "description": "Mark a PendingAction as responded or dismissed.",
    "input_schema": {
        "type": "object",
        "required": ["pendingActionId", "status"],
        "properties": {
            "pendingActionId": {"type": "string"},
            "status":          {"type": "string", "enum": ["responded", "dismissed"]},
            "recordedData":    {"type": "object"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str = "", session_id: str = "", **_kwargs) -> dict:
    action_id = tool_input.get("pendingActionId")
    pa_status = tool_input.get("status")
    recorded  = tool_input.get("recordedData")
    if not action_id or not pa_status:
        return {"error": "pendingActionId and status required"}

    with tool_span("resolve_pending_action", session_id=session_id, cdm_email=user_id) as span:
        await cap_client.resolve_pending_action(action_id, pa_status, recorded)
        logger.info("[M7].achieved: pending action resolved id=%s status=%s", action_id, pa_status)
        if span:
            span.set_attribute("pending_action_id", action_id)
            span.set_attribute("resolution_status", pa_status)
        return {"resolved": True, "pendingActionId": action_id, "status": pa_status}
