"""
LangChain tool wrapper with extension telemetry instrumentation.

Provides ``wrap_tool_with_telemetry``, a function that wraps a LangChain tool's
``invoke`` and ``ainvoke`` methods to add OpenTelemetry extension attributes.

Usage:
    from extension_telemetry import wrap_tool_with_telemetry

    for tool in mcp_tools:
        wrap_tool_with_telemetry(
            tool,
            ext_impl=ext_impl,
            server_ord_id=server.ord_id,
        )
"""

import logging
import time
from functools import wraps
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


def wrap_tool_with_telemetry(
    tool: Any,
    ext_impl: Any = None,
    capability: str = "default",
    server_ord_id: str = "",
) -> Any:
    """Wrap a LangChain tool's ``invoke`` and ``ainvoke`` with extension telemetry.

    Monkey-patches the tool's ``invoke`` and ``ainvoke`` methods to create both
    OTel *baggage* (via the SDK's ``extension_context``, propagated to downstream
    services) and a dedicated tracer span with all ``sap.extension.*``
    attributes so extension metadata is visible in the agent's own traces.

    Resolution of extension name, id, version, and solution_id is done
    internally via ``ext_impl.get_source_info_for_tool()``.

    Args:
        tool: A LangChain ``BaseTool`` instance.
        ext_impl: The extension implementation object from the extensibility
            client.  Used to resolve per-tool source info via
            ``get_source_info_for_tool()``.
        capability: Extension capability name (default: ``"default"``).
        server_ord_id: The MCP server's ORD ID (e.g.,
            ``"sap.mcp:apiResource:serviceNow:v1"``).  Passed to the SDK's
            ``get_source_info_for_tool()`` to derive the prefixed lookup key.

    Returns:
        The same tool object with its ``invoke`` and ``ainvoke`` methods wrapped.
    """
    source_info = (
        ext_impl.get_source_info_for_tool(tool.name, server_ord_id=server_ord_id)
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

    # Wrap synchronous invoke
    original_invoke = tool.invoke

    @wraps(original_invoke)
    def instrumented_invoke(*args: Any, **kwargs: Any) -> Any:
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
                logger.info("Calling extension tool: %s", tool.name)
                result = original_invoke(*args, **kwargs)
                logger.info("Extension tool completed: %s", tool.name)
                return result
        finally:
            record_tool_call_duration(time.monotonic() - t0)

    # Wrap async ainvoke
    original_ainvoke = tool.ainvoke

    @wraps(original_ainvoke)
    async def instrumented_ainvoke(*args: Any, **kwargs: Any) -> Any:
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
                logger.info("Calling extension tool: %s", tool.name)
                result = await original_ainvoke(*args, **kwargs)
                logger.info("Extension tool completed: %s", tool.name)
                return result
        finally:
            record_tool_call_duration(time.monotonic() - t0)

    # Use object.__setattr__ to bypass Pydantic v2's __setattr__ guard.
    object.__setattr__(tool, "invoke", instrumented_invoke)
    object.__setattr__(tool, "ainvoke", instrumented_ainvoke)
    return tool
