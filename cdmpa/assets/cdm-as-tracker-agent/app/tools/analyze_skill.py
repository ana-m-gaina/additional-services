"""Tool: analyze_skill — analyze a pasted skill definition and render a skill-reader panel."""
import logging
import json
import httpx

logger = logging.getLogger(__name__)

TOOL_SCHEMA = {
    "name": "analyze_skill",
    "description": (
        "Analyze a Claude Code skill definition pasted by the user. "
        "Extracts the skill title, summary, inputs, outputs, and risks/gotchas, "
        "then renders a skill-reader panel in the center of the screen. "
        "Call this when the user pastes a block of text that looks like a skill definition "
        "(markdown headings like ## Workflow, ## Tools, ## Guardrails, or similar structured instruction text)."
    ),
    "input_schema": {
        "type": "object",
        "required": ["skill_text"],
        "properties": {
            "skill_text": {
                "type": "string",
                "description": "The full raw skill text pasted by the user.",
            },
        },
    },
}


async def handle(tool_input: dict, *, panels: list, **_kwargs) -> dict:
    skill_text = tool_input.get("skill_text", "").strip()
    if not skill_text:
        return {"error": "skill_text is required"}

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                "http://localhost:8000/api/analyze-skill",
                json={"skill_text": skill_text},
            )
            resp.raise_for_status()
            analysis = resp.json()
    except Exception as exc:
        logger.exception("analyze_skill: internal call failed")
        return {"error": str(exc)}

    panel = {
        "id":     f"skill-reader-{len(panels)}",
        "type":   "skill-reader",
        "title":  analysis.get("title", "Skill Analysis"),
        "pinned": False,
        "config": {
            "title":    analysis.get("title", ""),
            "summary":  analysis.get("summary", ""),
            "inputs":   analysis.get("inputs", []),
            "outputs":  analysis.get("outputs", []),
            "gotchas":  analysis.get("gotchas", []),
            "rawText":  skill_text,
        },
    }
    panels.append(panel)
    return {"rendered": True, "panelId": panel["id"], "title": panel["title"]}
