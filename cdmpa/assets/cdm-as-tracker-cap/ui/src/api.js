const BASE_CDM   = '/CDMService'
const BASE_ADMIN = '/AdminService'

async function _odata(path, opts = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...opts.headers },
    ...opts,
  })
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} → ${res.status}`)
  return res.status === 204 ? null : res.json()
}

export const getRREntries   = (filter = '') =>
  _odata(`${BASE_CDM}/RRTable?$filter=active eq true${filter ? '&' + filter : ''}&$orderby=serviceCode`)
    .then(d => d.value || [])

export const getPricing     = () =>
  _odata(`${BASE_CDM}/PricingTable?$filter=active eq true&$orderby=serviceCode`).then(d => d.value || [])

export const getActiveRequests = () =>
  _odata(`${BASE_CDM}/ASRequest?$filter=status ne 'Invoiced'&$expand=activityLog&$orderby=createdAt desc`)
    .then(d => d.value || [])

export const getCardLayouts = () =>
  _odata(`${BASE_CDM}/CardLayout`).then(d => d.value || [])

export const saveCardLayout = layouts =>
  _odata(`${BASE_CDM}/saveCardLayout`, { method: 'POST', body: JSON.stringify({ layouts }) })

export const getPendingActions = () =>
  _odata(`${BASE_CDM}/PendingActions?$filter=status eq 'pending'&$orderby=createdAt desc`)
    .then(d => d.value || [])

export const resolvePendingAction = (id, status) =>
  _odata(`${BASE_CDM}/PendingActions('${id}')`, {
    method: 'PATCH', body: JSON.stringify({ status, resolvedAt: new Date().toISOString() })
  })

export const getClientAgents = () =>
  _odata(`${BASE_CDM}/ClientAgents?$orderby=displayName`).then(d => d.value || [])

export const getContractSubagents = (clientId = null) =>
  _odata(`${BASE_CDM}/ContractSubagents${clientId ? `?$filter=clientId eq '${clientId}'` : ''}`)
    .then(d => d.value || [])

export const getAutomationAgents = () =>
  _odata(`${BASE_CDM}/AutomationAgents`).then(d => d.value || [])

export const patchAgent = (entity, id, data) =>
  _odata(`${BASE_CDM}/${entity}('${id}')`, { method: 'PATCH', body: JSON.stringify(data) })

export const postAgent = (entity, data) =>
  _odata(`${BASE_CDM}/${entity}`, { method: 'POST', body: JSON.stringify(data) })

export const createRequest = data =>
  _odata(`${BASE_CDM}/ASRequest`, { method: 'POST', body: JSON.stringify(data) })

export const postASRequest = createRequest

export const patchASRequest = (id, data) =>
  _odata(`${BASE_CDM}/ASRequest('${id}')`, { method: 'PATCH', body: JSON.stringify(data) })

export const advanceStatus = (id, newStatus, comment = '') =>
  _odata(`${BASE_CDM}/ASRequest('${id}')/CDMService.advanceStatus`, {
    method: 'POST', body: JSON.stringify({ newStatus, comment })
  })

export const recordApproval = (id, approvalText, poNumber = '') =>
  _odata(`${BASE_CDM}/ASRequest('${id}')/CDMService.recordApproval`, {
    method: 'POST', body: JSON.stringify({ approvalText, poNumber })
  })

export const generateJiraTicket = id =>
  _odata(`${BASE_CDM}/ASRequest('${id}')/CDMService.generateJiraTicket`, { method: 'POST', body: '{}' })

export const savePersonaLayout = layoutJson =>
  _odata(`${BASE_CDM}/savePersonaLayout`, { method: 'POST', body: JSON.stringify({ layoutJson }) })

export const getPersonaLayout = () =>
  _odata(`${BASE_CDM}/PersonaLayouts`).then(d => (d.value || [])[0] || null)

export const triggerMockEvent = (eventType, payload) =>
  _odata(`${BASE_CDM}/triggerMockEvent`, {
    method: 'POST', body: JSON.stringify({ eventType, payload: JSON.stringify(payload) })
  })

export async function sendChat(message, sessionId, cardContext, cdmEmail, assistantName, onActivity) {
  const body = JSON.stringify({
    message,
    session_id:     sessionId || 'default',
    card_context:   cardContext || null,
    cdm_email:      cdmEmail || null,
    assistant_name: assistantName || null,
  })

  const res = await fetch('/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  if (!res.ok) throw new Error(`Chat failed: ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop()  // keep incomplete last line
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const evt = JSON.parse(line.slice(6))
      if (evt.type === 'activity' && onActivity) {
        onActivity(evt.text)
      } else if (evt.type === 'result') {
        return evt  // final result
      } else if (evt.type === 'error') {
        throw new Error(evt.detail || 'Agent error')
      }
    }
  }
  throw new Error('Stream ended without result')
}

export async function whoami() {
  const d = await _odata(`${BASE_CDM}/whoami`, { method: 'POST', body: '{}' })
  return { id: d?.id || 'anonymous', roles: Array.isArray(d?.roles) ? d.roles : [] }
}

export async function getAssistantName() {
  const d = await _odata(`${BASE_CDM}/AdminConfigs?$filter=configKey eq 'assistant_name'`)
  return d?.value?.[0]?.configValue || 'Beacon'
}

export async function getCurrentUser() {
  const res = await fetch('/user-api/currentUser', { headers: { Accept: 'application/json' } })
  if (!res.ok) return { firstname: '', lastname: '', email: 'anonymous', name: 'anonymous' }
  return res.json()
}
