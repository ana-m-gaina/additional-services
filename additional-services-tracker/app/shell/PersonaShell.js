'use strict'

// Dashboard mode: loads saved persona layout and renders persistent panels.
// The orchestrate action can propose layout changes; CDM confirms via confirm-dialog.

const PersonaShell = {
  async init(container) {
    this._container = container
    this._grid      = container.querySelector('#dashboard-grid')
    this._refresh()
  },

  async _refresh() {
    this._grid.innerHTML = ''
    const layout = await PersonaStore.load()
    const panels = (layout?.panels || []).sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    panels.forEach(p => {
      const el = Renderer.render(p)
      if (el) {
        el.classList.add('dashboard-panel')
        if (p.pinned) el.classList.add('pinned')
        this._grid.appendChild(el)
      }
    })
    if (!panels.length) {
      const empty = document.createElement('div')
      empty.className = 'empty-dashboard'
      empty.textContent = `No panels configured. Switch to Chat and ask ${PersonaStore.getAssistantName()} to set up your workspace.`
      this._grid.appendChild(empty)
    }
  }
}

window.PersonaShell = PersonaShell
