# Additional Services Tracking Tool — Phase 1 Spec

**Version:** 3.1
**Status:** Dev-ready
**Authors:** Oana Chirila (v2.0, v3.0), Ana Gaina (v3.1 consolidation + methodology)
**Date:** 2026-04-24
**Scope:** Classic (Non-ATLAS / Non-Calypso) customer process — SOP steps 10–130
**Based on:** SOP_0622 v1.11, WI_0622_01 (Apr 2026), real CDM tracker (June 2025)
**Supersedes:** v2.0 and v3.0

---

## 0. How to Use This Document

This spec is executed by Claude Code with human review at PR time. Each feature section maps to generated code + tests + a reviewed PR. Acceptance criteria per feature (Section 10) are the contract: if the generated code meets acceptance, the feature is done.

**Open questions (Section 9) must be resolved before the affected feature ships.** Schema-impacting questions block schema finalization.

Phase 1 covers the Classic process path only. The data model and intake form must architect for ATLAS/Calypso from day one (single "Process type: Classic / ATLAS" field at intake), but all ATLAS-specific logic and fields are deferred to Phase 2.

**If any statement here conflicts with v2.0 or v3.0, this document wins.**

---

## 1. Scope

### In scope for Phase 1

- Intake form for logging AS requests from pasted email
- Shared tracker dashboard: list report + object page, sortable/filterable by status and owner
- Five AI touchpoints (email parse, R&R identifier lookup, price pre-fill, price email draft, O2I ticket body generation)
- Structured status dropdown + free-text activity log (dual system)
- In-app reminder engine — date-computed, dashboard banners only
- Checklist fields (price email sent, approval received, SharePoint upload done, CAS SD informed, AMS closed, O2I created)
- Configurable SharePoint base URL (admin setting, not hardcoded)
- Admin-editable email templates and pricing JSON (no code deploy required)
- Synthetic seed data for development and demo

### Out of scope for Phase 1

- Email reminders (dashboard banners only — Phase 2 adds email)
- ATLAS/Calypso process path (Phase 2)
- Approval language detection, delivery confirmation detection (Phase 2)
- External system integrations — SAP4Me, JIRA, SharePoint, APEX, ServiceNow, AMS, One360 (Phase 3)
- Event Mesh reactive layer (Phase 3)
- MCP producer wrapper exposing AS tool to other agents (Phase 3)
- Live user authentication beyond local/dev (Phase 2 adds XSUAA)
- Outlook / Graph API integration for direct email ingestion (Phase 2)

---

## 2. Process Path Decision

The intake form begins with one mandatory field: **Process Type**. Options:

- **Classic** (Phase 1) — unlocks Classic form fields
- **ATLAS/Calypso** (Phase 2) — visible but disabled, shows "Coming soon" message

This establishes the UI pattern now so Phase 2 only needs to enable the branch.

---

## 3. Classic Process — 10 Steps (Authoritative)

Status transitions in the tracker MUST follow this exact order.

| # | Action | Owner | Platform(s) | Notes |
|---|---|---|---|---|
| 1 | AS request received via email | CDM | Outlook | Always the entry point |
| 2 | Identify service type from R&R | CDM | R&R doc (embedded) | AI assists, CDM confirms |
| 3 | Look up price | CDM | APEX portal / Excel fallback | AI pre-fills from embedded pricing JSON |
| 4 | Communicate price to customer | CDM | Email or SR comment | AI drafts email, CDM sends manually |
| 5 | Receive written approval + PO | CDM | Email or SR comment | Written only. PO collected here. |
| 6 | Upload approval to SharePoint | CDM | SharePoint customer folder | Required checklist, URL configurable |
| 7 | Service delivery begins | Delivery team | SAP4Me / SPC / BTP / AMS / ServiceNow | CDM tracks ticket IDs, no platform APIs Phase 1 |
| 8 | Customer closes ticket + confirms | Customer | SAP4Me or SR platform | CDM monitors, tool reminds if overdue |
| 9 | CDM closes AMS ticket | CDM | AMS | Tool prompts CDM with exact action |
| 10 | CDM opens O2I invoice ticket | CDM | JIRA — ECSBO queue | AI generates full body, CDM submits manually |

---

## 4. Data Model

Each AS request is one record. Fields grouped by form section.

### Customer & Service

| Field | Type | Required | Source / notes |
|---|---|---|---|
| Customer name | Text | YES | AI extracts from pasted email |
| Process type | Dropdown: Classic / ATLAS | YES | Classic only active Phase 1 |
| Additional service ID(s) | Text | YES | R&R identifier(s). AI suggests, CDM confirms. Multiple comma-separated. |
| R&R description | Text (auto) | YES | Auto-filled from R&R JSON on identifier select |

### System Identifiers

| Field | Type | Required | Source / notes |
|---|---|---|---|
| SID | Text | YES | System ID (e.g. GT3, GT1, GM1) |
| Case no. | Text | CONDITIONAL | SAP4Me Case. Required if no CSR. |
| CSR no. | Text | CONDITIONAL | Chargeable SR number. Required if no Case. |

**Validation rule:** `(Case no. IS NOT NULL) OR (CSR no. IS NOT NULL)` — at least one must be present before status can advance past `Request received`. Both are allowed.

### Ticket Numbers

| Field | Type | Required | Source / notes |
|---|---|---|---|
| SPC ticket no. (main) | Text | NO | Main SPC reference |
| SPC execution reference | Text | NO | Second SPC ("execution tt"). See Q1. |
| BCP ticket no. | Text | YES | Required for O2I body. Format: `NNNNNNN/YYYY` |
| AMS ticket no. | Text | YES | Closed by CDM at step 9 |
| ITSM ticket no. | Text | NO | ServiceNow reference |

### Pricing

| Field | Type | Required | Source / notes |
|---|---|---|---|
| Price (numeric) | Number | YES | From APEX JSON export. AI pre-fills. |
| Currency | Dropdown: EUR/USD/JPY/GBP | YES | From APEX data |
| Price in words | Text (auto) | YES | Generated by tool logic (not AI). Used verbatim in O2I body. |
| PO no. | Text | NO | Customer-provided. "Remarks" in some trackers — same field. |

### Key Dates

| Field | Type | Required | Source / notes |
|---|---|---|---|
| Creation date | Date | YES | Email / request received |
| Price communicated date | Date | NO | CDM sent price |
| Price valid until | Date (auto, editable) | NO | Creation date + 90 days |
| Approval received date | Date | NO | Written approval confirmed |
| Customer closure date | Date | NO | Customer confirmed delivery |
| AMS closure date | Date | NO | CDM closed AMS |
| O2I ticket created date | Date | NO | CDM submitted O2I/JIRA |

### Invoice / O2I

| Field | Type | Required | Source / notes |
|---|---|---|---|
| O2I invoice ticket no. | Text | NO | From JIRA ECSBO. Formats vary: `FI130040379` or `ECSBO-NNNNN`. **Do not validate format.** |
| Sales order / contract no. | Text | NO | Source: One360 / CRT |
| Activity performed | Text | NO | e.g. `Conversion-GTS`, `Migration-ASEtoHANA` |

### Status & Activity Log

| Field | Type | Required | Source / notes |
|---|---|---|---|
| Status (structured) | Dropdown enum | YES | Dashboard filter + reminder trigger. See Section 5. |
| Activity log (free text) | Textarea | NO | CDM's running narrative with dates. Separate from structured status. |
| CDM owner | Text / user select | YES | Record owner |

### Checklist (boolean checkboxes)

| Field | Type | Notes |
|---|---|---|
| Price email sent | Checkbox | CDM checks when price communicated |
| Written approval received | Checkbox | CDM checks when approval confirmed |
| SharePoint upload done | Checkbox | Approval doc uploaded. Must be checked before status advances past step 6. |
| CAS SD informed | Checkbox | CAS Service Desk notified |
| AMS ticket closed | Checkbox | CDM checks after step 9 |
| O2I ticket created | Checkbox | CDM checks after step 10 |

### Notes

| Field | Type | Notes |
|---|---|---|
| Notes | Textarea | Free-form escalations, special instructions |

### Meta (hidden)

| Field | Type | Notes |
|---|---|---|
| Created date | Date (auto) | On record creation |
| Last updated | Date (auto) | On any save |

---

## 5. Status States

Structured dropdown. Used for dashboard filtering and reminder triggers. Separate from the free-text activity log. Status advances in order, but CDM may manually override.

| Status | Meaning | Reminder (if stuck) | Reminder text |
|---|---|---|---|
| Request received | Email logged, record created | — | — |
| Price communicated | CDM sent price | 7 days no approval date | `Follow up with [customer] — price sent 7 days ago, no approval yet` |
| Price communicated | — | 14 days no approval date | `URGENT: [customer] approval overdue. Consider re-sending or escalating.` |
| Price communicated | — | 85 days no approval date | `WARNING: Price validity expires in 5 days for [customer]. Act now.` |
| Approval received | Written approval confirmed | 3 days SharePoint not checked | `Upload pricing approval to SharePoint for [customer]` |
| In delivery | Service execution underway | 30 days no customer closure | `Check delivery status for [customer] — ticket open 30+ days` |
| Customer closed | Customer confirmed delivery | 3 days no AMS closure | `Close AMS for [customer] — customer confirmed 3 days ago` |
| AMS closed | CDM closed AMS | 3 days no O2I ticket | `Open O2I invoice ticket for [customer] — use Generate O2I button` |
| O2I ticket opened | JIRA ECSBO ticket submitted | — | — |
| Complete | Process fully closed | — | — |

Reminders display as in-app dashboard banners per record. **No email reminders in Phase 1.**

---

## 6. Intake Form — Section Layout

Sections appear in this order. Matches real CDM workflow (validated against June 2025 tracker).

| Section | Fields | Notes |
|---|---|---|
| **AI email paste zone** | Email textarea + Extract button | Top of form. CDM pastes customer email, AI extracts all findable fields. Yellow warning if extraction incomplete. |
| **Customer & service** | Customer name, Process type, Additional service ID(s), R&R description | Process type determines active sections. ATLAS disabled. |
| **System identifiers** | SID, Case no., CSR no. | Validate: (Case no. OR CSR no.) before advancing past `Request received`. |
| **Ticket numbers** | SPC main, SPC execution ref, BCP, AMS, ITSM | All optional except AMS (for O2I generation) and BCP (for O2I body). |
| **Pricing** | Price, Currency, Price in words (auto), PO no. | Price in words generated by tool logic, not AI. |
| **Key dates** | Creation, Price communicated, Price valid until (auto), Approval received, Customer closure, AMS closure, O2I created | Price valid until = price communicated date + 90 days, auto-calculated, editable. |
| **Invoice / O2I** | O2I ticket no., Sales order no., Activity performed, **Generate O2I** button | Generate button enabled only when AMS no. filled AND AMS closed checkbox ticked. |
| **Status & activity log** | Status dropdown, Activity log textarea, CDM owner | Two separate fields. |
| **Checklist** | 6 checkboxes | Visual progress indicator. Not blocking. |
| **Notes** | Textarea | Additional context. |

---

## 7. AI Layer

**Architecture:** All five touchpoints use a single LLM client interface with swappable backends. API keys never exposed to the browser — all calls go through the server (CAP action handlers).

**Swappable LLM client:**

```
LLMClient.chat(systemPrompt: string, userMessage: string) -> structured response
```

Two implementations:
- **AnthropicDirectClient** — dev/demo, reads `ANTHROPIC_API_KEY` from env
- **GenAIHubClient** — BTP pilot/prod, reads from SAP AI Core service binding

Selected via a single CAP config flag. MVP demo may route through Ankit's existing AI Core MCP access (compliant channel, does not require a dedicated AI Core entitlement).

All AI outputs are suggestions. CDM reviews and confirms before saving or sending.

### 7.1 Email Parse (Step 1)

**Trigger:** CDM clicks `Paste email` and pastes customer email into textarea.
**Input:** Raw email text.
**Output:** JSON with extracted fields.

**System prompt:**

```
You are an assistant helping a SAP Customer Delivery Manager process an
Additional Services request. Extract the following fields from the email
text provided. Return ONLY a JSON object with these keys:
customer_name, service_identifiers (array), ticket_numbers (array),
po_number, urgency_notes.
If a field is not found, return null for that field.
Do not invent data. Only extract what is explicitly present.
```

**Fallback:** If extraction fails or confidence is low, pre-fill empty + show yellow banner: `AI could not extract all fields — please fill manually.`

### 7.2 R&R Identifier Lookup (Step 2)

**Trigger:** After email parse, or when CDM types in service description field.
**Input:** Service description text + embedded R&R reference JSON (admin-editable).
**Output:** Top 1–3 R&R suggestions with HIGH/MEDIUM/LOW confidence. CDM selects.

**System prompt:**

```
You are an assistant helping a SAP CDM identify the correct R&R
Additional Services identifier. Given the customer's described need
and the R&R reference data below, return the top 3 most likely
R&R identifiers as a JSON array: [{id, description, confidence}].
Confidence is HIGH / MEDIUM / LOW.
R&R DATA: {r_and_r_json}
```

**Fallback:** Autocomplete dropdown from R&R JSON always available regardless of AI.

### 7.3 Price Pre-fill (Step 3)

**NOT AI.** Database lookup from admin-editable pricing JSON.

**Trigger:** R&R identifier confirmed.
**Output:** Price (numeric) + currency. Price in words auto-generated by tool logic.

**Example:** `596.00 EUR` → `five hundred and ninety-six euros`.

**Source of truth:** APEX portal. Until API access is confirmed (Q4), Excel export converted to JSON, admin-maintained without code deploy. Display to CDM: `Pricing data last updated: [date]`.

### 7.4 Price Communication Email Draft (Step 4)

**Trigger:** CDM clicks `Draft price email` after price confirmed.
**Input:** Record data + stored template (Section 8.1).
**Output:** Pre-filled email in editable textarea. CDM copies to Outlook and sends manually. **Tool does NOT send email.**

**System prompt:**

```
You are helping a SAP CDM draft a price communication email.
Fill in the template below using the provided data.
Do not change the structure, legal notes, or tone of the template.
Only replace the placeholder values.
Return only the completed email text, no preamble.
DATA: {record_json}
TEMPLATE: {email_template}
```

### 7.5 O2I Ticket Body Generation (Step 10 — Highest Value)

**Trigger:** CDM clicks `Generate O2I ticket` after marking AMS closed.
**Input:** All record fields.
**Output:** Ticket title + body in two separate copyable text boxes. CDM pastes into JIRA ECSBO and submits. Tool does NOT create JIRA ticket via API in Phase 1. After submission, CDM enters the O2I ticket number back into the tool.

**Required output fields:**

- **Title:** `Additional Services: [R&R ID(s)] [activity type] [customer system]`
- **Total amount:** numeric + written out (e.g. `596.00 EUR (five hundred and ninety-six euros)`)
- **Sales order / provider contract no.** (from One360/CRT field)
- **BCP ticket no.**
- **PO no.** (if provided, else `Not provided`)
- **Activity performed** (e.g. Conversion-FMX)
- **Addressed to:** `ECS Global Engagement Support (ECS GES)` — fixed
- **JIRA queue:** ECSBO — fixed

**System prompt:**

```
You are helping a SAP CDM generate a JIRA invoice ticket for the
ECS Global Engagement Support (ECS GES) team.
Using the record data below, generate:
1. The ticket title (format: Additional Services: [IDs] [Activity] [System])
2. The full ticket body text following this structure:
   Hello ECS Global Engagement Support (ECS GES),
   Please initiate the invoicing process at O2I Teams as per details below.
   - Total amount with currency: [amount numeric] [currency]
     ([amount in words])
   - Sales order no. / Provider contract no.: [value]
   - BCP ticket no.: [value]
   - PO no. (if provided): [value or 'Not provided']
   - Activity performed: [value]
Return as JSON: {ticket_title, ticket_body}
DATA: {record_json}
```

---

## 8. Email Templates

Stored as editable content in the tool. Admin updates without code deploy. AI uses these as base templates for 7.4.

### 8.1 Standard Price Communication Template

Source: SOP_0622 standard requirement template.

```
Subject: Additional Services — Price Communication — [Customer Name]

Hello [customer name],

As discussed, below are the price details for the additional services
requested regarding [brief service description].

Please find the final and binding price:

* [R&R ID] - [R&R full description]
* [price] [currency] per [unit if applicable]

You are kindly requested to review the price and provide
approval/feedback at your earliest convenience.

Note:
- The price is valid for 90 days.
- Any Additional Services completed by SAP will be invoiced monthly in arrears.
- Service delivery can only commence once approval is in place via E-mail
  that costs are approved and commercially covered by the Customer organization.
- Once the Service Execution is completed the invoice will be triggered.
- Lead time to be aligned in advance.

Please be aware the request will be performed only after the costs
are approved.

Many thanks in advance for your support!

[CDM Name]
Customer Delivery Manager | SAP
```

### 8.2 Non-Standard Template

To be provided by CDM team. Placeholder stored in tool; admin updates when available.

---

## 9. Open Questions (Must Resolve)

Resolution blocks the affected feature from shipping.

| # | Question | Blocks | Owner | Priority |
|---|---|---|---|---|
| Q1 | SPC `execution tt` — is this a sub-ticket opened at execution start, or a reference? Single field or two optional fields? | Schema finalization | Oana | BLOCKING — resolve at Monday 1:1 |
| Q2 | Hosting target: BTP CAP app (Cloud Foundry or Kyma runtime)? Subaccount assignment? | Deployment | BTP entitlement owner | HIGH — Phase 1 pilot |
| Q3 | Auth: SAP SSO via XSUAA, or simpler? | CDM owner field semantics | Entitlement + IT | HIGH — Phase 2 |
| Q4 | APEX API access — programmatic or browser-only? | Phase 3 pricing sync strategy | APEX team contact | MEDIUM — affects Phase 3 roadmap |
| Q5 | R&R JSON + pricing JSON maintenance owner (semi-annual updates) | Admin workflow design | Unassigned | HIGH — Phase 1 admin UX |
| Q6 | Non-standard email template text | AI email drafting completeness | CDM team | MEDIUM |
| Q7 | Manager read-only dashboard access? | Role design | Entitlement owner | MEDIUM — Phase 2 |
| Q8 | SharePoint customer folder URL (SOP link broken Apr 2026) | Phase 1 checklist field default | Julia Ehmke (noted in SOP) | HIGH — Phase 1 config |

---

## 10. Acceptance Criteria (per feature)

Feature is "done" when acceptance passes. For AI-generated code, these are the tests Claude Code must satisfy before PR.

### Intake form + record creation

- [ ] Form renders all sections from Section 6 in order
- [ ] Required fields enforced at save time (cannot save if required blank)
- [ ] Validation: `(Case no. OR CSR no.)` must be present before status advances past `Request received`
- [ ] "Process type: Classic" unlocks fields; "ATLAS" shows disabled message
- [ ] Price in words auto-generated from numeric + currency on change
- [ ] Price valid until auto-computed from Price communicated + 90 days; editable
- [ ] Record save produces a record with `Created date` = now, `Last updated` = now

### Tracker dashboard

- [ ] List report renders all records with columns: Customer, Service IDs, Status, CDM owner, Last updated
- [ ] Sortable by any column
- [ ] Filterable by Status and CDM owner
- [ ] Object page renders full record with all form sections read-only
- [ ] Reminder banner displays on record when date-based trigger condition met (see Section 5)

### Status transitions

- [ ] Status can only advance sequentially (no skipping states)
- [ ] CDM can manually override if needed (admin-unlocked)
- [ ] Activity log textarea accepts free-form text with CDM-entered dates; NOT overwritten by status changes

### AI — Email parse

- [ ] Pasting a well-formed customer email fills `customer_name`, `service_identifiers[]`, `ticket_numbers[]`, `po_number`
- [ ] Unparseable or low-confidence input shows yellow banner, does NOT auto-fill with hallucinated data
- [ ] JSON response from LLM is validated against expected keys before writing to form
- [ ] API key never appears in browser network traffic

### AI — R&R identifier lookup

- [ ] Returns top 1–3 R&R IDs with confidence levels
- [ ] Autocomplete dropdown from R&R JSON available when AI unavailable or low-confidence
- [ ] CDM selection writes to `Additional service ID(s)` and auto-fills `R&R description`

### Price pre-fill (JSON lookup)

- [ ] On R&R selection, price + currency fill from JSON lookup
- [ ] No LLM call made for this step
- [ ] `Pricing data last updated: [date]` visible near the price field

### AI — Price email draft

- [ ] Clicking `Draft price email` generates completed template with record data filled
- [ ] Template structure, legal notes, and tone unchanged by AI
- [ ] Output editable in textarea before CDM copies
- [ ] Tool does NOT call any email-send API

### AI — O2I ticket body generation

- [ ] `Generate O2I` button disabled until `AMS ticket no.` present AND `AMS ticket closed` checkbox ticked
- [ ] Output includes title + body in two separate copyable boxes
- [ ] Body follows the template structure specified in 7.5
- [ ] After CDM submits in JIRA, entering the O2I ticket number advances status to `O2I ticket opened`
- [ ] Status advances to `Complete` when O2I ticket number is entered

### SharePoint checklist field

- [ ] Base SharePoint URL stored in admin settings, not hardcoded
- [ ] Empty/missing URL tolerated — checkbox still functions
- [ ] Checkbox uncheckable after checked (CDM can reverse mistakes)

### Admin editable content

- [ ] Email templates editable by admin role without code deploy
- [ ] R&R JSON editable by admin without code deploy
- [ ] Pricing JSON editable by admin without code deploy
- [ ] Non-admin users cannot modify these

### Seed data

- [ ] 3+ synthetic records loaded on dev startup (`cds watch`)
- [ ] Zero real customer names (no `Fressnapf`, etc.) — synthetic only
- [ ] Records cover diverse status states (at least 2 different statuses)

---

## 11. Data Integrity Constraints

- `O2I ticket no.` format NOT validated — real data has `FI130040379` and `ECSBO-NNNNN`, both valid
- `BCP ticket no.` format expected as `NNNNNNN/YYYY` but tolerated free-text
- All date fields store as ISO 8601 strings
- Text fields allow UTF-8 (customer names may contain non-ASCII)
- Activity log is append-oriented — edits tolerated but should retain timestamps

---

## 12. Non-Functional Requirements

### Phase 1 constraints

- **Environment:** Runs locally on `cds watch` with SQLite for dev. HANA Cloud for pilot deploy when entitlement lands.
- **Performance:** Sub-1s response for all non-AI actions. AI actions under 5s p95.
- **Data volume:** Designed for 500+ records per CDM, 10+ CDMs. Real scale in pilot.
- **Security:** LLM calls server-side only. No customer PII in logs. Synthetic data only in dev.
- **Compliance:** Real customer data (names, case IDs, pricing) MUST route through SAP-approved AI channel (Gen AI Hub). Direct Anthropic API acceptable only for synthetic-data demo.
- **Accessibility:** Fiori Elements default behavior (WCAG 2.1 AA via standard controls).

### Observability (minimum)

- All AI calls logged with: timestamp, prompt hash, response length, latency, error if any
- All record state transitions logged with: CDM user, old status, new status, timestamp
- NO logging of email content, customer names, or record body text

---

## 13. Architecture Pointer

Detailed architecture lives in the repo root README. Short version for context:

- **CAP service** — business logic, bound actions for the 5 AI touchpoints, status transition logic
- **CDS entities** — the data model above
- **Fiori Elements** — auto-generated UI from CDS annotations
- **HANA Cloud** — pilot/prod DB (SQLite for dev)
- **LLM client interface** — swappable (Anthropic direct for dev/demo, Gen AI Hub for pilot)
- **No external integrations in Phase 1** — all ticket IDs and SharePoint URLs are manual entry / configurable strings

Phase 2 and Phase 3 extend this architecture. See `phase_2.md` and `phase_3_roadmap.md`.

---

## 14. Change Log

- **v3.1 (2026-04-24)** — Consolidated v2.0 + v3.0 into single authoritative doc. Added methodology preamble, acceptance criteria (Section 10), explicit out-of-scope (Section 1). Pulled v2.0 Section 6 (AI prompts) and Section 8 (email templates) into this doc for self-containment. Priority-sorted open questions.
- **v3.0 (earlier)** — Added SID, CSR, ITSM fields; CAS SD informed checkbox; dual status (dropdown + activity log); O2I terminology; format tolerance on O2I ticket no.
- **v2.0 (earlier)** — APEX as authoritative pricing; One360/CRT as sales order source; Classic+ATLAS path split; AI layer spec; SharePoint tracking; email template inclusion.

---

*Internal document — CDM Operations. Not for external distribution.*
