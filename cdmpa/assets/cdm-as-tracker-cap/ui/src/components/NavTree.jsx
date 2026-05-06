import { useState, useEffect } from 'react'
import { getClientAgents, getContractSubagents, getAutomationAgents, patchAgent, postAgent } from '../api.js'

export default function NavTree({ currentUser }) {
  const [clients, setClients]         = useState([])
  const [contracts, setContracts]     = useState([])
  const [automations, setAutomations] = useState([])
  const [clientsOpen, setClientsOpen]         = useState(true)
  const [automationsOpen, setAutomationsOpen] = useState(true)

  async function load() {
    try {
      const [c, ct, a] = await Promise.all([getClientAgents(), getContractSubagents(), getAutomationAgents()])
      setClients(c); setContracts(ct); setAutomations(a)
    } catch { /* ignore */ }
  }

  useEffect(() => { load() }, [])

  async function rename(entity, id, oldName) {
    const newName = window.prompt(`Rename:`, oldName)
    if (!newName?.trim() || newName === oldName) return
    await patchAgent(entity, id, { displayName: newName.trim() })
    load()
  }

  async function addClient() {
    const customerId = window.prompt('Customer name or ID:')
    if (!customerId?.trim()) return
    const displayName = window.prompt('Display name:', customerId.trim())
    if (!displayName?.trim()) return
    await postAgent('ClientAgents', {
      ID: crypto.randomUUID(), customerId: customerId.trim(), displayName: displayName.trim(),
      createdBy: currentUser, createdAt: new Date().toISOString()
    })
    load()
  }

  async function addAutomation() {
    const eventType = window.prompt('Event type (e.g. customer.acceptance):')
    if (!eventType?.trim()) return
    const displayName = window.prompt('Display name:', eventType.trim())
    if (!displayName?.trim()) return
    await postAgent('AutomationAgents', {
      ID: crypto.randomUUID(), eventType: eventType.trim(), displayName: displayName.trim(),
      enabled: true, createdBy: currentUser, createdAt: new Date().toISOString()
    })
    load()
  }

  return (
    <div>
      <div className="nav-section">
        <div className="nav-section-header nav-section-header--toggle" onClick={() => setClientsOpen(o => !o)}>
          <span>Clients</span>
          <span className={`nav-chevron${clientsOpen ? ' open' : ''}`}>›</span>
        </div>
        {clientsOpen && (
          <ul className="nav-list">
            {clients.map(c => (
              <li key={c.ID} className="nav-item nav-item-client">
                <span onDoubleClick={() => rename('ClientAgents', c.ID, c.displayName)} style={{ cursor: 'default' }}>
                  {c.displayName}
                </span>
                <span className="nav-item-sub">{c.customerId}</span>
                <ul className="nav-sublist">
                  {contracts.filter(ct => ct.clientId === c.ID).map(ct => (
                    <li key={ct.ID} className="nav-item nav-item-contract">
                      <span onDoubleClick={() => rename('ContractSubagents', ct.ID, ct.displayName)}>
                        {ct.displayName}
                      </span>
                      <span className="nav-item-sub">{ct.sid} · {ct.contractType}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="nav-add-btn" onClick={addClient}>+ Add client</li>
          </ul>
        )}
      </div>
      <div className="nav-section">
        <div className="nav-section-header nav-section-header--toggle" onClick={() => setAutomationsOpen(o => !o)}>
          <span>Automations</span>
          <span className={`nav-chevron${automationsOpen ? ' open' : ''}`}>›</span>
        </div>
        {automationsOpen && (
          <ul className="nav-list">
            {automations.map(a => (
              <li key={a.ID} className="nav-item nav-item-automation">
                <span onDoubleClick={() => rename('AutomationAgents', a.ID, a.displayName)}>
                  {a.displayName}
                </span>
                <span className="nav-item-sub">{a.eventType}</span>
              </li>
            ))}
            <li className="nav-add-btn" onClick={addAutomation}>+ Add automation</li>
          </ul>
        )}
      </div>
    </div>
  )
}
