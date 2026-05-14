"""Tool: get_layout — read CDM's current saved dashboard layout."""
import json
from app import cap_client

TOOL_SCHEMA = {
    "name": "get_layout",
    "description": "Read the CDM's current saved dashboard layout. Call this before propose_layout_change whenever the CDM asks to add, remove, or modify panels.",
    "input_schema": {"type": "object", "properties": {}},
}


async def handle(tool_input: dict, *, user_id: str, **_kwargs) -> dict:
    row = await cap_client.get_persona_layout(user_id)
    if not row or not row.get("layoutJson"):
        return {"panels": []}
    try:
        return {"panels": json.loads(row["layoutJson"]).get("panels", [])}
    except Exception:
        return {"panels": []}
