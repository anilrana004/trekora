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

## DNS for AI Discovery (DNS-AID)

Publish DNS-AID records so agents can discover Trekora endpoints via DNS (draft [DNS-AID](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)). Configure in the Cloudflare DNS dashboard for `trekora.in` (requires DNSSEC on the zone).

| Name | Type | Priority | Target | SvcParams |
|------|------|----------|--------|-----------|
| `_index._agents` | HTTPS or SVCB | 1 | `www.trekora.in` | `alpn="h2,h3" port=443` |
| `_index._agents` | TXT | — | — | `api-catalog=https://www.trekora.in/.well-known/api-catalog` |

Example SVCB record:

```dns
_index._agents.trekora.in. 3600 IN HTTPS 1 www.trekora.in. alpn="h2,h3" port=443
```

Enable **DNSSEC** (Cloudflare → DNS → Settings → DNSSEC → Enable) so validating resolvers receive authenticated discovery data.

### Automated publish (recommended)

From the repo root, with a Cloudflare API token (`Zone.DNS Edit`) and zone ID:

```bash
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ZONE_ID=... node scripts/publish-dns-aid-cloudflare.mjs
```

Dry run:

```bash
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ZONE_ID=... node scripts/publish-dns-aid-cloudflare.mjs --dry-run
```

### Manual (Cloudflare dashboard)

1. DNS → Add record → Type **HTTPS** (or SVCB)
2. Name: `_index._agents`
3. Priority: `1`, Target: `www.trekora.in`, ALPN: `h2,h3`, Port: `443`
4. Add record → Type **TXT**, Name: `_index._agents`, Content: `api-catalog=https://www.trekora.in/.well-known/api-catalog`

After publishing, verify with DNS-over-HTTPS:

```bash
curl -s "https://cloudflare-dns.com/dns-query?name=_index._agents.trekora.in&type=HTTPS" -H "accept: application/dns-json"
```
