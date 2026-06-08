import { useState, useEffect } from 'react'
import { getCustomerAgents, postAgent, patchAgent, getPersonalTemplates, savePersonalTemplate } from '../api.js'

const RAG_COLORS = { risk: '#A32D2D', attention: '#854F0B', track: '#3B6D11' }

function RagDot({ status }) {
  const color = RAG_COLORS[status] || RAG_COLORS.track
  return <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 4, display: 'inline-block' }} />
}

function Badge({ text, color }) {
  const styles = {
    risk:      { background: '#FCEBEB', color: '#A32D2D' },
    attention: { background: '#FAEEDA', color: '#854F0B' },
    track:     { background: '#EAF3DE', color: '#3B6D11' },
    blue:      { background: '#E6F1FB', color: '#185FA5' },
  }
  const s = styles[color] || styles.blue
  return (
    <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 99, whiteSpace: 'nowrap', ...s }}>
      {text}
    </span>
  )
}

function ChecklistItem({ label }) {
  const [checked, setChecked] = useState(false)
  return (
    <div
      onClick={() => setChecked(c => !c)}
      style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 14px', cursor: 'pointer', fontSize: 11, color: checked ? 'var(--text-3)' : 'var(--text-2)', textDecoration: checked ? 'line-through' : 'none' }}
    >
      <span style={{ width: 13, height: 13, border: `1.5px solid ${checked ? 'var(--green)' : 'var(--border-md)'}`, borderRadius: 3, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: checked ? 'var(--green-bg)' : 'transparent', transition: 'all .12s' }}>
        {checked && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><polyline points="1,4 3,6 7,2" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      {label}
    </div>
  )
}

function NavDrawer({ open, children }) {
  return (
    <div style={{ overflow: 'hidden', maxHeight: open ? 400 : 0, transition: 'max-height .22s ease', background: 'var(--bg)' }}>
      {children}
    </div>
  )
}

const MIGRATION_STEPS = [
  'Kickoff call with migration PM',
  'Contract milestones reviewed in CMS',
  'DEV system build confirmed',
  'QAS system build confirmed',
  'PROD go-live date confirmed with PM',
  'DED updated with go-live date',
  'Hypercare period confirmed',
  'Post-migration ops meeting scheduled',
]

const CONVERSION_STEPS = [
  'Project Lead assigned',
  'Upgrade Expert assigned',
  'Conversion scope reviewed vs contract',
  'Sandbox system available',
  'Customer readiness confirmed',
  'Go-live date locked in DED',
]

export default function NavTree({ currentUser, onSelectClient, onFirePrompt, onOpenPrompts, refreshToken = 0 }) {
  const [customers, setCustomers] = useState([])
  const [activeId, setActiveId]   = useState(null)

  const [migOpen, setMigOpen] = useState(false)
  const [conOpen, setConOpen] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName]   = useState('')
  const [newId, setNewId]       = useState('')
  const [newType, setNewType]   = useState('Migration')
  const [newStatus, setNewStatus] = useState('track')

  async function load() {
    try { setCustomers(await getCustomerAgents()) } catch { /* ignore */ }
  }

  useEffect(() => { load() }, [refreshToken])

  async function submitAdd() {
    if (!newName.trim()) return
    await postAgent('CustomerAgents', {
      ID: crypto.randomUUID(),
      customerId: newId.trim() || `CTR-${Date.now()}`,
      displayName: newName.trim(),
      engagementType: newType,
      ragStatus: newStatus,
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
    })
    setShowAddModal(false)
    setNewName(''); setNewId(''); setNewType('Migration'); setNewStatus('track')
    load()
  }

  function handleSelect(c) {
    setActiveId(c.ID)
    onSelectClient?.(c)
  }

  const atRisk      = customers.filter(c => c.ragStatus === 'risk')
  const needsAttn   = customers.filter(c => c.ragStatus === 'attention')
  const onTrack     = customers.filter(c => !c.ragStatus || c.ragStatus === 'track')

  function CustomerItem({ c, status }) {
    return (
      <div
        className={`lr-cust-item${activeId === c.ID ? ' active' : ''}`}
        onClick={() => handleSelect(c)}
      >
        <RagDot status={status} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.displayName}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
            <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{c.engagementType || 'Steady-state'}</span>
            {c.badge && <Badge text={c.badge} color={status} />}
          </div>
        </div>
      </div>
    )
  }

  function Section({ label, count, status, items }) {
    if (items.length === 0) return null
    return (
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '10px 14px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{label}</span>
          <span style={{ fontWeight: 400, letterSpacing: 0 }}>{count}</span>
        </div>
        {items.map(c => <CustomerItem key={c.ID} c={c} status={status} />)}
      </div>
    )
  }

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>My customers</span>
        <button className="lr-add-btn" onClick={() => setShowAddModal(true)}>Add</button>
      </div>

      {/* Customer sections */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '6px 0 0' }}>
        <Section label="At risk"        count={atRisk.length}    status="risk"      items={atRisk} />
        <Section label="Needs attention" count={needsAttn.length} status="attention" items={needsAttn} />
        <Section label="On track"       count={onTrack.length}   status="track"     items={onTrack} />

        {customers.length === 0 && (
          <div style={{ padding: '10px 14px', fontSize: 11, color: 'var(--text-3)', fontStyle: 'italic' }}>No customers yet</div>
        )}

        {/* Quick Nav */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 6, marginTop: 8 }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 14px 6px' }}>Quick nav</div>

          {/* Pricing lookup */}
          <div className="lr-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span>Pricing lookup</span>
          </div>

          {/* Migration checklist */}
          <div className={`lr-nav-item${migOpen ? ' open' : ''}`} onClick={() => setMigOpen(o => !o)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>Migration checklist</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', transform: migOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }}><polyline points="2,3 5,7 8,3"/></svg>
          </div>
          <NavDrawer open={migOpen}>
            {MIGRATION_STEPS.map(s => <ChecklistItem key={s} label={s} />)}
          </NavDrawer>

          {/* Conversion checklist */}
          <div className={`lr-nav-item${conOpen ? ' open' : ''}`} onClick={() => setConOpen(o => !o)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span>Conversion checklist</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', transform: conOpen ? 'rotate(180deg)' : 'none', transition: 'transform .18s' }}><polyline points="2,3 5,7 8,3"/></svg>
          </div>
          <NavDrawer open={conOpen}>
            {CONVERSION_STEPS.map(s => <ChecklistItem key={s} label={s} />)}
          </NavDrawer>

          {/* Ops meeting prep */}
          <div className="lr-nav-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Ops meeting prep</span>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setShowAddModal(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: 10, padding: '22px 24px', width: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.14)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>Add customer</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>Customer name *</label>
                <input autoFocus className="lr-input" placeholder="e.g. Müller AG" value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitAdd()} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>Contract ID</label>
                <input className="lr-input" placeholder="e.g. CTR-2024-01234" value={newId} onChange={e => setNewId(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>Engagement type</label>
                <select className="lr-input" value={newType} onChange={e => setNewType(e.target.value)}>
                  {['Migration','Conversion','Upgrade','Steady-state','New contract'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-2)', display: 'block', marginBottom: 4 }}>Status</label>
                <select className="lr-input" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                  <option value="risk">At risk</option>
                  <option value="attention">Needs attention</option>
                  <option value="track">On track</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="lr-btn-primary" onClick={submitAdd}>Add customer</button>
              <button className="lr-btn-ghost" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
