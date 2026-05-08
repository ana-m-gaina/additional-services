'use strict'

// Maps PanelConfig JSON → UI5 web component DOM nodes.
// Data paths updated for v2 CAP entity names (/ASRequest instead of /Requests).

const Renderer = {
  render(panel) {
    const fn = this._renderers[panel.type]
    if (!fn) {
      console.warn(`[Renderer] Unknown panel type: ${panel.type}`)
      return null
    }
    const el = fn.call(this, panel)
    if (!el) return null
    el.dataset.panelId   = panel.id
    el.dataset.panelType = panel.type
    return el
  },

  _renderers: {

    'record-card'(panel) {
      const cfg  = panel.config || {}
      const card = document.createElement('ui5-card')
      const header = document.createElement('ui5-card-header')
      header.setAttribute('title-text', panel.title || 'Request')
      if (cfg.subtitle) header.setAttribute('subtitle-text', cfg.subtitle)
      card.appendChild(header)

      const body = document.createElement('div')
      body.style.cssText = 'padding:0.75rem 1rem;font-size:0.875rem;'

      if (cfg.record) {
        body.appendChild(_buildRecordTable(cfg.record))
      } else if (cfg.recordId) {
        body.textContent = `Record ID: ${cfg.recordId}`
        _loadRecord(cfg.recordId).then(r => {
          if (r) { body.innerHTML = ''; body.appendChild(_buildRecordTable(r)) }
        })
      }

      card.appendChild(body)
      return _wrap(card, panel)
    },

    'record-table'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const table  = document.createElement('ui5-table')
      table.setAttribute('no-data-text', 'No records found')

      const fields = cfg.fields || ['customerName', 'status', 'modifiedAt']
      const labels = {
        customerName: 'Customer', additionalServiceIds: 'Services', status: 'Status',
        modifiedAt: 'Last Updated', cdmOwner: 'Owner', price: 'Price',
        o2iTicketNo: 'O2I Ticket', amsTicketNo: 'AMS Ticket'
      }

      fields.forEach(f => {
        const col = document.createElement('ui5-table-column')
        col.setAttribute('slot', 'columns')
        col.innerHTML = `<span>${labels[f] || f}</span>`
        table.appendChild(col)
      })

      const records = cfg.records || []
      const renderRows = rows => rows.forEach(r => {
        const row = document.createElement('ui5-table-row')
        fields.forEach(f => {
          const cell = document.createElement('ui5-table-cell')
          const val  = r[f] ?? '—'
          cell.innerHTML = f === 'status'
            ? `<ui5-badge color-scheme="${_statusColor(val)}">${_esc(val)}</ui5-badge>`
            : `<span>${_esc(String(val))}</span>`
          row.appendChild(cell)
        })
        table.appendChild(row)
      })

      renderRows(records)

      if (!records.length && cfg.odata_path) {
        _loadRecords(cfg).then(renderRows)
      }

      wrap.appendChild(table)
      return wrap
    },

    'field-form'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const form   = document.createElement('ui5-form')
      form.setAttribute('layout', 'S1 M2 L2')
      const fields = cfg.fields || Object.keys(cfg.record || {})
      const record = cfg.record || {}

      fields.forEach(f => {
        const item  = document.createElement('ui5-form-item')
        const label = document.createElement('span')
        label.setAttribute('slot', 'labelContent')
        label.textContent = _fieldLabel(f)
        item.appendChild(label)

        if (cfg.editable) {
          const input = document.createElement('ui5-input')
          input.setAttribute('value', record[f] ?? '')
          input.dataset.field = f
          item.appendChild(input)
        } else {
          const text = document.createElement('ui5-text')
          text.textContent = record[f] ?? '—'
          item.appendChild(text)
        }
        form.appendChild(item)
      })

      wrap.appendChild(form)
      return wrap
    },

    'status-timeline'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const timeline = document.createElement('ui5-timeline')
      ;(cfg.entries || []).forEach(e => {
        const item = document.createElement('ui5-timeline-item')
        item.setAttribute('title-text', e.title || '')
        item.setAttribute('subtitle-text', e.date || '')
        if (e.icon) item.setAttribute('icon', e.icon)
        if (e.text) item.textContent = e.text
        timeline.appendChild(item)
      })

      wrap.appendChild(timeline)
      return wrap
    },

    'checklist'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const list = document.createElement('ui5-list')
      list.setAttribute('mode', 'None')

      const items = cfg.items || [
        { label: 'Price email sent',        field: 'checkPriceEmailSent' },
        { label: 'Approval received',       field: 'checkApprovalReceived' },
        { label: 'SharePoint upload done',  field: 'checkSharePointUploaded' },
        { label: 'CAS SD informed',         field: 'checkCasSdInformed' },
        { label: 'AMS ticket closed',       field: 'checkAmsClosed' },
        { label: 'O2I ticket created',      field: 'checkO2iCreated' }
      ]

      const record = cfg.record || {}
      items.forEach(({ label, field }) => {
        const li  = document.createElement('ui5-li-custom')
        const box = document.createElement('ui5-checkbox')
        box.setAttribute('text', label)
        if (record[field]) box.setAttribute('checked', '')
        box.setAttribute('readonly', '')
        li.appendChild(box)
        list.appendChild(li)
      })

      wrap.appendChild(list)
      return wrap
    },

    'email-draft'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const container = document.createElement('div')
      container.style.cssText = 'display:flex;flex-direction:column;gap:0.5rem;padding:0 0.25rem;'

      if (cfg.subject) {
        const subjectLabel = document.createElement('div')
        subjectLabel.style.cssText = 'font-size:0.8125rem;font-weight:600;color:#1d2d3e;'
        subjectLabel.textContent = 'Subject'
        const subjectInput = document.createElement('ui5-input')
        subjectInput.setAttribute('value', cfg.subject)
        subjectInput.style.cssText = 'width:100%;'
        container.appendChild(subjectLabel)
        container.appendChild(subjectInput)
      }

      const bodyLabel = document.createElement('div')
      bodyLabel.style.cssText = 'font-size:0.8125rem;font-weight:600;color:#1d2d3e;'
      bodyLabel.textContent = 'Body'

      const ta = document.createElement('ui5-textarea')
      ta.setAttribute('value', cfg.emailText || cfg.body || cfg.draft || '')
      ta.setAttribute('rows', '10')
      ta.setAttribute('growing', '')
      ta.setAttribute('growing-max-lines', '20')
      ta.style.cssText = 'width:100%;'

      container.appendChild(bodyLabel)
      container.appendChild(ta)

      const btnRow = document.createElement('div')
      btnRow.style.cssText = 'display:flex;gap:0.5rem;'
      const copyBtn = document.createElement('ui5-button')
      copyBtn.setAttribute('design', 'Emphasized')
      copyBtn.textContent = 'Copy to clipboard'
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(ta.getAttribute('value') || ta.value || '').catch(() => {})
        copyBtn.textContent = 'Copied!'
        setTimeout(() => { copyBtn.textContent = 'Copy to clipboard' }, 1500)
      })
      btnRow.appendChild(copyBtn)
      container.appendChild(btnRow)
      wrap.appendChild(container)
      return wrap
    },

    'kpi-strip'(panel) {
      const wrap = _wrap(null, panel)
      wrap.appendChild(_sectionTitle(panel.title))

      const strip = document.createElement('div')
      strip.style.cssText = 'display:flex;gap:1rem;flex-wrap:wrap;padding:0 0.25rem;'

      const kpis = panel.config?.kpis || []
      const renderKpi = ({ label, value, color }) => {
        const card = document.createElement('ui5-card')
        card.style.cssText = 'flex:1;min-width:7rem;max-width:12rem;'
        const h = document.createElement('ui5-card-header')
        h.setAttribute('title-text', String(value))
        h.setAttribute('subtitle-text', label)
        if (color) h.style.cssText = `--_ui5_card_header_title_color:${color};`
        card.appendChild(h)
        strip.appendChild(card)
      }

      kpis.forEach(renderKpi)

      if (!kpis.length) {
        _loadRecords({ odata_path: '/ASRequest', fields: ['status'] }).then(rows => {
          ;[
            { label: 'Open requests',    value: rows.filter(r => r.status !== 'Complete').length,          color: '#0070f2' },
            { label: 'Awaiting approval',value: rows.filter(r => r.status === 'Price communicated').length, color: '#e9730c' },
            { label: 'In delivery',      value: rows.filter(r => r.status === 'Approval received').length,  color: '#188918' }
          ].forEach(renderKpi)
        })
      }

      wrap.appendChild(strip)
      return wrap
    },

    'reminder-banner'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)

      const reminders = cfg.reminders || []
      if (reminders.length) {
        reminders.forEach(({ text, type }) => {
          const strip = document.createElement('ui5-message-strip')
          strip.setAttribute('design', type === 'Error' ? 'Negative' : 'Warning')
          strip.setAttribute('hide-close-button', '')
          strip.textContent = text
          strip.style.cssText = 'margin-bottom:0.375rem;'
          wrap.appendChild(strip)
        })
      } else if (cfg.text) {
        const strip = document.createElement('ui5-message-strip')
        strip.setAttribute('design', cfg.type === 'Error' ? 'Negative' : 'Warning')
        strip.textContent = cfg.text
        wrap.appendChild(strip)
      }

      return wrap
    },

    'ticket-ref'(panel) {
      const cfg     = panel.config || {}
      const wrap    = _wrap(null, panel)
      const tickets = cfg.tickets || (cfg.ticketNo ? [{ no: cfg.ticketNo, label: panel.title, url: cfg.url }] : [])

      tickets.forEach(({ no, label, url }) => {
        const row = document.createElement('div')
        row.style.cssText = 'display:flex;align-items:center;gap:0.75rem;margin-bottom:0.375rem;'

        const link = document.createElement('ui5-link')
        link.textContent = no
        if (url) link.setAttribute('href', url)
        link.setAttribute('target', '_blank')

        const lbl = document.createElement('span')
        lbl.style.cssText = 'font-size:0.8125rem;color:#89919a;'
        lbl.textContent = label || ''

        const copyBtn = document.createElement('ui5-button')
        copyBtn.setAttribute('design', 'Transparent')
        copyBtn.setAttribute('icon', 'copy')
        copyBtn.addEventListener('click', () => navigator.clipboard.writeText(no).catch(() => {}))

        row.append(link, lbl, copyBtn)
        wrap.appendChild(row)
      })

      return wrap
    },

    'confirm-dialog'(panel) {
      const cfg  = panel.config || {}
      const wrap = _wrap(null, panel)

      const dialog = document.createElement('ui5-dialog')
      dialog.setAttribute('header-text', panel.title || 'Confirm layout change')

      const body = document.createElement('div')
      body.style.cssText = 'padding:1rem;font-size:0.875rem;'
      body.textContent = cfg.description || 'Apply this change to your workspace?'
      dialog.appendChild(body)

      const footer = document.createElement('div')
      footer.setAttribute('slot', 'footer')
      footer.style.cssText = 'display:flex;gap:0.5rem;padding:0.5rem;'

      const confirmBtn = document.createElement('ui5-button')
      confirmBtn.setAttribute('design', 'Emphasized')
      confirmBtn.textContent = 'Apply'
      confirmBtn.addEventListener('click', () => {
        if (cfg.onConfirm) cfg.onConfirm(cfg.newPanels)
        dialog.removeAttribute('open')
      })

      const cancelBtn = document.createElement('ui5-button')
      cancelBtn.textContent = 'Cancel'
      cancelBtn.addEventListener('click', () => dialog.removeAttribute('open'))

      footer.append(confirmBtn, cancelBtn)
      dialog.appendChild(footer)
      wrap.appendChild(dialog)
      requestAnimationFrame(() => dialog.setAttribute('open', ''))
      return wrap
    }
  }
}

// ── Private helpers ──────────────────────────────────────────────────────────

function _esc(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function _wrap(inner, panel) {
  const div = document.createElement('div')
  div.className = 'panel-wrapper'
  if (inner) div.appendChild(inner)
  return div
}

function _sectionTitle(text) {
  const h = document.createElement('div')
  h.className = 'panel-title'
  h.textContent = text || ''
  return h
}

function _fieldLabel(field) {
  const map = {
    customerName: 'Customer', status: 'Status', additionalServiceIds: 'Services',
    price: 'Price', currency: 'Currency', priceInWords: 'Price in Words',
    amsTicketNo: 'AMS Ticket', o2iTicketNo: 'O2I Ticket', cdmOwner: 'CDM Owner',
    priceCommunicatedDate: 'Price Communicated', approvalReceivedDate: 'Approval Received',
    customerClosureDate: 'Customer Closure', amsClosureDate: 'AMS Closure', modifiedAt: 'Last Updated'
  }
  return map[field] || field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
}

function _statusColor(status) {
  const map = {
    'Request received': '6', 'Price communicated': '5', 'Approval received': '8',
    'In delivery': '9', 'Customer closed': '3', 'AMS closed': '2',
    'O2I ticket opened': '1', 'Complete': '7'
  }
  return map[status] || '6'
}

async function _loadRecord(recordId) {
  try { return await ODataClient.get(`/ASRequest(${recordId})`) } catch { return null }
}

async function _loadRecords(cfg) {
  try {
    const params = { $top: cfg.limit || 50 }
    if (cfg.fields) params.$select = cfg.fields.join(',')
    const filters = []
    if (cfg.filters?.status)    filters.push(`status eq '${cfg.filters.status}'`)
    if (cfg.filters?.cdmOwner)  filters.push(`cdmOwner eq '${cfg.filters.cdmOwner}'`)
    if (cfg.filters?.status_ne) filters.push(`status ne '${cfg.filters.status_ne}'`)
    if (filters.length) params.$filter = filters.join(' and ')
    const res = await ODataClient.get(cfg.odata_path || '/ASRequest', params)
    return res?.value || []
  } catch { return [] }
}

function _buildRecordTable(r) {
  const table = document.createElement('table')
  table.style.cssText = 'border-collapse:collapse;width:100%;font-size:0.875rem;'
  ;[
    ['Customer', r.customerName], ['Status', r.status], ['Services', r.additionalServiceIds],
    ['Owner', r.cdmOwner], ['Price', r.price ? `${r.price} ${r.currency}` : null],
    ['AMS Ticket', r.amsTicketNo], ['O2I Ticket', r.o2iTicketNo]
  ].filter(([, v]) => v).forEach(([label, value]) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td style="padding:0.2rem 0.75rem 0.2rem 0;color:#89919a;">${label}</td>
                    <td style="padding:0.2rem 0;font-weight:500;">${_esc(String(value))}</td>`
    table.appendChild(tr)
  })
  return table
}

window.Renderer = Renderer
