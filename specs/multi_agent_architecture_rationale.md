# Multi-Agent Architecture — Design Rationale

## Why a single agent is not sufficient

The CDM workflow spans tasks that are too diverse for a single agent to handle effectively:
contract analysis, pricing, O2I generation, ticket creation, email drafting, customer communication,
process compliance, and event-driven automation. A single agent holding all of this context
simultaneously would be expensive, fragile, and hard to maintain.

## The orchestrator / subagent model

The system is structured as a hierarchy:

- **Main Orchestrator (PA)** — the CDM's personal assistant. Stateful, personalized, owns the
  conversational experience. Routes to specialists silently. The CDM always sees one conversation.
- **Specialist subagents** — scoped to a domain (client, contract, task type). Receive only the
  context the orchestrator injects. No full CDM history. Token cost stays predictable.
- **Task agents** — stateless workers for discrete operations (parse email, draft pricing, generate O2I).
- **Automation agents** — event-driven, fire on SAP Event Mesh events, surface pending actions to
  the CDM's inbox when human input is needed.

## Separation of personal context and process knowledge

The key architectural principle is that **personalization and process are decoupled**:

- Personal context (CDM preferences, history, relationships) lives in the orchestrator layer.
  It never changes when processes change.
- Process knowledge lives in swappable subagents. When SAP updates how an approval or pricing
  step works, that agent is updated or replaced. The CDM's experience is unchanged.

This means **adoption of a new process is instant and overhead-free for the CDM**. There is no
retraining, no UI change, no disruption to their workflow.

## Public vs private agents

- **Private agents** — hold or can access CDM personal data. Managed per user or per deployment.
- **Public agents** — stateless, process-oriented, centrally maintained. Any CDM's orchestrator
  can plug them in. Versioned and deployed independently of individual CDM setups.

The orchestrator acts as the integration point: it knows the CDM, it knows which public agents
are available, and it decides what context to pass without leaking personal data into process agents.

## The plugin/driver analogy

The orchestrator is the OS. Process agents are drivers. You update a driver without touching the
OS or the user's desktop. The CDM's workflow is the desktop — it stays stable regardless of what
runs underneath.

## Why this is worth building

- Enterprise process changes are expensive in human overhead. This model eliminates that cost.
- Personalization at the orchestrator layer means the tool adapts to the CDM, not the other way around.
- Swappable public agents mean central teams (CoE, ops) can update process knowledge without
  coordinating with every CDM or rebuilding the UI.
- Token cost is controlled by scoping context to subagents — the orchestrator only spends tokens
  when routing decisions or context assembly require it.
