import { useState, useEffect, useRef } from 'react'
import { getConversationSessions, getGeneralConversationSessions, deleteConversationSession } from '../api.js'

export default function ChatSessionHeader({ customerAgentId, currentSessionId, currentTitle, onNewSession, onSelectSession }) {
  const [sessions, setSessions] = useState([])
  const [open, setOpen]         = useState(false)
  const [title, setTitle]       = useState(currentTitle || 'New chat')
  const dropRef = useRef(null)

  useEffect(() => { setTitle(currentTitle || 'New chat') }, [currentTitle])

  function loadSessions() {
    const req = customerAgentId
      ? getConversationSessions(customerAgentId)
      : getGeneralConversationSessions()
    req.then(setSessions).catch(() => {})
  }

  useEffect(() => { loadSessions() }, [customerAgentId, currentSessionId])

  const btnRef = useRef(null)

  useEffect(() => {
    function outside(e) {
      if (btnRef.current && btnRef.current.contains(e.target)) return
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  async function handleDelete(e, sessId) {
    e.stopPropagation()
    await deleteConversationSession(sessId).catch(() => {})
    setSessions(s => s.filter(x => x.ID !== sessId))
  }

  function fmtDate(dt) {
    if (!dt) return ''
    return new Date(dt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="chat-session-header">
      <div className="chat-session-title-row">
        <button className="chat-session-title-btn" ref={btnRef} onClick={() => setOpen(o => !o)} title="Switch session">
          <span className="chat-session-title-text">{title}</span>
          <span className="chat-session-chevron">{open ? '▲' : '▼'}</span>
        </button>
        <button className="chat-session-new-btn" onClick={onNewSession} title="Start new chat">
          + New
        </button>
      </div>

      {open && (
        <div ref={dropRef} className="chat-session-dropdown">
          {sessions.length === 0 && (
            <div className="chat-session-empty">No saved sessions</div>
          )}
          {sessions.map(s => (
            <div
              key={s.ID}
              className={`chat-session-item${s.ID === currentSessionId ? ' active' : ''}`}
              onClick={() => { onSelectSession(s); setOpen(false) }}
            >
              <span className="session-item-title">{s.title || 'Untitled'}</span>
              <span className="session-item-date">{fmtDate(s.lastActiveAt || s.createdAt)}</span>
              <button
                className="session-item-delete"
                title="Delete"
                onClick={e => handleDelete(e, s.ID)}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
