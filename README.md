# Trekora

Premium Himalayan trekking and yatra platform (Uttarakhand & Himachal Pradesh). React + Vite frontend, Motoko canister backend, Cloudinary media.

**Live domain:** [trekora.in](https://www.trekora.in)

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, TanStack Router, Tailwind, Motion |
| Backend | Motoko (ICP canister) |
| Media | Cloudinary |
| Deploy | Vercel (SPA) + Railway (Mongo API) + ICP |
| Docs | [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) — production setup |

## Quick start

```bash
# From repo root
pnpm install --prefer-offline

# Copy env template and add your keys (Cloudinary, optional APIs)
cp src/.env.example src/.env

# Frontend dev server
pnpm dev
```

Open the URL Vite prints (default `http://127.0.0.1:5173`).

## Environment

Vite loads env from `src/.env` (see `src/.env.example` and `src/frontend/.env.example`).

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_ORIGIN` | Canonical URL for SEO, sitemap, JSON-LD |
| `VITE_ADMIN_ORIGIN` | Admin subdomain (`https://admin.trekora.in`) |
| `VITE_CLOUDINARY_CLOUD_NAME` | Image CDN |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Client uploads (admin/gallery) |
| `VITE_ENABLE_LOGIN` / `PAYMENT` / `EMI` | Feature flags (`false` in production) |
| `VITE_ADMIN_ENABLED` | Admin UI routes (unlock uses server `ADMIN_API_SECRET`) |
| `VITE_OPENWEATHER_API_KEY` | Weather widget (optional) |
| `VITE_RAZORPAY_KEY_ID` | Payments when enabled (optional) |

Secrets (`CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) must never use the `VITE_` prefix.

## Commands

**Root**

```bash
pnpm dev          # Frontend dev
pnpm build        # Workspace build
pnpm bindgen      # Regenerate ICP actor bindings
```

**Frontend** (`src/frontend/`)

```bash
pnpm install --prefer-offline
pnpm typecheck
pnpm fix          # Biome lint/format
pnpm build        # Sitemap + Vite production build
```

**Backend** (`src/backend/`)

```bash
mops install
mops check --fix
mops build
```

## Design system

See [DESIGN.md](./DESIGN.md) — brand red `#C0001C`, orange `#E87722`, DM Sans, navy footer `#1A1A2E`.

## Cloudinary media sync

After setting `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in `src/.env`:

```bash
node scripts/sync-cloudinary-images.mjs      # list account → cloudinary-media.json
node scripts/apply-cloudinary-to-data.mjs    # treks, yatras, gallery
node scripts/apply-cloudinary-destinations-blogs.mjs
```

Existing curated trek/yatra Cloudinary URLs are kept; only Unsplash placeholders are replaced from your upload batches.

## PDF itineraries

Trek/yatra itinerary PDFs are generated client-side (`src/frontend/src/lib/pdfGenerator.ts`). Full chat specification: [pdf-itinerary-full-changelog.md](./src/frontend/docs/pdf-itinerary-full-changelog.md).

## Production deployment

Full guide: **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** (Vercel, Railway, Atlas, Cloudinary, Cloudflare).

```bash
pnpm security:check
pnpm -C src/frontend build
pnpm ensure-indexes   # after MongoDB is connected
```

Checklist: [docs/PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md).

## Client handoff

See [HANDOFF.md](./HANDOFF.md) for Formspree ID, real photos, testimonials, and registration numbers.

## Restore note

This repo was rebuilt from Cursor session history. The app shell, routes, data, and PDF work are in `src/frontend/`. Paste Cloudinary/Razorpay keys into `src/.env` — they are not stored in git.
