# CDM Additional Services Tracker — Joule-native AI Agent

CDM AS Tracker v2: agent-native workspace for SAP Customer Delivery Managers to manage chargeable Additional Services requests end-to-end.

## Business challenge

SAP Customer Delivery Managers (CDMs) manually track chargeable Additional Services (AS) requests across spreadsheets, emails, and JIRA. There is no single workspace to look up R&R chargeability, get pricing, manage request lifecycle, generate O2I JIRA invoicing tickets, or process OPS meeting notes. The result is slow response times to customers, missed invoicing steps, and no audit trail. The cdmpa Python multi-agent system (FastAPI + CAP OData backend) solves this — it now needs to be adapted to the Joule Studio runtime agent standard so it can be deployed, discovered, and governed on BTP.

## Key Milestones

1. **R&R lookup completed** — CDM asks a chargeability question; rr_lookup returns 1–3 specific service codes from ingested PDF documents.
2. **Pricing confirmed** — price_lookup returns EUR value for a service code; CDM receives draft price-communication email via draft_price_email.
3. **AS request created** — create_request records a new AS request in the CAP OData backend with customer, SID, CDM owner, and service codes.
4. **Request lifecycle updated** — CDM updates status, notes, or fields on an existing AS request via update_record.
5. **O2I ticket generated and confirmed** — generate_o2i_ticket drafts the JIRA O2I invoice ticket body; CDM approves; confirm_o2i_invoiced marks the request as Invoiced.
6. **Meeting notes processed** — CDM pastes raw OPS meeting notes; agent extracts incremental structured JSON (topics, decisions, risks, action items) and generates 10 analysis sections.
7. **Inbox action resolved** — surface_pending_action pushes a card to CDM Inbox; CDM responds; resolve_pending_action closes the loop.

## Business Architecture (RBA)

### End-to-End Process

Lead to Cash (generic) — variants: Lead to Cash for Contract Based Services, Lead to Cash for Project Based Services

### Process Hierarchy

```
Lead to Cash (E2E)
└── Invoice to Cash (generic)
    └── BPS-363: Manage customer invoices (generic)
        └── Invoice customer
└── Plan to Optimize Marketing and Sales (generic)
    └── BPS-367: Develop customer service strategy and plans (generic)
        └── Develop customer care and customer service strategy
```

### Summary

CDM AS Tracker maps to Lead to Cash: the R&R/pricing/request-management flow covers service strategy and planning (BPS-367), while O2I invoicing covers customer invoice management (BPS-363). Neither sub-process has an MCP server available in the tenant — confirming the custom AI Agent approach.

## Fit Gap Analysis

| Requirement (business) | Standard asset(s) found | API ORD ID | MCP Server ORD ID | Gap? | Notes / assumptions |
| ---------------------- | ----------------------- | ---------- | ----------------- | ---- | ------------------- |
| R&R chargeability lookup from PDF documents | None | — | — | Yes | Custom vector search over ingested R&R PDFs; no SAP standard asset covers internal CDM R&R docs |
| Pricing lookup for AS service codes | None | — | — | Yes | Custom Excel-ingested pricing list; no standard price catalog API applicable |
| AS request lifecycle (create, update, status) | Service Request (A2X) OData | `sap.s4:apiResource:OP_API_SERVICE_REQUEST_SRV_0001:v1` | — | Partial | Standard API exists but no MCP server; existing CAP OData backend is the authoritative store |
| Additional Services OData | SuccessFactors Additional Services | `sap.sf:apiResource:AdditionalServices:v1` | — | Partial | ORD ID discovered; no MCP server; SF-specific — not directly applicable to CDM custom tracking |
| O2I JIRA invoicing ticket generation | JIRA REST API | — (no ORD ID) | — | Yes | Custom ticket body generation + JIRA REST integration; no standard MCP server |
| Meeting notes processing (AI extraction) | None | — | — | Yes | Fully custom: incremental topic extraction, 10 analysis sections, JSON diff — no SAP standard |
| CDM Inbox / PendingActions | None | — | — | Yes | Custom CAP entity; no standard inbox management API for this workflow |
| Customer invoice analytics | SAP S/4HANA Cloud (BPS-363) | — | — | No | Analytics covered by S/4; out of scope for this agent |
| Customer service analytics | SAP Service Cloud V2 (BPS-367) | — | — | No | Analytics covered by Service Cloud; out of scope for this agent |

### Key findings

- No MCP servers exist in this tenant for any of the relevant APIs — the AI Agent must implement all tool calls directly.
- The CAP OData backend (cdm-as-tracker-cap) is the authoritative data store; the agent interacts with it via HTTP, not MCP.
- All five core capability gaps (R&R, pricing, O2I, meeting notes, inbox) require fully custom implementation — no SAP standard product covers them.
- The existing `orchestrator.py` (1,828 lines) is a working monolith that needs to be wrapped with Joule-standard artifacts (asset.yaml, translation.json, serverCard.json, ORD endpoint) rather than rebuilt.
- `/.well-known/agent.json` is already wired in `main.py` but the response is minimal; it needs to be expanded to the full Joule agentCard schema.
- XSUAA Bearer auth is already implemented; no auth gap.

## Recommendations

### Adapt cdmpa to Joule Studio runtime agent standard

#### Executive Summary

Wrap existing Python agent with Joule artifacts; no logic rebuild needed.

#### Recommended Solution

Adapt the existing `cdmpa` Python FastAPI multi-agent service to comply with the Joule Studio runtime agent standard. This involves:
1. Regenerating `asset.yaml` via `sap-agent-bootstrap` to match the Joule schema (ORD fields, model binding, probes).
2. Generating `translation.json` and `serverCard.json` from the 20 tool definitions in `orchestrator.py` via `mcp-translation-file`.
3. Generating `mcp-mock.json` via `mcp-mock-config` for local testing.
4. Expanding the `/.well-known/agent.json` endpoint to serve the full agentCard JSON required by UMS discovery.
5. Decomposing `orchestrator.py` into per-tool modules under `app/tools/` (structural refactor only — no logic changes).
6. Adding OpenTelemetry spans via `sap-agent-instrumentation` for tool invocations, Claude API calls, and CAP OData calls.
7. Generating eval test cases via `sap-aeval-generate-tool-schema` + `sap-aeval-generate-testcase` for all 7 skills.
8. Validating `solution.yaml` and `mta.yaml` for Joule-standard deployment.

The CAP Node.js backend (`cdm-as-tracker-cap`) is fully out of scope — no changes required.

#### Problem Statement

The cdmpa agent is functionally complete but was hand-built outside the Joule Studio standard. It lacks the discovery artifacts (translation.json, serverCard.json, full ORD endpoint) and deployment governance (standardised asset.yaml, OTel instrumentation, eval coverage) required for Joule Studio deployment and UMS registration.

#### Affected User Roles

- Customer Delivery Manager (CDM) — primary user; manages AS requests, runs R&R/pricing lookups, processes meeting notes
- CDM Team Lead — reviews Inbox actions, monitors open requests
- SAP Internal Operations — deploys and governs the agent on BTP

#### Important factors

##### Existing logic is battle-tested
The orchestrator, subagents, and CAP backend are already in use. Rebuilding from scratch would risk regressions in the XSUAA auth flow, vector search integration, and CAP OData interaction patterns.

##### Joule artifacts are additive
All required Joule-standard artifacts (translation.json, serverCard.json, mcp-mock.json, ORD endpoint) can be generated and layered on top of the existing code without touching agent logic.

##### Tool decomposition enables parallel agent work
Splitting `orchestrator.py` into per-tool modules allows multiple parallel agents (per T4–T10 in the task list) to work independently without merge conflicts.

#### Potential risks

##### orchestrator.py decomposition scope creep
Splitting 1,828 lines carries risk of accidentally changing behaviour. Mitigate: structural refactor only, no logic changes; run existing tests before and after.

##### translation.json schema drift
If tool input schemas in orchestrator.py evolve after translation.json is generated, the MCP layer will be out of sync. Mitigate: generate translation.json from live tool definitions, not documentation.

#### Recommended solution category

AI Agent, BTP Extension

#### Intent fit
85%
