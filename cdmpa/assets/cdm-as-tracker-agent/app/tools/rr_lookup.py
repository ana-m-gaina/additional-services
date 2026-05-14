"""Tool: rr_lookup — search R&R PDF documents via vector search."""
import uuid

TOOL_SCHEMA = {
    "name": "rr_lookup",
    "description": (
        "Search the ingested R&R PDF documents using vector search. "
        "Use whenever a CDM asks about roles, responsibilities, who owns a task, or whether something is chargeable. "
        "Always call rr_lookup for R&R questions rather than answering from memory. "
        "If rr_lookup returns found:false → ask 1-2 targeted clarifying questions then call rr_lookup again. "
        "If rr_lookup returns too_broad:true (more than 3 codes) → ask 1-2 more specific narrowing questions then call rr_lookup again. "
        "Only show a result panel when rr_lookup returns 1-3 specific service codes."
    ),
    "input_schema": {
        "type": "object",
        "required": ["description"],
        "properties": {
            "description": {"type": "string", "description": "Natural-language description of the service or task to match"},
            "codes":       {"type": "array", "items": {"type": "string"}, "description": "Optional list of candidate codes to narrow the search"},
        },
    },
}


async def handle(tool_input: dict, *, panels: list, activity_callback=None, **_kwargs) -> dict:
    import app.agents.rr_agent as rr_agent

    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Searching R&R documents…")
    description = tool_input.get("description", "")
    if not description:
        return {"error": "description required"}
    query = f"Match this description to R&R service codes: {description}"
    result = await rr_agent.run(query)
    if isinstance(result, dict):
        confidence = result.get("confidence", "LOW")
        matches    = result.get("matches", [])

        if matches and len(matches) <= 3:
            panels.append({
                "id":         f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
                "type":       "rr-source",
                "title":      "R&R Document Match",
                "pinned":     False,
                "config":     {},
                "answer":     result.get("answer", ""),
                "summary":    result.get("summary", ""),
                "matches":    matches,
                "confidence": confidence,
                "sources":    result.get("sources", []),
            })
            return result.get("answer", "")

        elif matches and len(matches) > 3:
            codes_preview = ", ".join(m["code"] for m in matches[:5])
            return {
                "found": True,
                "too_broad": True,
                "match_count": len(matches),
                "codes_preview": codes_preview,
                "suggestion": (
                    f"The search returned {len(matches)} possible codes ({codes_preview}...) — too broad to be useful. "
                    "Ask the CDM 1-2 more specific questions to narrow it down: "
                    "Is this a one-time task or recurring? Which specific system component? "
                    "Is SAP performing the work or just advising? "
                    "Then call rr_lookup again with the refined description."
                ),
            }

        else:
            return {
                "found": False,
                "confidence": confidence,
                "summary": result.get("summary", ""),
                "suggestion": (
                    "The R&R documents did not return a specific service code for this description. "
                    "Ask the CDM for more detail: What type of work is involved? Which system/component? "
                    "Is it a one-time task or ongoing? Which contract type (PCE, RISE, ATLAS)?"
                ),
            }
    return result
