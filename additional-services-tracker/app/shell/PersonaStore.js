'use strict'

const DEFAULT_ASSISTANT_NAME = 'Beacon'

const DEFAULT_LAYOUT = {
  panels: [
    {
      id: 'default-kpi',
      type: 'kpi-strip',
      title: 'Workload Overview',
      pinned: true,
      position: 0,
      config: { odata_path: '/api/v1/Requests' }
    },
    {
      id: 'default-table',
      type: 'record-table',
      title: 'My Open Requests',
      pinned: true,
      position: 1,
      config: {
        filters: { status_ne: 'Complete' },
        fields: ['customerName', 'additionalServiceIds', 'status', 'modifiedAt'],
        odata_path: '/api/v1/Requests'
      }
    }
  ]
}

const PersonaStore = {
  _userId: null,
  _layout: null,

  setUserId(id) { this._userId = id },

  async load() {
    if (!this._userId) return DEFAULT_LAYOUT
    try {
      const res = await ODataClient.get(`/PersonaLayouts(${encodeURIComponent(this._userId)})`)
      if (res?.layoutJson) {
        this._layout = JSON.parse(res.layoutJson)
        return this._layout
      }
    } catch {
      // No saved layout yet — use default
    }
    this._layout = structuredClone(DEFAULT_LAYOUT)
    return this._layout
  },

  async save(layout) {
    if (!this._userId) return
    this._layout = layout
    try {
      await ODataClient.patch(`/PersonaLayouts(${encodeURIComponent(this._userId)})`, {
        layoutJson: JSON.stringify(layout),
        updatedAt: new Date().toISOString()
      })
    } catch {
      // Try create if patch 404s
      try {
        await ODataClient.post('/PersonaLayouts', {
          userId: this._userId,
          layoutJson: JSON.stringify(layout),
          updatedAt: new Date().toISOString()
        })
      } catch (e) {
        console.warn('[PersonaStore] Could not persist layout:', e.message)
      }
    }
  },

  get() { return this._layout ?? DEFAULT_LAYOUT },

  getAssistantName() {
    return this._layout?.assistantName
      || localStorage.getItem('beacon_assistant_name')
      || DEFAULT_ASSISTANT_NAME
  },

  isFirstRun() {
    return !this._layout?.firstRunDone
  },

  async setAssistantName(name) {
    localStorage.setItem('beacon_assistant_name', name)
    const layout = this._layout ?? structuredClone(DEFAULT_LAYOUT)
    layout.assistantName = name
    this._layout = layout
    await this.save(layout)
  },

  async markFirstRunDone() {
    const layout = this._layout ?? structuredClone(DEFAULT_LAYOUT)
    layout.firstRunDone = true
    this._layout = layout
    await this.save(layout)
  }
}

window.PersonaStore = PersonaStore
