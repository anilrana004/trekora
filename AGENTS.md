# Project Guidance

## User Preferences

- **Quality bar**: Production-grade, world-class travel platform — premium UI/UX, scalable architecture, security, performance, SEO, and accessibility. Think like a senior full-stack engineer + architect + UX + DevOps + security combined.
- **Before any change**: Analyze dependencies; never break existing behavior; prefer minimal, focused diffs; reuse existing patterns and components.
- **While implementing**: Mobile-first responsive design; smooth animations and spacing; robust validation and error handling on backend; clean modular code; run typecheck/lint when touching code.
- **After implementing**: Polished, deployment-ready result; verify related flows still work.

## Engineering Standards

When implementing features, fixes, or UI updates:

1. **Think first** — Understand the system and dependencies before editing.
2. **Production mindset** — Validation, auth, rate limits, error handling, and security on backend; performance and maintainability everywhere.
3. **UI/UX** — Premium, modern, accessible; consistent spacing, motion, and responsiveness; reusable components.
4. **Safety** — Do not regress existing functionality; keep folder structure and conventions consistent with the codebase.
5. **Verify** — Use verified commands below (typecheck, build) after substantive frontend/backend changes.

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

**Security** (from repo root):

- **secret scan**: `pnpm security:check` — fails if tracked files match secret patterns (no values printed). See `SECURITY.md`.

## Learnings

- Production deploy docs live in `docs/` (Vercel + Railway + Cloudflare). Frontend stays Vite SPA at `src/frontend/`; Mongo API at `backend/`.
- Run `pnpm ensure-indexes` after MongoDB schema changes. API routes are mirrored at `/api/v1/*`.
- **Listing pages** (treks, yatras, gallery, etc.): use `components/listing/` exports — `ListingStickyToolbar` + `ListingToolbarRegions` + page-specific filters. Shared CSS lives under `.listing-sticky-toolbar*` in `index.css`. New listing routes must be registered in `lib/listing-scroll-chrome.ts` for mobile navbar swap.
- **Security**: Never commit `.env` / `env.json`. Server secrets use `OPENWEATHER_API_KEY`, `ADMIN_API_SECRET`, etc. without `VITE_`. Run `pnpm security:check` and frontend build (bundle scan) before release. See `SECURITY.md` and `COPYRIGHT.md`.
