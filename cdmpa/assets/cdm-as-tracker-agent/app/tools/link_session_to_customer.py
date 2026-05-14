"""Tool: link_session_to_customer — link the current session to a specific customer."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "link_session_to_customer",
    "description": (
        "Link the current general conversation session to a specific customer. "
        "Call this when the CDM's question is clearly about one specific customer "
        "and the session was started as a general (non-customer) chat. "
        "After linking, the session will appear under that customer in the sidebar."
    ),
    "input_schema": {
        "type": "object",
        "required": ["customer_agent_id"],
        "properties": {
            "customer_agent_id": {
                "type": "string",
                "description": "The CustomerAgent.ID (UUID) to link this session to.",
            },
        },
    },
}


async def handle(tool_input: dict, *, session_id: str, **_kwargs) -> dict:
    cag_id = tool_input.get("customer_agent_id", "")
    if not cag_id:
        return {"error": "customer_agent_id required"}
    await cap_client.link_session_to_customer(session_id, cag_id)
    return {"linked": True, "sessionId": session_id, "customerAgentId": cag_id}
