import { useState, useRef, useEffect } from 'react'
import { Button } from '@ui5/webcomponents-react'
import { sendChat, getAssistantName } from '../api.js'
import PanelRenderer from './PanelRenderer.jsx'

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

export default function ChatShell({ sessionId, cdmEmail, cardContext = null }) {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [busy, setBusy]         = useState(false)
  const [assistantName, setAssistantName] = useState(null)
  const [listening, setListening] = useState(false)
  const bottomRef  = useRef(null)
  const textRef    = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { getAssistantName().then(setAssistantName).catch(() => setAssistantName('Beacon')) }, [])

  // Clean up recognition on unmount
  useEffect(() => () => recognitionRef.current?.stop(), [])

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome.')
      return
    }
    const rec = new SpeechRecognition()
    rec.continuous = true
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
          // Strip trailing "send" and submit
          const cleaned = committed.replace(/\s*send\s*$/i, '').trim()
          committed = ''
          stopListening()
          if (cleaned) {
            setInput(cleaned)
            // Use a short delay so state updates before send
            setTimeout(() => sendText(cleaned), 50)
          }
        }
      }
    }

    rec.onerror = (e) => {
      if (e.error !== 'no-speech') console.error('Speech error:', e.error)
    }
    rec.onend = () => setListening(false)

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
    if (!text || busy) return
    setInput('')
    if (textRef.current) textRef.current.style.height = 'auto'
    setMessages(m => [...m, { role: 'user', text }])
    setBusy(true)
    const thinkingId = Date.now()
    setMessages(m => [...m, { role: 'thinking', id: thinkingId, activity: '' }])

    const onActivity = (msg) => {
      setMessages(m => m.map(x => x.id === thinkingId ? { ...x, activity: msg } : x))
    }

    try {
      const res = await sendChat(text, sessionId, cardContext, cdmEmail, assistantName, onActivity)
      setMessages(m => m.filter(x => x.id !== thinkingId))

      if (res.renameAssistant) setAssistantName(res.renameAssistant)
      if (res.reply) setMessages(m => [...m, { role: 'assistant', text: res.reply }])
      if (res.panels?.length) setMessages(m => [...m, { role: 'panels', panels: res.panels }])
      if (res.proposedLayout) setMessages(m => [...m, { role: 'panels', panels: [{ type: 'confirm-dialog', title: 'Update your workspace?', config: res.proposedLayout }] }])
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
              {m.panels.map((p, j) => <PanelRenderer key={j} panel={p} cdmEmail={cdmEmail} />)}
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
      <div className="chat-input-row">
        <button
          className={`voice-btn${listening ? ' active' : ''}`}
          onClick={toggleVoice}
          title={listening ? 'Stop listening (or say "send")' : 'Start voice input'}
          disabled={busy}
        >
          {listening ? '⏹' : '🎤'}
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
        <Button design="Emphasized" onClick={handleSend} disabled={busy || !input.trim()}>
          Send
        </Button>
      </div>
    </div>
  )
}
