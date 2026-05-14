"""
Extension Telemetry - Instrumented wrappers for extension calls.

Provides framework-agnostic and framework-specific wrappers that automatically
add OpenTelemetry span attributes when calling extension tools.  Uses the
``extension_context`` context manager from the SAP Cloud SDK for Python to set
OTel baggage, and explicitly stamps span attributes on the agent's own spans for
visibility in agent-side traces.

Framework-agnostic utilities (always available — re-exported from the SDK):
    from extension_telemetry import (
        ExtensionType,
        call_extension_tool,
        call_extension_hook,
        emit_extensions_summary_span,
        reset_tool_call_metrics,
        get_tool_call_metrics,
        reset_hook_call_metrics,
        get_hook_call_metrics,
        ExtensionContextLogFilter,
    )

PydanticAI (requires ``pydantic-ai``):
    from extension_telemetry import InstrumentedToolset

LangChain (requires ``langchain-core``):
    from extension_telemetry import wrap_tool_with_telemetry

OpenAI Agents SDK (requires ``openai-agents``):
    from extension_telemetry import create_instrumented_tool_filter
"""

from sap_cloud_sdk.core.telemetry import (
    ExtensionType,
    call_extension_tool,
    call_extension_hook,
    emit_extensions_summary_span,
    reset_tool_call_metrics,
    get_tool_call_metrics,
    reset_hook_call_metrics,
    get_hook_call_metrics,
    record_tool_call_duration,
    record_hook_call_duration,
    ExtensionContextLogFilter,
)

# Framework-specific wrappers are loaded lazily so that importing this package
# never fails due to a missing AI framework dependency.  Users only hit an
# ImportError when they actually reference a name that requires a framework
# they haven't installed.

_LAZY_IMPORTS: dict[str, tuple[str, str]] = {
    # (module_path, attribute_name)
    "InstrumentedToolset": ("._pydantic_ai", "InstrumentedToolset"),
    "wrap_tool_with_telemetry": ("._langchain", "wrap_tool_with_telemetry"),
    "create_instrumented_tool_filter": (
        "._openai_agents",
        "create_instrumented_tool_filter",
    ),
}

_FRAMEWORK_HINTS: dict[str, str] = {
    "InstrumentedToolset": "pydantic-ai  (pip install pydantic-ai)",
    "wrap_tool_with_telemetry": "langchain-core  (pip install langchain-core)",
    "create_instrumented_tool_filter": "openai-agents  (pip install openai-agents)",
}


def __getattr__(name: str) -> object:
    if name in _LAZY_IMPORTS:
        module_path, attr_name = _LAZY_IMPORTS[name]
        try:
            import importlib

            module = importlib.import_module(module_path, package=__name__)
            value = getattr(module, attr_name)
            # Cache on the module so __getattr__ is not called again
            globals()[name] = value
            return value
        except ImportError as exc:
            hint = _FRAMEWORK_HINTS.get(name, "")
            raise ImportError(
                f"'{name}' requires {hint} to be installed. Install it and try again."
            ) from exc
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


__all__ = [
    # Framework-agnostic (re-exported from SDK)
    "ExtensionType",
    "call_extension_tool",
    "call_extension_hook",
    "emit_extensions_summary_span",
    "reset_tool_call_metrics",
    "get_tool_call_metrics",
    "reset_hook_call_metrics",
    "get_hook_call_metrics",
    "record_tool_call_duration",
    "record_hook_call_duration",
    # Log filter (re-exported from SDK)
    "ExtensionContextLogFilter",
    # PydanticAI (lazy)
    "InstrumentedToolset",
    # LangChain (lazy)
    "wrap_tool_with_telemetry",
    # OpenAI Agents SDK (lazy)
    "create_instrumented_tool_filter",
]
