"""Tool: route_to_agent — delegate to Customer Orchestrator or Contract Subagent."""
from app.agents.models import HandoffContext

TOOL_SCHEMA = {
    "name": "route_to_agent",
    "description": "Delegate to a Customer Orchestrator or Contract Subagent. Response comes back in same thread — CDM never sees the routing.",
    "input_schema": {
        "type": "object",
        "required": ["agentType", "customerId", "handoffSummary", "message"],
        "properties": {
            "agentType":      {"type": "string", "enum": ["customer_orchestrator", "contract_subagent"]},
            "customerId":     {"type": "string"},
            "contractId":     {"type": "string"},
            "handoffSummary": {"type": "string"},
            "message":        {"type": "string"},
            "intent":         {"type": "string", "description": "the specific task being delegated"},
            "request_ids":    {"type": "array", "items": {"type": "string"}},
        },
    },
}


async def handle(tool_input: dict, *, history: list, activity_callback=None, **_kwargs) -> dict:
    import app.agents.client_agent as client_agent_mod
    import app.agents.contract_agent as contract_agent_mod

    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity(f"Routing to {tool_input.get('agentType', 'agent')}…")
    agent_type   = tool_input.get("agentType")
    customer_id  = tool_input.get("customerId")
    contract_id  = tool_input.get("contractId")
    if not customer_id:
        return {"error": "customerId required"}
    recent_turns = [{"role": t["role"], "content": t["content"]}
                    for t in history[-5:] if t.get("agentName") == (contract_id or customer_id)]
    handoff = HandoffContext(
        to_agent=agent_type,
        intent=tool_input.get("intent", "general"),
        customer_id=tool_input.get("customerId", ""),
        contract_id=tool_input.get("contractId"),
        request_ids=tool_input.get("request_ids", []),
        summary=tool_input.get("handoffSummary", ""),
        recent_turns=recent_turns,
        message=tool_input.get("message", ""),
    )
    if agent_type == "contract_subagent":
        reply = await contract_agent_mod.run(handoff)
    else:
        reply = await client_agent_mod.run(handoff)
    return {"reply": reply, "agentName": contract_id or customer_id}
