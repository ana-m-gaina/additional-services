"""Tool: notes_write — save a personal note for the CDM."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "notes_write",
    "description": "Save a personal note for the CDM. Use when CDM says 'remember this', 'save this', 'note that', or wants to store process info or reference text for later.",
    "input_schema": {
        "type": "object",
        "required": ["content"],
        "properties": {
            "content": {"type": "string", "description": "The note content to save"},
            "tags": {"type": "string", "description": "Optional comma-separated tags for searching later"},
            "relatedRequest": {"type": "string", "description": "Optional AS request ID this note is about"},
            "sessionId": {"type": "string", "description": "Current session ID"}
        }
    }
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    content = tool_input.get("content", "").strip()
    if not content:
        return {"saved": False, "error": "content is required"}
    try:
        await cap_client.save_personal_note(
            user_id,
            content,
            tags=tool_input.get("tags", ""),
            related_request=tool_input.get("relatedRequest", ""),
            session_id=tool_input.get("sessionId", "")
        )
        return {"saved": True, "message": "Note saved to your personal notes."}
    except Exception as e:
        return {"saved": False, "error": str(e)}
