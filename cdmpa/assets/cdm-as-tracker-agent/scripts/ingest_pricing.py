"""
Pricing data ingestion — reads the AS Pricing xlsm and writes structured rows
to CAP AdminService/PricingTable (direct DB lookup, no embeddings).

Setup (one-time):
  1. Start CAP:  cd ../cdm-as-tracker-cap && cds watch
  2. No API keys needed — uses basic auth against AdminService.

Usage:
  python scripts/ingest_pricing.py
  python scripts/ingest_pricing.py --xlsm /path/to/pricing.xlsm --cap-url http://localhost:4004
"""
import argparse
from dotenv import load_dotenv
load_dotenv()
import asyncio
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
CAP_USER     = os.environ.get("CAP_USER", "pricingadmin")
CAP_PASSWORD = os.environ.get("CAP_PASSWORD", "pricingadmin")


# ── Extract entries from xlsm ─────────────────────────────────────────────────

def _extract_entries(xlsm_path: Path) -> list[dict]:
    wb = openpyxl.load_workbook(str(xlsm_path), read_only=True, data_only=True)

    # Complete+Efforts: Identifier, Task, Responsibility/Category, ...
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
            "code":        code,
            "task":        str(row[1] or "").strip(),
            "category":    str(row[2] or "").strip(),
            "unit_measure": str(row[19] or "").strip(),
        }

    # Additional_Service_Pricing: EUR prices for PCE (col 4 = Price per Execution EUR)
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

    # Keep only Additional Service entries and merge price
    entries = []
    for code, d in ce_entries.items():
        if "Additional" not in d.get("category", ""):
            continue
        price = price_map.get(code)
        entries.append({
            "serviceCode": code,
            "serviceName": d["task"],
            "price":       price,
            "currency":    "EUR",
            "active":      True,
        })

    log.info("Extracted %d Additional Service entries from xlsm", len(entries))
    return entries


# ── CAP helpers ───────────────────────────────────────────────────────────────

async def _cap_get_existing(cap: httpx.AsyncClient, cap_url: str) -> set[str]:
    resp = await cap.get(f"{cap_url}/AdminService/PricingTable?$select=serviceCode", timeout=30.0)
    resp.raise_for_status()
    return {r["serviceCode"] for r in resp.json().get("value", [])}


async def _cap_post(cap: httpx.AsyncClient, cap_url: str, data: dict) -> None:
    resp = await cap.post(f"{cap_url}/AdminService/PricingTable", json=data, timeout=30.0)
    resp.raise_for_status()


async def _cap_patch(cap: httpx.AsyncClient, cap_url: str, key: str, data: dict) -> None:
    resp = await cap.patch(f"{cap_url}/AdminService/PricingTable('{key}')", json=data, timeout=30.0)
    resp.raise_for_status()


# ── Main ──────────────────────────────────────────────────────────────────────

async def ingest(xlsm_path: Path, cap_url: str) -> None:
    entries = _extract_entries(xlsm_path)
    if not entries:
        log.error("No entries found — check xlsm path")
        return

    auth = (CAP_USER, CAP_PASSWORD)
    async with httpx.AsyncClient(auth=auth, headers={"Accept": "application/json"}) as cap:
        existing_codes = await _cap_get_existing(cap, cap_url)
        log.info("%d entries already in PricingTable", len(existing_codes))

        created = updated = skipped = 0
        for e in entries:
            code = e["serviceCode"]
            # Entries without a price are still written (NULL price = case-by-case)
            payload = {
                "serviceCode": code,
                "serviceName": e["serviceName"],
                "currency":    e["currency"],
                "active":      e["active"],
            }
            if e["price"] is not None:
                payload["price"] = e["price"]

            if code in existing_codes:
                try:
                    await _cap_patch(cap, cap_url, code, payload)
                    updated += 1
                except Exception as exc:
                    log.warning("PATCH %s failed: %s", code, exc)
                    skipped += 1
            else:
                if e["price"] is None:
                    # PricingTable.price is NOT NULL — skip entries with no price
                    log.info("  SKIP %s — no price in xlsm (not null-safe)", code)
                    skipped += 1
                    continue
                try:
                    await _cap_post(cap, cap_url, payload)
                    created += 1
                except Exception as exc:
                    log.warning("POST %s failed: %s", code, exc)
                    skipped += 1

        log.info("Done — created=%d updated=%d skipped=%d", created, updated, skipped)


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest AS Pricing xlsm into CAP PricingTable")
    parser.add_argument("--xlsm", type=Path, default=DEFAULT_XLSM)
    parser.add_argument("--cap-url", default=DEFAULT_CAP_URL)
    args = parser.parse_args()

    if not args.xlsm.is_file():
        raise SystemExit(f"xlsm not found: {args.xlsm}")

    asyncio.run(ingest(args.xlsm, args.cap_url))


if __name__ == "__main__":
    main()
