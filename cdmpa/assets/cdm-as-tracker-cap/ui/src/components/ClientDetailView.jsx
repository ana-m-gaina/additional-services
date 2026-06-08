import { useState, useEffect, useMemo } from 'react'
import { TabContainer, Tab } from '@ui5/webcomponents-react'
import { getActiveRequests, getConversationSessions, getMeetingNotes,
         getLandscapePhases, getLandscapeWeeklyStatus, getLandscapeTopIssues, getLandscapeSystems, getLandscapeComponents,
         getContractEngagements, getContractDocuments } from '../api.js'
import RequestDetailDrawer from './RequestDetailDrawer.jsx'
import MeetingTopics      from './panels/MeetingTopics.jsx'
import MeetingActionItems from './panels/MeetingActionItems.jsx'
import MeetingRisks       from './panels/MeetingRisks.jsx'

const STATUS_GROUPS = {
  open:       ['New', 'PriceCommunicated'],
  inProgress: ['ApprovalReceived', 'DeliveryStarted'],
  done:       ['DeliveryConfirmed', 'InvoiceCreated', 'Invoiced'],
}

function classify(status) {
  if (STATUS_GROUPS.open.includes(status))       return 'open'
  if (STATUS_GROUPS.inProgress.includes(status)) return 'inProgress'
  if (STATUS_GROUPS.done.includes(status))       return 'done'
  return 'open'
}

function daysSince(dateStr) {
  if (!dateStr) return null
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

const STATUS_DOT = {
  New:               '#0070f2',
  PriceCommunicated: '#df6e0c',
  ApprovalReceived:  '#188918',
  DeliveryStarted:   '#188918',
  DeliveryConfirmed: '#188918',
  InvoiceCreated:    '#6a6d70',
  Invoiced:          '#6a6d70',
}

/* ── Requests tab ──────────────────────────────────────────────────────────── */
function RequestsTab({ requests, loading, onSelectReq }) {
  const [showAll, setShowAll] = useState(false)

  const staleAlerts = useMemo(() => {
    const out = []
    requests.forEach(r => {
      const age = daysSince(r.createdAt)
      if (r.status === 'New' && age >= 7)
        out.push(`"${r.requestTitle}" — New for ${age} days, no price sent yet`)
      if (r.status === 'PriceCommunicated' && !r.poNumber && daysSince(r.priceCommunicatedDate) >= 14)
        out.push(`"${r.requestTitle}" — Price sent ${daysSince(r.priceCommunicatedDate)}d ago, no PO received`)
      if (r.status === 'ApprovalReceived' && daysSince(r.approvalDate) >= 30)
        out.push(`"${r.requestTitle}" — Approved ${daysSince(r.approvalDate)}d ago, delivery not started`)
    })
    return out
  }, [requests])

  const openReqs = useMemo(() => requests.filter(r => classify(r.status) !== 'done'), [requests])
  const rows = showAll ? requests : openReqs

  return (
    <div className="cdv-section">
      {staleAlerts.length > 0 && (
        <div className="cdv-alerts">
          {staleAlerts.map((msg, i) => (
            <div key={i} className="cdv-alert-row">
              <span className="cdv-alert-dot" />
              {msg}
            </div>
          ))}
        </div>
      )}

      <div className="cdv-table-toolbar">
        <span className="cdv-table-title">
          {showAll ? `All requests (${requests.length})` : `Open requests (${openReqs.length})`}
        </span>
        <button className="cdv-toggle-btn" onClick={() => setShowAll(s => !s)}>
          {showAll ? 'Show open only' : 'Show all'}
        </button>
      </div>

      {loading && <div className="cdv-empty">Loading…</div>}
      {!loading && rows.length === 0 && (
        <div className="cdv-empty">No {showAll ? '' : 'open '}requests for this client.</div>
      )}
      {!loading && rows.length > 0 && (
        <table className="client-req-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Service Code</th>
              <th>Amount</th>
              <th>Storage (GB)</th>
              <th>Data Center</th>
              <th>DR Site</th>
              <th>Phase</th>
              <th>Duration</th>
              <th>Month Start</th>
              <th>Month End</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>SID</th>
              <th>Price</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.ID} className="client-req-row" onClick={() => onSelectReq(r)}>
                <td>{r.requestTitle}</td>
                <td>
                  <span
                    className={`status-badge status-${r.status?.toLowerCase().replace(/\s/g, '-')}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUS_DOT[r.status] || '#aaa', flexShrink: 0 }} />
                    {r.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{r.serviceCode || '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.amount ?? '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.storageGB != null ? r.storageGB : '—'}</td>
                <td style={{ fontSize: '0.82rem' }}>{r.dataCenter || '—'}</td>
                <td style={{ textAlign: 'center' }}>{r.drSite ? '✓' : '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.phase ?? '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.duration != null ? `${r.duration}m` : '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.monthStart ?? '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{r.monthEnd ?? '—'}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{r.startDate || '—'}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{r.endDate || '—'}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{r.sid || '—'}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {r.price ? `€ ${Number(r.price).toLocaleString('de-DE')}` : '—'}
                </td>
                <td style={{ color: daysSince(r.createdAt) > 14 ? '#c5221f' : 'var(--text-muted)' }}>
                  {daysSince(r.createdAt) ?? '—'}d
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

/* ── Meeting notes tab ─────────────────────────────────────────────────────── */
function buildMeetingTabs(meetingNote) {
  if (!meetingNote) return []

  let topics = [], actions = [], risks = [], decisions = [], srRefs = []
  let milestones = [], absences = [], systemMap = {}, staleTopics = [], upcomingActions = []
  let ownerHistory = {}, diff = null
  const full = (() => {
    try { return meetingNote.extractedJson ? JSON.parse(meetingNote.extractedJson) : null } catch { return null }
  })()

  if (full) {
    topics          = full.topics                    || []
    milestones      = full.milestones                || []
    absences        = full.absences                  || []
    actions         = full.analysis?.actionItems     || []
    risks           = full.analysis?.risks           || []
    decisions       = full.analysis?.decisions       || []
    srRefs          = full.analysis?.references      || []
    systemMap       = full.analysis?.systemMap       || {}
    staleTopics     = full.analysis?.staleTopics     || []
    upcomingActions = full.analysis?.upcomingActions || []
    ownerHistory    = full.analysis?.ownerHistory    || {}
    diff            = full.analysis?.diff            || null
  } else {
    try { topics    = JSON.parse(meetingNote.topicsJson      || '[]') } catch {}
    try { actions   = JSON.parse(meetingNote.actionItemsJson || '[]') } catch {}
    try { risks     = JSON.parse(meetingNote.risksJson       || '[]') } catch {}
    try { decisions = JSON.parse(meetingNote.decisionsJson   || '[]') } catch {}
  }

  const openRisks      = risks.filter(r => r.status === 'Open')
  const overdueActions = actions.filter(a => a.overdue)
  const sysEntries     = Object.entries(systemMap)
  const ownerEntries   = Object.entries(ownerHistory)

  return [
    topics.length > 0          && { key: 'topics',    label: `Topics (${topics.length})`,                                                            content: <MeetingTopics panel={{ data: topics }} /> },
    actions.length > 0         && { key: 'actions',   label: `Actions (${actions.length}${overdueActions.length > 0 ? `, ${overdueActions.length} overdue` : ''})`, content: <MeetingActionItems panel={{ data: actions }} /> },
    risks.length > 0           && { key: 'risks',     label: `Risks (${openRisks.length} open)`,                                                     content: <MeetingRisks panel={{ data: risks }} /> },
    staleTopics.length > 0     && { key: 'stale',     label: `Stale (${staleTopics.length})`,                                                        content: <StaleTopicsTable items={staleTopics} /> },
    decisions.length > 0       && { key: 'decisions', label: `Decisions (${decisions.length})`,                                                      content: <DecisionsTable decisions={decisions} /> },
    srRefs.length > 0          && { key: 'sr',        label: `SRs (${srRefs.length})`,                                                               content: <SrRefTable refs={srRefs} /> },
    diff                       && { key: 'diff',      label: 'What Changed',                                                                         content: <DiffSection diff={diff} /> },
    upcomingActions.length > 0 && { key: 'upcoming',  label: `Upcoming (${upcomingActions.length})`,                                                  content: <UpcomingActionsTable items={upcomingActions} /> },
    sysEntries.length > 0      && { key: 'sysmap',    label: 'Systems',                                                                              content: <SystemMapTable entries={sysEntries} /> },
    ownerEntries.length > 0    && { key: 'owners',    label: `Owners (${ownerEntries.length})`,                                                       content: <OwnerHistoryTable entries={ownerEntries} topics={topics} /> },
    milestones.length > 0      && { key: 'miles',     label: `Milestones (${milestones.length})`,                                                     content: <MilestonesTable milestones={milestones} /> },
    absences.length > 0        && { key: 'absences',  label: `Absences (${absences.length})`,                                                         content: <AbsencesTable absences={absences} /> },
  ].filter(Boolean)
}

function DecisionsTable({ decisions }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>ID</th><th>Date</th><th>Decision</th><th>Topic</th><th>Agreed by</th></tr>
      </thead>
      <tbody>
        {decisions.map((d, i) => (
          <tr key={d.id || i}>
            <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{d.id || '—'}</td>
            <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)' }}>{d.date || '—'}</td>
            <td>{d.text}</td>
            <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {[d.topicRef, d.subTopicRef].filter(Boolean).join(' › ')}
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{d.agreedBy || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SrRefTable({ refs }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>Reference</th><th>Type</th><th>Context</th><th>Topics</th><th>Status</th></tr>
      </thead>
      <tbody>
        {refs.map((s, i) => (
          <tr key={i}>
            <td style={{ fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>{s.ref || s.reference}</td>
            <td style={{ color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{s.type || '—'}</td>
            <td>{s.context || s.description}</td>
            <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {Array.isArray(s.topicRefs) ? s.topicRefs.join(', ') : (s.topicRef || '—')}
            </td>
            <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.status || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function MilestonesTable({ milestones }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>Date</th><th>Milestone</th><th>Comment</th></tr>
      </thead>
      <tbody>
        {milestones.map((m, i) => (
          <tr key={i}>
            <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{m.date || '—'}</td>
            <td style={{ fontWeight: 600 }}>{m.description || m.title}</td>
            <td style={{ color: 'var(--text-muted)' }}>{m.comment || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function AbsencesTable({ absences }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>Who</th><th>Date</th><th>Cover / Notes</th></tr>
      </thead>
      <tbody>
        {absences.map((a, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{a.who}</td>
            <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.date || '—'}</td>
            <td style={{ color: 'var(--text-muted)' }}>
              {[a.substitute1, a.substitute2Notes].filter(Boolean).join(' / ') || '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function UpcomingActionsTable({ items }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>Due</th><th>Owner</th><th>Action</th><th>Topic</th></tr>
      </thead>
      <tbody>
        {items.map((a, i) => (
          <tr key={i}>
            <td style={{ whiteSpace: 'nowrap', fontFamily: 'monospace', color: '#b06000', fontWeight: 600 }}>{a.dueDate || a.due || '—'}</td>
            <td style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{a.owner || '—'}</td>
            <td>{a.description || a.text}</td>
            <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{a.topicRef || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function StaleTopicsTable({ items }) {
  return (
    <table className="cdv-small-table">
      <thead>
        <tr><th>Topic</th><th>Last mentioned</th><th>Gap</th><th>Owner</th></tr>
      </thead>
      <tbody>
        {items.map((s, i) => (
          <tr key={s.topicId || i}>
            <td style={{ fontWeight: 600 }}>{s.topicTitle || s.title}</td>
            <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s.lastMentionedDate || '—'}</td>
            <td style={{ color: '#c5221f', whiteSpace: 'nowrap' }}>
              {s.gapDays != null ? `${s.gapDays}d` : s.gapWeeks != null ? `${s.gapWeeks}w` : '—'}
            </td>
            <td style={{ color: 'var(--text-muted)' }}>{s.owner || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SystemMapTable({ entries }) {
  const concentrated = entries.filter(([, v]) => v.concentrationRisk)
  const normal = entries.filter(([, v]) => !v.concentrationRisk)
  return (
    <div>
      {concentrated.length > 0 && (
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c5221f', marginBottom: 4 }}>
            Concentration risk ({concentrated.length} system{concentrated.length !== 1 ? 's' : ''} in 3+ topics)
          </div>
          {concentrated.map(([sys, v]) => (
            <div key={sys} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: 3 }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8rem', color: '#c5221f', width: 44, flexShrink: 0 }}>{sys}</span>
              <span style={{ fontSize: '0.78rem', color: '#555' }}>topics: {v.topics.join(', ')}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 4 }}>{v.mentions} mention{v.mentions !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      )}
      {normal.length > 0 && (
        <table className="cdv-small-table">
          <thead><tr><th>System</th><th>Topics</th><th>Mentions</th></tr></thead>
          <tbody>
            {normal.map(([sys, v]) => (
              <tr key={sys}>
                <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{sys}</td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{v.topics.join(', ')}</td>
                <td style={{ color: 'var(--text-muted)' }}>{v.mentions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

function OwnerHistoryTable({ entries, topics }) {
  const topicTitle = (id) => {
    const t = topics.find(t => String(t.id) === String(id))
    return t ? `${id} — ${t.title}` : id
  }
  return (
    <div>
      {entries.map(([topicId, flips]) => {
        const flagged = flips.length >= 2
        return (
          <div key={topicId} style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, marginBottom: 3 }}>
              {topicTitle(topicId)}
              {flagged && (
                <span style={{ marginLeft: 8, fontSize: '0.7rem', color: '#b06000', fontWeight: 700 }}>
                  ⚠ {flips.length} flips — coordination issue?
                </span>
              )}
            </div>
            <table className="cdv-small-table" style={{ marginBottom: 0 }}>
              <thead><tr><th>Date</th><th>From</th><th>→ To</th></tr></thead>
              <tbody>
                {flips.map((f, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{f.date || '—'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{f.from}</td>
                    <td style={{ fontWeight: 600 }}>{f.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </div>
  )
}

function DiffSection({ diff }) {
  if (!diff) return null
  const sections = [
    { key: 'newTopics',      label: 'New topics',         color: '#137333' },
    { key: 'statusChanges',  label: 'Status changes',     color: '#1a73e8' },
    { key: 'newDecisions',   label: 'New decisions',      color: '#137333' },
    { key: 'newRisks',       label: 'New risks',          color: '#c5221f' },
    { key: 'newActionItems', label: 'New action items',   color: '#555' },
    { key: 'newlyStale',     label: 'Newly stale topics', color: '#b06000' },
    { key: 'ownerChanges',   label: 'Owner changes',      color: '#555' },
  ]
  const hasContent = sections.some(s => diff[s.key]?.length > 0)
  if (!hasContent) {
    return <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', padding: '0.25rem 0' }}>No changes detected from previous run.</div>
  }
  return (
    <div style={{ fontSize: '0.82rem' }}>
      {sections.map(({ key, label, color }) => {
        const items = diff[key]
        if (!items?.length) return null
        return (
          <div key={key} style={{ marginBottom: '0.4rem' }}>
            <div style={{ fontWeight: 700, color, marginBottom: 2 }}>{label} ({items.length})</div>
            {items.map((item, i) => (
              <div key={i} style={{ paddingLeft: '0.75rem', color: '#333', marginBottom: 2 }}>
                • {typeof item === 'string' ? item : item.text || item.description || item.title || JSON.stringify(item)}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

/* ── Landscape tabs ────────────────────────────────────────────────────────── */
function LandscapeSystemsTab({ systems, components, customer }) {
  const PULSE_COLOR = { GREEN: '#137333', YELLOW: '#b06000', RED: '#c5221f' }
  const [expanded, setExpanded] = useState({})
  const compByTier = {}
  components.forEach(c => {
    if (!compByTier[c.tierKey]) compByTier[c.tierKey] = []
    compByTier[c.tierKey].push(c)
  })

  return (
    <div className="cdv-section">
      {customer.dataCenterName && (
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <strong>Data center:</strong> {customer.dataCenterName} &nbsp;·&nbsp;
          <strong>Cloud start:</strong> {customer.cloudStartDate || '—'} &nbsp;·&nbsp;
          <strong>Contract end:</strong> {customer.contractEndDate || '—'} &nbsp;·&nbsp;
          <strong>Go-live:</strong> {customer.businessGoLive || '—'} &nbsp;·&nbsp;
          <strong>Status:</strong>&nbsp;
          <span style={{ fontWeight: 700, color: PULSE_COLOR[customer.overallStatus] || 'inherit' }}>
            {customer.overallStatus || '—'}
          </span>
        </div>
      )}
      <table className="client-req-table">
        <thead>
          <tr>
            <th></th>
            <th>SID</th><th>DB SID</th><th>Solution</th><th>Type</th>
            <th>DR</th><th>HA</th><th>Active</th><th>Status</th>
            <th>Start</th><th>End</th>
          </tr>
        </thead>
        <tbody>
          {systems.map(s => {
            const tierComps = s.tierKey ? (compByTier[s.tierKey] || []) : []
            const isOpen = expanded[s.ID]
            return (
              <>
                <tr key={s.ID} style={{ cursor: tierComps.length ? 'pointer' : 'default', background: !s.sid ? 'var(--bg-subtle, #f5f5f5)' : undefined }}
                    onClick={() => tierComps.length && setExpanded(e => ({ ...e, [s.ID]: !e[s.ID] }))}>
                  <td style={{ width: 20, textAlign: 'center', color: 'var(--text-muted)' }}>
                    {tierComps.length > 0 ? (isOpen ? '▼' : '▶') : ''}
                  </td>
                  <td style={{ fontFamily: 'monospace', fontWeight: s.sid ? 600 : 400 }}>{s.sid || <em style={{ color: 'var(--text-muted)', fontStyle: 'normal' }}>{s.solutionDescr}</em>}</td>
                  <td style={{ fontFamily: 'monospace' }}>{s.dbSid || '—'}</td>
                  <td style={{ fontSize: '0.82rem' }}>{s.sid ? (s.solutionDescr || s.description || '—') : ''}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.prodNonProd || '—'}</td>
                  <td style={{ textAlign: 'center' }}>{s.isDR ? '✓' : '—'}</td>
                  <td style={{ textAlign: 'center' }}>{s.isHA ? '✓' : '—'}</td>
                  <td style={{ textAlign: 'center', color: s.isActive ? '#137333' : '#c5221f' }}>{s.isActive !== false ? '✓' : '✗'}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.deliveryStatus || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{s.startDate?.slice(0,10) || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{s.endDate?.slice(0,10) || '—'}</td>
                </tr>
                {isOpen && tierComps.map((c, ci) => (
                  <tr key={c.ID || ci} style={{ background: 'var(--bg-subtle, #fafafa)', fontSize: '0.78rem' }}>
                    <td></td>
                    <td colSpan={2} style={{ paddingLeft: '1.5rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      {c.instanceType || c.systemType || '—'}
                    </td>
                    <td style={{ fontSize: '0.78rem' }}>{c.description}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{c.qty ? `×${c.qty}` : '—'}</td>
                    <td></td>
                    <td style={{ textAlign: 'center' }}>{c.isHA ? '✓' : '—'}</td>
                    <td style={{ textAlign: 'center', color: c.active ? '#137333' : '#c5221f' }}>{c.active ? '✓' : '✗'}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{c.operatingSystem || '—'}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{c.componentStartMonth ?? '—'}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{c.componentEndMonth ?? '—'}</td>
                  </tr>
                ))}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function LandscapeComponentsTab({ components, systems }) {
  const systemBySid = {}
  systems.forEach(s => { if (s.sid) systemBySid[s.sid] = s })
  const compByTier = {}
  components.forEach(c => {
    if (!compByTier[c.tierKey]) compByTier[c.tierKey] = []
    compByTier[c.tierKey].push(c)
  })

  return (
    <div className="cdv-section">
      {Object.entries(compByTier).map(([tierKey, comps]) => {
        const sys = systems.find(s => s.tierKey === tierKey)
        return (
          <div key={tierKey} style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
              {sys ? `${sys.solutionDescr} — ${sys.sid || '?'}${sys.isDR ? ' (DR)' : ''}` : tierKey}
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                {sys?.deliveryStatus}
              </span>
            </div>
            <table className="client-req-table">
              <thead>
                <tr>
                  <th>Active</th><th>SPC</th><th>Qty</th><th>Description</th>
                  <th>FlexTB</th><th>Storage #1</th><th>Storage #2</th>
                  <th>vCPUs</th><th>OS</th><th>SLA</th><th>Instance Type</th>
                  <th>HA</th><th>Avail. Zone</th><th>Pool</th><th>DB Enc.</th>
                  <th>Usage Details</th><th>Month Start</th><th>Start Date</th>
                  <th>Month End</th><th>End Date</th>
                  <th>Duration</th><th>SISM Key</th><th>CR No.</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {comps.map((c, i) => (
                  <tr key={c.ID || i}>
                    <td style={{ textAlign: 'center', color: c.active ? '#137333' : '#c5221f' }}>{c.active ? '✓' : '✗'}</td>
                    <td style={{ textAlign: 'center' }}>{c.spcProvisioned ? '✓' : '—'}</td>
                    <td style={{ textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{c.qty ?? '—'}</td>
                    <td style={{ fontSize: '0.78rem' }}>{c.description || '—'}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.flexTBChunkAmount ?? '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.storageGB ? `${c.storageGB} GB` : '—'}{c.storageDescr ? ` (${c.storageDescr})` : ''}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.storage2GB ? `${c.storage2GB} GB` : '—'}{c.storageDescr2 ? ` (${c.storageDescr2})` : ''}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.numOfCPUs ?? '—'}</td>
                    <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{c.operatingSystem || '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.sla || '—'}</td>
                    <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{c.instanceType || '—'}</td>
                    <td style={{ textAlign: 'center' }}>{c.isHA ? '✓' : '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.availabilityZone || '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.poolName || '—'}</td>
                    <td style={{ textAlign: 'center' }}>{c.dbEncryption ? '✓' : '—'}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.usageDetails || '—'}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.componentStartMonth ?? '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{c.startDate || '—'}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.componentEndMonth ?? '—'}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{c.endDate || '—'}</td>
                    <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.duration ?? '—'}</td>
                    <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{c.sismObjectKey || '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>{c.crNo || '—'}</td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.projectStatusSummary || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
      {components.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No component data imported yet.</div>
      )}
    </div>
  )
}

function LandscapePhasesTab({ phases }) {
  return (
    <div className="cdv-section">
      <table className="client-req-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Description</th>
            <th>Start date</th><th>End date</th><th>Months</th>
          </tr>
        </thead>
        <tbody>
          {phases.map(p => (
            <tr key={p.ID}>
              <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{p.phaseNo}</td>
              <td style={{ fontWeight: 600 }}>{p.phaseName}</td>
              <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p.phaseDescription || '—'}</td>
              <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{p.phaseStartDate || '—'}</td>
              <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{p.phaseEndDate || '—'}</td>
              <td style={{ fontVariantNumeric: 'tabular-nums', textAlign: 'right', color: 'var(--text-muted)' }}>
                {p.phaseStartMonth != null ? `${p.phaseStartMonth}–${p.phaseEndMonth}` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RATING_COLOR = { GREEN: '#137333', YELLOW: '#b06000', RED: '#c5221f' }

function LandscapeTopIssuesTab({ issues }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="cdv-section">
      {issues.map(iss => (
        <div key={iss.ID} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}
               onClick={() => setExpanded(e => e === iss.ID ? null : iss.ID)}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-muted)', width: 28, flexShrink: 0 }}>#{iss.issueId}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: RATING_COLOR[iss.rating] || '#aaa', flexShrink: 0 }} />
            <span style={{ fontWeight: 600, flex: 1 }}>{iss.status}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{iss.dateIdentified || ''}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 4 }}>▶</span>
          </div>
          {expanded === iss.ID && (
            <div style={{ marginTop: '0.5rem', paddingLeft: '2.5rem', fontSize: '0.82rem' }}>
              {iss.statusSummary && (
                <div style={{ marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Summary</div>
                  <div dangerouslySetInnerHTML={{ __html: iss.statusSummary }} style={{ color: 'var(--text-muted)' }} />
                </div>
              )}
              {iss.actionPlan && (
                <div style={{ marginBottom: '0.4rem' }}>
                  <div style={{ fontWeight: 700, marginBottom: 2 }}>Action Plan</div>
                  <div dangerouslySetInnerHTML={{ __html: iss.actionPlan }} style={{ color: 'var(--text-muted)' }} />
                </div>
              )}
              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Created by {iss.createUserName} · {iss.createDateTime}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function LandscapeWeeklyTab({ entries }) {
  const PULSE = { G: { label: 'Good', color: '#137333' }, Y: { label: 'Attention', color: '#b06000' }, R: { label: 'At risk', color: '#c5221f' }, S: { label: 'Stable', color: '#1a73e8' } }
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="cdv-section">
      {entries.map(e => {
        const pulse = PULSE[e.customerPulse] || { label: e.customerPulse, color: '#888' }
        return (
          <div key={e.ID} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}
                 onClick={() => setExpanded(ex => ex === e.ID ? null : e.ID)}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{e.statusDate}</span>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: pulse.color }}>{pulse.label}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                {e.statusText?.substring(0, 100)}…
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 4 }}>▶</span>
            </div>
            {expanded === e.ID && (
              <div style={{ marginTop: '0.4rem', paddingLeft: '1rem', fontSize: '0.82rem', color: '#333', whiteSpace: 'pre-wrap' }}>
                {e.statusText}
                <div style={{ marginTop: '0.25rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  — {e.createUserName} · {e.createDateTime}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── ContractsTab ──────────────────────────────────────────────────────────── */
function ContractsTab({ engagements, documents }) {
  const docsByEngagement = documents.reduce((acc, d) => {
    if (!acc[d.engagementId]) acc[d.engagementId] = []
    acc[d.engagementId].push(d)
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* CR Summary table */}
      <section>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          CR Summary
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="ls-table" style={{ width: '100%', fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th>CR #</th>
                <th>Engagement</th>
                <th>SID</th>
                <th>Issue / Description</th>
                <th style={{ textAlign: 'right' }}>Start</th>
                <th style={{ textAlign: 'right' }}>End</th>
                <th style={{ textAlign: 'right' }}>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {engagements.map(eng => (
                <tr key={eng.ID}>
                  <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{eng.crNumber || '—'}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{eng.engagementId}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--accent-blue)' }}>{eng.sidAffected || '—'}</td>
                  <td style={{ maxWidth: '300px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{eng.issueDescription || '—'}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{eng.startDate || '—'}</td>
                  <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{eng.endDate || '—'}</td>
                  <td style={{ textAlign: 'right' }}>{eng.duration != null ? `${eng.duration}m` : '—'}</td>
                  <td>
                    {eng.contractStatus ? (
                      <span style={{
                        padding: '2px 6px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 600,
                        background: eng.contractStatus === 'Active' ? 'var(--status-in-progress-bg, #e8f4fd)' :
                                    eng.contractStatus === 'Executed' ? 'var(--status-done-bg, #e8f5e9)' :
                                    eng.contractStatus === 'Draft' ? 'var(--status-new-bg, #fff3e0)' : '#f0f0f0',
                        color: eng.contractStatus === 'Active' ? 'var(--accent-blue, #1a73e8)' :
                               eng.contractStatus === 'Executed' ? '#2e7d32' :
                               eng.contractStatus === 'Draft' ? '#e65100' : '#666',
                      }}>
                        {eng.contractStatus}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Documents grouped by engagement */}
      <section>
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Documents
        </h3>
        {engagements.map(eng => {
          const docs = docsByEngagement[eng.engagementId] || []
          if (docs.length === 0) return null
          return (
            <div key={eng.engagementId} style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, padding: '4px 8px', background: 'var(--surface-hover, #f5f5f5)', borderRadius: '4px', marginBottom: '4px' }}>
                {eng.crNumber ? `${eng.crNumber} — ` : ''}Engagement {eng.engagementId}
                {eng.cmsContractId && (
                  <a href={eng.cmsContractUrl} target="_blank" rel="noreferrer"
                     style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>
                    CMS {eng.cmsContractId} ↗
                  </a>
                )}
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="ls-table" style={{ width: '100%', fontSize: '0.75rem' }}>
                  <thead>
                    <tr>
                      <th>Source</th>
                      <th>File Name</th>
                      <th>Subject / Category</th>
                      <th>Release</th>
                      <th>e-Signature</th>
                      <th>Uploaded By</th>
                      <th style={{ textAlign: 'right' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {docs.map((doc, i) => (
                      <tr key={i}>
                        <td>
                          <span style={{
                            padding: '1px 5px', borderRadius: '3px', fontSize: '0.65rem', fontWeight: 600,
                            background: doc.sourceSystem === 'DED' ? '#e3f2fd' : '#f3e5f5',
                            color: doc.sourceSystem === 'DED' ? '#1565c0' : '#6a1b9a',
                          }}>
                            {doc.sourceSystem}
                          </span>
                        </td>
                        <td>
                          {doc.proxyUrl ? (
                            <a href={doc.proxyUrl} target="_blank" rel="noreferrer"
                               style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}
                               title={doc.fileName}>
                              {doc.fileName.length > 50 ? doc.fileName.slice(0, 47) + '…' : doc.fileName}
                            </a>
                          ) : (
                            <span style={{ color: 'var(--text-muted)' }}>{doc.fileName}</span>
                          )}
                        </td>
                        <td style={{ color: 'var(--text-muted)' }}>{doc.subject || doc.docCategory || '—'}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{doc.docRelease || '—'}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{doc.eSignatureStatus || '—'}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{doc.uploadedBy || '—'}</td>
                        <td style={{ textAlign: 'right', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{doc.uploadDate || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

/* ── Main component ────────────────────────────────────────────────────────── */
export default function ClientDetailView({ customer, cdmEmail, onStartChat, refreshToken = 0 }) {
  const [requests,         setRequests]         = useState([])
  const [sessions,         setSessions]         = useState([])
  const [meetingNote,      setMeetingNote]      = useState(null)
  const [selectedReq,      setSelectedReq]      = useState(null)
  const [loading,          setLoading]          = useState(true)
  const [summaryOpen,      setSummaryOpen]      = useState(true)
  const [lsPhases,         setLsPhases]         = useState([])
  const [lsWeekly,         setLsWeekly]         = useState([])
  const [lsTopIssues,      setLsTopIssues]      = useState([])
  const [lsSystems,        setLsSystems]        = useState([])
  const [lsComponents,     setLsComponents]     = useState([])
  const [contracts,        setContracts]        = useState([])
  const [contractDocs,     setContractDocs]     = useState([])

  useEffect(() => {
    if (!customer) return
    setLoading(true)
    Promise.all([
      getActiveRequests(),
      getConversationSessions(customer.ID),
      getMeetingNotes(customer.ID),
      getLandscapePhases(customer.ID),
      getLandscapeWeeklyStatus(customer.ID),
      getLandscapeTopIssues(customer.ID),
      getLandscapeSystems(customer.ID),
      getLandscapeComponents(customer.ID),
      getContractEngagements(customer.ID),
      getContractDocuments(customer.ID),
    ]).then(([allReqs, sess, notes, phases, weekly, topIssues, systems, components, ctrEngagements, ctrDocs]) => {
      const clientReqs = allReqs.filter(r =>
        r.customerAccountId === customer.customerId ||
        r.customerAccountId === customer.ID ||
        r.customerName === customer.displayName
      )
      setRequests(clientReqs)
      setSessions(sess)
      setMeetingNote(notes[0] || null)
      setLsPhases(phases)
      setLsWeekly(weekly)
      setLsTopIssues(topIssues)
      setLsSystems(systems)
      setLsComponents(components)
      setContracts(ctrEngagements)
      setContractDocs(ctrDocs)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [customer, refreshToken])

  const counts = useMemo(() => {
    const c = { open: 0, inProgress: 0, done: 0 }
    requests.forEach(r => c[classify(r.status)]++)
    return c
  }, [requests])

  if (!customer) return null

  const meetingFull = (() => { try { return meetingNote?.extractedJson ? JSON.parse(meetingNote.extractedJson) : null } catch { return null } })()
  const narrativeSummary = meetingFull?.analysis?.rollup?.narrativeSummary || null

  return (
    <div className="client-detail">
      {/* ── Header ── */}
      <div className="client-detail-header">
        <div className="client-detail-header-left">
          <h2 className="client-detail-title">{customer.displayName}</h2>
          <span className="client-detail-id">{customer.customerId}</span>
        </div>
        {onStartChat && (
          <button className="client-chat-btn" onClick={onStartChat}>
            Chat
          </button>
        )}
      </div>

      {(narrativeSummary || meetingFull) && (
        <div className="cdv-summary-block">
          <button className="cdv-summary-toggle" onClick={() => setSummaryOpen(o => !o)}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: summaryOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.15s', flexShrink: 0 }}>
              <polyline points="3,2 7,5 3,8" />
            </svg>
            <span>Summary</span>
          </button>
          {summaryOpen && (
            <>
              {narrativeSummary && (
                <div className="cdv-meeting-narrative">{narrativeSummary}</div>
              )}
              {/* ── KPI strip ── */}
              {(() => {
                const full = meetingFull
                const rollup    = full?.analysis?.rollup       || null
                const topics    = full?.topics                 || []
                const actions   = full?.analysis?.actionItems  || []
                const risks     = (full?.analysis?.risks       || []).filter(r => r.status === 'Open')
                const decisions = full?.analysis?.decisions    || []
                const overdue   = actions.filter(a => a.overdue)
                const noteDate  = meetingNote?.meetingDate || meetingNote?.createdAt?.slice(0, 10)

                if (meetingNote && full) {
                  return (
                    <div className="client-kpi-strip">
                      <div className="client-kpi">
                        <span className="client-kpi-value">{topics.length}</span>
                        <span className="client-kpi-label">Topics</span>
                      </div>
                      <div className="client-kpi">
                        <span className="client-kpi-value" style={{ color: overdue.length > 0 ? '#b06000' : undefined }}>
                          {actions.length}
                        </span>
                        <span className="client-kpi-label">
                          Actions{overdue.length > 0 ? ` (${overdue.length} overdue)` : ''}
                        </span>
                      </div>
                      <div className="client-kpi">
                        <span className="client-kpi-value" style={{ color: risks.length > 0 ? '#c5221f' : undefined }}>
                          {risks.length}
                        </span>
                        <span className="client-kpi-label">Open risks</span>
                      </div>
                      <div className="client-kpi">
                        <span className="client-kpi-value">{decisions.length}</span>
                        <span className="client-kpi-label">Decisions</span>
                      </div>
                      {rollup?.avgAgeDaysOpenItems != null && (
                        <div className="client-kpi">
                          <span className="client-kpi-value">{rollup.avgAgeDaysOpenItems}d</span>
                          <span className="client-kpi-label">Avg age</span>
                        </div>
                      )}
                      {rollup?.closedInPeriod != null && (
                        <div className="client-kpi">
                          <span className="client-kpi-value">{rollup.closedInPeriod}</span>
                          <span className="client-kpi-label">Closed this period</span>
                        </div>
                      )}
                      {noteDate && (
                        <div className="client-kpi">
                          <span className="client-kpi-value" style={{ fontSize: '1rem' }}>{noteDate}</span>
                          <span className="client-kpi-label">Last processed</span>
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <div className="client-kpi-strip">
                    <div className="client-kpi">
                      <span className="client-kpi-value kpi-open">{counts.open}</span>
                      <span className="client-kpi-label">New / Awaiting</span>
                    </div>
                    <div className="client-kpi">
                      <span className="client-kpi-value kpi-inprogress">{counts.inProgress}</span>
                      <span className="client-kpi-label">In Progress</span>
                    </div>
                    <div className="client-kpi">
                      <span className="client-kpi-value kpi-done">{counts.done}</span>
                      <span className="client-kpi-label">Closed</span>
                    </div>
                    <div className="client-kpi">
                      <span className="client-kpi-value kpi-sessions">{sessions.length}</span>
                      <span className="client-kpi-label">Chat Sessions</span>
                    </div>
                  </div>
                )
              })()}
            </>
          )}
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="cdv-tabs-wrapper">
        <TabContainer
          tabLayout="Inline"
          contentBackgroundDesign="Transparent"
          headerBackgroundDesign="Transparent"
          style={{ flex: 1, minHeight: 0 }}
        >
          <Tab
            text={`Requests${counts.open > 0 ? ` (${counts.open})` : ''}`}
            additionalText={counts.open > 0 ? undefined : String(requests.length)}
          >
            <div className="cdv-tab-content">
              <RequestsTab
                requests={requests}
                loading={loading}
                onSelectReq={setSelectedReq}
              />
            </div>
          </Tab>

          {buildMeetingTabs(meetingNote).map(t => (
            <Tab key={t.key} text={t.label}>
              <div className="cdv-tab-content">{t.content}</div>
            </Tab>
          ))}

          {lsSystems.length > 0 && (
            <Tab text={`Systems (${lsSystems.length})`}>
              <div className="cdv-tab-content">
                <LandscapeSystemsTab systems={lsSystems} components={lsComponents} customer={customer} />
              </div>
            </Tab>
          )}

          {(lsSystems.length > 0 || lsComponents.length > 0) && (
            <Tab text={`Components (${lsComponents.length})`}>
              <div className="cdv-tab-content">
                <LandscapeComponentsTab components={lsComponents} systems={lsSystems} />
              </div>
            </Tab>
          )}

          {lsPhases.length > 0 && (
            <Tab text={`Phases (${lsPhases.length})`}>
              <div className="cdv-tab-content">
                <LandscapePhasesTab phases={lsPhases} />
              </div>
            </Tab>
          )}

          {lsTopIssues.length > 0 && (
            <Tab text={`Issues (${lsTopIssues.length})`}>
              <div className="cdv-tab-content">
                <LandscapeTopIssuesTab issues={lsTopIssues} />
              </div>
            </Tab>
          )}

          {lsWeekly.length > 0 && (
            <Tab text={`Weekly (${lsWeekly.length})`}>
              <div className="cdv-tab-content">
                <LandscapeWeeklyTab entries={lsWeekly} />
              </div>
            </Tab>
          )}

          {contracts.length > 0 && (
            <Tab text={`Contracts (${contracts.length})`}>
              <div className="cdv-tab-content">
                <ContractsTab engagements={contracts} documents={contractDocs} />
              </div>
            </Tab>
          )}
        </TabContainer>
      </div>

      {/* ── Request detail drawer ── */}
      {selectedReq && (
        <RequestDetailDrawer
          request={selectedReq}
          onClose={() => setSelectedReq(null)}
          onRefresh={() => {
            setSelectedReq(null)
            getActiveRequests().then(allReqs => {
              setRequests(allReqs.filter(r =>
                r.customerAccountId === customer.customerId ||
                r.customerAccountId === customer.ID ||
                r.customerName === customer.displayName
              ))
            }).catch(() => {})
          }}
        />
      )}
    </div>
  )
}
