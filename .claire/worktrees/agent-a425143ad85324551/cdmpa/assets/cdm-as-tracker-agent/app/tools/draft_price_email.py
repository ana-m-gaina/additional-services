"""Tool: draft_price_email — draft a price-communication email for an AS request."""
import json
from datetime import date, timedelta
from app import cap_client, anthropic_client

TOOL_SCHEMA = {
    "name": "draft_price_email",
    "description": "Draft a price-communication email for an AS request.",
    "input_schema": {
        "type": "object",
        "required": ["request_id", "customer_name", "service_codes", "prices"],
        "properties": {
            "request_id":    {"type": "string", "description": "The AS request ID"},
            "customer_name": {"type": "string", "description": "Customer display name for the salutation"},
            "service_codes": {"type": "array", "items": {"type": "string"}, "description": "List of service codes covered by the email"},
            "prices":        {"type": "object", "description": "Map of service_code → price string, e.g. {\"INFRA_1.8.10\": \"1500.00 EUR\"}"},
        },
    },
}


async def handle(tool_input: dict, *, user_id: str, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    await _activity("Drafting price communication email…")
    request_id = tool_input.get("request_id", "")
    if not request_id:
        return {"error": "request_id required"}
    record = await cap_client.get_as_request(request_id)

    # Resolve template: personal override → shared fallback
    tpl = await cap_client.get_personal_template(user_id, "price_email")
    if not tpl:
        tpl = await cap_client.get_shared_template("price_email")

    # Build substitution values from record
    price_valid = record.get("priceValidUntil") or ""
    if not price_valid and record.get("priceCommunicatedDate"):
        try:
            base = date.fromisoformat(record["priceCommunicatedDate"])
            price_valid = (base + timedelta(days=90)).isoformat()
        except Exception:
            pass
    if not price_valid:
        price_valid = (date.today() + timedelta(days=90)).isoformat()

    fields = {
        "customerName":    record.get("customerName", "Customer"),
        "customerAccountId": record.get("customerAccountId", ""),
        "sid":             record.get("sid", ""),
        "serviceCode":     record.get("serviceCode") or record.get("additionalServiceIds", ""),
        "serviceType":     record.get("serviceType", ""),
        "rrDescription":   record.get("rrDescription") or record.get("description", ""),
        "price":           str(record.get("price", "")),
        "currency":        record.get("currency", "EUR"),
        "priceInWords":    record.get("priceInWords", ""),
        "priceValidUntil": price_valid,
    }

    if tpl:
        # Fill placeholders in template; ask Claude to clean up any blanks
        body_raw = tpl.get("content") or tpl.get("body", "")
        subject_raw = tpl.get("subject", f"Additional Services Price Proposal — {fields['serviceCode']}")
        filled_body = body_raw
        filled_subject = subject_raw
        for k, v in fields.items():
            filled_body    = filled_body.replace("{{" + k + "}}", v)
            filled_subject = filled_subject.replace("{{" + k + "}}", v)

        # Only call model if there are unfilled placeholders
        if "{{" in filled_body:
            filled_body = await anthropic_client.chat(
                "You are filling in a SAP CDM price communication email template. Replace any remaining {{placeholder}} tokens with appropriate professional text based on the context. Do not change the structure or add new sections. Return only the completed email body.",
                f"RECORD: {json.dumps(fields)}\n\nTEMPLATE:\n{filled_body}"
            )
    else:
        # No template at all — generate structured email directly
        filled_subject = f"Additional Services Price Proposal — {fields['serviceCode']}"
        filled_body = await anthropic_client.chat(
            "Write a professional SAP CDM price communication email. Include: customer name, system SID, service code, service description, price with currency written out in words, price validity date (90 days). Use formal business English. Return only the email body, no subject line.",
            f"RECORD: {json.dumps(fields)}"
        )

    return {
        "draft": filled_body,
        "subject": filled_subject,
        "to": record.get("customerName", ""),
        "requestId": request_id,
        "serviceCode": fields["serviceCode"],
        "price": fields["price"],
        "currency": fields["currency"],
    }
