"""Shared state and helpers used by more than one tool module.

Currently contains:
  - _pending_patches: cross-request staging dict for patch_meeting_note /
    confirm_meeting_note_patch handshake, keyed by session_id.
"""

# Keyed by session_id; holds staged meeting note patches awaiting CDM confirmation.
# Must be a single shared dict instance; both patch_meeting_note and
# confirm_meeting_note_patch reference it.
pending_patches: dict = {}
