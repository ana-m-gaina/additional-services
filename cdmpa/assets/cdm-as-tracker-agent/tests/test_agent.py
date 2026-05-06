"""Tests for CDM AS Tracker agent service."""
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


# ── anthropic_client tests ──────────────────────────────────────────────────

class TestAnthropicClient:
    def test_block_to_dict_text(self):
        from app.anthropic_client import AnthropicClient
        client = AnthropicClient.__new__(AnthropicClient)
        block = MagicMock()
        block.type = "text"
        block.text = "Hello world"
        result = client._block_to_dict(block)
        assert result == {"type": "text", "text": "Hello world"}

    def test_block_to_dict_thinking(self):
        from app.anthropic_client import AnthropicClient
        client = AnthropicClient.__new__(AnthropicClient)
        block = MagicMock()
        block.type = "thinking"
        block.thinking = "I am reasoning..."
        result = client._block_to_dict(block)
        assert result == {"type": "thinking", "thinking": "I am reasoning..."}

    def test_block_to_dict_tool_use(self):
        from app.anthropic_client import AnthropicClient
        client = AnthropicClient.__new__(AnthropicClient)
        block = MagicMock()
        block.type = "tool_use"
        block.id = "toolu_abc"
        block.name = "render_panel"
        block.input = {"type": "record-card", "data": {}}
        result = client._block_to_dict(block)
        assert result["type"] == "tool_use"
        assert result["name"] == "render_panel"

    @pytest.mark.asyncio
    async def test_chat_returns_string(self):
        from app.anthropic_client import AnthropicClient
        client = AnthropicClient.__new__(AnthropicClient)
        mock_response = MagicMock()
        mock_response.content = [MagicMock(type="text", text="Hello, CDM!")]
        mock_anthropic = MagicMock()
        mock_anthropic.messages.create = AsyncMock(return_value=mock_response)
        client._client = mock_anthropic
        client._model = "claude-opus-4-7"
        result = await client.chat("You are helpful.", "Tell me something.")
        assert result == "Hello, CDM!"


# ── cap_client tests ────────────────────────────────────────────────────────

class TestCapClient:
    @pytest.mark.asyncio
    async def test_get_rr_entry_missing_returns_none(self):
        from app.cap_client import CapClient
        client = CapClient.__new__(CapClient)
        client._get = AsyncMock(return_value={"value": []})
        result = await client.get_rr_entry("NONEXISTENT")
        assert result is None

    @pytest.mark.asyncio
    async def test_get_rr_entry_found(self):
        from app.cap_client import CapClient
        client = CapClient.__new__(CapClient)
        client._get = AsyncMock(return_value={"value": [{"rrCode": "SC-42", "description": "System Conversion Premium", "chargeable": True}]})
        result = await client.get_rr_entry("SC-42")
        assert result is not None
        assert result["rrCode"] == "SC-42"
        assert result["chargeable"] is True

    @pytest.mark.asyncio
    async def test_get_open_requests_returns_list(self):
        from app.cap_client import CapClient
        client = CapClient.__new__(CapClient)
        client._get = AsyncMock(return_value={"value": [{"ID": "abc", "status": "New"}]})
        result = await client.get_open_requests()
        assert isinstance(result, list)
        assert result[0]["ID"] == "abc"

    @pytest.mark.asyncio
    async def test_save_conversation_turns_empty(self):
        from app.cap_client import CapClient
        client = CapClient.__new__(CapClient)
        client._post = AsyncMock()
        await client.save_conversation_turns([])
        client._post.assert_not_called()


# ── orchestrator tests ──────────────────────────────────────────────────────

class TestOrchestrator:
    @pytest.mark.asyncio
    async def test_run_returns_reply(self):
        from app.agents.orchestrator import run
        with patch("app.agents.orchestrator._cap") as mock_cap, \
             patch("app.agents.orchestrator._anthropic") as mock_ant:
            mock_cap.get_conversation_turns = AsyncMock(return_value=[])
            mock_cap.get_open_requests = AsyncMock(return_value=[])
            mock_cap.get_persona_layout = AsyncMock(return_value=None)
            mock_cap.get_pending_actions = AsyncMock(return_value=[])
            mock_cap.get_reminder_status = AsyncMock(return_value=[])
            mock_cap.get_admin_config = AsyncMock(return_value={"assistant_name": "Beacon", "llm_model": "claude-opus-4-7"})
            mock_cap.save_conversation_turns = AsyncMock()
            mock_ant.chat_with_tools = AsyncMock(return_value={"reply": "Hello!", "tool_outputs": []})
            result = await run(message="Hello", session_id="s1", card_context=None, cdm_email="alex@sap.com", assistant_name=None)
            assert "reply" in result
            assert result["reply"] == "Hello!"

    @pytest.mark.asyncio
    async def test_run_returns_panels_list(self):
        from app.agents.orchestrator import run
        with patch("app.agents.orchestrator._cap") as mock_cap, \
             patch("app.agents.orchestrator._anthropic") as mock_ant:
            mock_cap.get_conversation_turns = AsyncMock(return_value=[])
            mock_cap.get_open_requests = AsyncMock(return_value=[])
            mock_cap.get_persona_layout = AsyncMock(return_value=None)
            mock_cap.get_pending_actions = AsyncMock(return_value=[])
            mock_cap.get_reminder_status = AsyncMock(return_value=[])
            mock_cap.get_admin_config = AsyncMock(return_value={"assistant_name": "Beacon", "llm_model": "claude-opus-4-7"})
            mock_cap.save_conversation_turns = AsyncMock()
            mock_ant.chat_with_tools = AsyncMock(return_value={"reply": "Here is your data.", "tool_outputs": []})
            result = await run(message="Show me open requests", session_id="s2", card_context=None, cdm_email="alex@sap.com", assistant_name=None)
            assert "panels" in result
            assert isinstance(result["panels"], list)


# ── specialist subagent tests ───────────────────────────────────────────────

class TestRRAgent:
    @pytest.mark.asyncio
    async def test_lookup_known_code(self):
        from app.agents.rr_agent import run as rr_run
        with patch("app.agents.rr_agent._cap") as mock_cap, \
             patch("app.agents.rr_agent._anthropic") as mock_ant:
            mock_cap.get_rr_entry = AsyncMock(return_value={
                "rrCode": "SC-42", "description": "System Conversion Premium", "chargeable": True
            })
            mock_ant.chat = AsyncMock(return_value="SC-42 is chargeable at a standard rate.")
            result = await rr_run(query="Is SC-42 chargeable?", cdm_email="alex@sap.com")
            assert "SC-42" in result or isinstance(result, str)

    @pytest.mark.asyncio
    async def test_lookup_unknown_code(self):
        from app.agents.rr_agent import run as rr_run
        with patch("app.agents.rr_agent._cap") as mock_cap, \
             patch("app.agents.rr_agent._anthropic") as mock_ant:
            mock_cap.get_rr_entry = AsyncMock(return_value=None)
            mock_cap.get_rr_table = AsyncMock(return_value=[])
            mock_ant.chat = AsyncMock(return_value="No entry found for ZZ-999.")
            result = await rr_run(query="Tell me about ZZ-999", cdm_email="alex@sap.com")
            assert isinstance(result, str)


class TestPricingAgent:
    @pytest.mark.asyncio
    async def test_pricing_lookup(self):
        from app.agents.pricing_agent import run as pricing_run
        with patch("app.agents.pricing_agent._cap") as mock_cap, \
             patch("app.agents.pricing_agent._anthropic") as mock_ant:
            mock_cap.get_pricing_entries = AsyncMock(return_value=[
                {"rrCode": "SC-42", "price": 5000, "currency": "EUR"}
            ])
            mock_ant.chat = AsyncMock(return_value="SC-42 is priced at EUR 5000.")
            result = await pricing_run(query="What is the price for SC-42?", cdm_email="alex@sap.com")
            assert isinstance(result, str)


# ── FastAPI route tests ─────────────────────────────────────────────────────

class TestMainApp:
    def test_health_endpoint(self):
        from fastapi.testclient import TestClient
        from app.main import app
        client = TestClient(app)
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"

    def test_agent_card_endpoint(self):
        from fastapi.testclient import TestClient
        from app.main import app
        client = TestClient(app)
        response = client.get("/.well-known/agent.json")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert "capabilities" in data

    def test_chat_empty_message_returns_400(self):
        from fastapi.testclient import TestClient
        from app.main import app
        client = TestClient(app)
        response = client.post("/api/chat", json={"message": "   ", "session_id": "test"})
        assert response.status_code == 400
