# Trekora — Performance Guide

## Frontend (Vite SPA)

### Already in place

- Route-level `lazy()` + `Suspense` (`router.tsx`)
- Manual Rollup chunks: react, router, query, motion, charts, maps
- Cloudinary `f_auto`, `q_auto`, responsive `srcset` (`OptimizedImage.tsx`)
- Blur placeholders via `e_blur` LQIP URLs
- Gallery lazy loading + masonry deferred paint
- Vercel long-cache headers for hashed `/assets/*`

### Recommended practices

1. **Hero images**: use `loading="eager"` only above-the-fold; defer gallery grids.
2. **Prefetch**: TanStack Router `preload` on trek card hover (optional enhancement).
3. **Motion**: prefer `transform` / `opacity` for GPU-friendly animations.
4. **Maps / 3D**: keep Leaflet and Three.js in separate chunks (already split).

### Core Web Vitals

| Vital | Tactic |
|-------|--------|
| LCP | Hero `OptimizedImage` variant `hero`, width ≤ 1920, preload critical font |
| CLS | Explicit `width`/`height` or aspect-ratio on cards |
| INP | Avoid heavy sync work on booking step transitions |
| TBT | Defer recharts on admin analytics until route active |

## Backend

- `compression` middleware (gzip/brotli where supported)
- In-memory cache for gallery list (90s TTL)
- `lean()` queries on Mongoose reads
- Indexes via `ensure-indexes.mjs`

## Media

- Never block render on full gallery fetch — skeleton first
- `includeCloudinary=0` when folder scan not needed
- Video: `OptimizedVideo` lazy + poster frame

## Build analysis

```bash
cd src/frontend && pnpm build
# Inspect dist/assets/*.js sizes; keep largest chunk < 500kb gzipped where possible
```

## Lighthouse run

1. Production URL or `pnpm preview` after build
2. Mobile emulation, throttled 4G
3. Fix regressions per `src/frontend/docs/lighthouse-image-checklist.md`
