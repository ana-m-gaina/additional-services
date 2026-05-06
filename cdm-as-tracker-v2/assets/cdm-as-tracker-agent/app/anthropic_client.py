"""
Anthropic SDK tool-use client.
Port of AnthropicDirectClient.js with adaptive thinking and a 10-iteration cap.
"""
import asyncio
import logging
import os
from typing import Any, Callable, Awaitable

import anthropic

logger = logging.getLogger(__name__)

_MODEL         = os.environ.get("HAI_MODEL") or os.environ.get("ANTHROPIC_MODEL", "claude-opus-4-7")
_MAX_TOKENS    = int(os.environ.get("ANTHROPIC_MAX_TOKENS", "4096"))
_MAX_ITER      = int(os.environ.get("ANTHROPIC_MAX_TOOL_ITERATIONS", "10"))
_USE_HAI       = bool(os.environ.get("HAI_BASE_URL") and os.environ.get("HAI_API_KEY"))


def _make_client() -> anthropic.AsyncAnthropic:
    hai_url = os.environ.get("HAI_BASE_URL")
    hai_key = os.environ.get("HAI_API_KEY")

    if hai_url and hai_key:
        logger.info("[LLM] routing through Hyperspace AI proxy at %s", hai_url)
        return anthropic.AsyncAnthropic(
            api_key="placeholder",          # SDK requires non-empty; HAI uses Bearer instead
            base_url=hai_url,
            default_headers={"Authorization": f"Bearer {hai_key}"},
            auth_token=None,                # suppress SDK's own x-api-key header
        )

    key = os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        raise RuntimeError(
            "ANTHROPIC_API_KEY is not set. "
            "Copy .env.example to .env and add your key, then restart."
        )
    return anthropic.AsyncAnthropic(api_key=key)


async def chat(system_prompt: str, user_message: str) -> str:
    return await chat_with_history(system_prompt, [{"role": "user", "content": user_message}])


async def chat_with_history(system_prompt: str, messages: list[dict]) -> str:
    client = _make_client()
    resp = await client.messages.create(
        model=_MODEL,
        max_tokens=2048,
        system=system_prompt,
        messages=messages,
    )
    text_block = next((b for b in resp.content if b.type == "text"), None)
    return text_block.text if text_block else ""


async def chat_with_tools(
    system_prompt: str,
    messages: list[dict],
    tools: list[dict],
    tool_handler: Callable[[str, dict], Awaitable[Any]],
) -> dict:
    """
    Run a tool-use loop until stop_reason == 'end_turn' or _MAX_ITER is reached.
    Returns {"reply": str, "tool_outputs": list}.
    """
    client       = _make_client()
    conversation = list(messages)
    tool_outputs = []
    final_reply  = ""
    iterations   = 0

    while iterations < _MAX_ITER:
        iterations += 1

        create_kwargs = dict(
            model=_MODEL,
            max_tokens=_MAX_TOKENS,
            system=system_prompt,
            tools=tools,
            messages=conversation,
        )
        if not _USE_HAI:
            create_kwargs["thinking"] = {"type": "adaptive"}

        resp = await client.messages.create(**create_kwargs)

        logger.info(
            "[LLM] model=%s iteration=%d stop_reason=%s tokens=%s",
            _MODEL, iterations, resp.stop_reason,
            getattr(resp.usage, "output_tokens", "?"),
        )

        if resp.stop_reason == "end_turn":
            text_block = next((b for b in resp.content if b.type == "text"), None)
            final_reply = text_block.text if text_block else ""
            break

        if resp.stop_reason == "tool_use":
            # Append full assistant message (including thinking blocks)
            conversation.append({
                "role": "assistant",
                "content": [_block_to_dict(b) for b in resp.content if not (_USE_HAI and b.type == "thinking")],
            })

            tool_results = []
            for block in resp.content:
                if block.type != "tool_use":
                    continue
                try:
                    output = await tool_handler(block.name, block.input)
                    tool_result = {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": output if isinstance(output, str) else __import__("json").dumps(output),
                    }
                    tool_outputs.append({"name": block.name, "input": block.input, "output": output})
                except Exception as exc:
                    logger.warning("[LLM] tool %s error: %s", block.name, exc)
                    tool_result = {
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "is_error": True,
                        "content": f"Tool error: {exc}",
                    }
                tool_results.append(tool_result)

            conversation.append({"role": "user", "content": tool_results})
            continue

        # Unexpected stop reason — extract any text and stop
        text_block = next((b for b in resp.content if b.type == "text"), None)
        final_reply = text_block.text if text_block else ""
        break

    if iterations >= _MAX_ITER:
        logger.warning("[LLM] tool-use loop hit %d-iteration cap", _MAX_ITER)
        if not final_reply:
            final_reply = "I reached the maximum number of steps. Please try a more specific request."

    return {"reply": final_reply, "tool_outputs": tool_outputs}


def _block_to_dict(block) -> dict:
    """Convert an Anthropic content block object to a plain dict for the messages API."""
    if block.type == "text":
        return {"type": "text", "text": block.text}
    if block.type == "thinking":
        return {"type": "thinking", "thinking": block.thinking}
    if block.type == "tool_use":
        return {"type": "tool_use", "id": block.id, "name": block.name, "input": block.input}
    # Fallback
    return {"type": block.type}
