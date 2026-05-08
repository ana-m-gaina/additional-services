"""
Pricing data ingestion — reads the AS Pricing xlsm, builds one chunk per service
entry, embeds with Anthropic Voyage, stores in CAP PricingChunks.

Setup (one-time):
  1. Set ANTHROPIC_API_KEY in .env
  2. Install deps:    pip install -r requirements.txt
  3. Start CAP:       cd ../cdm-as-tracker-cap && cds watch

Usage:
  python scripts/ingest_pricing.py
  python scripts/ingest_pricing.py --xlsm /path/to/pricing.xlsm --cap-url http://localhost:4004
"""
import argparse
import asyncio
import json
import logging
import os
from pathlib import Path

import httpx
import openpyxl

logging.basicConfig(level=logging.INFO, format="%(levelname)s  %(message)s")
log = logging.getLogger(__name__)

DEFAULT_XLSM = Path(__file__).resolve().parents[4] / "specs" / \
    "SAP_Enterprise_Cloud_Services_Additional Service Pricing List January2026.xlsm"
DEFAULT_CAP_URL = "http://localhost:4004"
VOYAGE_URL      = "https://api.anthropic.com/v1/embeddings"
EMBED_MODEL     = "voyage-3"
CAP_USER        = os.environ.get("CAP_USER", "pricingadmin")
CAP_PASSWORD    = os.environ.get("CAP_PASSWORD", "pricingadmin")


# ── Extract entries from xlsm ─────────────────────────────────────────────────

def _extract_entries(xlsm_path: Path) -> list[dict]:
    wb = openpyxl.load_workbook(str(xlsm_path), read_only=True, data_only=True)

    # Complete+Efforts: Identifier, Task, Responsibility, Delivery, Remarks_PCE, ...
    # cols: 0=Identifier, 1=Task, 2=Responsibility/Category, 4=Remarks for PCE,
    #       17=Calculation Units (effort type), 18=Effort, 19=unit of measure
    ce_entries: dict[str, dict] = {}
    ce_ws = wb["Complete+Efforts"]
    headers_found = False
    for row in ce_ws.iter_rows(values_only=True):
        if row[0] == "Identifier":
            headers_found = True
            continue
        if not headers_found:
            continue
        code = row[0]
        if not code or not isinstance(code, str) or "_" not in code:
            continue
        ce_entries[code] = {
            "code":         code,
            "task":         str(row[1] or "").strip(),
            "category":     str(row[2] or "").strip(),
            "remarks_pce":  str(row[4] or "").strip(),
            "effort_type":  str(row[18] or "").strip(),
            "unit_measure": str(row[19] or "").strip(),
        }

    # Additional_Service_Pricing: rows 22+ have actual EUR prices for PCE
    # cols: 0=service+name, 4=Price per Execution EUR, 7=Remarks
    pricing_ws = wb["Additional_Service_Pricing"]
    price_map: dict[str, float] = {}
    for row in pricing_ws.iter_rows(min_row=22, values_only=True):
        cell0 = str(row[0] or "")
        if not cell0 or "_" not in cell0:
            continue
        code = cell0.split(" - ")[0].split(" ")[0].strip()
        price = row[4]
        if isinstance(price, (int, float)) and price > 0:
            price_map[code] = float(price)

    # Leadtime sheet: code, title, duration_min, leadtime_hours, description
    lt_ws = wb["Leadtime+Execution_optional_IDs"]
    lt_data: dict[str, dict] = {}
    for row in lt_ws.iter_rows(min_row=2, values_only=True):
        code = row[0]
        if not code or not isinstance(code, str) or "_" not in code:
            continue
        if code not in lt_data:
            lt_data[code] = {
                "title":           str(row[1] or "").strip(),
                "duration_min":    row[5],
                "leadtime_hours":  row[6],
                "sr_description":  str(row[7] or "").strip()[:500],
            }

    # Merge everything, keep only Additional Service entries
    entries = []
    for code, d in ce_entries.items():
        if "Additional" not in d.get("category", ""):
            continue
        lt = lt_data.get(code, {})
        price = price_map.get(code)

        # Build a dense text chunk for embedding
        lines = [
            f"Service Code: {code}",
            f"Name: {d['task']}",
            f"Category: Additional Service",
        ]
        if d["unit_measure"]:
            lines.append(f"Unit of Measure: {d['unit_measure']}")
        if d["effort_type"] and d["effort_type"] != "via Macro":
            lines.append(f"Effort: {d['effort_type']}")
        if price:
            lines.append(f"Price: {price:.2f} EUR per {d['unit_measure'] or 'execution'}")
        else:
            lines.append("Price: Case-by-case (contact topic owner for estimate)")
        if lt.get("duration_min"):
            lines.append(f"Execution Duration: ~{lt['duration_min']} min")
        if lt.get("leadtime_hours"):
            lines.append(f"Lead Time: ~{lt['leadtime_hours']} hours")
        if d["remarks_pce"]:
            lines.append(f"Remarks (PCE): {d['remarks_pce'][:400]}")
        if lt.get("sr_description"):
            lines.append(f"Description: {lt['sr_description'][:400]}")

        entries.append({
            "code":        code,
            "text":        "\n".join(lines),
            "price_eur":   price,
            "unit_measure": d["unit_measure"],
            "effort_type": d["effort_type"],
        })

    log.info("Extracted %d Additional Service entries from xlsm", len(entries))
    return entries


# ── Voyage embedding ─────────────────────────────────────────────────────────

async def _embed(text: str) -> list[float]:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    async with httpx.AsyncClient(timeout=60.0) as c:
        resp = await c.post(
            VOYAGE_URL,
            headers={"x-api-key": api_key, "anthropic-version": "2023-06-01"},
            json={"model": EMBED_MODEL, "input": [text]},
        )
        resp.raise_for_status()
    return resp.json()["data"][0]["embedding"]


# ── CAP helpers ───────────────────────────────────────────────────────────────

async def _cap_get(cap: httpx.AsyncClient, cap_url: str, path: str) -> dict:
    resp = await cap.get(f"{cap_url}/AdminService/{path}", timeout=30.0)
    resp.raise_for_status()
    return resp.json()


async def _cap_post(cap: httpx.AsyncClient, cap_url: str, path: str, data: dict) -> dict:
    resp = await cap.post(f"{cap_url}/AdminService/{path}", json=data, timeout=30.0)
    resp.raise_for_status()
    return resp.json()


async def _cap_delete(cap: httpx.AsyncClient, cap_url: str, path: str) -> None:
    resp = await cap.delete(f"{cap_url}/AdminService/{path}", timeout=30.0)
    resp.raise_for_status()


# ── Main ──────────────────────────────────────────────────────────────────────

async def ingest(xlsm_path: Path, cap_url: str) -> None:
    entries = _extract_entries(xlsm_path)
    if not entries:
        log.error("No entries found — check xlsm path")
        return

    auth = (CAP_USER, CAP_PASSWORD)
    async with httpx.AsyncClient(auth=auth, headers={"Accept": "application/json"}) as cap:
        # Check existing chunks to allow idempotent re-runs
        existing = await _cap_get(cap, cap_url, "PricingChunks?$select=serviceCode")
        existing_codes = {c["serviceCode"] for c in existing.get("value", [])}
        log.info("%d PricingChunks already in DB", len(existing_codes))

        for i, entry in enumerate(entries):
            code = entry["code"]
            if code in existing_codes:
                log.info("Skipping (already ingested): %s", code)
                continue

            try:
                vector = await _embed(entry["text"])
            except Exception as exc:
                log.warning("Embed failed for %s: %s", code, exc)
                continue

            payload = {
                "serviceCode":   code,
                "text":          entry["text"],
                "embedding":     json.dumps(vector),
                "effortType":    entry["effort_type"] or None,
                "unitOfMeasure": entry["unit_measure"] or None,
            }
            if entry["price_eur"] is not None:
                payload["priceEur"] = entry["price_eur"]

            await _cap_post(cap, cap_url, "PricingChunks", payload)
            log.info("  [%d/%d] Ingested %s", i + 1, len(entries), code)

    log.info("Pricing ingestion complete.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest AS Pricing xlsm into CAP PricingChunks")
    parser.add_argument("--xlsm", type=Path, default=DEFAULT_XLSM)
    parser.add_argument("--cap-url", default=DEFAULT_CAP_URL)
    args = parser.parse_args()

    if not args.xlsm.is_file():
        raise SystemExit(f"xlsm not found: {args.xlsm}")

    asyncio.run(ingest(args.xlsm, args.cap_url))


if __name__ == "__main__":
    main()
