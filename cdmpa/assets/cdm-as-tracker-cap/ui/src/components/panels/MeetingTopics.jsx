import { useState } from 'react'

const STATUS_COLORS = {
  'In Progress': { bg: '#e8f0fe', text: '#1a73e8', border: '#c5d8fb' },
  'Blocked':     { bg: '#fce8e6', text: '#c5221f', border: '#f5c6c4' },
  'Completed':   { bg: '#e6f4ea', text: '#137333', border: '#b7dfbf' },
  'Closed':      { bg: '#e6f4ea', text: '#137333', border: '#b7dfbf' },
  'Monitoring':  { bg: '#f1f3f4', text: '#5f6368', border: '#dadce0' },
}

const FLAG_COLORS = {
  'Top Issue': { bg: '#fce8e6', text: '#c5221f', border: '#f5c6c4' },
  'Risk':      { bg: '#fef7e0', text: '#b06000', border: '#fce19c' },
  'Action':    { bg: '#e8f0fe', text: '#1a73e8', border: '#c5d8fb' },
  'Info':      { bg: '#f1f3f4', text: '#5f6368', border: '#dadce0' },
  'Monitoring':{ bg: '#f1f3f4', text: '#5f6368', border: '#dadce0' },
}

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || STATUS_COLORS['Monitoring']
  return (
    <span style={{
      display: 'inline-block', padding: '1px 8px', borderRadius: 10, fontSize: '0.72rem',
      fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`,
    }}>
      {status}
    </span>
  )
}

function FlagBadge({ flag }) {
  const c = FLAG_COLORS[flag] || FLAG_COLORS['Info']
  return (
    <span style={{
      display: 'inline-block', padding: '1px 6px', borderRadius: 10, fontSize: '0.68rem',
      fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`,
    }}>
      {flag}
    </span>
  )
}

function Timeline({ current, earlier }) {
  const [showEarlier, setShowEarlier] = useState(false)
  if (!current?.length && !earlier?.length) return null
  return (
    <div style={{ marginTop: '0.4rem' }}>
      {current?.length > 0 && (
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1a73e8', marginBottom: 2 }}>Current</div>
          {current.map((entry, i) => (
            <div key={i} style={{ marginBottom: '0.3rem' }}>
              {entry.date && <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#555' }}>{entry.date}</div>}
              {(entry.bullets || []).map((b, j) => (
                <div key={j} style={{ fontSize: '0.77rem', color: '#333', paddingLeft: '0.75rem' }}>• {b}</div>
              ))}
            </div>
          ))}
        </div>
      )}
      {earlier?.length > 0 && (
        <div style={{ marginTop: '0.25rem' }}>
          <button
            style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={e => { e.stopPropagation(); setShowEarlier(s => !s) }}
          >
            {showEarlier ? '▼' : '▶'} {earlier.length} earlier entr{earlier.length === 1 ? 'y' : 'ies'}
          </button>
          {showEarlier && earlier.map((entry, i) => (
            <div key={i} style={{ marginBottom: '0.3rem' }}>
              {entry.date && <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#888' }}>{entry.date}</div>}
              {(entry.bullets || []).map((b, j) => (
                <div key={j} style={{ fontSize: '0.77rem', color: '#777', paddingLeft: '0.75rem' }}>• {b}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SubTopicRow({ sub }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderLeft: '2px solid #c5d8fb', paddingLeft: '0.6rem', marginBottom: '0.35rem' }}>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 3, flexShrink: 0 }}>
          {open ? '▼' : '▶'}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#1a73e8', fontWeight: 700, flexShrink: 0 }}>
              {sub.id}
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{sub.title}</span>
            <StatusBadge status={sub.status} />
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {sub.owner && sub.owner !== 'TBD' && <span>Owner: {sub.owner}</span>}
            {sub.due && sub.due !== 'TBD' && <span>Due: {sub.due}</span>}
            {sub.expiry && <span style={{ color: '#b06000' }}>Expiry: {sub.expiry}</span>}
            {sub.systems?.length > 0 && (
              <span>
                {sub.systems.map(s => (
                  <span key={s} style={{ fontFamily: 'monospace', fontSize: '0.68rem', background: '#f1f3f4', border: '1px solid #dadce0', borderRadius: 3, padding: '0 4px', marginRight: 3 }}>{s}</span>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: '0.3rem' }}>
          {sub.decisions?.length > 0 && (
            <div style={{ marginBottom: '0.3rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#137333', marginBottom: 2 }}>Decisions</div>
              {sub.decisions.map((d, i) => (
                <div key={i} style={{ fontSize: '0.77rem', paddingLeft: '0.5rem', marginBottom: 2 }}>
                  {d.date && <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginRight: 6 }}>{d.date}</span>}
                  {d.text}
                </div>
              ))}
            </div>
          )}
          <Timeline current={sub.timeline?.current} earlier={sub.timeline?.earlier} />
        </div>
      )}
    </div>
  )
}

function TopicRow({ topic }) {
  const [open, setOpen] = useState(false)
  const flags = topic.flags || []
  const subTopics = topic.subTopics || []
  const sharedUpdates = topic.sharedUpdates || []

  return (
    <div style={{ borderBottom: '1px solid var(--sapList_BorderColor, #e0e0e0)', padding: '0.6rem 0' }}>
      <div
        style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <span style={{ marginTop: 2, color: 'var(--text-muted)', fontSize: '0.7rem', flexShrink: 0 }}>
          {open ? '▼' : '▶'}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {topic.id && (
              <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                {topic.id}
              </span>
            )}
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{topic.title}</span>
            <StatusBadge status={topic.status} />
            {flags.map(f => <FlagBadge key={f} flag={f} />)}
          </div>
          <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: 2, display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {topic.owner && topic.owner !== 'TBD' && <span>Owner: {topic.owner}</span>}
            {topic.due && topic.due !== 'TBD' && <span>Due: {topic.due}</span>}
            {topic.references && <span style={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>{topic.references}</span>}
          </div>
          {topic.summary && (
            <div style={{ fontSize: '0.79rem', color: '#444', marginTop: 3, fontStyle: 'italic', lineHeight: 1.45 }}>
              {topic.summary}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div style={{ marginLeft: '1.2rem', marginTop: '0.4rem' }}>
          {topic.decisions?.length > 0 && (
            <div style={{ marginBottom: '0.35rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#137333', marginBottom: 3 }}>Decisions</div>
              {topic.decisions.map((d, i) => (
                <div key={i} style={{ fontSize: '0.77rem', paddingLeft: '0.5rem', marginBottom: 2 }}>
                  {d.date && <span style={{ fontFamily: 'monospace', color: 'var(--text-muted)', marginRight: 6 }}>{d.date}</span>}
                  {d.text}
                </div>
              ))}
            </div>
          )}

          {subTopics.length > 0 && (
            <div style={{ marginBottom: '0.35rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#555', marginBottom: 4 }}>Sub-topics</div>
              {subTopics.map((s, i) => <SubTopicRow key={s.id || i} sub={s} />)}
            </div>
          )}

          {sharedUpdates.length > 0 && (
            <div style={{ marginBottom: '0.35rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#555', marginBottom: 2 }}>Shared updates</div>
              {sharedUpdates.map((u, i) => (
                <div key={i} style={{ fontSize: '0.77rem', color: '#555', paddingLeft: '0.5rem' }}>• {typeof u === 'string' ? u : u.text}</div>
              ))}
            </div>
          )}

          {!topic.isSection && (
            <Timeline current={topic.timeline?.current} earlier={topic.timeline?.earlier} />
          )}
        </div>
      )}
    </div>
  )
}

export default function MeetingTopics({ panel }) {
  const topics = Array.isArray(panel?.data) ? panel.data : []
  if (topics.length === 0) {
    return <div style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No topics.</div>
  }
  return (
    <div style={{ fontSize: '0.85rem' }}>
      {topics.map((t, i) => <TopicRow key={`${t.id || t.title || ''}-${i}`} topic={t} />)}
    </div>
  )
}
