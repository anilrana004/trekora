# Trekora REST API

Machine-readable discovery for Trekora's public HTTP APIs.

## Discovery

- API catalog (RFC 9727): `GET /.well-known/api-catalog` — `Accept: application/linkset+json`
- OpenAPI 3.1: `GET /.well-known/openapi.json`
- Human docs: `GET /docs/api.md`
- Health (Railway): `GET https://api.trekora.in/health`

## Base URLs

| Surface | URL |
|---------|-----|
| Same-origin (Vercel) | `https://www.trekora.in/api` |
| Versioned alias | `https://www.trekora.in/api/v1` |
| Direct Mongo API | `https://api.trekora.in` |

Reviews slug routes on `www.trekora.in` are proxied to `api.trekora.in`.

## Authentication

Public read/write endpoints listed in OpenAPI do not require OAuth. Admin moderation endpoints require the `x-admin-secret` header (operator-only; not available for agent self-registration).

See `/auth.md` for agent usage policy.

## Rate limits

Write endpoints are rate-limited. Prefer caching GET responses and avoid polling.
