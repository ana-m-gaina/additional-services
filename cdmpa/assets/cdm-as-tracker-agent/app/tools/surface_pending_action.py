"""Tool: surface_pending_action — create a PendingAction and push a card to CDM Inbox."""
import uuid
from datetime import datetime
from app import cap_client

TOOL_SCHEMA = {
    "name": "surface_pending_action",
    "description": "Create a PendingAction and push a card to the CDM Inbox.",
    "input_schema": {
        "type": "object",
        "required": ["userId", "automationId", "prompt"],
        "properties": {
            "userId":           {"type": "string"},
            "automationId":     {"type": "string"},
            "prompt":           {"type": "string"},
            "relatedRequestId": {"type": "string"},
            "navigateTo":       {
                "type": "string",
                "description": (
                    "JSON string describing where clicking this notification should go. "
                    "Examples: '{\"page\":\"client\",\"customerAgentId\":\"<id>\"}' or "
                    "'{\"page\":\"inbox\"}' or "
                    "'{\"page\":\"client\",\"customerAgentId\":\"<id>\",\"requestId\":\"<req-id\"}'"
                ),
            },
        },
    },
}


async def handle(tool_input: dict, *, user_id: str, session_id: str, **_kwargs) -> dict:
    target_user   = tool_input.get("userId", user_id)
    automation_id = tool_input.get("automationId", "")
    prompt_text   = tool_input.get("prompt", "")
    related       = tool_input.get("relatedRequestId")
    navigate_to   = tool_input.get("navigateTo")
    if not automation_id or not prompt_text:
        return {"error": "automationId and prompt required"}
    now = datetime.utcnow().isoformat() + "Z"
    result = await cap_client.create_pending_action({
        "ID": str(uuid.uuid4()),
        "userId": target_user,
        "automationId": automation_id,
        "sessionId": session_id,
        "prompt": prompt_text,
        "status": "pending",
        "relatedRequestId": related,
        "navigateTo": navigate_to,
        "createdAt": now,
    })
    return {"created": True, "pendingActionId": result.get("ID")}
