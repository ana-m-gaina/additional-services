'use strict'

const cds    = require('@sap/cds')
const crypto = require('crypto')

// ── Status order ──────────────────────────────────────────────────────────────

const STATUS_ORDER = [
  'New',
  'PriceCommunicated',
  'Approved',
  'InDelivery',
  'Delivered',
  'Invoiced'
]

// Legacy status aliases (old app used different strings)
const STATUS_ALIAS = {
  'Request received':   'New',
  'Price communicated': 'PriceCommunicated',
  'Approval received':  'Approved',
  'In delivery':        'InDelivery',
  'Customer closed':    'Delivered',
  'AMS closed':         'Delivered',
  'O2I ticket opened':  'Invoiced',
  'Complete':           'Invoiced'
}

function normalizeStatus(s) {
  return STATUS_ALIAS[s] || s
}

// ── Number to words ────────────────────────────────────────────────────────────

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety']
const CURRENCY_WORDS = { EUR: 'euros', USD: 'dollars', GBP: 'pounds', JPY: 'yen' }

function intToWords(n) {
  if (n === 0) return 'zero'
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '')
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + intToWords(n % 100) : '')
  if (n < 1_000_000) return intToWords(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + intToWords(n % 1000) : '')
  return intToWords(Math.floor(n / 1_000_000)) + ' million' + (n % 1_000_000 ? ' ' + intToWords(n % 1_000_000) : '')
}

function priceToWords(price, currency) {
  if (price == null || isNaN(Number(price))) return ''
  const amount = Number(price)
  const whole  = Math.floor(amount)
  const cents  = Math.round((amount - whole) * 100)
  let words = intToWords(whole)
  if (cents > 0) words += ` and ${intToWords(cents)} cents`
  const unit = CURRENCY_WORDS[currency] || (currency ? currency.toLowerCase() : '')
  return unit ? `${words} ${unit}` : words
}

function addDays(dateStr, days) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// ── Reminder rules ────────────────────────────────────────────────────────────

const daysSince = (dateStr) => {
  if (!dateStr) return null
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

const REMINDER_RULES = [
  {
    check: r => r.status === 'PriceCommunicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 7 && daysSince(r.priceCommunicatedDate) < 14,
    text:  r => `Follow up with ${r.customerName} — price sent ${daysSince(r.priceCommunicatedDate)} days ago, no approval yet`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'PriceCommunicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 14 && daysSince(r.priceCommunicatedDate) < 85,
    text:  r => `URGENT: ${r.customerName} approval overdue. Consider re-sending or escalating.`,
    type:  'Error'
  },
  {
    check: r => r.status === 'PriceCommunicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 85,
    text:  r => `WARNING: Price validity expires in 5 days for ${r.customerName}. Act now.`,
    type:  'Error'
  },
  {
    check: r => r.status === 'Approved' && !r.checkSharePointUploaded
                && daysSince(r.approvalDate) >= 3,
    text:  r => `Upload pricing approval to SharePoint for ${r.customerName}`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'InDelivery' && !r.customerClosureDate
                && daysSince(r.approvalDate) >= 30,
    text:  r => `Check delivery status for ${r.customerName} — ticket open 30+ days`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'Delivered' && !r.checkAmsClosed
                && daysSince(r.customerClosureDate) >= 3,
    text:  r => `Close AMS for ${r.customerName} — customer confirmed ${daysSince(r.customerClosureDate)} days ago`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'Delivered' && !r.o2iTicketNo
                && daysSince(r.amsClosureDate) >= 3,
    text:  r => `Open O2I invoice ticket for ${r.customerName} — AMS closed ${daysSince(r.amsClosureDate)} days ago`,
    type:  'Warning'
  }
]

function evaluateReminders(records) {
  const active = []
  for (const record of records) {
    for (const rule of REMINDER_RULES) {
      if (rule.check(record)) {
        active.push({ text: rule.text(record), type: rule.type, recordId: record.ID, customerName: record.customerName })
      }
    }
  }
  return active
}

// ── Observability ─────────────────────────────────────────────────────────────

function logAI({ action, latencyMs, error }) {
  const entry = { ts: new Date().toISOString(), action, latencyMs: latencyMs ?? 0, ...(error ? { error: String(error) } : {}) }
  console.log('[AI]', JSON.stringify(entry))
}

function logTransition({ user, requestId, oldStatus, newStatus }) {
  console.log('[AUDIT]', JSON.stringify({ ts: new Date().toISOString(), user: user || 'unknown', requestId, oldStatus, newStatus }))
}

// ── JIRA template rendering ────────────────────────────────────────────────────

function renderTemplate(templateBody, record) {
  const fields = {
    customerName: record.customerName || '',
    customerAccountId: record.customerAccountId || '',
    serviceCode: record.serviceCode || record.additionalServiceIds || '',
    serviceType: record.serviceType || '',
    price: record.price != null ? String(record.price) : '',
    currency: record.currency || 'EUR',
    priceInWords: record.priceInWords || '',
    poNumber: record.poNumber || record.poNo || 'Not provided',
    approvalText: record.approvalText || '',
    approvalDate: record.approvalDate ? new Date(record.approvalDate).toISOString().slice(0, 10) : '',
    deliveryDate: record.deliveryDate ? new Date(record.deliveryDate).toISOString().slice(0, 10) : '',
    sap4MeTicketId: record.sap4MeTicketId || '',
    spcTicketId: record.spcTicketId || '',
    btpTicketId: record.btpTicketId || '',
    amsTicketId: record.amsTicketId || '',
    serviceNowTicketId: record.serviceNowTicketId || '',
    salesOrderNumber: record.salesOrderNumber || record.salesOrderNo || '',
    providerContractNumber: record.providerContractNumber || '',
    activityPerformed: record.activityPerformed || '',
    sid: record.sid || ''
  }
  return templateBody.replace(/\{\{(\w+)\}\}/g, (_, key) => fields[key] ?? `{{${key}}}`)
}

// ── Service ───────────────────────────────────────────────────────────────────

module.exports = class CDMService extends cds.ApplicationService {

  async init() {
    const {
      ASRequest, ActivityLog, RRTable, PricingTable, CardLayout,
      PersonaLayouts, ConversationTurns,
      ClientAgents, ContractSubagents, AutomationAgents, PendingActions,
      EmailTemplates, AdminConfigs, JiraTicketTemplates,
      StatusValues, ProcessTypes, Currencies
    } = this.entities

    // ── Admin guards on reference entities ────────────────────────────────────
    const adminOnly = (req) => {
      if (!req.user?.is('Admin')) return req.error(403, 'Only admins can modify reference data.')
    }
    for (const entity of [RRTable, PricingTable, EmailTemplates, AdminConfigs]) {
      this.before(['CREATE', 'UPDATE', 'DELETE'], entity, adminOnly)
    }

    // ── Value helps ────────────────────────────────────────────────────────────
    this.on('READ', StatusValues,  () => STATUS_ORDER.map(s => ({ code: s })))
    this.on('READ', ProcessTypes,  () => [{ code: 'Classic' }, { code: 'ATLAS' }])
    this.on('READ', Currencies,    () => ['EUR', 'USD', 'GBP', 'JPY'].map(c => ({ code: c })))

    // ── CDM scoping: CDMs only see their own requests ─────────────────────────
    this.before('READ', ASRequest, req => {
      if (!req.user?.is('Manager') && req.user?.id) {
        const cdmId = req.user.id
        req.query.where(`assignedCDM = '${cdmId}' or cdmOwner = '${cdmId}'`)
      }
    })

    // ── Before CREATE: defaults + computed fields ──────────────────────────────
    this.before('CREATE', ASRequest, req => {
      const d = req.data
      if (!d.status) d.status = 'New'
      if (!d.assignedCDM && req.user?.id) d.assignedCDM = req.user.id
      if (!d.cdmOwner && req.user?.id) d.cdmOwner = req.user.id
      if (d.price != null && d.currency) d.priceInWords = priceToWords(d.price, d.currency)
      if (d.priceCommunicatedDate && !d.priceValidUntil) {
        d.priceValidUntil = addDays(d.priceCommunicatedDate, 90)
      }
    })

    // ── After CREATE: seed activity log ───────────────────────────────────────
    this.after('CREATE', ASRequest, async (data, req) => {
      await INSERT.into(ActivityLog).entries({
        ID: crypto.randomUUID(),
        request_ID: data.ID,
        action: 'Request Created',
        newStatus: 'New',
        performedBy: req.user?.id || 'system',
        performedAt: new Date().toISOString()
      })
    })

    // ── Before UPDATE: refresh computed fields ─────────────────────────────────
    this.before('UPDATE', ASRequest, async req => {
      const d = req.data
      if (d.price != null || d.currency) {
        const existing = await SELECT.one.from(ASRequest, req.data.ID)
        const price    = d.price ?? existing?.price
        const currency = d.currency ?? existing?.currency
        if (price != null && currency) d.priceInWords = priceToWords(price, currency)
      }
      if (d.priceCommunicatedDate && !d.priceValidUntil) {
        d.priceValidUntil = addDays(d.priceCommunicatedDate, 90)
      }
    })

    // ── advanceStatus bound action ─────────────────────────────────────────────
    this.on('advanceStatus', ASRequest, async req => {
      const { newStatus, comment } = req.data
      const id = req.params[0]?.ID || req.params[0]
      const record = await SELECT.one.from(ASRequest, id)
      if (!record) return req.error(404, 'Request not found')

      const norm = normalizeStatus(newStatus)
      this._enforceStatusTransition(req, record, { status: norm })
      if (req.errors?.length) return

      const updates = { status: norm }
      if (norm === 'Approved')   updates.approvalDate  = new Date().toISOString()
      if (norm === 'Delivered')  updates.deliveryDate  = new Date().toISOString()
      if (norm === 'Invoiced')   updates.invoiceDate   = new Date().toISOString()

      await UPDATE(ASRequest, id).with(updates)
      await INSERT.into(ActivityLog).entries({
        ID: crypto.randomUUID(),
        request_ID: id,
        action: 'Status Advanced',
        description: comment || '',
        performedBy: req.user?.id || 'system',
        performedAt: new Date().toISOString(),
        oldStatus: record.status,
        newStatus: norm
      })
      logTransition({ user: req.user?.id, requestId: id, oldStatus: record.status, newStatus: norm })
      return SELECT.one.from(ASRequest, id)
    })

    // ── recordApproval bound action ────────────────────────────────────────────
    this.on('recordApproval', ASRequest, async req => {
      const { approvalText, poNumber } = req.data
      const id = req.params[0]?.ID || req.params[0]
      const record = await SELECT.one.from(ASRequest, id)
      if (!record) return req.error(404, 'Request not found')

      const norm = normalizeStatus(record.status)
      if (norm !== 'PriceCommunicated') {
        return req.error(400, `recordApproval requires status PriceCommunicated, got ${record.status}`)
      }

      await UPDATE(ASRequest, id).with({
        approvalText,
        poNumber: poNumber || null,
        poNo: poNumber || null,
        status: 'Approved',
        approvalDate: new Date().toISOString(),
        approvalReceivedDate: new Date().toISOString().slice(0, 10),
        checkApprovalReceived: true
      })
      await INSERT.into(ActivityLog).entries({
        ID: crypto.randomUUID(),
        request_ID: id,
        action: 'Approval Recorded',
        description: `PO: ${poNumber || 'none'}`,
        performedBy: req.user?.id || 'system',
        performedAt: new Date().toISOString(),
        oldStatus: record.status,
        newStatus: 'Approved'
      })
      return SELECT.one.from(ASRequest, id)
    })

    // ── generateJiraTicket bound action ────────────────────────────────────────
    this.on('generateJiraTicket', ASRequest, async req => {
      const id = req.params[0]?.ID || req.params[0]
      const record = await SELECT.one.from(ASRequest, id)
      if (!record) return req.error(404, 'Request not found')

      const norm = normalizeStatus(record.status)
      if (norm !== 'Delivered') {
        return req.error(400, `generateJiraTicket requires status Delivered, got ${record.status}`)
      }

      // Find template: match serviceType or fall back to 'default'
      const templates = await SELECT.from(JiraTicketTemplates).where({ active: true })
      let template = templates.find(t => t.serviceType === record.serviceType)
                   || templates.find(t => t.serviceType === 'default')
      if (!template) return req.error(500, 'No JIRA ticket template found')

      const body = renderTemplate(template.templateBody, record)
      await UPDATE(ASRequest, id).with({ jiraTicketBody: body, checkO2iCreated: false })
      await INSERT.into(ActivityLog).entries({
        ID: crypto.randomUUID(),
        request_ID: id,
        action: 'JIRA Ticket Generated',
        performedBy: req.user?.id || 'system',
        performedAt: new Date().toISOString()
      })
      return body
    })

    // ── saveCardLayout unbound action ──────────────────────────────────────────
    this.on('saveCardLayout', async req => {
      const { layouts } = req.data
      if (!layouts?.length) return false
      const userId = req.user?.id || 'anonymous'
      for (const item of layouts) {
        const existing = await SELECT.one.from(CardLayout)
          .where({ userEmail: userId, cardId: item.cardId })
        if (existing) {
          await UPDATE(CardLayout, existing.ID).with({ visible: item.visible, sortOrder: item.sortOrder })
        } else {
          await INSERT.into(CardLayout).entries({
            ID: crypto.randomUUID(),
            userEmail: userId,
            cardId: item.cardId,
            visible: item.visible ?? true,
            sortOrder: item.sortOrder ?? 0
          })
        }
      }
      return true
    })

    // ── savePersonaLayout unbound action ───────────────────────────────────────
    this.on('savePersonaLayout', async req => {
      const { layoutJson } = req.data
      const userId = req.user?.id || 'anonymous'
      const existing = await SELECT.one.from(PersonaLayouts).where({ userId })
      if (existing) {
        await UPDATE(PersonaLayouts, { userId }).with({ layoutJson, updatedAt: new Date().toISOString() })
      } else {
        await INSERT.into(PersonaLayouts).entries({ userId, layoutJson, updatedAt: new Date().toISOString() })
      }
      return true
    })

    // ── orchestrate — proxy to Python agent ────────────────────────────────────
    this.on('orchestrate', async req => {
      const { message, sessionId, mode, assistantName } = req.data
      if (!message?.trim()) return req.error(400, 'message is required')

      const agentUrl = process.env.AGENT_URL || 'http://localhost:8000'
      const userId   = req.user?.id || 'anonymous'
      const start    = Date.now()

      try {
        const res = await fetch(`${agentUrl}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message,
            session_id: sessionId || 'default',
            card_context: mode || null,
            cdm_email: userId,
            assistant_name: assistantName || null
          })
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`Agent responded ${res.status}: ${text}`)
        }
        const data = await res.json()
        logAI({ action: 'orchestrate', latencyMs: Date.now() - start })
        return typeof data === 'string' ? data : JSON.stringify(data)
      } catch (err) {
        logAI({ action: 'orchestrate', latencyMs: Date.now() - start, error: err.message })
        return req.error(500, `Agent call failed: ${err.message}`)
      }
    })

    // ── triggerMockEvent — demo substitute for SAP Event Mesh ─────────────────
    this.on('triggerMockEvent', async req => {
      const { eventType, payload: payloadStr } = req.data
      if (!eventType) return req.error(400, 'eventType required')

      let payload = {}
      try { payload = payloadStr ? JSON.parse(payloadStr) : {} } catch { /* ignore */ }

      const userId = req.user?.id || 'anonymous'

      if (eventType === 'customer.acceptance') {
        const { requestId, customerName } = payload
        if (!requestId) return req.error(400, 'payload.requestId required for customer.acceptance')

        const record = await SELECT.one.from(ASRequest, requestId)
        if (!record) return req.error(404, 'Request not found')

        let automation = await SELECT.one.from(AutomationAgents).where({ eventType: 'customer.acceptance' })
        if (!automation) {
          const autoId = crypto.randomUUID()
          await INSERT.into(AutomationAgents).entries({
            ID: autoId,
            eventType: 'customer.acceptance',
            displayName: 'Customer acceptance',
            enabled: true,
            createdBy: 'system',
            createdAt: new Date().toISOString()
          })
          automation = { ID: autoId }
        }

        const pendingId = crypto.randomUUID()
        await INSERT.into(PendingActions).entries({
          ID: pendingId,
          userId,
          automationId: automation.ID,
          sessionId: 'inbox',
          prompt: `Customer ${customerName || record.customerName} has accepted the price proposal for AS request [${record.additionalServiceIds || record.ID}]. Please create an SCW/SPC ticket and reply with the ticket ID so I can record it.`,
          status: 'pending',
          relatedRequestId: requestId,
          createdAt: new Date().toISOString()
        })

        return JSON.stringify({ triggered: true, eventType, pendingActionId: pendingId })
      }

      return JSON.stringify({ triggered: false, reason: `No handler for eventType: ${eventType}` })
    })

    // ── whoami — identity sourced from SAP Identity Services / XSUAA ──────────
    this.on('whoami', req => ({
      id:    req.user?.id    || 'anonymous',
      roles: req.user?.roles || [],
    }))

    return super.init()
  }

  // ── Status transition enforcement ─────────────────────────────────────────

  _enforceStatusTransition(req, existing, update) {
    if (req.user?.is('Admin')) return

    const oldStatus = normalizeStatus(existing.status)
    const newStatus = normalizeStatus(update.status)

    const oldIdx = STATUS_ORDER.indexOf(oldStatus)
    const newIdx = STATUS_ORDER.indexOf(newStatus)

    if (newIdx === -1) return req.error(400, `Unknown status: "${newStatus}"`)
    if (newIdx > oldIdx + 1) {
      return req.error(422, `Cannot skip from "${oldStatus}" to "${newStatus}". Advance one step at a time.`)
    }

    // Require Case no. or CSR no. before leaving New
    if (oldStatus === 'New' && newIdx > 0) {
      const caseNo = update.caseNo ?? existing.caseNo
      const csrNo  = update.csrNo  ?? existing.csrNo
      if (!caseNo && !csrNo) {
        return req.error(422, 'At least one of Case no. or CSR no. must be filled before advancing past New.')
      }
    }

    // Require AMS ticket + closed before Invoiced
    if (newStatus === 'Invoiced') {
      const amsNo     = update.amsTicketId ?? existing.amsTicketId
      const amsClosed = update.checkAmsClosed ?? existing.checkAmsClosed
      if (!amsNo || !amsClosed) {
        return req.error(422, 'AMS ticket must be filled and AMS closed checkbox ticked before Invoiced.')
      }
    }
  }
}
