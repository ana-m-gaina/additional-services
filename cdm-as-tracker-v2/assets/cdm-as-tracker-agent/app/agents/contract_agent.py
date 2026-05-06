"""Contract Subagent — scoped to a single contract SID."""
import logging
from app import cap_client, anthropic_client

logger = logging.getLogger(__name__)


async def run(
    contract_id: str,
    client_id: str,
    handoff_summary: str,
    message: str,
    recent_turns: list | None = None,
) -> str:
    contracts = await cap_client.get_contract_subagents(client_id=client_id)
    contract  = next((c for c in contracts if c["ID"] == contract_id), None)
    if not contract:
        return f"Contract subagent {contract_id} not found."

    sid = contract.get("sid", "")
    all_requests = await cap_client.get_open_requests()
    scoped = [r for r in all_requests if r.get("sid") == sid]

    context = "\n".join(
        f"- [{r['ID']}] {r.get('status','?')} | AS: {r.get('additionalServiceIds','—')} | Owner: {r.get('assignedCDM','?')}"
        for r in scoped
    ) or "No requests for this contract."

    clients = await cap_client.get_client_agents()
    client  = next((c for c in clients if c["ID"] == client_id), None)
    customer_name = client.get("displayName", "unknown") if client else "unknown"

    system = (
        f"You are a specialist agent for contract SID: {sid} | "
        f"Type: {contract.get('contractType','?')} | Customer: {customer_name}.\n"
        f"HANDOFF CONTEXT: {handoff_summary}\n\n"
        f"CONTRACT REQUESTS:\n{context}\n\n"
        f"Be concise and focused. You handle only this contract context."
    )

    messages = list(recent_turns or [])
    messages.append({"role": "user", "content": message})
    return await anthropic_client.chat_with_history(system, messages)
