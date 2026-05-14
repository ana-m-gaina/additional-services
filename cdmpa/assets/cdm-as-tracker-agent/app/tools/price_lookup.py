"""Tool: price_lookup — search AS Pricing List via vector search."""

TOOL_SCHEMA = {
    "name": "price_lookup",
    "description": (
        "Search the ingested AS Pricing List using vector search. "
        "Use whenever a CDM asks about price, cost, or EUR value of a service. "
        "If the CDM provides a specific service code (e.g. INFRA_1.8.10), call price_lookup directly — "
        "do NOT call rr_lookup first for pricing questions."
    ),
    "input_schema": {
        "type": "object",
        "required": ["service_code"],
        "properties": {
            "service_code": {"type": "string", "description": "The R&R service code to look up (e.g. INFRA_1.8.10)"},
        },
    },
}


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    import app.agents.pricing_agent as pricing_agent

    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Looking up pricing…")
    service_code = tool_input.get("service_code", "").strip()
    if not service_code:
        return {"error": "service_code required"}
    result = await pricing_agent.run(f"What is the price for service code {service_code}?")
    entries = result.get("price_entries", [])
    if entries:
        e = entries[0]
        price_str = f"{e['price_eur']:.2f} EUR {e.get('unit','')}" if e.get("price_eur") else "case-by-case (contact topic owner)"
        return {
            "found":       True,
            "code":        e["code"],
            "name":        e["name"],
            "price":       price_str,
            "effort_type": e.get("effort_type", ""),
            "notes":       e.get("notes", ""),
            "answer":      result.get("answer", ""),
            "confidence":  result.get("confidence", "LOW"),
        }
    return {"found": False, "answer": result.get("answer", "No pricing data found for this service code.")}
