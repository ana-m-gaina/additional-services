"""Tool: propose_layout_change — suggest a change to the CDM saved workspace layout."""

TOOL_SCHEMA = {
    "name": "propose_layout_change",
    "description": "Suggest a change to the CDM saved workspace layout. Renders a confirm-dialog; only saves if CDM approves.",
    "input_schema": {
        "type": "object",
        "required": ["description", "newPanels"],
        "properties": {
            "description": {"type": "string"},
            "newPanels":   {"type": "array"},
        },
    },
}


async def handle(tool_input: dict, *, proposed_layout_ref: list, **_kwargs) -> dict:
    proposed_layout_ref[0] = {
        "description": tool_input.get("description", ""),
        "newPanels":   tool_input.get("newPanels", []),
    }
    return {"proposed": True, "description": tool_input.get("description", "")}
