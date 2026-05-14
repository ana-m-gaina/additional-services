# Specification: cdm-as-tracker-agent

> **Guidelines**: Read [guidelines.md](../guidelines.md) and [guidelines-agent.md](../guidelines-agent.md) before executing ANY tasks below. Follow all constraints described there throughout execution.

> **Context**: This is an ADAPTATION task, not a greenfield build. The agent already exists at
> `cdmpa/assets/cdm-as-tracker-agent/`. Do NOT bootstrap a new project. Work inside the existing
> directory. The CAP backend (`cdm-as-tracker-cap`) is out of scope — no changes to it.

## Basic Setup

- [ ] Read `product-requirements-document.md`, `intent.md`, and this file before starting
- [ ] Confirm the existing agent starts: `cd cdmpa/assets/cdm-as-tracker-agent && pip install -r requirements.txt && uvicorn app.main:app --port 8000`
- [ ] Confirm `GET /.well-known/agent.json` responds (stub currently exists in `app/main.py:125`)
- [ ] Run any existing tests to establish a baseline: `cd cdmpa/assets/cdm-as-tracker-agent && pytest` (record pass/fail count)

---

## REQ-01 — Joule-standard asset.yaml (Priority 1)

- [ ] Invoke skill `sap-agent-bootstrap` from inside `cdmpa/assets/cdm-as-tracker-agent/` to regenerate `asset.yaml`
  - Agent name: `cdm-as-tracker-agent`
  - Version: `2.0.0`
  - Model: `claude-opus-4-7`
  - 7 skills: `rr-lookup`, `pricing-lookup`, `request-management`, `jira-o2i`, `panel-rendering`, `inbox-management`, `meeting-notes`
  - Auth: `bearer` (XSUAA)
  - Streaming: `false`
  - Probes: startup/liveness/readiness all on `/.well-known/agent.json`
- [ ] Verify regenerated `asset.yaml` includes: `apiVersion`, `kind: Asset`, ORD metadata fields, `models[]` binding to `claude-opus-4-7`, correct probe paths and thresholds
- [ ] Diff against old `asset.yaml` — confirm no capability regressions (all 7 skills still present)

---

## REQ-02 — MCP discovery artifacts: translation.json + serverCard.json (Priority 2)

- [ ] Invoke skill `mcp-translation-file` from `cdmpa/assets/cdm-as-tracker-agent/`
  - Source: the 20 tool definitions in `app/agents/orchestrator.py` (the `ORCHESTRATOR_TOOLS` list)
  - All 20 tools must be represented: `rename_assistant`, `fetch_records`, `render_record_panel`, `render_data_panel`, `render_action_panel`, `render_notice_panel`, `rr_lookup`, `price_lookup`, `parse_email`, `draft_price_email`, `generate_o2i_ticket`, `confirm_o2i_invoiced`, `create_request`, `update_record`, `get_layout`, `propose_layout_change`, `get_reminder_status`, `route_to_agent`, `surface_pending_action`, `resolve_pending_action`
- [ ] Verify `translation.json` is generated and covers all 20 tools with correct `name`, `description`, and `inputSchema`
- [ ] Verify `serverCard.json` is generated and references all 7 skills
- [ ] Spot-check 3 tools (`rr_lookup`, `create_request`, `render_action_panel`) — confirm their input schemas in `translation.json` match the schemas in `orchestrator.py` exactly

---

## REQ-03 — Full agentCard ORD endpoint (Priority 3)

- [ ] Invoke skill `sap-agent-ord-endpoint` from `cdmpa/assets/cdm-as-tracker-agent/`
- [ ] Expand the `GET /.well-known/agent.json` handler in `app/main.py` to return the full Joule agentCard schema:
  - `name`, `version`, `description`
  - `capabilities.skills`: all 7 skills with `name` and `description`
  - `authentication.type`: `"bearer"`
  - `streaming.enabled`: `false`
  - `models`: `[{"name": "claude-opus-4-7", "executableId": "anthropic"}]`
  - `endpoints`: `/api/chat` (sync) and `/api/chat/stream` (SSE)
- [ ] Confirm `/.well-known/agent.json` is in `_UNPROTECTED` set (auth bypass) — already in `main.py:83`, verify unchanged
- [ ] `curl http://localhost:8000/.well-known/agent.json` — confirm all 7 skills appear in the response

---

## REQ-04 — Per-tool module decomposition (Priority 4)

> Structural refactor only. Zero logic changes. Run baseline tests before and after.

- [ ] Create directory `cdmpa/assets/cdm-as-tracker-agent/app/tools/`
- [ ] Create `app/tools/__init__.py` (empty)
- [ ] For each of the 20 tools, create `app/tools/<tool_name>.py` containing:
  - The tool's handler function (extracted from `orchestrator.py`)
  - Any helper functions used exclusively by that tool
  - Imports needed by that tool only
  - Tool schema dict (the entry from `ORCHESTRATOR_TOOLS`) as a module-level constant `TOOL_SCHEMA`
- [ ] Group the 4 panel render tools (`render_record_panel`, `render_data_panel`, `render_action_panel`, `render_notice_panel`) into `app/tools/panels.py` — they share panel-building logic
- [ ] Update `app/agents/orchestrator.py`:
  - Import tool handlers from `app/tools/`
  - Import `TOOL_SCHEMA` constants to rebuild `ORCHESTRATOR_TOOLS` list
  - Remove extracted handler code from orchestrator body
  - Keep the tool-use loop, session memory, and routing logic in orchestrator
- [ ] Verify `ORCHESTRATOR_TOOLS` list still has exactly 20 entries after refactor
- [ ] Run `pytest` — all baseline tests must still pass
- [ ] Verify `orchestrator.py` line count is below 600 lines after decomposition

---

## REQ-05 — OpenTelemetry instrumentation (Priority 5)

- [ ] Invoke skill `sap-agent-instrumentation` from `cdmpa/assets/cdm-as-tracker-agent/`
- [ ] Verify `auto_instrument()` is called at the very top of `app/main.py` before any AI framework imports (already present at `main.py:3-7`, confirm it remains first)
- [ ] Add OTel span to each tool module in `app/tools/`:
  - Span name: `tool.<tool_name>`
  - Attributes: `tool.name`, `session_id`, `cdm_email`, `duration_ms`, `outcome` (`success`/`error`)
  - On error: record exception and set span status to ERROR
- [ ] Add OTel span to the Claude API call in `orchestrator.py`:
  - Span name: `claude.api_call`
  - Attributes: `model`, `input_tokens`, `output_tokens`, `cache_read_tokens`, `cache_write_tokens`, `iteration` (tool-use loop counter)
- [ ] Add OTel span to each CAP OData HTTP call in `app/cap_client.py` (or wherever CAP calls are made):
  - Span name: `cap.odata.<operation>` (e.g. `cap.odata.fetch_records`)
  - Attributes: `cap.entity`, `cap.operation`, `http.status_code`, `duration_ms`
- [ ] Implement milestone log statements for all 7 milestones (M1–M7) from the PRD:
  - Emit structured log on achievement AND on miss using pattern `[M{n}].[achieved|missed]: ...`
  - M1 in `app/tools/rr_lookup.py` after `rr_lookup` returns
  - M2 in `app/tools/draft_price_email.py` after draft is generated
  - M3 in `app/tools/create_request.py` after CAP write succeeds
  - M4 in `app/tools/update_record.py` after CAP write succeeds
  - M5 in `app/tools/confirm_o2i_invoiced.py` after status update
  - M6 in orchestrator meeting-notes handler after JSON extraction completes
  - M7 in `app/tools/resolve_pending_action.py` after resolution
- [ ] Extract business logic from any `async generator` / `yield` paths into plain async helpers before wrapping with spans (never wrap `yield` inside `with tracer.start_as_current_span(...)`)

---

## REQ-06 — Aeval test cases for all 7 skills (Priority 6)

- [ ] Invoke skill `sap-aeval-generate-tool-schema` from `cdmpa/assets/cdm-as-tracker-agent/` to extract tool definitions into `tools.json`
  - Scan `app/tools/` for tool functions after decomposition (REQ-04 must be done first)
- [ ] Invoke skill `sap-aeval-generate-testcase` for each of the 7 skills:
  - `rr-lookup` — test: CDM asks "is HANA DB upgrade chargeable?"; expected: `rr_lookup` called, 1–3 codes returned
  - `pricing-lookup` — test: CDM asks "what does INFRA_1.8.10 cost?"; expected: `price_lookup` called, EUR amount returned
  - `request-management` — test: CDM says "create a request for HANA upgrade for Acme, SID: PRD"; expected: `create_request` called with confirmation panel first
  - `jira-o2i` — test: CDM says "generate O2I ticket for request AS-001"; expected: `generate_o2i_ticket` called, ticket-ref panel rendered
  - `panel-rendering` — test: CDM says "show me record AS-001"; expected: `render_record_panel` called with `record-card` type
  - `inbox-management` — test: CDM says "what's in my inbox?"; expected: `surface_pending_action` or fetch of pending actions returned
  - `meeting-notes` — test: CDM pastes raw meeting notes text; expected: structured JSON with topics + 10 analysis sections returned
- [ ] Verify YAML test case files are generated under `evals/` with placeholders filled in
- [ ] Review and update any placeholder values that need real test data before running `aeval run`

---

## REQ-07 — solution.yaml and mta.yaml validation (Priority 7)

> Do this last — depends on REQ-01 through REQ-03 being complete.

- [ ] Invoke skill `setup-solution` from `cdmpa/` to validate/update `solution.yaml` and both `asset.yaml` files
  - Solution name: `cdmpa`
  - Assets: `cdm-as-tracker-agent` (type: `agent`) and `cdm-as-tracker-cap` (type: `cap-app`)
- [ ] Review `cdmpa/mta.yaml` — verify module names, routes, and resource bindings match the updated `asset.yaml`
- [ ] Confirm health probe paths in `mta.yaml` match `asset.yaml` probe config (`/.well-known/agent.json` for agent, `/health` for CAP)
- [ ] Invoke skill `deploy-solution` for a dry-run from `cdmpa/` — document any errors and fix before proceeding
- [ ] Verify `mcp-mock.json` is generated (invoke `mcp-mock-config` skill if not present) — required for local integration tests

---

## Testing

- [ ] `conftest.py` only sets `IBD_TESTING=true` — causes agent to run with mock MCP tool results during tests
- [ ] Write unit tests in `cdmpa/assets/cdm-as-tracker-agent/tests/` — at minimum one per tool module in `app/tools/`
  - Run each test immediately after writing it
- [ ] Write one integration test executing end-to-end agent flow with real LLM by calling the orchestrator's `run()` function
  - Mock CAP OData and JIRA calls; use real Anthropic API
- [ ] Run `pytest` from `cdmpa/assets/cdm-as-tracker-agent/` (no args) — if coverage < 70%, add tests
- [ ] Verify `assets/cdm-as-tracker-agent/app/agent.py` has exactly 3 decorated functions (`@agent_model`, `@agent_config`, `@prompt_section`) — run `grep -c "^@agent_model\|^@agent_config\|^@prompt_section" cdmpa/assets/cdm-as-tracker-agent/app/agent.py` and confirm it returns 3
- [ ] Run `pytest` again to generate final `test_report.json`
- [ ] Verify `test_report.json` exists

---

## Business Step Instrumentation (Milestones)

Reference log patterns from the PRD milestones section:

| ID | Milestone | Log pattern |
|----|-----------|-------------|
| M1 | R&R Lookup Completed | `M1.achieved: rr_lookup returned {n} service codes for query "{description}"` |
| M2 | Pricing Confirmed | `M2.achieved: price confirmed for service_code={code}, draft email rendered for request={request_id}` |
| M3 | AS Request Created | `M3.achieved: AS request created record_id={id} for customer={customer} cdm={cdm_email}` |
| M4 | Request Lifecycle Updated | `M4.achieved: record updated record_id={id} fields={fields}` |
| M5 | O2I Ticket Confirmed | `M5.achieved: O2I confirmed record_id={id} ticket_ref={ticket_ref}` |
| M6 | Meeting Notes Processed | `M6.achieved: meeting notes processed for client={client} topics={n} decisions={n} risks={n}` |
| M7 | Inbox Action Resolved | `M7.achieved: pending action resolved automation_id={id} outcome={outcome}` |

Each milestone must also emit a `.missed` log when the condition is not reached (see PRD for full patterns).
