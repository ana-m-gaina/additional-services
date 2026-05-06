# Additional Services Tracking Tool — Specs

Three-phase spec suite for an internal SAP tool that helps CDMs (Customer Delivery Managers) and dCEMs track chargeable Additional Services requests across 6+ SAP systems.

## Documents

| Doc | Status | What it covers |
|---|---|---|
| [phase_1.md](phase_1.md) | **Dev-ready** | Classic process MVP: intake form, shared tracker, 5 AI touchpoints, in-app reminder banners, SharePoint checklist. Zero external integrations. |
| [phase_2.md](phase_2.md) | Draft for review | Email reminders, ATLAS/Calypso process path, approval + delivery detection agents, mocked external clients, XSUAA auth, admin UI. |
| [phase_3_roadmap.md](phase_3_roadmap.md) | **Roadmap only** (not spec) | Real external integrations via BTP Destinations, Event Mesh reactive layer, MCP producer wrapper, Fiori Launchpad tile. |

---

## Methodology — how these specs are used

Each spec is executed by Claude Code with human review at PR time. The workflow:

1. Spec section → Claude Code generates code + tests
2. Human reviews PR against acceptance criteria
3. Merge when acceptance passes

**What this method accelerates:** the first 20–30% of the project — scaffolding, entity definitions, form layouts, boilerplate service handlers, boilerplate tests.

**What it doesn't change:** deployment, auth wiring, integration debugging, security review, compliance review, BTP-specific quirks. Those still take their usual time.

Claim: "spec-to-prototype in days instead of weeks." NOT "spec-to-production in days."

---

## Contribution model

You do not need to touch code to help.

- **CDMs / domain experts:** review spec sections that describe workflow and semantics. Flag where reality diverges.
- **Integration-experienced colleagues:** review Phase 3 roadmap for architectural realism. Answer open questions where you have context.
- **BTP entitlement owners:** see the entitlement asks in Phase 1 §9 and Phase 2 §6 open questions.
- **Engineers who want to code:** pick an open question from Phase 1 / 2, answer it, graduate the affected section from draft to dev-ready.

All PRs go through the same review. Spec PRs count the same as code PRs.

---

## Phase boundaries — quick reference

| Capability | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Intake form + tracker | ✅ | enhanced | — |
| 5 AI touchpoints | ✅ (live via Gen AI Hub) | — | — |
| In-app reminder banners | ✅ | still present | — |
| Email reminders | — | ✅ | — |
| ATLAS/Calypso process | UI stub (disabled) | ✅ | — |
| Approval detection | — | ✅ | — |
| Delivery detection | — | ✅ | — |
| Auth (XSUAA) | — | ✅ | refined |
| External system reads | manual entry | mocked clients | **real (via Destinations)** |
| External system writes | manual entry | mocked clients | **real (via Destinations)** |
| Event Mesh reactive layer | — | — | ✅ |
| MCP producer wrapper | — | — | ✅ |
| Fiori Launchpad tile | — | — | ✅ |

---

## FAQ

### Isn't this competing with SAP Service Cloud V2 / Enterprise Service Management?

**Structurally similar, different market, not competing.**

Service Cloud V2 / ESM is sold to **SAP customers** (other companies) who want to run their own service organizations — a ticket comes in from an end-user, an agent processes it, SLAs track resolution.

This tool is for **SAP's own internal delivery ops** — CDMs tracking chargeable services that SAP delivers TO its customers. The direction of the relationship is reversed: CDMs are not service agents, and the "customer" in this tool is an SAP customer being billed, not a help-seeker.

Concretely:

| | Service Cloud V2 / ESM | This tool |
|---|---|---|
| Sold to | External SAP customers | Internal SAP use |
| User role | Service agent | SAP Delivery Manager (CDM/dCEM) |
| Incoming direction | End-user → agent | Customer request → SAP delivery |
| Data model | Case → Customer → Resolution | AS request → Chargeable service → Invoice |
| Tenant for internal CDM use | Does not exist | This tool ships one |
| Invoicing workflow | Not in scope | Core feature (O2I generation) |

We evaluated ESM / Service Cloud V2 as a reference pattern (Case Designer, Autoflow, Entity Extraction, Party Determinations all exist there). The feature overlap validates the design — SAP itself ships these patterns — but no internal ESM tenant is available for this use case, and the data model doesn't fit.

**Short answer for the room:** "Same patterns, wrong product for internal ops tooling. We reuse the patterns, not the product."

### Why not use SAP Build Apps (no-code) instead of CAP?

Hits the ceiling on 30+ fields, 5 custom AI touchpoints, dual status system, activity log with edit history, and swappable LLM client. Build Apps is great for simpler CRUD; this isn't simpler CRUD.

Evaluated and rejected.

### Why build at all when another CDM's group is also looking at this?

Two independent CDM-led efforts hit the same wall. Neither had engineering capacity to ship. This is the engineering answer that converges the efforts.

Roadmap: de-silo the two efforts, use their combined domain input to sharpen Phase 2/3 specs, pilot across both teams.

### Why local/direct-Anthropic for the demo instead of full BTP?

Entitlements for AI Core and HANA Cloud are in request — timing is uncertain. The demo uses SAP AI Core via an existing team access (Ankit's) for compliant routing even in local dev. BTP deploy follows as soon as entitlements land. Local demo doesn't mean "staying local."

### What if AI Core entitlement never comes?

Worst case: pilot deploys with AI Core routed through the existing team access, or stays on direct Anthropic (compliance boundary: synthetic data only — no real customer case numbers, names, or pricing). Tool is valuable even without AI — the tracker is 70% of the value. See Phase 1 §1 for explicit scope.

### Why three specs instead of one big one?

Three specs mirror three deployment stages. Each phase ships value on its own. Phase 1 solves one CDM team's pain. Phase 2 expands that. Phase 3 makes the tool infrastructure for SAP's agentic future. Splitting them keeps each phase focused on its own acceptance criteria instead of one sprawling doc that tries to cover everything.

---

## Change log

- **2026-04-24** — Initial spec suite (Phase 1 v3.1, Phase 2 v1.0, Phase 3 roadmap v0.1) based on Oana's v2.0 + v3.0 dev briefs and real CDM tracker (June 2025).

---

*Internal document — CDM Operations. Not for external distribution.*
