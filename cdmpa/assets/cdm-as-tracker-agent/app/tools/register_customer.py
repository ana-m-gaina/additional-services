"""Tool: register_customer — create a new CustomerAgent entry and add it to the nav."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "register_customer",
    "description": "Create a new CustomerAgent entry and add it to the nav.",
    "input_schema": {
        "type": "object",
        "required": ["customerId", "displayName"],
        "properties": {
            "customerId":  {"type": "string"},
            "displayName": {"type": "string"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    customer_id  = tool_input.get("customerId", "")
    display_name = tool_input.get("displayName", "")
    if not customer_id or not display_name:
        return {"error": "customerId and displayName required"}
    result = await cap_client.register_customer(customer_id, display_name, user_id)
    return {"created": True, "customerId": result.get("ID"), "displayName": display_name}
