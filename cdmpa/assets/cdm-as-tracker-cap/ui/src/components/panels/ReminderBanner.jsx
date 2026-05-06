export default function ReminderBanner({ panel }) {
  const severity = panel.severity || 'warning' // 'warning' | 'error'
  const bg    = severity === 'error' ? '#fff0f0' : '#fffbe6'
  const border = severity === 'error' ? '#c00'   : '#e76500'
  const icon   = severity === 'error' ? '🔴'     : '⚠️'

  return (
    <div
      style={{
        background: bg, border: `1px solid ${border}`, borderRadius: 8,
        padding: '0.875rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
      }}
    >
      <span style={{ fontSize: '1.1rem', lineHeight: 1.4 }}>{icon}</span>
      <div>
        {panel.title && (
          <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: border }}>{panel.title}</div>
        )}
        <div style={{ fontSize: '0.9rem' }}>{panel.message}</div>
        {panel.requestId && (
          <div style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#666' }}>
            Request: {panel.requestId}
          </div>
        )}
      </div>
    </div>
  )
}
