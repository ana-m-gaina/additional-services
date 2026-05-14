"""Tool: process_meeting_notes — extract structured data from raw ops meeting notes."""
import json
from datetime import datetime, timezone
from app import cap_client, anthropic_client

TOOL_SCHEMA = {
    "name": "process_meeting_notes",
    "description": (
        "Extract structured data from raw ops meeting notes and store it on the client's dashboard. "
        "Call this when the user pastes or uploads meeting notes text. "
        "The tool identifies the client automatically from the notes content."
    ),
    "input_schema": {
        "type": "object",
        "required": ["raw_text"],
        "properties": {
            "raw_text": {
                "type": "string",
                "description": "The full raw meeting notes text pasted or uploaded by the CDM",
            },
        },
    },
}


async def handle(tool_input: dict, *, refresh_data_ref: list, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    raw_text = tool_input.get("raw_text", "").strip()
    if not raw_text:
        return {"error": "raw_text is required"}

    await _activity("Extracting meeting notes structure…")

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    EXTRACTION_SYSTEM = f"""You are a meeting notes extraction agent. Extract structured data from raw OPS meeting notes and return a complete ClientRecord JSON.

Return ONLY a valid JSON object — no markdown fences, no explanation, no commentary.

The output must conform exactly to this schema. All fields shown are required unless marked optional.

---
## TOP-LEVEL STRUCTURE

{{
  "client": "company name as written at top of notes",
  "processedDate": "{today}",
  "milestones": [ {{"date": "...", "description": "...", "comment": "..."}} ],
  "absences": [ {{"who": "...", "date": "...", "substitute1": "...", "substitute2Notes": "..."}} ],
  "topics": [ ...see TOPIC SCHEMA... ],
  "analysis": {{
    "decisions":       [ ...see DECISIONS AUDIT TRAIL... ],
    "references":      [ ...see SR/REFERENCE INDEX... ],
    "risks":           [ ...see RISK REGISTER... ],
    "ownerHistory":    {{ "topicId": [ ...see OWNER HISTORY... ] }},
    "actionItems":     [ ...see ACTION ITEMS... ],
    "systemMap":       {{ "SYSCODE": {{"topics": [], "mentions": 0, "concentrationRisk": false}} }},
    "staleTopics":     [ ...see STALE TOPICS... ],
    "upcomingActions": [ ...see UPCOMING ACTIONS... ],
    "rollup":          {{ ...see ROLLUP SUMMARY... }},
    "diff":            null,
    "config": {{
      "riskThresholdDays": 30,
      "staleThresholdWeeks": 2,
      "rollupPeriod": "weekly",
      "systemConcentrationThreshold": 3,
      "ownerFlipThreshold": 2
    }}
  }}
}}

---
## MILESTONES
Extract the milestones / important events table from the top of the notes if present.
Each row: {{"date": "as written", "description": "event name", "comment": "status comment e.g. Finished"}}
Include all rows even if partially empty.

---
## ABSENCES
Extract the absences/holidays table from the top of the notes if present.
Each row: {{"who": "name", "date": "date range or empty", "substitute1": "cover person or empty", "substitute2Notes": "additional note or empty"}}
Include all rows even if the person has no absence (empty date = no upcoming absence).

---
## TOPIC SCHEMA
Each topic object:
{{
  "id": "topic number e.g. '1', '4a', '0451' — or null",
  "flags": ["Top Issue"|"Action"|"Risk"|"Info"|"Monitoring"|"Closed"],
  "title": "topic title",
  "references": "SR33551172, SAPNote# 2600030 — verbatim refs mentioned, or null",
  "status": "In Progress|Blocked|Completed|Closed|Monitoring",
  "owner": "person or party name, or TBD",
  "due": "due date as written, or TBD",
  "summary": "one AI-written sentence summarising current state",
  "decisions": [{{"text": "verbatim", "date": "or null"}}],
  "isSection": false,
  "sharedUpdates": [{{"text": "verbatim bullet", "date": "or null"}}],
  "subTopics": [],
  "timeline": {{
    "current": [{{"date": "most recent date", "bullets": ["verbatim"]}}],
    "earlier": [{{"date": "older date or null", "bullets": ["verbatim"]}}]
  }}
}}

### STATUS RULES (critical)
- "Blocked" ONLY if the word is literally written
- "Waiting on X" / "in progress on X side" = "In Progress"
- Default: "In Progress"

### OWNER RULES
- "X to check" / "X investigating" / "X to raise" → owner is X
- "In progress on [party] side" → owner is that party
- Default: "TBD"

### FLAG RULES
- "Top Issue" — only if explicitly called a top issue in the notes
- "Action" — topic has open action items assigned to people
- "Risk" — topic is blocked OR contains process gap / escalation language
- "Info" — informational update only, no action needed
- "Monitoring" — topic is being watched but no active work
- "Closed" — topic is fully done

### TIMELINE RULES
- Most recent date group → "current" array
- All older date groups → "earlier" array, one entry per date — NEVER clump multiple dates together
- Bullets with no recoverable date → "earlier" with date: null
- Preserve bullet text close to verbatim

### DECISION DETECTION (triggers)
"OK for", "confirmed", "agreed", "no need to", "considered permanent", "to be closed", "completed", "done"
Each decision: {{"text": "verbatim decision text", "date": "date or null"}}

### SECTION TOPICS (isSection: true)
Set isSection=true when a topic tracks multiple system IDs (e.g. 0451/0473/0474) or uses Part I/Part II language.
- Bullets mentioning a specific ID/system → that subTopic's timeline
- Bullets mentioning multiple IDs → each relevant subTopic
- General/ambiguous bullets → sharedUpdates (over-aggregate rather than misplace)

Each subTopic:
{{
  "id": "e.g. '0451' or 'FMP'",
  "title": "full title",
  "systems": ["FMP", "FMQ"],
  "owner": "TBD",
  "due": "TBD",
  "expiry": "expiry date if mentioned, else omit",
  "status": "In Progress|Blocked|Completed|Closed|Monitoring",
  "decisions": [{{"text": "...", "date": "..."}}],
  "timeline": {{"current": [], "earlier": []}}
}}

---
## ANALYSIS SECTIONS

### 1. DECISIONS AUDIT TRAIL (analysis.decisions)
Extract every decision across all topics into a sequential log.
Sequential IDs: DEC-{today[:4]}-001, DEC-{today[:4]}-002, etc.
{{"id": "DEC-YYYY-NNN", "date": "or null", "text": "verbatim", "topicRef": "topic id", "subTopicRef": "sub-topic id or null", "agreedBy": "party or null"}}

### 2. SR/REFERENCE INDEX (analysis.references)
Collect every SR, SAPNote, Case#, KBA, ticket number mentioned anywhere.
Deduplicate — same ref in multiple topics gets one entry with all topicRefs.
{{"ref": "verbatim e.g. SR33551172", "type": "SR|SAPNote|Case|KBA|Other", "context": "brief context from surrounding text", "topicRefs": ["1", "3"], "status": "if mentioned"}}

### 3. RISK REGISTER (analysis.risks)
Flag as a risk:
- Any topic with status "Blocked"
- Process gap language: "how can this happen without", "why was this not done", "no checks being done", "without input from team"
- Escalation language: "wondering why", "impression was that", "not implemented for such a long time"
- Topic with no due date AND no owner (stalled without accountability)
{{"id": "RISK-NNN", "description": "...", "detectedDate": "{today}", "topicRef": "topic id", "trigger": "what triggered it", "status": "Open", "closedDate": null}}

### 4. ACTION ITEMS (analysis.actionItems)
Detect: "X to check", "X to raise SR", "X to send", "X to share", "X to confirm", "X to create", "X to investigate", "SR needed", "SR to be raised by X"
Sort: overdue first, then by due date, then by owner.
{{"text": "verbatim action", "owner": "person", "due": "date or null", "topicRef": "topic id", "subTopicRef": "or null", "overdue": true/false}}
overdue = true if due date is before {today}.

### 5. SYSTEM IMPACT MAP (analysis.systemMap)
List every system code mentioned (FMP, FMQ, FMX, FMS, FMD, HMD, HMQ, HMP, WFD, WFP, WFB, HMX, FME, etc).
For each: which topic IDs reference it, total mention count, concentrationRisk=true if in 3+ topics.
{{"FMP": {{"topics": ["1","4a","8"], "mentions": 12, "concentrationRisk": true}}}}

### 6. OWNER HISTORY (analysis.ownerHistory)
For each topic where ownership changed between parties (detect from timeline: "in progress on SAP side" then later "in progress on Allianz side"):
{{"topicId": [{{"date": "YYYY-MM-DD", "from": "SAP", "to": "Allianz"}}]}}
Only include topics that actually had ownership changes.

### 7. STALE TOPICS (analysis.staleTopics)
Flag topics where the most recent date in their timeline is more than 2 weeks before {today}.
{{"topicRef": "topic id", "topicTitle": "...", "lastMentioned": "most recent date found", "gapDays": N, "owner": "current owner"}}

### 8. UPCOMING ACTIONS (analysis.upcomingActions)
Actions from any topic due within 7 days of {today} (i.e. due by {today} + 7 days).
{{"description": "action text", "owner": "person", "dueDate": "as written", "topicRef": "topic id"}}

### 9. ROLLUP SUMMARY (analysis.rollup)
{{
  "period": "weekly",
  "totalTopics": N,
  "closedInPeriod": N,
  "openedInPeriod": N,
  "blocked": N,
  "decisionsInPeriod": N,
  "activeRisks": N,
  "avgAgeDaysOpenItems": N,
  "actionsDueNext7Days": N,
  "narrativeSummary": "AI-written paragraph summarising current state — suitable for pasting into a weekly status report"
}}

### 10. DIFF (analysis.diff)
Set to null — this is a first-run extraction with no previous data to compare against.

---
## CRITICAL RULES
- Preserve bullet text close to verbatim — do not paraphrase raw bullets
- "summary" field is AI-written (one sentence); all other text fields are verbatim
- Empty arrays [] and null values are valid — do not omit required fields
- Never confuse entry dates (when discussed) with due dates (when something must happen)
- sharedUpdates items are objects with "text" field, not plain strings"""

    try:
        extracted_text = await anthropic_client.chat_with_history(
            EXTRACTION_SYSTEM,
            [{"role": "user", "content": raw_text}],
            max_tokens=16000,
        )
        # Strip markdown code fences if present
        cleaned = extracted_text.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        extracted = json.loads(cleaned)
    except Exception as e:
        return {"error": f"Extraction failed: {e}"}

    client_name  = extracted.get("client", "")
    meeting_date = extracted.get("processedDate") or extracted.get("meetingDate") or today
    topics       = extracted.get("topics", [])
    analysis     = extracted.get("analysis", {})
    action_items = analysis.get("actionItems", [])
    risks        = analysis.get("risks", [])
    decisions    = analysis.get("decisions", [])

    # Match client name to a CustomerAgent
    customer_agent_id = None
    agents = []
    try:
        agents = await cap_client.get_customer_agents()
        client_lower = client_name.lower()
        for agent in agents:
            agent_name = (agent.get("displayName") or "").lower()
            if client_lower and (client_lower in agent_name or agent_name in client_lower):
                customer_agent_id = agent.get("ID")
                client_name = agent.get("displayName", client_name)
                break
    except Exception:
        pass

    if not customer_agent_id:
        return {
            "error": f"Could not match client '{client_name}' to any known customer. "
                     f"Available customers: {[a.get('displayName') for a in agents]}. "
                     "Please check the client name in the notes."
        }

    await _activity(f"Saving meeting notes for {client_name}…")

    try:
        await cap_client.save_meeting_note(
            customer_agent_id=customer_agent_id,
            client_name=client_name,
            meeting_date=meeting_date,
            raw_text=raw_text,
            extracted_json=json.dumps(extracted),
            topics_json=json.dumps(topics),
            action_items_json=json.dumps(action_items),
            risks_json=json.dumps(risks),
            decisions_json=json.dumps(decisions),
        )
    except Exception as e:
        return {"error": f"Failed to save meeting note: {e}"}

    refresh_data_ref[0] = True
    return {
        "saved": True,
        "clientName": client_name,
        "customerAgentId": customer_agent_id,
        "topicsCount": len(topics),
        "actionItemsCount": len(action_items),
        "risksCount": len([r for r in risks if r.get("status") == "Open"]),
        "decisionsCount": len(decisions),
    }
