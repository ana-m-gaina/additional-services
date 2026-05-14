"""Tool: register_contract — create a new ContractSubagent under an existing CustomerAgent."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "register_contract",
    "description": "Create a new ContractSubagent under an existing CustomerAgent.",
    "input_schema": {
        "type": "object",
        "required": ["customerId", "sid", "displayName", "contractType"],
        "properties": {
            "customerId":   {"type": "string"},
            "sid":          {"type": "string"},
            "displayName":  {"type": "string"},
            "contractType": {"type": "string", "enum": ["Classic", "ATLAS"]},
        },
    },
}


async def handle(tool_input: dict, **_kwargs) -> dict:
    customer_id   = tool_input.get("customerId", "")
    sid           = tool_input.get("sid", "")
    display_name  = tool_input.get("displayName", "")
    contract_type = tool_input.get("contractType", "Classic")
    if not customer_id or not sid or not display_name:
        return {"error": "customerId, sid, displayName required"}
    result = await cap_client.register_contract(customer_id, sid, display_name, contract_type)
    return {"created": True, "contractId": result.get("ID"), "displayName": display_name}
