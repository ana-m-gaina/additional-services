# LangChain / LangGraph Integration

Integration pattern using LangChain with `langchain-mcp-adapters` for MCP tool
support. Includes manual tool filtering (LangChain does not provide built-in
support for this).

MCP tool connections go through the **Agent Gateway** proxy. The agent builds
gateway URLs from the `McpServer`'s `ord_id` and `global_tenant_id`, and
authenticates using an IAS JWT-bearer token exchange.

> **Note**: This reference assumes Phase 2 (Add Telemetry Instrumentation) of the
> `sap-agent-extensibility` skill has been completed, which generates the
> `extension_telemetry/` module with OTEL-instrumented wrappers.

> **Conditionality**: This reference shows the full tools + instructions case.
> When implementing, only include the sections relevant to your configuration:
>
> - **Tools only**: Include MCP server config, tool filtering, and
>   telemetry, but omit the instruction concatenation to the system prompt.
> - **Instructions only**: Include the instruction concatenation to the system
>   prompt, but omit `langchain-mcp-adapters`, `MultiServerMCPClient`, tool
>   filtering/prefixing, and telemetry wrapping entirely. Phase 2 (telemetry)
>   should also have been skipped.

## How MultiServerMCPClient works

`MultiServerMCPClient` from `langchain-mcp-adapters` manages connections to
multiple MCP servers and exposes their tools as LangChain-compatible objects.

Key behavior:
- **Stateless by default** — each tool call creates a fresh session. No
  `async with` context manager is needed for basic usage.
- **Transport options** — supports `"streamable_http"` (remote) and `"stdio"` (local)
- **Authentication** — pass `headers` in the connection config for Bearer tokens
- **Tool name prefixing** — set `tool_name_prefix=True` to prefix tool names
  with the server name (prevents naming collisions across servers)

Constructor:
```python
client = MultiServerMCPClient(
    connections={...},           # dict[str, Connection] — server configs
    tool_name_prefix=True,      # prefix tool names with server name
)
```

Getting tools (no context manager needed):
```python
tools = await client.get_tools()
```

## Complete example

```python
import logging
import os

from langchain_core.messages import HumanMessage, SystemMessage
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

from sap_cloud_sdk.extensibility import create_client
from sap_cloud_sdk.ias import parse_token
from extension_telemetry import wrap_tool_with_telemetry
from services.token_exchange import IASTokenExchange

logger = logging.getLogger(__name__)

BASE_SYSTEM_PROMPT = "You are a helpful assistant."

AGENT_GATEWAY_HOST = os.environ.get(
    "AGENT_GATEWAY_HOST", "https://eu12.access.sapdas.cloud.sap"
)

# Create extensibility client once at module level
extensibility_client = create_client("<agent_ord_id>")


async def run_agent(query: str, inbound_token: str = "", context=None) -> str:
    """Run the LangChain agent with extensibility support."""

    # Step 1: Extract tenant and fetch extensions
    headers = context.call_context.state.get("headers", {}) if context and context.call_context else {}
    authorization = headers.get("authorization", "")
    claims = parse_token(authorization)
    tenant = claims.app_tid

    ext_impl = extensibility_client.get_extension_capability_implementation(
        tenant=tenant,
        capability_id="default",
    )

    # Step 2: Build system prompt with extended instructions
    system_prompt = BASE_SYSTEM_PROMPT
    if ext_impl.instruction:
        system_prompt += f"\n\n## Extended Instructions\n{ext_impl.instruction}"
        logger.info("Loaded extension instruction (%d chars)", len(ext_impl.instruction))

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

    # Step 4: Build MCP server config via Agent Gateway and get tools
    # MultiServerMCPClient is stateless by default — each tool call opens a
    # fresh session, so no context manager is needed. This means extension
    # tools can be mixed freely with the agent's existing tools.
    ext_tools = []
    if ext_impl.mcp_servers:
        mcp_servers = {}
        tool_name_to_server = {}
        for server in ext_impl.mcp_servers:
            gateway_url = (
                f"{AGENT_GATEWAY_HOST}/v1/mcp"
                f"/{server.ord_id}/{server.global_tenant_id}"
            )
            server_key = server.ord_id.split(":")[-1] or "ext"
            mcp_servers[server_key] = {
                "url": gateway_url,
                "transport": "streamable_http",
                "headers": auth_headers,
            }
            for name in (server.tool_names or []):
                tool_name_to_server[name] = server

        try:
            client = MultiServerMCPClient(mcp_servers)
            mcp_tools = await client.get_tools()

            # Filter to only approved tools
            ext_tools = [t for t in mcp_tools if t.name in tool_name_to_server]

            # If Phase 2 (telemetry) was done, wrap each tool with instrumentation
            for tool in ext_tools:
                wrap_tool_with_telemetry(tool, ext_impl=ext_impl)

            logger.info("Found %d extension tool(s)", len(ext_tools))
        except Exception as e:
            logger.warning("Extension MCP servers unavailable: %s. Continuing without extension tools.", e)

    # Step 5: Create agent with existing tools + extension tools
    existing_tools = [...]  # your agent's built-in tools
    all_tools = existing_tools + ext_tools
    agent = create_react_agent(model, all_tools)

    result = await agent.ainvoke({
        "messages": [
            SystemMessage(content=system_prompt),
            HumanMessage(content=query),
        ]
    })
    return result["messages"][-1].content
```

## Key points

- **`langchain-mcp-adapters`** provides `MultiServerMCPClient` for connecting to
  multiple MCP servers simultaneously
- **Stateless by default** — no `async with` context manager needed. Each tool
  call opens a fresh session. This means extension tools can be fetched once and
  merged with existing tools without lifecycle concerns.
- MCP connections go through the **Agent Gateway** — URLs are built from
  `server.ord_id` and `server.global_tenant_id`, not connected directly
- Authentication uses **IAS JWT-bearer token exchange** — the inbound user token
  is exchanged for an agent-gateway scoped token via mTLS
- Extended instructions are appended to the system message
- MCP tools from `client.get_tools()` can be mixed with native LangChain tools
- **Fail-open behavior**: MCP connection is wrapped in try/except — unavailable
  extension servers are logged and skipped
- Tools are **filtered** manually to only the subset approved by the extensibility
  service (LangChain has no built-in tool filter)
- `create_client("<agent_ord_id>")` is called once at module level;
  `client.get_extension_capability_implementation(tenant=tenant)` is **synchronous** — no `await`.
  The client has an internal cache (LRU, 10-min TTL) keyed by `(tenant, capability_id)` —
  recreating it per request defeats caching

## How instructions are added

LangChain doesn't have a separate instructions parameter. Append extended
instructions to the system message:

```python
system_prompt = BASE_SYSTEM_PROMPT
if ext_impl.instruction:
    system_prompt += f"\n\n## Extended Instructions\n{ext_impl.instruction}"
```

## How MCP tools are added

`MultiServerMCPClient` is stateless — instantiate it with your server config,
call `get_tools()`, and the returned tools handle their own connections per call:

```python
client = MultiServerMCPClient(mcp_servers)
mcp_tools = await client.get_tools()

# Mix with any existing native tools
all_tools = native_tools + mcp_tools
agent = create_react_agent(model, all_tools)
```

No context manager is required. The tools manage their own session lifecycle.

## How tools are filtered

LangChain does not have a built-in tool filtering mechanism for MCP servers.
Filter the tool list manually after loading all tools from `get_tools()`,
using `server.tool_names` from each `McpServer`:

```python
# Build a lookup from tool name -> server
tool_name_to_server = {}
for server in ext_impl.mcp_servers:
    for name in server.tool_names:
        tool_name_to_server[name] = server

mcp_tools = await client.get_tools()
filtered_tools = [t for t in mcp_tools if t.name in tool_name_to_server]
```

Because `get_tools()` returns tools from all connected servers together, match
each tool's name against the lookup to determine which server it belongs to.

## Mixing with native LangChain tools

Extension tools can be combined with `@tool`-decorated functions and other
tool sources. Because `MultiServerMCPClient` is stateless, the tools it
returns are self-contained — no open connection to manage:

```python
from langchain_core.tools import tool

@tool
def my_native_tool(param: str) -> str:
    """A native LangChain tool."""
    return f"Result: {param}"

client = MultiServerMCPClient(mcp_servers)
mcp_tools = await client.get_tools()
filtered_tools = [t for t in mcp_tools if t.name in tool_name_to_server]
all_tools = [my_native_tool] + filtered_tools
agent = create_react_agent(model, all_tools)
```

## How telemetry is added

Use the pre-built `wrap_tool_with_telemetry` function from the
`extension_telemetry` module (generated by Phase 2 of the
`sap-agent-extensibility` skill). It wraps each tool's `invoke` and `ainvoke`
methods to create a dedicated tracer span with explicit extension attributes.
Both sync and async paths must be patched because LangGraph's
`create_react_agent` uses `ainvoke` internally when the agent is called via
`agent.ainvoke()`.

> **Important**: The SDK's `extension_context()` sets OTel _baggage_ only
> (propagated to downstream services via HTTP headers). It does **not** set
> span attributes on the agent's own spans. `wrap_tool_with_telemetry` handles
> both: baggage via `extension_context()` and explicit span attributes via
> `tracer.start_as_current_span()`.

```python
from extension_telemetry import wrap_tool_with_telemetry

# After filtering tools:
for tool in filtered_tools:
    wrap_tool_with_telemetry(tool, ext_impl=ext_impl)
```

This approach:

- Uses the pre-built `wrap_tool_with_telemetry` from `extension_telemetry`
  (no need to define wrapper functions inline)
- Wraps each tool's `invoke` and `ainvoke` methods with both `extension_context`
  (baggage) and a dedicated tracer span (explicit `sap.extension.*` attributes).
  Both paths are patched because LangGraph's `create_react_agent` uses the async
  path (`ainvoke`) internally when the agent is called via `agent.ainvoke()`.
- Extension metadata is visible in the agent's own traces, not just propagated
  to downstream services
- Preserves the original tool behavior while adding telemetry
