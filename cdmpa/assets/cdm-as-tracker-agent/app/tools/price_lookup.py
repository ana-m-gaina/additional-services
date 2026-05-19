"""Tool: price_lookup — direct DB lookup against PricingTable (no RAG)."""

TOOL_SCHEMA = {
    "name": "price_lookup",
    "description": (
        "Look up the EUR price for an AS service code from the pricing database. "
        "Use whenever a CDM asks about price, cost, or EUR value of a service. "
        "If the CDM provides a specific service code (e.g. SC-02), call price_lookup directly — "
        "do NOT call rr_lookup first for pricing questions."
    ),
    "input_schema": {
        "type": "object",
        "required": ["service_code"],
        "properties": {
            "service_code": {"type": "string", "description": "The AS service code to look up (e.g. SC-02, OP-01)"},
        },
    },
}


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    import app.cap_client as cap_client

    if activity_callback:
        await activity_callback("Looking up pricing…")

    service_code = tool_input.get("service_code", "").strip().upper()
    if not service_code:
        return {"error": "service_code required"}

    entry = await cap_client.get_pricing_entry(service_code)
    if entry:
        price_eur = entry.get("price")
        price_str = f"{float(price_eur):.2f} EUR" if price_eur else "case-by-case (contact topic owner)"
        return {
            "found":       True,
            "code":        entry.get("serviceCode"),
            "name":        entry.get("serviceName"),
            "price":       price_str,
            "currency":    entry.get("currency", "EUR"),
            "effective_from": entry.get("effectiveFrom"),
        }

    # Fallback: search all entries for partial code match
    all_pricing = await cap_client.get_all_pricing(search=service_code)
    if all_pricing:
        results = []
        for e in all_pricing:
            price_eur = e.get("price")
            results.append({
                "code":  e.get("serviceCode"),
                "name":  e.get("serviceName"),
                "price": f"{float(price_eur):.2f} EUR" if price_eur else "case-by-case",
            })
        return {"found": True, "matches": results}

    return {"found": False, "answer": f"No pricing entry found for service code '{service_code}'."}
