"""
Main Orchestrator Agent — full port of as-service.js orchestrate action.
Runs an Anthropic tool-use loop with 20 tools, conversation memory via CAP,
and returns {reply, panels, proposedLayout, renameAssistant}.
"""
import json
import logging
import uuid
from datetime import datetime, timezone
from typing import Any

from app import cap_client, anthropic_client
from .models import HandoffContext

# ── Tool module imports ───────────────────────────────────────────────────────
from app.tools import (
    rename_assistant as t_rename_assistant,
    fetch_records as t_fetch_records,
    rr_lookup as t_rr_lookup,
    price_lookup as t_price_lookup,
    parse_email as t_parse_email,
    draft_price_email as t_draft_price_email,
    generate_o2i_ticket as t_generate_o2i_ticket,
    confirm_o2i_invoiced as t_confirm_o2i_invoiced,
    create_request as t_create_request,
    update_record as t_update_record,
    get_layout as t_get_layout,
    propose_layout_change as t_propose_layout_change,
    get_reminder_status as t_get_reminder_status,
    route_to_agent as t_route_to_agent,
    surface_pending_action as t_surface_pending_action,
    resolve_pending_action as t_resolve_pending_action,
    register_customer as t_register_customer,
    link_session_to_customer as t_link_session_to_customer,
    register_contract as t_register_contract,
    set_agent_status as t_set_agent_status,
    template_read as t_template_read,
    template_write as t_template_write,
    notes_read as t_notes_read,
    notes_write as t_notes_write,
    inject_document as t_inject_document,
    patch_meeting_note as t_patch_meeting_note,
    confirm_meeting_note_patch as t_confirm_meeting_note_patch,
    process_meeting_notes as t_process_meeting_notes,
    analyze_skill as t_analyze_skill,
)
from app.tools.panels import (
    ALL_TOOL_SCHEMAS as _PANEL_SCHEMAS,
    handle_record_panel,
    handle_data_panel,
    handle_action_panel,
    handle_notice_panel,
)

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


# ── Tool definitions — assembled from per-tool TOOL_SCHEMA constants ──────────

ORCHESTRATOR_TOOLS = [
    t_rename_assistant.TOOL_SCHEMA,
    t_fetch_records.TOOL_SCHEMA,
    *_PANEL_SCHEMAS,                        # render_record_panel, render_data_panel, render_action_panel, render_notice_panel
    t_rr_lookup.TOOL_SCHEMA,
    t_price_lookup.TOOL_SCHEMA,
    t_parse_email.TOOL_SCHEMA,
    t_draft_price_email.TOOL_SCHEMA,
    t_generate_o2i_ticket.TOOL_SCHEMA,
    t_confirm_o2i_invoiced.TOOL_SCHEMA,
    t_create_request.TOOL_SCHEMA,
    t_update_record.TOOL_SCHEMA,
    t_get_layout.TOOL_SCHEMA,
    t_propose_layout_change.TOOL_SCHEMA,
    t_get_reminder_status.TOOL_SCHEMA,
    t_route_to_agent.TOOL_SCHEMA,
    t_surface_pending_action.TOOL_SCHEMA,
    t_resolve_pending_action.TOOL_SCHEMA,
    t_register_customer.TOOL_SCHEMA,
    t_link_session_to_customer.TOOL_SCHEMA,
    t_register_contract.TOOL_SCHEMA,
    t_set_agent_status.TOOL_SCHEMA,
    t_template_read.TOOL_SCHEMA,
    t_template_write.TOOL_SCHEMA,
    t_notes_read.TOOL_SCHEMA,
    t_notes_write.TOOL_SCHEMA,
    t_inject_document.TOOL_SCHEMA,
    t_process_meeting_notes.TOOL_SCHEMA,
    t_patch_meeting_note.TOOL_SCHEMA,
    t_confirm_meeting_note_patch.TOOL_SCHEMA,
    t_analyze_skill.TOOL_SCHEMA,
]

assert len(ORCHESTRATOR_TOOLS) == 33, f"Expected 33 schemas, got {len(ORCHESTRATOR_TOOLS)}"

# ── Context builder ────────────────────────────────────────────────────────────

def _build_context_block(open_requests: list) -> str:
    lines = []

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

    return "\n".join(lines) if lines else "No data found in the database."


# ── Main run function ──────────────────────────────────────────────────────────

async def run(
    message: str,
    session_id: str = "default",
    card_context: str | None = None,
    cdm_email: str | None = None,
    assistant_name: str | None = None,
    activity_callback=None,
    customer_agent_id: str | None = None,
) -> dict:
    user_id = cdm_email or "anonymous"
    panels: list[dict] = []
    proposed_layout: dict | None = None
    renamed_to: str | None = None
    refresh_data: bool = False

    # ── 1. Load conversation history ──────────────────────────────────────────
    history = await cap_client.get_conversation_turns(user_id, session_id, limit=20)
    conversation_messages = [{"role": t["role"], "content": t["content"]} for t in history]
    conversation_messages.append({"role": "user", "content": message})
    is_first_turn = len(history) == 0

    # ── 2. Load ambient context ───────────────────────────────────────────────
    open_requests, config, pending_actions = await _load_context(user_id)

    # ── 2a. Resolve active customer from session ──────────────────────────────
    active_customer: dict | None = None
    resolved_customer_agent_id = customer_agent_id
    if not resolved_customer_agent_id:
        try:
            session = await cap_client.get_conversation_session(session_id)
            resolved_customer_agent_id = session.get("customerAgentId")
        except Exception:
            pass
    if resolved_customer_agent_id:
        try:
            all_customers = await cap_client.get_customer_agents()
            active_customer = next((c for c in all_customers if c["ID"] == resolved_customer_agent_id), None)
        except Exception:
            pass

    name         = assistant_name or config.get("assistant_name", "Beacon")
    active_model = anthropic_client._MODEL
    reminders    = await cap_client.get_reminder_status(cdm_owner=user_id)

    # ── 3. Build system prompt ────────────────────────────────────────────────
    context_block   = _build_context_block(open_requests)
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

    active_customer_block = ""
    if active_customer:
        cid = active_customer.get("customerId", "")
        cname = active_customer.get("displayName", "")
        active_customer_block = (
            f"\nACTIVE CUSTOMER SESSION: This conversation is scoped to customer "
            f"{cname} (ID: {cid}, AgentID: {resolved_customer_agent_id}). "
            f"When creating requests or performing actions for this customer, "
            f"use customerName={cname!r} and customerId={cid!r} automatically — do NOT ask the CDM to re-specify the customer.\n"
        )

    # ── 2b. Load latest meeting note for active customer ─────────────────────
    meeting_note_block = ""
    if resolved_customer_agent_id:
        try:
            notes = await cap_client.get_meeting_notes(resolved_customer_agent_id)
            if notes:
                note = notes[0]
                import json as _json
                full = _json.loads(note.get("extractedJson") or "{}")
                rollup   = full.get("analysis", {}).get("rollup", {})
                topics   = full.get("topics", [])
                actions  = full.get("analysis", {}).get("actionItems", [])
                risks    = full.get("analysis", {}).get("risks", [])
                decisions= full.get("analysis", {}).get("decisions", [])
                sr_refs  = full.get("analysis", {}).get("references", [])
                open_risks   = [r for r in risks    if r.get("status") == "Open"]
                overdue_acts = [a for a in actions  if a.get("overdue")]
                note_date = note.get("meetingDate") or (note.get("createdAt") or "")[:10]

                lines = [f"\nMEETING NOTES (last processed: {note_date}):"]
                if rollup.get("narrativeSummary"):
                    lines.append(f"Summary: {rollup['narrativeSummary']}")
                lines.append(f"Topics: {len(topics)} | Actions: {len(actions)} ({len(overdue_acts)} overdue) | Open risks: {len(open_risks)} | Decisions: {len(decisions)}")
                if rollup.get("avgAgeDaysOpenItems") is not None:
                    lines.append(f"Avg age open items: {rollup['avgAgeDaysOpenItems']}d | Closed this period: {rollup.get('closedInPeriod', '—')}")

                if topics:
                    lines.append("\nTOPICS:")
                    for t in topics:
                        flags = ", ".join(t.get("flags", []))
                        lines.append(f"  [{t.get('id','?')}] {t.get('title','?')} | {t.get('status','?')}"
                                     + (f" | {flags}" if flags else "")
                                     + (f" | Owner: {t['owner']}" if t.get('owner') and t['owner'] != 'TBD' else "")
                                     + (f" | Due: {t['due']}" if t.get('due') and t['due'] != 'TBD' else ""))
                        if t.get("summary"):
                            lines.append(f"    {t['summary']}")

                if overdue_acts:
                    lines.append("\nOVERDUE ACTIONS:")
                    for a in overdue_acts:
                        lines.append(f"  - {a.get('owner','?')}: {a.get('action','?')} (due {a.get('due','?')})")

                if actions and not overdue_acts:
                    lines.append("\nACTION ITEMS:")
                    for a in actions[:10]:
                        lines.append(f"  - {a.get('owner','?')}: {a.get('action','?')}" + (f" (due {a['due']})" if a.get('due') else ""))

                if open_risks:
                    lines.append("\nOPEN RISKS:")
                    for r in open_risks:
                        lines.append(f"  [{r.get('id','?')}] {r.get('description','?')}")

                if decisions:
                    lines.append("\nDECISIONS:")
                    for d in decisions[:8]:
                        lines.append(f"  [{d.get('id','?')} {d.get('date','')}] {d.get('text','?')}")

                if sr_refs:
                    lines.append("\nSR / TICKET INDEX:")
                    for s in sr_refs:
                        lines.append(f"  {s.get('ref','?')} ({s.get('type','?')}): {s.get('context','?')}")

                meeting_note_block = "\n".join(lines) + "\n"
        except Exception:
            pass

    system_prompt = f"""You are {name} — a CDM Personal Virtual Assistant and AI co-worker for SAP Customer Delivery Managers.
Your name is {name}. You understand the full AS process and can take actions on the CDM's behalf using the tools available.
If the CDM asks you to change your name, use rename_assistant.{first_turn_note}
{active_customer_block}
{meeting_note_block}
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
- create_request: create a new AS request DB entry — parse_email first if creating from a raw email; for manual/mock creation fill fields directly. If an active customer session is set, its name/ID are already known — do not ask.
- draft_price_email: draft a price-communication email for an AS request — ALWAYS call this before rendering an email-draft panel; never write email content yourself
- generate_o2i_ticket: generate the JIRA O2I invoice ticket body (returns draft for CDM review)
- confirm_o2i_invoiced: mark an AS request as Invoiced after O2I ticket is submitted
- update_record: update fields on a request (always show what will change first)
- propose_layout_change: suggest workspace layout changes (CDM must confirm) — always call get_layout first to read existing panels before adding or removing
- get_reminder_status: check which reminder rules are firing
- route_to_agent: delegate to a Customer Orchestrator or Contract Subagent (invisible to CDM)
- surface_pending_action: push a card to CDM Inbox for actions requiring human input. Include navigateTo JSON so clicking the notification goes directly to the right place (e.g. '{{"page":"client","customerAgentId":"<id>"}}' for a customer page, '{{"page":"inbox"}}' for inbox, or '{{"page":"client","customerAgentId":"<id>","requestId":"<req-id>"}}' to open a specific request). When the CDM says "notify me when X" or "watch for Y", call surface_pending_action with an appropriate prompt and navigateTo immediately.
- resolve_pending_action: mark a pending action as responded or dismissed
- register_customer: add a new customer to the nav
- register_contract: add a new contract under a customer
- set_agent_status: suspend, archive, or retire a customer/contract/integration agent (always confirm before retiring)
- process_meeting_notes: extract structured data from raw ops meeting notes and store on the client's dashboard. Call this immediately when the CDM pastes a block of meeting notes text (recognisable by date headings, topic numbers, owner/status lines, action items). Do NOT ask for confirmation first — just call it.
- patch_meeting_note: apply targeted updates to the stored meeting notes when the CDM types a natural-language change ("topic 3 is closed", "mark risk 1 resolved", "add action: Palash to check FMX by Friday"). Call patch_meeting_note to build the diff, show it to the CDM, then call confirm_meeting_note_patch only after explicit confirmation.
- confirm_meeting_note_patch: write pending patches to the database. Only call after CDM confirms.
- analyze_skill: analyze a pasted skill definition — extract inputs, outputs, risks. Call this immediately when the user pastes text that looks like a skill or prompt definition (markdown with ## headings like Workflow, Tools, Guardrails, or structured instruction blocks).

SKILL IMPORT DETECTION: If the user message is a long block of structured text with ## headings, instruction lists, or tool references that reads like a skill or prompt template — call analyze_skill immediately with the full text.

MEETING NOTES DETECTION: If the user message looks like raw meeting notes (contains topic numbers or bullet points with owners/status/dates, company name at top, or action items like "X to check"), call process_meeting_notes immediately with the entire message as raw_text.

MEETING NOTES UPDATE DETECTION: If the CDM is in a client session and types something that describes a change to existing meeting notes — status update, ownership change, new action item, closing a topic or risk, adding a decision — call patch_meeting_note with the appropriate patches. Show the diff, then wait for confirmation before calling confirm_meeting_note_patch.

CURRENT WORKSPACE STATE:
{context_block}

{reminder_lines}{inbox_lines}

ROUTING PRIORITY:
1. If CDM is replying to a pending action → resolve it via resolve_pending_action
2. If message looks like raw meeting notes (topic list, status/owner lines, action items) → process_meeting_notes immediately
3. If message mentions a customer name → route_to_agent (customer_orchestrator)
4. If message is a clear task (email parse) → parse_email then confirm with CDM then create_request; (price) → price_lookup; (O2I) → generate_o2i_ticket / confirm_o2i_invoiced
5. Otherwise handle directly

RULES:
- Be concise — CDMs are busy
- Never greet on non-first turns
- Always show CDM what will change before calling update_record
- Use render_record_panel / render_data_panel / render_action_panel / render_notice_panel to surface data visually; don't just list it in text
- When panels are rendered, keep the reply text to one short sentence max — never re-explain panel content in prose
- For price emails: call draft_price_email → then render_action_panel(type:email-draft) with the returned content. Never skip draft_price_email.
- Proactively surface active reminders via reminder-banner panels
- API key never goes to the browser

## Available subagent capabilities
{_all_capabilities()}"""

    # ── 4. Tool dispatcher ────────────────────────────────────────────────────
    # Mutable containers for side-effect outputs
    proposed_layout_container = [None]
    renamed_to_container      = [None]
    refresh_data_container    = [False]

    async def tool_dispatcher(tool_name: str, tool_input: dict) -> Any:
        return await _dispatch(
            tool_name, tool_input,
            panels=panels,
            proposed_layout_ref=proposed_layout_container,
            renamed_to_ref=renamed_to_container,
            refresh_data_ref=refresh_data_container,
            history=history,
            user_id=user_id,
            session_id=session_id,
            open_requests=open_requests,
            resolved_customer_agent_id=resolved_customer_agent_id,
            activity_callback=activity_callback,
        )

    # ── 5. Run tool-use loop ──────────────────────────────────────────────────
    result = await anthropic_client.chat_with_tools(
        system_prompt, conversation_messages, ORCHESTRATOR_TOOLS, tool_dispatcher,
    )
    reply = result["reply"]

    # ── 6. Persist conversation turns ─────────────────────────────────────────
    now = datetime.utcnow().isoformat() + "Z"
    await cap_client.save_conversation_turns([
        {"ID": str(uuid.uuid4()), "userId": user_id, "sessionId": session_id,
         "role": "user", "content": message, "agentName": "main_orchestrator",
         "customerAgentId": customer_agent_id, "createdAt": now},
        {"ID": str(uuid.uuid4()), "userId": user_id, "sessionId": session_id,
         "role": "assistant",
         "content": json.dumps({"reply": reply, "panels": panels, "toolOutputs": result["tool_outputs"]}),
         "agentName": "main_orchestrator", "customerAgentId": customer_agent_id, "createdAt": now},
    ])
    await cap_client.update_session_last_active(session_id)

    return {
        "reply":               reply,
        "panels":              panels if panels else None,
        "proposedLayout":      proposed_layout_container[0],
        "renameAssistant":     renamed_to_container[0],
        "refreshData":         refresh_data_container[0] or False,
    }


async def _load_context(user_id: str):
    import asyncio
    open_requests, config, pending_actions = await asyncio.gather(
        cap_client.get_open_requests(cdm_email=user_id),
        cap_client.get_admin_config(),
        cap_client.get_pending_actions(user_id),
    )
    return open_requests, config, pending_actions


async def _dispatch(
    tool_name: str,
    tool_input: dict,
    *,
    panels: list,
    proposed_layout_ref: list,
    renamed_to_ref: list,
    refresh_data_ref: list,
    history: list,
    user_id: str,
    session_id: str,
    open_requests: list,
    resolved_customer_agent_id: str | None = None,
    activity_callback=None,
) -> Any:
    # Common kwargs passed to every tool handler
    ctx = dict(
        panels=panels,
        proposed_layout_ref=proposed_layout_ref,
        renamed_to_ref=renamed_to_ref,
        refresh_data_ref=refresh_data_ref,
        history=history,
        user_id=user_id,
        session_id=session_id,
        open_requests=open_requests,
        resolved_customer_agent_id=resolved_customer_agent_id,
        activity_callback=activity_callback,
    )

    if tool_name == "rename_assistant":
        return await t_rename_assistant.handle(tool_input, **ctx)
    if tool_name == "fetch_records":
        return await t_fetch_records.handle(tool_input, **ctx)
    if tool_name == "render_record_panel":
        return await handle_record_panel(tool_input, **ctx)
    if tool_name == "render_data_panel":
        return await handle_data_panel(tool_input, **ctx)
    if tool_name == "render_action_panel":
        return await handle_action_panel(tool_input, **ctx)
    if tool_name == "render_notice_panel":
        return await handle_notice_panel(tool_input, **ctx)
    if tool_name == "rr_lookup":
        return await t_rr_lookup.handle(tool_input, **ctx)
    if tool_name == "price_lookup":
        return await t_price_lookup.handle(tool_input, **ctx)
    if tool_name == "parse_email":
        return await t_parse_email.handle(tool_input, **ctx)
    if tool_name == "draft_price_email":
        return await t_draft_price_email.handle(tool_input, **ctx)
    if tool_name == "generate_o2i_ticket":
        return await t_generate_o2i_ticket.handle(tool_input, **ctx)
    if tool_name == "confirm_o2i_invoiced":
        return await t_confirm_o2i_invoiced.handle(tool_input, **ctx)
    if tool_name == "create_request":
        return await t_create_request.handle(tool_input, **ctx)
    if tool_name == "update_record":
        return await t_update_record.handle(tool_input, **ctx)
    if tool_name == "get_layout":
        return await t_get_layout.handle(tool_input, **ctx)
    if tool_name == "propose_layout_change":
        return await t_propose_layout_change.handle(tool_input, **ctx)
    if tool_name == "get_reminder_status":
        return await t_get_reminder_status.handle(tool_input, **ctx)
    if tool_name == "route_to_agent":
        return await t_route_to_agent.handle(tool_input, **ctx)
    if tool_name == "surface_pending_action":
        return await t_surface_pending_action.handle(tool_input, **ctx)
    if tool_name == "resolve_pending_action":
        return await t_resolve_pending_action.handle(tool_input, **ctx)
    if tool_name == "register_customer":
        return await t_register_customer.handle(tool_input, **ctx)
    if tool_name == "link_session_to_customer":
        return await t_link_session_to_customer.handle(tool_input, **ctx)
    if tool_name == "register_contract":
        return await t_register_contract.handle(tool_input, **ctx)
    if tool_name == "set_agent_status":
        return await t_set_agent_status.handle(tool_input, **ctx)
    if tool_name == "template_read":
        return await t_template_read.handle(tool_input, **ctx)
    if tool_name == "template_write":
        return await t_template_write.handle(tool_input, **ctx)
    if tool_name == "notes_read":
        return await t_notes_read.handle(tool_input, **ctx)
    if tool_name == "notes_write":
        return await t_notes_write.handle(tool_input, **ctx)
    if tool_name == "inject_document":
        return await t_inject_document.handle(tool_input, **ctx)
    if tool_name == "process_meeting_notes":
        return await t_process_meeting_notes.handle(tool_input, **ctx)
    if tool_name == "patch_meeting_note":
        return await t_patch_meeting_note.handle(tool_input, **ctx)
    if tool_name == "confirm_meeting_note_patch":
        return await t_confirm_meeting_note_patch.handle(tool_input, **ctx)
    if tool_name == "analyze_skill":
        return await t_analyze_skill.handle(tool_input, **ctx)

    return {"error": f"Unknown tool: {tool_name}"}
