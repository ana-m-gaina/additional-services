const { AnthropicDirectClient } = require('./AnthropicDirectClient')
const { GenAIHubClient } = require('./GenAIHubClient')

const provider = process.env.CDS_LLM_PROVIDER || 'anthropic'

let _instance
if (provider === 'anthropic') {
  _instance = new AnthropicDirectClient()
} else if (provider === 'gen_ai_hub') {
  _instance = new GenAIHubClient()
} else {
  throw new Error(`Unknown LLM provider: "${provider}". Valid values: anthropic, gen_ai_hub`)
}

module.exports = _instance
