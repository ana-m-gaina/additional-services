"""Tool: set_agent_status — change the lifecycle status of a customer/contract/integration agent."""
import json
import uuid
from datetime import datetime
from app import cap_client

TOOL_SCHEMA = {
    "name": "set_agent_status",
    "description": "Change the lifecycle status of a customer, contract, or integration agent. Use when CDM says 'suspend', 'archive', 'retire', or 'reactivate' an agent. Always confirm intent before retiring — it creates a tombstone.",
    "input_schema": {
        "type": "object",
        "required": ["agentType", "agentId", "newStatus"],
        "properties": {
            "agentType": {"type": "string", "enum": ["customer", "contract", "integration"]},
            "agentId":   {"type": "string", "description": "ID of the CustomerAgent, ContractSubagent, or IntegrationAgent"},
            "newStatus": {"type": "string", "enum": ["active", "suspended", "archived", "retired"]},
            "reason":    {"type": "string", "description": "Optional reason for the status change"},
        },
    },
}

_ENTITY_MAP = {
    "customer":    "CustomerAgents",
    "contract":    "ContractSubagents",
    "integration": "IntegrationAgents",
}


async def handle(tool_input: dict, *, user_id: str, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Updating agent status…")
    agent_type = tool_input.get("agentType")
    agent_id   = tool_input.get("agentId")
    new_status = tool_input.get("newStatus")
    reason     = tool_input.get("reason", "")
    if not agent_type or not agent_id or not new_status:
        return {"error": "agentType, agentId, newStatus required"}
    entity = _ENTITY_MAP.get(agent_type)
    if not entity:
        return {"error": f"Unknown agentType: {agent_type}"}
    now = datetime.utcnow().isoformat() + "Z"
    fields = {"status": new_status}
    if new_status in ("archived", "retired"):
        fields["archivedAt"] = now
    try:
        await cap_client.patch(f"/{entity}({agent_id})", fields)
        if new_status == "retired":
            # Fetch the full record for the tombstone snapshot
            record = await cap_client.get(f"/{entity}({agent_id})")
            await cap_client.post("/RetiredAgents", {
                "ID": str(uuid.uuid4()),
                "originalId":  agent_id,
                "agentType":   agent_type,
                "displayName": record.get("displayName", agent_id),
                "retiredBy":   user_id,
                "retiredAt":   now,
                "reason":      reason,
                "snapshotJson": json.dumps(record),
            })
        return {"updated": True, "agentId": agent_id, "newStatus": new_status}
    except Exception as e:
        return {"error": str(e)}
