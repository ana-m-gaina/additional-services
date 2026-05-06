const Anthropic = require('@anthropic-ai/sdk')
const { LLMClient } = require('./LLMClient')

// Prefer env-var alias so the local proxy can resolve 'claude-opus-latest' to its best available Opus
const ORCHESTRATOR_MODEL = process.env.ANTHROPIC_DEFAULT_OPUS_MODEL || 'claude-opus-4-7'
const MAX_TOOL_ITERATIONS = 10

class AnthropicDirectClient extends LLMClient {
  constructor() {
    super()
    this._client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  }

  async chat(systemPrompt, userMessage) {
    return this.chatWithHistory(systemPrompt, [{ role: 'user', content: userMessage }])
  }

  async chatWithHistory(systemPrompt, messages) {
    const start = Date.now()
    try {
      const message = await this._client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages
      })
      const text = message.content[0].text
      const latency = Date.now() - start
      console.log(`[LLM] provider=anthropic latency=${latency}ms tokens=${message.usage?.output_tokens}`)
      try {
        return JSON.parse(text)
      } catch {
        return text
      }
    } catch (err) {
      console.error(`[LLM] provider=anthropic error: ${err.message}`)
      throw new Error(`Anthropic API call failed: ${err.message}`)
    }
  }

  // Tool-use loop: runs until stop_reason === 'end_turn' or iteration cap reached.
  // toolHandler(name, input) must return a value (string or object) for each tool call.
  // Returns { reply: string, toolOutputs: Array }
  async chatWithTools(systemPrompt, messages, tools, toolHandler) {
    const start = Date.now()
    const conversation = [...messages]
    const toolOutputs = []
    let iterations = 0
    let finalReply = ''

    try {
      while (iterations < MAX_TOOL_ITERATIONS) {
        iterations++

        const response = await this._client.messages.create({
          model: ORCHESTRATOR_MODEL,
          max_tokens: 4096,
          thinking: { type: 'adaptive' },
          system: systemPrompt,
          tools,
          messages: conversation
        })

        const latency = Date.now() - start
        console.log(`[LLM] provider=anthropic model=${ORCHESTRATOR_MODEL} iteration=${iterations} stop_reason=${response.stop_reason} latency=${latency}ms tokens=${response.usage?.output_tokens}`)

        if (response.stop_reason === 'end_turn') {
          // Extract final text from content blocks (skip thinking blocks)
          const textBlock = response.content.find(b => b.type === 'text')
          finalReply = textBlock?.text ?? ''
          break
        }

        if (response.stop_reason === 'tool_use') {
          // Append assistant message with all content blocks (including thinking)
          conversation.push({ role: 'assistant', content: response.content })

          // Process each tool_use block and collect results
          const toolResults = []
          for (const block of response.content) {
            if (block.type !== 'tool_use') continue

            let toolResult
            try {
              const output = await toolHandler(block.name, block.input)
              toolResult = {
                type: 'tool_result',
                tool_use_id: block.id,
                content: typeof output === 'string' ? output : JSON.stringify(output)
              }
              toolOutputs.push({ name: block.name, input: block.input, output })
            } catch (toolErr) {
              toolResult = {
                type: 'tool_result',
                tool_use_id: block.id,
                is_error: true,
                content: `Tool error: ${toolErr.message}`
              }
            }
            toolResults.push(toolResult)
          }

          conversation.push({ role: 'user', content: toolResults })
          continue
        }

        // Unexpected stop reason — extract any text and exit
        const textBlock = response.content.find(b => b.type === 'text')
        finalReply = textBlock?.text ?? ''
        break
      }

      if (iterations >= MAX_TOOL_ITERATIONS) {
        console.warn(`[LLM] tool-use loop hit ${MAX_TOOL_ITERATIONS}-iteration cap`)
        finalReply = finalReply || 'I reached the maximum number of steps. Please try a more specific request.'
      }

      return { reply: finalReply, toolOutputs }
    } catch (err) {
      console.error(`[LLM] provider=anthropic chatWithTools error: ${err.message}`)
      throw new Error(`Orchestrator call failed: ${err.message}`)
    }
  }
}

module.exports = { AnthropicDirectClient }
