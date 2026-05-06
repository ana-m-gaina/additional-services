import uuid
from dataclasses import dataclass, field


@dataclass
class HandoffContext:
    correlation_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    from_agent: str = "main_orchestrator"
    to_agent: str = ""
    intent: str = "general"
    customer_id: str = ""
    contract_id: str | None = None
    request_ids: list[str] = field(default_factory=list)
    summary: str = ""
    recent_turns: list[dict] = field(default_factory=list)
    message: str = ""
