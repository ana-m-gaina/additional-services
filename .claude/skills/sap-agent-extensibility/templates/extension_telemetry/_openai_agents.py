"""
OpenAI Agents SDK tool filter with extension telemetry instrumentation.

Provides ``create_instrumented_tool_filter``, a factory that returns an
async tool filter function compatible with the OpenAI Agents SDK's
``MCPServerStreamableHTTP(tool_filter=...)`` parameter.

Usage:
    from extension_telemetry import create_instrumented_tool_filter

    server = MCPServerStreamableHTTP(
        url=server.url,
        name=server.ord_id,
        tool_filter=create_instrumented_tool_filter(
            allowed_tool_names=server.tool_names,
            ext_impl=ext_impl,
        ),
    )

.. warning::

    The ``ContextVar``-based tool call duration captured here reflects
    **filter evaluation time**, not actual tool execution time.  The OpenAI
    Agents SDK's ``Runner.run()`` makes the real MCP calls later, outside
    any extension context.
"""

import logging
import time
from typing import Any

from sap_cloud_sdk.core.telemetry import (
    ATTR_CAPABILITY_ID,
    ATTR_EXTENSION_ID,
    ATTR_EXTENSION_ITEM_NAME,
    ATTR_EXTENSION_NAME,
    ATTR_EXTENSION_TYPE,
    ATTR_EXTENSION_VERSION,
    ATTR_IS_EXTENSION,
    ATTR_SOLUTION_ID,
    ExtensionType,
    extension_context,
    record_tool_call_duration,
)
from opentelemetry import trace

logger = logging.getLogger(__name__)


def _get_tracer():
    """Get tracer lazily to avoid stale references from TracerProvider swaps."""
    return trace.get_tracer("sap.cloud_sdk.extension")


def create_instrumented_tool_filter(
    allowed_tool_names: list[str],
    ext_impl: Any = None,
    capability: str = "default",
    server_ord_id: str = "",
) -> Any:
    """Create a tool filter that adds telemetry instrumentation.

    Resolution of extension name, id, version, and solution_id is done internally
    per-call via ``ext_impl.get_source_info_for_tool()``.

    Args:
        allowed_tool_names: List of tool names to allow.
        ext_impl: The extension implementation object from the extensibility
            client.  Used to resolve per-tool source info via
            ``get_source_info_for_tool()``.
        capability: Extension capability name (default: ``"default"``).
        server_ord_id: The MCP server's ORD ID (e.g.,
            ``"sap.mcp:apiResource:serviceNow:v1"``).  Passed to the SDK's
            ``get_source_info_for_tool()`` to derive the prefixed lookup key.

    Returns:
        An async callable compatible with the ``tool_filter`` parameter of
        ``MCPServerStreamableHTTP``.
    """
    allowed_set = set(allowed_tool_names)

    async def instrumented_filter(context: Any, tool: Any) -> bool:
        if tool.name not in allowed_set:
            return False

        source_info = (
            ext_impl.get_source_info_for_tool(
                tool.name, server_ord_id=server_ord_id
            )
            if ext_impl
            else None
        )

        resolved_name = source_info.extension_name if source_info else "unknown"
        resolved_id = source_info.extension_id if source_info else ""
        resolved_version = str(source_info.extension_version) if source_info else ""
        resolved_solution_id = getattr(source_info, "solution_id", "") or "" if source_info else ""
        item_name = tool.name

        _attrs = {
            ATTR_IS_EXTENSION: True,
            ATTR_EXTENSION_TYPE: ExtensionType.TOOL.value,
            ATTR_CAPABILITY_ID: capability,
            ATTR_EXTENSION_ID: resolved_id,
            ATTR_EXTENSION_NAME: resolved_name,
            ATTR_EXTENSION_VERSION: resolved_version,
            ATTR_EXTENSION_ITEM_NAME: item_name,
            ATTR_SOLUTION_ID: resolved_solution_id,
        }

        t0 = time.monotonic()
        try:
            with (
                extension_context(
                    capability_id=capability,
                    extension_name=resolved_name,
                    extension_type=ExtensionType.TOOL,
                    extension_id=resolved_id,
                    extension_version=resolved_version,
                    item_name=item_name,
                    solution_id=resolved_solution_id,
                ),
                _get_tracer().start_as_current_span(
                    f"extension_tool {tool.name}",
                    attributes=_attrs,
                ),
            ):
                logger.info("Extension tool filter matched: %s", tool.name)
                return True
        finally:
            record_tool_call_duration(time.monotonic() - t0)

    return instrumented_filter
