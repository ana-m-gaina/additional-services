"""Tool: patch_meeting_note — apply targeted natural-language updates to stored meeting notes."""
import json
from datetime import datetime, timezone
from app import cap_client
from app.tools._shared import pending_patches

TOOL_SCHEMA = {
    "name": "patch_meeting_note",
    "description": (
        "Apply one or more targeted updates to the stored meeting notes for the active client. "
        "Call this when the CDM types a natural-language update like 'topic 3 is now closed', "
        "'mark risk 1 as resolved', 'add action: Palash to check FMX by Friday', "
        "'update topic 8 owner to Sudhir', or 'add decision: agreed to defer profile changes to April'. "
        "The tool applies the patches in memory and returns a human-readable diff — "
        "show the diff to the CDM and ask for confirmation BEFORE calling confirm_meeting_note_patch."
    ),
    "input_schema": {
        "type": "object",
        "required": ["patches"],
        "properties": {
            "patches": {
                "type": "array",
                "description": "List of patch operations to apply",
                "items": {
                    "type": "object",
                    "required": ["op", "target"],
                    "properties": {
                        "op": {
                            "type": "string",
                            "enum": [
                                "set_topic_status", "set_topic_owner", "set_topic_due",
                                "add_topic_bullet", "close_topic",
                                "add_action", "complete_action", "update_action_owner", "update_action_due",
                                "close_risk", "add_decision", "update_narrative"
                            ],
                            "description": "Type of patch"
                        },
                        "target": {
                            "type": "string",
                            "description": "Topic id, action text, risk id, or 'narrative' depending on op"
                        },
                        "value": {
                            "type": "string",
                            "description": "New value — status string, owner name, date, bullet text, action text, decision text, or narrative paragraph"
                        },
                        "owner": {"type": "string", "description": "For add_action: who owns it"},
                        "due":   {"type": "string", "description": "For add_action: due date"},
                    }
                }
            }
        }
    }
}


async def handle(tool_input: dict, *, session_id: str, resolved_customer_agent_id: str | None, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    patches = tool_input.get("patches", [])
    if not patches:
        return {"error": "No patches provided"}
    if not resolved_customer_agent_id:
        return {"error": "No active client session — open a client chat first"}

    await _activity("Loading meeting notes for patching…")
    try:
        notes = await cap_client.get_meeting_notes(resolved_customer_agent_id)
    except Exception as e:
        return {"error": f"Could not load meeting notes: {e}"}
    if not notes:
        return {"error": "No meeting notes found for this client. Process a full set of notes first."}

    note = notes[0]
    try:
        full = json.loads(note.get("extractedJson") or "{}")
    except Exception:
        return {"error": "Could not parse stored meeting notes JSON"}

    diff_lines = []
    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    for p in patches:
        op     = p.get("op", "")
        target = p.get("target", "")
        value  = p.get("value", "")

        topics   = full.get("topics", [])
        analysis = full.get("analysis", {})
        actions  = analysis.get("actionItems", [])
        risks    = analysis.get("risks", [])
        decisions= analysis.get("decisions", [])

        if op == "set_topic_status":
            for t in topics:
                if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                    old = t.get("status","?")
                    t["status"] = value
                    diff_lines.append(f"Topic {t.get('id') or t.get('title')}: status {old} → {value}")
                    break

        elif op == "close_topic":
            for t in topics:
                if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                    old = t.get("status","?")
                    t["status"] = "Closed"
                    if "Closed" not in t.get("flags", []):
                        t.setdefault("flags", []).append("Closed")
                    diff_lines.append(f"Topic {t.get('id') or t.get('title')}: status {old} → Closed")
                    break

        elif op == "set_topic_owner":
            for t in topics:
                if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                    old = t.get("owner","TBD")
                    t["owner"] = value
                    diff_lines.append(f"Topic {t.get('id') or t.get('title')}: owner {old} → {value}")
                    break

        elif op == "set_topic_due":
            for t in topics:
                if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                    old = t.get("due","TBD")
                    t["due"] = value
                    diff_lines.append(f"Topic {t.get('id') or t.get('title')}: due {old} → {value}")
                    break

        elif op == "add_topic_bullet":
            for t in topics:
                if str(t.get("id","")).lower() == target.lower() or t.get("title","").lower().startswith(target.lower()):
                    current = t.setdefault("timeline", {}).setdefault("current", [])
                    if current and current[0].get("date") == today_str:
                        current[0].setdefault("bullets", []).append(value)
                    else:
                        current.insert(0, {"date": today_str, "bullets": [value]})
                    diff_lines.append(f"Topic {t.get('id') or t.get('title')}: added bullet → \"{value}\"")
                    break

        elif op == "add_action":
            owner = p.get("owner", "TBD")
            due   = p.get("due", None)
            overdue = False
            if due:
                try:
                    overdue = due < today_str
                except Exception:
                    pass
            new_action = {"text": value, "owner": owner, "due": due, "topicRef": target, "overdue": overdue}
            actions.append(new_action)
            analysis["actionItems"] = actions
            full["analysis"] = analysis
            diff_lines.append(f"New action added: {owner}: {value}" + (f" (due {due})" if due else ""))

        elif op == "complete_action":
            for a in actions:
                if target.lower() in (a.get("text","") or "").lower() or target.lower() in (a.get("owner","") or "").lower():
                    a["overdue"] = False
                    a["completedDate"] = today_str
                    diff_lines.append(f"Action marked complete: {a.get('owner','?')}: {a.get('text','?')}")
                    break

        elif op == "update_action_owner":
            for a in actions:
                if target.lower() in (a.get("text","") or "").lower():
                    old = a.get("owner","?")
                    a["owner"] = value
                    diff_lines.append(f"Action owner changed: \"{a.get('text','?')}\" {old} → {value}")
                    break

        elif op == "update_action_due":
            for a in actions:
                if target.lower() in (a.get("text","") or "").lower():
                    old = a.get("due","?")
                    a["due"] = value
                    try:
                        a["overdue"] = value < today_str
                    except Exception:
                        pass
                    diff_lines.append(f"Action due date changed: \"{a.get('text','?')}\" {old} → {value}")
                    break

        elif op == "close_risk":
            for r in risks:
                if r.get("id","").lower() == target.lower() or target.lower() in r.get("description","").lower():
                    old = r.get("status","?")
                    r["status"] = "Closed"
                    r["closedDate"] = today_str
                    diff_lines.append(f"Risk {r.get('id','?')} closed: {r.get('description','?')}")
                    break

        elif op == "add_decision":
            existing = decisions
            new_id = f"DEC-{today_str[:4]}-{len(existing)+1:03d}"
            new_dec = {"id": new_id, "date": today_str, "text": value, "topicRef": target, "subTopicRef": None, "agreedBy": None}
            decisions.append(new_dec)
            analysis["decisions"] = decisions
            full["analysis"] = analysis
            diff_lines.append(f"New decision {new_id}: {value}")

        elif op == "update_narrative":
            if "rollup" not in analysis:
                analysis["rollup"] = {}
            analysis["rollup"]["narrativeSummary"] = value
            full["analysis"] = analysis
            diff_lines.append("Narrative summary updated")

    if not diff_lines:
        return {"error": "No matching topics, actions, or risks found for the requested patches. Check the topic ID or description."}

    # Store pending patch state keyed by session_id
    pending_patches[session_id] = {
        "note_id":     note.get("ID"),
        "customer_agent_id": resolved_customer_agent_id,
        "patched_json": json.dumps(full),
        "topics_json":  json.dumps(full.get("topics",[])),
        "actions_json": json.dumps(full.get("analysis",{}).get("actionItems",[])),
        "risks_json":   json.dumps(full.get("analysis",{}).get("risks",[])),
        "decisions_json": json.dumps(full.get("analysis",{}).get("decisions",[])),
        "client_name":  note.get("clientName",""),
        "meeting_date": note.get("meetingDate",""),
    }

    return {
        "pending": True,
        "diff": diff_lines,
        "summary": f"{len(diff_lines)} change{'s' if len(diff_lines) != 1 else ''} staged — awaiting confirmation",
    }
