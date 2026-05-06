# Joule Integration — Briefing Prompt
**Date:** 2026-04-29  
**Author:** Ana Gaina  
**Purpose:** Full context handoff for starting Joule integration work on the CDM Additional Services Tracker

---

## What You Are Integrating

A working AI-native assistant for SAP Customer Delivery Managers (CDMs) that manages the end-to-end Additional Services (AS) billing process. The backend is complete and production-ready. We now have Joule access and need to wire the existing CAP service into Joule so Joule becomes the conversational shell instead of the custom HTML one we built for the prototype.

The product principle: **the CDM never changes how they work — the system adapts to them.** The assistant knows the 10-step AS process, routes silently to specialist subagents based on context, remembers CDM preferences, and surfaces actions proactively. The CDM always sees one conversation.

---

## Current Stack

| Layer | Technology | Status |
|---|---|---|
| Backend | `@sap/cds` (CAP) v8, OData v4 at `/api/v1/` | Complete, running locally |
| Database | SQLite (dev) → SAP HANA Cloud (prod, zero code change) | SQLite active |
| LLM | Anthropic Claude Opus 4.7 direct → swap to SAP AI Core via env var | Direct active |
| Orchestrator | `POST /api/v1/orchestrate` — full tool-use agent loop | Complete |
| Frontend | Custom HTML shell with `@ui5/webcomponents` | Prototype only — **Joule replaces this** |

---

## The One Endpoint Joule Needs

Everything goes through one action:

```
POST /api/v1/orchestrate
Content-Type: application/json

{
  "message":       "string — the CDM's message",
  "sessionId":     "string — conversation session identifier",
  "mode":          "chat",
  "assistantName": "string — current assistant name (e.g. 'Beacon')"
}
```

**Response** (JSON string in OData action result):
```json
{
  "reply":            "string — the assistant's text response",
  "panels":           [ ...PanelConfig objects ],
  "proposedLayout":   { "description": "...", "newPanels": [...] },
  "renameAssistant":  "string — new name if CDM requested rename"
}
```

Joule sends a message, gets back a reply + optional structured panel data. That is the entire integration surface for the conversational layer.

---

## What the Orchestrator Does Internally (Joule Does Not Need to Manage This)

On every call the orchestrator:
1. Loads conversation history (last 20 turns from `ConversationTurns` entity)
2. Loads CDM's open AS requests as ambient context
3. Evaluates 7 reminder rules server-side — fires banners for stalled requests
4. Runs a Claude Opus 4.7 tool-use loop (up to 10 iterations) with 12 available tools
5. Routes silently to Client Orchestrators and Contract Subagents based on message context
6. Saves turns to `ConversationTurns` tagged with the agent that produced them
7. Returns reply + any panels the agent decided to render

The CDM always sees one conversation. Routing is invisible to Joule and to the CDM.

---

## The 12 Orchestrator Tools

These are dispatched server-side — Joule does not call them directly. Listed so you understand what the orchestrator can do:

| Tool | Purpose |
|---|---|
| `fetch_records` | Query AS requests from the database |
| `render_panel` | Add a UI panel to the response (see Panel Palette below) |
| `invoke_subagent` | Call email_parse, rr_match, price_lookup, draft_price_email, generate_o2i, create_o2i_ticket |
| `update_record` | Update fields on an AS request |
| `propose_layout_change` | Suggest a workspace layout change (CDM confirms) |
| `get_reminder_status` | Check which reminder rules are firing |
| `route_to_agent` | Delegate to a Client Orchestrator or Contract Subagent (invisible to CDM) |
| `surface_pending_action` | Push a card to CDM Inbox when automation agent needs human input |
| `resolve_pending_action` | Mark a pending action as responded or dismissed |
| `register_client` | Create a new ClientAgent (customer entry in nav) |
| `register_contract` | Create a new ContractSubagent under a client |
| `rename_assistant` | Rename the assistant (CDM says "call yourself X") |

---

## Panel Palette (Structured Output)

When the orchestrator calls `render_panel`, it returns a `PanelConfig` object in the `panels[]` array. Joule needs to decide how to render these — either using Joule's native card/structured output capabilities, or by passing them to a Work Zone embedded tile that renders them.

10 panel types:

| Type | Data shape | Natural Joule equivalent |
|---|---|---|
| `record-card` | Single AS request fields | Structured card / entity summary |
| `record-table` | Array of AS requests | Table / list output |
| `field-form` | Editable record fields | Form / guided input |
| `status-timeline` | Array of `{title, date, text}` | Timeline / step display |
| `checklist` | Array of `{label, checked}` | Checklist card |
| `email-draft` | `{subject, body}` | Text block with copy action |
| `kpi-strip` | Array of `{label, value, color}` | KPI / metric cards |
| `reminder-banner` | Array of `{text, type}` | Warning / alert strip |
| `ticket-ref` | Array of `{no, label, url}` | Link cards |
| `confirm-dialog` | `{description, newPanels}` | Confirmation prompt |

If Joule cannot render a panel type natively, the `reply` text field always contains a plain-text equivalent — the CDM gets the information either way.

---

## Data Model (What Joule Can Read via OData)

All entities at `/api/v1/`:

| Entity | Key fields | Use |
|---|---|---|
| `Requests` | customerName, status, additionalServiceIds, price, cdmOwner + 30 more | Main AS request data |
| `ClientAgents` | customerId, displayName | Customer nav entries |
| `ContractSubagents` | clientId, sid, contractType, displayName | Contract entries per customer |
| `AutomationAgents` | eventType, displayName, enabled | Event-driven automation entries |
| `PendingActions` | userId, prompt, status, relatedRequestId | CDM inbox items |
| `PersonaLayouts` | userId, layoutJson | Saved workspace per CDM |
| `ConversationTurns` | userId, sessionId, role, content, agentName | Full conversation history |
| `RRReferences` | rrId, description, category | R&R service code catalogue |
| `Pricing` | rrId, price, currency, lastUpdated | Pricing per service code |
| `Templates` | templateKey, subject, body | Email templates |
| `Config` | configKey, configValue | assistant_name, llm_model, etc. |

---

## The 10-Step CDM Process (What the Assistant Knows)

| Step | What happens | Assistant support |
|---|---|---|
| 1 | Customer emails about potential AS | `email_parse` extracts customer, service need, ticket refs |
| 2 | Identify R&R service code | `rr_match` returns top matches with HIGH/MEDIUM/LOW confidence |
| 3 | Look up price | `price_lookup` pure JSON — no LLM |
| 4 | Check ATLAS contract | CDM verifies externally; assistant surfaces known SID data |
| 5 | Send price communication | `draft_price_email` fills template 8.1 |
| 6 | Customer accepts → create SCW/SPC ticket | Automation agent fires, prompts CDM to create ticket |
| 7 | Create JIRA O2I invoice ticket | `generate_o2i` builds body; `create_o2i_ticket` posts to JIRA ECSBO |
| 8 | Delivery tracked via AMS/BCP/ITSM | Assistant tracks ticket IDs, fires reminders when stalled |
| 9 | Customer closes SCW ticket | CDM marks closure date; AMS-close reminder fires |
| 10 | CDM closes O2I ticket → Complete | Assistant confirms 6 checklist items before marking Complete |

**Status flow:**  
`Request received → Price communicated → Approval received → In delivery → Customer closed → AMS closed → O2I ticket opened → Complete`

**Validation enforced server-side:**
- Cannot advance past `Request received` without `caseNo` or `csrNo`
- Cannot reach `O2I ticket opened` without `amsTicketNo` filled and `checkAmsClosed` true
- No status skipping (admin override available)

---

## Reminder Rules (Fire Proactively)

The orchestrator evaluates these on every call and includes firing reminders in its context:

| Condition | Alert |
|---|---|
| Price communicated, no approval after 7 days | Follow-up nudge |
| Price communicated, no approval after 14 days | Urgent — escalate |
| Price communicated, no approval after 85 days | Price expires in 5 days |
| Approval received, SharePoint not uploaded after 3 days | Upload reminder |
| In delivery, no customer closure after 30 days | Check delivery status |
| Customer closed, AMS not closed after 3 days | Close AMS |
| AMS closed, no O2I ticket after 3 days | Open O2I invoice ticket |

---

## Agent Architecture (What Joule Is Joining)

```
Joule (new shell)
    │
    │  POST /api/v1/orchestrate
    ▼
Main Orchestrator (PA)              ← one per CDM, stateful, personalized
    │
    ├── route_to_agent ──────────► Client Orchestrator   [one per customer]
    │                                    │
    │                                    └── Contract Subagent  [one per SID]
    │
    ├── invoke_subagent ─────────► email_parse
    │                              rr_pricing (match + price lookup)
    │                              draft_price_email
    │                              generate_o2i
    │                              create_o2i_ticket
    │
    └── surface_pending_action ──► PendingAction → CDM Inbox
         (fires from automation        │
          agents on events)            └── CDM replies → resolve_pending_action
```

**Key principle:** Joule sends one message, gets one reply. All routing is internal to the orchestrator. The CDM never switches agents or contexts — it is always one conversation.

---

## LLM Client Swap (Direct Anthropic → AI Core)

The LLM client is fully abstracted. To switch from direct Anthropic to SAP AI Core / Gen AI Hub:

```bash
# .env
CDS_LLM_PROVIDER=gen_ai_hub
```

`GenAIHubClient.js` exists as a stub at `srv/lib/llm/GenAIHubClient.js`. It needs to be wired with the AI Core endpoint + credentials. The rest of the codebase is unchanged.

---

## What to Do First

The integration has three layers, in priority order:

### 1. Register the CAP service as a Joule skill / tool source

The `orchestrate` action is the tool. Register it so Joule can call it.

Depending on the Joule extensibility model available:
- **Joule Skills (CAP plugin):** define a skill that wraps `POST /api/v1/orchestrate` — Joule calls it with the CDM's message, returns the reply
- **MCP server:** expose the orchestrator actions as MCP tools — Joule discovers them via the Agent Card
- **BAIP agent registry:** register the Main Orchestrator as an A2A agent with its capabilities list

The `ORCHESTRATOR_TOOLS` array in `srv/as-service.js` is already the capability manifest. The Agent Card is the next doc to write from it.

### 2. Handle the `panels[]` response

Joule needs to decide what to do with the `panels[]` array in the orchestrate response.

Options (pick based on what Joule supports):
- **Ignore panels, use reply text only** — works for the conversation layer; CDM loses visual data panels
- **Render panels in a Work Zone embedded tile** — the existing `Renderer.js` + shell can run as an embedded app alongside Joule
- **Map panel types to Joule's native structured output** — best long-term; use the table in the Panel Palette section above

For the initial integration, option 1 is fine — the `reply` field always contains a plain-text equivalent.

### 3. Wire conversation memory

The orchestrator stores conversation history in `ConversationTurns` keyed by `userId` + `sessionId`. Joule needs to pass a consistent `sessionId` per conversation so memory works across turns. Joule's user identity should map to `userId` — ideally SAP user ID / email.

---

## Automation Agents (Event-Driven Layer)

Currently demo-mode only. When an event fires (e.g. customer accepts price):

```
POST /api/v1/triggerMockEvent
{ "eventType": "customer.acceptance", "payload": { "requestId": "uuid", "customerName": "Acme" } }
```

This creates a `PendingAction` in the CDM's inbox. In Joule, this surfaces as a proactive message / notification card the CDM can reply to.

**Production path:** replace mock endpoint with SAP Event Mesh subscription binding. The automation agent handler logic inside `as-service.js` does not change.

---

## Environment Variables Needed for BTP Deployment

```bash
CDS_LLM_PROVIDER=gen_ai_hub           # switch from Anthropic to AI Core
AICORE_SERVICE_KEY=<bound service>    # AI Core service binding (BTP)
JIRA_BASE_URL=https://jira.tools.sap/ # for O2I ticket creation
JIRA_TOKEN=<service account token>    # JIRA ECSBO service account
```

SQLite → HANA: change `cds.requires.db.kind` from `sqlite` to `hana` in `package.json`. Bind the HANA service instance on BTP. Zero code changes.

---

## Files Worth Reading Before Starting

| File | Why |
|---|---|
| `srv/as-service.js` | Full orchestrator implementation — tool dispatcher, subagent routing, reminder rules, all actions |
| `db/schema.cds` | Complete data model — every entity and field |
| `srv/as-service.cds` | OData service definition + Fiori Elements annotations — field labels, value lists, UI metadata |
| `srv/lib/llm/AnthropicDirectClient.js` | Tool-use loop implementation — shows exactly how tools are dispatched |
| `srv/lib/llm/GenAIHubClient.js` | Stub to wire for AI Core |
| `srv/lib/subagents/rrPricingSubagent.js` | R&R match + price lookup — the most complex task agent |
| `specs/current_state.md` | Full architecture doc written 2026-04-28 — complete current state |
| `specs/cdm_assistant_spec.md` | Product spec v2.0 — full agent hierarchy, nav structure, demo strategy |
| `specs/multi_agent_architecture_rationale.md` | Why this architecture — the OS/driver analogy, personal vs process separation |

---

## What This Is Not

- Not a Fiori Elements app — the Fiori annotations in `as-service.cds` exist as a fallback data entry UI but the product is the agent shell
- Not a form-filling tool with AI bolted on — the assistant is the product, the form is an escape hatch
- Not a prototype to be rewritten — the backend is production-grade; only the custom HTML shell is prototype-quality and Joule replaces it

---

## The One-Sentence Pitch (for any stakeholder conversation)

> "A personal AI co-worker for SAP CDMs that knows the full AS billing process, handles the paperwork, tracks 7 systems, and adapts to how each CDM works — Joule is the face, our CAP service is the brain."
