const { LLMClient } = require('./LLMClient')

// Seam ready for Phase 2 swap when AI Core entitlement is available
class GenAIHubClient extends LLMClient {
  async chat(_systemPrompt, _userMessage) {
    throw new Error('GenAIHubClient not yet implemented — awaiting AI Core entitlement')
  }
}

module.exports = { GenAIHubClient }
