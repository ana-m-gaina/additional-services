"""Tool: notes_read — read the CDM's personal reference notes."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "notes_read",
    "description": "Read the CDM's personal reference notes. Use when CDM asks about their saved notes, personal process info, or when context suggests personal reference data would help.",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Optional search query to filter relevant notes"}
        }
    }
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    query = tool_input.get("query", "")
    try:
        notes = await cap_client.get_personal_notes(user_id, query)
        if not notes:
            return {"found": False, "message": "No personal notes found. You can ask me to save notes anytime."}
        return {"found": True, "count": len(notes), "notes": notes}
    except Exception as e:
        return {"found": False, "error": str(e)}
