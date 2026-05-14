"""
PydanticAI toolset wrapper with extension telemetry instrumentation.

Provides ``InstrumentedToolset``, a ``WrapperToolset`` subclass that intercepts
every ``call_tool`` invocation to add OpenTelemetry extension attributes.  This
is the recommended way to add extension telemetry when using PydanticAI's
built-in MCP toolset support (``.filtered()``, ``.prefixed()``).

Usage:
    from extension_telemetry import InstrumentedToolset

    instrumented = InstrumentedToolset(
        wrapped=filtered_server,
        ext_impl=ext_impl,
    )
"""

import logging
import time
from dataclasses import dataclass, field
from typing import Any

from opentelemetry import trace
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

logger = logging.getLogger(__name__)
from pydantic_ai.toolsets.wrapper import WrapperToolset


def _get_tracer():
    """Get tracer lazily to avoid stale references from TracerProvider swaps."""
    return trace.get_tracer("sap.cloud_sdk.extension")


@dataclass
class InstrumentedToolset(WrapperToolset):
    """Toolset wrapper that adds OTel extension attributes on every tool call.

    Intercepts ``call_tool`` to set both OTel *baggage* (via the SDK's
    ``extension_context``) and explicit span attributes so extension
    metadata is visible in the agent's own traces.

    Resolution of extension name, id, version, and solution_id is done internally
    per-call via ``ext_impl.get_source_info_for_tool()``.

    Args:
        wrapped: The inner toolset (typically a filtered MCP server).
        ext_impl: The extension implementation object from the extensibility
            client.  Used to resolve per-tool source info via
            ``get_source_info_for_tool()``.
        capability: Extension capability name (default: ``"default"``).
        server_ord_id: The MCP server's ORD ID (e.g.,
            ``"sap.mcp:apiResource:serviceNow:v1"``).  Passed to the SDK's
            ``get_source_info_for_tool()`` to derive the prefixed lookup key.
    """

    ext_impl: Any = None
    capability: str = "default"
    server_ord_id: str = ""

    async def call_tool(self, name: str, tool_args: Any, ctx: Any, tool: Any) -> Any:
        """Call a tool with extension telemetry instrumentation."""
        source_info = (
            self.ext_impl.get_source_info_for_tool(
                name, server_ord_id=self.server_ord_id
            )
            if self.ext_impl
            else None
        )

        resolved_name = source_info.extension_name if source_info else "unknown"
        resolved_id = source_info.extension_id if source_info else ""
        resolved_version = str(source_info.extension_version) if source_info else ""
        resolved_solution_id = getattr(source_info, "solution_id", "") or "" if source_info else ""

        _attrs = {
            ATTR_IS_EXTENSION: True,
            ATTR_EXTENSION_TYPE: ExtensionType.TOOL.value,
            ATTR_CAPABILITY_ID: self.capability,
            ATTR_EXTENSION_ID: resolved_id,
            ATTR_EXTENSION_NAME: resolved_name,
            ATTR_EXTENSION_VERSION: resolved_version,
            ATTR_EXTENSION_ITEM_NAME: name,
            ATTR_SOLUTION_ID: resolved_solution_id,
        }

        t0 = time.monotonic()
        try:
            with (
                extension_context(
                    capability_id=self.capability,
                    extension_name=resolved_name,
                    extension_type=ExtensionType.TOOL,
                    extension_id=resolved_id,
                    extension_version=resolved_version,
                    item_name=name,
                    solution_id=resolved_solution_id,
                ),
                _get_tracer().start_as_current_span(
                    f"extension_tool {name}",
                    attributes=_attrs,
                ),
            ):
                logger.info("Calling extension tool: %s", name)
                result = await super().call_tool(name, tool_args, ctx, tool)
                logger.info("Extension tool completed: %s", name)
                return result
        finally:
            record_tool_call_duration(time.monotonic() - t0)
