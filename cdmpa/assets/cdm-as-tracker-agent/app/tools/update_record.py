"""Tool: update_record — update fields on an AS request."""
import logging
from app import cap_client
from app.tools._shared import tool_span

logger = logging.getLogger(__name__)

TOOL_SCHEMA = {
    "name": "update_record",
    "description": "Update fields on an AS request. Always show the CDM what will change before calling this.",
    "input_schema": {
        "type": "object",
        "required": ["recordId", "fields"],
        "properties": {
            "recordId": {"type": "string"},
            "fields":   {"type": "object"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str = "", session_id: str = "", activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Updating request…")
    record_id = tool_input.get("recordId")
    fields    = tool_input.get("fields", {})
    if not record_id or not fields:
        return {"error": "recordId and fields required"}

    with tool_span("update_record", session_id=session_id, cdm_email=user_id) as span:
        try:
            if "status" in fields:
                await cap_client.advance_status(record_id, fields.pop("status"), fields.pop("comment", ""))
            if fields:
                await cap_client.patch_as_request(record_id, fields)
            updated_fields = tool_input.get("fields", {})
            logger.info("[M4].achieved: record updated id=%s fields=%s", record_id, list(updated_fields.keys()))
            if span:
                span.set_attribute("record_id", record_id)
                span.set_attribute("field_count", len(updated_fields))
            return {"updated": True, "recordId": record_id, "fields": updated_fields}
        except Exception as e:
            logger.warning("[M4].missed: record update failed id=%s error=%s", record_id, e)
            return {"error": str(e)}
