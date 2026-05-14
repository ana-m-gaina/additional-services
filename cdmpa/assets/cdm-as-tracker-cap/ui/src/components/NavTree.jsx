import { useState, useEffect } from 'react'
import { Dialog, Input, Button, Label } from '@ui5/webcomponents-react'
import { getCustomerAgents, postAgent, patchAgent, savePersonalTemplate, getPersonalTemplates } from '../api.js'

function ChevronIcon({ open }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10"
      style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease', flexShrink: 0 }}
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="3,2 7,5 3,8"/>
    </svg>
  )
}

function SectionHeader({ label, open, onToggle, onNavigate }) {
  return (
    <div className="nav-section-header nav-section-header--toggle">
      <span
        onClick={onNavigate || onToggle}
        style={onNavigate ? { cursor: 'pointer', flex: 1 } : { flex: 1 }}
      >{label}</span>
      <span onClick={onToggle} style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
        <ChevronIcon open={open} />
      </span>
    </div>
  )
}

export default function NavTree({ currentUser, onSelectClient, onFirePrompt, onOpenPrompts, refreshToken = 0 }) {
  const [customers, setCustomers] = useState([])
  const [prompts, setPrompts]     = useState([])
  const [customersOpen, setCustomersOpen] = useState(true)
  const [promptsOpen, setPromptsOpen]     = useState(true)
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)
  const [newCustomerId, setNewCustomerId]   = useState('')
  const [newCustomerName, setNewCustomerName] = useState('')

  const [promptDialogOpen, setPromptDialogOpen] = useState(false)
  const [newPromptKey, setNewPromptKey]         = useState('')
  const [newPromptContent, setNewPromptContent] = useState('')

  async function load() {
    try {
      const [c, p] = await Promise.all([getCustomerAgents(), getPersonalTemplates()])
      setCustomers(c)
      setPrompts(p)
    } catch { /* ignore */ }
  }

  useEffect(() => { load() }, [refreshToken])

  async function submitAddCustomer() {
    if (!newCustomerId.trim() || !newCustomerName.trim()) return
    await postAgent('CustomerAgents', {
      ID: crypto.randomUUID(),
      customerId: newCustomerId.trim(),
      displayName: newCustomerName.trim(),
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
    })
    setCustomerDialogOpen(false)
    setNewCustomerId('')
    setNewCustomerName('')
    load()
  }

  async function submitAddPrompt() {
    if (!newPromptKey.trim() || !newPromptContent.trim()) return
    await savePersonalTemplate(newPromptKey.trim(), newPromptKey.trim(), newPromptContent.trim())
    setPromptDialogOpen(false)
    setNewPromptKey('')
    setNewPromptContent('')
    load()
  }

  return (
    <nav className="nav-tree">

      {/* ── Customers ── */}
      <div className="nav-section">
        <SectionHeader label="Customers" open={customersOpen} onToggle={() => setCustomersOpen(o => !o)} />
        {customersOpen && (
          <ul className="nav-list">
            {customers.map(c => (
              <li key={c.ID} className="nav-item nav-item-row">
                <span
                  className="nav-item-name"
                  onClick={() => onSelectClient?.(c)}
                  onDoubleClick={() => {
                    const n = window.prompt('Rename:', c.displayName)
                    if (n?.trim() && n !== c.displayName) patchAgent('CustomerAgents', c.ID, { displayName: n.trim() }).then(load)
                  }}
                >
                  {c.displayName}
                </span>
              </li>
            ))}
            <li className="nav-add-btn" onClick={() => setCustomerDialogOpen(true)}>+ Add customer</li>
          </ul>
        )}
      </div>

      {/* ── Prompts ── */}
      <div className="nav-section">
        <SectionHeader label="Prompts" open={promptsOpen} onToggle={() => setPromptsOpen(o => !o)} onNavigate={onOpenPrompts} />
        {promptsOpen && (
          <ul className="nav-list">
            {prompts.length === 0 && (
              <li className="nav-empty">No prompts yet</li>
            )}
            {prompts.map(p => (
              <li
                key={p.ID}
                className="nav-item nav-item-prompt"
                onClick={() => onFirePrompt?.(p.content)}
                title={p.content?.slice(0, 120)}
              >
                <span className="nav-prompt-label">{p.templateKey || p.description}</span>
              </li>
            ))}
            <li className="nav-add-btn" onClick={() => setPromptDialogOpen(true)}>+ Add prompt</li>
          </ul>
        )}
      </div>

      {/* ── Add Customer Dialog ── */}
      <Dialog
        open={customerDialogOpen}
        headerText="Add customer"
        onClose={() => setCustomerDialogOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', minWidth: '280px' }}>
          <div>
            <Label for="cust-id-input" required>Customer number</Label>
            <Input
              id="cust-id-input"
              placeholder="SAP account ID"
              value={newCustomerId}
              onInput={e => setNewCustomerId(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Label for="cust-name-input" required>Display name</Label>
            <Input
              id="cust-name-input"
              placeholder="Customer name"
              value={newCustomerName}
              onInput={e => setNewCustomerName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submitAddCustomer() }}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
            <Button design="Emphasized" onClick={submitAddCustomer}>Add</Button>
            <Button design="Transparent" onClick={() => { setCustomerDialogOpen(false); setNewCustomerId(''); setNewCustomerName('') }}>Cancel</Button>
          </div>
        </div>
      </Dialog>

      {/* ── Add Prompt Dialog ── */}
      <Dialog
        open={promptDialogOpen}
        headerText="Add prompt"
        onClose={() => setPromptDialogOpen(false)}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', minWidth: '320px' }}>
          <div>
            <Label for="prompt-key-input" required>Name</Label>
            <Input
              id="prompt-key-input"
              placeholder="Short label (e.g. Weekly summary)"
              value={newPromptKey}
              onInput={e => setNewPromptKey(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <Label for="prompt-content-input" required>Prompt text</Label>
            <textarea
              id="prompt-content-input"
              placeholder="What gets sent to the assistant…"
              value={newPromptContent}
              onChange={e => setNewPromptContent(e.target.value)}
              rows={4}
              style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.85rem', padding: '0.4rem 0.6rem', border: '1px solid var(--sapField_BorderColor, #89919a)', borderRadius: '4px', background: 'var(--sapField_Background, #fff)', color: 'var(--sapTextColor, #32363a)' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
            <Button design="Emphasized" onClick={submitAddPrompt}>Add</Button>
            <Button design="Transparent" onClick={() => { setPromptDialogOpen(false); setNewPromptKey(''); setNewPromptContent('') }}>Cancel</Button>
          </div>
        </div>
      </Dialog>

    </nav>
  )
}
