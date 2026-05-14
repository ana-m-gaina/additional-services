# Generic Python Integration (MCP SDK)

For frameworks without built-in MCP support, use the `mcp` Python SDK directly
to connect to MCP servers and convert tools to your framework's format.
Includes manual tool filtering.

MCP tool connections go through the **Agent Gateway** proxy. The agent builds
gateway URLs from the `McpServer`'s `ord_id` and `global_tenant_id`, and
authenticates using an IAS JWT-bearer token exchange.

> **Note**: This reference assumes Phase 2 (Add Telemetry Instrumentation) of the
> `sap-agent-extensibility` skill has been completed, which generates the
> `extension_telemetry/` module with OTEL-instrumented wrappers.

> **Conditionality**: This reference shows the full tools + instructions case.
> When implementing, only include the sections relevant to your configuration:
>
> - **Tools only**: Include MCP connection, tool filtering, and
>   telemetry, but omit the instruction handling sections.
> - **Instructions only**: Include the instruction handling section only. Omit
>   all MCP connection logic, `mcp` SDK imports, tool filtering/prefixing,
>   session management, and telemetry wrapping. Phase 2 (telemetry) should also
>   have been skipped.

## Complete example

```python
import logging
import os

from mcp import ClientSession
from mcp.client.streamable_http import streamablehttp_client

from sap_cloud_sdk.extensibility import (
    ExtensionCapabilityImplementation,
    create_client,
)
from sap_cloud_sdk.ias import parse_token
from services.token_exchange import IASTokenExchange

logger = logging.getLogger(__name__)

AGENT_GATEWAY_HOST = os.environ.get(
    "AGENT_GATEWAY_HOST", "https://eu12.access.sapdas.cloud.sap"
)


async def get_mcp_tools(
    ext_impl: ExtensionCapabilityImplementation,
    inbound_token: str = "",
):
    """Connect to MCP servers via Agent Gateway and retrieve filtered, prefixed tools.

    Returns a list of (session, transport, filtered_tools) tuples. The caller
    is responsible for keeping the sessions alive during agent execution.

    Args:
        ext_impl: ExtensionCapabilityImplementation with tool metadata.
        inbound_token: The inbound user JWT for token exchange.
    """
    results = []

    # Token exchange for Agent Gateway authentication
    exchanged_token = None
    if inbound_token and ext_impl.mcp_servers:
        try:
            exchanged_token = await IASTokenExchange().exchange(inbound_token)
        except Exception as e:
            logger.error("IAS token exchange failed: %s", e)

    auth_headers = (
        {"Authorization": f"Bearer {exchanged_token}"} if exchanged_token else {}
    )

    for server in ext_impl.mcp_servers:
        try:
            gateway_url = (
                f"{AGENT_GATEWAY_HOST}/v1/mcp"
                f"/{server.ord_id}/{server.global_tenant_id}"
            )

            transport = streamablehttp_client(gateway_url, headers=auth_headers)

            read, write, _ = await transport.__aenter__()
            session = ClientSession(read, write)
            await session.__aenter__()
            await session.initialize()

            tools_response = await session.list_tools()
            all_tool_names = [t.name for t in tools_response.tools]
            logger.info(f"Connected to {gateway_url}, tools: {all_tool_names}")

            # Filter to only approved tools
            allowed_names = set(server.tool_names)
            filtered_tools = [t for t in tools_response.tools if t.name in allowed_names]

            logger.info(
                f"Filtered to {len(filtered_tools)}/{len(all_tool_names)} tools"
            )
            results.append((session, transport, filtered_tools))

        except Exception as e:
            logger.warning(f"Failed to connect to MCP server at {gateway_url}: {e}")

    return results


async def call_mcp_tool(
    session: ClientSession, tool_info, arguments: dict, ext_impl=None,
):
    """Call a tool on an MCP server with telemetry instrumentation.

    Uses the extension_telemetry wrapper to automatically add OTEL span
    attributes for extension tracking.

    Args:
        session: The MCP client session.
        tool_info: Object with a ``mcp_tool_name`` attribute.
        arguments: Dictionary of arguments to pass to the tool.
        ext_impl: The extension implementation object from the extensibility
            client. Used to resolve per-tool source info.
    """
    from extension_telemetry import call_extension_tool

    result = await call_extension_tool(
        session, tool_info, arguments,
        ext_impl=ext_impl,
    )
    return result
```

## Key points

- You manage the MCP session lifecycle yourself (enter/exit context managers)
- Use **`session.list_tools()`** to discover available tools on each server
- Use **`session.call_tool(name, arguments=...)`** to invoke a tool
- MCP connections go through the **Agent Gateway** -- URLs are built from
  `server.ord_id` and `server.global_tenant_id`, not connected directly
- Authentication uses **IAS JWT-bearer token exchange** -- the inbound user token
  is exchanged for an agent-gateway scoped token via mTLS
- Only **Streamable HTTP** transport is used (the gateway does not support SSE)
- Convert the MCP tool schemas to your framework's tool format as needed
- Remember to close sessions and transports when done
- Tools are **filtered** manually to only the subset approved by the extensibility
  service
- `create_client("<agent_ord_id>")` is called once at application startup;
  `client.get_extension_capability_implementation(tenant=tenant)` is **synchronous** — no `await`.
  The client has an internal cache (LRU, 10-min TTL) keyed by `(tenant, capability_id)` —
  recreating it per request defeats caching

## How instructions are added

For direct OpenAI SDK usage, append as an additional system message:

```python
messages = [{"role": "system", "content": base_system_prompt}]
if ext_impl.instruction:
    messages.append({"role": "system", "content": ext_impl.instruction})
messages.append({"role": "user", "content": query})
```

For other frameworks, concatenate with the existing system prompt string:

```python
system_prompt = base_system_prompt
if ext_impl.instruction:
    system_prompt += f"\n\n{ext_impl.instruction}"
```

## How MCP tools are added

The generic pattern requires you to bridge between MCP tool schemas and your
framework's tool format. Here's the general approach:

```python
from extension_telemetry import call_extension_tool

# 1. Connect and filter tools
connections = await get_mcp_tools(ext_impl, inbound_token)

# 2. For each connection, convert filtered tools to your framework's format
for session, transport, filtered_tools in connections:
    for tool in filtered_tools:
        # tool.name — the tool name (e.g. "create_ticket")
        # tool.description — human-readable description
        # tool.inputSchema — JSON Schema for the tool's parameters
        # Convert these to your framework's tool definition format
        pass

# 3. When the agent wants to call a tool, find the matching server
#    and use the telemetry wrapper
for server in ext_impl.mcp_servers:
    for tool_name in server.tool_names:
        if requested_name == tool_name:
            # call_extension_tool automatically wraps with OTEL telemetry
            result = await call_extension_tool(
                session, server, tool_name,
                ext_impl=ext_impl,
            )
            break

# 4. Clean up when done
for session, transport, _ in connections:
    await session.__aexit__(None, None, None)
    await transport.__aexit__(None, None, None)
```

## How tools are filtered

The MCP SDK does not have a built-in tool filter. Filter the result of
`session.list_tools()` manually using `server.tool_names`:

```python
allowed_names = set(server.tool_names)
filtered_tools = [t for t in tools_response.tools if t.name in allowed_names]
```


## Using with `contextlib.AsyncExitStack`

For cleaner lifecycle management, use an `AsyncExitStack`:

```python
import contextlib

async with contextlib.AsyncExitStack() as stack:
    sessions = []

    # Token exchange for Agent Gateway authentication
    exchanged_token = None
    if inbound_token:
        exchanged_token = await IASTokenExchange().exchange(inbound_token)
    auth_headers = (
        {"Authorization": f"Bearer {exchanged_token}"} if exchanged_token else {}
    )

    for server in ext_impl.mcp_servers:
        gateway_url = (
            f"{AGENT_GATEWAY_HOST}/v1/mcp"
            f"/{server.ord_id}/{server.global_tenant_id}"
        )
        transport = streamablehttp_client(gateway_url, headers=auth_headers)

        read, write, _ = await stack.enter_async_context(transport)
        session = await stack.enter_async_context(ClientSession(read, write))
        await session.initialize()

        # Filter tools
        all_tools = await session.list_tools()
        allowed_names = set(server.tool_names)
        filtered = [t for t in all_tools if t.name in allowed_names]

        sessions.append((session, filtered))

    # Use sessions during agent execution...
    # All sessions and transports close automatically when the stack exits
```

## Graceful degradation

All integration patterns benefit from the built-in graceful degradation of
both `create_client()` and `client.get_extension_capability_implementation()`.

- `create_client()` **never raises** — if client creation fails (e.g., missing
  destination credentials), it logs the error and returns a no-op client that
  always returns empty results.
- `get_extension_capability_implementation()` **never raises** for runtime
  errors — it returns an empty result and logs the error.

This ensures the agent can always start and operate with its built-in tools,
whether extensions are configured or not. Here's an explicit pattern for
additional control:

```python
from sap_cloud_sdk.extensibility import create_client
from sap_cloud_sdk.ias import parse_token

# Application-scoped client (created once at startup)
extensibility_client = create_client("<agent_ord_id>")

# Per-request: extract tenant and fetch extension data
headers = context.call_context.state.get("headers", {}) if context.call_context else {}
authorization = headers.get("authorization", "")
claims = parse_token(authorization)
tenant = claims.app_tid

ext_impl = extensibility_client.get_extension_capability_implementation(
    tenant=tenant,
    capability_id="default",
)

# These checks are optional — the SDK already returns safe defaults
has_instruction = ext_impl.instruction is not None
has_servers = len(ext_impl.mcp_servers) > 0

if has_instruction:
    logger.info(f"Loaded {len(ext_impl.instruction)} chars of custom instructions")
if has_servers:
    logger.info(f"Loaded {len(ext_impl.mcp_servers)} MCP server(s)")
if not has_instruction and not has_servers:
    logger.info("No extensions configured — using default agent behavior")
```

The agent always works, whether extensions are configured or not. This is by
design — extensibility is additive, never breaking.
