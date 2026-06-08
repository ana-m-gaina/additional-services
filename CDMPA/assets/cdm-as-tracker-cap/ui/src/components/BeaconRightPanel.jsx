import { useState } from 'react'

const TABS = ['Landscape', 'Timeline', 'Beacon AI']

function SystemRow({ type, name, status, ram, mismatch }) {
  const typeBg = { PRD: { bg: 'var(--blue-bg)', color: 'var(--blue-dark)' }, QAS: { bg: 'var(--amber-bg)', color: 'var(--amber)' }, DEV: { bg: 'var(--green-bg)', color: 'var(--green)' } }
  const t = typeBg[type] || typeBg.PRD
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 4, ...t }}>{type}</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{name}</span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 10, color: status === 'Live' ? 'var(--green)' : 'var(--text-3)' }}>◎ {status}</div>
        {ram && <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>{ram}</div>}
        {mismatch && <div style={{ fontSize: 9, color: 'var(--red)', background: 'var(--red-bg)', padding: '1px 5px', borderRadius: 3, marginTop: 2, display: 'inline-block' }}>PQA mismatch</div>}
      </div>
    </div>
  )
}

function SnapshotRow({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 11, color: 'var(--text-2)' }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 500, color: highlight ? 'var(--amber)' : 'var(--text)' }}>{value}</span>
    </div>
  )
}

function LandscapeTab({ customer }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>Systems</span>
        <span style={{ fontSize: 10, color: 'var(--blue)', cursor: 'pointer' }}>Sync PQA</span>
      </div>
      <div>
        <SystemRow type="PRD" name="S/4HANA 2023" status="Live" ram="512 GB RAM" />
        <SystemRow type="QAS" name="S/4HANA 2023" status="Live" ram="256 GB RAM" mismatch />
        <SystemRow type="DEV" name="S/4HANA 2023" status="Live" ram="128 GB RAM" />
      </div>

      <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 18, marginBottom: 8 }}>Contract snapshot</div>
      <div>
        <SnapshotRow label="Go-live (contract)" value="—" />
        <SnapshotRow label="Go-live (estimate)"  value="—" />
        <SnapshotRow label="Hypercare end"        value="—" />
        <SnapshotRow label="Renewal"              value="—" />
        <SnapshotRow label="Contract value"       value="—" />
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, fontStyle: 'italic' }}>Upload a contract document to populate.</div>
    </div>
  )
}

function TimelineTab({ customer }) {
  const milestones = [
    { label: 'Contract signed', date: '—', tag: null },
    { label: 'Go-live (contract)', date: '—', tag: null },
    { label: 'Go-live (estimate)', date: '—', tag: 'drift' },
    { label: 'Hypercare end', date: '—', tag: null },
    { label: 'Renewal', date: '—', tag: 'upcoming' },
  ]
  const tagStyle = { drift: { bg: 'var(--amber-bg)', color: 'var(--amber)', label: 'Drift' }, upcoming: { bg: 'var(--blue-bg)', color: 'var(--blue)', label: 'Upcoming' }, ok: { bg: 'var(--green-bg)', color: 'var(--green)', label: 'On time' } }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {milestones.map((m, i) => (
        <div key={m.label} style={{ display: 'flex', gap: 10, padding: '9px 0', position: 'relative' }}>
          {i < milestones.length - 1 && (
            <div style={{ position: 'absolute', left: 13, top: 30, bottom: -9, width: 1, background: 'var(--border)' }} />
          )}
          <div style={{ width: 27, height: 27, borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0, zIndex: 1 }}>◎</div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{m.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{m.date}</div>
            {m.tag && (
              <span style={{ display: 'inline-flex', fontSize: 10, padding: '2px 7px', borderRadius: 99, marginTop: 4, ...(() => { const t = tagStyle[m.tag] || tagStyle.ok; return { background: t.bg, color: t.color } })() }}>
                {tagStyle[m.tag]?.label || m.tag}
              </span>
            )}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 8, fontStyle: 'italic' }}>Upload a contract to populate milestone dates.</div>
    </div>
  )
}

function BeaconAITab({ customer, cdmEmail, onStartChat }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, padding: '24px 0' }}>
      <div style={{ fontSize: 32 }}>✦</div>
      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', textAlign: 'center' }}>Ask Beacon about {customer?.displayName}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', textAlign: 'center', maxWidth: 220 }}>
        The AI assistant has full context of this customer's contracts, systems, and history.
      </div>
      <button onClick={onStartChat}
        style={{ padding: '8px 20px', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', transition: 'background .12s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-dark)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}>
        Open chat
      </button>
    </div>
  )
}

export default function BeaconRightPanel({ customer, onStartChat, cdmEmail }) {
  const [tab, setTab] = useState('Landscape')

  return (
    <div style={{ width: 300, flexShrink: 0, background: 'var(--surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: '10px 6px', fontSize: 11, textAlign: 'center', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'var(--font)', borderBottom: `2px solid ${tab === t ? 'var(--blue)' : 'transparent'}`, marginBottom: -1, color: tab === t ? 'var(--blue)' : 'var(--text-3)', fontWeight: tab === t ? 500 : 400, transition: 'all .12s' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
        {tab === 'Landscape' && <LandscapeTab customer={customer} />}
        {tab === 'Timeline'  && <TimelineTab customer={customer} />}
        {tab === 'Beacon AI' && <BeaconAITab customer={customer} cdmEmail={cdmEmail} onStartChat={onStartChat} />}
      </div>
    </div>
  )
}
