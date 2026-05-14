"""
IAS Token Exchange -- JWT-Bearer Grant (RFC 7523)

Exchanges an inbound user Bearer token for an access token scoped to the
Agent Gateway provider application, using mTLS client authentication.

Flow:
  POST <iss>/oauth2/token
    grant_type   = urn:ietf:params:oauth:grant-type:jwt-bearer
    client_id    = <from INITIATOR_MT_IAS_CLIENT_ID env var>
    assertion    = <inbound user access_token>
    resource     = urn:sap:identity:application:provider:name:sap-internal
    app_tid      = <from inbound token claims>
    token_format = jwt
  [mTLS: certificate + key from INITIATOR_MT_IAS_CERT / INITIATOR_MT_IAS_KEY]

Prerequisites:
  - Environment variables must be set (provisioned via app.yaml from the
    ``identity-service`` secret -- see sap-agw-spii-implementation skill):
      INITIATOR_MT_IAS_CLIENT_ID, INITIATOR_MT_IAS_CERT, INITIATOR_MT_IAS_KEY
"""

import logging
import os
import ssl
import tempfile

import httpx
from sap_cloud_sdk.ias import parse_token

logger = logging.getLogger(__name__)

AGENT_GATEWAY_RESOURCE = "urn:sap:identity:application:provider:name:sap-internal"


def _load_ias_credentials() -> dict:
    """Load IAS credentials from environment variables.

    Expected env vars (provisioned by the SPII flow's app.yaml from the
    ``identity-service`` secret):

    - ``INITIATOR_MT_IAS_CLIENT_ID``
    - ``INITIATOR_MT_IAS_CERT``
    - ``INITIATOR_MT_IAS_KEY``

    Returns:
        A dict with ``clientid``, ``certificate``, and ``key``.

    Raises:
        RuntimeError: If any required env var is missing.
    """
    client_id = os.getenv("INITIATOR_MT_IAS_CLIENT_ID", "")
    certificate = os.getenv("INITIATOR_MT_IAS_CERT", "")
    key = os.getenv("INITIATOR_MT_IAS_KEY", "")
    if client_id and certificate and key:
        logger.info("IAS credentials loaded from environment variables")
        return {"clientid": client_id, "certificate": certificate, "key": key}

    raise RuntimeError(
        "IAS credentials not found. Set INITIATOR_MT_IAS_CLIENT_ID, "
        "INITIATOR_MT_IAS_CERT, and INITIATOR_MT_IAS_KEY environment variables "
        "(see sap-agw-spii-implementation skill's Deployment Configuration)."
    )


class IASTokenExchange:
    """Exchange an inbound user token for an Agent Gateway scoped access token.

    Uses the JWT-Bearer grant (RFC 7523) with mTLS client authentication
    against the IAS token endpoint derived from the inbound token's issuer.
    """

    def __init__(self):
        creds = _load_ias_credentials()
        self._client_id: str = creds["clientid"]
        self._certificate: str = creds["certificate"]
        self._key: str = creds["key"]

    def _build_ssl_context(self) -> ssl.SSLContext:
        """Build an mTLS SSL context from the PEM cert/key."""
        ctx = ssl.create_default_context()
        with tempfile.NamedTemporaryFile(delete=False, suffix=".crt", mode="w") as f:
            f.write(self._certificate)
            cert_path = f.name
        with tempfile.NamedTemporaryFile(delete=False, suffix=".key", mode="w") as f:
            f.write(self._key)
            key_path = f.name
        try:
            ctx.load_cert_chain(certfile=cert_path, keyfile=key_path)
        finally:
            os.unlink(cert_path)
            os.unlink(key_path)
        return ctx

    async def exchange(self, inbound_token: str) -> str:
        """Exchange the inbound user token for an Agent Gateway scoped token.

        The token exchange is sent to the IAS tenant that issued the inbound
        token (derived from its ``iss`` claim).

        Args:
            inbound_token: The user access_token received on the A2A endpoint.

        Returns:
            An access_token scoped to agent-gateway.

        Raises:
            IASTokenError: If the inbound token is malformed.
            RuntimeError: If the exchange request fails.
        """
        claims = parse_token(inbound_token)
        logger.info(
            "Token exchange: sub=%s app_tid=%s",
            claims.sub,
            claims.app_tid,
        )

        issuer = (claims.iss or "").rstrip("/")
        if not issuer:
            raise RuntimeError(
                "Cannot determine IAS endpoint: inbound token has no 'iss' claim."
            )
        token_url = f"{issuer}/oauth2/token"

        data = {
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "client_id": self._client_id,
            "assertion": inbound_token,
            "resource": AGENT_GATEWAY_RESOURCE,
            "token_format": "jwt",
        }

        app_tid = claims.app_tid
        if app_tid:
            data["app_tid"] = app_tid

        ssl_context = self._build_ssl_context()

        async with httpx.AsyncClient(verify=ssl_context) as client:
            response = await client.post(
                token_url,
                data=data,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

        if response.status_code != 200:
            raise RuntimeError(
                f"IAS token exchange failed: HTTP {response.status_code} -- "
                f"{response.text}"
            )

        body = response.json()
        access_token = body.get("access_token")
        if not access_token:
            raise RuntimeError(f"No access_token in IAS response: {body}")

        result_claims = parse_token(access_token)
        logger.info(
            "Token exchange succeeded: sub=%s app_tid=%s",
            result_claims.sub,
            result_claims.app_tid,
        )
        return access_token
