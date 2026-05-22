# Trekora — Production Checklist

Use before launch and after major releases.

## Security

- [ ] `pnpm security:check` passes
- [ ] No `.env` / `env.json` in git
- [ ] `ADMIN_API_SECRET` ≥ 24 chars, only on server
- [ ] `VITE_ADMIN_ENABLED=false` in production
- [ ] `VITE_ENABLE_PAYMENT=false` until Razorpay live keys ready
- [ ] `CORS_ORIGINS` lists only production domains
- [ ] Cloudinary unsigned preset scoped to `trekora/`
- [ ] OpenWeather key restricted by HTTP referrer
- [ ] MongoDB user least-privilege; URI rotated if ever leaked

## Frontend

- [ ] `pnpm -C src/frontend typecheck` clean
- [ ] `pnpm -C src/frontend build` succeeds; `dist/sitemap.xml` present
- [ ] No console errors on Home, Treks, Trek detail, Booking, Admin (if enabled)
- [ ] No React hydration warnings
- [ ] `robots.txt` — `/admin` disallowed
- [ ] Canonical URLs use `VITE_SITE_ORIGIN`
- [ ] Favicons + `site.webmanifest` served
- [ ] Mobile: booking flow usable one-handed
- [ ] Images: lazy + blur placeholders on hero/cards (see lighthouse doc)

## Backend / API

- [ ] Railway `/health` → `mongo: true`
- [ ] `pnpm -C backend ensure-indexes` run after schema changes
- [ ] Rate limits active (429 under abuse test)
- [ ] Admin writes rejected without `x-admin-secret`
- [ ] Gallery/reviews return cache headers

## Booking

- [ ] Voucher validate → book → mark-used (no duplicate redeem)
- [ ] Gift card partial redeem math correct
- [ ] SMTP confirmation sends (or queue logged)
- [ ] Payment step disabled when `VITE_ENABLE_PAYMENT=false`

## SEO

- [ ] `sitemap.xml` submitted in Google Search Console
- [ ] Trek/yatra pages: title, description, OG image
- [ ] JSON-LD on product pages (TouristTrip / BreadcrumbList where implemented)
- [ ] `noindex` on admin and draft routes

## Performance targets (Lighthouse mobile)

| Metric | Target |
|--------|--------|
| Performance | ≥ 95 |
| SEO | 100 |
| Accessibility | ≥ 95 |
| LCP | < 2.5s |
| CLS | < 0.1 |

See [PERFORMANCE.md](./PERFORMANCE.md) and `src/frontend/docs/lighthouse-image-checklist.md`.

## Observability

- [ ] Vercel analytics / Web Vitals enabled
- [ ] Railway logs retained
- [ ] Error tracking (Sentry optional) for API 5xx

## Legal / content (HANDOFF)

- [ ] Real phone/email in `site-contact.ts`
- [ ] Formspree ID replaced
- [ ] DTOI / GST in footer when client provides
