# BTP Deployment Prompt — CDM Additional Services Tracker

## What this is

A working SAP CAP application (Node.js) that needs to be deployed to BTP Cloud Foundry and
connected to the platform services it currently stubs or lacks. The code exists and runs locally.
The goal is to take it from localhost to a real BTP deployment with proper auth, database, and
AI routing.

---

## What is already built (do not rebuild)

The application lives in `additional-services-tracker/`. It is a standard CAP project.

**Data model** (`db/schema.cds`):
- `AdditionalServiceRequest` entity — 30+ fields covering the full Additional Services lifecycle
- Status enum: 8 states from Request received → Complete
- Admin-editable entities: `RRReference`, `PricingEntry`, `EmailTemplate`, `AdminConfig`
- Seed data in `db/data/` (synthetic only, 3 records)

**CAP service** (`srv/as-service.js` + `srv/as-service.cds`):
- Full CRUD with status transition enforcement
- 5 AI-backed bound actions: `parseEmail`, `matchRR`, `prefillPrice`, `draftPriceEmail`, `generateO2IBody`
- Status transition audit log (no PII)
- Validation: (Case no. OR CSR no.) required before status advances past `Request received`

**LLM client** (`srv/lib/llm/`):
- `LLMClient` interface
- `AnthropicDirectClient` — reads `ANTHROPIC_API_KEY` from env (currently active)
- `GenAIHubClient` — stub, ready for Gen AI Hub binding, selected via `CDS_LLM_PROVIDER=gen_ai_hub`

**UI** (`app/`):
- Agent-native shell (not Fiori Elements): `PersonaShell`, `InboxView`, `ChatShell`, `NavTree`
- Communicates with CAP service via OData (`ODataClient.js`)

**Other**:
- `JiraClient.js` stub in `srv/lib/jira/`
- `rrPricingSubagent.js` in `srv/lib/subagents/`
- Health service at `srv/health-service.js`

---

## What needs to be added or wired up for BTP deployment

### 1. HANA Cloud (replace SQLite)

Currently: SQLite (`db.sqlite` in project root, dev only).

Needed:
- Add `@sap/cds-hana` dependency
- Add HANA Cloud service binding in `package.json` under `cds.requires`
- `mta.yaml` resource: HANA Cloud instance (or bind to existing shared instance)
- No schema changes needed — CAP handles the DDL generation

### 2. XSUAA (add authentication)

Currently: no auth, all endpoints open.

Needed:
- `xs-security.json` with role templates:
  - `CDM` — create + edit own records, run AI actions
  - `CDM_Admin` — all CDM rights + edit R&R JSON, pricing JSON, email templates, AdminConfig
  - `Manager` — read-only on all records
- Bind XSUAA service instance in `mta.yaml`
- Add `@requires` annotations to `srv/as-service.cds` matching these roles
- `CDM owner` field populated from XSUAA user info (`req.user.id`) on record creation

### 3. SAP AI Core / Gen AI Hub (replace direct Anthropic key)

Currently: `CDS_LLM_PROVIDER=anthropic`, reads `ANTHROPIC_API_KEY` from `.env`.

Needed:
- Bind SAP AI Core service instance in `mta.yaml`
- Implement `GenAIHubClient.js` (currently a stub returning not-implemented)
- `GenAIHubClient` must call Gen AI Hub chat completions endpoint using the service binding credentials
- Switch `CDS_LLM_PROVIDER=gen_ai_hub` in the CF environment
- The `LLMClient` interface is already correct — only the implementation changes

`GenAIHubClient` interface to implement:
```javascript
async chat(systemPrompt, userMessage) {
  // POST to Gen AI Hub /chat/completions
  // Use service binding: VCAP_SERVICES.aicore[0].credentials
  // Return: { content: string, usage: { input_tokens, output_tokens } }
}
```

### 4. App Router (serve UI through BTP)

Currently: UI served directly by `cds watch` on localhost.

Needed:
- `approuter/` folder with `xs-app.json` routing:
  - `/odata/*` → CAP service
  - `/api/*` → CAP service
  - `/*` → `app/` static files
- XSUAA binding on the app router
- `mta.yaml` module for the app router

### 5. MTA build descriptor

Needed: `mta.yaml` with:
- Module: `additional-services-tracker-srv` (CAP Node.js app)
- Module: `additional-services-tracker-approuter` (app router)
- Resource: `additional-services-tracker-db` (HANA Cloud HDI container)
- Resource: `additional-services-tracker-uaa` (XSUAA)
- Resource: `additional-services-tracker-aicore` (SAP AI Core)

---

## What NOT to change

- `db/schema.cds` — data model is final (one field `spcExecutionRef` is pending a clarification but the column exists)
- `srv/as-service.js` — business logic is correct, only add `@requires` role checks
- `srv/lib/llm/LLMClient.js` — interface is correct, only implement `GenAIHubClient`
- `app/` shell UI — do not replace with Fiori Elements
- Seed data — keep as-is for dev profile, do not load to production

---

## Constraints

- Runtime: Cloud Foundry (not Kyma)
- Node.js version: match what is in `package.json`
- Do not add email sending (Phase 2 feature)
- Do not add real JIRA, SharePoint, or SAP4Me API calls (Phase 3 feature)
- AI key (`ANTHROPIC_API_KEY`) must not be present in CF environment — Gen AI Hub only in deployment
- No real customer data in the deployed seed — synthetic only

---

## Definition of done

- `cf push` (via `mbt build` + `cf deploy`) succeeds without errors
- App router serves the shell UI at the CF route
- XSUAA login redirects to SAP SSO and returns a valid session
- OData endpoints respond with data for a logged-in CDM user
- At least one AI action (`parseEmail`) completes successfully via Gen AI Hub binding
- HANA Cloud HDI container has the schema deployed and seed data loaded
