# Specification

> **Guidelines**: Read [guidelines.md](./guidelines.md) before executing ANY tasks below.

Check off items as completed.

## Solution Setup

- [ ] Confirm existing asset directories exist: `ls cdmpa/assets/cdm-as-tracker-agent/ cdmpa/assets/cdm-as-tracker-cap/`
- [ ] Invoke `setup-solution` skill from `cdmpa/` to validate `solution.yaml` and both `asset.yaml` files
- [ ] Validate all `asset.yaml` and `solution.yaml` files are well-formed

## Asset Implementation

- [ ] Execute `specification/cdm-as-tracker-agent/specification.md` (all items — this is the primary work)
- [ ] Execute `specification/cdm-as-tracker-cap/specification.md` (guard checks only — no code changes)

## Execution Order Within the Agent Spec

The agent spec tasks must be executed in this order (dependencies):

1. **REQ-04** (decompose orchestrator) — must be done before REQ-05 and REQ-06
2. **REQ-01** (asset.yaml) + **REQ-02** (translation.json) + **REQ-03** (ORD endpoint) — can run in parallel after REQ-04
3. **REQ-05** (OTel) — after REQ-04; instruments the decomposed tool modules
4. **REQ-06** (aeval tests) — after REQ-04; extracts schemas from decomposed tool modules
5. **REQ-07** (solution/mta validation) — last; depends on REQ-01, REQ-02, REQ-03 being complete

## Parallel Execution Map (for multi-agent runs)

Once REQ-04 is done, these tasks can run in parallel in separate worktrees:

| Agent | Tasks | Spec section |
|-------|-------|--------------|
| Agent A | REQ-01: asset.yaml regeneration | cdm-as-tracker-agent/specification.md — REQ-01 |
| Agent B | REQ-02 + REQ-03: MCP artifacts + ORD endpoint | cdm-as-tracker-agent/specification.md — REQ-02, REQ-03 |
| Agent C | REQ-05: OTel instrumentation | cdm-as-tracker-agent/specification.md — REQ-05 |
| Agent D | REQ-06: Aeval test cases | cdm-as-tracker-agent/specification.md — REQ-06 |
| Agent E | REQ-07: solution.yaml + mta.yaml validation | cdm-as-tracker-agent/specification.md — REQ-07 (after A+B done) |

## Cross-asset Compatibility Check

After all agent spec tasks are complete:

- [ ] Verify `translation.json` tool names match the tool handler function names in `app/tools/`
- [ ] Verify `/.well-known/agent.json` skill list matches the 7 skills in `asset.yaml`
- [ ] Verify OTel span attributes use consistent field names across all tool modules (`tool.name`, `session_id`, `cdm_email`)
- [ ] Verify milestone log IDs (M1–M7) match the milestone IDs in `product-requirements-document.md`
- [ ] Run `pytest` from `cdmpa/assets/cdm-as-tracker-agent/` one final time — all tests green
