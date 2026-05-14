# Conversation Auto-Save Design

## Problem
- Global sessionId is `session-<Date.now()>` — regenerated every page load, history unreachable
- `CONVERSATIONS` sidebar never calls `getConversationSessions()` — always empty
- Agent responds to "save conversation" as if it's a note tool — no auto-save behaviour

## Target behaviour
Every chat session is automatically saved — no CDM action required.
- Global chat (no customer detected) → saved under CONVERSATIONS tab
- Customer-linked chat (agent detects/confirms customer) → saved under that customer in CUSTOMERS sidebar

## Three changes needed

### 1. Fix global session persistence (UI)
- On app load: check `localStorage.getItem('cdm_global_session_id')`
- If missing: call `createConversationSession(null, 'General — <date>')` → store returned ID in localStorage
- Use that stable ID as GLOBAL_SESSION_ID instead of `session-<Date.now()>`
- File: `ui/src/App.jsx:10`

### 2. Wire CONVERSATIONS sidebar (UI + API)
- On load: call `getConversationSessions(null)` → list sessions with `customerAgentId IS NULL`
- Clicking one sets sessionId → ChatShell loads history via existing `getConversationTurns()`
- CAP query needed: `ConversationSessions?$filter=customerAgentId eq null&$orderby=lastActiveAt desc`
- Files: `ui/src/App.jsx`, `ui/src/api.js:144`

### 3. Auto-link session to customer (orchestrator + CAP)
- New CAP action: `linkSessionToCustomer(sessionId, customerAgentId)` — patches ConversationSession
- New orchestrator tool: `link_session_to_customer` — called when agent identifies which customer the conversation is about
- Once linked: session moves from CONVERSATIONS to that customer's expand list
- Files: `srv/cdm-service.cds`, `srv/cdm-service.js`, `app/agents/orchestrator.py`

## Dependency order
1 → 2 → 3 (each is independently shippable)
