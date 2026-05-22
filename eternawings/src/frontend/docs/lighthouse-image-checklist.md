# Lighthouse + Image Verification Checklist

Use this checklist after image/system changes to confirm production quality.

## 1) Test Scope

Run audits for these routes at minimum:

- `/` (home)
- one trek detail page
- one yatra detail page
- `/gallery`
- `/booking`
- `/dashboard`
- `/about`
- `/corporate`

Test on:

- mobile (primary)
- desktop (secondary)

## 2) Run Conditions

- production build (`pnpm build` + preview/serve)
- throttled network (Fast 3G/4G profile)
- clean browser profile / disabled extensions
- each page run 2-3 times, use median values

## 3) Target Metrics

- Lighthouse Performance: `>= 90`
- Largest Contentful Paint (LCP): `< 2.5s` (mobile target)
- Cumulative Layout Shift (CLS): `< 0.1`
- Total image bytes reduced vs previous baseline

## 4) Image-Specific Checks

- responsive `srcset` present on non-blob/data images
- `sizes` attribute aligns with layout behavior
- hero/LCP images use `priority` only when truly above-the-fold
- no unintended upscaling (verify requested width roughly matches rendered width)
- Cloudinary delivery includes `f_auto` and `q_auto`
- repeat visits show cache reuse (network panel)

## 5) UX Integrity Checks

- no visual/layout drift from original design
- animations still smooth and timing unchanged
- no broken images across cards, galleries, avatars, banners
- no lightbox or hover regressions

## 6) SEO Checks

- image `alt` text meaningful for content images
- OG/Twitter images resolve via optimized URL helper
- crawlable pages still expose expected meta image tags

## 7) Evidence to Capture

For each tested page capture:

- Lighthouse report screenshot or JSON export
- LCP element screenshot
- network summary (total bytes + image bytes)
- before/after comparison table for LCP, CLS, Performance

## 8) Quick Triage Guide

If LCP is high:

- confirm hero image variant and `priority` usage
- reduce hero requested width where safe
- verify no blocking scripts are delaying paint

If CLS is high:

- ensure fixed dimensions or stable `fill` container height
- check late-loading fonts/components affecting layout

If image bytes are high:

- verify Cloudinary cloud name env is set in runtime
- inspect URLs for `f_auto,q_auto,w_*`
- validate variant width ladder and `sizes`
