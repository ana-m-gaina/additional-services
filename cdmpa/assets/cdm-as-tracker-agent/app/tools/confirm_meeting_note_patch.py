"""Tool: confirm_meeting_note_patch — write pending meeting note patches to the database."""
from app import cap_client
from app.tools._shared import pending_patches

TOOL_SCHEMA = {
    "name": "confirm_meeting_note_patch",
    "description": (
        "Write the pending meeting note patches to the database. "
        "Only call this AFTER patch_meeting_note has returned a diff AND the CDM has explicitly confirmed the changes."
    ),
    "input_schema": {"type": "object", "properties": {}},
}


async def handle(tool_input: dict, *, session_id: str, refresh_data_ref: list, activity_callback=None, **_kwargs) -> dict:
    async def _activity(msg: str):
        if activity_callback:
            await activity_callback(msg)

    pending = pending_patches.pop(session_id, None)
    if not pending:
        return {"error": "No pending patch found. Call patch_meeting_note first."}

    await _activity("Saving updated meeting notes…")
    try:
        await cap_client.save_meeting_note(
            customer_agent_id=pending["customer_agent_id"],
            client_name=pending["client_name"],
            meeting_date=pending["meeting_date"],
            raw_text="",
            extracted_json=pending["patched_json"],
            topics_json=pending["topics_json"],
            action_items_json=pending["actions_json"],
            risks_json=pending["risks_json"],
            decisions_json=pending["decisions_json"],
        )
    except Exception as e:
        return {"error": f"Failed to save: {e}"}

    refresh_data_ref[0] = True
    return {"saved": True, "message": "Meeting notes updated and dashboard refreshed."}
