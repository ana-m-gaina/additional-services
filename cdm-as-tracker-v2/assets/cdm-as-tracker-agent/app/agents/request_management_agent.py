"""Request Management specialist subagent — AS request lifecycle operations."""
import logging
from app import cap_client, anthropic_client

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "You are an expert on the CDM Additional Services request lifecycle "
    "(New→PriceCommunicated→Approved→InDelivery→Delivered→Invoiced). "
    "Always present extracted data for CDM confirmation before creating or updating records. "
    "Never write without confirmation. Never hallucinate request data."
)


def capabilities() -> list[str]:
    return [
        "status_inquiry: explain current request status and next steps",
        "status_advance: guide advancing a request through the approval workflow",
    ]


async def run(query: str, cdm_email: str | None = None) -> str:
    records = await cap_client.get_open_requests(cdm_email=cdm_email)
    context = "\n".join(
        f"- [{r['ID']}] {r.get('customerName','?')} | {r.get('status','?')} "
        f"| AS: {r.get('additionalServiceIds') or r.get('serviceCode','—')} "
        f"| CDM: {r.get('assignedCDM') or r.get('cdmOwner','?')}"
        for r in records
    ) or "No open requests."
    system = f"{_SYSTEM_PROMPT}\n\nOPEN REQUESTS:\n{context}"
    return await anthropic_client.chat(system, query)
