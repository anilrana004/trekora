# auth.md — Trekora Agent Registration

Trekora (https://www.trekora.in) publishes machine-readable discovery for AI agents and automated clients.

## Audience

AI agents, crawlers, and automated HTTP clients accessing Trekora content and APIs.

## Registration

Public read and customer inquiry APIs require **no registration**. Protected operator routes require an operator-issued `x-admin-secret` header (not available for self-registration).

For OAuth discovery metadata:

- [Protected Resource Metadata](https://www.trekora.in/.well-known/oauth-protected-resource)
- [Authorization Server Metadata](https://www.trekora.in/.well-known/oauth-authorization-server)

### Anonymous access (public APIs)

| Field | Value |
|-------|-------|
| Method | `anonymous` |
| Credential | `none` — no bearer token required |
| Claim URI | https://www.trekora.in/auth.md |
| Register URI | https://www.trekora.in/oauth/register |

Send requests to `https://www.trekora.in/api` without an `Authorization` header for public endpoints listed in [OpenAPI](https://www.trekora.in/.well-known/openapi.json).

### Operator access (admin moderation)

| Field | Value |
|-------|-------|
| Method | `api_key_header` |
| Header | `x-admin-secret` |
| Scope | `trekora.admin` |
| Provisioning | Operator-issued only — email hello@trekora.in |

## Discovery

- [API catalog](https://www.trekora.in/.well-known/api-catalog) (`application/linkset+json`)
- [OpenAPI spec](https://www.trekora.in/.well-known/openapi.json)
- [API documentation](https://www.trekora.in/docs/api.md)
- [Agent skills index](https://www.trekora.in/.well-known/agent-skills/index.json)

## Content negotiation

Send `Accept: text/markdown` on HTML page requests to receive markdown representations (homepage and key listing pages).

## Browser tools (WebMCP)

When loaded in a WebMCP-capable browser, Trekora registers tools for trek/yatra search and navigation via `navigator.modelContext`.

## Contact

- Website: https://www.trekora.in/contact
- Email: hello@trekora.in
