"""Tool: template_write — save or update a personal template for the CDM."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "template_write",
    "description": "Save or update a personal template for the CDM. Use when CDM says 'save this as my template', 'remember this format', or 'create a template called X'.",
    "input_schema": {
        "type": "object",
        "required": ["key", "content"],
        "properties": {
            "key": {"type": "string", "description": "Template key/name"},
            "content": {"type": "string", "description": "Full template text"},
            "description": {"type": "string", "description": "Short description of what the template is for"}
        }
    }
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    key         = tool_input.get("key", "")
    content     = tool_input.get("content", "")
    description = tool_input.get("description", "")
    try:
        await cap_client.save_personal_template(user_id, key, content, description)
        return {"saved": True, "key": key, "message": f"Template '{key}' saved to your personal templates."}
    except Exception as e:
        return {"saved": False, "error": str(e)}
