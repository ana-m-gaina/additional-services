#!/usr/bin/env node
/**
 * CDM Design Agent — conversational UX/UI design assistant
 * Reads project specs as context, then runs a multi-turn design conversation.
 * Usage: node scripts/design-agent.js [--new-app]
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const TRACKER_ROOT = path.resolve(__dirname, '..');

const isNewApp = process.argv.includes('--new-app');

// Load spec files as context (gracefully skip if missing)
function loadSpec(relPath) {
  const full = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf-8');
}

function buildSystemPrompt() {
  const agentDef = loadSpec('.claude/agents/design-agent.md');
  const assistantSpec = loadSpec('specs/cdm_assistant_spec.md');
  const phase1Spec = loadSpec('specs/phase_1.md');

  const parts = [];

  if (agentDef) {
    // Strip frontmatter
    parts.push(agentDef.replace(/^---[\s\S]*?---\n/, '').trim());
  }

  if (!isNewApp) {
    if (assistantSpec) {
      parts.push('\n\n---\n## Live Spec: CDM Assistant (Phases H→I→J)\n\n' + assistantSpec);
    }
    if (phase1Spec) {
      parts.push('\n\n---\n## Live Spec: Phase 1 (A–F baseline)\n\n' + phase1Spec);
    }
    parts.push('\n\n---\nYou are in **Mode A — Extend the CDM Assistant**. The user wants to add or change something in the existing project.');
  } else {
    parts.push('\n\n---\nYou are in **Mode B — New App from Scratch**. Build the design from the user\'s brief with no assumptions about the existing CDM project.');
  }

  return parts.join('\n');
}

async function runDesignSession() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable not set.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = buildSystemPrompt();
  const messages = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  const prompt = (label) =>
    new Promise((resolve) => {
      process.stdout.write(label);
      rl.once('line', resolve);
    });

  const mode = isNewApp ? 'New App' : 'CDM Assistant Extension';
  console.log(`\n╔══════════════════════════════════════════════════════╗`);
  console.log(`║  CDM Design Agent — ${mode.padEnd(32)}║`);
  console.log(`╚══════════════════════════════════════════════════════╝`);
  console.log(`Type your brief. The agent will collaborate to refine it,`);
  console.log(`then generate Panel Config JSON and CDS schema on approval.`);
  console.log(`Type 'exit' or press Ctrl+C to end the session.\n`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const userInput = await prompt('You: ').catch(() => null);

    if (userInput === null || userInput.trim().toLowerCase() === 'exit') {
      console.log('\nSession ended.');
      rl.close();
      break;
    }

    if (!userInput.trim()) continue;

    messages.push({ role: 'user', content: userInput.trim() });

    process.stdout.write('\nDesign Agent: ');

    try {
      const stream = await client.messages.stream({
        model: 'claude-opus-4-7',
        max_tokens: 8096,
        thinking: { type: 'adaptive' },
        system: systemPrompt,
        messages,
      });

      let assistantText = '';

      for await (const event of stream) {
        if (
          event.type === 'content_block_delta' &&
          event.delta.type === 'text_delta'
        ) {
          process.stdout.write(event.delta.text);
          assistantText += event.delta.text;
        }
      }

      process.stdout.write('\n\n');
      messages.push({ role: 'assistant', content: assistantText });
    } catch (err) {
      console.error('\nAPI error:', err.message);
      // Remove the user message so the turn can be retried
      messages.pop();
    }
  }
}

runDesignSession();
