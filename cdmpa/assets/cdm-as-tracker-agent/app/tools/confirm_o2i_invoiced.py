"""Tool: confirm_o2i_invoiced — mark AS request as Invoiced after O2I ticket submitted."""
import logging
from app import cap_client
from app.tools._shared import tool_span

logger = logging.getLogger(__name__)

TOOL_SCHEMA = {
    "name": "confirm_o2i_invoiced",
    "description": "Confirm that the O2I JIRA ticket has been submitted and mark the AS request as Invoiced.",
    "input_schema": {
        "type": "object",
        "required": ["request_id"],
        "properties": {
            "request_id": {"type": "string", "description": "The AS request ID to mark as Invoiced"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str = "", session_id: str = "", **_kwargs) -> dict:
    request_id = tool_input.get("request_id", "")
    if not request_id:
        return {"error": "request_id required"}

    with tool_span("confirm_o2i_invoiced", session_id=session_id, cdm_email=user_id) as span:
        result = await cap_client.confirm_invoiced(request_id)
        final_status = result.get("status", "Invoiced")
        logger.info("[M5].achieved: O2I invoiced confirmed request=%s status=%s", request_id, final_status)
        if span:
            span.set_attribute("request_id", request_id)
            span.set_attribute("final_status", final_status)
        return {"confirmed": True, "status": final_status}
