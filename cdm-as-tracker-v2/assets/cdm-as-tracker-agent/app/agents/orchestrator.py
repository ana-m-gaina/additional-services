"""
Main Orchestrator Agent — full port of as-service.js orchestrate action.
Runs an Anthropic tool-use loop with 11 tools, conversation memory via CAP,
and returns {reply, panels, proposedLayout, renameAssistant}.
"""
import json
import logging
import uuid
from datetime import datetime, timezone
from typing import Any

from app import cap_client, anthropic_client
from .models import HandoffContext

logger = logging.getLogger(__name__)


def _all_capabilities() -> str:
    from . import rr_agent, pricing_agent, request_management_agent, o2i_agent, client_agent, contract_agent
    all_caps = (
        rr_agent.capabilities()
        + pricing_agent.capabilities()
        + request_management_agent.capabilities()
        + o2i_agent.capabilities()
        + client_agent.capabilities()
        + contract_agent.capabilities()
    )
    return "\n".join(f"- {c}" for c in all_caps)


# ── Tool definitions (mirrors as-service.js ORCHESTRATOR_TOOLS) ──────────────

ORCHESTRATOR_TOOLS = [
    {
        "name": "rename_assistant",
        "description": "Rename the assistant to a new name chosen by the CDM. Call when CDM says 'call yourself X', 'rename to X', or similar.",
        "input_schema": {
            "type": "object",
            "required": ["newName"],
            "properties": {
                "newName": {"type": "string", "description": "The new assistant name"}
            },
        },
    },
    {
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
    },
    # ── Panel tools (Rec 6) ────────────────────────────────────────────────────
    {
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
    },
    {
        "name": "render_data_panel",
        "description": "Render a data-display panel: table, kpi-strip, checklist, or rr-source.",
        "input_schema": {
            "type": "object",
            "required": ["type", "title", "data"],
            "properties": {
                "type":   {"type": "string", "enum": ["table", "kpi-strip", "checklist", "rr-source"]},
                "title":  {"type": "string"},
                "data":   {"description": "Panel data — object or array depending on type"},
                "pinned": {"type": "boolean"},
            },
        },
    },
    {
        "name": "render_action_panel",
        "description": "Render an action panel: email-draft, field-form, confirm-dialog, or ticket-ref.",
        "input_schema": {
            "type": "object",
            "required": ["type", "title", "config"],
            "properties": {
                "type":   {"type": "string", "enum": ["email-draft", "field-form", "confirm-dialog", "ticket-ref"]},
                "title":  {"type": "string"},
                "config": {"type": "object", "description": "Type-specific config. For email-draft: {emailText, to, subject}. For field-form: {recordId, fields, editable}. For confirm-dialog: {message, confirmLabel, cancelLabel}. For ticket-ref: {ticketId, ticketUrl, system}."},
                "pinned": {"type": "boolean"},
            },
        },
    },
    {
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
    },
    # ── Subagent tools (Rec 1) ─────────────────────────────────────────────────
    {
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
    },
    {
        "name": "price_lookup",
        "description": (
            "Search the ingested AS Pricing List using vector search. "
            "Use whenever a CDM asks about price, cost, or EUR value of a service. "
            "If the CDM provides a specific service code (e.g. INFRA_1.8.10), call price_lookup directly — do NOT call rr_lookup first for pricing questions."
        ),
        "input_schema": {
            "type": "object",
            "required": ["service_code"],
            "properties": {
                "service_code": {"type": "string", "description": "The R&R service code to look up (e.g. INFRA_1.8.10)"},
            },
        },
    },
    {
        "name": "parse_email",
        "description": "Parse a raw customer email to extract AS request fields: customer name, service identifiers, ticket numbers, PO number, urgency notes.",
        "input_schema": {
            "type": "object",
            "required": ["raw_email"],
            "properties": {
                "raw_email": {"type": "string", "description": "The full text of the customer email to parse"},
            },
        },
    },
    {
        "name": "draft_price_email",
        "description": "Draft a price-communication email for an AS request.",
        "input_schema": {
            "type": "object",
            "required": ["request_id", "customer_name", "service_codes", "prices"],
            "properties": {
                "request_id":    {"type": "string", "description": "The AS request ID"},
                "customer_name": {"type": "string", "description": "Customer display name for the salutation"},
                "service_codes": {"type": "array", "items": {"type": "string"}, "description": "List of service codes covered by the email"},
                "prices":        {"type": "object", "description": "Map of service_code → price string, e.g. {\"INFRA_1.8.10\": \"1500.00 EUR\"}"},
            },
        },
    },
    {
        "name": "generate_o2i_ticket",
        "description": "Generate the JIRA O2I invoice ticket body for an AS request. Returns the draft ticket for CDM review before submission.",
        "input_schema": {
            "type": "object",
            "required": ["request_id"],
            "properties": {
                "request_id": {"type": "string", "description": "The AS request ID to generate the O2I ticket for"},
            },
        },
    },
    {
        "name": "confirm_o2i_invoiced",
        "description": "Confirm that the O2I JIRA ticket has been submitted and mark the AS request as Invoiced.",
        "input_schema": {
            "type": "object",
            "required": ["request_id"],
            "properties": {
                "request_id": {"type": "string", "description": "The AS request ID to mark as Invoiced"},
            },
        },
    },
    {
        "name": "update_record",
        "description": "Update fields on an AS request. Always show the CDM what will change before calling this.",
        "input_schema": {
            "type": "object",
            "required": ["recordId", "fields"],
            "properties": {
                "recordId": {"type": "string"},
                "fields":   {"type": "object"},
            },
        },
    },
    {
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
    },
    {
        "name": "get_reminder_status",
        "description": "Check which reminder rules are currently firing for the CDM's open requests.",
        "input_schema": {
            "type": "object",
            "properties": {
                "cdmOwner": {"type": "string"}
            },
        },
    },
    {
        "name": "route_to_agent",
        "description": "Delegate to a Client Orchestrator or Contract Subagent. Response comes back in same thread — CDM never sees the routing.",
        "input_schema": {
            "type": "object",
            "required": ["agentType", "clientId", "handoffSummary", "message"],
            "properties": {
                "agentType":      {"type": "string", "enum": ["client_orchestrator", "contract_subagent"]},
                "clientId":       {"type": "string"},
                "contractId":     {"type": "string"},
                "handoffSummary": {"type": "string"},
                "message":        {"type": "string"},
                "intent":         {"type": "string", "description": "the specific task being delegated"},
                "request_ids":    {"type": "array", "items": {"type": "string"}},
            },
        },
    },
    {
        "name": "surface_pending_action",
        "description": "Create a PendingAction and push a card to the CDM Inbox.",
        "input_schema": {
            "type": "object",
            "required": ["userId", "automationId", "prompt"],
            "properties": {
                "userId":           {"type": "string"},
                "automationId":     {"type": "string"},
                "prompt":           {"type": "string"},
                "relatedRequestId": {"type": "string"},
            },
        },
    },
    {
        "name": "resolve_pending_action",
        "description": "Mark a PendingAction as responded or dismissed.",
        "input_schema": {
            "type": "object",
            "required": ["pendingActionId", "status"],
            "properties": {
                "pendingActionId": {"type": "string"},
                "status":          {"type": "string", "enum": ["responded", "dismissed"]},
                "recordedData":    {"type": "object"},
            },
        },
    },
    {
        "name": "register_client",
        "description": "Create a new ClientAgent entry and add it to the nav.",
        "input_schema": {
            "type": "object",
            "required": ["customerId", "displayName"],
            "properties": {
                "customerId":  {"type": "string"},
                "displayName": {"type": "string"},
            },
        },
    },
    {
        "name": "register_contract",
        "description": "Create a new ContractSubagent under an existing ClientAgent.",
        "input_schema": {
            "type": "object",
            "required": ["clientId", "sid", "displayName", "contractType"],
            "properties": {
                "clientId":     {"type": "string"},
                "sid":          {"type": "string"},
                "displayName":  {"type": "string"},
                "contractType": {"type": "string", "enum": ["Classic", "ATLAS"]},
            },
        },
    },
    {
        "name": "set_agent_status",
        "description": "Change the lifecycle status of a client, contract, or automation agent. Use when CDM says 'suspend', 'archive', 'retire', or 'reactivate' an agent. Always confirm intent before retiring — it creates a tombstone.",
        "input_schema": {
            "type": "object",
            "required": ["agentType", "agentId", "newStatus"],
            "properties": {
                "agentType": {"type": "string", "enum": ["client", "contract", "automation"]},
                "agentId":   {"type": "string", "description": "ID of the ClientAgent, ContractSubagent, or AutomationAgent"},
                "newStatus": {"type": "string", "enum": ["active", "suspended", "archived", "retired"]},
                "reason":    {"type": "string", "description": "Optional reason for the status change"},
            },
        },
    },
]

# ── Context builder ────────────────────────────────────────────────────────────

def _build_context_block(open_requests: list, rr_data: list, pricing_data: list) -> str:
    lines = []
    pricing_map = {p.get("serviceCode", p.get("rrId", "")): p for p in pricing_data}

    if open_requests:
        lines.append("OPEN REQUESTS:")
        for r in open_requests:
            age = ""
            try:
                created = r.get("createdAt", "")
                if created:
                    d = datetime.fromisoformat(created.replace("Z", "+00:00"))
                    age = f" | {(datetime.now(timezone.utc) - d).days}d old"
            except Exception:
                pass
            lines.append(
                f"- [{r['ID']}] {r.get('customerName','?')} | {r.get('status','?')}"
                f" | AS: {r.get('additionalServiceIds') or r.get('serviceCode') or '—'}"
                f" | Owner: {r.get('assignedCDM') or r.get('cdmOwner','?')}{age}"
            )
            if r.get("price"):
                lines.append(f"  Price: {r['price']} {r.get('currency','EUR')} ({r.get('priceInWords','')})")
            if r.get("priceCommunicatedDate"):
                lines.append(f"  Price communicated: {r['priceCommunicatedDate']}")
            if r.get("amsTicketId"):
                lines.append(f"  AMS: {r['amsTicketId']} | Closed: {'yes' if r.get('checkAmsClosed') else 'no'}")
            if r.get("o2iTicketNo"):
                lines.append(f"  O2I ticket: {r['o2iTicketNo']}")

    if rr_data:
        lines.append("\nAVAILABLE ADDITIONAL SERVICES (R&R reference):")
        for r in rr_data:
            code = r.get("serviceCode") or r.get("rrId", "")
            pricing = pricing_map.get(code)
            price_str = f" | Price: {pricing['price']} {pricing.get('currency','EUR')}" if pricing else ""
            lines.append(
                f"- {code}: {r.get('serviceName') or r.get('description','?')}"
                f"{' [' + r.get('category','') + ']' if r.get('category') else ''}{price_str}"
            )

    return "\n".join(lines) if lines else "No data found in the database."


# ── Main run function ──────────────────────────────────────────────────────────

async def run(
    message: str,
    session_id: str = "default",
    card_context: str | None = None,
    cdm_email: str | None = None,
    assistant_name: str | None = None,
    activity_callback=None,
) -> dict:
    user_id = cdm_email or "anonymous"
    panels: list[dict] = []
    proposed_layout: dict | None = None
    renamed_to: str | None = None

    # ── 1. Load conversation history ──────────────────────────────────────────
    history = await cap_client.get_conversation_turns(user_id, session_id, limit=20)
    conversation_messages = [{"role": t["role"], "content": t["content"]} for t in history]
    conversation_messages.append({"role": "user", "content": message})
    is_first_turn = len(history) == 0

    # ── 2. Load ambient context ───────────────────────────────────────────────
    open_requests, rr_data, pricing_data, config, pending_actions = await _load_context(user_id)

    name         = assistant_name or config.get("assistant_name", "Beacon")
    active_model = anthropic_client._MODEL
    reminders    = await cap_client.get_reminder_status(cdm_owner=user_id)

    # ── 3. Build system prompt ────────────────────────────────────────────────
    context_block   = _build_context_block(open_requests, rr_data, pricing_data)
    reminder_lines  = "ACTIVE REMINDERS:\n" + "\n".join(
        f"[{r['type']}] {r['text']}" for r in reminders
    ) if reminders else "No active reminders."
    inbox_lines = (
        "\nPENDING ACTIONS IN INBOX:\n" +
        "\n".join(f"- [{a['ID']}] {a['prompt']}" for a in pending_actions)
    ) if pending_actions else ""

    first_turn_note = (
        f"\n\nFIRST SESSION NOTE: Start with a single short greeting: "
        f"(1) your name, (2) the active model ({active_model}), "
        f"(3) that any setting can be changed conversationally — name, model, preferences. "
        f"Example: \"Hi, I'm {name}, running on {active_model}. You can change my name or switch models at any time.\""
    ) if is_first_turn else ""

    system_prompt = f"""You are {name} — a CDM Personal Virtual Assistant and AI co-worker for SAP Customer Delivery Managers.
Your name is {name}. You understand the full AS process and can take actions on the CDM's behalf using the tools available.
If the CDM asks you to change your name, use rename_assistant.{first_turn_note}

CDM USER: {user_id}
ACTIVE MODEL: {active_model}

THE AS PROCESS (10 steps):
1. Customer emails about potential AS → extract fields via email_parse
2. Look up R&R spec for matching service → rr_match
3. Look up pricing → price_lookup
4. Check client contract + ATLAS (CDM verifies externally)
5. Communicate price to customer → draft_price_email
6. Customer accepts → CDM creates SPC ticket, records ticket ID
7. Create JIRA O2I invoice ticket → generate_o2i, then create_o2i_ticket
8. Delivery tracked via AMS/BCP/ITSM — track ticket IDs
9. Customer closes ticket → CDM marks customerClosureDate → AMS-close reminder
10. CDM closes JIRA O2I → confirm all checklist items → Complete

STATUS FLOW: New → PriceCommunicated → Approved → InDelivery → Delivered → Invoiced

TOOLS AVAILABLE:
- fetch_records: query the database for AS requests
- render_record_panel: render record-card or status-timeline for a specific AS request
- render_data_panel: render table, kpi-strip, checklist, or rr-source data panel
- render_action_panel: render email-draft, field-form, confirm-dialog, or ticket-ref panel
- render_notice_panel: render a reminder-banner notice
- rr_lookup: search R&R PDF documents — use for roles, responsibilities, chargeability questions
  • If rr_lookup returns found:false → ask 1-2 targeted clarifying questions then call rr_lookup again.
  • If rr_lookup returns too_broad:true (more than 3 codes) → ask 1-2 narrowing questions then call rr_lookup again.
  • Only show a result panel when rr_lookup returns 1-3 specific service codes.
- price_lookup: search AS Pricing List — use for price, cost, EUR value questions. If CDM gives a specific code, call price_lookup directly — do NOT call rr_lookup first.
- parse_email: extract AS request fields from a raw customer email
- draft_price_email: draft a price-communication email for an AS request
- generate_o2i_ticket: generate the JIRA O2I invoice ticket body (returns draft for CDM review)
- confirm_o2i_invoiced: mark an AS request as Invoiced after O2I ticket is submitted
- update_record: update fields on a request (always show what will change first)
- propose_layout_change: suggest workspace layout changes (CDM must confirm)
- get_reminder_status: check which reminder rules are firing
- route_to_agent: delegate to a Client Orchestrator or Contract Subagent (invisible to CDM)
- surface_pending_action: push a card to CDM Inbox for actions requiring human input
- resolve_pending_action: mark a pending action as responded or dismissed
- register_client: add a new client to the nav
- register_contract: add a new contract under a client
- set_agent_status: suspend, archive, or retire a client/contract/automation agent (always confirm before retiring)

CURRENT WORKSPACE STATE:
{context_block}

{reminder_lines}{inbox_lines}

ROUTING PRIORITY:
1. If CDM is replying to a pending action → resolve it via resolve_pending_action
2. If message mentions a customer name → route_to_agent (client_orchestrator)
3. If message is a clear task (email parse) → parse_email; (price) → price_lookup; (O2I) → generate_o2i_ticket / confirm_o2i_invoiced
4. Otherwise handle directly

RULES:
- Be concise — CDMs are busy
- Never greet on non-first turns
- Always show CDM what will change before calling update_record
- Use render_record_panel / render_data_panel / render_action_panel / render_notice_panel to surface data visually; don't just list it in text
- Proactively surface active reminders via reminder-banner panels
- API key never goes to the browser

## Available subagent capabilities
{_all_capabilities()}"""

    # ── 4. Tool dispatcher ────────────────────────────────────────────────────
    async def tool_dispatcher(tool_name: str, tool_input: dict) -> Any:
        return await _dispatch(
            tool_name, tool_input,
            panels=panels,
            proposed_layout_ref=proposed_layout_container,
            renamed_to_ref=renamed_to_container,
            history=history,
            user_id=user_id,
            session_id=session_id,
            open_requests=open_requests,
            activity_callback=activity_callback,
        )

    # Mutable containers for side-effect outputs
    proposed_layout_container = [None]
    renamed_to_container      = [None]

    # ── 5. Run tool-use loop ──────────────────────────────────────────────────
    result = await anthropic_client.chat_with_tools(
        system_prompt, conversation_messages, ORCHESTRATOR_TOOLS, tool_dispatcher
    )
    reply = result["reply"]

    # ── 6. Persist conversation turns ─────────────────────────────────────────
    now = datetime.utcnow().isoformat() + "Z"
    await cap_client.save_conversation_turns([
        {"ID": str(uuid.uuid4()), "userId": user_id, "sessionId": session_id,
         "role": "user", "content": message, "agentName": "main_orchestrator", "createdAt": now},
        {"ID": str(uuid.uuid4()), "userId": user_id, "sessionId": session_id,
         "role": "assistant",
         "content": json.dumps({"reply": reply, "panels": panels, "toolOutputs": result["tool_outputs"]}),
         "agentName": "main_orchestrator", "createdAt": now},
    ])

    return {
        "reply":           reply,
        "panels":          panels if panels else None,
        "proposedLayout":  proposed_layout_container[0],
        "renameAssistant": renamed_to_container[0],
    }


async def _load_context(user_id: str):
    import asyncio
    open_requests, rr_data, pricing_data, config, pending_actions = await asyncio.gather(
        cap_client.get_open_requests(cdm_email=user_id),
        cap_client.get_rr_entries(),
        cap_client.get_all_pricing(),
        cap_client.get_admin_config(),
        cap_client.get_pending_actions(user_id),
    )
    return open_requests, rr_data, pricing_data, config, pending_actions


async def _dispatch(
    tool_name: str,
    tool_input: dict,
    *,
    panels: list,
    proposed_layout_ref: list,
    renamed_to_ref: list,
    history: list,
    user_id: str,
    session_id: str,
    open_requests: list,
    activity_callback=None,
) -> Any:
    # Read-only tools — safe for concurrent dispatch:
    #   rr_lookup, price_lookup, parse_email, fetch_records, get_reminder_status
    # Write tools — must not be parallelised with conflicting writes:
    #   update_record, surface_pending_action, resolve_pending_action,
    #   register_client, register_contract, set_agent_status, route_to_agent,
    #   render_panel (or its typed variants), draft_price_email, generate_o2i_ticket, confirm_o2i_invoiced
    import app.agents.rr_agent as rr_agent
    import app.agents.pricing_agent as pricing_agent
    import app.agents.request_management_agent as rm_agent
    import app.agents.o2i_agent as o2i_agent
    import app.agents.client_agent as client_agent_mod
    import app.agents.contract_agent as contract_agent_mod

    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    if tool_name == "rename_assistant":
        new_name = tool_input.get("newName", "").strip()
        if not new_name:
            return {"error": "newName required"}
        renamed_to_ref[0] = new_name
        await cap_client.update_admin_config("assistant_name", new_name)
        return {"renamed": True, "newName": new_name}

    if tool_name == "fetch_records":
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

    if tool_name == "render_record_panel":
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

    if tool_name == "render_data_panel":
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

    if tool_name == "render_action_panel":
        panel = {
            "id":     f"panel-{len(panels)}-{uuid.uuid4().hex[:6]}",
            "type":   tool_input["type"],
            "title":  tool_input["title"],
            "pinned": tool_input.get("pinned", False),
            "config": tool_input.get("config", {}),
        }
        panels.append(panel)
        return {"rendered": True, "panelId": panel["id"]}

    if tool_name == "render_notice_panel":
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

    if tool_name == "rr_lookup":
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

    if tool_name == "price_lookup":
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

    if tool_name == "parse_email":
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

    if tool_name == "draft_price_email":
        await _activity("Drafting price communication email…")
        request_id = tool_input.get("request_id", "")
        if not request_id:
            return {"error": "request_id required"}
        record = await cap_client.get_as_request(request_id)
        safe = json.dumps({k: record.get(k) for k in
                           ["ID", "additionalServiceIds", "serviceCode", "price", "currency", "priceInWords", "serviceType"]})
        result = await anthropic_client.chat(
            "Fill in this SAP CDM price communication email template using the data provided. Be professional and concise. Return only the completed email text.",
            f"DATA: {safe}\n\nGenerate a price communication email for this AS request.",
        )
        return {"draft": result}

    if tool_name == "generate_o2i_ticket":
        await _activity("Generating O2I invoice ticket…")
        request_id = tool_input.get("request_id", "")
        if not request_id:
            return {"error": "request_id required"}
        body = await cap_client.generate_jira_ticket(request_id)
        return {"ticket_body": body, "note": "Please review and confirm submission to mark as Invoiced."}

    if tool_name == "confirm_o2i_invoiced":
        request_id = tool_input.get("request_id", "")
        if not request_id:
            return {"error": "request_id required"}
        result = await cap_client.confirm_invoiced(request_id)
        return {"confirmed": True, "status": result.get("status", "Invoiced")}

    if tool_name == "update_record":
        await _activity("Updating request…")
        record_id = tool_input.get("recordId")
        fields    = tool_input.get("fields", {})
        if not record_id or not fields:
            return {"error": "recordId and fields required"}
        try:
            if "status" in fields:
                await cap_client.advance_status(record_id, fields.pop("status"), fields.pop("comment", ""))
            if fields:
                await cap_client.patch_as_request(record_id, fields)
            return {"updated": True, "recordId": record_id, "fields": tool_input.get("fields", {})}
        except Exception as e:
            return {"error": str(e)}

    if tool_name == "propose_layout_change":
        proposed_layout_ref[0] = {
            "description": tool_input.get("description", ""),
            "newPanels":   tool_input.get("newPanels", []),
        }
        return {"proposed": True, "description": tool_input.get("description", "")}

    if tool_name == "get_reminder_status":
        owner    = tool_input.get("cdmOwner") or user_id
        reminders = await cap_client.get_reminder_status(cdm_owner=owner)
        return {"reminders": reminders, "count": len(reminders)}

    if tool_name == "route_to_agent":
        await _activity(f"Routing to {tool_input.get('agentType', 'agent')}…")
        agent_type  = tool_input.get("agentType")
        client_id   = tool_input.get("clientId")
        contract_id = tool_input.get("contractId")
        if not client_id:
            return {"error": "clientId required"}
        recent_turns = [{"role": t["role"], "content": t["content"]}
                        for t in history[-5:] if t.get("agentName") == (contract_id or client_id)]
        handoff = HandoffContext(
            to_agent=agent_type,
            intent=tool_input.get("intent", "general"),
            customer_id=tool_input.get("clientId", ""),
            contract_id=tool_input.get("contractId"),
            request_ids=tool_input.get("request_ids", []),
            summary=tool_input.get("handoffSummary", ""),
            recent_turns=recent_turns,
            message=tool_input.get("message", ""),
        )
        if agent_type == "contract_subagent":
            reply = await contract_agent_mod.run(handoff)
        else:
            reply = await client_agent_mod.run(handoff)
        return {"reply": reply, "agentName": contract_id or client_id}

    if tool_name == "surface_pending_action":
        target_user  = tool_input.get("userId", user_id)
        automation_id = tool_input.get("automationId", "")
        prompt_text  = tool_input.get("prompt", "")
        related      = tool_input.get("relatedRequestId")
        if not automation_id or not prompt_text:
            return {"error": "automationId and prompt required"}
        now = datetime.utcnow().isoformat() + "Z"
        result = await cap_client.create_pending_action({
            "ID": str(uuid.uuid4()),
            "userId": target_user,
            "automationId": automation_id,
            "sessionId": session_id,
            "prompt": prompt_text,
            "status": "pending",
            "relatedRequestId": related,
            "createdAt": now,
        })
        return {"created": True, "pendingActionId": result.get("ID")}

    if tool_name == "resolve_pending_action":
        action_id    = tool_input.get("pendingActionId")
        pa_status    = tool_input.get("status")
        recorded     = tool_input.get("recordedData")
        if not action_id or not pa_status:
            return {"error": "pendingActionId and status required"}
        result = await cap_client.resolve_pending_action(action_id, pa_status, recorded)
        return {"resolved": True, "pendingActionId": action_id, "status": pa_status}

    if tool_name == "register_client":
        customer_id  = tool_input.get("customerId", "")
        display_name = tool_input.get("displayName", "")
        if not customer_id or not display_name:
            return {"error": "customerId and displayName required"}
        result = await cap_client.register_client(customer_id, display_name, user_id)
        return {"created": True, "clientId": result.get("ID"), "displayName": display_name}

    if tool_name == "register_contract":
        client_id     = tool_input.get("clientId", "")
        sid           = tool_input.get("sid", "")
        display_name  = tool_input.get("displayName", "")
        contract_type = tool_input.get("contractType", "Classic")
        if not client_id or not sid or not display_name:
            return {"error": "clientId, sid, displayName required"}
        result = await cap_client.register_contract(client_id, sid, display_name, contract_type)
        return {"created": True, "contractId": result.get("ID"), "displayName": display_name}

    if tool_name == "set_agent_status":
        await _activity(f"Updating agent status…")
        agent_type = tool_input.get("agentType")
        agent_id   = tool_input.get("agentId")
        new_status = tool_input.get("newStatus")
        reason     = tool_input.get("reason", "")
        if not agent_type or not agent_id or not new_status:
            return {"error": "agentType, agentId, newStatus required"}
        entity_map = {"client": "ClientAgents", "contract": "ContractSubagents", "automation": "AutomationAgents"}
        entity = entity_map.get(agent_type)
        if not entity:
            return {"error": f"Unknown agentType: {agent_type}"}
        now = datetime.utcnow().isoformat() + "Z"
        fields = {"status": new_status}
        if new_status in ("archived", "retired"):
            fields["archivedAt"] = now
        try:
            await cap_client.patch(f"/{entity}({agent_id})", fields)
            if new_status == "retired":
                # Fetch the full record for the tombstone snapshot
                record = await cap_client.get(f"/{entity}({agent_id})")
                await cap_client.post("/RetiredAgents", {
                    "ID": str(uuid.uuid4()),
                    "originalId":  agent_id,
                    "agentType":   agent_type,
                    "displayName": record.get("displayName", agent_id),
                    "retiredBy":   user_id,
                    "retiredAt":   now,
                    "reason":      reason,
                    "snapshotJson": json.dumps(record),
                })
            return {"updated": True, "agentId": agent_id, "newStatus": new_status}
        except Exception as e:
            return {"error": str(e)}

    return {"error": f"Unknown tool: {tool_name}"}
