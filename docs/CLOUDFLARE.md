# Cloudflare — Trekora Production

Configure Cloudflare in front of Vercel (`www.trekora.in`).

## DNS

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `www` | `cname.vercel-dns.com` (or Vercel custom target) | Proxied |
| CNAME / A | `@` | Redirect to `www` (Page Rule or Redirect Rule) | Proxied |

## SSL/TLS

- Mode: **Full (strict)**
- Always Use HTTPS: **ON**
- Minimum TLS: **1.2**
- Automatic HTTPS Rewrites: **ON**
- HSTS: enable after verifying HTTPS everywhere (max-age 12 months, include subdomains, preload when ready)

## Speed

- **Brotli**: ON
- **HTTP/3 (with QUIC)**: ON
- **Early Hints**: ON (pairs with Vercel)
- **Auto Minify**: HTML/CSS/JS ON (JS minify optional if Vercel already minifies)
- **Polish**: Lossless or Lossy (images proxied through Cloudflare only; primary images are Cloudinary URLs — Polish does not apply to external CDN unless proxied)

## Caching

**Cache Rules** (recommended):

1. **Static assets** — URI Path contains `/assets/` → Cache Everything, Edge TTL 1 month, Browser TTL 1 year
2. **Hashed files** — Extension in `js,css,woff2,webp,png,svg,ico` → Cache Everything
3. **HTML / SPA** — Bypass cache (Vercel handles `index.html`; stale HTML breaks deploys)
4. **API** — URI Path starts with `/api/` → Bypass cache

## Security

- **Security Level**: Medium or High
- **Bot Fight Mode**: ON for production
- **Browser Integrity Check**: ON
- **WAF**: Managed ruleset ON
- Custom rule: challenge or block countries if abuse patterns appear (optional)
- Rate limit: `/admin*` — 30 req/min per IP

## Page Rules (legacy) or Redirect Rules

- `http://*` → `https://www.trekora.in` (301)
- `trekora.in/*` → `https://www.trekora.in/$1` (301)

## Cloudinary + Cloudflare

Trek images load from `res.cloudinary.com` directly (not orange-cloud proxied). Benefits:

- Cloudinary transformations (`f_auto`, `q_auto`, responsive widths)
- No double CDN hop

Optional: Cloudflare **Images** not required when Cloudinary is primary.

## Verification

```bash
curl -I https://www.trekora.in
# expect: cf-cache-status, server: cloudflare (when proxied)
```

Check **SSL Labs** rating after HSTS preload consideration.
