# Gap Analysis: Oana Process Doc vs. phase_1.md v3.1 vs. Current Code

**Date:** 2026-04-24  
**Sources:**
- `specs/oana_process_v1.md` — as-is CDM process (Oana's document)
- `specs/phase_1.md` v3.1 — build spec (authoritative for implementation)
- `additional-services-tracker/` — current running code

---

## Summary

| Area | Status |
|---|---|
| Process steps alignment | ✅ Aligned (10-step structure matches) |
| Data model | ⚠️ 3 gaps |
| Status states | ✅ Aligned |
| AI touchpoints | ✅ Aligned (5/5 implemented) |
| Open questions mapping | ⚠️ 2 new questions surfaced |
| Phase structure | ✅ Aligned |
| JIRA ticket template | ⚠️ Minor gap in ticket title format |
| Process type values | ✅ Fixed (was ❌ — Premium/Cloud removed, ATLAS added) |
| Platform MCP servers | ✅ Found — SPC, JIRA, ServiceNow, Outlook, SharePoint, GenAI Hub all have internal PoC MCP servers |

---

## 1. Process Steps — ALIGNED ✅

Oana's 10-step process maps exactly to `phase_1.md` Section 3 and the implemented status flow in `srv/as-service.js:7-16`.

| Oana step | phase_1.md step | Code status |
|---|---|---|
| 1. Request received via email | Step 1 | `Request received` — implemented |
| 2. Identify service type (R&R lookup) | Step 2 | AI-2 (`matchRR`) — implemented |
| 3. Find price | Step 3 | AI-3 (price pre-fill from JSON) — implemented |
| 4. Communicate price | Step 4 | AI-4 (`draftPriceEmail`) — implemented |
| 5. Receive written approval + PO | Step 5 | `Approval received` status — implemented |
| 6. Service delivery begins | Steps 6-7 | `In delivery` status — implemented |
| 7. Customer closes ticket | Step 8 | `Customer closed` status — implemented |
| 8. CDM closes AMS ticket | Step 9 | `AMS closed` + checkbox — implemented |
| 9. Open JIRA invoice ticket | Step 10 | AI-5 (`generateO2ITicket`) — implemented |
| 10. Process complete | — | `Complete` status — implemented |

No process steps are missing from the code.

---

## 2. Data Model Gaps — ⚠️ 3 GAPS

### GAP 1: Sales order / provider contract number — source still unclear

**Oana's doc (Q4):** "What is the exact source and format of the sales order / provider contract number used in the JIRA ticket? Source unclear."

**phase_1.md:** Lists `salesOrderNo` with source "One360 / CRT" — but this was an assumption, not confirmed.

**Code:** `salesOrderNo: String(100)` — field exists, no source guidance in UI.

**Action needed:** Confirm with Oana/process owner: is the source One360? CRT? Both? Should the field label say "Source: One360 / CRT" as a hint to the CDM? This is a UX copy issue, not a schema issue.

---

### GAP 2: Ticket name format — `&` separator vs. comma

**Oana's doc (Section 5.1):**
```
Additional Services: [SERVICE_CODE_1] & [SERVICE_CODE_2] Conversion [CUSTOMER_SYSTEM]
```
Uses `&` between service codes.

**phase_1.md (Section 7.5):**
```
Additional Services: [R&R ID(s)] [activity type] [customer system]
```
Unspecified separator.

**Code (`as-service.js:280`):** The O2I system prompt says `Additional Services: [IDs] [Activity] [System]` — the prompt does not enforce `&` as separator.

**Action needed:** Update the O2I system prompt to use `&` between service codes, matching Oana's exact format. This matters because the JIRA ticket format must match ECS GES expectations.

---

### GAP 3: `Price valid until` — based on creation date vs. price communicated date

**Oana's doc:** Does not explicitly define the 90-day rule.

**phase_1.md (Section 4 / Section 8.1):** "Price is valid for 90 days." Template text says so but doesn't pin the start date.

**phase_1.md (Section 6, Pricing row):** `Price valid until = price communicated date + 90 days`.

**Code (`as-service.js:119,141`):** `priceValidUntil = priceCommunicatedDate + 90 days` — matches spec.

**Oana's email template (Section 8.1):** "The price is valid for 90 days." — no absolute date included in template. 

**Status:** No code gap, but worth confirming with Oana: should the 90-day clock start from *price communicated* or from the *request creation date*? Current implementation uses price communicated date (more conservative, correct for most cases).

---

## 3. Status States — ALIGNED ✅

**Oana's doc (Section 8, Phase 2 bullet):**
> open / price communicated / approved / in delivery / customer closed / AMS closed / JIRA opened

**Code (`as-service.js:7-16`):**
```
Request received → Price communicated → Approval received → In delivery →
Customer closed → AMS closed → O2I ticket opened → Complete
```

These match. The code has two extra states (`O2I ticket opened` and `Complete`) that Oana's high-level list doesn't enumerate but which are clearly implied and correct.

---

## 4. Process Type Values — ❌ BUG IN CODE

**Oana's doc:** Does not define process type options (Classic is the only described process; ATLAS/Calypso is Phase 2).

**phase_1.md (Section 2):** Process type = `Classic` | `ATLAS/Calypso` (ATLAS disabled in Phase 1).

**Code (`as-service.js:94-98`):**
```js
this.on('READ', 'ProcessTypes', () => [
  { code: 'Classic' },
  { code: 'Premium' },
  { code: 'Cloud' }
])
```

**`Premium` and `Cloud` are wrong.** These are not process types in the spec or Oana's doc. The correct values are `Classic` and `ATLAS/Calypso` (with ATLAS disabled). This is a bug — CDMs would see meaningless options in the dropdown.

**Action needed:** Fix `ProcessTypes` to return `Classic` and `ATLAS` (ATLAS annotated as disabled/coming soon).

---

## 5. JIRA Queue Reference — MINOR GAP

**Oana's doc (Section 5.2):** "Addressed to: ECS Global Engagement Support (ECS GES)" — JIRA queue not named.

**phase_1.md (Section 7.5):** "JIRA queue: ECSBO — fixed"

**Code (`as-service.js:280`):** System prompt says `ECS GES` but does not mention the ECSBO queue name.

**Action needed:** Add ECSBO queue name to the O2I system prompt output so CDM knows which JIRA queue to submit to. Low priority but eliminates a lookup step for the CDM.

---

## 6. Open Questions — 2 NEW FROM OANA'S DOC

The following are surfaced by Oana's doc and are **not currently tracked** in `phase_1.md`:

### New Q-A: Approval channel — email vs. SR comment

**Oana (Steps 4-5):** "Price approval must always be in writing (email or SR comment). Both channels are valid."

`phase_1.md` does not capture whether the tool should distinguish *how* approval was received (email vs. SR). Currently `approvalReceivedDate` is a single date field with no channel distinction.

**Decision needed:** Is a "Approval channel" dropdown (`Email` / `SR comment`) needed, or is the existing date field sufficient for Phase 1? Recommend: single date field is fine for Phase 1, channel tracking deferred to Phase 2 when SR integration lands.

### New Q-B: PO number — always required or conditional?

**Oana (Step 5):** "PO number must also be provided by customer at this stage **if required**."

**phase_1.md (Section 4):** PO no. marked as `NO` (not required).

**Code:** No validation on PO no.

These are aligned (both treat it as optional). But the business rule "confirm with customer upfront" is not surfaced in the UI.

**Decision needed:** Should the intake form show a hint "Confirm with customer whether PO is required" near the PO field? Recommend: yes, add as field description text.

---

## 7. What Oana's Doc Adds That phase_1.md Doesn't Have

These are **additive details** from Oana's doc that should inform UX copy or future specs, but don't require schema changes:

| Detail | Source | Recommendation |
|---|---|---|
| "Price approval must be in writing (email or SR comment)" | Oana Step 5 | Add as hint text near `Approval received date` field |
| "PO must be provided before conversion agreement" | Oana Step 5 | Add as hint text near `PO no.` field |
| "CDM waits for customer closure — no automated notification" | Oana Step 7 | Informs reminder text in Section 5 of phase_1.md — already implemented |
| "BCP ticket format: NNNNNNN/YYYY" | Oana 5.2 | `phase_1.md` already documents this. Code has a comment. |
| Excel pricing is siloed / no shared master | Oana PP2 | Already addressed by admin-editable `PricingEntry` entity |
| R&R document is local / no lookup tool | Oana PP3 | Already addressed by admin-editable `RRReference` entity + AI-2 |

---

## 8. What phase_1.md Has That Oana's Doc Doesn't Mention

These are **design decisions made in phase_1.md** that extend beyond the as-is process. None are contradicted by Oana's doc; they are deliberate additions.

| Feature | In phase_1.md | In Oana's doc |
|---|---|---|
| ATLAS/Calypso process type (Phase 2 placeholder) | Yes | No |
| SPC execution reference field (`spcExecutionRef`) | Yes (Q1 pending) | No |
| ITSM (ServiceNow) ticket no. field | Yes | Mentioned as platform but not as a tracked field |
| `creationDate` field | Yes | Implicit in "request received" |
| Activity log (free text, separate from status) | Yes | No |
| Reminder banners (dashboard, date-triggered) | Yes | Mentioned as Phase 2 in Oana's view |
| CAS SD informed checkbox | Yes | Not mentioned |
| SharePoint upload checkbox + configurable URL | Yes | Not mentioned |
| Admin-editable R&R, pricing, email templates | Yes | Implied by PP2/PP3 |

> **Note on reminders:** Oana places in-app reminders in Phase 2. `phase_1.md` brings them into Phase 1 as dashboard-only banners (no email). This is a deliberate acceleration — the banners are already implemented in the code and do not require any platform integration.

---

## 9. Action Items

| # | Action | Priority | Owner |
|---|---|---|---|
| A1 | Fix `ProcessTypes` value help — remove `Premium`/`Cloud`, add `ATLAS` as disabled | **CRITICAL BUG** | Dev |
| A2 | Update O2I system prompt — enforce `&` separator between service codes in ticket title | HIGH | Dev |
| A3 | Add ECSBO queue name to O2I system prompt output | MEDIUM | Dev |
| A4 | Confirm `salesOrderNo` source label with Oana — One360 / CRT hint text in UI | HIGH | Oana |
| A5 | Confirm 90-day clock start date: price communicated vs. creation date | MEDIUM | Oana |
| A6 | Add hint text "Approval must be in writing (email or SR comment)" near approval date | LOW | Dev |
| A7 | Add hint text "Confirm with customer whether PO no. is required" near PO field | LOW | Dev |
| A8 | Resolve original Q1: `spcExecutionRef` field shape (Oana 1:1 2026-04-25) | BLOCKING | Oana |

---

## 10. SAP Internal MCP Servers — Platform Integration Landscape

**Source:** SAP-internal `frontrunners/sap-mcp-server-list` (github.tools.sap), reviewed 2026-04-24.

This changes the Phase 3 picture significantly. Internal MCP servers already exist (as PoCs) for most platforms in the AS process. Nothing needs to be built from scratch.

### Relevant servers found

| Platform | MCP Server | Repo | Notes |
|---|---|---|---|
| **SPC** | SPC MCP Server | `github.wdf.sap.corp/SPCSM/mcp-spc-poc` | Directly covers `spcTicketMain` + `spcExecutionRef` fields. Resolves Q1 partially — API does exist. |
| **JIRA** | MCP Jira (claude org) | `github.tools.sap/claude/mcp-jira` | Browser SSO, no API token needed. Full create/update/transition. Highest-value integration — O2I ticket creation. |
| **ServiceNow** | MCP ServiceNow (claude org) | `github.tools.sap/claude/mcp-servicenow` | Browser SSO. Query incidents/cases by record number. Covers ITSM ticket tracking. |
| **Outlook** | Outlook MCP (multiple) | `github.tools.sap/claude/mcp-outlook` etc. | Email ingestion — currently Phase 2 in spec. Multiple implementations available. |
| **SharePoint** | Microsoft 365 MCP | `github.tools.sap/I758224/m365-mcp` | Covers SharePoint + Outlook + Teams. SharePoint upload checklist is Phase 1 item. |
| **GenAI Hub** | GenAI Hub MCP Server | `github.tools.sap/I306141/genai-hub-mcp` | SAP-compliant AI channel. Your `GenAIHubClient` stub is already waiting for exactly this. Swap is a config change. |
| **SAP MCP Suite** | All-in-one | `github.wdf.sap.corp/D-A-Catalog-BR/sap-mcp-suite` | Bundles Jira + Wiki + Teams + GitHub + Auth in one install. One `git clone` + `/install-mcps`. |

### What this changes

**Phase 3 is no longer speculative.** The hard part (figuring out if APIs exist) is answered — they do, as internal PoC MCP servers. The remaining work is:
1. Get access to each repo (SAP internal network / VPN)
2. Confirm which are stable enough to depend on vs. pure PoC
3. Wire them into the CAP service as additional data sources

**GenAI Hub swap is the most urgent.** The spec already requires it for any real customer data. The `GenAIHubClient` stub at `srv/lib/llm/GenAIHubClient.js` needs to be implemented using the credentials format from `github.tools.sap/I306141/genai-hub-mcp`:
```
AICORE_CLIENT_ID, AICORE_CLIENT_SECRET, AICORE_AUTH_URL, AICORE_API_URL
```

**SPC MCP existence resolves Q1 (partially).** An SPC API does exist internally. Contact: `SPCSM` team. This means `spcTicketMain` and `spcExecutionRef` could be auto-populated in Phase 3.

### Updated action items from this finding

| # | Action | Priority | Owner |
|---|---|---|---|
| A9 | Implement `GenAIHubClient` using AI Core service binding — required before any real customer data touches the tool | **CRITICAL — compliance** | Dev + Ankit (AI Core access) |
| A10 | Contact SPCSM team re SPC MCP PoC — assess stability and access path | HIGH — unblocks Q1 | Ana / Oana |
| A11 | Evaluate `claude/mcp-jira` for Phase 3 O2I ticket creation — test against ECSBO queue | HIGH | Dev |
| A12 | Evaluate `I758224/m365-mcp` for SharePoint URL resolution (Q8) and Phase 2 email reminders | MEDIUM | Dev |
| A13 | Add Phase 3 integration notes to `phase_3_roadmap.md` referencing these MCP servers | MEDIUM | Ana |

---

*Internal document — CDM Operations. Not for external distribution.*  
*Generated: 2026-04-24 | Updated: 2026-04-24 (added Section 10 — MCP server landscape)*
