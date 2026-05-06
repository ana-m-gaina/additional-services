import { useState, useEffect } from 'react'
import { ShellBar, ShellBarItem, Avatar } from '@ui5/webcomponents-react'
import ChatShell from './components/ChatShell.jsx'
import PersonaShell from './components/PersonaShell.jsx'
import InboxView from './components/InboxView.jsx'
import NavTree from './components/NavTree.jsx'
import NewRequestModal from './components/NewRequestModal.jsx'
import { getPendingActions, getCurrentUser, whoami } from './api.js'

const SESSION_ID = 'session-' + Date.now()

function getInitials(user) {
  if (!user) return '?'
  const first = (user.firstname || '').trim()
  const last  = (user.lastname  || '').trim()
  if (first && last) return (first[0] + last[0]).toUpperCase()
  const name = (user.name || user.email || '').split('@')[0]
  const parts = name.split(/[.\-_]/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase() || '?'
}

export default function App() {
  const [page, setPage]                   = useState('dashboard')  // 'dashboard' | 'inbox'
  const [chatOpen, setChatOpen]           = useState(false)
  const [sidebarOpen, setSidebarOpen]     = useState(true)
  const [inboxCount, setInboxCount]       = useState(0)
  const [showNewRequest, setShowNewRequest] = useState(false)
  const [profile, setProfile]             = useState(null)
  const [roles, setRoles]                 = useState([])

  useEffect(() => {
    getCurrentUser().then(setProfile).catch(() => setProfile({ firstname: '', lastname: '', email: 'anonymous', name: 'anonymous' }))
    whoami().then(u => setRoles(u.roles)).catch(() => {})
  }, [])

  useEffect(() => {
    const poll = () => getPendingActions().then(a => setInboxCount(a.length)).catch(() => {})
    poll()
    const id = setInterval(poll, 15000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handler = () => setShowNewRequest(true)
    document.addEventListener('cdm:new-request', handler)
    return () => document.removeEventListener('cdm:new-request', handler)
  }, [])

  const userId   = profile?.email || profile?.name || 'anonymous'
  const initials = getInitials(profile)
  const fullName = profile
    ? [profile.firstname, profile.lastname].filter(Boolean).join(' ') || userId
    : '…'

  return (
    <div className="cdm-shell">
      <ShellBar
        primaryTitle="CDM Personal Assistant"
        logo={<img alt="SAP" src="https://www.sap.com/content/dam/application/shared/logos/sap-logo-svg.svg" style={{ height: 24 }} />}
        profile={<Avatar initials={initials} accessibleName={fullName} colorScheme="Accent6" />}
      >
        <ShellBarItem icon="add"        text="New Request"  onClick={() => setShowNewRequest(true)} />
        <ShellBarItem icon="discussion" text="Chat"         onClick={() => setChatOpen(o => !o)} />
        <ShellBarItem icon="grid"       text="Dashboard"    onClick={() => setPage('dashboard')} />
        <ShellBarItem
          icon="bell"
          text={inboxCount > 0 ? `Inbox (${inboxCount})` : 'Inbox'}
          onClick={() => setPage('inbox')}
        />
      </ShellBar>

      <div className="cdm-body">
        <aside className={`cdm-sidebar${sidebarOpen ? '' : ' collapsed'}`}>
          <button className="cdm-sidebar-toggle" onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
            {sidebarOpen ? '‹' : '›'}
          </button>
          {sidebarOpen && <NavTree currentUser={userId} />}
        </aside>

        <main className="cdm-main" style={{ padding: page === 'dashboard' ? 0 : '1.5rem', display: 'flex', flexDirection: 'column' }}>
          {page === 'dashboard' && <PersonaShell cdmEmail={userId} />}
          {page === 'inbox'     && <InboxView cdmEmail={userId} onCountChange={setInboxCount} />}
        </main>

        {/* Slide-in chat panel */}
        <div className={`cdm-chat-panel${chatOpen ? ' open' : ''}`}>
          <ChatShell sessionId={SESSION_ID} cdmEmail={userId} />
        </div>
      </div>

      {showNewRequest && (
        <NewRequestModal
          cdmEmail={userId}
          onClose={() => setShowNewRequest(false)}
          onCreated={() => { setShowNewRequest(false); document.dispatchEvent(new CustomEvent('cdm:request-created')) }}
        />
      )}
    </div>
  )
}
