import { useState } from 'react'

export default function MeetingRisks({ panel }) {
  const risks = Array.isArray(panel?.data) ? panel.data : []
  const [showClosed, setShowClosed] = useState(false)

  const open   = risks.filter(r => r.status === 'Open')
  const closed = risks.filter(r => r.status !== 'Open')

  if (risks.length === 0) {
    return <div style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No risks.</div>
  }

  return (
    <div style={{ fontSize: '0.85rem' }}>
      {open.length === 0 && (
        <div style={{ padding: '0.4rem 0', color: '#137333', fontSize: '0.82rem' }}>✓ No open risks</div>
      )}
      {open.map((r, i) => (
        <div
          key={i}
          style={{
            background: '#fce8e6', border: '1px solid #f5c6c4', borderRadius: 6,
            padding: '0.5rem 0.65rem', marginBottom: '0.4rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.75rem', color: '#c5221f', flexShrink: 0 }}>
              {r.id}
            </span>
            <span style={{ fontWeight: 600, color: '#3c1010' }}>{r.description}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7a3030', marginTop: 3 }}>
            <span>Trigger: {r.trigger}</span>
            {r.detectedDate && <span style={{ marginLeft: '0.75rem' }}>Detected: {r.detectedDate}</span>}
            {r.topicRef && (
              <span style={{ marginLeft: '0.75rem', fontFamily: 'monospace' }}>[{r.topicRef}]</span>
            )}
          </div>
        </div>
      ))}
      {closed.length > 0 && (
        <div style={{ marginTop: '0.5rem' }}>
          <button
            style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => setShowClosed(s => !s)}
          >
            {showClosed ? '▼' : '▶'} {closed.length} closed risk{closed.length > 1 ? 's' : ''}
          </button>
          {showClosed && closed.map((r, i) => (
            <div key={i} style={{ padding: '0.3rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', borderBottom: '1px solid var(--sapList_BorderColor, #e0e0e0)' }}>
              <span style={{ fontFamily: 'monospace', marginRight: '0.4rem' }}>{r.id}</span>
              {r.description}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
