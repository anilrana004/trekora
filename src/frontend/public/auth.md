# auth.md

You are an agent. Trekora (https://www.trekora.in) supports **agentic registration** for API access: discover → register → use credentials.

## Step 1 — Discover

### 1a. Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
```

Canonical resource: `https://www.trekora.in/api`

### 1b. Authorization Server metadata (includes `agent_auth`)

```http
GET /.well-known/oauth-authorization-server
```

The `agent_auth` block in that document contains:

- `skill` — this file (https://www.trekora.in/auth.md)
- `register_uri` — https://www.trekora.in/oauth/register
- `identity_endpoint` — https://www.trekora.in/oauth/agent/identity
- `claim_endpoint` — https://www.trekora.in/oauth/agent/identity/claim
- `identity_types_supported` — `["anonymous"]`
- `credential_types_supported` — `["none"]`
- `anonymous.credential_types_supported` — `["none"]`
- `anonymous.claim_uri` — https://www.trekora.in/auth.md

## Step 2 — Pick a method

| Method | When to use | Credential |
|--------|-------------|------------|
| `anonymous` | Public read/inquiry APIs | `none` — no bearer token |
| `api_key_header` | Operator moderation only | `x-admin-secret` header |

Public endpoints in [OpenAPI](https://www.trekora.in/.well-known/openapi.json) require **no registration**. Send requests to `https://www.trekora.in/api` without an `Authorization` header.

Operator routes (e.g. `GET /api/reviews/pending`) require `x-admin-secret` — provisioned by Trekora staff only (hello@trekora.in).

## Step 3 — Register (anonymous)

For anonymous public API access, no POST is required. Discovery metadata above is sufficient.

Optional registration endpoint (metadata only; passive scans should not POST):

```http
POST /oauth/agent/identity
Content-Type: application/json

{ "type": "anonymous" }
```

## Discovery links

- [API catalog](https://www.trekora.in/.well-known/api-catalog)
- [OpenAPI spec](https://www.trekora.in/.well-known/openapi.json)
- [API documentation](https://www.trekora.in/docs/api.md)
- [Agent skills index](https://www.trekora.in/.well-known/agent-skills/index.json)

## Content negotiation

Send `Accept: text/markdown` on HTML page requests for markdown representations.

## Contact

- Website: https://www.trekora.in/contact
- Email: hello@trekora.in
