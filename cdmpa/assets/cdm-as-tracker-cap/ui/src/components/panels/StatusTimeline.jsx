export default function StatusTimeline({ panel }) {
  const entries = [...(panel.data || [])].sort((a, b) => new Date(a.performedAt) - new Date(b.performedAt))

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      {entries.length === 0 ? (
        <div style={{ color: '#666', fontSize: '0.85rem' }}>No activity yet.</div>
      ) : (
        <div className="timeline">
          {entries.map((e, i) => (
            <div key={e.ID || i} className="timeline-item">
              <strong>{e.action}</strong>
              {e.oldStatus && e.newStatus && (
                <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666' }}>
                  {e.oldStatus} → {e.newStatus}
                </span>
              )}
              {e.description && <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>{e.description}</p>}
              <div className="time">{e.performedBy} · {new Date(e.performedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
