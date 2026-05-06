# CDM Additional Services Tracker — Build TODO

**Project:** CAP + Fiori Elements + Anthropic SDK  
**Spec:** `specs/phase_1.md` (v3.1, authoritative)  
**Updated:** 2026-04-24  
**Working directory:** `additional-services-tracker/` — run `cds watch` from inside this folder

---

## Blocking gates (resolve before affected feature ships)

- [ ] **Q1 — SPC execution tt field** — sub-ticket or reference? Single or two optional fields? → Oana 1:1 2026-04-25. Blocks schema finalization.
- [ ] **Q5 — R&R JSON + pricing JSON maintenance owner** — who does semi-annual updates? Blocks admin UX design.
- [ ] **Q8 — SharePoint base URL** — SOP link broken, ask Julia Ehmke. Blocks checklist field default.

---

## Phase A — Project scaffold ✅

- [x] `cds init additional-services-tracker` — CAP project skeleton
- [x] `.env` with `ANTHROPIC_API_KEY` placeholder + `cds watch` scripts in `package.json`
- [x] Folder structure: `srv/`, `db/`, `app/`, `srv/lib/llm/`
- [x] `LLMClient` interface + `AnthropicDirectClient` implementation (reads `ANTHROPIC_API_KEY`)
- [x] `GenAIHubClient` stub (returns not-implemented, ready for Phase 2 swap)
- [x] Config flag `CDS_LLM_PROVIDER` in `.env` to select LLM backend (`anthropic | gen_ai_hub`)
- [x] `HealthService` — `cds watch` confirmed green, both services served

---

## Phase B — Data model ✅

- [x] `db/schema.cds` — all 30+ fields, exact types from spec Section 4
- [x] Status field — 8 states from spec Section 5
- [x] Admin-editable entities: `RRReference`, `PricingEntry`, `EmailTemplate`, `AdminConfig`
- [x] `db/data/` seed files — 3 synthetic records (Acme Corp, Globex Ltd, Initech GmbH), statuses: Request received / Price communicated / In delivery, zero real customer names
- [!] **SPC execution ref field exists as `spcExecutionRef` — awaiting Q1 resolution with Oana (2026-04-25) to confirm if correct**

---

## Phase C — Core CAP service ✅

- [x] `AdditionalServicesService` in `srv/as-service.js` — full CRUD (before CREATE/UPDATE hooks)
- [x] Status transition logic — sequential enforcement + manual override (admin-unlocked)
- [x] `(Case no. OR CSR no.)` validation — blocks status advance past `Request received` if both null
- [x] `Price in words` auto-generation — pure logic, no LLM (e.g. `596.00 EUR` → `five hundred and ninety-six euros`)
- [x] `Price valid until` = `Price communicated date + 90 days`, auto-calculated, editable
- [x] State transition audit log — CDM user, old status → new status, timestamp. No PII.

---

## Phase D — Admin-editable content layer ✅

- [x] R&R reference JSON — admin-editable entity, non-admin read-only
- [x] Pricing JSON — admin-editable entity with `last_updated` date field
- [x] Email template 8.1 — stored as editable entity, non-admin read-only
- [x] SharePoint base URL — stored in `AdminConfig`, not hardcoded. Tolerate empty/missing.
- [x] Role enforcement: `admin` role required for write on all four above (enforced in handler)

---

## Phase E — AI touchpoints ✅

- [x] **AI-1 Email parse** — CAP bound action, server-side only. Validate JSON keys before writing form. Yellow banner on low confidence or missing fields.
- [x] **AI-2 R&R identifier match** — top 1–3 suggestions with HIGH/MEDIUM/LOW confidence. Fallback: autocomplete dropdown from R&R JSON always available.
- [x] **AI-3 Price pre-fill** — pure JSON lookup, no LLM. Show `Pricing data last updated: [date]` near price field.
- [x] **AI-4 Price email draft** — fill template 8.1 with record data, output in editable textarea. No send API call.
- [x] **AI-5 O2I ticket body** — title + body in two separate copyable text boxes. Button disabled until `AMS ticket no.` present AND `AMS ticket closed` ticked.
- [x] AI observability: log timestamp, prompt hash, response length, latency, errors. No email content, customer names, or record body text in logs.

---

## Phase F — Fiori Elements UI + Custom Extensions ✅

- [x] List report: columns Customer, Service IDs, Status, CDM owner, Last updated — sortable + filterable by Status and CDM owner
- [x] Object page: full record, all sections, edit action
- [x] Intake form: sections in exact order from spec Section 6 (via `@UI.Facets` + `@UI.FieldGroup` annotations)
- [x] ATLAS/Calypso path: `atlasBanner` MessageStrip shown by controller extension when `processType = ATLAS`
- [x] Reminder banners: `reminderContainer` VBox populated dynamically by controller from spec Section 5 trigger rules
- [x] Generate O2I button: disabled until `amsTicketNo` filled AND `checkAmsClosed` true; outputs title + body in two copyable text boxes via dialog

---

## Phase G — Acceptance criteria sweep

- [ ] Walk every checklist item in spec Section 10
- [ ] API key never in browser network traffic (confirm via DevTools)
- [ ] Zero real customer data in seed files and logs
- [ ] Sub-1s for all non-AI actions; AI actions < 5s p95
- [ ] Observability: all AI call logs present, no PII in log entries

---

## Status key

`[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked
