"""
app/agent.py — SAP App Foundation entry point.
Three decorator functions only (platform requirement).
"""
from sap_cloud_sdk.agent_decorators import agent_model, agent_config, prompt_section


@agent_model
def model() -> str:
    return "claude-opus-4-7"


@agent_config
def temperature() -> float:
    return 0.1


@prompt_section
def system_prompt() -> str:
    return (
        "CDM AS Tracker AI assistant. Routes CDM queries to specialist subagents "
        "(R&R, Pricing, Request Management, O2I). Maintains per-session conversation "
        "memory. Supports Client→Contract agent delegation and Inbox/PendingActions "
        "automation. Never hallucinates data — all answers come from CAP OData."
    )
