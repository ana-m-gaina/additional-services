"""Tool: parse_email — extract AS request fields from a raw customer email."""
import json
from app import anthropic_client

TOOL_SCHEMA = {
    "name": "parse_email",
    "description": "Parse a raw customer email to extract AS request fields: customer name, service identifiers, ticket numbers, PO number, urgency notes.",
    "input_schema": {
        "type": "object",
        "required": ["raw_email"],
        "properties": {
            "raw_email": {"type": "string", "description": "The full text of the customer email to parse"},
        },
    },
}


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Parsing email…")
    raw_email = tool_input.get("raw_email", "")
    if not raw_email:
        return {"error": "raw_email required"}
    result = await anthropic_client.chat(
        "Extract from email: customer_name, service_identifiers (array), ticket_numbers (array), po_number, urgency_notes. Return JSON only.",
        raw_email,
    )
    try:
        return json.loads(result)
    except Exception:
        return {"raw": result}
