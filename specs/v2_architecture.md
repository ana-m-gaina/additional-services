# CDM AS Tracker v2 — Architecture & Build Spec
**Date:** 2026-05-06
**Author:** Ana Gaina
**Status:** Active — replaces current_state.md and phase_1/2/3 docs for v2 work

---

## What This Is

An AI-native personal workspace for SAP Customer Delivery Managers (CDMs) that manages the end-to-end Additional Services billing process. The shell is just a surface — everything meaningful happens inside a hierarchy of AI agents. The CDM talks; agents do the work.

**Core principle:** the app is a framework, not a tool. The orchestrator can spawn new agents, skills, and automations conversationally. The nav is always a live projection of what exists in the DB.

---

## Stack

| Layer | Technology |
|---|---|
| CAP backend | `@sap/cds` v9, OData v4, SQLite dev → HANA Cloud prod |
| Python agent service | FastAPI + Anthropic SDK, uvicorn, port 8000 |
| LLM | Claude via HAI proxy (SAP AI Core compatible) |
| Frontend shell | Vanilla JS + `@ui5/webcomponents@2` CDN, no bundler |
| Auth | XSUAA (BTP) — row-level security on HANA; dummy auth in dev |
| RAG | Ollama + `mxbai-embed-large` for R&R and pricing chunks |

---

## Repository Layout

```
cdm-as-tracker-v2/
├── assets/
│   ├── cdm-as-tracker-cap/          ← CAP backend (port 4004)
│   │   ├── db/schema.cds
│   │   ├── srv/
│   │   └── app/shell/               ← Beacon frontend
│   │       ├── index.html
│   │       ├── shell.css
│   │       ├── AgentClient.js       ← SSE streaming to Python agent
│   │       ├── ODataClient.js       ← CAP OData reads/writes
│   │       ├── PersonaStore.js
│   │       ├── ChatShell.js
│   │       ├── Renderer.js
│   │       ├── NavTree.js
│   │       ├── InboxView.js
│   │       └── PersonaShell.js
│   └── cdm-as-tracker-agent/        ← Python multi-agent service (port 8000)
│       ├── app/
│       │   ├── main.py              ← FastAPI, SSE, XSUAA middleware
│       │   ├── anthropic_client.py  ← HAI proxy abstraction
│       │   ├── cap_client.py        ← reads/writes CAP OData
│       │   └── agents/
│       │       ├── orchestrator.py  ← main tool-use loop
│       │       ├── client_agent.py  ← scoped to one customer
│       │       ├── contract_agent.py← scoped to one contract SID
│       │       ├── rr_agent.py      ← R&R RAG (cosine + keyword)
│       │       ├── pricing_agent.py ← pricing RAG
│       │       ├── request_management_agent.py
│       │       └── o2i_agent.py     ← JIRA O2I ticket generation
│       └── scripts/
│           ├── ingest_rr.py
│           └── ingest_pricing.py
```

---

## Agent Hierarchy

### Tier 1 — Non-editable infrastructure (always present)

These agents are fixed. CDMs configure them but cannot create or delete them.

```
Orchestrator
├── R&R Agent          — RAG over R&R PDFs
├── Pricing Agent      — RAG over pricing chunks  
├── Request Mgmt Agent — AS request lifecycle
├── O2I Agent          — JIRA invoice ticket generation
├── Inbox              — pending actions queue
└── Automations        — event-driven agents (non-editable set)
```

### Tier 2 — Editable CDM workspace (conversationally created)

CDMs build this tier by talking to the orchestrator.

```
Customer Agent  (one per customer, CDM-created)
├── risk + notification aggregation
├── custom analytics layer (emerging taxonomy)
└── Contract Agent(s)  (one per contract SID, CDM-created)
        ├── predefined MCP tools: meeting notes, email templates
        ├── surfaces info UP to Customer Agent
        └── pulls from Automations (SLA countdowns, event triggers)
            └── Reference Material  (customer-scoped docs, R&R, pricing)
```

### Agent lifecycle states

Every ClientAgent and ContractSubagent has a lifecycle:

```
active → suspended   (contract paused, data preserved, agent dormant)
active → archived    (contract ended, read-only, CDM can query history)
archived → retired   (purge window elapsed, tombstone row replaces entity)
active → transferred (new CDM assigned, persona resets, data stays)
```

**Rules:**
- Nav only renders `status = 'active'` agents — lifecycle management keeps nav clean
- Orchestrator silently skips `suspended` agents during routing
- `archived` agents are read-only — orchestrator can query but not write
- `retired` agents leave a tombstone in `RetiredAgents` table (ID, name, retiredAt, retiredBy, retentionPolicy)
- CDM triggers lifecycle changes conversationally: "archive the Acme contract"

---

## Data & Permissions Model

### Row-level security (HANA / XSUAA)

```
CDM sees only:  ASRequest WHERE assignedCDM = jwt.email
                ClientAgent WHERE createdBy = jwt.email  (or shared)
                ContractSubagent WHERE clientId IN (CDM's clients)
```

XSUAA roles: `CDM` (own data), `Manager` (team data), `Admin` (all + reference data writes).

### Personal preference layer (PersonaLayouts)

Completely separate from row security. Each CDM owns their own:
- Dashboard panel layout
- Assistant name
- Conversation history (ConversationTurns)
- First-run state

This layer is *never* shared, *never* row-secured — it belongs entirely to `userId`.

---

## Nav Structure

The nav is a live DB projection — nothing is hardcoded except the top-level sections.

```
──────────────────────────────
  Dashboard       ← orchestrator KPIs, my workload
  Inbox           ← automation outputs needing CDM input
  Automations     ← non-editable; configured, not created
──────────────────────────────
  [Customer A]    ← ClientAgent (status=active)
    └─ Contract 1 ← ContractSubagent (status=active)
    └─ Contract 2
  [Customer B]
    └─ Contract 3
  + Add customer  ← triggers orchestrator create_client_agent tool
──────────────────────────────
  Reference data  ← RRDocuments + PricingTable (scoped per customer eventually)
  Templates       ← EmailTemplates
──────────────────────────────
```

Clicking any nav item fires a `nav:select` event → ChatShell opens a scoped conversation for that entity. The orchestrator routes based on entity type.

---

## Frontend Shell

### Key differences from v1

| | v1 (additional-services-tracker) | v2 (cdm-as-tracker-v2) |
|---|---|---|
| Chat endpoint | CAP `/api/v1/orchestrate` (OData action) | Python `/api/chat/stream` (SSE) |
| Streaming | No — single POST/response | Yes — live activity feed during agent thinking |
| Agent service | In-process CAP JS | Separate FastAPI service (port 8000) |
| OData base | `/api/v1` (CAP v1) | `http://localhost:4004/CDMService` |
| localStorage key | `beacon_assistant_name` | `beacon_v2_assistant_name` |

### AgentClient.js (new in v2)

Handles SSE streaming from the Python agent. During a response:
1. Shows animated thinking dots
2. Each `activity` SSE event appends a line to an activity feed (monospace, scrollable)
3. On `result` event: removes thinking, renders reply + panels
4. On `error` event: shows system bubble

### Panel palette (unchanged from v1)

`record-card`, `record-table`, `field-form`, `status-timeline`, `checklist`, `email-draft`, `kpi-strip`, `reminder-banner`, `ticket-ref`, `confirm-dialog`

---

## Python Agent Service

### Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/chat` | Single-turn, no streaming |
| `POST /api/chat/stream` | SSE streaming — used by shell |
| `GET /health` | Health check |
| `GET /.well-known/agent.json` | A2A agent card |
| `GET /api/rr/document/{id}/file` | Serve ingested R&R PDFs |

### Orchestrator tools (11)

`rename_assistant`, `fetch_records`, `render_panel`, `call_subagent`, `update_record`, `propose_layout_change`, `get_reminder_status`, `route_to_agent`, `surface_pending_action`, `resolve_pending_action`, `register_client`, `register_contract`

### Subagent dispatch

The orchestrator calls subagents in-process (Python function calls) today. Each subagent is A2A-ready — has its own system prompt and clean `run()` interface. Future: each becomes an independent FastAPI service with its own `/.well-known/agent.json`, callable over HTTP.

---

## Schema additions needed (v2 delta)

The following fields/entities are needed beyond what the current CAP schema has:

### ClientAgent + ContractSubagent lifecycle

```cds
extend entity ClientAgent with {
  status          : String(20) default 'active';  // active|suspended|archived|retired
  archivedAt      : Timestamp;
  archivedBy      : String(255);
  retentionPolicy : String(30) default 'keep_data'; // keep_data|purge_after_90d|purge_immediately
  transferredTo   : String(255);
}
```

Same extension for `ContractSubagent`.

### RetiredAgents tombstone

```cds
entity RetiredAgents {
  key ID             : UUID;
  originalId         : UUID;
  entityType         : String(30); // ClientAgent|ContractSubagent|AutomationAgent
  displayName        : String(255);
  retiredAt          : Timestamp;
  retiredBy          : String(255);
  retentionPolicy    : String(30);
  purgeAfter         : Timestamp;
}
```

### Orchestrator tool: set_agent_status

```python
{
  "name": "set_agent_status",
  "description": "Archive, suspend, retire or transfer a ClientAgent or ContractSubagent.",
  "input_schema": {
    "type": "object",
    "required": ["entityType", "entityId", "newStatus"],
    "properties": {
      "entityType":  {"type": "string", "enum": ["ClientAgent", "ContractSubagent"]},
      "entityId":    {"type": "string"},
      "newStatus":   {"type": "string", "enum": ["suspended", "archived", "retired", "transferred"]},
      "transferTo":  {"type": "string", "description": "CDM email — required for transferred"},
      "retentionPolicy": {"type": "string", "enum": ["keep_data", "purge_after_90d", "purge_immediately"]}
    }
  }
}
```

---

## What Works Today (v2)

- CAP backend running on :4004 with full schema (15 CDMService entities, 8 AdminService entities)
- Python multi-agent service scaffolded with all 7 agents
- Beacon v2 shell at `http://localhost:4004/shell/index.html`
- SSE streaming wired (needs Python agent running on :8000)
- UI5 web components loading from CDN
- NavTree loads ClientAgents, ContractSubagents, AutomationAgents from CAP
- InboxView polls PendingActions from CAP

## What Needs Building (prioritised)

| Priority | Item |
|---|---|
| P1 | Start Python agent + verify SSE chat works end-to-end |
| P1 | Seed data — synthetic clients, contracts, requests in CAP DB |
| P1 | Nav item click → scoped chat (`nav:select` event wiring) |
| P2 | Agent lifecycle fields + `set_agent_status` tool |
| P2 | `RetiredAgents` tombstone entity in CAP schema |
| P2 | NavTree filters to `status=active` only |
| P2 | Reference data + Templates nav links wired to real CAP entities |
| P3 | A2A agent card per subagent (independent FastAPI services) |
| P3 | XSUAA row-level security enforcement on HANA |
| P3 | BTP deployment (mta.yaml already exists) |

---

## Open Questions (carried forward)

| # | Question | Owner | Blocks |
|---|---|---|---|
| Q1 | `spcExecutionRef` field shape | Oana | Schema finalization |
| Q5 | R&R + pricing JSON maintenance owner | TBD | Admin UX |
| Q8 | SharePoint base URL | Julia Ehmke | Checklist default |
| Q-EM | Event Mesh tier, topic namespace, event schema | Julia Ehmke | Automation agents (prod) |
