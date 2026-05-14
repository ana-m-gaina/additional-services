"""Tools: render_record_panel, render_data_panel, render_action_panel, render_notice_panel.

All four panel-building tools are grouped here because they share the common pattern
of appending a panel dict to the `panels` list and returning {rendered, panelId}.
"""
import uuid
import logging

logger = logging.getLogger(__name__)

# ── Tool schemas ──────────────────────────────────────────────────────────────

TOOL_SCHEMA_RECORD_PANEL = {
    "name": "render_record_panel",
    "description": "Render a record-card or status-timeline panel for a specific AS request.",
    "input_schema": {
        "type": "object",
        "required": ["record_id", "type"],
        "properties": {
            "record_id": {"type": "string", "description": "The AS request ID"},
            "type":      {"type": "string", "enum": ["record-card", "status-timeline"]},
            "title":     {"type": "string"},
            "pinned":    {"type": "boolean", "default": False},
        },
    },
}

TOOL_SCHEMA_DATA_PANEL = {
    "name": "render_data_panel",
    "description": "Render a data-display panel: record-table, kpi-strip, checklist, or rr-source.",
    "input_schema": {
        "type": "object",
        "required": ["type", "title", "data"],
        "properties": {
            "type":   {"type": "string", "enum": ["record-table", "kpi-strip", "checklist", "rr-source"]},
            "title":  {"type": "string"},
            "data":   {"description": "Panel data — object or array depending on type"},
            "pinned": {"type": "boolean"},
        },
    },
}

TOOL_SCHEMA_ACTION_PANEL = {
    "name": "render_action_panel",
    "description": (
        "Render an action panel. For email-draft type: you MUST call draft_price_email first and use its "
        "returned draft/subject/to values — never write email content yourself. "
        "For other types: field-form, confirm-dialog, ticket-ref."
    ),
    "input_schema": {
        "type": "object",
        "required": ["type", "title", "config"],
        "properties": {
            "type":   {"type": "string", "enum": ["email-draft", "field-form", "confirm-dialog", "ticket-ref"]},
            "title":  {"type": "string"},
            "config": {
                "type": "object",
                "description": (
                    "Type-specific config. For email-draft: {emailText, to, subject} — values come from "
                    "draft_price_email result. For field-form: {recordId, fields, editable}. "
                    "For confirm-dialog: {message, confirmLabel, cancelLabel}. "
                    "For ticket-ref: {ticketId, ticketUrl, system}."
                ),
            },
            "pinned": {"type": "boolean"},
        },
    },
}

TOOL_SCHEMA_NOTICE_PANEL = {
    "name": "render_notice_panel",
    "description": "Render a reminder-banner notice panel.",
    "input_schema": {
        "type": "object",
        "required": ["title", "message"],
        "properties": {
            "title":      {"type": "string"},
            "message":    {"type": "string"},
            "severity":   {"type": "string", "enum": ["information", "warning", "error"], "default": "information"},
            "request_id": {"type": "string"},
            "pinned":     {"type": "boolean"},
        },
    },
}

# Convenience list for import in orchestrator
ALL_TOOL_SCHEMAS = [
    TOOL_SCHEMA_RECORD_PANEL,
    TOOL_SCHEMA_DATA_PANEL,
    TOOL_SCHEMA_ACTION_PANEL,
    TOOL_SCHEMA_NOTICE_PANEL,
]

# ── Handlers ──────────────────────────────────────────────────────────────────

async def handle_record_panel(tool_input: dict, *, panels: list, **_kwargs) -> dict:
    panel_type = tool_input["type"]
    record_id  = tool_input.get("record_id", "")
    # Guard: record-card requires a recordId
    if panel_type == "record-card" and not record_id:
        return {"rendered": False, "reason": "record-card requires a record_id"}
    panel = {
        "id":     f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
        "type":   panel_type,
        "title":  tool_input.get("title", ""),
        "pinned": tool_input.get("pinned", False),
        "config": {"recordId": record_id},
    }
    panels.append(panel)
    return {"rendered": True, "panelId": panel["id"]}


async def handle_data_panel(tool_input: dict, *, panels: list, **_kwargs) -> dict:
    import app.agents.rr_agent as rr_agent

    panel_type = tool_input["type"]
    # Skip duplicate rr-source panels — rr_lookup already added one
    if panel_type == "rr-source" and any(p.get("type") == "rr-source" for p in panels):
        return {"rendered": True, "panelId": "duplicate-skipped"}
    panel = {
        "id":     f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
        "type":   panel_type,
        "title":  tool_input["title"],
        "pinned": tool_input.get("pinned", False),
        "config": {"data": tool_input.get("data")},
    }
    # rr-source: auto-run vector search if Claude didn't call rr_lookup first
    if panel_type == "rr-source":
        data = tool_input.get("data") or {}
        query = data.get("query") or tool_input.get("answer", "") if isinstance(data, dict) else ""
        if query and not (isinstance(data, dict) and data.get("sources")):
            try:
                rr_result = await rr_agent.run(query)
                panel["answer"]     = rr_result.get("answer", "")
                panel["sources"]    = rr_result.get("sources", [])
                panel["matches"]    = rr_result.get("matches", [])
                panel["summary"]    = rr_result.get("summary", "")
                panel["confidence"] = rr_result.get("confidence", "LOW")
            except Exception as exc:
                logger.warning("rr_agent auto-run failed: %s", exc)
                panel["answer"]  = tool_input.get("answer", "")
                panel["sources"] = []
        else:
            if isinstance(data, dict):
                panel["answer"]  = data.get("answer", tool_input.get("answer", ""))
                panel["sources"] = data.get("sources", [])
    panels.append(panel)
    return {"rendered": True, "panelId": panel["id"]}


async def handle_action_panel(tool_input: dict, *, panels: list, **_kwargs) -> dict:
    panel = {
        "id":     f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
        "type":   tool_input["type"],
        "title":  tool_input["title"],
        "pinned": tool_input.get("pinned", False),
        "config": tool_input.get("config", {}),
    }
    panels.append(panel)
    return {"rendered": True, "panelId": panel["id"]}


async def handle_notice_panel(tool_input: dict, *, panels: list, **_kwargs) -> dict:
    panel = {
        "id":       f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
        "type":     "reminder-banner",
        "title":    tool_input["title"],
        "pinned":   tool_input.get("pinned", False),
        "config": {
            "message":    tool_input["message"],
            "severity":   tool_input.get("severity", "information"),
            "request_id": tool_input.get("request_id"),
        },
    }
    panels.append(panel)
    return {"rendered": True, "panelId": panel["id"]}
