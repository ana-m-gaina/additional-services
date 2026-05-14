"""Tool: confirm_o2i_invoiced — mark AS request as Invoiced after O2I ticket submitted."""
from app import cap_client

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


async def handle(tool_input: dict, **_kwargs) -> dict:
    request_id = tool_input.get("request_id", "")
    if not request_id:
        return {"error": "request_id required"}
    result = await cap_client.confirm_invoiced(request_id)
    return {"confirmed": True, "status": result.get("status", "Invoiced")}
