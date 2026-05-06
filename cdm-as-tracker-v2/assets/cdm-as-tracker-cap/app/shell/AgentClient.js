'use strict'

// Talks to the v2 Python agent at :8000.
// chat()       — streaming SSE; calls onActivity(text) for each activity event,
//                resolves with the final result object.
// chatSimple() — single POST fallback (for inbox replies).

const AGENT_BASE = 'http://localhost:8000'

const AgentClient = {
  async chat({ message, sessionId, assistantName, cardContext, onActivity }) {
    const body = JSON.stringify({
      message,
      session_id: sessionId || 'default',
      assistant_name: assistantName || null,
      card_context: cardContext || null
    })

    const res = await fetch(`${AGENT_BASE}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      body
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.detail || `Agent stream failed: ${res.status}`)
    }

    const reader  = res.body.getReader()
    const decoder = new TextDecoder()
    let   buf     = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })

      const lines = buf.split('\n')
      buf = lines.pop()

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6).trim()
        if (!raw) continue
        let evt
        try { evt = JSON.parse(raw) } catch { continue }

        if (evt.type === 'activity' && onActivity) {
          onActivity(evt.text)
        } else if (evt.type === 'result') {
          return evt
        } else if (evt.type === 'error') {
          throw new Error(evt.detail || 'Agent error')
        }
      }
    }

    throw new Error('SSE stream ended without result')
  },

  async chatSimple({ message, sessionId, assistantName }) {
    const res = await fetch(`${AGENT_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        session_id: sessionId || 'default',
        assistant_name: assistantName || null
      })
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.detail || `Agent POST failed: ${res.status}`)
    }
    return res.json()
  }
}

window.AgentClient = AgentClient
