# Extension Model — Shared Data Dictionary

Single source of truth for the extensibility data model used by both the
**define extension capabilities** and **implement extensions** skills.

All types are provided by the SAP Cloud SDK for Python
(`sap_cloud_sdk.extensibility`).

## Composition Hierarchy

```
Agent
  └── ExtensionCapability (exactly 1 per agent)
        ├── Instructions  (0..1 — optional custom prompt text)
        └── Tools         (0..N — MCP tool servers)
        └── Hooks         (0..N — Pre/Post Hooks)
```

An **extension capability** is a named location in the agent's execution flow where
external instructions, MCP tools and Hooks can be injected at runtime. Each agent
exposes exactly one extension capability.

## Extension Capability Definition (Agent-Side)

Defined in the agent's code using `ExtensionCapability` (dataclass):

| Field                  | Type    | Description                                |
| ---------------------- | ------- | ------------------------------------------ |
| `display_name`         | `str`   | Human-friendly name                        |
| `description`          | `str`   | What can be extended                       |
| `id`                   | `str`   | Internal identifier (default: `"default"`) |
| `tools`                | `Tools` | Tool-related configuration                 |
| `instruction_supported`| `bool`  | Whether custom instructions are allowed    |
| `supported_hooks`      | `list[HookCapability]` | Hooks related configuration          |

`Tools` (dataclass):

| Field       | Type            | Description                      |
| ----------- | --------------- | -------------------------------- |
| `additions` | `ToolAdditions` | Configuration for tool additions |

`ToolAdditions` (dataclass):

| Field     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `enabled` | `bool` | Whether tool additions allowed |

`HookCapability` (dataclass):

| Field          | Type  | Description                    |
| -------------- | ----- | ------------------------------ |
| `type`         | `str` | Hook type: `"BEFORE"` or `"AFTER"` |
| `id`           | `str` | Internal identifier of the hook |
| `display_name` | `str` | Human-friendly name            |
| `description`  | `str` | What the hook does             |

`Hook` (dataclass):

| Field               | Type   | Description                                              |
| ------------------- | ------ | -------------------------------------------------------- |
| `hook_id`           | `str`  | Developer defined identifier                             |
| `id`                | `str`  | Unique hook identifier                                   |
| `ord_id`            | `str`  | ORD identifier of the hook                               |
| `name`              | `str`  | Name of the hook                                         |
| `type`              | `str`  | Hook type: `"BEFORE"` or `"AFTER"`                       |
| `deployment_type`   | `str`  | How the hook is deployed (e.g. `"URL"`)                  |
| `method`            | `str`  | The HTTP method to invoke the hook url                   |
| `url`               | `str`  | Endpoint URL to invoke the hook                          |
| `timeout`           | `int`  | Maximum execution time in seconds                        |
| `execution_mode`    | `str`  | Execution mode (e.g. `"SYNC"` or `"ASYNC"`)              |
| `on_failure`        | `str`  | Failure behaviour (e.g. `"BLOCK"` or `"CONTINUE"`)       |
| `order`             | `int`  | Execution order among hooks of the same type             |
| `can_short_circuit` | `bool` | Whether this hook can block/stop agent execution         |

## A2A Card Representation

The definition is serialized as an `AgentExtension` in the agent card
via `build_extension_capabilities()`:

```json
{
  "uri": "urn:sap:extension-capability:v1:default",
  "description": "...",
  "required": false,
  "params": {
    "instructionSupported": true,
    "displayName": "Default",
    "tools": { "additions": { "enabled": true } },
    "supportedHooks": [
      {
        "type": "BEFORE",
        "id": "agent_pre_hook",
        "displayName": "Before Hook",
        "description": "Executed before the main agent logic runs."
      },
      {
        "type": "AFTER",
        "id": "agent_post_hook",
        "displayName": "After Hook",
        "description": "Executed after the main agent logic runs."
      }
    ]
  }
}
```

This lives in `capabilities.extensions` on the A2A agent card, making the
extension capability discoverable by the platform.

## Runtime Extension Data (Extensibility Service Response)

When the agent runs, it creates an `ExtensibilityClient` via
`create_client("<agent_ord_id>")` and calls
`client.get_extension_capability_implementation(tenant=tenant)`, which returns an
`ExtensionCapabilityImplementation`:

| Field            | Type             | Description                                 |
| ---------------- | ---------------- | ------------------------------------------- |
| `name`           | `str`            | Extension capability name                   |
| `extension_name` | `str \| None`    | Name of the active extension                |
| `instruction`    | `str \| None`    | Custom instructions to append to prompt     |
| `mcp_servers`    | `list[McpServer]`| MCP server metadata with authorized tools   |
| `hooks`          | `list[Hooks]`    | BEFORE/AFTER hooks                          |
| `source`         | `ExtensionSourceMapping \| None` | Per-tool/hook extension attribution mapping |

### McpServer

Each `McpServer` represents a connected MCP tool server with its authorized
tools:

| Field             | Type                  | Description                                                 |
| ----------------- | --------------------- | ----------------------------------------------------------- |
| `ord_id`          | `str`                 | ORD identifier (e.g. `sap.mcp:apiResource:serviceNow:v1`)   |
| `global_tenant_id`| `str`                 | Global tenant ID of the MCP server                          |
| `tool_names`      | `Optional[list[str]]` | Approved tool names for this server (`None` = all approved) |

### ExtensionSourceMapping

When multiple extensions are merged (multi-extension scenario), the `source`
field maps each tool and hook back to the extension that contributed it.
This enables per-tool/hook telemetry attribution — all
`sap.extension.*` span attributes are resolved from the source info for
each specific tool or hook.

| Field   | Type                             | Description                                   |
| ------- | -------------------------------- | --------------------------------------------- |
| `tools` | `dict[str, ExtensionSourceInfo]` | Tool name → extension source info             |
| `hooks` | `dict[str, ExtensionSourceInfo]` | Hook name → extension source info             |

When only a single extension is active, `source` may be `None` — in that
case `extension_name` is sufficient for attribution.

### ExtensionSourceInfo

Each value in `source.tools` and `source.hooks` is an `ExtensionSourceInfo`
object (or a dict with the same keys in the raw API response):

| Field              | Type   | Description                                           |
| ------------------ | ------ | ----------------------------------------------------- |
| `extension_name`   | `str`  | Human-readable extension name (e.g. `"ap-invoice-extension"`) |
| `extension_id`     | `str`  | UUID of the extension                                 |
| `extension_version`| `str`  | Version of the extension (e.g. `"1"`)                 |
| `extension_url`    | `str`  | Extension URL (optional, may be empty)                |
| `solution_id`      | `str`  | SAP Build solution ID that contributed this extension |

Raw API response format:

```json
{
  "source": {
    "tools": {
      "sap_mcp_taxvalidator_validate_validate_tax": {
        "extensionName": "asset-agent-tools2",
        "extensionVersion": "1",
        "extensionId": "a1b2c3d4-e5f6-...",
        "extensionUrl": "",
        "solutionId": "f9cbd5c1-f041-4265-80cf-4c0a0b154063"
      }
    },
    "hooks": {
      "sap.hook:validateInput:v1": {
        "extensionName": "ap-invoice-extension",
        "extensionVersion": "1",
        "extensionId": "b2c3d4e5-f6a7-...",
        "extensionUrl": "",
        "solutionId": "f9cbd5c1-f041-4265-80cf-4c0a0b154063"
      }
    }
  }
}
```

**Convenience methods** on `ExtensionCapabilityImplementation`:

- `get_extension_for_tool(tool_name)` → `str | None` — looks up the tool's
  extension name in `source.tools`, falling back to `extension_name`
- `get_extension_for_hook(hook_ord_id)` → `str | None` — looks up the hook's
  extension name in `source.hooks`, falling back to `extension_name`
- `get_source_info_for_tool(tool_name)` → `ExtensionSourceInfo | None` —
  returns the full source info object for a tool
- `get_source_info_for_hook(hook_ord_id)` → `ExtensionSourceInfo | None` —
  returns the full source info object for a hook


## Tool Filtering

An MCP server may expose many tools, but the Extensibility Service only
authorizes a subset for each extension capability. Agents **must filter** tools
from each server to only those listed in the response.

## Instruction Supplementation

Extended instructions **supplement** the agent's existing system prompt —
they never replace it. The agent framework determines how instructions are
merged (e.g. PydanticAI's `instructions=` parameter, LangChain's system
message concatenation).

## Key Constraints

- Agents can have exactly **1 extension capability**
- `instruction_supported` defaults to `True`
- `tools.additions.enabled` defaults to `True`
- Tool names must be unique after prefixing within the agent's tool set
- Each MCP server URL is connected to at most once (deduplicate by URL)
