---
name: create-agent-extension
description: >
  Generate extension descriptor YAML files (extension.yaml, asset.yaml) that
  extend an existing extensible agent with additional tools, instructions, or
  hooks. This skill produces declarative YAML artifacts only — it does NOT
  modify agent source code, add SDK dependencies, or implement runtime
  extensibility. Use this skill when you want to create a new extension
  package for an already-extensible agent via the Agent Extension Editor.
  Do NOT use this skill to make an agent extensible — use
  sap-agent-extensibility for that instead.
---

# Create Agent Extension Skill

**This skill operates on the current working directory.** The caller is responsible for running it from the correct target directory (e.g. `assets/agent-extension/`).

## Schema References

All generated files MUST conform to the following JSON Schema definitions:

- **Extension Descriptor** (`extension.yaml`): [assets/extension.json](assets/extension.json)
- **Asset Descriptor** (`asset.yaml`): [assets/asset.json](assets/asset.json)
- **Agent Discovery Response** (tool result reference): [assets/agent-discovery-response.json](assets/agent-discovery-response.json)
  - `get_extensible_agents` returns the full response (`{ agents: [...], pageInfo: {...} }`)
  - `get_extensible_agent` returns a single agent object (one item from the `agents` array, no `pageInfo`)

### Tool Result → YAML Field Mapping

Use this mapping to translate agent discovery tool results into the generated YAML files.

#### Agent → `extension.yaml`

| Tool Result Field | `extension.yaml` Field |
|---|---|
| `ordId` | `agent.ordId` |
| `systemInstance.globalTenantId` | `agent.identifier` |
| `extensions[].params.capabilityId` | `capabilityImplementations[].capabilityId` |
| `extensions[].params.instructionSupported` | Determines if `capabilityImplementations[].instruction` can be set |
| `extensions[].params.tools.additions.enabled` | Determines if `capabilityImplementations[].tools[]` can be populated |
| `extensions[].params.supportedHooks` | Determines which hooks can be defined in `capabilityImplementations[].hooks[]` |

#### Agent → `asset.yaml`

| Tool Result Field | `asset.yaml` Field |
|---|---|
| `ordId` | `requires[].ordId` (where `type: agent`) |
| `version` | `requires[].version` (where `type: agent`) |

## Step 1: Fetch Agent Information

**IMPORTANT: Always fetch agent information first** to get the correct `ordId` and `version` for the agent to be extended.

#### When User Provides a Specific ordId

If the user provides a specific ordId and version (e.g., `sap.joule:agent:employee-onboarding:v1` & version `1.0.0`), fetch that specific agent using the `get_extensible_agent` tool:

#### Default Query (No ordId Provided)

Use the `get_extensible_agents` tool to fetch all extendable agents.

Note that the result can have a next page with a cursor that can be used to fetch more agents if needed. If multiple agents are returned, ask the user to select which agent they want to extend. Present the options clearly with their `ordId`, `version`, and a short description.

#### Handle Multiple Versions

If the query returns **multiple versions** of the same agent (e.g., `sap.joule:agent:employee-onboarding:v1` and `sap.joule:agent:employee-onboarding:v2`), you **MUST ask the user which version to use** before proceeding. Present the versions clearly:

- List each version with its `ordId`, `version`, `description`
- Highlight differences between versions if apparent (e.g., different extension capabilities)
- **Do NOT default to the latest version silently** — always let the user decide

## Step 2: Generate `extension.yaml`

Create `assets/<agent-extension>/extension.yaml` conforming to the Extension Descriptor schema ([assets/extension.json](assets/extension.json)).

**Always generate this file immediately as an empty skeleton** — do NOT ask the user what to include first. The skeleton is populated based solely on the extension capabilities returned by the discovery tool.

The `capabilityImplementations` structure depends on what the agent's extension capabilities support:

#### If tools AND hooks are supported

(`extensions[].params.tools.additions.enabled` is `true` AND `extensions[].params.supportedHooks` is non-empty)

```yaml
_schema-version: "0.1.0"
kind: Extension

metadata:
  name: "<agent-extension-name>"

agent:
  ordId: "<from tool: ordId>"
  identifier: "<from tool: systemInstance.globalTenantId>"

capabilityImplementations:
  - capabilityId: "<from tool: extensions[].params.capabilityId>"
    tools: []
    hooks: []
```

#### If only tools are supported

(`extensions[].params.tools.additions.enabled` is `true` AND `extensions[].params.supportedHooks` is empty or absent)

```yaml
_schema-version: "0.1.0"
kind: Extension

metadata:
  name: "<agent-extension-name>"

agent:
  ordId: "<from tool: ordId>"
  identifier: "<from tool: systemInstance.globalTenantId>"

capabilityImplementations:
  - capabilityId: "<from tool: extensions[].params.capabilityId>"
    tools: []
```

#### If only hooks are supported

(`extensions[].params.tools.additions.enabled` is `false` or absent AND `extensions[].params.supportedHooks` is non-empty)

```yaml
_schema-version: "0.1.0"
kind: Extension

metadata:
  name: "<agent-extension-name>"

agent:
  ordId: "<from tool: ordId>"
  identifier: "<from tool: systemInstance.globalTenantId>"

capabilityImplementations:
  - capabilityId: "<from tool: extensions[].params.capabilityId>"
    hooks: []
```

#### If neither tools nor hooks are supported

```yaml
_schema-version: "0.1.0"
kind: Extension

metadata:
  name: "<agent-extension-name>"

agent:
  ordId: "<from tool: ordId>"
  identifier: "<from tool: systemInstance.globalTenantId>"

capabilityImplementations:
  - capabilityId: "<from tool: extensions[].params.capabilityId>"
```

**Important rules for extension.yaml:**
- The `capabilityId` must match the `params.capabilityId` from the agent's extension capabilities
- Only include `tools` property if `extensions[].params.tools.additions.enabled` is `true`
- Only include `hooks` property if `extensions[].params.supportedHooks` is non-empty
- Only add `instruction` if `extensions[].params.instructionSupported` is `true`
- Do NOT include `tools` or `hooks` properties at all when the capability does not support them

## Step 3: Setup Solution

After bootstrapping, automatically execute the `setup-solution` skill to create an `asset.yaml` in this same directory with `buildPath: .` and `/.well-known/agent.json` health probes.

**CRITICAL: The `asset.yaml` MUST include a `requires` entry referencing the agent.** This is essential for the platform to understand the dependency. After the `setup-solution` skill generates the initial `asset.yaml`, ensure it contains:

```yaml
requires:
  - name: "<agent-title-kebab-case>"
    type: agent
    version: "<from tool: version>"
    ordId: "<from tool: ordId>"
```

If the `setup-solution` skill does not add this automatically, you MUST add it yourself. The `asset.yaml` is incomplete without the agent dependency.

## Step 4: Set `extensionUrl`

After the solution is set up, use the `get_solution_url` tool to retrieve the platform URL for the solution. Then **add only** the `extensionUrl` field to the existing `metadata` block in `extension.yaml` — do NOT overwrite or remove other metadata fields like `name`:

```yaml
metadata:
  name: "<keep existing>"
  extensionUrl: "<from get_solution_url>"
```

This step MUST be performed as the final step — the `extensionUrl` is the complete host URL returned by `get_solution_url`.
