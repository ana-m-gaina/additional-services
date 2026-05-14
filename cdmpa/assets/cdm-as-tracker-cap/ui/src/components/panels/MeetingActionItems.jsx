export default function MeetingActionItems({ panel }) {
  const items = Array.isArray(panel?.data) ? panel.data : []
  if (items.length === 0) {
    return <div style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No action items.</div>
  }

  const sorted = [...items].sort((a, b) => {
    if (a.overdue && !b.overdue) return -1
    if (!a.overdue && b.overdue) return 1
    if (a.due && b.due) return a.due < b.due ? -1 : 1
    if (a.due) return -1
    if (b.due) return 1
    return 0
  })

  return (
    <div style={{ fontSize: '0.85rem' }}>
      {sorted.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex', gap: '0.5rem', padding: '0.45rem 0',
            borderBottom: '1px solid var(--sapList_BorderColor, #e0e0e0)',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ color: item.overdue ? '#c5221f' : 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0, marginTop: 1 }}>
            {item.overdue ? '⚠' : '○'}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            {item.owner && (
              <span style={{ fontWeight: 700, marginRight: '0.4rem' }}>{item.owner}:</span>
            )}
            <span>{item.text}</span>
            {item.due && (
              <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: item.overdue ? '#c5221f' : 'var(--text-muted)' }}>
                {item.overdue ? '⚠ overdue ' : ''}due {item.due}
              </span>
            )}
            {item.topicRef && (
              <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                [{item.topicRef}]
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
