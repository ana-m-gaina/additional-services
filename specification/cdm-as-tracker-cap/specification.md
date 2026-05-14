# Specification: cdm-as-tracker-cap

> **Guidelines**: Read [guidelines.md](../guidelines.md) and [guidelines-cap.md](../guidelines-cap.md) before executing ANY tasks below. Follow all constraints described there throughout execution.

> **IMPORTANT: This asset is OUT OF SCOPE for the Joule adaptation work.**
> The CAP Node.js backend is functionally complete and requires no changes.
> This spec exists only as a guard to prevent accidental modifications.

## Scope Boundary

- [ ] Confirm `cdmpa/assets/cdm-as-tracker-cap/` is untouched — run `git diff HEAD cdmpa/assets/cdm-as-tracker-cap/` and verify no changes
- [ ] Confirm the CAP service starts and responds: `cd cdmpa/assets/cdm-as-tracker-cap && npm install && cds watch`
- [ ] Confirm `GET http://localhost:4004/CDMService` returns OData metadata
- [ ] Confirm `GET http://localhost:4004/health` returns `{"status":"ok"}`

## What must NOT change

- CDS schema files (`db/`, `srv/`)
- Service handlers (`srv/*.js`)
- `package.json` dependencies
- `asset.yaml` for this asset (type: `cap-app`, port 4004)

## What MAY change (deployment descriptor only)

- `cdmpa/mta.yaml` — only if the agent asset's module name or resource bindings change as part of REQ-07
- `cdmpa/solution.yaml` — only if `setup-solution` skill requires a version bump
