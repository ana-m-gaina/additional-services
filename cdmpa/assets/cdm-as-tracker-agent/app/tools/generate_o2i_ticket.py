"""Tool: generate_o2i_ticket — generate JIRA O2I invoice ticket body for an AS request."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "generate_o2i_ticket",
    "description": "Generate the JIRA O2I invoice ticket body for an AS request. Returns the draft ticket for CDM review before submission.",
    "input_schema": {
        "type": "object",
        "required": ["request_id"],
        "properties": {
            "request_id": {"type": "string", "description": "The AS request ID to generate the O2I ticket for"},
        },
    },
}


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Generating O2I invoice ticket…")
    request_id = tool_input.get("request_id", "")
    if not request_id:
        return {"error": "request_id required"}
    body = await cap_client.generate_jira_ticket(request_id)
    return {"ticket_body": body, "note": "Please review and confirm submission to mark as Invoiced."}
