'use strict'

// OData client for the v2 CAP backend at :4004/CDMService.
// Used by NavTree, InboxView, PersonaStore, and Renderer for data reads/writes.

const ODATA_BASE = 'http://localhost:4004/CDMService'

const ODataClient = {
  async get(path, params = {}) {
    const url = new URL(ODATA_BASE + path)
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`OData GET ${path} failed: ${res.status}`)
    return res.json()
  },

  async patch(path, body) {
    const res = await fetch(ODATA_BASE + path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`OData PATCH ${path} failed: ${res.status}`)
    return res.status === 204 ? null : res.json()
  },

  async post(path, body) {
    const res = await fetch(ODATA_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message || `OData POST ${path} failed: ${res.status}`)
    }
    return res.json()
  }
}

window.ODataClient = ODataClient
