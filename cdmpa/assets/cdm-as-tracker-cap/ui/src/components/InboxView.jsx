import { useState, useEffect } from 'react'
import { Button } from '@ui5/webcomponents-react'
import { getPendingActions, resolvePendingAction } from '../api.js'

export default function InboxView({ cdmEmail, onCountChange }) {
  const [actions, setActions] = useState([])

  async function load() {
    try {
      const data = await getPendingActions()
      setActions(data)
      onCountChange?.(data.length)
    } catch { /* ignore */ }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 15000)
    return () => clearInterval(id)
  }, [])

  async function resolve(id, status) {
    try {
      await resolvePendingAction(id, status)
      await load()
    } catch (e) { alert(e.message) }
  }

  return (
    <div style={{ padding: '1.5rem', maxWidth: 700 }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Inbox ({actions.length})</h2>
      {actions.length === 0 && (
        <div style={{ color: '#666', fontSize: '0.9rem' }}>No pending actions.</div>
      )}
      {actions.map(a => (
        <div key={a.ID} className="inbox-item">
          <div className="inbox-item-prompt">{a.prompt}</div>
          <div className="inbox-item-meta">
            {new Date(a.createdAt).toLocaleString()}
            {a.relatedRequestId && ` · Request: ${a.relatedRequestId}`}
          </div>
          <div className="inbox-actions">
            <Button design="Emphasized" onClick={() => resolve(a.ID, 'responded')}>Mark Responded</Button>
            <Button onClick={() => resolve(a.ID, 'dismissed')}>Dismiss</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
