# Additional Services Tracking Tool — Phase 3 Roadmap

**Version:** 0.1
**Status:** Roadmap — NOT a dev-ready spec
**Author:** Ana Gaina
**Date:** 2026-04-24
**Depends on:** Phase 2 shipped with pilot adoption across multiple CDMs

---

## 0. What This Document Is (and Isn't)

This is a **roadmap**, not a spec. Phase 3 depends on answers to open questions that don't exist yet (APEX API availability, SAP internal MCP surfaces, entitlement scope, etc.). Writing Phase 3 as an executable spec before those answers arrive would be fiction.

This document captures architectural direction and the concrete open questions that must be answered before any Phase 3 section becomes a real spec.

When an open question is answered, the relevant section graduates to `phase_3_<topic>.md` as a dev-ready spec.

---

## 1. Purpose

Phase 3 transforms the tracker from a **useful internal tool** into a **node in SAP's agentic mesh**. Four directions:

1. **Real external system integrations** — swap Phase 2's mocked clients for Destination-backed real clients
2. **Event Mesh reactive layer** — external state changes flow into the tracker automatically
3. **MCP producer wrapper** — expose tracker functionality so other AI agents (Joule, Stefan's consolidated agents, Claude) can consume it
4. **Fiori Launchpad + Work Zone integration** — tracker becomes a discoverable tile in the SAP internal portal

---

## 2. Architectural Direction

### The two-layer pattern

```
┌─────────────────────────────────────────┐
│ Agent-facing layer (MCP producer)       │  ← AI agents consume tool
│  Exposes: search_AS, create_AS,         │
│  get_O2I_body, draft_price_email        │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ Durable connectivity layer              │  ← Production traffic
│  CAP service + BTP Destinations         │
│  + XSUAA + HANA Cloud                   │
└─────────────────────────────────────────┘
   │          │           │         │
   ▼          ▼           ▼         ▼
  JIRA   SAP4Me     APEX      SharePoint
 (REST)  (OData)   (REST?)   (Graph API)

         (External system MCP servers, IF they exist, sit
          on top of these APIs — not in the critical path
          for the tracker's own outbound calls.)
```

**Critical rule:** the tracker's CAP service calls external systems via Destinations directly, NOT via MCP client calls. MCP is the agent-facing interface, not the enterprise integration plumbing.

### Why this split matters

- **Durable connectivity layer** handles the production traffic — SLAs, retries, auth, error handling, observability. This is standard BTP integration engineering.
- **Agent-facing layer** is a thin translation surface. AI agents can read/write AS records through MCP tools without knowing anything about OData, XSUAA, or Destinations.
- Mixing them (e.g., "call JIRA via MCP from inside the CAP service") couples your production reliability to the maturity of SAP's internal MCP ecosystem, which in 2026 is still uneven.

---

## 3. External System Integrations

Each swap replaces a Phase 2 mocked client with a Destination-backed real client. The CAP action code doesn't change — only the client implementation.

### Integration targets

| System | Data flow | Use cases | Open questions |
|---|---|---|---|
| **JIRA ECSBO** | Outbound | Auto-create O2I invoice ticket; CDM no longer pastes | Q3.1: Is there a shared JIRA service account for BTP-side creation, or does this require principal propagation? |
| **SAP4Me** | Inbound (read) | Pull live case/AMS/SPC ticket status; show in tracker | Q3.2: OData endpoint stable across SAP4Me upgrades? Rate limits? |
| **SAP4Me** | Inbound (events) | Auto-advance status when customer closes ticket | Q3.3: Does SAP4Me emit Event Mesh events for ticket state changes? (See §4) |
| **APEX** | Inbound (read) | Live pricing sync, replace JSON export | Q3.4: API exists at all? Auth method? Update frequency? Carried from Phase 1 Q4. |
| **SharePoint** | Inbound (read) | Auto-check SharePoint upload box when file appears in customer folder | Q3.5: MS Graph API scope + app registration in SAP's Azure AD tenant |
| **SharePoint** | Outbound (write) | Optional — CDM uploads approval directly from the tool | Q3.6: Worth the UX vs just the URL link? Needs CDM feedback |
| **ServiceNow** | Inbound (read) | Pull ITSM ticket status | Q3.7: REST API access credentials |
| **AMS** | Outbound (write) | Auto-close AMS ticket when CDM clicks Close in tracker | Q3.8: AMS API availability, authentication. May not have an external API. |
| **One360 / CRT** | Inbound (read) | Lookup sales order / contract no. by customer | Q3.9: API availability and auth |

### Sequencing

Not all integrations are equal. Suggested priority:

1. **JIRA (outbound O2I creation)** — highest value (saves CDM the paste step) and cleanest API
2. **SAP4Me (inbound read)** — enables live status context even without events
3. **SharePoint (inbound read)** — auto-checks a checkbox, small win
4. **APEX** — depends on Q3.4 answer
5. **One360** — nice-to-have
6. **ServiceNow, AMS** — least clear path, last

---

## 4. Event Mesh Reactive Layer

### What changes

Phase 1+2: all state transitions are CDM-initiated (CDM clicks a button, enters a date, ticks a checkbox).
Phase 3: external events auto-advance state.

### Target events to consume

| Source | Event | Tracker reaction |
|---|---|---|
| SAP4Me | Customer closes Case/CSR | Advance status to `Customer closed`, fill `Customer closure date` |
| SAP4Me | Ticket status changes | Update tracker's cached status field for display |
| SharePoint | New file in customer folder | Auto-check `SharePoint upload done` checkbox |
| S/4HANA | Invoice posted | Advance status to `Complete` automatically |
| AMS | Ticket closed externally | Auto-check `AMS ticket closed` |

### Architectural notes

- CAP service subscribes to Event Mesh queues for each source
- Event handlers translate external events → internal state transitions
- Every auto-transition is still visible to CDMs (shows in activity log) and undoable

### Open questions

- **Q3.10:** Does Event Mesh already have publishers for SAP4Me, SharePoint, S/4? Or does that need to be set up on the publisher side?
- **Q3.11:** How do we handle event ordering / out-of-order delivery?
- **Q3.12:** Dead letter queue strategy — what happens when a record referenced in an event doesn't exist in the tracker?

---

## 5. MCP Producer Wrapper

### What it exposes

A standalone MCP server (thin wrapper over the CAP service's OData API) that exposes tools consumable by AI agents:

| Tool | Purpose | Consumer |
|---|---|---|
| `search_AS_records(query, filters)` | Find AS records by customer, status, date range | Any agent answering "what AS requests are open for customer X?" |
| `get_AS_record(id)` | Fetch a full AS record | Joule summarizing a CDM's day |
| `create_AS_request(payload)` | Programmatically create records | Another agent processing inbound customer requests |
| `get_O2I_body(record_id)` | Generate O2I body for an existing record | CDM asking Claude "what's the O2I body for record 123?" |
| `draft_price_email(record_id)` | Generate price email for an existing record | Joule drafting email on behalf of CDM |
| `list_open_by_owner(cdm_email)` | List open records for a CDM | Dashboard / morning-briefing agent |

### Implementation notes

- MCP server is a separate Node process deployed alongside the CAP app
- Calls CAP service via OData with principal-propagation auth — no direct DB access
- Each tool maps to 1–2 CAP actions / entity reads
- Agent auth via the caller's XSUAA token passed through

### Open questions

- **Q3.13:** Does Joule support MCP tool consumption in 2026-07 timeframe? (Check Joule roadmap.)
- **Q3.14:** How do we authenticate Claude-Code-from-Ana's-laptop calling the production MCP server? Service account? Personal token?

### What this unlocks

- **Joule integration** — CDM asks Joule "what AS requests does Fressnapf have open?" and it queries the tracker
- **Stefan's consolidated agents** — if any downstream agent needs AS data, it consumes via this MCP
- **Claude Code** — Ana (and other developers) can query/modify tracker state from their dev sessions
- **Perf review narrative** — "my tool is infrastructure for other agents, not a silo"

---

## 6. Fiori Launchpad + Work Zone Integration

### What changes

Phase 1+2: localhost-only (dev) or standalone CF app (pilot). CDMs access via direct URL.
Phase 3: tracker appears as a tile in CDMs' Work Zone / Fiori Launchpad.

### Pieces

- Launchpad tile config (app metadata, icon, role assignment)
- App router binding to the CAP service
- Role propagation through Work Zone

### Open questions

- **Q3.15:** Is there an internal CDM Work Zone instance, or does each CDM have a personal launchpad?
- **Q3.16:** Approval process for adding tiles to shared launchpads?

---

## 7. Deferred / Possibly-Never

These are on the "maybe Phase 4 or never" pile:

- **Customer-facing self-service** — customers initiate AS requests directly into the tool (bypassing email to CDM). Large UX redesign, privacy/security implications. Probably belongs in Service Cloud V2 territory, not here.
- **Full workflow automation** (CDM out of the loop for standard cases) — philosophically out of scope; tool's job is to support CDM judgment, not replace it.
- **Multi-language AI prompts** — if CDM team goes multilingual. Not needed now.

---

## 8. Complete Open Questions (Phase 3)

Any Phase 3 section graduates to a real spec only after its blocking questions resolve.

| # | Question | Blocks |
|---|---|---|
| Q3.1 | JIRA service account vs principal propagation for ECSBO ticket creation | JIRA integration |
| Q3.2 | SAP4Me OData endpoint stability + rate limits | SAP4Me inbound integration |
| Q3.3 | SAP4Me Event Mesh event emission | Reactive layer for SAP4Me |
| Q3.4 | APEX API existence + auth (carried from Phase 1) | APEX live pricing sync |
| Q3.5 | MS Graph API app registration in SAP Azure AD | SharePoint read |
| Q3.6 | SharePoint write — worth UX effort? | SharePoint outbound |
| Q3.7 | ServiceNow REST API credentials | ITSM integration |
| Q3.8 | AMS external API availability | AMS auto-close |
| Q3.9 | One360 / CRT API availability | Sales order lookup |
| Q3.10 | Event Mesh publisher setup for target systems | Reactive layer |
| Q3.11 | Event ordering / out-of-order handling | Reactive layer reliability |
| Q3.12 | Dead letter strategy for orphaned events | Reactive layer |
| Q3.13 | Joule support for MCP tool consumption | MCP producer value |
| Q3.14 | MCP server auth for external agent callers | MCP producer security |
| Q3.15 | CDM Work Zone instance availability | Launchpad integration |
| Q3.16 | Shared launchpad tile approval process | Launchpad deploy |

---

## 9. Dependencies on Phase 1 + 2

Phase 3 can't start until:

- Phase 1 shipped to pilot with at least 1 active CDM for ≥4 weeks
- Phase 2 email reminders in production
- Mocked external client pattern established (Phase 2 §5) — the swap points are already in the code
- AI Core / Gen AI Hub entitlement active (required for compliant LLM routing in Phase 2, inherited by Phase 3)
- XSUAA auth in place (Phase 2 §6) — MCP producer needs principal propagation to work

---

## 10. What This Phase Is NOT

To avoid scope creep during Phase 3 planning:

- **NOT** a full workflow engine rewrite. Status transitions remain CAP action handlers.
- **NOT** a data warehouse. Analytics stays in SAC or whatever reporting tool CDMs prefer.
- **NOT** a replacement for SAP4Me, JIRA, or other systems. Tracker remains the CDM's record-keeping layer; external systems remain their own source of truth.
- **NOT** a customer-facing surface. CDMs and internal roles only.

---

*Roadmap — not for execution. When sections graduate to spec status, they move to their own files.*
