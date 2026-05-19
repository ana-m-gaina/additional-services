import { useState, useRef, useEffect } from 'react'
import { Button } from '@ui5/webcomponents-react'
import { sendChat, getAssistantName, getConversationTurns, createConversationSession } from '../api.js'
import PanelRenderer from './PanelRenderer.jsx'
import ChatSessionHeader from './ChatSessionHeader.jsx'

function mdToHtml(text) {
  let s = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // Tables
  s = s.replace(/((?:^\|.+\|\n)+)/gm, block => {
    const lines = block.trim().split('\n').filter(l => l.trim() && !l.match(/^\|[-| :]+\|$/))
    let html = '<table><tbody>'
    lines.forEach((line, i) => {
      const cells = line.split('|').slice(1, -1).map(c => c.trim())
      const tag = i === 0 ? 'th' : 'td'
      html += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>'
    })
    return html + '</tbody></table>'
  })
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/^## (.+)$/gm, '<h3>$1</h3>')
  s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>')
  s = s.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
  s = s.split(/\n{2,}/).map(p => {
    const t = p.trim()
    if (!t || t.startsWith('<')) return t
    return '<p>' + t.replace(/\n/g, '<br>') + '</p>'
  }).join('')
  return s
}

const SEND_TRIGGER = /\bsend\b/i

export default function ChatShell({ sessionId, cdmEmail, cardContext = null, customerAgentId = null, sessionTitle = null, onNewSession = null, onSelectSession = null, onRename = null, onSessionCreated = null, onDataRefresh = null, seedMessage = null, onSeedConsumed = null, onClose = null }) {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [attachments, setAttachments] = useState([])
  const [busy, setBusy]         = useState(false)
  const [assistantName, setAssistantName] = useState(null)
  const [listening, setListening] = useState(false)
  const [activeSessionId, setActiveSessionId] = useState(sessionId)
  const bottomRef     = useRef(null)
  const textRef       = useRef(null)
  const recognitionRef = useRef(null)
  const selfCreatedRef = useRef(null)
  const sendTextRef   = useRef(null)
  const fileInputRef  = useRef(null)

  // Sync ref on every render so the fire-prompt handler always calls the latest version
  useEffect(() => { sendTextRef.current = sendText })

  // Inject a seed message from the parent (e.g. skill import intro) without an API call
  useEffect(() => {
    if (!seedMessage) return
    setMessages([{ role: 'assistant', text: seedMessage }])
    onSeedConsumed?.()
  }, [seedMessage])

  // Sync from parent only when parent is pushing a genuinely different session
  // (not echoing back the ID we just created ourselves)
  useEffect(() => {
    if (sessionId === selfCreatedRef.current) return
    setActiveSessionId(sessionId)
  }, [sessionId])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { getAssistantName().then(setAssistantName).catch(() => setAssistantName('Beacon')) }, [])

  // Load history when switching to an existing (non-pending) session
  useEffect(() => {
    if (!sessionId) return
    if (sessionId === selfCreatedRef.current) return
    setMessages([])
    if (sessionId.startsWith('pending-')) return
    getConversationTurns(sessionId).then(turns => {
      if (!turns.length) return
      const loaded = turns
        .filter(t => t.role === 'user' || t.role === 'assistant')
        .map(t => {
          let text = t.content
          if (t.role === 'assistant' && text?.startsWith('{')) {
            try { text = JSON.parse(text).reply || text } catch { /* keep raw */ }
          }
          return { role: t.role, text }
        })
      setMessages(loaded)
    }).catch(() => {})
  }, [sessionId])

  // Clean up recognition on unmount
  useEffect(() => () => recognitionRef.current?.stop(), [])

  // Fire prompt from nav sidebar
  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.content
      if (text) sendTextRef.current?.(text)
    }
    document.addEventListener('cdm:fire-prompt', handler)
    return () => document.removeEventListener('cdm:fire-prompt', handler)
  }, [])

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.')
      return
    }
    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = true
    rec.lang = 'en-US'
    recognitionRef.current = rec

    let committed = ''

    rec.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) {
          committed += t
        } else {
          interim = t
        }
      }
      const full = committed + interim
      setInput(full)
      if (textRef.current) {
        textRef.current.style.height = 'auto'
        textRef.current.style.height = Math.min(textRef.current.scrollHeight, 160) + 'px'
      }

      // Check if the latest final result ends with trigger word
      if (e.results[e.results.length - 1].isFinal) {
        const last = e.results[e.results.length - 1][0].transcript.trim()
        if (SEND_TRIGGER.test(last)) {
          const cleaned = committed.replace(/\s*send\s*$/i, '').trim()
          committed = ''
          stopListening()
          if (cleaned) {
            setInput('')
            setTimeout(() => sendText(cleaned), 50)
          }
        }
      }
    }

    rec.onerror = (e) => {
      if (e.error !== 'no-speech') console.error('Speech error:', e.error)
    }
    rec.onend = () => {
      setListening(false)
    }

    rec.start()
    setListening(true)
  }

  function stopListening() {
    recognitionRef.current?.stop()
    recognitionRef.current = null
    setListening(false)
  }

  function toggleVoice() {
    if (listening) stopListening()
    else startListening()
  }

  async function sendText(text) {
    if (!text && attachments.length === 0) return
    if (busy) return
    setInput('')
    if (textRef.current) textRef.current.style.height = 'auto'

    // Build the full message: attachment content prepended, then user text
    const parts = []
    attachments.forEach(a => parts.push(`[Attached: ${a.name}]\n${a.text}`))
    if (text) parts.push(text)
    const fullMessage = parts.join('\n\n')

    // Show in chat: filename chips + user text (not the raw file content)
    const displayText = [
      ...attachments.map(a => `📎 ${a.name}`),
      ...(text ? [text] : []),
    ].join('\n')
    setAttachments([])

    setMessages(m => [...m, { role: 'user', text: displayText }])
    setBusy(true)
    const thinkingId = Date.now()
    setMessages(m => [...m, { role: 'thinking', id: thinkingId, activity: '' }])

    const onActivity = (msg) => {
      setMessages(m => m.map(x => x.id === thinkingId ? { ...x, activity: msg } : x))
    }

    try {
      // Lazily create the session on first real message
      let sid = activeSessionId
      if (!sid || sid.startsWith('pending-')) {
        const title = sessionTitle || (customerAgentId ? `Session — ${new Date().toLocaleDateString()}` : `General — ${new Date().toLocaleDateString()}`)
        const sess = await createConversationSession(customerAgentId || null, title)
        sid = sess?.ID || ('session-' + Date.now())
        selfCreatedRef.current = sid
        setActiveSessionId(sid)
        onSessionCreated?.(sid, title)
      }

      const res = await sendChat(fullMessage, sid, cardContext, cdmEmail, assistantName, onActivity, customerAgentId)
      setMessages(m => m.filter(x => x.id !== thinkingId))

      if (res.renameAssistant) { setAssistantName(res.renameAssistant); onRename?.(res.renameAssistant) }
      if (res.refreshData) onDataRefresh?.()
      if (res.reply) setMessages(m => [...m, { role: 'assistant', text: res.reply }])
      if (res.panels?.length) setMessages(m => [...m, { role: 'panels', panels: res.panels }])
      if (res.proposedLayout) setMessages(m => [...m, { role: 'panels', panels: [{ type: 'confirm-dialog', title: 'Update your workspace?', proposedLayout: res.proposedLayout }] }])
    } catch (err) {
      setMessages(m => m.filter(x => x.id !== thinkingId))
      setMessages(m => [...m, { role: 'system', text: `Error: ${err.message}` }])
    } finally {
      setBusy(false)
    }
  }

  async function handleSend() { await sendText(input.trim()) }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const name = assistantName || 'Beacon'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatSessionHeader
        customerAgentId={customerAgentId}
        currentSessionId={activeSessionId}
        currentTitle={sessionTitle}
        onNewSession={onNewSession}
        onSelectSession={onSelectSession}
      />
      {messages.length === 0 && (
        <div style={{ padding: '2rem', color: '#666', fontSize: '0.9rem' }}>
          Hi — I'm <strong>{name}</strong>. Ask me about requests, pricing, R&R codes, or paste a customer email.
        </div>
      )}
      <div className="chat-thread">
        {messages.map((m, i) => {
          if (m.role === 'thinking') return (
            <div key={m.id} className="thinking">
              {m.activity
                ? <span className="thinking-label">{m.activity}</span>
                : <><span /><span /><span /></>}
            </div>
          )
          if (m.role === 'panels') return (
            <div key={i} className="inline-panels">
              {m.panels.map((p, j) => <PanelRenderer key={j} panel={p} cdmEmail={cdmEmail} inline={true} />)}
            </div>
          )
          if (m.role === 'assistant') return (
            <div key={i} className="bubble assistant"
              dangerouslySetInnerHTML={{ __html: mdToHtml(m.text) }} />
          )
          return <div key={i} className={`bubble ${m.role}`}>{m.text}</div>
        })}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-area">
        {attachments.length > 0 && (
          <div className="chat-attachments">
            {attachments.map((a, i) => (
              <div key={i} className="chat-attachment-chip">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
                <span>{a.name}</span>
                <button
                  className="chat-attachment-remove"
                  onClick={() => setAttachments(prev => prev.filter((_, j) => j !== i))}
                  title="Remove"
                >×</button>
              </div>
            ))}
          </div>
        )}
        <div className="chat-input-row">
        <label
          className={`voice-btn${busy ? ' disabled' : ''}`}
          title="Attach file"
          style={{ cursor: busy ? 'not-allowed' : 'pointer' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.html,.csv,.pdf,.docx"
            style={{ display: 'none' }}
          onChange={async e => {
            if (busy) return
            const file = e.target.files?.[0]
            if (!file) return
            e.target.value = ''

            const isBinary = /\.(pdf|docx)$/i.test(file.name)

            if (isBinary) {
              const formData = new FormData()
              formData.append('file', file)
              try {
                const res = await fetch('/api/extract-text', { method: 'POST', body: formData })
                if (!res.ok) throw new Error(`Extraction failed: ${res.status}`)
                const { text } = await res.json()
                setAttachments(prev => [...prev, { name: file.name, text }])
              } catch (err) {
                setAttachments(prev => [...prev, { name: file.name, text: `[Could not extract: ${err.message}]` }])
              }
            } else {
              const reader = new FileReader()
              reader.onload = ev => {
                setAttachments(prev => [...prev, { name: file.name, text: ev.target.result }])
              }
              reader.readAsText(file)
            }
          }}
        />
        </label>
        <button
          className={`voice-btn${listening ? ' active' : ''}`}
          onClick={toggleVoice}
          title={listening ? 'Stop listening (or say "send")' : 'Start voice input'}
          disabled={busy}
        >
          {listening
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></svg>
          }
        </button>
        <textarea
          ref={textRef}
          rows={1}
          placeholder={listening ? 'Listening… say "send" to submit' : 'Ask anything...'}
          value={input}
          onChange={e => {
            setInput(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
          }}
          onKeyDown={onKey}
          disabled={busy}
        />
        <Button design="Emphasized" onClick={handleSend} disabled={busy || (!input.trim() && attachments.length === 0)}>
          Send
        </Button>
        </div>
      </div>
    </div>
  )
}
