'use strict'

const cds = require('@sap/cds')
const crypto = require('crypto')
const llm = require('./lib/llm')
const { JiraClient } = require('./lib/jira/JiraClient')
const { rrMatch, priceLookup } = require('./lib/subagents/rrPricingSubagent')

const STATUS_ORDER = [
  'Request received',
  'Price communicated',
  'Approval received',
  'In delivery',
  'Customer closed',
  'AMS closed',
  'O2I ticket opened',
  'Complete'
]

// ── Number to words (pure logic, no LLM) ────────────────────────────────────

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
  const whole = Math.floor(amount)
  const cents = Math.round((amount - whole) * 100)
  let words = intToWords(whole)
  if (cents > 0) words += ` and ${intToWords(cents)} cents`
  const unit = CURRENCY_WORDS[currency] || (currency ? currency.toLowerCase() : '')
  return unit ? `${words} ${unit}` : words
}

// ── Reminder rules (server-side — evaluated on every orchestrate call) ───────

const daysSince = (dateStr) => {
  if (!dateStr) return null
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
}

const REMINDER_RULES = [
  {
    check: r => r.status === 'Price communicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 7 && daysSince(r.priceCommunicatedDate) < 14,
    text:  r => `Follow up with ${r.customerName} — price sent ${daysSince(r.priceCommunicatedDate)} days ago, no approval yet`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'Price communicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 14 && daysSince(r.priceCommunicatedDate) < 85,
    text:  r => `URGENT: ${r.customerName} approval overdue. Consider re-sending or escalating.`,
    type:  'Error'
  },
  {
    check: r => r.status === 'Price communicated' && !r.approvalReceivedDate
                && daysSince(r.priceCommunicatedDate) >= 85,
    text:  r => `WARNING: Price validity expires in 5 days for ${r.customerName}. Act now.`,
    type:  'Error'
  },
  {
    check: r => r.status === 'Approval received' && !r.checkSharePointUploaded
                && daysSince(r.approvalReceivedDate) >= 3,
    text:  r => `Upload pricing approval to SharePoint for ${r.customerName}`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'In delivery' && !r.customerClosureDate
                && daysSince(r.approvalReceivedDate) >= 30,
    text:  r => `Check delivery status for ${r.customerName} — ticket open 30+ days`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'Customer closed' && !r.checkAmsClosed
                && daysSince(r.customerClosureDate) >= 3,
    text:  r => `Close AMS for ${r.customerName} — customer confirmed ${daysSince(r.customerClosureDate)} days ago`,
    type:  'Warning'
  },
  {
    check: r => r.status === 'AMS closed' && !r.o2iTicketNo
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

// ── Orchestrator tool definitions ────────────────────────────────────────────

const ORCHESTRATOR_TOOLS = [
  {
    name: 'rename_assistant',
    description: 'Rename the assistant to a new name chosen by the CDM. Call this when the user says "call yourself X", "rename to X", or similar.',
    input_schema: {
      type: 'object',
      required: ['newName'],
      properties: {
        newName: { type: 'string', description: 'The new assistant name the CDM wants to use' }
      }
    }
  },
  {
    name: 'fetch_records',
    description: 'Query AS requests from the database. Returns matching records.',
    input_schema: {
      type: 'object',
      properties: {
        filters: { type: 'object', description: 'OData-style filters: status, cdmOwner, customerName, dateRange' },
        limit:   { type: 'integer', description: 'Max records to return (default 10)' },
        fields:  { type: 'array', items: { type: 'string' }, description: 'Which fields to return' }
      }
    }
  },
  {
    name: 'render_panel',
    description: 'Add a UI panel to the current workspace. Rendered immediately in the shell.',
    input_schema: {
      type: 'object',
      required: ['type', 'title'],
      properties: {
        type:   { type: 'string', enum: ['record-card','record-table','field-form','status-timeline','checklist','email-draft','kpi-strip','reminder-banner','ticket-ref','confirm-dialog'] },
        title:  { type: 'string' },
        config: { type: 'object', description: 'Panel-specific config: recordId, filters, fields, editable, odata_path' },
        pinned: { type: 'boolean', description: 'Whether to pin to dashboard layout' }
      }
    }
  },
  {
    name: 'invoke_subagent',
    description: 'Call a specialised subagent for a specific task.',
    input_schema: {
      type: 'object',
      required: ['name'],
      properties: {
        name:   { type: 'string', enum: ['email_parse','rr_match','price_lookup','draft_price_email','generate_o2i','create_o2i_ticket'] },
        params: { type: 'object', description: 'Subagent-specific inputs (emailText, description, requestId, etc.)' }
      }
    }
  },
  {
    name: 'update_record',
    description: 'Update fields on an AS request. Always show the CDM what will change before calling this.',
    input_schema: {
      type: 'object',
      required: ['recordId', 'fields'],
      properties: {
        recordId: { type: 'string', description: 'UUID of the AS request' },
        fields:   { type: 'object', description: 'Field names and new values to update' }
      }
    }
  },
  {
    name: 'propose_layout_change',
    description: 'Suggest a change to the CDM saved workspace layout. Renders a confirm-dialog; only saves if CDM approves.',
    input_schema: {
      type: 'object',
      required: ['description', 'newPanels'],
      properties: {
        description: { type: 'string', description: 'Human-readable explanation of what will change' },
        newPanels:   { type: 'array', description: 'The proposed panel configuration array' }
      }
    }
  },
  {
    name: 'get_reminder_status',
    description: 'Check which reminder rules are currently firing for a CDM open requests.',
    input_schema: {
      type: 'object',
      properties: {
        cdmOwner: { type: 'string', description: 'CDM user ID / email' }
      }
    }
  },
  {
    name: 'route_to_agent',
    description: 'Delegate to a Client Orchestrator or Contract Subagent. Response comes back in same thread — CDM never sees the routing.',
    input_schema: {
      type: 'object',
      required: ['agentType', 'clientId', 'handoffSummary', 'message'],
      properties: {
        agentType:      { type: 'string', enum: ['client_orchestrator', 'contract_subagent'] },
        clientId:       { type: 'string', description: 'UUID of the ClientAgent' },
        contractId:     { type: 'string', description: 'UUID of the ContractSubagent (omit for client-level routing)' },
        handoffSummary: { type: 'string', description: 'Orchestrator-authored context string describing current task' },
        message:        { type: 'string', description: "The user's current message" }
      }
    }
  },
  {
    name: 'surface_pending_action',
    description: 'Create a PendingAction and push a card to the CDM Inbox.',
    input_schema: {
      type: 'object',
      required: ['userId', 'automationId', 'prompt'],
      properties: {
        userId:           { type: 'string' },
        automationId:     { type: 'string', description: 'UUID of the AutomationAgent' },
        prompt:           { type: 'string', description: 'What the CDM needs to do or decide' },
        relatedRequestId: { type: 'string', description: 'UUID of related AS request (optional)' }
      }
    }
  },
  {
    name: 'resolve_pending_action',
    description: 'Mark a PendingAction as responded or dismissed.',
    input_schema: {
      type: 'object',
      required: ['pendingActionId', 'status'],
      properties: {
        pendingActionId: { type: 'string' },
        status:          { type: 'string', enum: ['responded', 'dismissed'] },
        recordedData:    { type: 'object', description: 'Field values captured from CDM response, e.g. { spcTicketId }' }
      }
    }
  },
  {
    name: 'register_client',
    description: 'Create a new ClientAgent entry and add it to the nav.',
    input_schema: {
      type: 'object',
      required: ['customerId', 'displayName'],
      properties: {
        customerId:  { type: 'string', description: 'Customer name or ID' },
        displayName: { type: 'string', description: 'Label shown in nav' }
      }
    }
  },
  {
    name: 'register_contract',
    description: 'Create a new ContractSubagent under an existing ClientAgent.',
    input_schema: {
      type: 'object',
      required: ['clientId', 'sid', 'displayName', 'contractType'],
      properties: {
        clientId:     { type: 'string', description: 'UUID of parent ClientAgent' },
        sid:          { type: 'string', description: 'Contract SID' },
        displayName:  { type: 'string', description: 'Label for nav' },
        contractType: { type: 'string', enum: ['Classic', 'ATLAS'] }
      }
    }
  }
]

// ── Build a tight context block from DB records for the chat system prompt ──

function buildContextBlock(relevant, recentOpen, rrData, pricingData) {
  const lines = []

  if (relevant.length) {
    lines.push('MATCHING RECORDS (from database):')
    for (const r of relevant) {
      lines.push(`- [${r.ID}] ${r.customerName} | ${r.status} | Services: ${r.additionalServiceIds || '—'} | Owner: ${r.cdmOwner}`)
      if (r.price)                  lines.push(`  Price: ${r.price} ${r.currency} (${r.priceInWords})`)
      if (r.priceCommunicatedDate)  lines.push(`  Price communicated: ${r.priceCommunicatedDate}`)
      if (r.approvalReceivedDate)   lines.push(`  Approval received: ${r.approvalReceivedDate}`)
      if (r.amsTicketNo)            lines.push(`  AMS: ${r.amsTicketNo} | Closed: ${r.checkAmsClosed ? 'yes' : 'no'}`)
      if (r.o2iTicketNo)            lines.push(`  O2I ticket: ${r.o2iTicketNo}`)
      if (r.activityLog)            lines.push(`  Activity log: ${r.activityLog.slice(0, 200)}`)
    }
  }

  const openNotInRelevant = recentOpen.filter(r => !relevant.find(x => x.ID === r.ID))
  if (openNotInRelevant.length) {
    lines.push('\nRECENTLY ACTIVE OPEN REQUESTS:')
    for (const r of openNotInRelevant) {
      lines.push(`- [${r.ID}] ${r.customerName} | ${r.status} | Services: ${r.additionalServiceIds || '—'} | Last updated: ${r.modifiedAt?.slice(0, 10)}`)
    }
  }

  if (rrData?.length) {
    lines.push('\nAVAILABLE ADDITIONAL SERVICES (R&R reference):')
    for (const r of rrData) {
      const pricing = pricingData?.find(p => p.rrId === r.rrId)
      const priceStr = pricing ? ` | Price: ${pricing.price} ${pricing.currency} (last updated ${pricing.lastUpdated})` : ''
      lines.push(`- ${r.rrId}: ${r.description}${r.category ? ` [${r.category}]` : ''}${priceStr}`)
    }
  }

  return lines.length ? lines.join('\n') : 'No data found in the database.'
}

// ── Add 90 days to a date string (ISO) ──────────────────────────────────────

function addDays(dateStr, days) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// ── Observability helper ─────────────────────────────────────────────────────

function logAI({ action, promptHash, responseLength, latencyMs, error }) {
  const entry = {
    ts: new Date().toISOString(),
    action,
    promptHash,
    responseLength: responseLength ?? 0,
    latencyMs: latencyMs ?? 0,
    ...(error ? { error: String(error) } : {})
  }
  console.log('[AI]', JSON.stringify(entry))
}

// ── Audit log helper ─────────────────────────────────────────────────────────

function logTransition({ user, requestId, oldStatus, newStatus }) {
  console.log('[AUDIT]', JSON.stringify({
    ts: new Date().toISOString(),
    user: user || 'unknown',
    requestId,
    oldStatus,
    newStatus
  }))
}

// ── Service handler ──────────────────────────────────────────────────────────

module.exports = class AdditionalServicesService extends cds.ApplicationService {

  async init() {
    const {
      Requests, Pricing, RRReferences, Templates, Config,
      PersonaLayouts, ConversationTurns,
      ClientAgents, ContractSubagents, AutomationAgents, PendingActions
    } = this.entities

    // ── ADMIN ROLE GUARDS ─────────────────────────────────────────────────
    const adminOnly = (req) => {
      if (!req.user?.is('admin')) return req.error(403, 'Only admins can modify reference data.')
    }
    for (const entity of [RRReferences, Pricing, Templates, Config]) {
      this.before(['CREATE', 'UPDATE', 'DELETE'], entity, adminOnly)
    }

    // ── VALUE HELP ENTITY READS ────────────────────────────────────────────

    this.on('READ', 'StatusValues', () => STATUS_ORDER.map(s => ({ code: s })))

    this.on('READ', 'ProcessTypes', () => [
      { code: 'Classic' },
      { code: 'ATLAS' }
    ])

    this.on('READ', 'Currencies', () => [
      { code: 'EUR' },
      { code: 'USD' },
      { code: 'GBP' },
      { code: 'JPY' }
    ])

    // ── BEFORE CREATE ──────────────────────────────────────────────────────

    this.before('CREATE', Requests, req => {
      const d = req.data
      if (!d.status) d.status = 'Request received'

      // Auto-generate price in words
      if (d.price != null && d.currency) {
        d.priceInWords = priceToWords(d.price, d.currency)
      }

      // priceValidUntil = priceCommunicatedDate + 90 days
      if (d.priceCommunicatedDate && !d.priceValidUntil) {
        d.priceValidUntil = addDays(d.priceCommunicatedDate, 90)
      }
    })

    // ── BEFORE UPDATE ──────────────────────────────────────────────────────

    this.before('UPDATE', Requests, async req => {
      const d = req.data

      // Refresh price in words whenever price or currency changes
      if (d.price != null || d.currency) {
        const existing = await SELECT.one.from(Requests, req.data.ID)
        const price = d.price ?? existing?.price
        const currency = d.currency ?? existing?.currency
        if (price != null && currency) {
          d.priceInWords = priceToWords(price, currency)
        }
      }

      // Auto-update priceValidUntil when priceCommunicatedDate changes
      if (d.priceCommunicatedDate) {
        // Only auto-calc if not explicitly provided in this update
        if (!d.priceValidUntil) {
          d.priceValidUntil = addDays(d.priceCommunicatedDate, 90)
        }
      }

      // Auto-advance status when O2I ticket number is entered
      if (d.o2iTicketNo && d.o2iTicketNo.trim()) {
        const current = await SELECT.one.from(Requests, req.data.ID)
        if (current) {
          if (current.status === 'AMS closed') d.status = 'O2I ticket opened'
          else if (current.status === 'O2I ticket opened') d.status = 'Complete'
        }
      }

      // Status transition enforcement
      if (d.status !== undefined) {
        const existing = await SELECT.one.from(Requests, req.data.ID)
        if (!existing) return

        const oldStatus = existing.status
        const newStatus = d.status

        if (oldStatus !== newStatus) {
          this._enforceStatusTransition(req, existing, d)
          logTransition({
            user: req.user?.id,
            requestId: req.data.ID,
            oldStatus,
            newStatus
          })
        }
      }
    })

    // ── AI ACTIONS ─────────────────────────────────────────────────────────

    this.on('extractFromEmail', async req => {
      const { emailText } = req.data
      if (!emailText?.trim()) return req.error(400, 'emailText is required')

      const systemPrompt = `You are an assistant helping a SAP Customer Delivery Manager process an Additional Services request. Extract the following fields from the email text provided. Return ONLY a JSON object with these keys: customer_name, service_identifiers (array), ticket_numbers (array), po_number, urgency_notes. If a field is not found, return null for that field. Do not invent data. Only extract what is explicitly present.`
      const promptHash = crypto.createHash('sha256').update(systemPrompt + emailText).digest('hex').slice(0, 16)

      const start = Date.now()
      try {
        const result = await llm.chat(systemPrompt, emailText)
        const latencyMs = Date.now() - start
        const parsed = typeof result === 'string' ? (() => { try { return JSON.parse(result) } catch { return null } })() : result
        const responseLength = JSON.stringify(result).length

        logAI({ action: 'extractFromEmail', promptHash, responseLength, latencyMs })

        const requiredKeys = ['customer_name', 'service_identifiers', 'ticket_numbers', 'po_number', 'urgency_notes']
        if (!parsed || !requiredKeys.every(k => k in parsed)) {
          return JSON.stringify({ warning: 'AI could not extract all fields — please fill manually.', partial: parsed })
        }

        return JSON.stringify(parsed)
      } catch (err) {
        logAI({ action: 'extractFromEmail', promptHash, responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return JSON.stringify({ warning: 'AI extraction failed — please fill manually.', error: err.message })
      }
    })

    this.on('matchRR', async req => {
      const { description } = req.data
      if (!description?.trim()) return req.error(400, 'description is required')

      const rrData = await SELECT.from(RRReferences).where({ isActive: true })
      const promptHash = crypto.createHash('sha256').update(description + JSON.stringify(rrData)).digest('hex').slice(0, 16)

      const start = Date.now()
      try {
        const result = await rrMatch({ description, rrData, llm })
        const latencyMs = Date.now() - start
        logAI({ action: 'matchRR', promptHash, responseLength: JSON.stringify(result).length, latencyMs })
        return JSON.stringify(result)
      } catch (err) {
        logAI({ action: 'matchRR', promptHash, responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return JSON.stringify({ warning: 'AI unavailable.', fallback: rrData.map(r => ({ id: r.rrId, description: r.description })) })
      }
    })

    this.on('draftPriceEmail', async req => {
      const { requestId } = req.data
      if (!requestId) return req.error(400, 'requestId is required')

      const record = await SELECT.one.from(Requests, requestId)
      if (!record) return req.error(404, 'Request not found')

      const { Templates } = this.entities
      const template = await SELECT.one.from(Templates).where({ templateKey: 'standard_price_communication' })
      if (!template) return req.error(500, 'Email template not found')

      // Strip PII for logging — only use record ID
      const safeRecord = JSON.stringify({ id: record.ID, rrIds: record.additionalServiceIds, price: record.price, currency: record.currency, priceInWords: record.priceInWords, rrDescription: record.rrDescription })
      const systemPrompt = `You are helping a SAP CDM draft a price communication email. Fill in the template below using the provided data. Do not change the structure, legal notes, or tone of the template. Only replace the placeholder values. Return only the completed email text, no preamble.`
      const userMessage = `DATA: ${safeRecord}\nTEMPLATE: ${template.body}`
      const promptHash = crypto.createHash('sha256').update(systemPrompt + userMessage).digest('hex').slice(0, 16)

      const start = Date.now()
      try {
        const result = await llm.chat(systemPrompt, userMessage)
        const latencyMs = Date.now() - start
        const text = typeof result === 'string' ? result : JSON.stringify(result)
        logAI({ action: 'draftPriceEmail', promptHash, responseLength: text.length, latencyMs })
        return text
      } catch (err) {
        logAI({ action: 'draftPriceEmail', promptHash, responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return req.error(500, `AI draft failed: ${err.message}`)
      }
    })

    this.on('generateO2ITicket', async req => {
      const { requestId } = req.data
      if (!requestId) return req.error(400, 'requestId is required')

      const record = await SELECT.one.from(Requests, requestId)
      if (!record) return req.error(404, 'Request not found')

      if (!record.amsTicketNo) return req.error(422, 'AMS ticket number must be filled before generating O2I ticket')
      if (!record.checkAmsClosed) return req.error(422, 'AMS ticket must be closed (checkbox) before generating O2I ticket')

      // Safe record for AI — omit customer name, log ID only
      const safeRecord = JSON.stringify({
        rrIds: record.additionalServiceIds,
        rrDescription: record.rrDescription,
        price: record.price,
        currency: record.currency,
        priceInWords: record.priceInWords,
        salesOrderNo: record.salesOrderNo,
        bcpTicketNo: record.bcpTicketNo,
        poNo: record.poNo || 'Not provided',
        activityPerformed: record.activityPerformed,
        sid: record.sid
      })

      const systemPrompt = `You are helping a SAP CDM generate a JIRA invoice ticket for the ECS Global Engagement Support (ECS GES) team. The JIRA queue is ECSBO. Using the record data below, generate: 1. The ticket title (format: Additional Services: [ID1] & [ID2] [Activity] [System] — use " & " as separator between multiple service IDs) 2. The full ticket body text following this structure:\nHello ECS Global Engagement Support (ECS GES),\nPlease initiate the invoicing process at O2I Teams as per details below.\n- Total amount with currency: [amount numeric] [currency]\n  ([amount in words])\n- Sales order no. / Provider contract no.: [value]\n- BCP ticket no.: [value]\n- PO no. (if provided): [value or 'Not provided']\n- Activity performed: [value]\nJIRA queue: ECSBO\nReturn as JSON: {ticket_title, ticket_body}`
      const promptHash = crypto.createHash('sha256').update(systemPrompt + safeRecord).digest('hex').slice(0, 16)

      const start = Date.now()
      try {
        const result = await llm.chat(systemPrompt, `DATA: ${safeRecord}`)
        const latencyMs = Date.now() - start
        const parsed = typeof result === 'string' ? (() => { try { return JSON.parse(result) } catch { return { ticket_title: '', ticket_body: result } } })() : result
        logAI({ action: 'generateO2ITicket', promptHash, responseLength: JSON.stringify(parsed).length, latencyMs })
        return JSON.stringify(parsed)
      } catch (err) {
        logAI({ action: 'generateO2ITicket', promptHash, responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return req.error(500, `AI generation failed: ${err.message}`)
      }
    })

    // ── JIRA — create O2I ticket from pre-generated title + body ──────────

    this.on('createO2ITicket', async req => {
      const { requestId, ticketTitle, ticketBody } = req.data
      if (!requestId || !ticketTitle || !ticketBody) {
        return req.error(400, 'requestId, ticketTitle, and ticketBody are required')
      }

      const record = await SELECT.one.from(Requests, requestId)
      if (!record) return req.error(404, 'Request not found')
      if (!record.amsTicketNo || !record.checkAmsClosed) {
        return req.error(422, 'AMS ticket must be filled and closed before creating O2I ticket')
      }

      let jira
      try {
        jira = new JiraClient()
      } catch (e) {
        return req.error(500, `JIRA not configured: ${e.message}`)
      }

      try {
        const issue = await jira.createIssue({
          summary:     ticketTitle,
          description: ticketBody
        })

        // Write ticket number back to record and advance status
        await UPDATE(Requests, requestId).with({
          o2iTicketNo:        issue.key,
          o2iTicketCreatedDate: new Date().toISOString().slice(0, 10),
          checkO2iCreated:    true,
          status:             'O2I ticket opened'
        })

        return JSON.stringify({ key: issue.key, url: issue.url })
      } catch (err) {
        return req.error(500, `JIRA create failed: ${err.message}`)
      }
    })

    // ── Conversational chat action ─────────────────────────────────────────

    this.on('chat', async req => {
      const { message } = req.data
      if (!message?.trim()) return req.error(400, 'message is required')

      // Pull records relevant to this message — search by customer name or
      // ticket number fragments mentioned in the message. Cap at 5 records
      // to keep context tight. Only surface fields the agent needs.
      const words = message.match(/\b[A-Z0-9][\w\-\/]{2,}\b/g) || []
      let relevantRecords = []

      if (words.length) {
        const searchTerm = `%${words[0]}%`
        relevantRecords = await SELECT.from(Requests)
          .columns('ID', 'customerName', 'status', 'additionalServiceIds', 'rrDescription',
                   'price', 'currency', 'priceInWords', 'cdmOwner',
                   'priceCommunicatedDate', 'approvalReceivedDate', 'customerClosureDate',
                   'amsTicketNo', 'checkAmsClosed', 'o2iTicketNo',
                   'caseNo', 'csrNo', 'bcpTicketNo', 'spcTicketMain', 'activityLog',
                   'createdAt', 'modifiedAt')
          .where(`customerName like '${searchTerm}' or additionalServiceIds like '${searchTerm}' or caseNo like '${searchTerm}' or csrNo like '${searchTerm}' or amsTicketNo like '${searchTerm}'`)
          .limit(5)
      }

      // Also grab the 3 most recently modified open records as ambient context
      const recentOpen = await SELECT.from(Requests)
        .columns('ID', 'customerName', 'status', 'additionalServiceIds', 'cdmOwner', 'modifiedAt')
        .where(`status != 'Complete'`)
        .orderBy('modifiedAt desc')
        .limit(3)

      // Always load full R&R and pricing reference data so agent can answer lookups
      const [rrData, pricingData] = await Promise.all([
        SELECT.from(RRReferences).where({ isActive: true }).orderBy('rrId'),
        SELECT.from(Pricing).orderBy('rrId')
      ])

      const contextBlock = buildContextBlock(relevantRecords, recentOpen, rrData, pricingData)

      const systemPrompt = `You are an AI assistant helping a SAP Customer Delivery Manager (CDM) manage Additional Services (AS) requests.

PROCESS (10 steps):
1. AS request received via email
2. Identify service type from R&R reference
3. Look up price from pricing data
4. Communicate price to customer (draft email, CDM sends manually)
5. Receive written approval + PO number
6. Upload approval to SharePoint
7. Service delivery begins — track ticket IDs
8. Customer closes ticket and confirms
9. CDM closes AMS ticket
10. CDM opens O2I invoice ticket in JIRA ECSBO

STATUS FLOW: Request received → Price communicated → Approval received → In delivery → Customer closed → AMS closed → O2I ticket opened → Complete

KEY RULES:
- At least one of Case no. or CSR no. required before advancing past "Request received"
- AMS ticket number + AMS closed checkbox required before O2I ticket can be created
- Price valid for 90 days from price communicated date
- All AI outputs are suggestions — CDM reviews before saving or sending

${contextBlock}

Be concise. CDMs are busy. Never introduce yourself or greet the user — go straight to the answer. When a CDM pastes an email, extract: customer name, service identifiers, ticket numbers, PO number, urgency notes — and list them clearly so the CDM can confirm before anything is saved. If you reference a specific record, include its ID so it can be linked.`

      const promptHash = crypto.createHash('sha256').update(systemPrompt + message).digest('hex').slice(0, 16)
      const start = Date.now()

      try {
        const reply = await llm.chatWithHistory(systemPrompt, [{ role: 'user', content: message }])
        const latencyMs = Date.now() - start
        const replyText = typeof reply === 'string' ? reply : JSON.stringify(reply)
        logAI({ action: 'chat', promptHash, responseLength: replyText.length, latencyMs })
        return JSON.stringify({ reply: replyText })
      } catch (err) {
        logAI({ action: 'chat', promptHash, responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return req.error(500, `Chat failed: ${err.message}`)
      }
    })

    // ── Orchestrator — tool-use agent loop ────────────────────────────────

    this.on('orchestrate', async req => {
      const { message, sessionId, mode, assistantName } = req.data
      if (!message?.trim()) return req.error(400, 'message is required')

      const userId = req.user?.id || 'anonymous'
      const start = Date.now()
      const panels = []
      let proposedLayout = null
      let renamedTo = null

      // 1. Load conversation history for this session (last 20 turns)
      const history = await SELECT.from(ConversationTurns)
        .where({ userId, sessionId })
        .orderBy('createdAt asc')
        .limit(20)

      const conversationMessages = history.map(t => ({ role: t.role, content: t.content }))
      conversationMessages.push({ role: 'user', content: message })

      // 2. Load CDM's open requests as ambient context
      const openRequests = await SELECT.from(Requests)
        .columns('ID', 'customerName', 'status', 'additionalServiceIds', 'cdmOwner',
                 'price', 'currency', 'priceCommunicatedDate', 'approvalReceivedDate',
                 'customerClosureDate', 'amsClosureDate', 'amsTicketNo', 'checkAmsClosed',
                 'o2iTicketNo', 'checkSharePointUploaded', 'modifiedAt')
        .where(`status != 'Complete'`)
        .orderBy('modifiedAt desc')
        .limit(20)

      // 3. Load persona layout
      const personaRow = await SELECT.one.from(PersonaLayouts).where({ userId })
      const savedLayout = personaRow?.layoutJson ? JSON.parse(personaRow.layoutJson) : null

      // 4. Load active pending actions for this user
      const activePendingActions = await SELECT.from(PendingActions)
        .where({ userId, status: 'pending' })
        .orderBy('createdAt desc')

      // 5. Evaluate reminder rules
      const activeReminders = evaluateReminders(openRequests)

      const [rrData, pricingData, configRows] = await Promise.all([
        SELECT.from(RRReferences).where({ isActive: true }).orderBy('rrId'),
        SELECT.from(Pricing).orderBy('rrId'),
        SELECT.from(Config)
      ])

      // Build config map for easy lookup
      const cfg = Object.fromEntries(configRows.map(r => [r.configKey, r.configValue]))

      // Resolve assistant name: per-request override → AdminConfig → env → default
      const name = (assistantName?.trim())
        || cfg.assistant_name
        || 'Beacon'

      // Resolve active model for display in greeting
      const activeModel = cfg.llm_model
        || process.env.ANTHROPIC_DEFAULT_OPUS_MODEL
        || 'claude-opus-4-7'

      const isFirstTurn = history.length === 0

      const contextBlock = buildContextBlock([], openRequests, rrData, pricingData)

      const reminderLines = activeReminders.length
        ? 'ACTIVE REMINDERS:\n' + activeReminders.map(r => `[${r.type}] ${r.text}`).join('\n')
        : 'No active reminders.'

      const firstTurnNote = isFirstTurn
        ? `\n\nFIRST SESSION NOTE: Start with a single short greeting line that tells the CDM: (1) your name, (2) the active model (${activeModel}), (3) that any setting can be changed conversationally — name, model, and future preferences. Example: "Hi, I'm ${name}, running on ${activeModel}. You can change my name or switch models at any time just by telling me."`
        : ''

      const systemPrompt = `You are ${name} — a CDM Personal Virtual Assistant and AI co-worker for SAP Customer Delivery Managers. Your name is ${name}. You understand the full 10-step Additional Services (AS) process and can take actions on the CDM's behalf using the tools available. If the CDM asks you to change your name, use the rename_assistant tool with the new name.${firstTurnNote}

CDM USER: ${userId}
MODE: ${mode || 'chat'}
ACTIVE MODEL: ${activeModel}

THE 10-STEP AS PROCESS:
1. Customer emails about potential AS → extract fields via email_parse
2. Look up R&R spec for matching service → rr_match suggests top 3 with confidence
3. Look up pricing → price_lookup (pure JSON, no LLM)
4. Check client contract + ATLAS (CDM verifies in ATLAS externally — no API yet)
5. Communicate price to customer → draft_price_email fills template 8.1
6. Customer accepts → CDM creates SCW/SPC ticket, records ticket ID here
7. Create JIRA O2I invoice ticket → generate_o2i builds it, create_o2i_ticket posts it
8. Delivery tracked via AMS/BCP/ITSM — track ticket IDs, show elapsed time
9. Customer closes SCW ticket → CDM marks customerClosureDate → AMS-close reminder fires
10. CDM closes JIRA O2I ticket → confirm all 6 checklist items before marking Complete

STATUS FLOW: Request received → Price communicated → Approval received → In delivery → Customer closed → AMS closed → O2I ticket opened → Complete

TOOLS AVAILABLE:
- fetch_records: query the database for AS requests
- render_panel: add a UI panel (record-card, record-table, field-form, checklist, email-draft, kpi-strip, reminder-banner, ticket-ref, confirm-dialog, status-timeline, pending-action-card)
- invoke_subagent: call email_parse, rr_match, price_lookup, draft_price_email, generate_o2i, create_o2i_ticket
- update_record: update fields on a request (always show what will change first)
- propose_layout_change: suggest workspace layout changes (CDM must confirm)
- get_reminder_status: check which reminder rules are firing
- route_to_agent: delegate to a Client Orchestrator or Contract Subagent (invisible to CDM)
- surface_pending_action: push a card to CDM Inbox for actions requiring human input
- resolve_pending_action: mark a pending action as responded or dismissed
- register_client: add a new client to the nav
- register_contract: add a new contract under a client

CURRENT WORKSPACE STATE:
${contextBlock}

${reminderLines}
${activePendingActions.length ? '\nPENDING ACTIONS IN INBOX:\n' + activePendingActions.map(a => `- [${a.ID}] ${a.prompt}`).join('\n') : ''}

ROUTING PRIORITY:
1. If CDM is replying to a pending action → resolve it via resolve_pending_action
2. If message mentions a customer name → route_to_agent (client_orchestrator)
3. If message is a clear task (email, price, O2I) → invoke_subagent
4. Otherwise handle directly

RULES:
- Be concise — CDMs are busy
- Never introduce yourself or greet on non-first turns
- Always show the CDM what will change before calling update_record
- Use render_panel to surface data visually; don't just list it in text
- Proactively surface active reminders via reminder-banner panels
- API key never goes to the browser — all AI calls stay server-side`

      // 5. Run the tool-use agent loop
      const toolDispatcher = async (toolName, toolInput) => {
        switch (toolName) {

          case 'rename_assistant': {
            const { newName } = toolInput
            if (!newName?.trim()) return { error: 'newName required' }
            renamedTo = newName.trim()
            return { renamed: true, newName: renamedTo }
          }

          case 'fetch_records': {
            const { filters = {}, limit = 10, fields } = toolInput
            let query = SELECT.from(Requests).limit(limit)
            if (fields?.length) query = query.columns(...fields)
            if (filters.status)       query = query.where({ status: filters.status })
            if (filters.cdmOwner)     query = query.where({ cdmOwner: filters.cdmOwner })
            if (filters.customerName) query = query.where(`customerName like '%${filters.customerName}%'`)
            const records = await query
            return { records, count: records.length }
          }

          case 'render_panel': {
            const panel = {
              id: `panel-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
              type: toolInput.type,
              title: toolInput.title,
              pinned: toolInput.pinned ?? false,
              position: panels.length,
              config: toolInput.config ?? {}
            }
            panels.push(panel)
            return { rendered: true, panelId: panel.id }
          }

          case 'invoke_subagent': {
            const { name, params = {} } = toolInput
            switch (name) {
              case 'email_parse': {
                if (!params.emailText) return { error: 'emailText required for email_parse' }
                const sys = `Extract from email: customer_name, service_identifiers (array), ticket_numbers (array), po_number, urgency_notes. Return JSON only.`
                const result = await llm.chat(sys, params.emailText)
                return typeof result === 'string' ? (() => { try { return JSON.parse(result) } catch { return { raw: result } } })() : result
              }
              case 'rr_match': {
                if (!params.description) return { error: 'description required for rr_match' }
                const rrData = await SELECT.from(RRReferences).where({ isActive: true })
                return rrMatch({ description: params.description, rrData, llm })
              }
              case 'price_lookup': {
                if (!params.rrId) return { error: 'rrId required for price_lookup' }
                const rrData = await SELECT.from(RRReferences).where({ isActive: true })
                const pricingData = await SELECT.from(Pricing)
                return priceLookup({ rrId: params.rrId, rrData, pricingData })
              }
              case 'draft_price_email': {
                const { requestId } = params
                if (!requestId) return { error: 'requestId required for draft_price_email' }
                const record = await SELECT.one.from(Requests, requestId)
                if (!record) return { error: 'Request not found' }
                const template = await SELECT.one.from(Templates).where({ templateKey: 'standard_price_communication' })
                if (!template) return { error: 'Email template not found' }
                const safeRecord = JSON.stringify({ id: record.ID, rrIds: record.additionalServiceIds, price: record.price, currency: record.currency, priceInWords: record.priceInWords, rrDescription: record.rrDescription })
                const sys = `Fill in the template using the data. Do not change structure, legal notes, or tone. Return only the completed email text.`
                const result = await llm.chat(sys, `DATA: ${safeRecord}\nTEMPLATE: ${template.body}`)
                return { draft: typeof result === 'string' ? result : JSON.stringify(result) }
              }
              case 'generate_o2i': {
                const { requestId } = params
                if (!requestId) return { error: 'requestId required for generate_o2i' }
                const record = await SELECT.one.from(Requests, requestId)
                if (!record) return { error: 'Request not found' }
                const safeRecord = JSON.stringify({ rrIds: record.additionalServiceIds, rrDescription: record.rrDescription, price: record.price, currency: record.currency, priceInWords: record.priceInWords, salesOrderNo: record.salesOrderNo, bcpTicketNo: record.bcpTicketNo, poNo: record.poNo || 'Not provided', activityPerformed: record.activityPerformed, sid: record.sid })
                const sys = `Generate JIRA ECSBO ticket. Title format: "Additional Services: [IDs] [Activity] [System]". Body: Hello ECS GES, Please initiate invoicing per below.\n- Amount: [N] [CUR] ([words])\n- Sales order: [val]\n- BCP ticket: [val]\n- PO: [val]\n- Activity: [val]\nJIRA queue: ECSBO\nReturn JSON: {ticket_title, ticket_body}`
                const result = await llm.chat(sys, `DATA: ${safeRecord}`)
                return typeof result === 'string' ? (() => { try { return JSON.parse(result) } catch { return { ticket_title: '', ticket_body: result } } })() : result
              }
              case 'create_o2i_ticket': {
                const { requestId, ticketTitle, ticketBody } = params
                if (!requestId || !ticketTitle || !ticketBody) return { error: 'requestId, ticketTitle, ticketBody required' }
                let jira
                try { jira = new JiraClient() } catch (e) { return { error: `JIRA not configured: ${e.message}` } }
                try {
                  const issue = await jira.createIssue({ summary: ticketTitle, description: ticketBody })
                  await UPDATE(Requests, requestId).with({ o2iTicketNo: issue.key, o2iTicketCreatedDate: new Date().toISOString().slice(0, 10), checkO2iCreated: true, status: 'O2I ticket opened' })
                  return { key: issue.key, url: issue.url }
                } catch (err) {
                  return { error: `JIRA create failed: ${err.message}` }
                }
              }
              default:
                return { error: `Unknown subagent: ${name}` }
            }
          }

          case 'update_record': {
            const { recordId, fields } = toolInput
            if (!recordId || !fields) return { error: 'recordId and fields required' }
            try {
              await UPDATE(Requests, recordId).with(fields)
              return { updated: true, recordId, fields }
            } catch (err) {
              return { error: `Update failed: ${err.message}` }
            }
          }

          case 'propose_layout_change': {
            proposedLayout = { description: toolInput.description, newPanels: toolInput.newPanels }
            return { proposed: true, description: toolInput.description }
          }

          case 'get_reminder_status': {
            const { cdmOwner } = toolInput
            let records = openRequests
            if (cdmOwner) records = openRequests.filter(r => r.cdmOwner === cdmOwner)
            const reminders = evaluateReminders(records)
            return { reminders, count: reminders.length }
          }

          case 'route_to_agent': {
            const { agentType, clientId, contractId, handoffSummary, message: agentMsg } = toolInput
            if (!clientId) return { error: 'clientId required' }

            const clientAgent = await SELECT.one.from(ClientAgents).where({ ID: clientId })
            if (!clientAgent) return { error: `ClientAgent ${clientId} not found` }

            let subagentContext = `You are a specialist agent for customer: ${clientAgent.displayName} (${clientAgent.customerId}).\n`

            if (agentType === 'contract_subagent' && contractId) {
              const contractAgent = await SELECT.one.from(ContractSubagents).where({ ID: contractId })
              if (contractAgent) {
                subagentContext += `Contract SID: ${contractAgent.sid} | Type: ${contractAgent.contractType}\n`
                const contractRequests = await SELECT.from(Requests)
                  .where({ sid: contractAgent.sid })
                  .orderBy('modifiedAt desc')
                  .limit(10)
                subagentContext += `\nCONTRACT REQUESTS:\n` + contractRequests.map(r =>
                  `- [${r.ID}] ${r.status} | AS: ${r.additionalServiceIds || '—'} | Owner: ${r.cdmOwner}`
                ).join('\n')
              }
            } else {
              const customerRequests = await SELECT.from(Requests)
                .where(`customerName like '%${clientAgent.customerId}%'`)
                .orderBy('modifiedAt desc')
                .limit(10)
              subagentContext += `\nCUSTOMER REQUESTS:\n` + customerRequests.map(r =>
                `- [${r.ID}] ${r.status} | SID: ${r.sid || '—'} | AS: ${r.additionalServiceIds || '—'}`
              ).join('\n')
            }

            const recentTurns = history
              .filter(t => t.agentName === (contractId || clientId))
              .slice(-5)
              .map(t => ({ role: t.role, content: t.content }))

            const subSystemPrompt = `${subagentContext}\n\nHANDOFF CONTEXT: ${handoffSummary}\n\nBe concise and focused. You handle only this customer/contract context.`

            const subResult = await llm.chatWithHistory(
              subSystemPrompt,
              [...recentTurns, { role: 'user', content: agentMsg }]
            )

            await INSERT.into(ConversationTurns).entries({
              ID: crypto.randomUUID(),
              userId,
              sessionId: sessionId || 'default',
              role: 'assistant',
              content: typeof subResult === 'string' ? subResult : JSON.stringify(subResult),
              agentName: contractId || clientId
            })

            return { reply: typeof subResult === 'string' ? subResult : JSON.stringify(subResult), agentName: contractId || clientId }
          }

          case 'surface_pending_action': {
            const { userId: targetUser, automationId, prompt: actionPrompt, relatedRequestId } = toolInput
            if (!targetUser || !automationId || !actionPrompt) return { error: 'userId, automationId, prompt required' }
            const id = crypto.randomUUID()
            await INSERT.into(PendingActions).entries({
              ID: id,
              userId: targetUser,
              automationId,
              sessionId: sessionId || 'default',
              prompt: actionPrompt,
              status: 'pending',
              relatedRequestId: relatedRequestId || null,
              createdAt: new Date().toISOString()
            })
            return { created: true, pendingActionId: id }
          }

          case 'resolve_pending_action': {
            const { pendingActionId, status: paStatus, recordedData } = toolInput
            if (!pendingActionId || !paStatus) return { error: 'pendingActionId and status required' }
            await UPDATE(PendingActions, pendingActionId).with({
              status: paStatus,
              resolvedAt: new Date().toISOString()
            })
            if (recordedData && typeof recordedData === 'object') {
              const pa = await SELECT.one.from(PendingActions, pendingActionId)
              if (pa?.relatedRequestId && Object.keys(recordedData).length) {
                await UPDATE(Requests, pa.relatedRequestId).with(recordedData)
              }
            }
            return { resolved: true, pendingActionId, status: paStatus }
          }

          case 'register_client': {
            const { customerId, displayName: clientName } = toolInput
            if (!customerId || !clientName) return { error: 'customerId and displayName required' }
            const id = crypto.randomUUID()
            await INSERT.into(ClientAgents).entries({
              ID: id,
              customerId,
              displayName: clientName,
              createdBy: userId,
              createdAt: new Date().toISOString()
            })
            return { created: true, clientId: id, displayName: clientName }
          }

          case 'register_contract': {
            const { clientId: cId, sid, displayName: contractName, contractType } = toolInput
            if (!cId || !sid || !contractName || !contractType) return { error: 'clientId, sid, displayName, contractType required' }
            const id = crypto.randomUUID()
            await INSERT.into(ContractSubagents).entries({
              ID: id,
              clientId: cId,
              sid,
              displayName: contractName,
              contractType,
              createdAt: new Date().toISOString()
            })
            return { created: true, contractId: id, displayName: contractName }
          }

          default:
            return { error: `Unknown tool: ${toolName}` }
        }
      }

      try {
        const { reply, toolOutputs } = await llm.chatWithTools(systemPrompt, conversationMessages, ORCHESTRATOR_TOOLS, toolDispatcher)

        const latencyMs = Date.now() - start
        logAI({ action: 'orchestrate', promptHash: crypto.createHash('sha256').update(message).digest('hex').slice(0, 16), responseLength: reply.length, latencyMs })

        // 6. Save conversation turns (tagged with Main Orchestrator)
        const turnBase = { userId, sessionId: sessionId || 'default', agentName: 'main_orchestrator' }
        await INSERT.into(ConversationTurns).entries([
          { ...turnBase, role: 'user',      content: message,                                    ID: crypto.randomUUID() },
          { ...turnBase, role: 'assistant', content: JSON.stringify({ reply, panels, toolOutputs }), ID: crypto.randomUUID() }
        ])

        // 7. Return structured response
        return JSON.stringify({
          reply,
          panels: panels.length ? panels : undefined,
          proposedLayout: proposedLayout ?? undefined,
          renameAssistant: renamedTo ?? undefined
        })

      } catch (err) {
        logAI({ action: 'orchestrate', promptHash: '', responseLength: 0, latencyMs: Date.now() - start, error: err.message })
        return req.error(500, `Orchestrator failed: ${err.message}`)
      }
    })

    // ── Mock event endpoint — demo substitute for real SAP Event Mesh ─────
    // In production this would be replaced by an Event Mesh subscription.
    // For the demo: POST /api/v1/triggerMockEvent { eventType, payload }

    this.on('triggerMockEvent', async req => {
      const { eventType, payload: payloadStr } = req.data
      if (!eventType) return req.error(400, 'eventType required')

      let payload = {}
      try { payload = payloadStr ? JSON.parse(payloadStr) : {} } catch { /* ignore */ }

      const userId = req.user?.id || 'anonymous'

      if (eventType === 'customer.acceptance') {
        const { requestId, customerName } = payload
        if (!requestId) return req.error(400, 'payload.requestId required for customer.acceptance')

        const record = await SELECT.one.from(Requests, requestId)
        if (!record) return req.error(404, 'Request not found')

        // Find or create the customer.acceptance AutomationAgent record
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

        // Surface a pending action in the CDM's Inbox
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

    return super.init()
  }

  // ── Status transition enforcement ─────────────────────────────────────────

  _enforceStatusTransition(req, existing, update) {
    const oldStatus = existing.status
    const newStatus = update.status

    // Allow admin override (role 'admin' may skip sequential enforcement)
    if (req.user?.is('admin')) return

    const oldIdx = STATUS_ORDER.indexOf(oldStatus)
    const newIdx = STATUS_ORDER.indexOf(newStatus)

    if (newIdx === -1) return req.error(400, `Unknown status: "${newStatus}"`)

    // Allow moving backward (corrections) or exactly one step forward; no skipping
    if (newIdx > oldIdx + 1) {
      return req.error(422, `Cannot skip from "${oldStatus}" to "${newStatus}". Advance one step at a time, or ask an admin to override.`)
    }

    // Validate (Case no. OR CSR no.) before leaving 'Request received'
    if (oldStatus === 'Request received' && newIdx > 0) {
      const caseNo = update.caseNo ?? existing.caseNo
      const csrNo = update.csrNo ?? existing.csrNo
      if (!caseNo && !csrNo) {
        return req.error(422, 'At least one of Case no. or CSR no. must be filled before advancing past "Request received".')
      }
    }

    // Validate AMS closed before moving to 'O2I ticket opened'
    if (newStatus === 'O2I ticket opened') {
      const amsNo = update.amsTicketNo ?? existing.amsTicketNo
      const amsClosed = update.checkAmsClosed ?? existing.checkAmsClosed
      if (!amsNo || !amsClosed) {
        return req.error(422, 'AMS ticket number must be filled and AMS closed checkbox must be ticked before moving to "O2I ticket opened".')
      }
    }
  }
}

