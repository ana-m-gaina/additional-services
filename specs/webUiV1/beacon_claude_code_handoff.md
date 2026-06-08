# Beacon CDM — Claude Code Handoff Prompt

## Project overview

You are picking up a product called **Beacon** — a locally-running webapp for SAP Customer Delivery Managers (CDMs). The CDM role involves managing SAP cloud contracts, coordinating system builds, migrations, conversions and upgrades, tracking incidents and escalations, running ops meetings with customers, and preventing churn while identifying upsell opportunities.

The problem Beacon solves: CDMs currently work across 6+ disconnected tools with no single workspace. Beacon is that workspace.

The app is already partially built and running locally at `localhost:4004`. It was built by a developer and uses Claude (Anthropic API) as its AI engine, branded as "Beacon AI".

---

## What has been designed and decided

### Architecture — V1 (ship by end of June)

**Core principle: upload once, never re-enter.**

V1 is document-ingestion first. No live API integrations yet. The CDM uploads documents, Claude extracts structured data, the dashboard displays it.

**Document inputs (the four upload types):**
- Customer contract — PDF or Word — source of truth for dates, scope, SLA tier, contract value
- Change Requests (CRs) — PDF or Word — all signed CRs, Beacon extracts labels, dates, values
- DED landscape export — Excel or CSV — systems (PRD/QAS/DEV), RAM, status, dates
- Service Requests — CSV — optional, open SRs and incident downloads

**Key data Claude must extract from these documents:**
- Go-live date (contract), contract value, hypercare period, SLA tier, renewal date
- System names, types, RAM per system
- CR labels, dates, values — and flag mismatches between CR document label vs DED label
- PQA mismatches (when DED export and PQA data differ on same system)
- Date drift (contract date vs actual delivered date)

---

## The five screens

### 1. Dashboard (home)
- 4 stat cards: open incidents, open cases, contract milestones, next ops meeting
- CR mislabeling banner (auto-flagged from document extraction)
- Today's actions list — manually entered or flagged by Beacon — with action buttons that pre-fill the AI chat

### 2. Documents
- Four upload zones: contract, CRs, DED export, SRs
- Uploaded documents list with extraction status (Processing → Extracted)
- Extraction summary: what Beacon found in each document, flags surfaced

### 3. Ops tools
- One-click ops meeting prep buttons (auto-draft OneNote template, pull open actions, generate engagement summary) — all route into Beacon AI chat with pre-filled prompts
- Post-meeting sentiment log: three buttons (Positive / Neutral / Frustrated) + optional text note + save — this is the live customer health signal between biannual CSAT surveys
- Sentiment history timeline per customer

### 4. Work at risk (WaR) + Decommission tracker
- WaR items: manually entered, auto-age in days, flag red at 15 days (CDM owns closure)
- WaR threshold rules: under 10d = monitor, 10–15d = active chase, 15d+ = escalate
- Decommission tracker: manually entered system decommission dates, auto-flag overdue

### 5. Customer health
- Composite churn score per customer (0–100)
- Score driven by: escalation frequency (highest weight), CSAT score (highest weight), SLA breaches, delivery failures, financial friction
- CSAT shown as "last known" with date — received twice a year, not live
- Sentiment log feeds the live signal between CSAT cycles

---

## Left rail — customer navigation

- No search bar
- Customers grouped into three sections: **At risk** / **Needs attention** / **On track**
- Each customer shows: name, engagement type, RAG dot, optional badge (e.g. "2d late", "8d left")
- "+ Add" button opens modal: customer name, contract ID, engagement type, status — customer drops into correct section automatically
- Switching customers updates the entire dashboard context

**Engagement types:** Migration, Conversion, Upgrade, Steady-state, New contract

---

## Right panel — three tabs

- **Landscape**: systems list (PRD/QAS/DEV with type badge, name, status, RAM), PQA mismatch flag, contract snapshot (go-live dates, hypercare, renewal, value)
- **Timeline**: contract milestone timeline with drift tags (on time / +Xd drift / DED mismatch / upcoming)
- **Beacon AI**: Claude chat, context-aware to active customer and uploaded documents

---

## Quick nav (bottom of left rail)

- **Pricing lookup**: R&R Excel uploaded once a year, searchable by service name or ID, returns Service ID + price, one-click copy for customer communication
- **Migration checklist**: step-by-step checklist with tickable items (steps come from internal Wiki — placeholder steps currently, real steps to be added)
- **Conversion checklist**: same format
- **Ops meeting prep**: shortcut to ops screen

---

## Key business logic to implement

**CR mislabeling detection:** Compare CR label extracted from CR document vs label in DED export for same CR ID. If mismatch → surface banner on dashboard.

**Date drift calculation:** Contract date (from contract document) vs actual delivered date (CDM inputs actual, or extracted from DED). Delta displayed in timeline.

**WaR aging:** Date started stored, days elapsed calculated daily. Flag amber at 10d, red at 15d+.

**Decommission overdue:** Compare decommission due date vs today. Flag red if past.

**Churn score formula (V1 — manual inputs):**
- Escalation count this month × 25 (capped at 50)
- CSAT below 3 = +30, 3–4 = +10, above 4 = 0
- Active SLA breach = +20
- Go-live drift beyond 14d = +10
- Score out of 100: 0–20 = low, 21–50 = medium, 51+ = high

---

## V2 (later — do not build now)

API integrations in priority order:
1. SAP for Me — utilisation data (RAM trending, upsell signals, idle systems)
2. Incident/case system — live counts, SLA breach detection
3. CMS (Contract Management Solution) — auto CR import, WaR detection
4. Outlook calendar (Microsoft Graph) — ops meeting dates, renewal reminders

---

## Design system

The UI has been fully designed. Font: DM Sans + DM Mono (Google Fonts). Color palette uses these exact hex values:

```
--bg: #F7F6F2
--surface: #FFFFFF
--border: #E8E6DF
--border-md: #D3D1C7
--text: #1C1B18
--text-2: #6B6962
--text-3: #9C9A92
--blue-bg: #E6F1FB   --blue: #185FA5   --blue-dark: #0C447C
--green-bg: #EAF3DE  --green: #3B6D11
--amber-bg: #FAEEDA  --amber: #854F0B
--red-bg: #FCEBEB    --red: #A32D2D
```

Grid layout: `52px (icon rail) | 210px (left rail) | 1fr (main) | 300px (right panel)` — fixed height 700px, no page scroll, internal scroll per panel.

Icons: Tabler Icons outline webfont (`<i class="ti ti-NAME">`).

---

## The HTML reference file

A fully interactive HTML mockup of the complete V1 UI has been built. It includes all five screens, working navigation, add customer modal, pricing lookup with live search, interactive checklists, sentiment log, document upload simulation, and Beacon AI chat.

**You have access to the Claude.ai conversation where this was built.** Open it and read through the full conversation to extract any detail not covered in this prompt — the conversation contains all design decisions, business logic discussions, and iteration history.

---

## Your tasks

1. **Read the full Claude.ai conversation** to absorb all context, design decisions, and business logic discussed. Connect to the conversation via the MCP server if available.

2. **Open the Beacon webapp** at `localhost:4004` and review the current state of the codebase.

3. **Use the HTML mockup as the pixel-perfect design reference.** Port the design, layout, CSS variables, and component structure into the Beacon codebase. Match it exactly.

4. **Use Playwright via the MCP server** to open the HTML reference file in the browser. Visually inspect every screen and panel. Identify and fix any misalignments, overflow issues, spacing inconsistencies, or rendering problems before porting to the webapp.

5. **Implement document upload and extraction** — wire the four upload zones to the Anthropic Claude API (`claude-sonnet-4-20250514`, `max_tokens: 1000`). For each uploaded document, send it to Claude with an extraction prompt and parse the structured response to populate the dashboard.

6. **Implement local persistence** — customer data, uploaded document metadata, extraction results, sentiment logs, WaR items, and decommission entries must persist across sessions. Use local storage or a simple local JSON file/SQLite — whatever fits the existing Beacon architecture.

7. **Implement the add customer flow** — modal → form → customer appears in correct RAG section → upload docs to populate it.

8. **Wire the Beacon AI chat** — it must be context-aware: know which customer is active, have access to that customer's extracted document data, and respond accordingly.

9. **Implement the pricing lookup** — accept R&R Excel file upload, parse it, make it searchable by service name or ID, return Service ID + price with copy-to-clipboard.

10. **Do not build V2 API integrations.** Keep scope to what is described above for V1.

---

## Notes for the developer

- The app runs locally — no external deployment needed for V1
- Claude API is already connected in Beacon — use the same connection
- Document extraction is the highest-risk item technically — validate it works with a real SAP contract PDF before building UI around it
- The checklist steps (migration, conversion) are placeholders — the CDM will provide real Wiki steps to replace them
- The sentiment log is the most important quick win — simple to build, high daily value
- All stat card numbers (incidents, cases) are manually entered in V1 — no live feed
