"""Contract Subagent — scoped to a single contract SID."""
import logging
from app import cap_client, anthropic_client
from .models import HandoffContext

logger = logging.getLogger(__name__)


def capabilities() -> list[str]:
    return [
        "contract_context: answer questions scoped to a specific contract (SID)",
        "contract_price_lookup: look up prices in the context of a specific contract",
    ]


async def run(handoff: HandoffContext) -> str:
    contracts = await cap_client.get_contract_subagents(customer_id=handoff.customer_id)
    contract  = next((c for c in contracts if c["ID"] == handoff.contract_id), None)
    if not contract:
        return f"Contract subagent {handoff.contract_id} not found."

    sid = contract.get("sid", "")
    all_requests = await cap_client.get_open_requests()
    scoped = [r for r in all_requests if r.get("sid") == sid]

    context = "\n".join(
        f"- [{r['ID']}] {r.get('status','?')} | AS: {r.get('additionalServiceIds','—')} | Owner: {r.get('assignedCDM','?')}"
        for r in scoped
    ) or "No requests for this contract."

    customers = await cap_client.get_customer_agents()
    customer  = next((c for c in customers if c["ID"] == handoff.customer_id), None)
    customer_name = customer.get("displayName", "unknown") if customer else "unknown"

    system = (
        f"You are a specialist agent for contract SID: {sid} | "
        f"Type: {contract.get('contractType','?')} | Customer: {customer_name}.\n"
        f"HANDOFF CONTEXT: {handoff.summary}\n\n"
        f"CONTRACT REQUESTS:\n{context}\n\n"
        f"Be concise and focused. You handle only this contract context."
    )

    messages = list(handoff.recent_turns or [])
    messages.append({"role": "user", "content": handoff.message})
    return await anthropic_client.chat_with_history(system, messages)
