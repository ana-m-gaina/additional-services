"""Tool: fetch_records — query AS requests from the database."""
from app import cap_client

TOOL_SCHEMA = {
    "name": "fetch_records",
    "description": "Query AS requests from the database. Returns matching records.",
    "input_schema": {
        "type": "object",
        "properties": {
            "filters": {"type": "object", "description": "Filters: status, cdmOwner, customerName"},
            "limit":   {"type": "integer", "description": "Max records (default 10)"},
            "fields":  {"type": "array", "items": {"type": "string"}},
        },
    },
}


async def handle(tool_input: dict, *, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Fetching requests…")
    filters = tool_input.get("filters", {})
    limit   = tool_input.get("limit", 10)
    records = await cap_client.get_open_requests(cdm_email=filters.get("cdmOwner") or filters.get("assignedCDM"))
    if filters.get("status"):
        records = [r for r in records if r.get("status") == filters["status"]]
    if filters.get("customerName"):
        term = filters["customerName"].lower()
        records = [r for r in records if term in r.get("customerName", "").lower()]
    records = records[:limit]
    return {"records": records, "count": len(records)}
