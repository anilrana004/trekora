# Trekora — Production Deployment

Step-by-step guide for **Vercel (frontend)** + **Railway (Mongo API)** + **MongoDB Atlas** + **Cloudinary** + **Cloudflare**.

## Prerequisites

- GitHub repo connected to Vercel and Railway
- Domain on Cloudflare (e.g. `trekora.in`)
- MongoDB Atlas cluster (M10+ for production traffic)
- Cloudinary production cloud
- ICP canister deployed (existing Motoko flow)

Run before every release:

```bash
pnpm security:check
pnpm typecheck
pnpm -C src/frontend build
```

---

## 1. MongoDB Atlas

1. Create a cluster in **Mumbai** (`ap-south-1`) or nearest to users.
2. Database user: least privilege (`readWrite` on `trekora` DB only).
3. Network access: allow Railway egress IPs or `0.0.0.0/0` with strong password (prefer IP allowlist when Railway provides static egress).
4. Copy connection string → `MONGODB_URI` (never `VITE_` prefix).
5. After first deploy:

```bash
pnpm -C backend ensure-indexes
```

---

## 2. Railway (Mongo / discount API)

1. New project → **Deploy from GitHub** → set **Root Directory** to `backend`.
2. Use `backend/Dockerfile` or Nixpacks with start command: `node server.js`.
3. **Variables** (Production):

| Variable | Required | Notes |
|----------|----------|-------|
| `NODE_ENV` | yes | `production` |
| `MONGODB_URI` | yes | Atlas URI |
| `ADMIN_API_SECRET` | yes | ≥24 random chars |
| `CORS_ORIGINS` | yes | `https://www.trekora.in,https://trekora.in` |
| `CLOUDINARY_API_KEY` | if admin uploads | Server only |
| `CLOUDINARY_API_SECRET` | if admin uploads | Server only |
| `SMTP_*` | optional | Booking/query mail on Vercel uses these too |

4. Health check path: `/health` (returns `{ ok, mongo }`).
5. Copy public Railway URL → use in Vercel rewrites **or** keep Mongo routes on Vercel serverless (current default: controllers run on Vercel via `src/frontend/api/*.mjs`).

**Dual hosting note**: Gallery/voucher/review routes are imported from `backend/controllers` into Vercel. For heavy traffic, point `vercel.json` rewrites for `/api/gallery` etc. to Railway URL instead of serverless.

---

## 3. Vercel (frontend)

1. Import repo; set **Root Directory** to `src/frontend`.
2. **Build command**: `pnpm build` (from frontend package — runs sitemap + Vite).
3. **Install**: from monorepo root, use:

   - Install Command: `cd ../.. && pnpm install --prefer-offline`
   - Build Command: `pnpm build` (with root `src/frontend`)

   Or configure Vercel monorepo: root `pnpm-workspace.yaml`, app path `src/frontend`.

4. **Environment variables** (Production):

| Variable | Example |
|----------|---------|
| `VITE_SITE_ORIGIN` | `https://www.trekora.in` |
| `VITE_ADMIN_ORIGIN` | `https://admin.trekora.in` |
| `VITE_CLOUDINARY_CLOUD_NAME` | your cloud |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | unsigned preset (restricted folder) |
| `VITE_ADMIN_ENABLED` | `false` |
| `VITE_ENABLE_LOGIN` | `false` |
| `VITE_ENABLE_PAYMENT` | `false` |
| `MONGODB_URI` | for serverless `/api/*` |
| `ADMIN_API_SECRET` | same as Railway |
| `SMTP_*` | mail routes |

5. Custom domains: `www.trekora.in` (storefront), `admin.trekora.in` (admin UI, same project), apex redirect to www.
6. `vercel.json` already sets SPA fallback, security headers, and long-cache hashed assets.
7. On Railway, include `https://admin.trekora.in` in `CORS_ORIGINS` if the admin UI calls the Railway API.

---

## 4. Cloudinary

1. Enable **Auto format** (`f_auto`) and **Auto quality** (`q_auto`) — already applied in `src/frontend/src/lib/images/cloudinary-url.ts`.
2. Restrict **unsigned upload preset** to folder `trekora/` and max file size.
3. Enable CDN caching; optional **Advanced Fetches** for responsive breakpoints.
4. CNAME (optional): `images.trekora.in` via Cloudflare → Cloudinary.

---

## 5. Cloudflare

See [CLOUDFLARE.md](./CLOUDFLARE.md). Summary:

- Orange-cloud proxy for Vercel
- SSL: Full (strict)
- Brotli + HTTP/3 ON
- Cache static assets aggressively; bypass cache for `/api/*`
- WAF managed rules + rate limiting on `/admin`

---

## 6. ICP canister

Unchanged from existing workflow:

```bash
mops build   # from src/backend
dfx deploy   # per your network
pnpm bindgen # refresh frontend actor bindings
```

Set canister IDs in Vercel env (`CANISTER_*` / `DFX_*` as per `vite.config.js`).

---

## 7. Post-deploy verification

- [ ] `https://www.trekora.in/health` or Railway `/health` → `mongo: true`
- [ ] `https://www.trekora.in/sitemap.xml` loads
- [ ] `robots.txt` disallows `/admin`
- [ ] Lighthouse on Home + Trek detail (see [PERFORMANCE.md](./PERFORMANCE.md))
- [ ] Booking test with voucher validate (no double-submit)
- [ ] `pnpm security:check` clean

---

## Future: Next.js

A full App Router migration would enable native SSR metadata and `next/image`. Planned approach:

1. Stand up `apps/web` (Next) with read-only marketing pages first.
2. Proxy ICP and Mongo APIs unchanged.
3. Migrate trek/yatra detail routes with `generateMetadata` + JSON-LD.
4. Keep admin on Vite until feature parity.

Until then, production SEO is handled by static `index.html`, `SEOHead`, build-time sitemap, and structured data on detail pages.
