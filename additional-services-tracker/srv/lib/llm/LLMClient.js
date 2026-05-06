class LLMClient {
  async chat(systemPrompt, userMessage) {
    throw new Error('Not implemented')
  }

  // Multi-turn: messages is [{role, content}] array including the latest user message
  async chatWithHistory(systemPrompt, messages) {
    throw new Error('Not implemented')
  }

  // Tool-use loop: calls toolHandler(name, input) for each tool_use call, loops until end_turn
  async chatWithTools(systemPrompt, messages, tools, toolHandler) {
    throw new Error('Not implemented')
  }
}

module.exports = { LLMClient }
