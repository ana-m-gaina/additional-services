import { useState } from 'react'
import BeaconRightPanel from './BeaconRightPanel.jsx'
import useLocalStorage from '../useLocalStorage.js'

const SCREENS = ['Dashboard', 'Documents', 'Ops tools', 'Work at risk', 'Customer health']

function StatCard({ label, value, sub, subColor }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: subColor || 'var(--text-3)', marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

function ActionItem({ title, detail, age, btnLabel, urgency, onBtn }) {
  const colors = { danger: '#E24B4A', warn: '#EF9F27', info: 'var(--blue)' }
  const iconBg = { danger: { bg: 'var(--red-bg)', color: 'var(--red)' }, warn: { bg: 'var(--amber-bg)', color: 'var(--amber)' }, info: { bg: 'var(--blue-bg)', color: 'var(--blue)' } }
  const ic = iconBg[urgency] || iconBg.info
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8, borderLeft: `3px solid ${colors[urgency] || colors.info}`, cursor: 'pointer', transition: 'background .12s' }}
      onMouseEnter={e => e.currentTarget.style.background = '#EEECEA'}
      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
    >
      <div style={{ width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0, ...ic }}>
        {urgency === 'danger' ? '⚠' : urgency === 'warn' ? '⏱' : '✦'}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{title}</div>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{detail}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{age}</span>
        {btnLabel && (
          <button onClick={e => { e.stopPropagation(); onBtn?.() }}
            style={{ fontSize: 11, padding: '3px 8px', border: '1px solid var(--border-md)', borderRadius: 6, background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font)' }}>
            {btnLabel} ↗
          </button>
        )}
      </div>
    </div>
  )
}

function DashboardScreen({ customer }) {
  const cid = customer?.ID || 'global'
  const [stats, setStats] = useLocalStorage(`beacon:stats:${cid}`, { incidents: '', cases: '', milestones: '', nextMeeting: '' })
  const [actions, setActions] = useLocalStorage(`beacon:actions:${cid}`, [])
  const [newAction, setNewAction] = useState('')

  function addAction() {
    if (!newAction.trim()) return
    setActions(prev => [...prev, { id: Date.now(), text: newAction.trim(), done: false }])
    setNewAction('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
        {[
          { key: 'incidents',   label: 'Open incidents',    placeholder: '0' },
          { key: 'cases',       label: 'Open cases',        placeholder: '0' },
          { key: 'milestones',  label: 'Milestones',        placeholder: '0' },
          { key: 'nextMeeting', label: 'Next ops meeting',  placeholder: 'dd Mon' },
        ].map(({ key, label, placeholder }) => (
          <div key={key} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 5 }}>{label}</div>
            <input
              value={stats[key]}
              onChange={e => setStats(s => ({ ...s, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{ fontSize: 20, fontWeight: 500, lineHeight: 1, width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font)', color: 'var(--text)', padding: 0 }}
            />
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase' }}>Today's actions</span>
          {actions.some(a => !a.done) && (
            <button onClick={() => setActions(prev => prev.map(a => ({ ...a, done: true })))}
              style={{ fontSize: 12, color: 'var(--blue)', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font)', padding: 0 }}>
              Mark all reviewed
            </button>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <input value={newAction} onChange={e => setNewAction(e.target.value)} onKeyDown={e => e.key === 'Enter' && addAction()}
            placeholder="Add action item…"
            style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--border-md)', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font)', color: 'var(--text)', background: 'var(--bg)', outline: 'none' }} />
          <button onClick={addAction}
            style={{ padding: '6px 12px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
            Add
          </button>
        </div>
        {actions.length === 0
          ? <div style={{ fontSize: 12, color: 'var(--text-3)', padding: '4px 0', fontStyle: 'italic' }}>No actions yet — add one above or use the chat.</div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {actions.filter(a => !a.done).map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg)', borderRadius: 7 }}>
                  <input type="checkbox" onChange={() => setActions(prev => prev.map(x => x.id === a.id ? { ...x, done: true } : x))} style={{ accentColor: 'var(--blue)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text)', flex: 1 }}>{a.text}</span>
                  <button onClick={() => setActions(prev => prev.filter(x => x.id !== a.id))}
                    style={{ fontSize: 10, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}>✕</button>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  )
}

function DocumentsScreen({ customer }) {
  const cid = customer?.ID || 'global'
  const zones = [
    { key: 'contract', label: 'Customer contract', sub: 'PDF or Word · go-live date, scope, SLA tier, value' },
    { key: 'crs',      label: 'Change Requests',   sub: 'PDF or Word · CR labels, dates, values' },
    { key: 'ded',      label: 'DED landscape export', sub: 'Excel or CSV · systems, RAM, status' },
    { key: 'srs',      label: 'Service Requests',  sub: 'CSV · open SRs and incidents (optional)' },
  ]
  const [files, setFiles] = useLocalStorage(`beacon:docs:${cid}`, {})

  function handleDrop(key, e) {
    e.preventDefault()
    const f = e.dataTransfer?.files?.[0] || e.target.files?.[0]
    if (f) setFiles(prev => ({ ...prev, [key]: { name: f.name, status: 'Uploaded', date: new Date().toLocaleDateString() } }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {zones.map(z => (
          <label key={z.key}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(z.key, e)}
            style={{ border: '1.5px dashed var(--border-md)', borderRadius: 14, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all .15s', background: 'var(--surface)', display: 'block' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.background = 'var(--blue-bg)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-md)'; e.currentTarget.style.background = 'var(--surface)' }}
          >
            <input type="file" style={{ display: 'none' }} onChange={e => handleDrop(z.key, e)} />
            <div style={{ fontSize: 22, marginBottom: 6 }}>📄</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{z.label}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{z.sub}</div>
          </label>
        ))}
      </div>
      {Object.entries(files).map(([key, f]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border)' }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: 'var(--blue-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📄</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>{zones.find(z => z.key === key)?.label}</div>
          </div>
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: 'var(--green-bg)', color: 'var(--green)' }}>{f.status}</span>
          <button onClick={() => setFiles(prev => { const n = { ...prev }; delete n[key]; return n })}
            style={{ fontSize: 10, color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}>✕</button>
        </div>
      ))}
    </div>
  )
}

function OpsToolsScreen({ customer }) {
  const cid = customer?.ID || 'global'
  const [sentiment, setSentiment] = useState(null)
  const [note, setNote]           = useState('')
  const [history, setHistory]     = useLocalStorage(`beacon:sentiment:${cid}`, [])

  function saveSentiment() {
    if (!sentiment) return
    setHistory(h => [{ sentiment, note, date: new Date().toLocaleDateString() }, ...h])
    setSentiment(null)
    setNote('')
  }

  const sentColors = { Positive: { border: 'var(--green)', bg: 'var(--green-bg)', color: 'var(--green)' }, Neutral: { border: '#EF9F27', bg: 'var(--amber-bg)', color: 'var(--amber)' }, Frustrated: { border: '#E24B4A', bg: 'var(--red-bg)', color: 'var(--red)' } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Ops meeting prep */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 12 }}>Ops meeting prep</div>
        {[
          { icon: '📝', label: 'Draft OneNote meeting template', prompt: 'Draft a OneNote ops meeting template for ' + customer?.displayName },
          { icon: '📋', label: 'Pull open actions', prompt: 'List all open actions for ' + customer?.displayName },
          { icon: '📊', label: 'Generate engagement summary', prompt: 'Generate an engagement summary for ' + customer?.displayName },
        ].map(b => (
          <button key={b.label}
            style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border-md)', borderRadius: 8, background: 'var(--surface)', color: 'var(--text)', fontSize: 12, fontFamily: 'var(--font)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, textAlign: 'left', transition: 'background .12s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
            onClick={() => document.dispatchEvent(new CustomEvent('cdm:fire-prompt', { detail: { content: b.prompt } }))}
          >
            <span style={{ fontSize: 14 }}>{b.icon}</span> {b.label}
          </button>
        ))}
      </div>

      {/* Sentiment log */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 12 }}>Post-meeting sentiment</div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {['Positive', 'Neutral', 'Frustrated'].map(s => {
            const c = sentColors[s]
            const picked = sentiment === s
            return (
              <button key={s} onClick={() => setSentiment(s)}
                style={{ flex: 1, padding: 7, borderRadius: 6, border: `1.5px solid ${picked ? c.border : 'var(--border-md)'}`, fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font)', background: picked ? c.bg : 'var(--surface)', color: picked ? c.color : 'var(--text-2)', fontWeight: 500, transition: 'all .15s' }}>
                {s === 'Positive' ? '😊' : s === 'Neutral' ? '😐' : '😟'} {s}
              </button>
            )
          })}
        </div>
        <textarea
          placeholder="Optional note…"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={2}
          style={{ width: '100%', padding: '7px 10px', border: '1px solid var(--border-md)', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font)', color: 'var(--text)', background: 'var(--bg)', resize: 'none', outline: 'none', boxSizing: 'border-box', marginBottom: 8 }}
        />
        <button onClick={saveSentiment} disabled={!sentiment}
          style={{ padding: '6px 14px', background: sentiment ? 'var(--blue)' : 'var(--border)', color: sentiment ? '#fff' : 'var(--text-3)', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: sentiment ? 'pointer' : 'default', fontFamily: 'var(--font)', transition: 'background .15s' }}>
          Save
        </button>

        {history.length > 0 && (
          <div style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 8 }}>History</div>
            {history.map((h, i) => {
              const c = sentColors[h.sentiment]
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: c.border, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{h.date}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-2)', flex: 1 }}>{h.note || h.sentiment}</span>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: c.bg, color: c.color }}>{h.sentiment}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function WaRScreen({ customer }) {
  const cid = customer?.ID || 'global'
  const [items, setItems] = useLocalStorage(`beacon:war:${cid}`, [])
  const [newItem, setNewItem] = useState('')

  function addItem() {
    if (!newItem.trim()) return
    setItems(prev => [...prev, { id: Date.now(), title: newItem.trim(), startDate: Date.now() }])
    setNewItem('')
  }

  function daysAgo(ts) { return Math.floor((Date.now() - ts) / 86400000) }

  function ageColor(days) {
    if (days >= 15) return { color: 'var(--red)', bg: 'var(--red-bg)' }
    if (days >= 10) return { color: 'var(--amber)', bg: 'var(--amber-bg)' }
    return { color: 'var(--blue)', bg: 'var(--blue-bg)' }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 12 }}>Work at risk</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()}
            placeholder="Describe the risk item…"
            style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--border-md)', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font)', color: 'var(--text)', background: 'var(--bg)', outline: 'none' }} />
          <button onClick={addItem}
            style={{ padding: '6px 14px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}>
            Add
          </button>
        </div>
        {items.length === 0 && <div style={{ fontSize: 12, color: 'var(--text-3)', fontStyle: 'italic' }}>No WaR items — add one above.</div>}
        {items.map(item => {
          const days = daysAgo(item.startDate)
          const { color, bg } = ageColor(days)
          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--bg)', borderRadius: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 500, minWidth: 40, color }}>{days}d</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{item.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                  {days < 10 ? 'Monitor' : days < 15 ? 'Active chase required' : 'Escalate now'}
                </div>
              </div>
              <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: bg, color }}>{days >= 15 ? 'Escalate' : days >= 10 ? 'Chase' : 'Monitor'}</span>
              <button onClick={() => setItems(prev => prev.filter(i => i.id !== item.id))}
                style={{ fontSize: 11, padding: '3px 8px', border: '1px solid var(--border-md)', borderRadius: 6, background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'var(--font)' }}>
                Close
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function HealthScreen({ customer }) {
  const cid = customer?.ID || 'global'
  const [health, setHealth] = useLocalStorage(`beacon:health:${cid}`, { escalations: 0, csat: 4, slaBreach: false, driftDays: 0 })
  const { escalations, csat, slaBreach, driftDays } = health
  function set(key, val) { setHealth(h => ({ ...h, [key]: val })) }

  const score = Math.min(100,
    Math.min(50, escalations * 25) +
    (csat < 3 ? 30 : csat <= 4 ? 10 : 0) +
    (slaBreach ? 20 : 0) +
    (driftDays > 14 ? 10 : 0)
  )
  const risk = score <= 20 ? { label: 'Low', color: 'var(--green)', bg: 'var(--green-bg)' }
             : score <= 50 ? { label: 'Medium', color: 'var(--amber)', bg: 'var(--amber-bg)' }
             :               { label: 'High', color: 'var(--red)', bg: 'var(--red-bg)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 12 }}>Churn score — {customer?.displayName}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 48, fontWeight: 300, lineHeight: 1, color: risk.color }}>{score}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: risk.color, padding: '3px 10px', borderRadius: 99, background: risk.bg, display: 'inline-block', marginBottom: 4 }}>{risk.label} risk</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Score out of 100</div>
          </div>
        </div>
        <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, marginBottom: 16 }}>
          <div style={{ height: 5, borderRadius: 3, background: risk.color, width: `${score}%`, transition: 'width .4s' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Escalations this month', value: escalations, onChange: v => set('escalations', Number(v)), type: 'number', min: 0, max: 10 },
            { label: 'CSAT score (last known)', value: csat, onChange: v => set('csat', Number(v)), type: 'number', min: 1, max: 5 },
            { label: 'Go-live drift (days)', value: driftDays, onChange: v => set('driftDays', Number(v)), type: 'number', min: 0, max: 90 },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{f.label}</span>
              <input type={f.type} value={f.value} min={f.min} max={f.max} onChange={e => f.onChange(e.target.value)}
                style={{ width: 60, padding: '4px 8px', border: '1px solid var(--border-md)', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font)', textAlign: 'center', outline: 'none', background: 'var(--bg)' }} />
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Active SLA breach</span>
            <input type="checkbox" checked={slaBreach} onChange={e => set('slaBreach', e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--blue)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BeaconDashboard({ customer, cdmEmail, onStartChat }) {
  const cid = customer?.ID || 'global'
  const [screen, setScreen] = useLocalStorage(`beacon:screen:${cid}`, 'Dashboard')

  const RAG = customer?.ragStatus || 'track'
  const ragColors = { risk: { bg: 'var(--red-bg)', color: 'var(--red)', label: 'At risk' }, attention: { bg: 'var(--amber-bg)', color: 'var(--amber)', label: 'Needs attention' }, track: { bg: 'var(--green-bg)', color: 'var(--green)', label: 'On track' } }
  const rag = ragColors[RAG] || ragColors.track

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* Customer topbar */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{customer?.displayName || 'No customer'}</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'var(--blue-bg)', color: 'var(--blue-dark)' }}>{customer?.engagementType || 'Steady-state'}</span>
            {customer?.customerId && (
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)', background: 'var(--bg)', padding: '2px 7px', borderRadius: 4 }}>{customer.customerId}</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: rag.bg, color: rag.color }}>{rag.label}</span>
            <button onClick={() => document.dispatchEvent(new CustomEvent('cdm:fire-prompt', { detail: { content: `Upload documents for ${customer?.displayName}` } }))}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, padding: '5px 10px', border: '1px solid var(--border-md)', borderRadius: 6, background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Upload docs
            </button>
            <button onClick={onStartChat}
              style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, padding: '5px 10px', border: '1px solid var(--border-md)', borderRadius: 6, background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', fontFamily: 'var(--font)' }}>
              Ask Beacon
            </button>
          </div>
        </div>

        {/* Screen nav */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 0, flexShrink: 0 }}>
          {SCREENS.map(s => (
            <button key={s} onClick={() => setScreen(s)}
              style={{ padding: '10px 16px', fontSize: 12, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font)', borderBottom: `2px solid ${screen === s ? 'var(--blue)' : 'transparent'}`, color: screen === s ? 'var(--blue)' : 'var(--text-3)', fontWeight: screen === s ? 500 : 400, transition: 'all .12s', marginBottom: -1 }}>
              {s}
            </button>
          ))}
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {screen === 'Dashboard'       && <DashboardScreen customer={customer} />}
          {screen === 'Documents'       && <DocumentsScreen customer={customer} />}
          {screen === 'Ops tools'       && <OpsToolsScreen customer={customer} />}
          {screen === 'Work at risk'    && <WaRScreen customer={customer} />}
          {screen === 'Customer health' && <HealthScreen customer={customer} />}
        </div>
      </div>

      {/* Right panel */}
      <BeaconRightPanel customer={customer} onStartChat={onStartChat} cdmEmail={cdmEmail} />
    </div>
  )
}
