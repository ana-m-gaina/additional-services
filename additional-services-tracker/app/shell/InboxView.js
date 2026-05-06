'use strict'

// Renders PendingAction cards in the Inbox.
// Each card shows the automation's prompt and a reply input.
// Submitting wires through to POST /orchestrate so the Main Orchestrator handles the response.

const InboxView = {
  _container: null,
  _pollInterval: null,

  async init(container) {
    this._container = container
    await this.refresh()
    // Poll every 15s for new pending actions
    this._pollInterval = setInterval(() => this.refresh(), 15000)
  },

  destroy() {
    if (this._pollInterval) clearInterval(this._pollInterval)
  },

  async refresh() {
    try {
      const res = await ODataClient.get('/PendingActions?$filter=status eq \'pending\'&$orderby=createdAt desc')
      const actions = res.value || []
      this._render(actions)
    } catch {
      // silently ignore — inbox just won't update
    }
  },

  _render(actions) {
    if (!this._container) return
    this._container.innerHTML = ''

    if (!actions.length) {
      const empty = document.createElement('div')
      empty.className = 'inbox-empty'
      empty.textContent = 'No pending actions.'
      this._container.appendChild(empty)
      return
    }

    for (const action of actions) {
      this._container.appendChild(this._renderCard(action))
    }
  },

  _renderCard(action) {
    const card = document.createElement('div')
    card.className = 'inbox-card'
    card.dataset.id = action.ID

    const prompt = document.createElement('div')
    prompt.className = 'inbox-card-prompt'
    prompt.innerHTML = _mdToHtml(action.prompt)
    card.appendChild(prompt)

    const meta = document.createElement('div')
    meta.className = 'inbox-card-meta'
    meta.textContent = new Date(action.createdAt).toLocaleString()
    card.appendChild(meta)

    const replyArea = document.createElement('textarea')
    replyArea.className = 'inbox-card-reply'
    replyArea.placeholder = 'Type your reply…'
    replyArea.rows = 2
    card.appendChild(replyArea)

    const actions_row = document.createElement('div')
    actions_row.className = 'inbox-card-actions'

    const sendBtn = document.createElement('button')
    sendBtn.className = 'inbox-btn-send'
    sendBtn.textContent = `Reply to ${(typeof PersonaStore !== 'undefined' && PersonaStore.getAssistantName()) || 'Beacon'}`
    sendBtn.addEventListener('click', () => this._reply(action, replyArea.value.trim(), sendBtn))

    const dismissBtn = document.createElement('button')
    dismissBtn.className = 'inbox-btn-dismiss'
    dismissBtn.textContent = 'Dismiss'
    dismissBtn.addEventListener('click', () => this._dismiss(action, card))

    actions_row.appendChild(sendBtn)
    actions_row.appendChild(dismissBtn)
    card.appendChild(actions_row)

    return card
  },

  async _reply(action, text, btn) {
    if (!text) return
    btn.disabled = true
    btn.textContent = '…'

    try {
      // Send through orchestrate so Main Orchestrator handles the reply in context
      const res = await ODataClient.post('/orchestrate', {
        message:   `[Inbox reply for pending action ${action.ID}]: ${text}`,
        sessionId: 'inbox',
        mode:      'chat'
      })
      const payload = typeof res.value === 'string' ? JSON.parse(res.value) : res.value

      // Show assistant reply inline below the card
      if (payload?.reply) {
        const replyBubble = document.createElement('div')
        replyBubble.className = 'inbox-card-response'
        replyBubble.innerHTML = _mdToHtml(payload.reply)
        btn.closest('.inbox-card').appendChild(replyBubble)
      }

      btn.closest('.inbox-card').classList.add('inbox-card-resolved')
    } catch (err) {
      btn.disabled = false
      btn.textContent = 'Reply'
      console.error('Inbox reply failed:', err)
    }
  },

  async _dismiss(action, cardEl) {
    try {
      await ODataClient.post('/triggerMockEvent', {
        eventType: '__resolve__',
        payload: JSON.stringify({ pendingActionId: action.ID, status: 'dismissed' })
      })
    } catch { /* ignore */ }
    cardEl.classList.add('inbox-card-dismissed')
    setTimeout(() => cardEl.remove(), 400)
  }
}

// Reuse the same minimal markdown renderer from ChatShell
function _mdToHtml(text) {
  let s = (text || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>')
  s = s.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
  s = s.split(/\n{2,}/).map(para => {
    const t = para.trim()
    if (!t || t.startsWith('<')) return t
    return '<p>' + t.replace(/\n/g, '<br>') + '</p>'
  }).join('')
  return s
}

window.InboxView = InboxView
