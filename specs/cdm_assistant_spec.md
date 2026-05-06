# CDM Personal Virtual Assistant — Agentic Rewrite Spec
**Version:** 2.0  
**Date:** 2026-04-28  
**Author:** Ana Gaina  
**Status:** Approved for execution — Phases H → I → J

---

## Context

SAP's Q2 2026 strategy (Autonomous Enterprise / BAIP) frames the next generation of products as intelligent co-workers, not apps with AI features. The CDM Additional Services Tracker (Phases A–F complete) was built as a Fiori Elements form app with Claude touchpoints bolted on. That model is superseded.

The new product: **a personal virtual assistant for SAP Customer Delivery Managers** that understands the full end-to-end AS process, surfaces the right information at the right moment, drafts documents, tracks tickets across 7+ platforms, and learns how each CDM works — saving their preferences and building a personalised workspace around their actual patterns.

The data layer (CAP + SQLite/HANA, OData at `/api/v1/`) is solid and stays untouched. The Fiori Elements app is replaced entirely by an agent-native shell.

---

## What the CDM Personal Virtual Assistant Does

The CDM talks to the assistant naturally. The assistant:

- Knows the full 10-step AS process and guides the CDM through it
- Extracts data from customer emails (no more manual form-filling)
- Looks up R&R service codes, prices, and pricing history
- Drafts price communication emails using the standard template
- Tracks all ticket IDs across AMS, BCP, ITSM, SPC, SAP4Me
- Generates JIRA O2I invoice tickets ready to post
- Fires reminders when deadlines are approaching or steps are overdue
- Assembles the workspace — panels, cards, forms, drafts — dynamically inside the conversation
- Remembers how this CDM works and proposes layout improvements over time
- Routes silently to the right specialist agent depending on what the CDM is asking — the CDM always sees one conversation

The workspace has two modes the CDM can switch between:

1. **Chat mode** — assistant takes full control. CDM talks; assistant assembles panels inline in the conversation thread.
2. **Dashboard mode** — pre-built workload view of open requests, persona-configured metric widgets, reminder banners. Assistant is a co-pilot sidebar.

---

## The Full CDM Workflow (Ground Truth)

| Step | CDM Action | Platform | Assistant Support |
|---|---|---|---|
| 1 | Customer emails about a potential AS | Outlook | `email_parse` agent extracts customer, service need, ticket refs — no manual form filling |
| 2 | Look up R&R spec for matching service ID | R&R JSON | `rr_pricing` agent suggests top 3 matches with HIGH / MEDIUM / LOW confidence |
| 3 | Look up pricing | APEX / pricing JSON | `rr_pricing` agent — pure JSON lookup, no LLM, shows last-updated date |
| 4 | Check client contract + existing services in ATLAS | ATLAS (no API yet) | Client Orchestrator surfaces known SID + contract data; CDM verifies in ATLAS externally |
| 5 | Communicate price to customer | Outlook | `draft_price_email` agent fills template 8.1 into an editable panel |
| 6 | Customer accepts → create SCW / SPC ticket | SAP4Me / SPC | Automation agent fires on acceptance event; prompts CDM to create ticket; records ticket ID |
| 7 | Create JIRA O2I ticket for billing | JIRA ECSBO | `generate_o2i` builds title + body; `create_o2i_ticket` posts via JiraClient |
| 8 | Services performed by delivery teams | AMS / BCP / ITSM / ServiceNow | Assistant tracks all ticket IDs, shows elapsed time, fires reminders when stalled |
| 9 | Customer closes SCW ticket with confirmation note | SAP4Me | CDM marks `customerClosureDate`; assistant fires AMS-close reminder |
| 10 | CDM closes JIRA O2I ticket → Complete | JIRA ECSBO | Assistant confirms all 6 checklist items before marking Complete |

---

## Agent Architecture

### Design Principle: Seamless Handoff

The CDM always sees one conversation surface. The Main Orchestrator reads every message, decides silently whether to answer itself or delegate to a specialist agent, and the response comes back in the same thread. The CDM never explicitly switches agents — the system infers from context.

When delegating, the orchestrator does **not** pass the full conversation history to the subagent. Instead it passes:
- A handoff summary (orchestrator-authored, describes the current task and relevant context)
- The injected customer/contract data relevant to this agent
- A rolling window of the last 3–5 turns of the current delegation session

This keeps subagents focused, prevents cross-contract bleed, and keeps token costs predictable.

### Agent Hierarchy

```
Main Orchestrator (PA)
│  Lives in Inbox. Handles all incoming messages. Routes to specialists silently.
│  Also tracks CDM preferences, reminds, proposes layout changes.
│
├── Client Orchestrator  [one per customer]
│   │  Knows the customer, their history, their contracts.
│   │  Routes to the right Contract Subagent based on context.
│   │  Can answer customer-level questions directly
│   │  ("what's total pipeline for Shell this quarter?")
│   │
│   └── Contract Subagent  [one per contract per customer]
│       Scoped to a single contract / SID.
│       Handles R&R matching, pricing, status tracking, ticket creation
│       for that contract. Receives: system prompt + contract data +
│       handoff summary + last 3–5 turns.
│
├── Task Agents  [domain-specific, stateless]
│   ├── email_parse        — extracts fields from customer email text
│   ├── rr_pricing         — R&R match + price lookup (rrPricingSubagent.js)
│   ├── draft_price_email  — fills price communication template
│   ├── generate_o2i       — builds JIRA O2I ticket body
│   └── create_o2i_ticket  — posts to JIRA via JiraClient
│
└── Automation Agents  [event-driven, reactive]
    Triggered by SAP Event Mesh events. Fire autonomously, then surface
    a pending action to the CDM in the Inbox if human input is needed.
    Listed in nav by event type. Names are user-configurable.
    │
    ├── Customer acceptance   — fires when customer accepts → prompts CDM
    │                           to create SCW/SPC ticket; records ticket ID
    └── [future automations]  — configurable via + Add automation
```

### Orchestrator Routing Logic

The Main Orchestrator decides routing on each message using this priority order:

1. **Automation response** — if a pending action is in context (CDM is replying to an automation prompt), route back to the automation agent that surfaced it
2. **Active delegation** — if a Contract Subagent or Client Orchestrator was active in the last 3 turns, continue with it unless the message clearly changes topic
3. **Client intent** — if the message mentions a customer name or SID, route to that customer's Client Orchestrator
4. **Contract intent** — if a contract/SID is explicit, Client Orchestrator delegates to that Contract Subagent
5. **Task intent** — if the message is a clear task (parse email, look up price, draft email), route to the relevant Task Agent
6. **General / PA** — everything else stays with the Main Orchestrator

---

## Navigation Structure

```
─────────────────────────────
  Dashboard                  ← metric widget canvas (configurable, agent-generated)
                               default: KPI strip + open requests table
                               content defined by CDM; generated by Main Orchestrator
                               [full personalisation deferred to later phase]
─────────────────────────────
  Inbox                      ← pending actions + PA chat
                               automation agents surface cards here
                               CDM replies inline; Main Orchestrator handles responses
─────────────────────────────
  Clients
  ├── [Customer A]           ← Client Orchestrator entry point
  │   ├── Contract / SID 1   ← Contract Subagent
  │   └── Contract / SID 2   ← Contract Subagent
  ├── [Customer B]
  │   └── Contract / SID 3
  └── + Add client
─────────────────────────────
  Automations                ← event-driven agents; listed by event type
  ├── Customer acceptance     ← default name; user can rename
  └── + Add automation
─────────────────────────────
  Reference data
  Templates
─────────────────────────────
```

**Nav item renaming:** all Clients and Automations entries carry a `displayName` field in the DB that the CDM can edit via chat ("rename this client to Shell EMEA") or inline edit.

---

## Data Model Additions

```cds
// db/schema.cds additions

entity PersonaLayout {
  key userId     : String(200);
      layoutJson : LargeString;   // PanelConfig JSON for dashboard
      updatedAt  : DateTime;
}

entity ConversationTurn : managed {
  key ID        : UUID;
      userId    : String(200);
      sessionId : String(100);
      role      : String(10);     // 'user' | 'assistant' | 'tool'
      content   : LargeString;
      agentName : String(100);    // which agent produced this turn
}

entity ClientAgent {
  key ID           : UUID;
      customerId   : String(200); // matches customerName on Requests
      displayName  : String(200); // user-configurable label
      createdBy    : String(200);
      createdAt    : DateTime;
}

entity ContractSubagent {
  key ID           : UUID;
      clientId     : UUID;        // FK → ClientAgent
      sid          : String(50);
      displayName  : String(200); // user-configurable label
      contractType : String(50);  // 'Classic' | 'ATLAS'
      createdAt    : DateTime;
}

entity AutomationAgent {
  key ID           : UUID;
      eventType    : String(100); // e.g. 'customer.acceptance'
      displayName  : String(200); // user-configurable; default = event type label
      enabled      : Boolean default true;
      createdBy    : String(200);
      createdAt    : DateTime;
}

entity PendingAction {
  key ID              : UUID;
      userId          : String(200);
      automationId    : UUID;     // FK → AutomationAgent
      sessionId       : String(100);
      prompt          : LargeString;  // what the agent is asking the CDM
      status          : String(20);   // 'pending' | 'responded' | 'dismissed'
      relatedRequestId: UUID;         // FK → AdditionalServiceRequest (nullable)
      createdAt       : DateTime;
      resolvedAt      : DateTime;
}
```

---

## Orchestrator Tools (Anthropic tool_use API)

### Existing tools (unchanged)
- `fetch_records(filters, limit, fields)`
- `render_panel(type, title, config, pinned)`
- `update_record(recordId, fields)`
- `propose_layout_change(description, newPanels)`
- `get_reminder_status(cdmOwner)`

### New tools

#### `route_to_agent`
Delegate to a Client Orchestrator or Contract Subagent. Invisible to CDM — response comes back in same thread.
- `agentType` — `'client_orchestrator'` | `'contract_subagent'`
- `clientId` — UUID of the ClientAgent
- `contractId` — UUID of the ContractSubagent (optional; omit for client-level routing)
- `handoffSummary` — orchestrator-authored context string injected into subagent system prompt
- `message` — the user's current message

#### `invoke_task_agent`
Call a stateless task agent (replaces `invoke_subagent`).
- `name` — `'email_parse'` | `'rr_pricing'` | `'draft_price_email'` | `'generate_o2i'` | `'create_o2i_ticket'`
- `params` — agent-specific inputs

#### `surface_pending_action`
Create a PendingAction record and push a card to the CDM's Inbox.
- `userId` — CDM to notify
- `automationId` — which automation agent triggered this
- `prompt` — what the CDM needs to do or decide
- `relatedRequestId` — the AS request this is about (optional)

#### `resolve_pending_action`
Mark a PendingAction as responded or dismissed.
- `pendingActionId` — UUID
- `status` — `'responded'` | `'dismissed'`
- `recordedData` — any field values captured from CDM's response (e.g. `{ spcTicketId: 'TKT-12345' }`)

#### `register_client`
Create a new ClientAgent entry.
- `customerId` — customer name / ID
- `displayName` — how it appears in the nav

#### `register_contract`
Create a new ContractSubagent entry under an existing ClientAgent.
- `clientId` — UUID of parent ClientAgent
- `sid` — contract SID
- `displayName` — label for nav
- `contractType` — `'Classic'` | `'ATLAS'`

---

## @ui5/webcomponents Panel Palette

| Panel type | ui5 element | Use case |
|---|---|---|
| `record-card` | `<ui5-card>` + `<ui5-card-header>` | Single AS request summary |
| `record-table` | `<ui5-table>` + `<ui5-table-column>` | List of requests |
| `field-form` | `<ui5-form>` + `<ui5-form-item>` | Editable record fields |
| `status-timeline` | `<ui5-timeline>` + `<ui5-timeline-item>` | Status history / activity log |
| `checklist` | `<ui5-list>` + `<ui5-checkbox>` | The 6 per-record checklist items |
| `email-draft` | `<ui5-text-area>` + `<ui5-button>` | Price email or O2I draft, copy + edit |
| `kpi-strip` | `<ui5-card>` row | KPI metrics (configurable by CDM, generated by agent) |
| `reminder-banner` | `<ui5-message-strip>` | Timed reminder rules |
| `ticket-ref` | `<ui5-link>` | Clickable ticket number with copy button |
| `confirm-dialog` | `<ui5-dialog>` | Layout change confirmation / pending action card |
| `pending-action-card` | `<ui5-card>` | Inbox card from automation agent — shows prompt + reply input |

---

## Automation Agent Model

Automation agents are event-driven. They subscribe to SAP Event Mesh topics and fire when a matching event arrives. They do not require a CDM to initiate them.

**Lifecycle:**
1. Event Mesh delivers event to CAP endpoint `POST /api/v1/events`
2. CAP router matches event type to an enabled `AutomationAgent` record
3. Agent handler runs: reads event payload, loads related AS request, reasons about required action
4. If autonomous action is possible (e.g. update a field) → acts and logs
5. If human input is needed → calls `surface_pending_action` tool → PendingAction record created → Inbox card rendered for CDM
6. CDM sees card in Inbox, replies in chat → Main Orchestrator calls `resolve_pending_action` → records CDM's response on the AS request

**Initial automation: Customer acceptance**
- Event type: `customer.acceptance` (from SPC or SAP4Me)
- Trigger: customer accepts the price proposal
- Agent action: prompts CDM to create SCW/SPC ticket; when CDM provides ticket ID, calls `update_record` to save `spcTicketId` on the request

**Nav display:** automations are listed by `displayName` (defaults to human-readable event type label). CDM can rename any entry via chat or inline edit. `+ Add automation` opens a configuration flow (event type, display name, enable/disable toggle).

---

## Shell File Structure

```
app/shell/
  index.html          ← bootstrap: @ui5/webcomponents CDN, mode toggle, nav structure
  shell.css           ← two-mode split, panel grid, chat thread, inbox, nav tree
  ChatShell.js        ← conversation thread, POST /orchestrate, inline panels
  PersonaShell.js     ← dashboard mode: loads saved layout, renders panels
  Renderer.js         ← PanelConfig JSON → @ui5/webcomponents DOM
  PersonaStore.js     ← GET/PATCH /api/v1/PersonaLayouts(userId)
  ODataClient.js      ← thin fetch wrapper for /api/v1/ live data binding
  NavTree.js          ← renders Clients + Automations nav tree from DB; handles rename
  InboxView.js        ← renders PendingAction cards; wires reply → POST /orchestrate
```

`app/tracker/` is deleted after `app/shell/` is verified end-to-end.

---

## LLM Client

`srv/lib/llm/AnthropicDirectClient.js` — `chatWithTools` method (already implemented):
- Runs tool-use loop with `claude-opus-4-7` (4096 tokens, adaptive thinking, 10-iteration cap)
- Iterates until `stop_reason === 'end_turn'`
- Calls `toolHandler(name, input)` for each `tool_use` block, appends results

**Subagent calls** use `chatWithHistory` (not `chatWithTools`) — they are single-purpose LLM calls with injected context, not tool-use loops.

---

## Orchestrator Handler

```javascript
this.on('orchestrate', async req => {
  const { message, sessionId, mode } = req.data
  const userId = req.user?.id || 'anonymous'

  // 1. Load last 20 ConversationTurns for this sessionId
  // 2. Load CDM's open requests as ambient context (status != 'Complete')
  // 3. Load persona layout from PersonaLayouts
  // 4. Load active PendingActions for this userId
  // 5. Load ClientAgent + ContractSubagent records for nav context
  // 6. Evaluate REMINDER_RULES server-side → include firing reminders in system prompt
  // 7. chatWithTools(systemPrompt, history + [user message], TOOLS, toolDispatcher)
  //    toolDispatcher routes each tool_use call to:
  //      fetch_records          → SELECT from Requests
  //      render_panel           → push to panels[]
  //      invoke_task_agent      → call task agent logic directly
  //      route_to_agent         → build subagent context + call subagent chatWithHistory
  //      update_record          → UPDATE Requests via CAP UPDATE
  //      propose_layout_change  → set proposedLayout in response
  //      get_reminder_status    → evaluate rules, return firing reminders
  //      surface_pending_action → create PendingAction + push Inbox card
  //      resolve_pending_action → update PendingAction status + record data
  //      register_client        → create ClientAgent
  //      register_contract      → create ContractSubagent
  // 8. Save user + assistant turns to ConversationTurns (with agentName)
  // 9. return JSON.stringify({ reply, panels, proposedLayout, pendingActions })
})
```

**route_to_agent dispatcher:**
```javascript
// When route_to_agent fires:
const subagentSystemPrompt = buildSubagentPrompt(agentType, clientId, contractId)
const injectedContext = await loadAgentContext(agentType, clientId, contractId)
// Rolling window: last 3-5 turns tagged with this clientId/contractId
const rollingWindow = recentTurns.filter(t => t.agentName === agentId).slice(-5)
const result = await llm.chatWithHistory(
  subagentSystemPrompt + '\n\n' + injectedContext + '\n\n' + handoffSummary,
  [...rollingWindow, { role: 'user', content: message }]
)
// Save turn tagged with agentName so rolling window works next call
```

---

## Reminder Rules (Server-Side)

Evaluated on every `orchestrate` call. Firing reminders surfaced via `render_panel(type: 'reminder-banner')`.

| Rule | Trigger | Severity |
|---|---|---|
| Price communicated, no approval, 7–14 days | Follow-up nudge | Warning |
| Price communicated, no approval, 14–85 days | Escalation | Error |
| Price communicated, no approval, 85+ days | Price expires in 5 days | Error |
| Approval received, SharePoint not uploaded, 3+ days | Upload reminder | Warning |
| In delivery, no customer closure, 30+ days | Stalled check-in | Warning |
| Customer closed, AMS not closed, 3+ days | Close AMS | Warning |
| AMS closed, no O2I ticket, 3+ days | Open O2I ticket | Warning |

---

## Persona Layout Lifecycle

1. **First login** — default: `kpi-strip` (open/urgent counts) + `record-table` (CDM's open requests)
2. **Over sessions** — orchestrator tracks panel usage patterns. After 3 sessions proposes layout change in chat. Uses `propose_layout_change` → `confirm-dialog`.
3. **CDM approves** — `PersonaStore.js` PATCHes `/api/v1/PersonaLayouts(userId)`
4. **CDM overrides** — "reset my workspace" or "show me just urgent records" any time via chat
5. **Dashboard metrics** — CDM defines what they want to see; content generated by Main Orchestrator; full personalisation deferred to later phase

---

## Demo Strategy

The goal of Phases H–J is a **working demo** — not a production system. The demo must be concrete enough that stakeholders can see and feel the product end-to-end, so they understand what we are building and why. Gaps in integration are shown explicitly as "what we need next."

### Demo scope — build now

| Area | Demo approach |
|---|---|
| Full agent hierarchy | Main Orchestrator + Client Orchestrator + Contract Subagent + Task Agents — all wired and routing |
| 10-step CDM workflow | Completable end-to-end via chat with synthetic data |
| R&R lookup + pricing | Real JSON lookup, real confidence scoring |
| Price email drafting | Real template fill via `draft_price_email` agent |
| O2I ticket generation | `generate_o2i` builds body; `create_o2i_ticket` posts via JiraClient token |
| SPC/SCW integration | CDM enters ticket ID manually in chat; assistant records it — noted as "needs SPC MCP" |
| Pending actions + Inbox | Automation agent surfacing + CDM reply flow — triggered via mock event endpoint |
| Reminder rules | All 7 rules evaluated server-side; banners shown in chat and dashboard |
| Shell UI | Chat mode + Dashboard mode; both fully navigable |

### Demo stubs — shown as "what we need"

| Gap | Demo stub | What's needed |
|---|---|---|
| SAP Event Mesh | `POST /api/v1/events/mock` — manually trigger a `customer.acceptance` event | Event Mesh tier, topic namespace, event schema, publisher system (Q-EM) |
| ATLAS API | CDM verifies externally; assistant notes "check ATLAS for contract details" | ATLAS external API or MCP |
| SPC MCP | Manual ticket ID entry | SPC MCP PoC (`github.wdf.sap.corp/SPCSM/mcp-spc-poc`) productised |
| AI Core / Gen AI Hub | Direct Anthropic API key | AI Core entitlement + `GenAIHubClient.js` swap |

---

## Implementation Plan

### Phase H — Backend agent foundation

1. Add `PersonaLayout`, `ConversationTurn`, `ClientAgent`, `ContractSubagent`, `AutomationAgent`, `PendingAction` to `db/schema.cds`
2. Add `orchestrate` action + new tool definitions to `srv/as-service.cds`
3. Implement full `orchestrate` handler in `srv/as-service.js` including all tool dispatchers and `route_to_agent` subagent logic
4. Move REMINDER_RULES server-side
5. Add mock event endpoint `POST /api/v1/events/mock` → automation agent router (real Event Mesh deferred — Q-EM open)
6. Implement `customer.acceptance` automation agent handler
7. Smoke test: `POST /api/v1/orchestrate` — routing to client/contract agent, surfacing pending action, resolving it

**Files modified:** `db/schema.cds`, `srv/as-service.cds`, `srv/as-service.js`  
**Files added:** `srv/lib/automations/customerAcceptanceAgent.js`

### Phase I — Shell UI

1. `npm install @ui5/webcomponents @ui5/webcomponents-fiori`
2. Create `app/shell/index.html` — bootstrap, mode toggle, nav structure (Dashboard / Inbox / Clients / Automations / Reference data / Templates)
3. Create `app/shell/Renderer.js`
4. Create `app/shell/ODataClient.js`
5. Create `app/shell/PersonaStore.js`
6. Create `app/shell/ChatShell.js`
7. Create `app/shell/PersonaShell.js`
8. Create `app/shell/NavTree.js` — loads ClientAgent + ContractSubagent + AutomationAgent from OData, renders tree, handles rename
9. Create `app/shell/InboxView.js` — loads PendingActions, renders cards, wires reply
10. Create `app/shell/shell.css`
11. Full 10-step CDM workflow walkthrough in browser

**Files created:** `app/shell/` (9 files)  
**Files deleted:** `app/tracker/` (after shell verified)

### Phase J — Acceptance sweep

1. Walk every Phase G acceptance criterion — verify or update
2. Confirm API key never appears in browser network traffic
3. Confirm zero PII in AI observability logs
4. Confirm layout persists across sessions
5. Confirm all 7 reminder rules fire correctly in both modes
6. Confirm full 10-step workflow completable via chat
7. Confirm seamless agent handoff — CDM sees one conversation throughout
8. Confirm pending actions surface in Inbox and resolve correctly

---

## Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Demo-first delivery | Build working demo; stub integrations; show gaps explicitly | Hard to get stakeholder buy-in for an agent product without seeing it |
| Seamless handoff | Yes — one conversation surface, orchestrator routes silently | CDM mental model: one assistant, not a switchboard |
| Subagent context | Current message + injected context + 3-5 turn rolling window + handoff summary | Leaner, more predictable, prevents cross-contract bleed |
| Client Orchestrator | One per customer, routes to Contract Subagents | Customer may have multiple contracts; orchestrator holds cross-contract view |
| Contract Subagent | One per contract/SID per customer | Scoped context, clean isolation |
| Automation agents | Event-driven (SAP Event Mesh), listed by event type in nav | Reactive, not polled; CDMs think by "what happened", not "which system" |
| Automation nav naming | Default = event type label, user-configurable rename | Flexibility without imposing a taxonomy |
| Inbox + PA | Main Orchestrator surfaces in Inbox; same agent handles everything | One PA, not fragmented inboxes |
| Dashboard metrics | Agent-generated, CDM-defined schema; deferred | Defer until CDM preference patterns emerge |
| Fixed component palette | Yes — 11 types | Security: no LLM-generated code in DOM |
| `@ui5/webcomponents` not `sap.m` | Yes | Framework-agnostic plain HTML shell |
| Tool-use loop cap | 10 iterations | Safety against runaway loops |
| Reminder rules server-side | Yes | Orchestrator surfaces them proactively |
| ConversationTurns tagged with agentName | Yes | Enables per-agent rolling window without full history scan |

---

## Open Questions

| # | Question | Demo impact | Production impact |
|---|---|---|---|
| Q1 | SPC execution ticket field shape (Oana, 2026-04-25) | Use placeholder `spcExecutionRef` | Schema finalization |
| Q-EM | Event Mesh tier, topic namespace, event schema, publisher system | Mock endpoint used | Real automation subscription |
| Q-ATLAS | ATLAS has no external API | CDM verifies externally | Phase 3: MCP if API surfaces |
| Q-SCW | SPC MCP PoC exists (`github.wdf.sap.corp/SPCSM/mcp-spc-poc`) | Manual ticket ID entry | Phase 3: full SPC MCP integration |
| Q-GEN-AI-HUB | AI Core entitlement needed before real customer data touches the tool | Direct Anthropic key | Phase 2: `GenAIHubClient.js` swap |
