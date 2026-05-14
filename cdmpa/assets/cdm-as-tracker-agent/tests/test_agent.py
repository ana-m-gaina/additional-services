"""Tests for CDM AS Tracker agent service."""
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


# ── anthropic_client tests ──────────────────────────────────────────────────

class TestAnthropicClient:
    def test_block_to_dict_text(self):
        from app.anthropic_client import _block_to_dict
        block = MagicMock()
        block.type = "text"
        block.text = "Hello world"
        assert _block_to_dict(block) == {"type": "text", "text": "Hello world"}

    def test_block_to_dict_thinking(self):
        from app.anthropic_client import _block_to_dict
        block = MagicMock()
        block.type = "thinking"
        block.thinking = "I am reasoning..."
        assert _block_to_dict(block) == {"type": "thinking", "thinking": "I am reasoning..."}

    def test_block_to_dict_tool_use(self):
        from app.anthropic_client import _block_to_dict
        block = MagicMock()
        block.type = "tool_use"
        block.id = "toolu_abc"
        block.name = "render_panel"
        block.input = {"type": "record-card", "data": {}}
        result = _block_to_dict(block)
        assert result["type"] == "tool_use"
        assert result["name"] == "render_panel"

    @pytest.mark.asyncio
    async def test_chat_returns_string(self):
        from app import anthropic_client
        mock_response = MagicMock()
        mock_response.content = [MagicMock(type="text", text="Hello, CDM!")]
        mock_sdk = MagicMock()
        mock_sdk.messages.create = AsyncMock(return_value=mock_response)
        with patch.object(anthropic_client, "_make_client", return_value=mock_sdk):
            result = await anthropic_client.chat("You are helpful.", "Tell me something.")
        assert result == "Hello, CDM!"


# ── cap_client tests ────────────────────────────────────────────────────────

class TestCapClient:
    @pytest.mark.asyncio
    async def test_get_rr_entry_missing_returns_none(self):
        from app import cap_client
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json = MagicMock(return_value={"value": []})
        mock_http = MagicMock()
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_http.get = AsyncMock(return_value=mock_resp)
        with patch("app.cap_client.httpx.AsyncClient", return_value=mock_http):
            result = await cap_client.get_rr_entry("NONEXISTENT")
        assert result is None

    @pytest.mark.asyncio
    async def test_get_rr_entry_found(self):
        from app import cap_client
        entry = {"ID": "1", "rrCode": "SC-42", "description": "System Conversion Premium", "chargeable": True}
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json = MagicMock(return_value={"value": [entry]})
        mock_http = MagicMock()
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_http.get = AsyncMock(return_value=mock_resp)
        with patch("app.cap_client.httpx.AsyncClient", return_value=mock_http):
            result = await cap_client.get_rr_entry("SC-42")
        assert result is not None
        assert result["rrCode"] == "SC-42"

    @pytest.mark.asyncio
    async def test_get_open_requests_returns_list(self):
        from app import cap_client
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json = MagicMock(return_value={"value": [{"ID": "abc", "status": "New"}]})
        mock_http = MagicMock()
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_http.get = AsyncMock(return_value=mock_resp)
        with patch("app.cap_client.httpx.AsyncClient", return_value=mock_http):
            result = await cap_client.get_open_requests()
        assert isinstance(result, list)
        assert result[0]["ID"] == "abc"

    @pytest.mark.asyncio
    async def test_save_conversation_turns_empty(self):
        from app import cap_client
        mock_http = MagicMock()
        mock_http.__aenter__ = AsyncMock(return_value=mock_http)
        mock_http.__aexit__ = AsyncMock(return_value=False)
        mock_http.post = AsyncMock()
        with patch("app.cap_client.httpx.AsyncClient", return_value=mock_http):
            await cap_client.save_conversation_turns([])
        mock_http.post.assert_not_called()


# ── orchestrator tests ──────────────────────────────────────────────────────

class TestOrchestrator:
    @pytest.mark.asyncio
    async def test_run_returns_reply(self):
        from app.agents.orchestrator import run
        with patch("app.cap_client.get_conversation_turns", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_open_requests", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_pending_actions", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_admin_config", AsyncMock(return_value={"assistant_name": "Beacon"})), \
             patch("app.cap_client.get_reminder_status", AsyncMock(return_value=[])), \
             patch("app.cap_client.save_conversation_turns", AsyncMock()), \
             patch("app.anthropic_client.chat_with_tools", AsyncMock(return_value={"reply": "Hello!", "tool_outputs": []})):
            result = await run(message="Hello", session_id="s1", card_context=None, cdm_email="alex@sap.com", assistant_name=None)
        assert "reply" in result
        assert result["reply"] == "Hello!"

    @pytest.mark.asyncio
    async def test_run_returns_panels_list(self):
        from app.agents.orchestrator import run
        with patch("app.cap_client.get_conversation_turns", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_open_requests", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_pending_actions", AsyncMock(return_value=[])), \
             patch("app.cap_client.get_admin_config", AsyncMock(return_value={"assistant_name": "Beacon"})), \
             patch("app.cap_client.get_reminder_status", AsyncMock(return_value=[])), \
             patch("app.cap_client.save_conversation_turns", AsyncMock()), \
             patch("app.anthropic_client.chat_with_tools", AsyncMock(return_value={"reply": "Here is your data.", "tool_outputs": []})):
            result = await run(message="Show me open requests", session_id="s2", card_context=None, cdm_email="alex@sap.com", assistant_name=None)
        assert "panels" in result
        assert result["panels"] is None or isinstance(result["panels"], list)


# ── specialist subagent tests ───────────────────────────────────────────────

class TestRRAgent:
    @pytest.mark.asyncio
    async def test_lookup_known_code(self):
        from app.agents.rr_agent import run as rr_run
        chunk = {"text": "SC-42 System Conversion Premium is chargeable.", "embedding": "[0.1,0.2,0.3]", "source": "rr.pdf", "page": 1}
        with patch("app.cap_client.get_rr_chunks", AsyncMock(return_value=[chunk])), \
             patch("app.agents.rr_agent._embed", AsyncMock(return_value=None)), \
             patch("app.anthropic_client.chat", AsyncMock(return_value='{"summary":"SC-42 is chargeable","matches":[],"confidence":"HIGH","sources":[],"answer":"SC-42 is chargeable at a standard rate."}')):
            result = await rr_run(query="Is SC-42 chargeable?")
        assert isinstance(result, dict)

    @pytest.mark.asyncio
    async def test_lookup_no_chunks(self):
        from app.agents.rr_agent import run as rr_run
        with patch("app.cap_client.get_rr_chunks", AsyncMock(return_value=[])):
            result = await rr_run(query="Tell me about ZZ-999")
        assert result["confidence"] == "LOW"
        assert "ingest" in result["summary"].lower()


class TestPricingAgent:
    @pytest.mark.asyncio
    async def test_pricing_lookup(self):
        from app.agents.pricing_agent import run as pricing_run
        chunk = {"text": "SC-42 is priced at EUR 5000.", "embedding": "[0.1,0.2,0.3]", "serviceCode": "SC-42", "source": "pricing.pdf", "page": 1}
        with patch("app.cap_client.get_pricing_chunks", AsyncMock(return_value=[chunk])), \
             patch("app.agents.pricing_agent._embed", AsyncMock(return_value=None)), \
             patch("app.anthropic_client.chat", AsyncMock(return_value='{"answer":"SC-42 is EUR 5000","price_entries":[],"confidence":"HIGH"}')):
            result = await pricing_run(query="What is the price for SC-42?")
        assert isinstance(result, dict)

    @pytest.mark.asyncio
    async def test_pricing_no_chunks(self):
        from app.agents.pricing_agent import run as pricing_run
        with patch("app.cap_client.get_pricing_chunks", AsyncMock(return_value=[])):
            result = await pricing_run(query="Price of SC-42?")
        assert result["confidence"] == "LOW"
        assert "ingest" in result["answer"].lower()


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
