"""Client Orchestrator subagent — scoped to a single customer."""
import logging
from app import cap_client, anthropic_client
from .models import HandoffContext

logger = logging.getLogger(__name__)


def capabilities() -> list[str]:
    return [
        "client_context: answer questions scoped to a specific customer",
        "draft_price_email: draft a pricing communication email for a customer",
    ]


async def run(handoff: HandoffContext) -> str:
    clients = await cap_client.get_client_agents()
    client  = next((c for c in clients if c["ID"] == handoff.customer_id), None)
    if not client:
        return f"Client agent {handoff.customer_id} not found."

    customer_requests = await cap_client.get_open_requests()
    customer_id = client.get("customerId", "")
    scoped = [
        r for r in customer_requests
        if customer_id.lower() in r.get("customerName", "").lower()
    ]

    context = "\n".join(
        f"- [{r['ID']}] {r.get('status','?')} | AS: {r.get('additionalServiceIds','—')}"
        for r in scoped
    ) or "No requests for this customer."

    system = (
        f"You are a specialist agent for customer: {client.get('displayName','?')} ({customer_id}).\n"
        f"HANDOFF CONTEXT: {handoff.summary}\n\n"
        f"CUSTOMER REQUESTS:\n{context}\n\n"
        f"Be concise and focused. You handle only this customer's context."
    )

    messages = list(handoff.recent_turns or [])
    messages.append({"role": "user", "content": handoff.message})
    return await anthropic_client.chat_with_history(system, messages)
