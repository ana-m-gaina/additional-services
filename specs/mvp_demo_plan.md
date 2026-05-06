# MVP Demo Plan — CDM Additional Services Tracker

**Goal:** Demo the tool to stakeholders to get help and access to what we need.  
**Date:** TBD  
**Author:** Ana Gaina

---

## 1. What we have (built and working)

- [ ] Phase A — CAP project scaffold, LLM client interface, health service
- [ ] Phase B — Data model: 30+ fields, 8-state status machine, synthetic seed data
- [ ] Phase C — Core CAP service: CRUD, status transitions, validation, audit log
- [ ] Phase D — Admin content layer: R&R JSON, pricing JSON, email templates, SharePoint URL
- [ ] Phase E — 5 AI touchpoints: email parse, R&R match, price pre-fill, price email draft, O2I body
- [ ] Phase F — Fiori Elements UI: list report, object page, intake form, reminder banners, O2I button

---

## 2. What we need to add for the demo

- [ ] Phase G — Acceptance criteria sweep (validate app against spec before showing anyone)
- [ ] Thin orchestrator prototype — a single conversational agent wrapping the existing CAP actions to show the agent architecture direction
- [ ] Architecture slide / one-pager showing the full multi-agent vision and what we're asking for

---

## 3. What we are asking for (access and entitlements)

- [ ] SAP AI Core / Gen AI Hub entitlement — required to route LLM calls through SAP's compliant infrastructure instead of direct Anthropic key
- [ ] BTP subaccount — required to deploy beyond localhost
- [ ] SAP Event Mesh access — required for automation agents (event-driven layer)
- [ ] SAP4Me API access — required for live case/ticket status and customer acceptance events
- [ ] JIRA ECSBO service account — required for auto-creating O2I invoice tickets
- [ ] APEX API access — required for live pricing sync (unknown if API exists — need confirmation)
- [ ] MS Graph / SharePoint app registration in SAP Azure AD — required for SharePoint upload detection

---

## 4. Open questions to resolve before/during demo

- [ ] Q1 — SPC execution ticket field shape (Oana) — blocks schema finalization
- [ ] Q5 — R&R JSON + pricing JSON maintenance owner — blocks admin UX design
- [ ] Q8 — SharePoint base URL (Julia Ehmke) — blocks checklist field default
- [ ] Q-EM — SAP Event Mesh details for customer.acceptance event (publisher, payload, topic namespace)
- [ ] APEX — does the API even exist?

---

## 5. The story we are telling

The tracker already works as a standalone tool — it consolidates 6+ SAP systems into one place,
automates the repetitive parts of the CDM workflow, and uses AI to handle email parsing, R&R
matching, pricing lookup, and O2I generation.

The next step is connecting it into SAP's infrastructure so it becomes a node in the agentic mesh:
event-driven, integrated with real systems, accessible to other agents (Joule, consolidated agents)
via MCP, and deployable to CDMs via Work Zone.

To do that we need the access listed in section 3.

---

*Go through items one by one — mark done as each is resolved or built.*
