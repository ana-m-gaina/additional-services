# Additional Services — Current State Process Spec

**Version:** 1.0  
**Status:** Draft — source document from Oana Chirila (June 2025 / Apr 2026)  
**Audience:** Developer / CDM Team  
**Authored by:** Oana Chirila  
**Transcribed into spec format by:** Ana Gaina (2026-04-24)  
**Relation to existing specs:** This is the **as-is process** document. It is complementary to `phase_1.md` (v3.1), which is the dev-ready build spec. Where the two conflict, see Section 7 (Conflict Resolution).

---

## 1. Purpose

This document describes the current, manual process CDMs follow when handling an Additional Services (AS) request. It is the authoritative source for understanding *what the tool must replace or support* — the ground truth of the human workflow before any automation.

It covers every manual step, the platforms involved, known pain points, and flags where automation can intervene.

---

## 2. Context & Background

Additional Services are chargeable services delivered outside the standard contract scope. Categories include:

- System conversions (e.g. `MOVE_1.7.01`, `MOVE_1.7.02`, `BASIC_1.8.20`)
- Migration support (e.g. ASE to HANA)
- Special onboarding support
- Other delivery-specific services defined in the R&R document

A single AS request can touch **up to 7 different platforms** before it is fully closed and invoiced. There is currently no single system of record. CDMs track manually — personal notes, downloaded Excel files, memory.

> **CRITICAL DATA RISK:** The Additional Services pricing Excel is downloaded to individual CDM machines. No shared master version. CDMs may quote outdated prices.

---

## 3. Platforms Involved

| Platform | Role | Process Phase |
|---|---|---|
| Email (Outlook) | Primary entry point for ALL AS requests from customers | Intake |
| SAP4Me | Customer-opened Cases or Incidents related to the AS request | Intake / Tracking |
| SPC | Service Purchase / Contract platform — referenced for SPC ticket numbers | Tracking |
| BTP | SAP Business Technology Platform tickets related to service delivery | Delivery |
| AMS | Application Management Services ticket — closed by CDM after delivery | Delivery / Closure |
| ServiceNow | IT service management tickets, used in parallel for certain service types | Tracking |
| JIRA | Invoice processing tickets — opened by CDM after AMS closure to trigger O2I | Invoice |

> **Every request always enters via email first**, regardless of what other platforms are subsequently involved. Email is the universal entry point.

---

## 4. End-to-End Process — Step by Step

| # | Step | Detail | Platform | Automation flag |
|---|---|---|---|---|
| 1 | Request received via email | Customer sends email requesting an AS. CDM identifies it as an AS request (not standard support). | EMAIL | — |
| 2 | Identify the service type | CDM looks up R&R document (downloaded on local machine) to confirm the service is chargeable and identify the correct service code/name. | LOCAL FILE | ⚑ |
| 3 | Find the price | CDM opens the AS Excel pricing sheet (local, no shared version) and looks up the price. | LOCAL FILE | ⚑ |
| 4 | Communicate price to customer | CDM sends price via email reply or SR comment. Both channels are valid. Price approval must be in writing. | EMAIL | ⚑ |
| 5 | Receive written price approval | Customer formally approves in writing (email or SR comment). CDM waits and confirms. PO number must be provided at this stage if required. | EMAIL | — |
| 6 | Service delivery begins | Once approval is received, service is implemented. Ticket opened in relevant platform (SAP4Me, SPC, BTP, AMS, or ServiceNow depending on service type). CDM tracks progress manually across platforms. | MULTI | — |
| 7 | Customer confirms delivery & closes ticket | Customer closes their ticket (Case/Incident/SR) with a comment confirming delivery. Wording varies. CDM monitors for closure. | SAP4Me | ⚑ |
| 8 | CDM closes the AMS ticket | After customer closure, CDM closes the corresponding AMS ticket manually. No automated notification exists. | AMS | ⚑ |
| 9 | CDM opens JIRA invoice ticket | CDM manually creates a JIRA ticket in the invoice queue to trigger O2I invoicing. Requires gathering 6+ data points from multiple sources. | JIRA | ⚑ |
| 10 | Process complete | JIRA ticket submitted to ECS GES team. CDM's responsibility ends. Invoicing handled by O2I team. | JIRA | — |

---

## 5. JIRA Invoice Ticket — Required Data & Template

### 5.1 Ticket Name Format

```
Additional Services: [SERVICE_CODE_1] & [SERVICE_CODE_2] Conversion [CUSTOMER_SYSTEM]
```

**Example:** `Additional Services: BASIC_1.5.20 & MOVE_1.3.04 Conversion FMX`

### 5.2 Required Fields

| Field | Source | Notes |
|---|---|---|
| Total amount + currency (numeric & written) | Additional Services pricing Excel | e.g. `19,370.00 EUR (nineteen thousand, three hundred and seventy euros)` |
| Sales order no. / Provider contract no. | SAP internal systems — **source unclear** | Marked as uncertain — needs process clarification |
| BCP ticket no. | SPC / BCP platform | e.g. `1523802/2025` |
| PO no. | Customer — must be provided before conversion agreement | Not always required; confirm with customer upfront |
| Activity performed | Based on service type | e.g. `Conversion-FMX`, `Migration-ASEtoHANA` |
| Addressed to | Fixed — always ECS GES | ECS Global Engagement Support (ECS GES) |

---

## 6. Current Pain Points & Automation Opportunities

| # | Pain Point | Automation Target |
|---|---|---|
| PP1 | No single source of truth. Each CDM maintains personal notes, downloaded files, memory. No shared view. | Phase 1: shared tracker |
| PP2 | Pricing sheet is siloed. Downloaded individually. Risk of quoting outdated prices. | Phase 1: shared pricing JSON |
| PP3 | R&R document is local. No lookup tool. Service identification is manual. | Phase 1: embedded R&R JSON + AI lookup |
| PP4 | JIRA ticket creation 100% manual. CDM gathers 6+ fields from different platforms. High error risk, time-consuming. | Phase 1: O2I generator |
| PP5 | No reminders or follow-up triggers. CDMs track open items from memory. | Phase 1: in-app banners; Phase 2: email reminders |
| PP6 | Multi-platform spread. 7 platforms per request, no aggregated view. | Phase 1: tracker centralises IDs; Phase 3: live API reads |
| PP7 | Sales order / contract number source is unclear. Exact source in SOP not fully defined. | Phase 1: free-text field (tolerate unclear source); Phase 3: API integration |

---

## 7. Open Questions (From Oana's Document)

These are the questions Oana flagged. Cross-referenced with `phase_1.md` open questions (Section 9).

| Oana Q# | Question | Maps to phase_1.md | Priority |
|---|---|---|---|
| Q1 | What APIs are available for SAP4Me, AMS, ServiceNow, SPC, BTP, JIRA within SAP internal network? Which require auth tokens vs SSO? | — (Phase 3 concern) | LOW for Phase 1 |
| Q2 | Where will this tool live? BTP CAP, SharePoint, local desktop, or internal web app? | Q2 in phase_1.md | HIGH |
| Q3 | Who owns the shared pricing data? Excel must be migrated to shared location before tool can reference it. | Q5 in phase_1.md | HIGH — Phase 1 blocker |
| Q4 | What is the exact source and format of the sales order / provider contract number? | PP7 above | HIGH — unclear |
| Q5 | Does the CDM org have access to an internal notification/email service for automated reminders? | Out of scope Phase 1 | LOW for Phase 1 |
| Q6 | Is there an existing CDM SharePoint space where a Phase 1 tracker could be deployed quickly? | Q8 in phase_1.md | HIGH |

---

## 8. Proposed Development Phases (Oana's High-Level View)

These map to the existing phase structure in `phase_1.md`, `phase_2.md`, `phase_3_roadmap.md`.

### Phase 1 — Source of Truth (Deliver First)
- Intake form: structured input for new AS requests (customer, service type, ticket IDs, price, PO, dates)
- Shared tracker: visible to all CDMs, replaces personal notes and Excel
- JIRA ticket generator: auto-populate the JIRA invoice ticket body from tracker data
- Shared pricing reference: migrate Excel data to queryable shared location

### Phase 2 — Reminders & Status
- Date-based reminders: follow-up triggers, closure reminders, JIRA prep alerts
- Status tracking: open / price communicated / approved / in delivery / customer closed / AMS closed / JIRA opened
- Notification channel: email or in-app pop-up alerts with action text

### Phase 3 — Platform Integration
- API integration with available platforms (SAP4Me, AMS, JIRA, ServiceNow)
- Auto-detection of ticket status changes
- Dashboard with live status across all platforms per AS request

---

## 9. Conflict Resolution: This Document vs. phase_1.md v3.1

This document (`oana_process_v1.md`) is the **as-is process** source. It describes what CDMs do today. `phase_1.md` v3.1 is the **build spec** — it translates the process into technical requirements, with additional constraints (ATLAS/Calypso path, data model fields, AI prompts, etc.).

**Resolution rule:** Where this document and `phase_1.md` disagree on *what the process is*, this document wins (it reflects actual CDM practice). Where they disagree on *how to implement or extend it*, `phase_1.md` wins.

Gaps and conflicts found during reconciliation are documented in `gap_analysis_v1.md`.

---

*Internal document — CDM Operations. Not for external distribution.*  
*Last updated: 2026-04-24*
