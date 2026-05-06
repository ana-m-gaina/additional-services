import { useState } from 'react'
import { Button } from '@ui5/webcomponents-react'

export default function EmailDraft({ panel }) {
  const [copied, setCopied] = useState(false)
  const cfg = panel.config || {}
  const text = cfg.emailText || cfg.body || panel.emailText || panel.body || ''
  const to = cfg.to || panel.to || ''
  const subject = cfg.subject || panel.subject || ''

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback: select text */
    }
  }

  return (
    <div>
      {panel.title && <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{panel.title}</div>}
      {(to || subject) && (
        <div style={{ fontSize: '0.82rem', color: '#555', marginBottom: '0.5rem', lineHeight: 1.8 }}>
          {to && <div><strong>To:</strong> {to}</div>}
          {subject && <div><strong>Subject:</strong> {subject}</div>}
        </div>
      )}
      <div
        style={{
          background: '#f8f8f8', border: '1px solid #e0e0e0', borderRadius: 6,
          padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem',
          whiteSpace: 'pre-wrap', lineHeight: 1.6, marginBottom: '0.75rem',
          minHeight: '4rem',
        }}
      >
        {text || <span style={{ color: '#aaa', fontStyle: 'italic' }}>No email body provided.</span>}
      </div>
      <Button onClick={copy} disabled={!text}>{copied ? 'Copied!' : 'Copy to Clipboard'}</Button>
    </div>
  )
}
