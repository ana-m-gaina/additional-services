import { useState, useEffect, useRef } from 'react'

import ChatShell from './components/ChatShell.jsx'
import PersonaShell from './components/PersonaShell.jsx'
import InboxView from './components/InboxView.jsx'
import ClientDetailView from './components/ClientDetailView.jsx'
import NavTree from './components/NavTree.jsx'
import NewRequestModal from './components/NewRequestModal.jsx'
import PromptsView from './components/PromptsView.jsx'
import PanelRenderer from './components/PanelRenderer.jsx'
import { getPendingActions, getCurrentUser, whoami, getAssistantName, getCustomerAgents } from './api.js'

function tempSessionId() { return 'pending-' + Date.now() }

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
  const [page, setPage]               = useState('dashboard')
  const [chatOpen, setChatOpen]       = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [inboxCount, setInboxCount]   = useState(0)
  const [pendingActions, setPendingActions] = useState([])
  const [notifOpen, setNotifOpen]     = useState(false)
  const [customers, setCustomers]     = useState([])
  const notifRef = useRef(null)
  const [showNewRequest, setShowNewRequest]  = useState(false)
  const [profile, setProfile]         = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientSession, setClientSession]   = useState(null)
  const [assistantName, setAssistantName]   = useState('Beacon')
  const [globalSessionId, setGlobalSessionId] = useState(null)
  const [navRefreshToken, setNavRefreshToken] = useState(0)
  const [dataRefreshToken, setDataRefreshToken] = useState(0)
  const [centerPanel, setCenterPanel] = useState(null)
  const [chatSeedMessage, setChatSeedMessage] = useState(null)
  useEffect(() => {
    getCurrentUser()
      .then(async u => {
        setProfile(u)
        setGlobalSessionId(tempSessionId())
      })
      .catch(() => {
        setProfile({ firstname: '', lastname: '', email: 'anonymous', name: 'anonymous' })
        setGlobalSessionId(tempSessionId())
      })
    whoami().catch(() => {})
    getAssistantName().then(setAssistantName).catch(() => {})
  }, [])

  useEffect(() => {
    const poll = () => getPendingActions().then(a => { setPendingActions(a); setInboxCount(a.length) }).catch(() => {})
    poll()
    const id = setInterval(poll, 15000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    getCustomerAgents().then(setCustomers).catch(() => {})
  }, [])

  useEffect(() => {
    const handler = () => setShowNewRequest(true)
    document.addEventListener('cdm:new-request', handler)
    return () => document.removeEventListener('cdm:new-request', handler)
  }, [])

  useEffect(() => {
    const handler = () => { setPage('dashboard'); setSelectedClient(null); setChatOpen(false) }
    document.addEventListener('cdm:go-dashboard', handler)
    return () => document.removeEventListener('cdm:go-dashboard', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => setCenterPanel(e.detail || null)
    document.addEventListener('cdm:show-center-panel', handler)
    return () => document.removeEventListener('cdm:show-center-panel', handler)
  }, [])

  // Intercept the skill-import sentinel before ChatShell sees it
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.content !== '__skill_import_start__') return
      e.stopImmediatePropagation()
      setGlobalSessionId(tempSessionId())
      setSelectedClient(null)
      setClientSession(null)
      setPage('dashboard')
      setChatSeedMessage('I\'d like to import and analyze a skill. Please paste the skill definition below and I\'ll extract its inputs, outputs, and any risks or gotchas — then you can save it as a prompt.')
      setChatOpen(true)
    }
    document.addEventListener('cdm:fire-prompt', handler, true) // capture phase
    return () => document.removeEventListener('cdm:fire-prompt', handler, true)
  }, [])

  useEffect(() => {
    if (!notifOpen) return
    function onOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [notifOpen])

  function handleNotifNavigate(action) {
    setNotifOpen(false)
    let nav = null
    try { nav = action.navigateTo ? JSON.parse(action.navigateTo) : null } catch { /* skip */ }
    if (nav?.page === 'client' && nav.customerAgentId) {
      const found = customers.find(c => c.ID === nav.customerAgentId)
      const customer = found || { ID: nav.customerAgentId, customerId: nav.customerId || '', displayName: nav.displayName || nav.customerAgentId }
      setSelectedClient(customer)
      setPage('client')
      setChatOpen(false)
    } else {
      setPage('inbox')
    }
  }

  function handleSelectClient(customer) {
    setSelectedClient(customer)
    setPage('client')
    setChatOpen(false)
    setClientSession(null)
  }

  function handleNavSelectSession(customer, sess) {
    setSelectedClient(customer)
    setPage('client')
    setClientSession({ sessionId: sess.ID, sessionTitle: sess.title || 'Untitled' })
    setChatOpen(true)
  }

  function handleSelectGeneralSession(sess) {
    setSelectedClient(null)
    setPage('dashboard')
    setGlobalSessionId(sess.ID)
    setClientSession(null)
    setChatOpen(true)
  }

  function handlePromptFire(promptContent) {
    // Open client chat if a client is active, otherwise global chat
    if (selectedClient) {
      if (!clientSession) {
        setClientSession({ sessionId: tempSessionId(), sessionTitle: `${selectedClient.displayName} — ${new Date().toLocaleDateString()}` })
      }
      setPage('client')
    } else {
      setPage('dashboard')
    }
    setChatOpen(true)
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('cdm:fire-prompt', { detail: { content: promptContent } }))
    }, 150)
  }

  function handleNewGeneralSession() {
    setGlobalSessionId(tempSessionId())
    setClientSession(null)
    setPage('dashboard')
    setSelectedClient(null)
  }

  function handleStartChat() {
    if (!selectedClient) return
    setClientSession({ sessionId: tempSessionId(), sessionTitle: `${selectedClient.displayName} — ${new Date().toLocaleDateString()}` })
    setChatOpen(true)
  }

  function handleSelectSession(sess) {
    setClientSession({ sessionId: sess.ID, sessionTitle: sess.title || 'Untitled' })
  }

  const userId   = profile?.email || profile?.name || 'anonymous'
  const initials = getInitials(profile)
  const fullName = profile
    ? [profile.firstname, profile.lastname].filter(Boolean).join(' ') || userId
    : '…'

  const [sidebarWidth, setSidebarWidth] = useState(220)
  const [chatWidth, setChatWidth]       = useState(360)
  const [chatDragging, setChatDragging] = useState(false)

  function handleSidebarDrag(e) {
    e.preventDefault()
    const startX = e.clientX
    const startW = sidebarWidth
    function onMove(ev) {
      const w = Math.min(400, Math.max(160, startW + ev.clientX - startX))
      setSidebarWidth(w)
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  function handleChatDrag(e) {
    e.preventDefault()
    const startX = e.clientX
    const startW = chatWidth
    setChatDragging(true)
    function onMove(ev) {
      const w = Math.min(700, Math.max(260, startW - (ev.clientX - startX)))
      setChatWidth(w)
    }
    function onUp() {
      setChatDragging(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  return (
    <div className="cdm-shell">
      {/* ── Top bar ── */}
      <header className="cdm-topbar">
        <button
          className="cdm-topbar-logo"
          onClick={() => setSidebarOpen(o => !o)}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {/* 4-point sparkle / AI icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 C12 2 13.2 7.5 16 10 C18.8 12.5 24 12 24 12 C24 12 18.8 11.5 16 14 C13.2 16.5 12 22 12 22 C12 22 10.8 16.5 8 14 C5.2 11.5 0 12 0 12 C0 12 5.2 12.5 8 10 C10.8 7.5 12 2 12 2Z"/>
          </svg>
        </button>
        <span className="cdm-topbar-title">{assistantName}</span>
        <div className="cdm-topbar-actions">
          <button
            className={`cdm-topbar-btn${chatOpen ? ' active' : ''}`}
            onClick={() => {
              if (chatOpen) { setChatOpen(false); return }
              if (!globalSessionId) setGlobalSessionId(tempSessionId())
              if (selectedClient) { setClientSession(null); setSelectedClient(null) }
              setPage('dashboard')
              setChatOpen(true)
            }}
            title="Chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <div className="cdm-notif-anchor" ref={notifRef}>
            <button
              className={`cdm-topbar-btn${inboxCount > 0 ? ' has-badge' : ''}${notifOpen ? ' active' : ''}`}
              onClick={() => setNotifOpen(o => !o)}
              title="Notifications"
              data-badge={inboxCount > 0 ? inboxCount : undefined}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3Z"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </button>
            {notifOpen && (
              <div className="cdm-notif-dropdown">
                <div className="cdm-notif-header">
                  <span>Notifications</span>
                  <button className="cdm-notif-view-all" onClick={() => { setNotifOpen(false); setPage('inbox') }}>View all</button>
                </div>
                {pendingActions.length === 0 ? (
                  <div className="cdm-notif-empty">No pending notifications</div>
                ) : (
                  <ul className="cdm-notif-list">
                    {pendingActions.map(a => (
                      <li key={a.ID} className="cdm-notif-item" onClick={() => handleNotifNavigate(a)}>
                        <span className="cdm-notif-dot" />
                        <div className="cdm-notif-body">
                          <span className="cdm-notif-text">{a.prompt}</span>
                          <span className="cdm-notif-time">{new Date(a.createdAt).toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <button
            className="cdm-topbar-btn"
            onClick={() => { setPage('dashboard'); setSelectedClient(null) }}
            title="Home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
          <button className="cdm-topbar-avatar" title={fullName}>{initials}</button>
        </div>
      </header>

      <div className="cdm-body">
        {sidebarOpen && (
          <aside className="cdm-sidebar" style={{ width: sidebarWidth }}>
            <NavTree
              currentUser={userId}
              onSelectClient={handleSelectClient}
              onFirePrompt={handlePromptFire}
              onOpenPrompts={() => setPage('prompts')}
              refreshToken={navRefreshToken}
            />
            <div className="cdm-sidebar-resizer" onMouseDown={handleSidebarDrag} />
          </aside>
        )}

        <main className="cdm-main" style={{ padding: (page === 'dashboard' || page === 'client') ? 0 : '1.5rem', display: 'flex', flexDirection: 'column' }}>
          {page === 'dashboard' && <PersonaShell cdmEmail={userId} />}
          {page === 'inbox'     && <InboxView cdmEmail={userId} onCountChange={setInboxCount} />}
          {page === 'client'    && <ClientDetailView customer={selectedClient} cdmEmail={userId} onStartChat={handleStartChat} refreshToken={dataRefreshToken} />}
          {page === 'prompts'   && <PromptsView />}
        </main>

        <div
          className={`cdm-chat-panel${chatOpen ? ' open' : ''}`}
          style={chatOpen ? { width: chatWidth, transition: chatDragging ? 'none' : 'width 0.22s ease' } : {}}
        >
          <div className="cdm-chat-resizer" onMouseDown={handleChatDrag} />
          <ChatShell
            sessionId={page === 'client' && clientSession ? clientSession.sessionId : (clientSession?.sessionId || globalSessionId)}
            cdmEmail={userId}
            customerAgentId={page === 'client' ? selectedClient?.ID : null}
            sessionTitle={clientSession?.sessionTitle || null}
            onNewSession={page === 'client' ? handleStartChat : handleNewGeneralSession}
            onSelectSession={page === 'client' ? handleSelectSession : handleSelectGeneralSession}
            cardContext={page === 'client' ? { customerId: selectedClient?.customerId, displayName: selectedClient?.displayName } : null}
            onClose={() => setChatOpen(false)}
            onRename={setAssistantName}
            seedMessage={chatSeedMessage}
            onSeedConsumed={() => setChatSeedMessage(null)}
            onDataRefresh={() => {
              setDataRefreshToken(t => t + 1)
              getPendingActions().then(a => { setPendingActions(a); setInboxCount(a.length) }).catch(() => {})
            }}
            onSessionCreated={(sid, title) => {
              if (page === 'client' && clientSession) {
                setClientSession(s => ({ ...s, sessionId: sid }))
              } else {
                setGlobalSessionId(sid)
              }
              setNavRefreshToken(t => t + 1)
            }}
          />
        </div>
      </div>

      {showNewRequest && (
        <NewRequestModal
          cdmEmail={userId}
          onClose={() => setShowNewRequest(false)}
          onCreated={() => { setShowNewRequest(false); document.dispatchEvent(new CustomEvent('cdm:request-created')) }}
        />
      )}

      {centerPanel && (
        <div className="center-panel-backdrop" onClick={() => setCenterPanel(null)}>
          <div className="center-panel-overlay" onClick={e => e.stopPropagation()}>
            <button className="center-panel-close" onClick={() => setCenterPanel(null)} title="Close">×</button>
            <PanelRenderer panel={centerPanel} cdmEmail={userId} />
          </div>
        </div>
      )}
    </div>
  )
}
