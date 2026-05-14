"""Tool: get_reminder_status — check which reminder rules are firing for CDM's open requests."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "get_reminder_status",
    "description": "Check which reminder rules are currently firing for the CDM's open requests.",
    "input_schema": {
        "type": "object",
        "properties": {
            "cdmOwner": {"type": "string"}
        },
    },
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    owner = tool_input.get("cdmOwner") or user_id
    reminders = await cap_client.get_reminder_status(cdm_owner=owner)
    return {"reminders": reminders, "count": len(reminders)}
