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

# Keyed by session_id; holds staged meeting note patches awaiting CDM confirmation
_pending_patches: dict = {}


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
    },
    {
        "name": "render_action_panel",
        "description": "Render an action panel. For email-draft type: you MUST call draft_price_email first and use its returned draft/subject/to values — never write email content yourself. For other types: field-form, confirm-dialog, ticket-ref.",
        "input_schema": {
            "type": "object",
            "required": ["type", "title", "config"],
            "properties": {
                "type":   {"type": "string", "enum": ["email-draft", "field-form", "confirm-dialog", "ticket-ref"]},
                "title":  {"type": "string"},
                "config": {"type": "object", "description": "Type-specific config. For email-draft: {emailText, to, subject} — values come from draft_price_email result. For field-form: {recordId, fields, editable}. For confirm-dialog: {message, confirmLabel, cancelLabel}. For ticket-ref: {ticketId, ticketUrl, system}."},
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
        "name": "create_request",
        "description": (
            "Create a new AS request entry in the database. "
            "If creating from a raw customer email, call parse_email first to extract fields. "
            "If creating manually or with mock data, fill the fields directly — do NOT require an email. "
            "Always show the CDM a summary of what will be created and ask for confirmation before calling this. "
            "If an ACTIVE CUSTOMER SESSION is set, use that customer's name and ID automatically — do NOT ask the CDM which customer. "
            "Required: customerName, sid, assignedCDM. Include additionalServiceIds (R&R codes), description, poNumber, customerAccountId if available."
        ),
        "input_schema": {
            "type": "object",
            "required": ["customerName", "sid", "assignedCDM"],
            "properties": {
                "customerName":       {"type": "string", "description": "Customer display name"},
                "requestTitle":       {"type": "string", "description": "Short title for the request, e.g. 'HANA DB Upgrade — PRD'"},
                "customerAccountId":  {"type": "string", "description": "SAP customer account / IHC number"},
                "sid":                {"type": "string", "description": "System SID"},
                "additionalServiceIds": {"type": "string", "description": "Comma-separated R&R service codes e.g. MOVE_1.3.04"},
                "description":        {"type": "string", "description": "Free-text description of the requested service"},
                "poNumber":           {"type": "string", "description": "PO number if provided in the email"},
                "assignedCDM":        {"type": "string", "description": "CDM email address — use the logged-in CDM"},
                "status":             {"type": "string", "description": "Initial status — defaults to New"},
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
        "name": "get_layout",
        "description": "Read the CDM's current saved dashboard layout. Call this before propose_layout_change whenever the CDM asks to add, remove, or modify panels.",
        "input_schema": {"type": "object", "properties": {}},
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
        "description": "Delegate to a Customer Orchestrator or Contract Subagent. Response comes back in same thread — CDM never sees the routing.",
        "input_schema": {
            "type": "object",
            "required": ["agentType", "customerId", "handoffSummary", "message"],
            "properties": {
                "agentType":      {"type": "string", "enum": ["customer_orchestrator", "contract_subagent"]},
                "customerId":     {"type": "string"},
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
        "name": "register_customer",
        "description": "Create a new CustomerAgent entry and add it to the nav.",
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
        "name": "link_session_to_customer",
        "description": (
            "Link the current general conversation session to a specific customer. "
            "Call this when the CDM's question is clearly about one specific customer "
            "and the session was started as a general (non-customer) chat. "
            "After linking, the session will appear under that customer in the sidebar."
        ),
        "input_schema": {
            "type": "object",
            "required": ["customer_agent_id"],
            "properties": {
                "customer_agent_id": {
                    "type": "string",
                    "description": "The CustomerAgent.ID (UUID) to link this session to.",
                },
            },
        },
    },
    {
        "name": "register_contract",
        "description": "Create a new ContractSubagent under an existing CustomerAgent.",
        "input_schema": {
            "type": "object",
            "required": ["customerId", "sid", "displayName", "contractType"],
            "properties": {
                "customerId":   {"type": "string"},
                "sid":          {"type": "string"},
                "displayName":  {"type": "string"},
                "contractType": {"type": "string", "enum": ["Classic", "ATLAS"]},
            },
        },
    },
    {
        "name": "set_agent_status",
        "description": "Change the lifecycle status of a customer, contract, or integration agent. Use when CDM says 'suspend', 'archive', 'retire', or 'reactivate' an agent. Always confirm intent before retiring — it creates a tombstone.",
        "input_schema": {
            "type": "object",
            "required": ["agentType", "agentId", "newStatus"],
            "properties": {
                "agentType": {"type": "string", "enum": ["customer", "contract", "integration"]},
                "agentId":   {"type": "string", "description": "ID of the CustomerAgent, ContractSubagent, or IntegrationAgent"},
                "newStatus": {"type": "string", "enum": ["active", "suspended", "archived", "retired"]},
                "reason":    {"type": "string", "description": "Optional reason for the status change"},
            },
        },
    },
    {
        "name": "template_read",
        "description": "Read a template by key. Checks private (CDM-owned) templates first, falls back to shared templates. Use when CDM asks to use a template, draft from a template, or 'use my price email'.",
        "input_schema": {
            "type": "object",
            "required": ["key"],
            "properties": {
                "key": {"type": "string", "description": "Template key, e.g. 'price_email', 'jira_o2i', or a custom name the CDM gave their template"},
                "cdm_email": {"type": "string", "description": "CDM email for private template lookup — omit to get shared only"}
            }
        }
    },
    {
        "name": "template_write",
        "description": "Save or update a personal template for the CDM. Use when CDM says 'save this as my template', 'remember this format', or 'create a template called X'.",
        "input_schema": {
            "type": "object",
            "required": ["key", "content"],
            "properties": {
                "key": {"type": "string", "description": "Template key/name"},
                "content": {"type": "string", "description": "Full template text"},
                "description": {"type": "string", "description": "Short description of what the template is for"}
            }
        }
    },
    {
        "name": "notes_read",
        "description": "Read the CDM's personal reference notes. Use when CDM asks about their saved notes, personal process info, or when context suggests personal reference data would help.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Optional search query to filter relevant notes"}
            }
        }
    },
    {
        "name": "notes_write",
        "description": "Save a personal note for the CDM. Use when CDM says 'remember this', 'save this', 'note that', or wants to store process info or reference text for later.",
        "input_schema": {
            "type": "object",
            "required": ["content"],
            "properties": {
                "content": {"type": "string", "description": "The note content to save"},
                "tags": {"type": "string", "description": "Optional comma-separated tags for searching later"},
                "relatedRequest": {"type": "string", "description": "Optional AS request ID this note is about"},
                "sessionId": {"type": "string", "description": "Current session ID"}
            }
        }
    },
    {
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
    },
    {
        "name": "process_meeting_notes",
        "description": (
            "Extract structured data from raw ops meeting notes and store it on the client's dashboard. "
            "Call this when the user pastes or uploads meeting notes text. "
            "The tool identifies the client automatically from the notes content."
        ),
        "input_schema": {
            "type": "object",
            "required": ["raw_text"],
            "properties": {
                "raw_text": {
                    "type": "string",
                    "description": "The full raw meeting notes text pasted or uploaded by the CDM",
                },
            },
        },
    },
    {
        "name": "patch_meeting_note",
        "description": (
            "Apply one or more targeted updates to the stored meeting notes for the active client. "
            "Call this when the CDM types a natural-language update like 'topic 3 is now closed', "
            "'mark risk 1 as resolved', 'add action: Palash to check FMX by Friday', "
            "'update topic 8 owner to Sudhir', or 'add decision: agreed to defer profile changes to April'. "
            "The tool applies the patches in memory and returns a human-readable diff — "
            "show the diff to the CDM and ask for confirmation BEFORE calling confirm_meeting_note_patch."
        ),
        "input_schema": {
            "type": "object",
            "required": ["patches"],
            "properties": {
                "patches": {
                    "type": "array",
                    "description": "List of patch operations to apply",
                    "items": {
                        "type": "object",
                        "required": ["op", "target"],
                        "properties": {
                            "op": {
                                "type": "string",
                                "enum": [
                                    "set_topic_status", "set_topic_owner", "set_topic_due",
                                    "add_topic_bullet", "close_topic",
                                    "add_action", "complete_action", "update_action_owner", "update_action_due",
                                    "close_risk", "add_decision", "update_narrative"
                                ],
                                "description": "Type of patch"
                            },
                            "target": {
                                "type": "string",
                                "description": "Topic id, action text, risk id, or 'narrative' depending on op"
                            },
                            "value": {
                                "type": "string",
                                "description": "New value — status string, owner name, date, bullet text, action text, decision text, or narrative paragraph"
                            },
                            "owner": {"type": "string", "description": "For add_action: who owns it"},
                            "due":   {"type": "string", "description": "For add_action: due date"},
                        }
                    }
                }
            }
        }
    },
    {
        "name": "confirm_meeting_note_patch",
        "description": (
            "Write the pending meeting note patches to the database. "
            "Only call this AFTER patch_meeting_note has returned a diff AND the CDM has explicitly confirmed the changes."
        ),
        "input_schema": {"type": "object", "properties": {}},
    },
]

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
- surface_pending_action: push a card to CDM Inbox for actions requiring human input
- resolve_pending_action: mark a pending action as responded or dismissed
- register_customer: add a new customer to the nav
- register_contract: add a new contract under a customer
- set_agent_status: suspend, archive, or retire a customer/contract/integration agent (always confirm before retiring)
- process_meeting_notes: extract structured data from raw ops meeting notes and store on the client's dashboard. Call this immediately when the CDM pastes a block of meeting notes text (recognisable by date headings, topic numbers, owner/status lines, action items). Do NOT ask for confirmation first — just call it.
- patch_meeting_note: apply targeted updates to the stored meeting notes when the CDM types a natural-language change ("topic 3 is closed", "mark risk 1 resolved", "add action: Palash to check FMX by Friday"). Call patch_meeting_note to build the diff, show it to the CDM, then call confirm_meeting_note_patch only after explicit confirmation.
- confirm_meeting_note_patch: write pending patches to the database. Only call after CDM confirms.

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

    # Mutable containers for side-effect outputs
    proposed_layout_container = [None]
    renamed_to_container      = [None]
    refresh_data_container    = [False]

    # ── 5. Run tool-use loop ──────────────────────────────────────────────────
    result = await anthropic_client.chat_with_tools(
        system_prompt, conversation_messages, ORCHESTRATOR_TOOLS, tool_dispatcher
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
    # Read-only tools — safe for concurrent dispatch:
    #   rr_lookup, price_lookup, parse_email, fetch_records, get_reminder_status,
    #   template_read, notes_read, inject_document
    # Write tools — must not be parallelised with conflicting writes:
    #   update_record, surface_pending_action, resolve_pending_action,
    #   register_customer, register_contract, set_agent_status, route_to_agent,
    #   render_record_panel, render_data_panel, render_action_panel, render_notice_panel,
    #   draft_price_email, generate_o2i_ticket, confirm_o2i_invoiced, template_write
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

    if tool_name == "create_request":
        await _activity("Creating AS request…")
        import uuid as _uuid
        description = tool_input.get("description", "")
        title = tool_input.get("requestTitle") or (description[:80] if description else "AS Request")
        data = {
            "ID":                   str(_uuid.uuid4()),
            "requestTitle":         title,
            "customerName":         tool_input.get("customerName", ""),
            "customerAccountId":    tool_input.get("customerAccountId", ""),
            "sid":                  tool_input.get("sid", ""),
            "additionalServiceIds": tool_input.get("additionalServiceIds", ""),
            "description":          description,
            "poNumber":             tool_input.get("poNumber", ""),
            "assignedCDM":          tool_input.get("assignedCDM") or user_id,
            "cdmOwner":             tool_input.get("assignedCDM") or user_id,
            "status":               tool_input.get("status") or "New",
        }
        result = await cap_client.create_as_request(data)
        refresh_data_ref[0] = True
        return {"created": True, "requestId": result.get("ID"), "record": result, "refreshData": True}

    if tool_name == "draft_price_email":
        await _activity("Drafting price communication email…")
        request_id = tool_input.get("request_id", "")
        if not request_id:
            return {"error": "request_id required"}
        record = await cap_client.get_as_request(request_id)

        # Resolve template: personal override → shared fallback
        tpl = await cap_client.get_personal_template(user_id, "price_email")
        if not tpl:
            tpl = await cap_client.get_shared_template("price_email")

        # Build substitution values from record
        price_valid = record.get("priceValidUntil") or ""
        if not price_valid and record.get("priceCommunicatedDate"):
            # compute on-the-fly if not already set
            from datetime import date, timedelta
            try:
                base = date.fromisoformat(record["priceCommunicatedDate"])
                price_valid = (base + timedelta(days=90)).isoformat()
            except Exception:
                pass
        if not price_valid:
            from datetime import date, timedelta
            price_valid = (date.today() + timedelta(days=90)).isoformat()

        fields = {
            "customerName":    record.get("customerName", "Customer"),
            "customerAccountId": record.get("customerAccountId", ""),
            "sid":             record.get("sid", ""),
            "serviceCode":     record.get("serviceCode") or record.get("additionalServiceIds", ""),
            "serviceType":     record.get("serviceType", ""),
            "rrDescription":   record.get("rrDescription") or record.get("description", ""),
            "price":           str(record.get("price", "")),
            "currency":        record.get("currency", "EUR"),
            "priceInWords":    record.get("priceInWords", ""),
            "priceValidUntil": price_valid,
        }

        if tpl:
            # Fill placeholders in template; ask Claude to clean up any blanks
            body_raw = tpl.get("content") or tpl.get("body", "")
            subject_raw = tpl.get("subject", f"Additional Services Price Proposal — {fields['serviceCode']}")
            filled_body = body_raw
            filled_subject = subject_raw
            for k, v in fields.items():
                filled_body    = filled_body.replace("{{" + k + "}}", v)
                filled_subject = filled_subject.replace("{{" + k + "}}", v)

            # Only call model if there are unfilled placeholders
            if "{{" in filled_body:
                filled_body = await anthropic_client.chat(
                    "You are filling in a SAP CDM price communication email template. Replace any remaining {{placeholder}} tokens with appropriate professional text based on the context. Do not change the structure or add new sections. Return only the completed email body.",
                    f"RECORD: {json.dumps(fields)}\n\nTEMPLATE:\n{filled_body}"
                )
        else:
            # No template at all — generate structured email directly
            filled_subject = f"Additional Services Price Proposal — {fields['serviceCode']}"
            filled_body = await anthropic_client.chat(
                "Write a professional SAP CDM price communication email. Include: customer name, system SID, service code, service description, price with currency written out in words, price validity date (90 days). Use formal business English. Return only the email body, no subject line.",
                f"RECORD: {json.dumps(fields)}"
            )

        return {
            "draft": filled_body,
            "subject": filled_subject,
            "to": record.get("customerName", ""),
            "requestId": request_id,
            "serviceCode": fields["serviceCode"],
            "price": fields["price"],
            "currency": fields["currency"],
        }

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

    if tool_name == "get_layout":
        row = await cap_client.get_persona_layout(user_id)
        if not row or not row.get("layoutJson"):
            return {"panels": []}
        try:
            return {"panels": json.loads(row["layoutJson"]).get("panels", [])}
        except Exception:
            return {"panels": []}

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
        agent_type   = tool_input.get("agentType")
        customer_id  = tool_input.get("customerId")
        contract_id  = tool_input.get("contractId")
        if not customer_id:
            return {"error": "customerId required"}
        recent_turns = [{"role": t["role"], "content": t["content"]}
                        for t in history[-5:] if t.get("agentName") == (contract_id or customer_id)]
        handoff = HandoffContext(
            to_agent=agent_type,
            intent=tool_input.get("intent", "general"),
            customer_id=tool_input.get("customerId", ""),
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
        return {"reply": reply, "agentName": contract_id or customer_id}

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

    if tool_name == "register_customer":
        customer_id  = tool_input.get("customerId", "")
        display_name = tool_input.get("displayName", "")
        if not customer_id or not display_name:
            return {"error": "customerId and displayName required"}
        result = await cap_client.register_customer(customer_id, display_name, user_id)
        return {"created": True, "customerId": result.get("ID"), "displayName": display_name}

    if tool_name == "link_session_to_customer":
        cag_id = tool_input.get("customer_agent_id", "")
        if not cag_id:
            return {"error": "customer_agent_id required"}
        await cap_client.link_session_to_customer(session_id, cag_id)
        return {"linked": True, "sessionId": session_id, "customerAgentId": cag_id}

    if tool_name == "register_contract":
        customer_id   = tool_input.get("customerId", "")
        sid           = tool_input.get("sid", "")
        display_name  = tool_input.get("displayName", "")
        contract_type = tool_input.get("contractType", "Classic")
        if not customer_id or not sid or not display_name:
            return {"error": "customerId, sid, displayName required"}
        result = await cap_client.register_contract(customer_id, sid, display_name, contract_type)
        return {"created": True, "contractId": result.get("ID"), "displayName": display_name}

    if tool_name == "set_agent_status":
        await _activity(f"Updating agent status…")
        agent_type = tool_input.get("agentType")
        agent_id   = tool_input.get("agentId")
        new_status = tool_input.get("newStatus")
        reason     = tool_input.get("reason", "")
        if not agent_type or not agent_id or not new_status:
            return {"error": "agentType, agentId, newStatus required"}
        entity_map = {"customer": "CustomerAgents", "contract": "ContractSubagents", "integration": "IntegrationAgents"}
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

    if tool_name == "template_read":
        key = tool_input.get("key", "")
        cdm_email = tool_input.get("cdm_email", user_id)
        try:
            private = await cap_client.get_personal_template(cdm_email, key)
            if private:
                return {"found": True, "key": key, "source": "private", "content": private["content"], "description": private.get("description", "")}
        except Exception:
            pass
        try:
            shared = await cap_client.get_shared_template(key)
            if shared:
                return {"found": True, "key": key, "source": "shared", "content": shared["content"], "description": shared.get("description", "")}
        except Exception:
            pass
        return {"found": False, "key": key, "message": f"No template found with key '{key}'. Available shared templates: price_email, jira_o2i"}

    if tool_name == "template_write":
        key = tool_input.get("key", "")
        content = tool_input.get("content", "")
        description = tool_input.get("description", "")
        try:
            await cap_client.save_personal_template(user_id, key, content, description)
            return {"saved": True, "key": key, "message": f"Template '{key}' saved to your personal templates."}
        except Exception as e:
            return {"saved": False, "error": str(e)}

    if tool_name == "notes_read":
        query = tool_input.get("query", "")
        try:
            notes = await cap_client.get_personal_notes(user_id, query)
            if not notes:
                return {"found": False, "message": "No personal notes found. You can ask me to save notes anytime."}
            return {"found": True, "count": len(notes), "notes": notes}
        except Exception as e:
            return {"found": False, "error": str(e)}

    if tool_name == "notes_write":
        content = tool_input.get("content", "").strip()
        if not content:
            return {"saved": False, "error": "content is required"}
        try:
            await cap_client.save_personal_note(
                user_id,
                content,
                tags=tool_input.get("tags", ""),
                related_request=tool_input.get("relatedRequest", ""),
                session_id=tool_input.get("sessionId", "")
            )
            return {"saved": True, "message": "Note saved to your personal notes."}
        except Exception as e:
            return {"saved": False, "error": str(e)}

    if tool_name == "inject_document":
        content = tool_input.get("content", "")
        title = tool_input.get("title", "Document")
        doc_type = tool_input.get("type", "other")
        word_count = len(content.split())
        return {
            "loaded": True,
            "title": title,
            "type": doc_type,
            "word_count": word_count,
            "content": content,
            "note": "Document loaded into context for this session only. Not stored anywhere."
        }

    if tool_name == "patch_meeting_note":
        patches = tool_input.get("patches", [])
        if not patches:
            return {"error": "No patches provided"}
        if not resolved_customer_agent_id:
            return {"error": "No active client session — open a client chat first"}

        await _activity("Loading meeting notes for patching…")
        try:
            notes = await cap_client.get_meeting_notes(resolved_customer_agent_id)
        except Exception as e:
            return {"error": f"Could not load meeting notes: {e}"}
        if not notes:
            return {"error": "No meeting notes found for this client. Process a full set of notes first."}

        note = notes[0]
        try:
            full = json.loads(note.get("extractedJson") or "{}")
        except Exception:
            return {"error": "Could not parse stored meeting notes JSON"}

        diff_lines = []
        today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

        for p in patches:
            op     = p.get("op", "")
            target = p.get("target", "")
            value  = p.get("value", "")

            topics   = full.get("topics", [])
            analysis = full.get("analysis", {})
            actions  = analysis.get("actionItems", [])
            risks    = analysis.get("risks", [])
            decisions= analysis.get("decisions", [])

            if op == "set_topic_status":
                for t in topics:
                    if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                        old = t.get("status","?")
                        t["status"] = value
                        diff_lines.append(f"Topic {t.get('id') or t.get('title')}: status {old} → {value}")
                        break

            elif op == "close_topic":
                for t in topics:
                    if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                        old = t.get("status","?")
                        t["status"] = "Closed"
                        if "Closed" not in t.get("flags", []):
                            t.setdefault("flags", []).append("Closed")
                        diff_lines.append(f"Topic {t.get('id') or t.get('title')}: status {old} → Closed")
                        break

            elif op == "set_topic_owner":
                for t in topics:
                    if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                        old = t.get("owner","TBD")
                        t["owner"] = value
                        diff_lines.append(f"Topic {t.get('id') or t.get('title')}: owner {old} → {value}")
                        break

            elif op == "set_topic_due":
                for t in topics:
                    if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                        old = t.get("due","TBD")
                        t["due"] = value
                        diff_lines.append(f"Topic {t.get('id') or t.get('title')}: due {old} → {value}")
                        break

            elif op == "add_topic_bullet":
                for t in topics:
                    if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                        current = t.setdefault("timeline", {}).setdefault("current", [])
                        if current and current[0].get("date") == today_str:
                            current[0].setdefault("bullets", []).append(value)
                        else:
                            current.insert(0, {"date": today_str, "bullets": [value]})
                        diff_lines.append(f"Topic {t.get('id') or t.get('title')}: added bullet → \"{value}\"")
                        break

            elif op == "add_action":
                owner = p.get("owner", "TBD")
                due   = p.get("due", None)
                overdue = False
                if due:
                    try:
                        overdue = due < today_str
                    except Exception:
                        pass
                new_action = {"text": value, "owner": owner, "due": due, "topicRef": target, "overdue": overdue}
                actions.append(new_action)
                analysis["actionItems"] = actions
                full["analysis"] = analysis
                diff_lines.append(f"New action added: {owner}: {value}" + (f" (due {due})" if due else ""))

            elif op == "complete_action":
                for a in actions:
                    if target.lower() in (a.get("text","") or "").lower() or target.lower() in (a.get("owner","") or "").lower():
                        a["overdue"] = False
                        a["completedDate"] = today_str
                        diff_lines.append(f"Action marked complete: {a.get('owner','?')}: {a.get('text','?')}")
                        break

            elif op == "update_action_owner":
                for a in actions:
                    if target.lower() in (a.get("text","") or "").lower():
                        old = a.get("owner","?")
                        a["owner"] = value
                        diff_lines.append(f"Action owner changed: \"{a.get('text','?')}\" {old} → {value}")
                        break

            elif op == "update_action_due":
                for a in actions:
                    if target.lower() in (a.get("text","") or "").lower():
                        old = a.get("due","?")
                        a["due"] = value
                        try:
                            a["overdue"] = value < today_str
                        except Exception:
                            pass
                        diff_lines.append(f"Action due date changed: \"{a.get('text','?')}\" {old} → {value}")
                        break

            elif op == "close_risk":
                for r in risks:
                    if r.get("id","").lower() == target.lower() or target.lower() in r.get("description","").lower():
                        old = r.get("status","?")
                        r["status"] = "Closed"
                        r["closedDate"] = today_str
                        diff_lines.append(f"Risk {r.get('id','?')} closed: {r.get('description','?')}")
                        break

            elif op == "add_decision":
                existing = decisions
                new_id = f"DEC-{today_str[:4]}-{len(existing)+1:03d}"
                new_dec = {"id": new_id, "date": today_str, "text": value, "topicRef": target, "subTopicRef": None, "agreedBy": None}
                decisions.append(new_dec)
                analysis["decisions"] = decisions
                full["analysis"] = analysis
                diff_lines.append(f"New decision {new_id}: {value}")

            elif op == "update_narrative":
                if "rollup" not in analysis:
                    analysis["rollup"] = {}
                old = analysis["rollup"].get("narrativeSummary","(none)")
                analysis["rollup"]["narrativeSummary"] = value
                full["analysis"] = analysis
                diff_lines.append(f"Narrative summary updated")

        if not diff_lines:
            return {"error": "No matching topics, actions, or risks found for the requested patches. Check the topic ID or description."}

        # Store pending patch state keyed by session_id
        _pending_patches[session_id] = {
            "note_id":     note.get("ID"),
            "customer_agent_id": resolved_customer_agent_id,
            "patched_json": json.dumps(full),
            "topics_json":  json.dumps(full.get("topics",[])),
            "actions_json": json.dumps(full.get("analysis",{}).get("actionItems",[])),
            "risks_json":   json.dumps(full.get("analysis",{}).get("risks",[])),
            "decisions_json": json.dumps(full.get("analysis",{}).get("decisions",[])),
            "client_name":  note.get("clientName",""),
            "meeting_date": note.get("meetingDate",""),
        }

        return {
            "pending": True,
            "diff": diff_lines,
            "summary": f"{len(diff_lines)} change{'s' if len(diff_lines) != 1 else ''} staged — awaiting confirmation",
        }

    if tool_name == "confirm_meeting_note_patch":
        pending = _pending_patches.pop(session_id, None)
        if not pending:
            return {"error": "No pending patch found. Call patch_meeting_note first."}

        await _activity("Saving updated meeting notes…")
        try:
            await cap_client.save_meeting_note(
                customer_agent_id=pending["customer_agent_id"],
                client_name=pending["client_name"],
                meeting_date=pending["meeting_date"],
                raw_text="",
                extracted_json=pending["patched_json"],
                topics_json=pending["topics_json"],
                action_items_json=pending["actions_json"],
                risks_json=pending["risks_json"],
                decisions_json=pending["decisions_json"],
            )
        except Exception as e:
            return {"error": f"Failed to save: {e}"}

        refresh_data_ref[0] = True
        return {"saved": True, "message": "Meeting notes updated and dashboard refreshed."}

    if tool_name == "process_meeting_notes":
        raw_text = tool_input.get("raw_text", "").strip()
        if not raw_text:
            return {"error": "raw_text is required"}

        await _activity("Extracting meeting notes structure…")

        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        EXTRACTION_SYSTEM = f"""You are a meeting notes extraction agent. Extract structured data from raw OPS meeting notes and return a complete ClientRecord JSON.

Return ONLY a valid JSON object — no markdown fences, no explanation, no commentary.

The output must conform exactly to this schema. All fields shown are required unless marked optional.

---
## TOP-LEVEL STRUCTURE

{{
  "client": "company name as written at top of notes",
  "processedDate": "{today}",
  "milestones": [ {{"date": "...", "description": "...", "comment": "..."}} ],
  "absences": [ {{"who": "...", "date": "...", "substitute1": "...", "substitute2Notes": "..."}} ],
  "topics": [ ...see TOPIC SCHEMA... ],
  "analysis": {{
    "decisions":       [ ...see DECISIONS AUDIT TRAIL... ],
    "references":      [ ...see SR/REFERENCE INDEX... ],
    "risks":           [ ...see RISK REGISTER... ],
    "ownerHistory":    {{ "topicId": [ ...see OWNER HISTORY... ] }},
    "actionItems":     [ ...see ACTION ITEMS... ],
    "systemMap":       {{ "SYSCODE": {{"topics": [], "mentions": 0, "concentrationRisk": false}} }},
    "staleTopics":     [ ...see STALE TOPICS... ],
    "upcomingActions": [ ...see UPCOMING ACTIONS... ],
    "rollup":          {{ ...see ROLLUP SUMMARY... }},
    "diff":            null,
    "config": {{
      "riskThresholdDays": 30,
      "staleThresholdWeeks": 2,
      "rollupPeriod": "weekly",
      "systemConcentrationThreshold": 3,
      "ownerFlipThreshold": 2
    }}
  }}
}}

---
## MILESTONES
Extract the milestones / important events table from the top of the notes if present.
Each row: {{"date": "as written", "description": "event name", "comment": "status comment e.g. Finished"}}
Include all rows even if partially empty.

---
## ABSENCES
Extract the absences/holidays table from the top of the notes if present.
Each row: {{"who": "name", "date": "date range or empty", "substitute1": "cover person or empty", "substitute2Notes": "additional note or empty"}}
Include all rows even if the person has no absence (empty date = no upcoming absence).

---
## TOPIC SCHEMA
Each topic object:
{{
  "id": "topic number e.g. '1', '4a', '0451' — or null",
  "flags": ["Top Issue"|"Action"|"Risk"|"Info"|"Monitoring"|"Closed"],
  "title": "topic title",
  "references": "SR33551172, SAPNote# 2600030 — verbatim refs mentioned, or null",
  "status": "In Progress|Blocked|Completed|Closed|Monitoring",
  "owner": "person or party name, or TBD",
  "due": "due date as written, or TBD",
  "summary": "one AI-written sentence summarising current state",
  "decisions": [{{"text": "verbatim", "date": "or null"}}],
  "isSection": false,
  "sharedUpdates": [{{"text": "verbatim bullet", "date": "or null"}}],
  "subTopics": [],
  "timeline": {{
    "current": [{{"date": "most recent date", "bullets": ["verbatim"]}}],
    "earlier": [{{"date": "older date or null", "bullets": ["verbatim"]}}]
  }}
}}

### STATUS RULES (critical)
- "Blocked" ONLY if the word is literally written
- "Waiting on X" / "in progress on X side" = "In Progress"
- Default: "In Progress"

### OWNER RULES
- "X to check" / "X investigating" / "X to raise" → owner is X
- "In progress on [party] side" → owner is that party
- Default: "TBD"

### FLAG RULES
- "Top Issue" — only if explicitly called a top issue in the notes
- "Action" — topic has open action items assigned to people
- "Risk" — topic is blocked OR contains process gap / escalation language
- "Info" — informational update only, no action needed
- "Monitoring" — topic is being watched but no active work
- "Closed" — topic is fully done

### TIMELINE RULES
- Most recent date group → "current" array
- All older date groups → "earlier" array, one entry per date — NEVER clump multiple dates together
- Bullets with no recoverable date → "earlier" with date: null
- Preserve bullet text close to verbatim

### DECISION DETECTION (triggers)
"OK for", "confirmed", "agreed", "no need to", "considered permanent", "to be closed", "completed", "done"
Each decision: {{"text": "verbatim decision text", "date": "date or null"}}

### SECTION TOPICS (isSection: true)
Set isSection=true when a topic tracks multiple system IDs (e.g. 0451/0473/0474) or uses Part I/Part II language.
- Bullets mentioning a specific ID/system → that subTopic's timeline
- Bullets mentioning multiple IDs → each relevant subTopic
- General/ambiguous bullets → sharedUpdates (over-aggregate rather than misplace)

Each subTopic:
{{
  "id": "e.g. '0451' or 'FMP'",
  "title": "full title",
  "systems": ["FMP", "FMQ"],
  "owner": "TBD",
  "due": "TBD",
  "expiry": "expiry date if mentioned, else omit",
  "status": "In Progress|Blocked|Completed|Closed|Monitoring",
  "decisions": [{{"text": "...", "date": "..."}}],
  "timeline": {{"current": [], "earlier": []}}
}}

---
## ANALYSIS SECTIONS

### 1. DECISIONS AUDIT TRAIL (analysis.decisions)
Extract every decision across all topics into a sequential log.
Sequential IDs: DEC-{today[:4]}-001, DEC-{today[:4]}-002, etc.
{{"id": "DEC-YYYY-NNN", "date": "or null", "text": "verbatim", "topicRef": "topic id", "subTopicRef": "sub-topic id or null", "agreedBy": "party or null"}}

### 2. SR/REFERENCE INDEX (analysis.references)
Collect every SR, SAPNote, Case#, KBA, ticket number mentioned anywhere.
Deduplicate — same ref in multiple topics gets one entry with all topicRefs.
{{"ref": "verbatim e.g. SR33551172", "type": "SR|SAPNote|Case|KBA|Other", "context": "brief context from surrounding text", "topicRefs": ["1", "3"], "status": "if mentioned"}}

### 3. RISK REGISTER (analysis.risks)
Flag as a risk:
- Any topic with status "Blocked"
- Process gap language: "how can this happen without", "why was this not done", "no checks being done", "without input from team"
- Escalation language: "wondering why", "impression was that", "not implemented for such a long time"
- Topic with no due date AND no owner (stalled without accountability)
{{"id": "RISK-NNN", "description": "...", "detectedDate": "{today}", "topicRef": "topic id", "trigger": "what triggered it", "status": "Open", "closedDate": null}}

### 4. ACTION ITEMS (analysis.actionItems)
Detect: "X to check", "X to raise SR", "X to send", "X to share", "X to confirm", "X to create", "X to investigate", "SR needed", "SR to be raised by X"
Sort: overdue first, then by due date, then by owner.
{{"text": "verbatim action", "owner": "person", "due": "date or null", "topicRef": "topic id", "subTopicRef": "or null", "overdue": true/false}}
overdue = true if due date is before {today}.

### 5. SYSTEM IMPACT MAP (analysis.systemMap)
List every system code mentioned (FMP, FMQ, FMX, FMS, FMD, HMD, HMQ, HMP, WFD, WFP, WFB, HMX, FME, etc).
For each: which topic IDs reference it, total mention count, concentrationRisk=true if in 3+ topics.
{{"FMP": {{"topics": ["1","4a","8"], "mentions": 12, "concentrationRisk": true}}}}

### 6. OWNER HISTORY (analysis.ownerHistory)
For each topic where ownership changed between parties (detect from timeline: "in progress on SAP side" then later "in progress on Allianz side"):
{{"topicId": [{{"date": "YYYY-MM-DD", "from": "SAP", "to": "Allianz"}}]}}
Only include topics that actually had ownership changes.

### 7. STALE TOPICS (analysis.staleTopics)
Flag topics where the most recent date in their timeline is more than 2 weeks before {today}.
{{"topicRef": "topic id", "topicTitle": "...", "lastMentioned": "most recent date found", "gapDays": N, "owner": "current owner"}}

### 8. UPCOMING ACTIONS (analysis.upcomingActions)
Actions from any topic due within 7 days of {today} (i.e. due by {today} + 7 days).
{{"description": "action text", "owner": "person", "dueDate": "as written", "topicRef": "topic id"}}

### 9. ROLLUP SUMMARY (analysis.rollup)
{{
  "period": "weekly",
  "totalTopics": N,
  "closedInPeriod": N,
  "openedInPeriod": N,
  "blocked": N,
  "decisionsInPeriod": N,
  "activeRisks": N,
  "avgAgeDaysOpenItems": N,
  "actionsDueNext7Days": N,
  "narrativeSummary": "AI-written paragraph summarising current state — suitable for pasting into a weekly status report"
}}

### 10. DIFF (analysis.diff)
Set to null — this is a first-run extraction with no previous data to compare against.

---
## CRITICAL RULES
- Preserve bullet text close to verbatim — do not paraphrase raw bullets
- "summary" field is AI-written (one sentence); all other text fields are verbatim
- Empty arrays [] and null values are valid — do not omit required fields
- Never confuse entry dates (when discussed) with due dates (when something must happen)
- sharedUpdates items are objects with "text" field, not plain strings"""

        try:
            extracted_text = await anthropic_client.chat_with_history(
                EXTRACTION_SYSTEM,
                [{"role": "user", "content": raw_text}],
                max_tokens=16000,
            )
            # Strip markdown code fences if present
            cleaned = extracted_text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            extracted = json.loads(cleaned)
        except Exception as e:
            return {"error": f"Extraction failed: {e}"}

        client_name = extracted.get("client", "")
        meeting_date = extracted.get("processedDate") or extracted.get("meetingDate") or today
        topics = extracted.get("topics", [])
        analysis = extracted.get("analysis", {})
        action_items = analysis.get("actionItems", [])
        risks = analysis.get("risks", [])
        decisions = analysis.get("decisions", [])

        # Match client name to a CustomerAgent
        customer_agent_id = None
        try:
            agents = await cap_client.get_customer_agents()
            client_lower = client_name.lower()
            for agent in agents:
                name = (agent.get("displayName") or "").lower()
                if client_lower and (client_lower in name or name in client_lower):
                    customer_agent_id = agent.get("ID")
                    client_name = agent.get("displayName", client_name)
                    break
        except Exception:
            pass

        if not customer_agent_id:
            return {
                "error": f"Could not match client '{client_name}' to any known customer. "
                         f"Available customers: {[a.get('displayName') for a in (agents if 'agents' in dir() else [])]}. "
                         "Please check the client name in the notes."
            }

        await _activity(f"Saving meeting notes for {client_name}…")

        try:
            await cap_client.save_meeting_note(
                customer_agent_id=customer_agent_id,
                client_name=client_name,
                meeting_date=meeting_date,
                raw_text=raw_text,
                extracted_json=json.dumps(extracted),
                topics_json=json.dumps(topics),
                action_items_json=json.dumps(action_items),
                risks_json=json.dumps(risks),
                decisions_json=json.dumps(decisions),
            )
        except Exception as e:
            return {"error": f"Failed to save meeting note: {e}"}

        refresh_data_ref[0] = True
        return {
            "saved": True,
            "clientName": client_name,
            "customerAgentId": customer_agent_id,
            "topicsCount": len(topics),
            "actionItemsCount": len(action_items),
            "risksCount": len([r for r in risks if r.get("status") == "Open"]),
            "decisionsCount": len(decisions),
        }

    return {"error": f"Unknown tool: {tool_name}"}
