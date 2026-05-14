# OpenAI Agents SDK Integration

Integration pattern using the OpenAI Agents SDK (`openai-agents`). Uses the
SDK's built-in `create_static_tool_filter` for filtering and the server `name`
parameter for namespacing.

MCP tool connections go through the **Agent Gateway** proxy. The agent builds
gateway URLs from the `McpServer`'s `ord_id` and `global_tenant_id`, and
authenticates using an IAS JWT-bearer token exchange.

> **Note**: This reference assumes Phase 2 (Add Telemetry Instrumentation) of the
> `sap-agent-extensibility` skill has been completed, which generates the
> `extension_telemetry/` module with OTEL-instrumented wrappers.

> **Conditionality**: This reference shows the full tools + instructions case.
> When implementing, only include the sections relevant to your configuration:
>
> - **Tools only**: Include MCP server construction, tool filtering, and
>   namespacing, but omit the instruction concatenation.
> - **Instructions only**: Include the instruction concatenation, but omit
>   `MCPServerStreamableHTTP`, `create_static_tool_filter`, the `mcp_servers=`
>   parameter, and telemetry wrapping entirely. Phase 2 (telemetry) should also
>   have been skipped.

## Complete example

```python
import logging
import os

from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHTTP, create_static_tool_filter

from sap_cloud_sdk.extensibility import create_client
from sap_cloud_sdk.ias import parse_token
from services.token_exchange import IASTokenExchange

logger = logging.getLogger(__name__)

BASE_INSTRUCTIONS = "You are a helpful assistant."

AGENT_GATEWAY_HOST = os.environ.get(
    "AGENT_GATEWAY_HOST", "https://eu12.access.sapdas.cloud.sap"
)

# Create extensibility client once at module level
extensibility_client = create_client("<agent_ord_id>")


async def run_agent(query: str, inbound_token: str = "", context=None) -> str:
    """Run the OpenAI Agents SDK agent with extensibility support."""

    # Step 1: Extract tenant and fetch extensions
    headers = context.call_context.state.get("headers", {}) if context and context.call_context else {}
    authorization = headers.get("authorization", "")
    claims = parse_token(authorization)
    tenant = claims.app_tid

    ext_impl = extensibility_client.get_extension_capability_implementation(
        tenant=tenant,
        capability_id="default",
    )

    # Step 2: Build instructions with extensions
    instructions = BASE_INSTRUCTIONS
    if ext_impl.instruction:
        instructions += f"\n\n{ext_impl.instruction}"

    # Step 3: Token exchange for Agent Gateway authentication
    exchanged_token = None
    if inbound_token and ext_impl.mcp_servers:
        try:
            exchanged_token = await IASTokenExchange().exchange(inbound_token)
        except Exception as e:
            logger.error("IAS token exchange failed: %s", e)

    auth_headers = (
        {"Authorization": f"Bearer {exchanged_token}"} if exchanged_token else {}
    )

    # Step 4: Build MCP server list via Agent Gateway with filtering and namespacing
    mcp_servers = []
    for server in ext_impl.mcp_servers:
        gateway_url = (
            f"{AGENT_GATEWAY_HOST}/v1/mcp"
            f"/{server.ord_id}/{server.global_tenant_id}"
        )
        try:
            mcp_servers.append(
                MCPServerStreamableHTTP(
                    url=gateway_url,
                    name=server.ord_id,
                    # Filter to only approved tools
                    tool_filter=create_static_tool_filter(allowed_tool_names=server.tool_names),
                    headers=auth_headers,
                )
            )
        except Exception as e:
            logger.warning("Extension MCP server %s unavailable: %s. Skipping.", gateway_url, e)
            continue

    # Step 5: Create and run agent
    agent = Agent(
        name="my-agent",
        instructions=instructions,
        mcp_servers=mcp_servers,
    )
    result = await Runner.run(agent, input=query)
    return result.final_output
```

## Key points

- MCP servers are passed directly to the `Agent` constructor via **`mcp_servers=`**
- The SDK manages MCP connection lifecycle internally via `Runner.run()`
- MCP connections go through the **Agent Gateway** -- URLs are built from
  `server.ord_id` and `server.global_tenant_id`, not connected directly
- Authentication uses **IAS JWT-bearer token exchange** -- the inbound user token
  is exchanged for an agent-gateway scoped token via mTLS
- **Fail-open behavior**: Each server creation is wrapped in try/except —
  unavailable extension servers are logged and skipped
- Extended instructions are concatenated with the base instructions string
- Tools are **filtered** using the SDK's built-in `create_static_tool_filter`
  with `server.tool_names` from each `McpServer`
- Servers are **named** via the `name` parameter using the `ord_id` from each `McpServer`
- `create_client("<agent_ord_id>")` is called once at module level;
  `client.get_extension_capability_implementation(tenant=tenant)` is **synchronous** — no `await`.
  The client has an internal cache (LRU, 10-min TTL) keyed by `(tenant, capability_id)` —
  recreating it per request defeats caching

## How instructions are added

The Agents SDK uses a plain string for instructions. Concatenate the extended
instructions:

```python
instructions = BASE_INSTRUCTIONS
if ext_impl.instruction:
    instructions += f"\n\n{ext_impl.instruction}"

agent = Agent(name="my-agent", instructions=instructions, ...)
```

## How MCP tools are added

MCP servers are first-class in the Agents SDK. Pass them at agent construction
time — the SDK handles connection management:

```python
from agents.mcp import MCPServerStreamableHTTP

mcp_servers = []
for server in ext_impl.mcp_servers:
    gateway_url = (
        f"{AGENT_GATEWAY_HOST}/v1/mcp"
        f"/{server.ord_id}/{server.global_tenant_id}"
    )
    mcp_servers.append(
        MCPServerStreamableHTTP(
            url=gateway_url,
            name=server.ord_id,
            headers=auth_headers,
        )
    )

agent = Agent(
    name="my-agent",
    instructions=instructions,
    mcp_servers=mcp_servers,
)
```

## How tools are filtered

The OpenAI Agents SDK provides `create_static_tool_filter` for allowlist-based
filtering. Pass it as `tool_filter` when creating an MCP server, using
`server.tool_names`:

```python
from agents.mcp import MCPServerStreamableHTTP, create_static_tool_filter

server = MCPServerStreamableHTTP(
    url=gateway_url,
    tool_filter=create_static_tool_filter(allowed_tool_names=server.tool_names),
    headers=auth_headers,
)
```

For dynamic filtering based on runtime context, use a callable instead:

```python
from agents.mcp import ToolFilterContext

async def context_aware_filter(context: ToolFilterContext, tool) -> bool:
    return tool.name in allowed_names

server = MCPServerStreamableHTTP(url=gateway_url, tool_filter=context_aware_filter, headers=auth_headers)
```

## How tools are namespaced

The `name` parameter on MCP server constructors gives each server a unique
identity. Use the `ord_id` from each `McpServer` as the server name:

```python
server = MCPServerStreamableHTTP(
    url=gateway_url,
    name=server.ord_id,
    headers=auth_headers,
    # e.g. "sap_mcp_servicenow_v1"
)
```

## Mixing with native tools

You can combine MCP servers with function tools:

```python
from agents import Agent, function_tool

@function_tool
def my_native_tool(param: str) -> str:
    """A native tool."""
    return f"Result: {param}"

agent = Agent(
    name="my-agent",
    instructions=instructions,
    tools=[my_native_tool],
    mcp_servers=mcp_servers,
)
```

## How telemetry is added

The OpenAI Agents SDK handles MCP tool calls internally. To add OTEL telemetry
for extension tracking, use the pre-built `create_instrumented_tool_filter`
from the `extension_telemetry` module (generated by Phase 2 of the
`sap-agent-extensibility` skill). It replaces `create_static_tool_filter` —
combining allowlist filtering with telemetry instrumentation in a single step.

> **Important**: The SDK's `extension_context()` sets OTel _baggage_ only
> (propagated to downstream services via HTTP headers). It does **not** set
> span attributes on the agent's own spans. `create_instrumented_tool_filter`
> handles both: baggage via `extension_context()` and explicit span attributes
> via `tracer.start_as_current_span()`.

> **Limitation**: The OpenAI Agents SDK does not expose a hook that runs
> _during_ tool execution — `tool_filter` runs at filter time (before the
> actual MCP call). The `extension_context` sets baggage that propagates
> correctly to the MCP server, but the tracer span created here will close
> before the tool executes. This is architecturally imperfect but acceptable
> as the baggage propagation (the primary purpose) works correctly.

```python
from extension_telemetry import create_instrumented_tool_filter


async def run_agent_with_telemetry(query: str, inbound_token: str = "", context=None) -> str:
    """Run the agent with telemetry-instrumented tools."""
    headers = context.call_context.state.get("headers", {}) if context and context.call_context else {}
    authorization = headers.get("authorization", "")
    claims = parse_token(authorization)
    tenant = claims.app_tid

    ext_impl = extensibility_client.get_extension_capability_implementation(
        tenant=tenant,
        capability_id="default",
    )

    # Token exchange (see complete example above for full pattern)
    exchanged_token = None
    if inbound_token and ext_impl.mcp_servers:
        exchanged_token = await IASTokenExchange().exchange(inbound_token)
    auth_headers = (
        {"Authorization": f"Bearer {exchanged_token}"} if exchanged_token else {}
    )

    mcp_servers = []
    for server in ext_impl.mcp_servers:
        gateway_url = (
            f"{AGENT_GATEWAY_HOST}/v1/mcp"
            f"/{server.ord_id}/{server.global_tenant_id}"
        )
        mcp_servers.append(
            MCPServerStreamableHTTP(
                url=gateway_url,
                name=server.ord_id,
                # Use instrumented filter instead of static filter
                tool_filter=create_instrumented_tool_filter(
                    allowed_tool_names=server.tool_names,
                    ext_impl=ext_impl,
                ),
                headers=auth_headers,
            )
        )

    agent = Agent(
        name="my-agent",
        instructions=instructions,
        mcp_servers=mcp_servers,
    )
    result = await Runner.run(agent, input=query)
    return result.final_output
```

This approach:

- Uses the pre-built `create_instrumented_tool_filter` from `extension_telemetry`
  (no need to define filter functions inline)
- Replaces `create_static_tool_filter` — filters **and** instruments in one step
- Creates both `extension_context` (baggage) and an explicit tracer span
  (attributes) for each allowed tool
- Extension metadata is visible in the agent's own traces, not just propagated
  to downstream services
- Preserves the original filtering behavior while adding telemetry
- See the limitation note above about filter-time vs call-time execution
