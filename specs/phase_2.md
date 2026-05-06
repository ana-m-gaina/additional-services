# Additional Services Tracking Tool — Phase 2 Spec

**Version:** 1.0
**Status:** Draft for review
**Author:** Ana Gaina
**Date:** 2026-04-24
**Depends on:** Phase 1 shipped to pilot with at least 1 active CDM using it
**Supersedes:** N/A

---

## 0. Purpose

Phase 2 extends the Phase 1 tracker in four directions:

1. **Email reminders** — replace in-app dashboard banners with outbound email triggers
2. **ATLAS / Calypso process path** — unlock the second process branch deferred from Phase 1
3. **Detection agents** — AI detects approval and delivery confirmation language in pasted email/comment text, advances status automatically (with CDM confirmation)
4. **Auth and multi-user** — XSUAA-backed roles and permissions

Phase 2 also introduces the **mocked external service client pattern** — stub clients for JIRA, SharePoint, APEX, SAP4Me that return fake responses. Phase 3 swaps these for real Destination-backed clients.

Phase 2 does NOT introduce real external system integrations. All external system state remains manual entry in Phase 2. The only automation added in Phase 2 is **outbound** (email reminders) and **AI-detected status advancement from pasted text**.

---

## 1. Scope

### In scope for Phase 2

- Email reminder dispatch via Outlook / Graph API
- ATLAS / Calypso process path — steps 140–220 per SOP
- Approval language detection (AI scans pasted approval email)
- Delivery confirmation detection (AI scans pasted customer closure comment)
- Mocked external service clients with uniform interface
- XSUAA authentication + role collections (CDM, CDM Admin, Manager read-only)
- Per-CDM dashboard views; manager aggregate view
- Admin UI for editing R&R JSON, pricing JSON, email templates, SharePoint base URL

### Out of scope for Phase 2

- Real external system integrations (JIRA, SharePoint, APEX, SAP4Me APIs) — Phase 3
- Event Mesh reactive layer — Phase 3
- MCP producer wrapper for agent consumption — Phase 3
- Joule skill exposure — Phase 3
- Automatic ticket creation or closure in external systems — Phase 3
- Fiori Launchpad tile and Work Zone integration — Phase 3

---

## 2. Email Reminder Engine

Replaces Phase 1 dashboard banners. Same trigger conditions, different delivery.

### Delivery mechanism

- Email sent via Microsoft Graph API (Exchange integration)
- Sender: shared CDM ops mailbox (or CDM-specific if per-user setup chosen — see Q2.1)
- Recipient: `CDM owner` field of the record

### Triggers (unchanged from Phase 1 dashboard banners)

| Status | Elapsed | Subject | Body |
|---|---|---|---|
| Price communicated | 7 days no approval | Follow up: [customer] price sent 7 days ago | Price sent [date]. No approval received yet. Tracker: [link]. |
| Price communicated | 14 days no approval | URGENT: [customer] approval overdue | Consider re-sending or escalating. Tracker: [link]. |
| Price communicated | 85 days no approval | WARNING: [customer] price validity expires in 5 days | Re-issue price or get approval now. Tracker: [link]. |
| Approval received | 3 days SharePoint not checked | Upload approval to SharePoint for [customer] | SharePoint folder: [URL]. Tracker: [link]. |
| In delivery | 30 days no customer closure | Check delivery status for [customer] | Ticket open 30+ days. Tracker: [link]. |
| Customer closed | 3 days no AMS closure | Close AMS for [customer] | Customer confirmed 3 days ago. Tracker: [link]. |
| AMS closed | 3 days no O2I ticket | Open O2I invoice ticket for [customer] | Use Generate O2I button. Tracker: [link]. |

### Digest option

- Default: one email per fired trigger
- Admin setting: switch to daily digest per CDM (single email summarizing all overdue records)

### Dashboard banners — retain

Dashboard banners continue to display in addition to emails. Email is an escalation channel, not a replacement.

### Acceptance criteria

- [ ] Reminder job runs once daily on a schedule
- [ ] Trigger conditions match Phase 1 logic exactly
- [ ] Emails include tracker deep-link to the specific record
- [ ] Email delivery logged (timestamp, recipient, trigger type, record ID)
- [ ] Daily digest toggle per admin setting
- [ ] Email template editable by admin without code deploy

### Open questions

- **Q2.1:** Shared CDM ops mailbox, or per-CDM sending via principal propagation?
- **Q2.2:** Graph API app registration — who owns it? Per-subaccount Azure AD app vs team-shared?

---

## 3. ATLAS / Calypso Process Path

SOP steps 140–220. GES-led process, distinct from Classic.

### Process summary (to be validated by CDM team)

TBD — requires SOP review and CDM walkthrough. Draft sequence:

| Step | Action | Owner | Platform |
|---|---|---|---|
| 140 | ATLAS request received | CDM | Email |
| 150 | Forwarded to GES | CDM → GES | Internal handoff |
| 160 | GES defines scope + cost | GES | ATLAS system |
| 170 | Cost approval cycle | CDM → customer → GES | Email + approval flow |
| 180 | GES schedules delivery | GES | Calypso |
| 190 | Execution | GES | Calypso |
| 200 | Customer confirmation | Customer | SR platform |
| 210 | GES closes engagement | GES | ATLAS |
| 220 | Invoice trigger | GES or CDM | O2I |

**Resolve in Phase 2 kickoff:** full step sequence with CDM + GES representative.

### UI changes

- Unlock the "ATLAS/Calypso" option on the Process Type dropdown
- When ATLAS selected:
  - Hide Classic-specific sections (System identifiers for SAP4Me Case/CSR)
  - Show ATLAS-specific sections (GES owner, Calypso reference, ATLAS request ID)
  - Reminder engine uses ATLAS-specific triggers (different elapsed windows)

### Data model additions for ATLAS

| Field | Type | Required | Notes |
|---|---|---|---|
| ATLAS request ID | Text | YES (ATLAS) | Identifier from ATLAS system |
| GES owner | Text | YES (ATLAS) | Assigned GES engagement manager |
| Calypso reference | Text | NO | Calypso scheduling reference |
| GES handoff date | Date | YES (ATLAS) | When forwarded to GES |
| GES scope definition date | Date | NO | When GES returned scope |

### Status states for ATLAS

| Status | Meaning | Reminder |
|---|---|---|
| Request received | As Classic | — |
| Forwarded to GES | CDM handed off | 5 days no GES response |
| GES scoping | GES defining cost | 10 days stuck |
| Cost approved | Customer approval received | 3 days SharePoint not checked |
| In execution | GES delivering | 30 days stuck |
| Customer closed | Confirmation received | 3 days no handoff to O2I |
| O2I ticket opened | Invoice initiated | — |
| Complete | Closed | — |

### Acceptance criteria

- [ ] Process Type "ATLAS" selectable and unlocks correct sections
- [ ] Switching Process Type on an existing record requires confirmation ("this will archive Classic data")
- [ ] Status dropdown shows ATLAS states when ATLAS selected, Classic states otherwise
- [ ] Reminders fire per ATLAS-specific triggers

### Open questions

- **Q2.3:** Full ATLAS step sequence — who validates? Probably requires GES rep in the review.
- **Q2.4:** Does ATLAS require its own R&R catalog, or shared with Classic?
- **Q2.5:** Can a record transition Classic → ATLAS mid-flight, or is Process Type immutable after creation?

---

## 4. Detection Agents

Two new AI touchpoints that scan pasted text and auto-advance status (with CDM confirmation).

### 4.1 Approval Language Detection

**Trigger:** CDM pastes the customer's approval email into a textarea on the record.
**Input:** Pasted email text + record context (customer name, R&R ID).
**Output:** Detection result `{is_approval: bool, confidence: HIGH|MEDIUM|LOW, approval_date: ISO date | null, extracted_po: string | null}`.

**System prompt:**

```
You are an assistant helping a SAP CDM confirm customer approval of
an Additional Services price. Given the customer email text and the
record context, determine whether the email constitutes written approval.
Return a JSON object: {
  is_approval: boolean,
  confidence: "HIGH" | "MEDIUM" | "LOW",
  approval_date: ISO 8601 date or null (date the customer wrote the approval),
  extracted_po: string or null (PO number mentioned in the approval, if any),
  reasoning: short string (max 200 chars, what signals were in the email)
}
Approval requires explicit affirmative language ("we approve", "please proceed",
"confirmed"). Conditional statements ("we'll approve if...") are NOT approvals.
Do not infer. Only match explicit language.
```

**Behavior:**
- `HIGH` + `is_approval: true` → advance status to `Approval received`, fill `approval_date`, pre-fill `PO no.` if extracted. Show banner: `AI detected approval — confirm?` with Accept / Dismiss buttons.
- `MEDIUM` → show suggestion, CDM explicitly accepts
- `LOW` or `is_approval: false` → show nothing, do not auto-advance

### 4.2 Delivery Confirmation Detection

**Trigger:** CDM pastes the customer closure comment into a textarea on the record.
**Input:** Pasted comment text + record context.
**Output:** `{is_confirmation: bool, confidence: HIGH|MEDIUM|LOW, confirmation_date: ISO date | null}`.

**System prompt:**

```
You are an assistant helping a SAP CDM confirm customer delivery
confirmation for an Additional Services request. Given the customer
comment text, determine whether it confirms service delivery completion.
Return a JSON object: {
  is_confirmation: boolean,
  confidence: "HIGH" | "MEDIUM" | "LOW",
  confirmation_date: ISO 8601 date or null,
  reasoning: short string (max 200 chars)
}
Confirmation requires explicit language that the customer received / accepted
the delivery (e.g. "delivery received", "confirmed complete", "closing ticket").
```

**Behavior:** same HIGH/MEDIUM/LOW pattern as 4.1.

### Acceptance criteria

- [ ] Both detection agents return valid JSON even on ambiguous input (null for dates they can't extract)
- [ ] Auto-advance happens only on HIGH confidence + affirmative detection
- [ ] CDM can always undo the auto-advance via status dropdown
- [ ] Detection results logged with record ID, confidence, reasoning
- [ ] No hallucinated dates (if text doesn't specify a date, return null)

### Open questions

- **Q2.6:** Should detection agents run on ALL inbound emails, or only when CDM triggers them? (Recommendation: CDM-triggered only in Phase 2 to avoid false positives.)
- **Q2.7:** Calibration threshold — what counts as HIGH? Requires testing on 10+ real approval samples.

---

## 5. Mocked External Service Clients

New architectural pattern — each external system gets a client module with a stable interface. Phase 2 ships stubs; Phase 3 swaps implementations.

### Interface pattern

For each external system (JIRA, SharePoint, APEX, SAP4Me, ServiceNow, AMS, One360), define:

```typescript
interface ExternalClient<T> {
  get(id: string): Promise<T>;
  create?(payload: Partial<T>): Promise<T>;
  update?(id: string, payload: Partial<T>): Promise<T>;
  list?(filter: object): Promise<T[]>;
}
```

### Specific clients

| Client | Methods (Phase 2 stub) | Phase 3 real |
|---|---|---|
| `JiraClient` | `createTicket(body) → {ticket_id, url}` | Destination → JIRA REST API |
| `SharePointClient` | `getFolderUrl(customer) → string` | Destination → MS Graph API |
| `ApexClient` | `getPriceFor(rr_id) → {price, currency}` | Destination → APEX API (if available — see Q1 in Phase 3) |
| `Sap4MeClient` | `getCaseStatus(id) → {status, last_updated}` | Destination → SAP4Me OData |
| `ServiceNowClient` | `getTicketStatus(id) → {status}` | Destination → ServiceNow REST |
| `AmsClient` | `closeTicket(id) → {success}` | Destination → AMS API |
| `One360Client` | `getSalesOrder(customer) → {contract_no}` | Destination → One360 / CRT |

### Phase 2 stub behavior

- `get` methods return mock objects with realistic field shape
- `create` methods return fake ticket IDs (`MOCK-${uuid}`)
- 200ms simulated latency to mimic network call timing
- Admin setting: `EXTERNAL_CLIENTS_MODE = 'stub' | 'real'` — forces stub mode for testing even in pilot

### Acceptance criteria

- [ ] All 7 client interfaces defined with matching shape
- [ ] Stub implementations pass unit tests returning realistic mock data
- [ ] CAP actions call clients via DI — no hardcoded stub imports in business logic
- [ ] `EXTERNAL_CLIENTS_MODE` admin setting toggles all clients uniformly

### Why this matters for Phase 3

When real integrations land, swapping each client is ~1 day of work per system. The CAP action code doesn't change. The stub tests become the contract tests for the real client.

---

## 6. Authentication and Authorization

### Roles

| Role | Capabilities |
|---|---|
| `CDM` | Create records. Edit own records. View all records. Run AI actions. |
| `CDM Admin` | All CDM capabilities + edit R&R JSON, pricing JSON, email templates, SharePoint base URL, reminder schedule, EXTERNAL_CLIENTS_MODE |
| `Manager (read-only)` | View all records + dashboards. No edit. |

### Implementation

- XSUAA-backed auth via CAP's built-in `@requires` decorator
- Role Collections defined in xs-security.json
- Tenant-aware (subaccount isolation)

### Acceptance criteria

- [ ] Anonymous users cannot access any endpoint
- [ ] `CDM` users cannot see admin editors (pricing JSON, R&R JSON, template editors)
- [ ] `Manager` role cannot POST/PATCH/DELETE on any record
- [ ] All CAP actions check the caller's role before executing
- [ ] Audit log records user ID on every state-changing operation

### Open questions

- **Q2.8:** SAP SSO via IAS, or direct XSUAA with manual user provisioning?
- **Q2.9:** Principal propagation for Graph API email sending — required, or shared service account OK?

---

## 7. Admin UI

Replaces "admin edits JSON file on disk" with a proper UI.

### Features

- R&R JSON editor — tabular CRUD of `{id, description}` entries
- Pricing JSON editor — tabular CRUD of `{r_and_r_id, price, currency}` entries
- Email template editor — rich-text editor for Section 8 templates from Phase 1 spec
- SharePoint base URL setting
- Reminder schedule toggle (daily / digest mode)
- `EXTERNAL_CLIENTS_MODE` toggle (stub / real)
- Audit log view — who changed what, when

### Acceptance criteria

- [ ] Only `CDM Admin` role accesses
- [ ] Every save creates an audit log entry
- [ ] Rollback: previous version preserved for 30 days, admin can revert
- [ ] Validation: pricing entries must have valid currency enum, R&R IDs must be unique

---

## 8. Success Criteria for Phase 2

Phase 2 is done when:

- Pilot CDM team receives email reminders and reports usefulness above "noise" threshold
- At least 1 ATLAS record completes its lifecycle in the tool
- Approval detection agent achieves >80% HIGH-confidence precision on real samples
- Delivery detection agent achieves >80% HIGH-confidence precision on real samples
- Admin can update R&R, pricing, and templates without engineering help
- Auth + roles in place and audit log captures all changes
- All mocked external clients swappable via single config flag
- Demo to expanded team (including GES rep) generates Phase 3 entitlement approval

---

## 9. Timing Estimate

Rough Phase 2 effort (post-Phase-1 pilot):

- Email reminder engine: 1 week
- ATLAS branch: 2 weeks (includes GES walkthrough + SOP validation)
- Detection agents: 1 week (prompts + calibration)
- Mocked clients: 1 week (7 client stubs + tests)
- Auth + roles: 1 week
- Admin UI: 1 week

Total: ~7 weeks, assuming 1 dev full-time + CDM availability for validation.

---

## 10. Open Questions Summary

| # | Question | Blocks |
|---|---|---|
| Q2.1 | Shared mailbox vs per-CDM for email reminders? | Email reminder implementation |
| Q2.2 | Graph API app registration ownership? | Email reminder deploy |
| Q2.3 | Full ATLAS step sequence — validated by GES? | ATLAS branch design |
| Q2.4 | Separate R&R catalog for ATLAS? | Data model |
| Q2.5 | Process Type immutable after creation? | UI + validation |
| Q2.6 | Detection agents triggered by CDM only, or proactively? | UX design |
| Q2.7 | HIGH confidence threshold for detection agents? | Calibration work |
| Q2.8 | SAP SSO via IAS, or direct XSUAA? | Auth implementation |
| Q2.9 | Principal propagation for email sending required? | Graph API integration |

---

*Internal document — CDM Operations. Not for external distribution.*
