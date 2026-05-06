'use strict'

// Inbox — polls PendingActions from the v2 CAP backend.
// Replies are sent through the Python agent via AgentClient.chatSimple.

const InboxView = {
  _container: null,
  _pollInterval: null,

  async init(container) {
    this._container = container
    await this.refresh()
    this._pollInterval = setInterval(() => this.refresh(), 15000)
  },

  destroy() {
    if (this._pollInterval) clearInterval(this._pollInterval)
  },

  async refresh() {
    try {
      const res = await ODataClient.get("/PendingActions?$filter=status eq 'pending'&$orderby=createdAt desc")
      this._render(res.value || [])
    } catch {
      // silently ignore
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
    prompt.innerHTML = window._mdToHtml ? _mdToHtml(action.prompt) : action.prompt
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

    const actionsRow = document.createElement('div')
    actionsRow.className = 'inbox-card-actions'

    const sendBtn = document.createElement('button')
    sendBtn.className = 'inbox-btn-send'
    sendBtn.textContent = `Reply to ${PersonaStore.getAssistantName()}`
    sendBtn.addEventListener('click', () => this._reply(action, replyArea.value.trim(), sendBtn, card))

    const dismissBtn = document.createElement('button')
    dismissBtn.className = 'inbox-btn-dismiss'
    dismissBtn.textContent = 'Dismiss'
    dismissBtn.addEventListener('click', () => this._dismiss(action, card))

    actionsRow.appendChild(sendBtn)
    actionsRow.appendChild(dismissBtn)
    card.appendChild(actionsRow)

    return card
  },

  async _reply(action, text, btn, cardEl) {
    if (!text) return
    btn.disabled = true
    btn.textContent = '…'

    try {
      const result = await AgentClient.chatSimple({
        message:       `[Inbox reply for pending action ${action.ID}]: ${text}`,
        sessionId:     'inbox',
        assistantName: PersonaStore.getAssistantName()
      })

      if (result?.reply) {
        const replyBubble = document.createElement('div')
        replyBubble.className = 'inbox-card-response'
        replyBubble.innerHTML = window._mdToHtml ? _mdToHtml(result.reply) : result.reply
        cardEl.appendChild(replyBubble)
      }

      cardEl.classList.add('inbox-card-resolved')
    } catch (err) {
      btn.disabled = false
      btn.textContent = 'Reply'
      console.error('Inbox reply failed:', err)
    }
  },

  async _dismiss(action, cardEl) {
    try {
      await ODataClient.patch(`/PendingActions(${action.ID})`, { status: 'dismissed' })
    } catch { /* ignore */ }
    cardEl.classList.add('inbox-card-dismissed')
    setTimeout(() => cardEl.remove(), 400)
  }
}

window.InboxView = InboxView
