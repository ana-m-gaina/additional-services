"""O2I specialist subagent — JIRA Order-to-Invoice ticket generation."""
import logging
from app import cap_client, anthropic_client

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "You are an expert on the CDM JIRA Order-to-Invoice process. "
    "Generate JIRA ticket bodies and present them for CDM review. "
    "Never mark a request as Invoiced without explicit CDM confirmation."
)


async def run(query: str, cdm_email: str | None = None) -> str:
    all_requests = await cap_client.get_open_requests(cdm_email=cdm_email)
    invoiceable  = [r for r in all_requests if r.get("status") == "Delivered"]
    context = "\n".join(
        f"- [{r['ID']}] {r.get('customerName','?')} | "
        f"AS: {r.get('additionalServiceIds') or r.get('serviceCode','—')} | "
        f"Price: {r.get('price','?')} {r.get('currency','EUR')}"
        for r in invoiceable
    ) or "No requests ready for invoicing."
    system = f"{_SYSTEM_PROMPT}\n\nINVOICEABLE REQUESTS (status=Delivered):\n{context}"
    return await anthropic_client.chat(system, query)
