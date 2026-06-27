# Trekora — Agent & API Access

Trekora (https://www.trekora.in) publishes machine-readable discovery for AI agents and automated clients.

## Public APIs (no registration required)

Read and customer-facing write endpoints under `/api` and `/api/v1` are open without OAuth. See:

- [API catalog](https://www.trekora.in/.well-known/api-catalog) (`application/linkset+json`)
- [OpenAPI spec](https://www.trekora.in/.well-known/openapi.json)
- [API documentation](https://www.trekora.in/docs/api.md)

## Protected operator endpoints

Admin moderation routes (e.g. `GET /api/reviews/pending`) require the `x-admin-secret` request header. These credentials are issued to Trekora operators only and are **not** available via public agent self-registration.

## Content negotiation

Send `Accept: text/markdown` on HTML page requests to receive markdown representations (homepage and key listing pages).

## Agent skills

Browse published skills at [/.well-known/agent-skills/index.json](https://www.trekora.in/.well-known/agent-skills/index.json).

## Browser tools (WebMCP)

When loaded in a WebMCP-capable browser, Trekora registers tools for trek/yatra search and navigation via `navigator.modelContext`.

## Contact

- Website: https://www.trekora.in/contact
- Email: hello@trekora.in
