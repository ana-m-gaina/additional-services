'use strict'

// Nav tree — loads ClientAgents, ContractSubagents, AutomationAgents from v2 CAP.

const NavTree = {
  _container: null,
  _data: { clients: [], contracts: [], automations: [] },

  async init(container) {
    this._container = container
    await this.refresh()
  },

  async refresh() {
    try {
      const [clientsRes, contractsRes, automationsRes] = await Promise.all([
        ODataClient.get('/ClientAgents?$filter=status eq \'active\'&$orderby=displayName'),
        ODataClient.get('/ContractSubagents?$filter=status eq \'active\'&$orderby=displayName'),
        ODataClient.get('/AutomationAgents?$filter=status eq \'active\'&$orderby=displayName')
      ])
      this._data.clients     = clientsRes.value || []
      this._data.contracts   = contractsRes.value || []
      this._data.automations = automationsRes.value || []
    } catch {
      this._data = { clients: [], contracts: [], automations: [] }
    }
    this._render()
  },

  _render() {
    if (!this._container) return
    this._container.innerHTML = ''

    // Clients section
    const clientsSection = this._section('Clients')
    const clientsList = document.createElement('ul')
    clientsList.className = 'nav-list'

    for (const client of this._data.clients) {
      const clientItem = this._navItem(client.displayName, 'client', client.ID)
      const contractsList = document.createElement('ul')
      contractsList.className = 'nav-sublist'

      const contracts = this._data.contracts.filter(c => c.clientId === client.ID)
      for (const contract of contracts) {
        contractsList.appendChild(this._navItem(contract.displayName, 'contract', contract.ID, contract.sid))
      }
      clientItem.appendChild(contractsList)
      clientsList.appendChild(clientItem)
    }

    clientsList.appendChild(this._addButton('+ Add client', () => this._promptAddClient()))
    clientsSection.appendChild(clientsList)
    this._container.appendChild(clientsSection)

    // Automations section
    const autoSection = this._section('Automations')
    const autoList = document.createElement('ul')
    autoList.className = 'nav-list'

    for (const auto of this._data.automations) {
      autoList.appendChild(this._navItem(auto.displayName, 'automation', auto.ID))
    }

    autoList.appendChild(this._addButton('+ Add automation', () => this._promptAddAutomation()))
    autoSection.appendChild(autoList)
    this._container.appendChild(autoSection)
  },

  _section(label) {
    const el = document.createElement('div')
    el.className = 'nav-section'
    const header = document.createElement('div')
    header.className = 'nav-section-header'
    header.textContent = label
    el.appendChild(header)
    return el
  },

  _navItem(label, type, id, subtitle) {
    const li = document.createElement('li')
    li.className = `nav-item nav-item-${type}`
    li.dataset.id   = id
    li.dataset.type = type

    const labelEl = document.createElement('span')
    labelEl.className = 'nav-item-label'
    labelEl.textContent = label
    li.appendChild(labelEl)

    if (subtitle) {
      const sub = document.createElement('span')
      sub.className = 'nav-item-sub'
      sub.textContent = subtitle
      li.appendChild(sub)
    }

    labelEl.addEventListener('dblclick', () => this._inlineRename(labelEl, type, id))

    // Single click → fire nav:select so ChatShell opens a scoped conversation
    li.addEventListener('click', e => {
      if (e.target.closest('input')) return  // ignore clicks on inline rename inputs
      document.dispatchEvent(new CustomEvent('nav:select', {
        detail: { type, id, label, subtitle }
      }))
    })

    return li
  },

  _addButton(label, onClick) {
    const li = document.createElement('li')
    li.className = 'nav-add-btn'
    li.textContent = label
    li.addEventListener('click', onClick)
    return li
  },

  async _inlineRename(labelEl, type, id) {
    const oldName = labelEl.textContent
    const input = document.createElement('input')
    input.className = 'nav-rename-input'
    input.value = oldName
    labelEl.replaceWith(input)
    input.focus()
    input.select()

    const commit = async () => {
      const newName = input.value.trim()
      if (newName && newName !== oldName) {
        const entity = type === 'automation' ? 'AutomationAgents' : type === 'contract' ? 'ContractSubagents' : 'ClientAgents'
        try { await ODataClient.patch(`/${entity}(${id})`, { displayName: newName }) } catch { /* revert */ }
      }
      await this.refresh()
    }

    input.addEventListener('blur', commit)
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter')  { e.preventDefault(); input.blur() }
      if (e.key === 'Escape') { input.value = oldName; input.blur() }
    })
  },

  _promptAddClient() {
    const name = window.prompt('Customer ID for this client:')
    if (!name?.trim()) return
    const display = window.prompt('Display name in nav:', name.trim())
    if (!display?.trim()) return
    ODataClient.post('/ClientAgents', {
      ID: crypto.randomUUID(), customerId: name.trim(),
      displayName: display.trim(), createdBy: 'user', createdAt: new Date().toISOString()
    }).then(() => this.refresh()).catch(console.error)
  },

  _promptAddAutomation() {
    const eventType = window.prompt('Event type (e.g. customer.acceptance):')
    if (!eventType?.trim()) return
    const display = window.prompt('Display name in nav:', eventType.trim())
    if (!display?.trim()) return
    ODataClient.post('/AutomationAgents', {
      ID: crypto.randomUUID(), eventType: eventType.trim(),
      displayName: display.trim(), enabled: true, createdBy: 'user', createdAt: new Date().toISOString()
    }).then(() => this.refresh()).catch(console.error)
  }
}

window.NavTree = NavTree
