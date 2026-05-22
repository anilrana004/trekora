# Trekora — Production Architecture

## Target traffic flow

```text
Users
  ↓
Cloudflare (DNS, SSL, CDN, WAF, Brotli, HTTP/3)
  ↓
Vercel — React SPA + serverless `/api/*` (email, optional Mongo proxies)
  ↓
Railway — Express Mongo API (vouchers, gift cards, reviews, gallery metadata)
  ↓
MongoDB Atlas
  ↓
Cloudinary CDN (images/video)
  ↓
ICP Motoko canister (bookings, treks admin, user data) — parallel to Mongo API
```

## Repository layout (logical)

| Path | Role |
|------|------|
| `src/frontend/` | Production UI — React 19, Vite, TanStack Router, Tailwind |
| `backend/` | Express Mongo API — controllers, routes, models, cache, security |
| `src/backend/` | Motoko canister (ICP) |
| `src/frontend/api/` | Vercel serverless handlers (SMTP, re-exports of `backend/controllers`) |
| `shared/` | Cross-package constants (env key names, deploy labels) |
| `docs/` | Deployment, Cloudflare, performance, checklists |
| `scripts/` | Sitemap, seeds, Cloudinary sync, security scan |

A physical `frontend/` rename is **not required** for deploy; Vercel root directory stays `src/frontend`.

## Frontend stack (current production path)

- **Build**: Vite with manual chunks, lazy routes, `SEOHead` + `RoutePageSEO`, build-time `sitemap.xml`.
- **Why not Next.js yet**: Deep ICP (`@dfinity/*`), TanStack Router, and hundreds of pages are bound to the Vite SPA. SSR/SSG parity is achieved via static shell meta in `index.html`, per-route `SEOHead`, and sitemap generation. A phased Next.js migration is documented in [DEPLOYMENT.md](./DEPLOYMENT.md#future-nextjs).

## Backend stack

- Centralized `errorHandler` / `notFoundHandler`
- `asyncHandler` on all route handlers
- In-memory rate limits (single Railway instance; use Redis for horizontal scale)
- `x-admin-secret` admin gate (not JWT — stateless admin for discount/review writes)
- Response caching headers + in-memory `cacheGetOrSet` for gallery/reviews
- API versioning: `/api/v1/*` mirrors `/api/*`

## Security boundaries

| Surface | Protection |
|---------|------------|
| Public reads | Rate limit + cache + mongo sanitize |
| Writes (reviews, photos) | Admin secret + stricter rate limit |
| Booking email | Vercel serverless only, no secrets in client |
| Admin UI | `VITE_ADMIN_ENABLED` + client gate; real auth = API secret |

See [SECURITY.md](../SECURITY.md) and [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md).
