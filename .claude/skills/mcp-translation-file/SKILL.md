---
name: mcp-translation-file
description: When an agent requires an API integration, this skill can be used to generate the necessary MCP artifacts from the API specifications retrieved during the specification phase, i.e. generate an MCP Translation file and Server Card based on an API spec (openapi, odata).
metadata:
  owner: mcp-builder
  author: r.costa@sap.com
  version: "3.0"
---

# MCP Translation File Generator

Generate an MCP translation file from an API spec (OpenAPI or OData).

This skill produces exactly **one file** per API spec: `translation.json`.
Generation is delegated to the `mcp-builder-sdk` CLI tool.
This skill orchestrates the process: resolves inputs and calls the tool (providing the API spec as the input and the output file path).

**Invocation context:** This skill is typically invoked by the `specification` skill after task implementation, not directly by users. If invoked manually, ensure all prerequisites are met (API specs in place, tasks referencing APIs, etc.). If not, ask the user to run the necessary prior steps or provide missing information.

---

## Terminology

These terms have precise meanings throughout this document:

- **STOP**: Halt execution of this skill entirely. Do not proceed to any subsequent step. Explain to the user what went wrong, what is missing, and how to fix it. If this skill was invoked by another agent or skill, return control to the caller with the error details.
- **Log/Decision log**: When you make a non-trivial choice (e.g. selecting an API type, skipping an endpoint, choosing a tool name), emit a short line in the chat: `[MCP-SKILL] <what> — <why>`. This improves debugging and reproducibility. Always include the prefix `[MCP-SKILL]` to distinguish these messages from others, even if it was not explicitly required.
- **mcp-builder-sdk**: A CLI tool that MUST be available in the running environment. If not available, STOP and tell the user to install it before re-running this skill. For installation commands, registry URLs, and version-pinning requirements, refer to `docs/mcp-skills-guide.md`.

---

## Phase 1: Gate Checks

Evaluate each gate sequentially. Every gate must pass before proceeding to Phase 2. If any gate fails, follow the specified action — DO NOT skip ahead.

### Gate 1 — Specification directory exists

**Check:** A valid specification directory exists at `specification/<asset-name>/`.
- If **false** → STOP. Tell the user to run the `specification` skill first to create the specification.
- If **true** → Record the `<asset-name>` for use in later steps. Proceed.

### Gate 2 — specification.md exists

**Check:** The file `specification/<asset-name>/specification.md` exists.
- If **false** → STOP. Tell the user to run the `specification` skill first to generate the specification.
- If **true** → Proceed.

### Gate 3 — Specification references an API integration

**Check:** At least one task in `specification/<asset-name>/specification.md` references an API integration (e.g., contains phrases like "API", "integration", "OData", "REST", "service", or an ORD ID pattern like `sap.*:apiResource:*`).
- If **false** → STOP. This skill only applies to solutions that integrate with an API. Continue the process without using this skill, and explain this to the user (this skill might have been invoked unnecessarily but that doesn't impact the process negatively).
- If **true** → Identify the relevant task(s). Proceed.

### Gate 4 — API specs directory exists

The `specification` skill detects API integrations during spec generation. When an integration is needed, it fetches the API specs and places them in `specification/<asset-name>/api-specs/`. The ORD ID and API type are determined from the files in this directory.

**Check:** The directory `specification/<asset-name>/api-specs/` exists and contains at least one spec file.
- If **false** → STOP. The prior `specification` step did not detect or fetch any API specs. Tell the user to re-run the `specification` skill and ensure the API discovery step completes successfully. Context: This skill was likely invoked by an agent, which means that the agent may need to adjust its prompts or retry the discovery process, otherwise this skill wouldn't be called.
- If **true** → Record every spec file found in this directory. For each file, extract the ORD ID from the task description or from the filename/content. Proceed.

### Gate 5 — Check for existing translation file

**Check:** Look for existing translation files by scanning `specification/<asset-name>/mcps/*/` for any `translation.json` files.

- If **any file exists** → Ask the user: "Translation files already exists at `{paths-list}`. What would you like to do?"
  - **Re-validate** → Skip Phase 2 and Phase 3 entirely. Jump directly to **Phase 4**. If the validation fails, start again from Phase 2 (full regeneration), since this process is deterministic.
  - **Overwrite** → Proceed to Phase 2 (full regeneration from the API spec).
  - **Abort** → STOP.
- If **no file exists** → Proceed to Phase 2.

---

## Phase 2: Input Resolution

At this point all gates have passed. You have recorded the list of spec files from `specification/<asset-name>/api-specs/`. Now resolve the remaining inputs for each spec file.

If there are multiple spec files, repeat Phase 2 and Phase 3 for each one, producing one new file per API spec.

### Read the API spec paths

Find each spec file path (from the `specification/<asset-name>/api-specs/` directory). These paths will be later passed as an argument to the CLI tool.

### Resolve the API type

Determine the API type for each spec file. Use this order:

1. **File extension**:
   - `.edmx` or `.xml` → `edmx`
   - `.json`, `.yaml`, `.yml` → inspect content before deciding (see step 3)
2. **ORD ID suffix** — if the ORD ID ends with `:edmx` or the target type is specified in `api-discovery-results.md`, use that.
3. **Spec file content** (mandatory for `.json/.yaml/.yml`, tiebreaker otherwise):
   - OData metadata files contain `<edmx:Edmx` at the root → `edmx`
   - OpenAPI files contain a top-level `"openapi"` or `"swagger"` field → `openapi-v3`
   - If neither matches confidently → STOP and ask the user.

Log the decision: `API type: {type} — {reason}`.

### Resolve the ORD ID

Extract the ORD ID for the source API. Search in this order:
1. **`api-discovery-results.md`** (primary source) — Match the API spec filename to the **Local Spec Path** column. Extract the ORD ID from the matching row. This is the most reliable source since it was populated during API Discovery by the `specification` skill.
2. The task description in the specification files (look for a pattern like `sap.*:apiResource:*`).
3. Metadata or annotations inside the spec file itself.
4. Ask the user (last resort): "What is the ORD ID of the source API? (e.g., `sap.s4:apiResource:dispute-service:v1`)"

- If **found** → Record the ORD ID. Proceed.
- If **not found** → Ask the user: "What is the ORD ID of the source API? (e.g., `sap.s4:apiResource:dispute-service:v1`)"
  - If the user cannot provide one → STOP.
  - If the user provides one → Record it. Proceed.

Log the decision: `ORD ID: {ordId} — {source}`.

---

## Phase 3: Generate via CLI Tool

For each API spec file, call the `mcp-builder-sdk` tool.

### Step 1 — Store the output file path

Use the same `<api-spec-stem>` derived in Gate 5 (the API spec filename without extension) as the output folder name. Create the output directory if it does not exist:
```bash
mkdir -p "specification/<asset-name>/mcps/<api-spec-stem>"
```

Use that path for the output files when calling the CLI tool.

### Step 2 - Store the original API spec file in the output folder

Copy the original API spec file from `specification/<asset-name>/api-specs/` into the output folder, renaming it to `api-spec.json`.

### Step 3 — Call the CLI tool

Before invoking, log the resolved inputs:
```
[MCP-SKILL] API type: <api-type> — <reason>
[MCP-SKILL] ORD ID: <ord-id> — <source>
[MCP-SKILL] Spec file: <spec-file-path>
```

Run the tool by specifying the API spec path and the ORD ID as arguments. Specify any additional parameters as needed (e.g., server name, version, description) or rely on defaults. The output should be pointing to the folder created in Step 1. e.g.:
```bash
mcp-builder-sdk generate-translation-file \
  --api-spec "specification/<asset-name>/api-specs/<spec-file>" \
  --output "specification/<asset-name>/mcps/<api-spec-stem>" \
  --api-type "<api-type>" \
  --api-ord-id "<ord-id>"
```

See the reference section for the exact command syntax and parameters.

If anything fails, make sure you always run the help command to ensure this skill is compatible with the installed version of the tool and to validate the command syntax:
```bash
mcp-builder-sdk generate-translation-file --help
```

If there is any mismatch, try to adjust the command once to avoid unnecessary extra steps.

If the tool returns any error or fails after adjusting the command → Report the error to the user and STOP.

---

## Phase 4: Post-Checks

Verify all the following conditions before reporting success:

1. For each API spec processed, **the following files exist**:
   - `specification/<asset-name>/mcps/<api-spec-stem>/translation.json`
   - `specification/<asset-name>/mcps/<api-spec-stem>/api-spec.json`

2. Optionally, the following files may exist:
   - `specification/<asset-name>/mcps/<api-spec-stem>/serverCard.json`

If all files are present → Report success to the user with the file paths.
If any file is missing → STOP with an explanation of what failed.
If any file not mentioned above exists in the output folder → STOP with an explanation that the output contains unexpected files and list them.

---
---

## Reference

> **This section is reference material.** Do not execute it as sequential steps. Consult it when needed during the phases above.

### Output Folder Naming Convention

The output subdirectory under `mcps/` is named after the API spec filename with the extension stripped. This creates a direct, deterministic link between each API spec and its generated MCP artifacts.

| API spec file | Output folder (`<api-spec-stem>`) |
|---|---|
| `supplier-invoice-cloud.json` | `supplier-invoice-cloud` |
| `dispute-service.edmx` | `dispute-service` |
| `business-partner-api.json` | `business-partner-api` |

This convention is used in Gate 5 (to check for existing files) and Phase 3 (to write output files).

### MCP CLI Tool Reference

Here is the general command structure for the `mcp-builder-sdk` CLI tool (as of April 29, 2026):
```
Usage: mcp-builder-sdk generate-translation-file [options]

Generate an MCP translation file from an API specification

Options:
  -s, --api-spec <path>  Path to the API specification file (OpenAPI or OData)
  -o, --output <path>    Output directory for generated files
  -t, --api-type <type>  API type: "openapi-v3" or "edmx"
  -i, --api-ord-id <id>  ORD ID of the API
  -h, --help             display help for command
```

Note that the exact parameters and syntax may vary based on the installed version, so always check with `mcp-builder-sdk generate-translation-file --help` if you encounter issues.
