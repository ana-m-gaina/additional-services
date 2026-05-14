"""Shared state and helpers used by more than one tool module.

Currently contains:
  - pending_patches: cross-request staging dict for patch_meeting_note /
    confirm_meeting_note_patch handshake, keyed by session_id.
  - tool_span: context manager that wraps a tool invocation in an OTel span.
"""
import time
import logging
from contextlib import contextmanager

logger = logging.getLogger(__name__)

# Keyed by session_id; holds staged meeting note patches awaiting CDM confirmation.
# Must be a single shared dict instance; both patch_meeting_note and
# confirm_meeting_note_patch reference it.
pending_patches: dict = {}


@contextmanager
def tool_span(tool_name: str, session_id: str = "", cdm_email: str = ""):
    """
    Context manager that wraps business logic in an OTel execute_tool_span.
    Falls back gracefully when the SAP Cloud SDK is not available (local dev).

    Usage::

        with tool_span("rr_lookup", session_id=session_id, cdm_email=user_id) as span:
            # ... business logic ...
            if span:
                span.set_attribute("outcome", "success")

    The yielded value is the live OTel span object when the SDK is present,
    or None in local-dev mode — callers must guard with ``if span:``.
    """
    t0 = time.monotonic()
    span_ctx = None
    try:
        from sap_cloud_sdk.core.telemetry import execute_tool_span
        span_ctx = execute_tool_span(tool_name=tool_name, tool_type="function")
    except Exception:
        pass  # SDK not available in local dev

    if span_ctx is not None:
        try:
            with span_ctx as span:
                span.set_attribute("tool.name", tool_name)
                if session_id:
                    span.set_attribute("session_id", session_id)
                if cdm_email:
                    span.set_attribute("cdm_email", cdm_email)
                try:
                    yield span
                    duration_ms = int((time.monotonic() - t0) * 1000)
                    span.set_attribute("duration_ms", duration_ms)
                    span.set_attribute("outcome", "success")
                except Exception as exc:
                    duration_ms = int((time.monotonic() - t0) * 1000)
                    span.set_attribute("duration_ms", duration_ms)
                    span.set_attribute("outcome", "error")
                    try:
                        from opentelemetry.trace import StatusCode
                        span.record_exception(exc)
                        span.set_status(StatusCode.ERROR, str(exc))
                    except Exception:
                        pass
                    raise
        except Exception:
            raise
    else:
        # Local-dev fallback — no span available
        try:
            yield None
        except Exception as exc:
            logger.warning("[tool_span] %s error (no OTel): %s", tool_name, exc)
            raise
