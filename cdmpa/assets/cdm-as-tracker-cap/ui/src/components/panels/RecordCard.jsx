import { useState } from 'react'
import { Button, Card, CardHeader } from '@ui5/webcomponents-react'
import RequestDetailDrawer from '../RequestDetailDrawer.jsx'

export default function RecordCard({ panel }) {
  const [open, setOpen] = useState(false)
  const r = panel.data || {}
  const s = r.status || 'Unknown'

  return (
    <>
      <Card
        header={
          <CardHeader
            titleText={r.requestTitle || `${r.customerId} — ${r.requestedService}`}
            subtitleText={`${r.sid || ''} · ${r.cdmOwner || ''}`}
            action={<span className={`status-badge status-${s}`}>{s}</span>}
          />
        }
      >
        <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span><strong>Price:</strong> {r.currency} {r.estimatedPrice ?? '—'}</span>
            <span><strong>R&R:</strong> {r.rrCode || '—'}</span>
          </div>
          {r.priceValidUntil && (
            <div style={{ fontSize: '0.85rem', color: '#666' }}>
              Valid until: {new Date(r.priceValidUntil).toLocaleDateString()}
            </div>
          )}
          {panel.highlight && (
            <div style={{ fontSize: '0.85rem', color: '#c00', fontWeight: 500 }}>{panel.highlight}</div>
          )}
          <Button onClick={() => setOpen(true)} style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>View Details</Button>
        </div>
      </Card>
      {open && <RequestDetailDrawer request={r} onClose={() => setOpen(false)} />}
    </>
  )
}
