"""Tool: rename_assistant — rename the AI assistant."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "rename_assistant",
    "description": "Rename the assistant to a new name chosen by the CDM. Call when CDM says 'call yourself X', 'rename to X', or similar.",
    "input_schema": {
        "type": "object",
        "required": ["newName"],
        "properties": {
            "newName": {"type": "string", "description": "The new assistant name"}
        },
    },
}


async def handle(tool_input: dict, *, renamed_to_ref: list, **_kwargs) -> dict:
    new_name = tool_input.get("newName", "").strip()
    if not new_name:
        return {"error": "newName required"}
    renamed_to_ref[0] = new_name
    await cap_client.update_admin_config("assistant_name", new_name)
    return {"renamed": True, "newName": new_name}
