"""Tool: resolve_pending_action — mark a PendingAction as responded or dismissed."""
from app import cap_client

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


async def handle(tool_input: dict, **_kwargs) -> dict:
    action_id = tool_input.get("pendingActionId")
    pa_status = tool_input.get("status")
    recorded  = tool_input.get("recordedData")
    if not action_id or not pa_status:
        return {"error": "pendingActionId and status required"}
    await cap_client.resolve_pending_action(action_id, pa_status, recorded)
    return {"resolved": True, "pendingActionId": action_id, "status": pa_status}
