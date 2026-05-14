"""Tool: update_record — update fields on an AS request."""
from app import cap_client

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


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Updating request…")
    record_id = tool_input.get("recordId")
    fields    = tool_input.get("fields", {})
    if not record_id or not fields:
        return {"error": "recordId and fields required"}
    try:
        if "status" in fields:
            await cap_client.advance_status(record_id, fields.pop("status"), fields.pop("comment", ""))
        if fields:
            await cap_client.patch_as_request(record_id, fields)
        return {"updated": True, "recordId": record_id, "fields": tool_input.get("fields", {})}
    except Exception as e:
        return {"error": str(e)}
