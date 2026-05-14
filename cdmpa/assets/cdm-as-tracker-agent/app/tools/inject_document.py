"""Tool: inject_document — load a document into context for this turn only (ephemeral)."""

TOOL_SCHEMA = {
    "name": "inject_document",
    "description": "Load a document into context for this turn only. Content is ephemeral — not stored anywhere. Use when CDM uploads or pastes a document they want to ask questions about.",
    "input_schema": {
        "type": "object",
        "required": ["content"],
        "properties": {
            "content": {"type": "string", "description": "Full document text or extracted PDF content"},
            "title": {"type": "string", "description": "Document title or filename for reference"},
            "type": {"type": "string", "enum": ["contract", "sla", "reference", "email", "other"], "description": "Document type"}
        }
    }
}


async def handle(tool_input: dict, **_kwargs) -> dict:
    content    = tool_input.get("content", "")
    title      = tool_input.get("title", "Document")
    doc_type   = tool_input.get("type", "other")
    word_count = len(content.split())
    return {
        "loaded": True,
        "title": title,
        "type": doc_type,
        "word_count": word_count,
        "content": content,
        "note": "Document loaded into context for this session only. Not stored anywhere."
    }
