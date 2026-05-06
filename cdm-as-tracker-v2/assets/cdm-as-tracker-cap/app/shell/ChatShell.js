'use strict'

// Chat mode — streams from POST /api/chat/stream via AgentClient.
// Shows live activity feed while the orchestrator works.

let _sessionId = 'session-' + Date.now()
let _busy = false

const ChatShell = {
  async init(container) {
    this._container = container
    this._thread    = container.querySelector('#chat-thread')
    this._input     = container.querySelector('#chat-input')
    this._sendBtn   = container.querySelector('#chat-send')

    this._sendBtn.addEventListener('click', () => this._send())
    this._input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this._send() }
    })
    this._input.addEventListener('input', () => this._resizeInput())

    await PersonaStore.load()
    const name = PersonaStore.getAssistantName()

    if (PersonaStore.isFirstRun()) {
      this._addBubble('assistant', `Hi — I'm **${name}**, your CDM assistant. I can help you track AS requests, draft price emails, look up R&R codes, and more.\n\nBefore we start: I go by **${name}**, but feel free to rename me anytime — just say "call yourself X". What would you like to work on?`)
      await PersonaStore.markFirstRunDone()
    } else {
      this._addBubble('assistant', `What would you like to work on? Paste a customer email, ask about a request, or say 'show my open requests'.`)
    }

    this._updatePageTitle(name)
    this._input.focus()

    // Nav item clicks open a scoped conversation
    document.addEventListener('nav:select', e => this._onNavSelect(e.detail))
  },

  _onNavSelect({ type, id, label, subtitle }) {
    // Switch to chat mode
    document.getElementById('btn-chat').click()

    const prompts = {
      client:     `Show me a summary for ${label} — open requests, any reminders, and recent activity.`,
      contract:   `Show me the status of contract ${subtitle || label} — open AS requests, checklist items, and any pending actions.`,
      automation: `Tell me about the ${label} automation — when did it last fire and are there any pending actions from it?`
    }
    const message = prompts[type] || `Tell me about ${label}.`

    this._input.value = message
    this._resizeInput()
    this._input.focus()
    // Auto-send the scoped prompt
    this._send()
  },

  _updatePageTitle(name) {
    document.title = name
    const el = document.getElementById('agent-name-display')
    if (el) el.textContent = name
  },

  async _send() {
    const text = this._input.value.trim()
    if (!text || _busy) return
    this._input.value = ''
    this._resizeInput()
    this._addBubble('user', text)

    _busy = true
    this._sendBtn.disabled = true
    const thinking = this._addThinking()

    try {
      const result = await AgentClient.chat({
        message:       text,
        sessionId:     _sessionId,
        assistantName: PersonaStore.getAssistantName(),
        onActivity:    msg => this._onActivity(thinking, msg)
      })

      thinking.remove()

      if (result.renameAssistant) {
        await PersonaStore.setAssistantName(result.renameAssistant)
        this._updatePageTitle(result.renameAssistant)
      }

      if (result.reply) this._addBubble('assistant', result.reply)

      if (result.panels?.length) {
        const panelWrap = document.createElement('div')
        panelWrap.className = 'inline-panels'
        result.panels.forEach(p => {
          const el = Renderer.render(p)
          if (el) panelWrap.appendChild(el)
        })
        this._thread.appendChild(panelWrap)
      }

      if (result.proposedLayout) {
        this._showLayoutProposal(result.proposedLayout)
      }

    } catch (err) {
      thinking.remove()
      this._addBubble('system', `Error: ${err.message}`)
    } finally {
      _busy = false
      this._sendBtn.disabled = false
      this._scrollBottom()
      this._input.focus()
    }
  },

  _onActivity(thinkingEl, text) {
    let feed = thinkingEl.querySelector('.activity-feed')
    if (!feed) {
      feed = document.createElement('div')
      feed.className = 'activity-feed'
      thinkingEl.appendChild(feed)
    }
    const line = document.createElement('div')
    line.className = 'activity-line'
    line.textContent = text
    feed.appendChild(line)
    feed.scrollTop = feed.scrollHeight
    this._scrollBottom()
  },

  _addBubble(role, text) {
    const el = document.createElement('div')
    el.className = `bubble ${role}`
    if (role === 'assistant') {
      el.innerHTML = _mdToHtml(text)
    } else {
      el.textContent = text
    }
    this._thread.appendChild(el)
    this._scrollBottom()
    return el
  },

  _addThinking() {
    const el = document.createElement('div')
    el.className = 'thinking'
    const dots = document.createElement('div')
    dots.className = 'thinking-dots'
    dots.innerHTML = '<span>●</span><span>●</span><span>●</span>'
    el.appendChild(dots)
    this._thread.appendChild(el)
    this._scrollBottom()
    return el
  },

  _showLayoutProposal(proposal) {
    const panel = {
      id: 'layout-proposal-' + Date.now(),
      type: 'confirm-dialog',
      title: 'Update your workspace?',
      config: {
        description: proposal.description,
        newPanels: proposal.newPanels,
        onConfirm: async (newPanels) => {
          const layout = { panels: newPanels }
          await PersonaStore.save(layout)
          this._addBubble('assistant', 'Workspace updated. Switch to Dashboard to see your new layout.')
        }
      }
    }
    const el = Renderer.render(panel)
    if (el) this._thread.appendChild(el)
    this._scrollBottom()
  },

  _scrollBottom() {
    this._thread.scrollTop = this._thread.scrollHeight
  },

  _resizeInput() {
    const el = this._input
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }
}

function _mdToHtml(text) {
  let s = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  s = s.replace(/((?:^\|.+\|\n)+)/gm, block => {
    const lines = block.trim().split('\n').filter(l => l.trim() && !l.match(/^\|[-| :]+\|$/))
    let html = '<table class="md-table"><tbody>'
    lines.forEach((line, i) => {
      const cells = line.split('|').slice(1, -1).map(c => c.trim())
      const tag = i === 0 ? 'th' : 'td'
      html += '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>'
    })
    return html + '</tbody></table>'
  })

  s = s.replace(/`([^`]+)`/g, '<code>$1</code>')
  s = s.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  s = s.replace(/^## (.+)$/gm, '<h3>$1</h3>')
  s = s.replace(/^[-*] (.+)$/gm, '<li>$1</li>')
  s = s.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
  s = s.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  s = s.split(/\n{2,}/).map(para => {
    const t = para.trim()
    if (!t || t.startsWith('<')) return t
    return '<p>' + t.replace(/\n/g, '<br>') + '</p>'
  }).join('')

  return s
}

window.ChatShell  = ChatShell
window._mdToHtml  = _mdToHtml
