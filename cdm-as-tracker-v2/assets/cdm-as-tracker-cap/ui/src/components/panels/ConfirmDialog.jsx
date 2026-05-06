import { useState } from 'react'
import { Button } from '@ui5/webcomponents-react'
import { savePersonaLayout } from '../../api.js'

export default function ConfirmDialog({ panel }) {
  const [status, setStatus] = useState(null) // null | 'saving' | 'done' | 'dismissed'

  async function accept() {
    if (!panel.proposedLayout) return
    setStatus('saving')
    try {
      await savePersonaLayout(JSON.stringify(panel.proposedLayout))
      document.dispatchEvent(new Event('cdm:layout-updated'))
      setStatus('done')
    } catch (e) {
      alert(e.message)
      setStatus(null)
    }
  }

  if (status === 'done') {
    return (
      <div style={{ padding: '0.75rem 1rem', background: '#f0fff4', border: '1px solid #0a6640', borderRadius: 8, color: '#0a6640', fontWeight: 500 }}>
        Layout updated. Switch to Dashboard to see your workspace.
      </div>
    )
  }
  if (status === 'dismissed') {
    return <div style={{ padding: '0.75rem', color: '#666', fontSize: '0.9rem' }}>Layout change dismissed.</div>
  }

  return (
    <div style={{ padding: '1rem', background: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: 8 }}>
      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{panel.title || 'Save workspace layout?'}</div>
      <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
        {panel.description || 'The assistant has proposed a new panel layout for your dashboard. Accept to pin it.'}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button design="Emphasized" onClick={accept} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Accept Layout'}
        </Button>
        <Button onClick={() => setStatus('dismissed')}>Dismiss</Button>
      </div>
    </div>
  )
}
