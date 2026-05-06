'use strict'

/**
 * R&R + Pricing subagent — covers workflow steps 2 and 3:
 *   step 2: rr_match  — identify the correct service code from a description
 *   step 3: price_lookup — return price + last-updated for a confirmed rrId
 *
 * Both functions receive pre-loaded data (rrData, pricingData) so the caller
 * owns the DB queries. This keeps the subagent pure and testable without a
 * live CAP context.
 */

const SYSTEM_PROMPT_RR_MATCH = (rrJson) =>
  `You are helping a SAP Customer Delivery Manager identify the correct R&R Additional Services code(s) for a customer request.

Your job is to analyse the request and return a structured result covering all applicable service codes — not just a single best match.

## Output format

Return ONLY a JSON object with this shape. No preamble, no markdown, no explanation outside the JSON.

{
  "scenario": "single" | "multi" | "variant" | "ambiguous" | "none",
  "scenario_note": "<one sentence explaining why this scenario applies>",
  "services": [
    {
      "rrId": "<code>",
      "description": "<description from R&R data>",
      "confidence": "HIGH" | "MEDIUM" | "LOW",
      "role": "primary" | "addon" | "alternative",
      "pricing_note": "<'fixed price' | 'case by case' | 'macro calculated' | 'no offering'>"
    }
  ],
  "clarifying_question": "<question to ask CDM if more info is needed, or null>"
}

## Scenario rules — read carefully

**single**: One service code clearly covers the full request. Return it with role=primary.

**multi**: The request requires two or more services that are always delivered together.
  Classic example: MOVE_1.3.04 (planning) + BASIC_1.5.20 (execution) for S/4HANA conversion.
  Return all required codes. Mark the main deliverable as role=primary, the rest as role=addon.

**variant**: The base code exists (e.g. DB_1.1.26) but the correct one depends on a dimension
  the CDM needs to specify (e.g. database size: _S / _M / _L). Return the base code as
  role=primary with LOW confidence, and the sub-variants as role=alternative. Set
  clarifying_question to ask for the missing dimension.

**ambiguous**: Two or more distinct services could match depending on details not yet known
  (e.g. HANA in-place migration vs. system rebuild vs. system conversion). Return each
  candidate with role=alternative. Set clarifying_question to narrow it down.

**none**: No service code in the catalogue matches the described need. Return an empty
  services array. Consider whether BASIC_1.15.06 (Generic Service Request) might apply
  as a catch-all — if so, include it with LOW confidence.

## Variant families — use these to detect variant scenarios

- DB_1.1.26 → sub-variants _S (< 50 GB) / _M (50–100 GB) / _L (100–200 GB) — ask for DB size
- BASIC_1.8.25 → sub-variants _A through _G — ask what is being rebuilt
- BASIC_1.8.20 → variants _HC / _HC_HS / _NPA / _SRA / _SRA1 / _SRA2 — ask which support type
- BASIC_1.5.20 → variant _HCM for HCM systems; BASIC_1.5.20A is an add-on (Fiori)
- MOVE_1.3.04 → variant _HCM for HCM conversions; always paired with BASIC_1.5.20
- MOVE_1.7.01 → paired with MOVE_1.7.02 for NetWeaver → S/4HANA Foundation
- TO_SDC_1.2.01 + TO_SDC_1.3.01 → combined as TO_SDC_1.3.01A if both needed

## Confidence rules

HIGH: The description unambiguously maps to this specific code.
MEDIUM: Likely match but one or more details are uncertain.
LOW: Possible match; CDM should verify before quoting.

## R&R REFERENCE DATA:
${rrJson}`

/**
 * rr_match — suggest top 3 R&R service codes for a natural-language description.
 *
 * @param {object} params
 * @param {string} params.description  - Customer's described need
 * @param {Array}  params.rrData       - Active RRReference rows from DB
 * @param {object} params.llm          - LLM client instance (must have .chat())
 * @returns {Promise<Array>}  [{id, description, confidence}] or fallback list
 */
async function rrMatch({ description, rrData, llm }) {
  if (!description?.trim()) throw new Error('description is required for rr_match')
  if (!rrData?.length) return { scenario: 'none', scenario_note: 'No R&R reference data available.', services: [], clarifying_question: null }

  const rrJson = JSON.stringify(rrData)
  const systemPrompt = SYSTEM_PROMPT_RR_MATCH(rrJson)

  const result = await llm.chat(systemPrompt, description)
  const parsed = typeof result === 'string'
    ? (() => { try { return JSON.parse(result) } catch { return null } })()
    : result

  // Validate expected shape
  if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.services)) {
    return {
      scenario: 'ambiguous',
      scenario_note: 'AI could not structure a result. Showing full catalogue.',
      services: rrData.map(r => ({ rrId: r.rrId, description: r.description, confidence: 'LOW', role: 'alternative', pricing_note: 'unknown' })),
      clarifying_question: 'Can you describe the customer\'s request in more detail?'
    }
  }

  return parsed
}

/**
 * price_lookup — pure data lookup, no LLM call.
 *
 * @param {object} params
 * @param {string} params.rrId         - R&R service code to look up
 * @param {Array}  params.rrData       - Active RRReference rows from DB
 * @param {Array}  params.pricingData  - PricingEntry rows from DB
 * @returns {object}  {rrId, description, price, currency, lastUpdated} or {error}
 */
function priceLookup({ rrId, rrData, pricingData }) {
  if (!rrId) throw new Error('rrId is required for price_lookup')

  const entry = pricingData?.find(p => p.rrId === rrId)
  const rrRef  = rrData?.find(r => r.rrId === rrId)

  if (!entry) return { error: `No pricing found for ${rrId}` }

  return {
    rrId,
    description:  rrRef?.description ?? null,
    price:        entry.price,
    currency:     entry.currency,
    lastUpdated:  entry.lastUpdated
  }
}

module.exports = { rrMatch, priceLookup }
