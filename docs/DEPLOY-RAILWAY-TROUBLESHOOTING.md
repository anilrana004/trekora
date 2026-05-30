# Railway + Vercel deployment — troubleshooting & full setup

This guide explains **why Railway might not connect**, how to host the **Mongo API on Railway** and the **React app on Vercel**, and how photos, reviews, and email fit together.

---

## Architecture (production)

| Layer | Host | What runs |
|--------|------|-----------|
| **Frontend** | Vercel | Vite SPA (`src/frontend`) + serverless `/api/*` handlers (`src/frontend/api/*.mjs`) for email |
| **Mongo API** | Railway (optional but recommended) | Express app (`backend/server.js`) — reviews, gallery, vouchers, product photos |
| **Database** | MongoDB Atlas | `reviews`, `productphotos`, vouchers, etc. |
| **Media** | Cloudinary | Upload presets (browser) + optional Admin API (server) |
| **Canister** | Internet Computer | Motoko booking/canister (separate from Railway) |

**Local dev:** `pnpm run dev` (Vite) + `pnpm discount-api` (Express on port 3001) + `src/.env` at repo `src/.env`.

---

## Why Railway “does not connect” (common causes)

### 1. Wrong root directory

Railway must deploy **`backend/`**, not the repo root.

- **Settings → Root Directory:** `backend`
- **Start command:** `node server.js` (or Dockerfile in `backend/Dockerfile`)
- **Health check path:** `/health`

If root is wrong, Railway builds the wrong project or never starts `server.js`.

### 2. `MONGODB_URI` missing or wrong key

The server reads **`MONGODB_URI`** (uppercase). A typo like `mongodb_uri` leaves Mongo disconnected.

- Symptom: `GET https://your-app.up.railway.app/health` returns `{ "ok": true, "mongo": false }`
- Fix: Railway → Variables → `MONGODB_URI` = Atlas connection string (with password URL-encoded)

After fixing, **redeploy** or restart the service (old process keeps old env).

### 3. Atlas network access blocks Railway

Atlas → **Network Access**:

- Add **0.0.0.0/0** (allow anywhere) for Railway’s dynamic IPs, **or**
- Use Atlas **Private Endpoint** / static egress if Railway offers it on your plan.

Symptom: logs show `MongoServerSelectionError` / timeout.

### 4. `PORT` not used (fixed in this repo)

Railway injects `PORT`. `backend/server.js` must listen on `process.env.PORT`. This repo uses:

```js
const port = Number(process.env.PORT) || 3001;
```

Redeploy if you were on an old build that hard-coded 3001 only.

### 5. CORS blocks the browser

If the **browser** calls Railway directly (not via Vercel proxy), set:

```env
CORS_ORIGINS=https://www.trekora.in,https://trekora.in,http://localhost:5173
```

Missing origin → browser shows “failed to fetch” / CORS error in DevTools.

**Current default:** Frontend calls **`/api/...` on the same origin** (Vercel). Those routes are implemented as Vercel serverless functions that import `backend/controllers`. Railway is only required if you **rewrite** `/api/gallery`, `/api/reviews`, etc. to Railway (see below).

### 6. Frontend still points at localhost

Production Vercel must **not** use `VITE_*` URLs pointing to `127.0.0.1:3001` unless you intentionally proxy there.

Check Vercel env: no `VITE_DISCOUNT_API_URL=http://localhost:3001`.

### 7. Service sleeping / build failed

- Railway **Hobby** projects sleep → first request slow or timeout.
- Open **Deployments** → latest deploy **must be green**.
- Open **Logs** for `Error: Cannot find module` → run `npm install` in `backend/` or use Dockerfile.

### 8. Health check misconfigured

Use path **`/health`**, not `/`. Expected JSON:

```json
{ "ok": true, "mongo": true }
```

`mongo: false` means the process runs but Atlas is unreachable or URI is empty.

---

## Step-by-step: Railway (Mongo API)

1. **GitHub** — push `main` (includes `backend/railway.toml`, `backend/Dockerfile`).

2. **New Railway project** → Deploy from repo → set root **`backend`**.

3. **Variables** (Production):

   | Variable | Example / notes |
   |----------|------------------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/trekora?retryWrites=true&w=majority` |
   | `ADMIN_API_SECRET` | 32+ random chars |
   | `CORS_ORIGINS` | `https://www.trekora.in,https://trekora.in` |
   | `CLOUDINARY_CLOUD_NAME` | same as Vite |
   | `CLOUDINARY_API_KEY` | server only |
   | `CLOUDINARY_API_SECRET` | server only |
   | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | optional on Railway if email stays on Vercel |

4. **Deploy** → open public URL → test:

   ```text
   https://YOUR-SERVICE.up.railway.app/health
   ```

5. **Indexes** (once per cluster):

   ```bash
   MONGODB_URI="..." pnpm ensure-indexes
   ```

---

## Step-by-step: Vercel (frontend)

1. Import repo; **Root Directory:** `src/frontend`.

2. **Install** (monorepo from root):

   - Install command: `cd ../.. && pnpm install --prefer-offline`
   - Build: `pnpm build` (runs sitemap + Vite)

3. **Environment variables** (Production):

   | Variable | Purpose |
   |----------|---------|
   | `VITE_SITE_ORIGIN` | `https://www.trekora.in` |
   | `VITE_CLOUDINARY_CLOUD_NAME` | Client uploads |
   | `VITE_CLOUDINARY_UPLOAD_PRESET` | Unsigned preset |
   | `SMTP_*` | Booking, query, callback, corporate-quote emails |
   | `ADMIN_API_SECRET` | Admin routes if used on Vercel |

4. **Redeploy** after env changes.

5. **Sitemap:** Build runs `scripts/generate-sitemap.mjs` → `public/sitemap.xml`. Submit URL in Google Search Console.

---

## Connecting Vercel frontend → Railway API (optional)

`src/frontend/vercel.json` proxies **`/api/reviews`** (including `GET /api/reviews/:slug`) to **`https://api.trekora.in`** because Vercel serverless only handles the exact `/api/reviews` path — dynamic slugs must hit Railway Express.

`/api/gallery` and `/api/product-photos` still use **Vercel serverless** unless you add similar rewrites.

To proxy additional Mongo routes to Railway, extend `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/api/reviews/:path*", "destination": "https://YOUR-SERVICE.up.railway.app/api/reviews/:path*" },
    { "source": "/api/gallery/:path*", "destination": "https://YOUR-SERVICE.up.railway.app/api/gallery/:path*" },
    { "source": "/api/product-photos/:path*", "destination": "https://YOUR-SERVICE.up.railway.app/api/product-photos/:path*" }
  ]
}
```

Keep email routes (`/api/booking`, `/api/query`, `/api/callback`, etc.) on Vercel unless you move SMTP to Railway too.

---

## Photos & gallery flow (no “Cloudinary” shown to users)

1. User uploads on trek/yatra **Photos → Trekker Photos** (or review form).
2. Browser uploads to **Cloudinary** (unsigned preset, folder per product).
3. Frontend POSTs URLs to **`/api/product-photos`** or **`/api/reviews`**.
4. **MongoDB** stores metadata + tags (`trekName`, slug, type).
5. **Gallery** (`/gallery`) and trekker grids refetch via `trekora-gallery-refresh` event + React Query invalidation.

**Requirements:**

- `pnpm discount-api` running locally **or** Vercel/Railway serving `/api/product-photos`
- `MONGODB_URI` set
- `VITE_CLOUDINARY_*` in `src/.env` (dev) / Vercel (prod)

---

## Email flows (all use `/api/*` + SMTP)

| Form | API | Optimistic UI |
|------|-----|----------------|
| Booking submit | `POST /api/booking` | Yes |
| Plan my trek | `POST /api/query` | Yes |
| Contact / Send message | `POST /api/query` | Yes |
| Callback / Call me | `POST /api/callback` | Yes |
| Corporate / school / college quote | `POST /api/corporate-quote` | Yes |
| Get Free Guide (newsletter) | `POST /api/query` | Yes |
| Destination trip plan | `POST /api/query` | Yes |

Set in **`src/.env`** (local) and **Vercel → Environment Variables** (production):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `BOOKING_NOTIFY_EMAIL` / query targets as documented in `SECURITY.md`

---

## Quick diagnostic checklist

```bash
# Local
pnpm deploy:preflight
pnpm discount-api
# → http://127.0.0.1:3001/health  → mongo: true

pnpm -C src/frontend dev
# → upload photo on a trek page → check Gallery
```

**Railway:**

1. `/health` → `mongo: true`
2. `POST /api/product-photos` with valid body (or use site UI)
3. Railway logs: no `MONGODB_URI` / connection errors

**Vercel:**

1. Build succeeds
2. `https://www.trekora.in/sitemap.xml` loads
3. Submit test query on `/contact` → email received

---

## Cloudflare (DNS)

Point `www` and apex to Vercel. Optional: proxy orange-cloud; ensure SSL **Full** and no cached `/api/*` if APIs are on same host.

See `docs/CLOUDFLARE.md` and `docs/DEPLOYMENT.md` for the full checklist.
