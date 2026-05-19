# Presentation Generation Prompt -- CDM Additional Services Tracker

Use this prompt with a custom AI agent (e.g. a design/presentation agent or Gamma/Beautiful.ai) to generate the architecture presentation.

---

## PROMPT

You are creating a **technical architecture presentation** for an internal SAP stakeholder audience. The presentation covers the **CDM Additional Services Tracker** -- an AI-native tool built by Ana Gaina for SAP Customer Delivery Managers (CDMs).

The goal of the presentation is to:
1. Explain what the tool does and why it exists
2. Show the agent architecture clearly (this is the most important part)
3. Communicate what access/entitlements are needed to take it to production

---

## CONTEXT: What problem this solves

SAP CDMs manage chargeable Additional Services (AS) for enterprise customers. Today this means:
- Manually checking R&R PDFs to confirm if a service is chargeable
- Looking up prices in a separate pricing spreadsheet
- Drafting price communication emails by hand
- Creating JIRA Order-to-Invoice tickets manually
- Tracking status across CSN/SPC tickets, SharePoint uploads, AMS closures, and SAP4Me
- No single system that ties it all together

The CDM AS Tracker consolidates this into one AI-native workspace backed by SAP CAP and Claude.

---

## WHAT IS BUILT (do not present as roadmap -- this is working today)

**Backend:** SAP CAP Node.js service on HANA Cloud
- Full OData CRUD for AS requests (30+ fields, 8-state lifecycle)
- Status machine: New -> Price communicated -> Approval received -> In delivery -> Delivered -> AMS closed -> O2I created -> Complete
- AI actions: email parse, R&R match, price pre-fill, price email draft, O2I body generation
- Admin layer: R&R documents ingested for RAG, pricing table, email templates, AdminConfig

**Frontend:** React + SAP UI5 Web Components agent-native shell
- PersonaShell, NavTree, InboxView, ChatShell
- Panel-driven UI: record-card, record-table, email-draft, confirm-dialog, kpi-strip, rr-source, status-timeline
- All UI updates driven by agent-returned panel specs

**AI Agent (Python FastAPI):**
- Main Orchestrator (Claude Opus 4.7) with 32 tools
- 5 specialist subagents (see architecture section below)
- Conversation memory persisted in CAP OData
- Eval framework: 9 test cases covering all 7 skills

---

## AGENT ARCHITECTURE (most important section -- spend the most slides here)

### Overview: Two-Tier Agent Hierarchy

```
+-------------------------------------------------------------+
|                  CDM (via browser chat)                      |
+--------------------------+----------------------------------+
                           | POST /api/chat/stream (SSE)
                           v
+-------------------------------------------------------------+
|              MAIN ORCHESTRATOR                               |
|              Claude Opus 4.7 ? 32 tools ? 10-iteration cap   |
|                                                              |
|  Loads on every turn:                                        |
|  ? Last 20 conversation turns (per session/user)             |
|  ? Open AS requests (with ages, statuses, prices)            |
|  ? Active reminder alerts (7 rules evaluated)                |
|  ? Pending Inbox actions                                     |
|  ? Meeting note rollup (if customer scoped)                  |
+------+------+--------+--------+--------+--------------------+
       |      |        |        |        |
       |      |        |        |        |
       v      v        v        v        v
  +----+  +------+  +-----+  +----+  +----------------------+
  | R&R|  |Pricing|  | O2I |  |Cust|  | Contract Subagent    |
  |    |  | -> DB |  |     |  |Orch|  | (per SID)            |
  +----+  +------+  +-----+  +----+  +----------------------+
```

### Tier 1: Main Orchestrator

**Purpose:** Central coordinator. Every user message goes here first. Decides which tools to call and in what order. Never answers from memory -- all factual answers come from tool calls.

**32 tools grouped by category:**

| Category | Tools |
|---|---|
| Data retrieval | fetch_records, get_layout, get_reminder_status |
| Search/RAG | rr_lookup, price_lookup |
| Request lifecycle | create_request, update_record, generate_o2i_ticket, confirm_o2i_invoiced |
| Email & templates | parse_email, draft_price_email, template_read, template_write |
| Meeting notes | process_meeting_notes, patch_meeting_note, confirm_meeting_note_patch |
| Panel rendering | render_record_panel, render_data_panel, render_action_panel, render_notice_panel |
| Inbox | surface_pending_action, resolve_pending_action |
| Agent management | register_customer, register_contract, link_session_to_customer, route_to_agent, set_agent_status |
| Personal notes | notes_read, notes_write |
| Admin | inject_document, propose_layout_change, rename_assistant |

**Key behaviors:**
- Always shows confirm-dialog before creating or updating records
- Always shows diff before updating a record
- Routes to specialist subagents for domain-specific work (invisible to CDM)
- Persists every turn (user + assistant) to CAP OData conversation memory

---

### Tier 2: Specialist Subagents

#### 1. R&R Agent
- **Purpose:** Two-stage retrieval over ingested R&R PDF documents
- **How it works:**
  1. Embed the CDM's query using Voyage AI (voyage-4 model)
  2. Cosine similarity search over RRChunks in CAP (threshold 0.3, top 15)
  3. Keyword boost for each matching term
  4. Feed top chunks to Claude -> extract service codes + chargeability
- **Output:** `{summary, matches[{code, name, chargeable, responsibility}], confidence, sources[]}`
- **Status:** Real (not mocked) -- uses live Voyage AI embeddings

#### 2. Pricing Agent -> becoming a DB call
- **Current:** Same two-stage RAG pattern as R&R (Voyage embeddings -> PricingChunks -> Claude reasoning)
- **Future (decided):** Replace with a direct DB lookup against the PricingTable entity in CAP. Pricing data is structured and does not need vector search or LLM reasoning -- a direct OData call to `GET PricingTable?$filter=serviceCode eq 'INFRA_1.8.10'` is faster, cheaper, and more reliable.
- **Impact:** Removes one LLM call from the hot path. Pricing subagent becomes a CAP client function, not an agent.

#### 3. O2I Agent
- **Purpose:** JIRA Order-to-Invoice ticket generation and invoice confirmation
- **Flow:**
  1. Fetch all AS requests with status = "Delivered"
  2. Call Claude to generate JIRA ticket body (description, components, labels)
  3. Return draft for CDM review (always human-in-the-loop)
  4. CDM confirms -> `confirm_o2i_invoiced` advances status to "Invoiced"
- **JIRA:** Currently mocked (ticket body generated but not submitted). Real JIRA integration is Phase 3.

#### 4. Customer Orchestrator (per customer)
- **Purpose:** Scoped reasoning for a single customer across all their AS requests
- **Trigger:** Orchestrator calls `route_to_agent` when message references a specific customer
- **Handoff is invisible:** CDM sees the final answer, not that a subagent was invoked
- **Context it loads:** CustomerAgent record + filtered open requests for that customer + recent turns

#### 5. Contract Subagent (per SID)
- **Purpose:** Same as Customer Orchestrator but scoped to a specific system SID (e.g. AL1PRD)
- **Use case:** "What's happening on AL1PRD?" -> routes to the AL1PRD Contract Subagent

---

### Data Flow: End-to-End Examples

#### Example A: R&R Chargeability Check
```
CDM: "Is a HANA DB upgrade chargeable?"
-> Orchestrator -> rr_lookup("HANA DB upgrade")
-> R&R Agent: embed -> cosine search -> Claude reasons over top 15 chunks
-> Returns: {code: "TO_PA_1.1.01", chargeable: true, confidence: HIGH}
-> Orchestrator renders rr-source panel with document links
-> CDM sees: answer + which R&R page it came from
```

#### Example B: Price Email Draft
```
CDM: "Draft price email for req-001"
-> Orchestrator -> draft_price_email("req-001")
-> Fetch request details from CAP
-> Load CDM's personal email template
-> Fill placeholders (customerName, price, SID, serviceCode)
-> Claude completes any remaining gaps
-> Orchestrator renders email-draft panel
-> CDM reviews and sends from the panel
```

#### Example C: O2I Ticket
```
CDM: "Create O2I ticket for Allianz request"
-> Orchestrator -> generate_o2i_ticket("req-alz-001")
-> CAP action generates JIRA ticket body from request data
-> Orchestrator renders ticket-ref panel for CDM review
-> CDM confirms -> confirm_o2i_invoiced -> status advances to "Invoiced"
```

#### Example D: Meeting Notes Processing
```
CDM: [pastes raw OPS meeting notes]
-> Orchestrator detects meeting notes pattern
-> process_meeting_notes(raw_text)
-> Claude extracts 10 sections: topics, actions, risks, decisions, references, rollup
-> Saved to CAP MeetingNotes entity
-> On next turn: meeting note rollup auto-loaded into system prompt context
```

---

### The 7 Declared Skills (exposed via agent card for platform discovery)

| Skill | What it does |
|---|---|
| `rr-lookup` | Look up R&R service code chargeability from ingested PDFs |
| `pricing-lookup` | Look up current EUR prices for AS service codes |
| `request-management` | Create and manage the full AS request lifecycle |
| `jira-o2i` | Generate and confirm JIRA Order-to-Invoice tickets |
| `panel-rendering` | Render UI panels (record-card, email-draft, confirm-dialog, etc.) |
| `inbox-management` | Surface and resolve PendingAction items in the CDM Inbox |
| `meeting-notes` | Process raw OPS meeting notes into structured 10-section JSON |

---

### LLM Routing

```
+-----------------------------------------------------+
|                  anthropic_client.py                  |
|                                                       |
|  if HAI_BASE_URL + HAI_API_KEY (per user, session):   |
|    -> route through Hyperspace AI proxy                |
|    -> adaptive thinking: OFF                           |
|                                                       |
|  else if ANTHROPIC_API_KEY:                           |
|    -> route direct to Anthropic API                    |
|    -> adaptive thinking: ON                            |
+-----------------------------------------------------+
```

HAI (Hyperspace AI) is the SAP-internal compliant proxy. Each CDM uses their own HAI API key -- entered once per browser session via a key modal, held in React state only, never persisted. Travels in the JSON request body to the agent on every chat call.

---

## TECHNICAL STACK (one slide)

| Layer | Technology |
|---|---|
| Frontend | React 18 + SAP UI5 Web Components |
| Backend | SAP CAP Node.js |
| Database | SAP HANA Cloud (HDI container) |
| AI Orchestrator | Python FastAPI |
| LLM | Claude Opus 4.7 (Anthropic / HAI proxy) |
| Embeddings | Voyage AI (voyage-4) |
| Deployment | SAP BTP Cloud Foundry (joulework-cli) |
| Auth | XSUAA (SAP IDP) |
| Evals | aeval framework (9 test cases, 7 skills) |
| Observability | OTel via SAP Cloud SDK (chat spans, cap spans) |

---

## WHAT WE NEED (one slide -- ask)

| Access | Why |
|---|---|
| HAI (Hyperspace AI) entitlement | Replace per-user key with shared service binding -- compliant LLM routing |
| SAP Event Mesh | Event-driven automation: auto-advance status when SAP4Me ticket closes |
| SAP4Me API | Live case/ticket status in the tracker; customer acceptance events |
| JIRA ECSBO service account | Auto-submit O2I tickets instead of CDM copying text |
| APEX API | Live pricing sync (if API exists -- needs confirmation) |
| MS Graph / SharePoint app registration | Auto-detect SharePoint upload to tick the checkbox |

---

## PRESENTATION FORMAT INSTRUCTIONS

- Slides should be minimal and visual -- architecture diagrams over bullet lists
- The agent hierarchy diagram is the centrepiece: make it large and clear
- Use SAP Horizon design tokens (Indigo #1870D5, dark text on white background)
- Recommended slide sequence:
  1. Problem (what CDMs deal with today -- 6 systems, manual steps)
  2. Solution overview (what the tracker does in one sentence)
  3. What's built (brief, confident -- this works today)
  4. Agent architecture (the main diagram + tier 1 tool categories)
  5. Specialist subagents (one slide each for R&R and Pricing->DB, brief for O2I/Customer/Contract)
  6. End-to-end flow example (pick one: R&R lookup or price email)
  7. Technical stack (one clean table)
  8. What we need (the ask)
  9. Next steps
- Tone: confident, technical, internal SAP audience (no marketing language)
- Do not present Phase 3 items as built -- they are on the roadmap pending the access in the ask slide
