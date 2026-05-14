"""Tool: template_read — read a template by key (private first, shared fallback)."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "template_read",
    "description": "Read a template by key. Checks private (CDM-owned) templates first, falls back to shared templates. Use when CDM asks to use a template, draft from a template, or 'use my price email'.",
    "input_schema": {
        "type": "object",
        "required": ["key"],
        "properties": {
            "key": {"type": "string", "description": "Template key, e.g. 'price_email', 'jira_o2i', or a custom name the CDM gave their template"},
            "cdm_email": {"type": "string", "description": "CDM email for private template lookup — omit to get shared only"}
        }
    }
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    key       = tool_input.get("key", "")
    cdm_email = tool_input.get("cdm_email", user_id)
    try:
        private = await cap_client.get_personal_template(cdm_email, key)
        if private:
            return {"found": True, "key": key, "source": "private", "content": private["content"], "description": private.get("description", "")}
    except Exception:
        pass
    try:
        shared = await cap_client.get_shared_template(key)
        if shared:
            return {"found": True, "key": key, "source": "shared", "content": shared["content"], "description": shared.get("description", "")}
    except Exception:
        pass
    return {"found": False, "key": key, "message": f"No template found with key '{key}'. Available shared templates: price_email, jira_o2i"}
