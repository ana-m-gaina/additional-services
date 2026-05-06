'use strict'

// Manages the chat-mode conversation thread.
// Calls POST /api/v1/orchestrate and renders returned panels inline.

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
      const res = await ODataClient.post('/orchestrate', {
        message: text,
        sessionId: _sessionId,
        mode: 'chat',
        assistantName: PersonaStore.getAssistantName()
      })

      const payload = typeof res.value === 'string' ? JSON.parse(res.value) : res.value
      thinking.remove()

      if (payload.renameAssistant) {
        await PersonaStore.setAssistantName(payload.renameAssistant)
        this._updatePageTitle(payload.renameAssistant)
      }

      if (payload.reply) this._addBubble('assistant', payload.reply)

      if (payload.panels?.length) {
        const panelWrap = document.createElement('div')
        panelWrap.className = 'inline-panels'
        payload.panels.forEach(p => {
          const el = Renderer.render(p)
          if (el) panelWrap.appendChild(el)
        })
        this._thread.appendChild(panelWrap)
      }

      if (payload.proposedLayout) {
        this._showLayoutProposal(payload.proposedLayout)
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

  _addBubble(role, text) {
    const el = document.createElement('div')
    el.className = `bubble ${role}`
    if (role === 'assistant') {
      el.innerHTML = _mdToHtml(text)
    } else if (role === 'user') {
      el.textContent = text
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
    el.innerHTML = '<span>●</span><span>●</span><span>●</span>'
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

// Minimal markdown → safe HTML
function _mdToHtml(text) {
  let s = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Tables: detect | header | row |
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

window.ChatShell = ChatShell
