# CDM Additional Services Tracker — Current State
**Date:** 2026-04-28  
**Author:** Ana Gaina  
**Status:** Demo-ready prototype. Phases A–F + H–I complete. Phase J (acceptance sweep) not started.

---

## What This Is

An AI-native personal assistant for SAP Customer Delivery Managers (CDMs) that manages the end-to-end Additional Services (AS) billing process. CDMs currently track AS requests across 6+ SAP systems with no unified tool. This app consolidates them into a single conversational workspace driven by an agentic backend.

The product intent: the CDM talks to an assistant, the assistant does the work — parses emails, matches service codes, drafts price communications, generates JIRA invoice tickets, fires reminders, and remembers how each CDM works. The CDM never needs to learn a new system because the system adapts to them.

---

## Stack

| Layer | Technology | Notes |
|---|---|---|
| Backend framework | `@sap/cds` (CAP) v8 | OData v4 at `/api/v1/`. Runs locally with `cds watch`. |
| Database | SQLite (dev) | Drop-in swap to SAP HANA Cloud for BTP deployment — zero code change. |
| LLM | Anthropic Claude Opus 4.7 via direct API | Swappable to SAP AI Core / Gen AI Hub via `CDS_LLM_PROVIDER=gen_ai_hub` — client is already abstracted. |
| Frontend | Vanilla JS + `@ui5/webcomponents@2` (CDN) | Custom shell. Not Fiori Elements. Uses SAP UI5 web components for data display. |
| Styling | Custom CSS design tokens (`colors_and_type.css`) | Linear/Vercel-adjacent aesthetic. Currently uses indigo primary — not yet aligned to SAP Horizon theme tokens. |
| JIRA | REST via `JiraClient.js` | Posts O2I invoice tickets to JIRA ECSBO queue. Requires `JIRA_BASE_URL` + `JIRA_TOKEN` env vars. |

---

## Repository Layout

```
additional-services-tracker/
├── db/
│   └── schema.cds              ← full data model (see Data Model section)
├── srv/
│   ├── as-service.cds          ← OData service definition + Fiori Elements annotations
│   ├── as-service.js           ← all service logic: CRUD hooks, AI actions, orchestrator
│   ├── health-service.cds/js   ← GET /health endpoint
│   └── lib/
│       ├── llm/
│       │   ├── LLMClient.js            ← abstract base class (interface)
│       │   ├── AnthropicDirectClient.js ← Anthropic SDK implementation (active)
│       │   ├── GenAIHubClient.js        ← SAP AI Core stub (not yet wired)
│       │   └── index.js                ← selects provider via CDS_LLM_PROVIDER env var
│       ├── subagents/
│       │   └── rrPricingSubagent.js    ← R&R match (LLM) + price lookup (pure JSON)
│       └── jira/
│           └── JiraClient.js           ← JIRA REST client
├── app/
│   ├── index.html              ← redirects to /shell/index.html
│   ├── colors_and_type.css     ← design tokens (Inter font, indigo palette)
│   └── shell/
│       ├── index.html          ← app bootstrap: UI5 CDN, mode toggle, nav structure
│       ├── shell.css           ← layout: sidebar, chat thread, inbox, dashboard grid
│       ├── ChatShell.js        ← chat mode: sends to /orchestrate, renders panels inline
│       ├── PersonaShell.js     ← dashboard mode: loads saved layout, renders panels
│       ├── Renderer.js         ← PanelConfig JSON → @ui5/webcomponents DOM nodes
│       ├── PersonaStore.js     ← reads/writes PersonaLayout via OData
│       ├── ODataClient.js      ← fetch wrapper for /api/v1/
│       ├── NavTree.js          ← renders Clients + Automations tree from DB
│       └── InboxView.js        ← renders PendingAction cards, wires reply to /orchestrate
├── .env                        ← ANTHROPIC_API_KEY (required), JIRA_* (optional)
├── .env.example                ← template
└── package.json                ← deps: @sap/cds, @anthropic-ai/sdk; dev: sqlite3, puppeteer
```

---

## Data Model (`db/schema.cds`)

### Core entity: `AdditionalServiceRequest`

The main business object. One row per AS billing request.

| Field group | Key fields |
|---|---|
| Customer & Service | `customerName`, `processType` (Classic/ATLAS), `additionalServiceIds`, `rrDescription` |
| System identifiers | `sid`, `caseNo`, `csrNo` |
| Ticket numbers | `spcTicketMain`, `spcExecutionRef`, `bcpTicketNo`, `amsTicketNo`, `itsmTicketNo` |
| Pricing | `price`, `currency`, `priceInWords` (computed), `poNo`, `priceValidUntil` (computed +90d) |
| Key dates | `creationDate`, `priceCommunicatedDate`, `approvalReceivedDate`, `customerClosureDate`, `amsClosureDate`, `o2iTicketCreatedDate` |
| Invoice/O2I | `o2iTicketNo`, `salesOrderNo`, `activityPerformed` |
| Status | `status` (8-state machine, see below), `activityLog`, `cdmOwner` |
| Checklist | 6 boolean flags: `checkPriceEmailSent`, `checkApprovalReceived`, `checkSharePointUploaded`, `checkCasSdInformed`, `checkAmsClosed`, `checkO2iCreated` |

**Status machine** (enforced server-side, no skipping, admin override available):
```
Request received → Price communicated → Approval received → In delivery
→ Customer closed → AMS closed → O2I ticket opened → Complete
```

**Validation rules:**
- Advancing past `Request received` requires at least one of `caseNo` or `csrNo`
- Moving to `O2I ticket opened` requires `amsTicketNo` filled and `checkAmsClosed` true
- `priceInWords` auto-computed on create/update from `price` + `currency`
- `priceValidUntil` auto-set to `priceCommunicatedDate + 90 days`

### Agent entities

| Entity | Purpose |
|---|---|
| `PersonaLayout` | Stores each CDM's dashboard panel configuration as JSON (keyed by userId) |
| `ConversationTurn` | Full conversation history per user/session. Tagged with `agentName` so rolling windows work per-agent. |
| `ClientAgent` | One per customer. The orchestrator's entry point for customer-scoped routing. User-configurable `displayName`. |
| `ContractSubagent` | One per contract/SID per customer. Scoped context for pricing + delivery tracking. |
| `AutomationAgent` | One per event type. Fires on SAP Event Mesh events. User-configurable `displayName`. |
| `PendingAction` | Card surfaced to CDM Inbox when an automation agent needs human input. |

### Reference data (admin-editable)

| Entity | Purpose |
|---|---|
| `RRReference` | R&R service code catalogue (`rrId`, `description`, `category`, `isActive`) |
| `PricingEntry` | Price per R&R code (`rrId`, `price`, `currency`, `lastUpdated`) |
| `EmailTemplate` | Price communication email templates (key: `standard_price_communication`) |
| `AdminConfig` | Key-value config: `assistant_name`, `llm_model`, `sharepoint_base_url` |

---

## Service API (`srv/as-service.cds`)

All endpoints under `@path: '/api/v1'`.

### OData entities (standard CRUD)
- `Requests` — main AS request entity (insert + update; delete disabled)
- `RRReferences`, `Pricing`, `Templates`, `Config` — reference data (admin-write-only)
- `PersonaLayouts`, `ConversationTurns` — agent memory
- `ClientAgents`, `ContractSubagents`, `AutomationAgents`, `PendingActions` — agent hierarchy
- `StatusValues`, `ProcessTypes`, `Currencies` — value help (in-memory, no DB)

### Actions
| Action | What it does |
|---|---|
| `extractFromEmail(emailText)` | Calls LLM to extract customer name, service IDs, ticket numbers, PO number from email text |
| `matchRR(description)` | Calls `rrPricingSubagent.rrMatch` — returns structured JSON with scenario type, matched codes, confidence, clarifying question |
| `draftPriceEmail(requestId)` | Fills `standard_price_communication` template via LLM |
| `generateO2ITicket(requestId)` | Builds JIRA ticket title + body via LLM |
| `createO2ITicket(requestId, ticketTitle, ticketBody)` | Posts to JIRA ECSBO via `JiraClient`, writes `o2iTicketNo` back to record |
| `chat(message)` | Simple single-turn chat — no tool use, no panels. Used in early prototype only. |
| `orchestrate(message, sessionId, mode, assistantName)` | **Main entry point.** Full tool-use agent loop. See Orchestrator section. |
| `triggerMockEvent(eventType, payload)` | Demo substitute for SAP Event Mesh. Triggers automation agents manually. |

---

## Orchestrator (`orchestrate` action)

The core of the product. Every CDM message goes here.

**What it does on each call:**
1. Loads last 20 `ConversationTurns` for this session (conversation memory)
2. Loads CDM's open requests as ambient context
3. Loads saved `PersonaLayout`
4. Loads active `PendingActions` for this user
5. Evaluates all 7 `REMINDER_RULES` server-side — fires banners for any that match
6. Loads full R&R reference + pricing data
7. Resolves `assistantName` from: request param → `AdminConfig.assistant_name` → default `'Beacon'`
8. Runs `chatWithTools` loop (Anthropic tool_use API, Opus 4.7, 4096 tokens, 10-iteration cap, adaptive thinking)
9. Saves user + assistant `ConversationTurns` tagged with `agentName: 'main_orchestrator'`
10. Returns `{ reply, panels?, proposedLayout?, renameAssistant? }`

**Tool dispatcher — 12 tools:**

| Tool | What the dispatcher does |
|---|---|
| `fetch_records` | `SELECT` from `Requests` with optional filters, limit, field projection |
| `render_panel` | Pushes a panel config object to the `panels[]` response array |
| `invoke_subagent` | Dispatches to `email_parse`, `rr_match`, `price_lookup`, `draft_price_email`, `generate_o2i`, `create_o2i_ticket` |
| `update_record` | `UPDATE Requests` via CAP |
| `propose_layout_change` | Sets `proposedLayout` in response — FE shows a confirm dialog |
| `get_reminder_status` | Re-evaluates reminder rules for a specific CDM owner |
| `route_to_agent` | Builds subagent context from `ClientAgent`/`ContractSubagent` rows, calls `chatWithHistory`, saves turn tagged with subagent ID |
| `surface_pending_action` | Creates `PendingAction` record → appears in CDM Inbox |
| `resolve_pending_action` | Updates `PendingAction` status; writes `recordedData` fields back to related request |
| `register_client` | Creates `ClientAgent` row |
| `register_contract` | Creates `ContractSubagent` row |
| `rename_assistant` | Sets `renamedTo` in response — FE updates `PersonaStore` and page title |

**Routing priority** (orchestrator decides silently on each message):
1. CDM replying to a pending action → resolve it
2. Message mentions a customer name → `route_to_agent` (client_orchestrator)
3. Clear task (email, price, O2I) → `invoke_subagent`
4. Everything else → answer directly

---

## LLM Client (`srv/lib/llm/`)

**Interface** (`LLMClient.js`): three methods — `chat`, `chatWithHistory`, `chatWithTools`.

**Active implementation** (`AnthropicDirectClient.js`):
- `chatWithHistory` — uses `claude-sonnet-4-6`, 2048 tokens (used by task agents + subagents)
- `chatWithTools` — uses `claude-opus-4-7`, 4096 tokens, adaptive thinking, 10-iteration tool-use loop (used by orchestrator only)

**Swappable** (`GenAIHubClient.js`): stub exists, not yet wired. Switch via `CDS_LLM_PROVIDER=gen_ai_hub` in `.env`. This is the only change needed to route through SAP AI Core.

**Provider selection** (`index.js`): reads `CDS_LLM_PROVIDER` env var at startup, instantiates the right client. The rest of the codebase imports `./lib/llm` and never knows which provider is active.

---

## Task Agents (`srv/lib/subagents/`)

### `rrPricingSubagent.js`
Covers workflow steps 2 and 3.

**`rrMatch({ description, rrData, llm })`**
- Sends full R&R catalogue + customer description to LLM
- Returns structured JSON: `{ scenario, scenario_note, services[], clarifying_question }`
- Scenario types: `single`, `multi`, `variant`, `ambiguous`, `none`
- Each service has: `rrId`, `description`, `confidence` (HIGH/MEDIUM/LOW), `role` (primary/addon/alternative), `pricing_note`
- Knows about variant families (DB_1.1.26 size variants, BASIC_1.8.25 rebuild variants, etc.)
- Fallback: returns full catalogue with LOW confidence if LLM output malformed

**`priceLookup({ rrId, rrData, pricingData })`**
- Pure JSON lookup — no LLM call
- Returns: `{ rrId, description, price, currency, lastUpdated }` or `{ error }`

---

## Frontend Shell (`app/shell/`)

**Architecture:** vanilla JS modules loaded via `<script src="...">` tags. Each module exposes one global on `window`. No bundler, no framework, no build step.

| File | Responsibility |
|---|---|
| `index.html` | App bootstrap. Loads UI5 web components from CDN. Mode toggle (Chat / Inbox / Dashboard). Sidebar nav. Initialises all modules. |
| `ODataClient.js` | Thin `fetch` wrapper. `get(path, params)` and `post(path, body)` against `/api/v1/`. |
| `PersonaStore.js` | Reads/writes `PersonaLayouts` via OData. Stores assistant name in localStorage as client-side cache. `isFirstRun()` check. |
| `ChatShell.js` | Chat mode. Sends `POST /api/v1/orchestrate`. Handles `reply`, `panels`, `proposedLayout`, `renameAssistant` in response. Renders panels inline via `Renderer.js`. |
| `Renderer.js` | Maps PanelConfig JSON to `@ui5/webcomponents` DOM nodes. 10 registered panel types (see Panel Palette below). Unknown types are silently dropped. |
| `PersonaShell.js` | Dashboard mode. Loads saved `PersonaLayout`, renders panels in a CSS grid. |
| `NavTree.js` | Loads `ClientAgents`, `ContractSubagents`, `AutomationAgents` from OData. Renders collapsible nav tree. Supports inline rename. |
| `InboxView.js` | Loads `PendingActions` where `status = 'pending'`. Renders cards with reply input. Sends reply via `POST /orchestrate`. |

**Panel palette** — the only types `Renderer.js` can render:

| Type | UI5 component | Use |
|---|---|---|
| `record-card` | `ui5-card` | Single AS request summary |
| `record-table` | `ui5-table` | List of requests (inline or OData-fetched) |
| `field-form` | `ui5-form` | Editable/read-only record fields |
| `status-timeline` | `ui5-timeline` | Status history steps |
| `checklist` | `ui5-list` + `ui5-checkbox` | 6-item completion checklist |
| `email-draft` | `ui5-textarea` + copy button | Price email or O2I draft |
| `kpi-strip` | row of `ui5-card` | KPI metrics (open/urgent/delivery counts) |
| `reminder-banner` | `ui5-message-strip` | Timed reminder alerts |
| `ticket-ref` | `ui5-link` + copy button | Clickable ticket number |
| `confirm-dialog` | `ui5-dialog` | Layout change confirmation |

**Known FE issues:**
- UI5 web components render in their default Horizon theme (SAP blue) while the shell chrome uses a custom indigo token system — visual clash
- `Renderer.js` silently drops unknown panel types — makes it appear agents are not firing when they are
- No tool-use trace in chat thread — CDM cannot see which agents fired during a response
- `chat` action in `as-service.js` (no tool use) and `orchestrate` (full tool use) both exist — FE always calls `orchestrate` but the redundant `chat` action is confusing
- `window.*` global sharing between modules makes load order fragile

---

## Reminder Rules (server-side, `as-service.js`)

Evaluated on every `orchestrate` call against all open requests. Firing rules are included in the orchestrator system prompt and can be surfaced via `render_panel(type: 'reminder-banner')`.

| Condition | Message | Severity |
|---|---|---|
| Price communicated, no approval, 7–13 days | Follow up — price sent N days ago | Warning |
| Price communicated, no approval, 14–84 days | URGENT: approval overdue | Error |
| Price communicated, no approval, 85+ days | Price validity expires in 5 days | Error |
| Approval received, SharePoint not uploaded, 3+ days | Upload approval to SharePoint | Warning |
| In delivery, no customer closure, 30+ days | Check delivery status | Warning |
| Customer closed, AMS not closed, 3+ days | Close AMS ticket | Warning |
| AMS closed, no O2I ticket, 3+ days | Open O2I invoice ticket | Warning |

---

## Automation Agent Model

**Current state:** one automation agent implemented — `customer.acceptance`.

**Demo trigger:** `POST /api/v1/triggerMockEvent { eventType: "customer.acceptance", payload: { requestId, customerName } }`

**What it does:**
1. Finds or creates an `AutomationAgent` row for `eventType: 'customer.acceptance'`
2. Creates a `PendingAction` in the CDM's Inbox:  
   *"Customer X has accepted the price proposal. Please create an SCW/SPC ticket and reply with the ticket ID."*
3. CDM sees the card in Inbox, replies with ticket ID
4. `InboxView.js` sends reply via `POST /orchestrate`
5. Orchestrator calls `resolve_pending_action` + writes `spcTicketId` to the request

**Production path:** replace mock endpoint with SAP Event Mesh subscription. No other code changes needed.

---

## Observability

Two structured log streams written to stdout (no external dependency):

**`[AI]` log** — every LLM call:
```json
{ "ts": "...", "action": "orchestrate", "promptHash": "abc123", "responseLength": 412, "latencyMs": 1840 }
```

**`[AUDIT]` log** — every status transition:
```json
{ "ts": "...", "user": "ana.gaina@sap.com", "requestId": "uuid", "oldStatus": "Price communicated", "newStatus": "Approval received" }
```

`promptHash` is a SHA-256 prefix of `systemPrompt + userMessage` — enables log correlation without storing PII.

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes (dev) | Direct Anthropic API. Replaced by AI Core in production. |
| `CDS_LLM_PROVIDER` | No | `'anthropic'` (default) or `'gen_ai_hub'` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | No | Model override for orchestrator. Default: `claude-opus-4-7` |
| `JIRA_BASE_URL` | For O2I | e.g. `https://jira.tools.sap/` |
| `JIRA_TOKEN` | For O2I | Personal access token for JIRA ECSBO queue |

---

## What Works End-to-End

- Full 10-step AS process trackable via chat with synthetic data
- Email parsing (paste email → extract fields)
- R&R matching with confidence scoring, variant detection, clarifying questions
- Price lookup (pure JSON, no LLM)
- Price email drafting from template
- O2I ticket body generation
- O2I ticket posting to JIRA (when `JIRA_*` env vars set)
- Status machine with validation (case/CSR required, AMS close required before O2I)
- All 7 reminder rules fire correctly
- Agent routing to Client Orchestrator and Contract Subagent
- Conversation memory across turns (last 20)
- Pending action surfacing and resolution via mock event
- PersonaLayout saved and restored across sessions
- Assistant rename (conversational + persisted in AdminConfig)
- Nav tree for Clients / Automations (loads from DB, supports rename)
- Inbox view with reply flow

---

## What Is Broken or Incomplete

| Issue | Impact | Fix |
|---|---|---|
| UI5 web components clash with custom CSS tokens | Visual inconsistency — looks unpolished | Align `colors_and_type.css` tokens to SAP Horizon CSS variables |
| `Renderer.js` silently drops unknown panel types | Agent tool calls appear to do nothing | Add fallback renderer + fix any type mismatches |
| No tool-use trace in chat thread | Demo: stakeholders cannot see agents working | Add collapsible step trace before reply bubble |
| `GenAIHubClient.js` is a stub | Cannot demo AI Core path | Wire real AI Core client (needs entitlement) |
| `chat` action is redundant | Code confusion | Remove or redirect to `orchestrate` |
| No seed data loaded by default | Empty DB on fresh `cds watch` | Add `db/data/*.csv` seed files |
| `spcExecutionRef` field shape unconfirmed (Q1/Oana) | Schema may need update | Confirm with Oana |

---

## BTP Migration Path

This is a configuration swap, not a rewrite.

| What changes | How |
|---|---|
| SQLite → SAP HANA Cloud | `package.json` cds.requires.db: change `kind` to `hana` |
| Direct Anthropic → SAP AI Core | `.env`: set `CDS_LLM_PROVIDER=gen_ai_hub`; wire `GenAIHubClient.js` |
| Local run → BTP Cloud Foundry | `cf push` with `manifest.yml`; bind HANA + AI Core service instances |
| Custom shell → SAP Work Zone tile | Add `xs-app.json` + launchpad descriptor; shell becomes a Work Zone embedded app |
| Custom chat → Joule | Register `orchestrate` endpoint as a Joule tool via MCP or BAIP agent registry; Joule becomes the shell |
| Mock events → SAP Event Mesh | Replace `triggerMockEvent` handler with Event Mesh subscription; automation agent logic unchanged |
| Manual JIRA token → service account | Swap `JIRA_TOKEN` env var to a service account credential in BTP credential store |

**Zero agent logic changes required for any of these migrations.**

---

## What We Need (Access + Entitlements)

| Need | Why | Status |
|---|---|---|
| SAP AI Core / Gen AI Hub entitlement | Route LLM through SAP's compliant infrastructure | Not yet — demoing to get this |
| BTP subaccount | Deploy beyond localhost | Not yet |
| SAP Event Mesh | Real automation agent event subscription | Not yet — using mock endpoint |
| SAP4Me / SPC API | Live customer acceptance events; SCW ticket creation | Not yet — CDM enters manually |
| JIRA ECSBO service account | Auto-create O2I tickets without personal token | Not yet |
| APEX API | Live pricing sync | Unknown if API exists |
| MS Graph / SharePoint app registration | Detect SharePoint upload automatically | Not yet |

---

## Open Questions

| # | Question | Who | Demo impact |
|---|---|---|---|
| Q1 | `spcExecutionRef` field — what is the exact shape of the second SPC ticket? | Oana | Schema placeholder used |
| Q-EM | Event Mesh tier, topic namespace, event schema, publisher system for `customer.acceptance` | Julia E. | Mock endpoint used |
| Q-ATLAS | ATLAS has no external API — how does CDM verify contract details? | Architecture | CDM verifies externally; noted as gap |
| Q-APEX | Does the APEX pricing API exist? | ECS ops | Pricing JSON maintained manually |
| Q8 | SharePoint base URL for approval upload | Julia Ehmke | Hardcoded placeholder |

---

## A2A / Agent Protocol Readiness

The architecture is A2A-ready in structure but not yet registered. What exists maps directly to A2A concepts:

| A2A concept | This app |
|---|---|
| Agent Card | Not yet written — next step |
| Agent capabilities | `ORCHESTRATOR_TOOLS` array in `as-service.js` |
| Agent registry | Not yet — needs BAIP entitlement |
| Inter-agent message | `route_to_agent` tool call → `chatWithHistory` subagent call |
| Structured output | `render_panel` tool → PanelConfig JSON |

Writing the Agent Card for the Main Orchestrator is the highest-leverage next step — it becomes the architecture slide, the BAIP registration payload, and the spec for Joule integration simultaneously.
