# Trekora Security

## Secrets & Git

- Never commit `src/.env`, `src/.env.local`, `env.json`, keys (`.pem`, `.key`), or `secrets/`.
- Copy from `src/.env.example` / `src/frontend/.env.example` only — placeholders, no real credentials.
- Run `node scripts/check-secrets.mjs` before releases; fix or rotate anything it flags.
- If a secret was ever pushed to GitHub: **rotate it immediately**, then consider [GitHub secret scanning](https://docs.github.com/en/code-security/secret-scanning) and history cleanup via `git filter-repo` (requires team coordination).

## Environment variables

| Scope | Prefix | Examples |
|--------|--------|----------|
| Browser (Vite) | `VITE_`, `NEXT_PUBLIC_` | Cloud name, upload preset, public Razorpay key, site URL |
| Server only | no `VITE_` | `MONGODB_URI`, `CLOUDINARY_API_SECRET`, `SMTP_PASS`, `ADMIN_API_SECRET` |

**Never** prefix MongoDB, SMTP passwords, or Cloudinary API secrets with `VITE_`.

## Deployment

See **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** and **[docs/PRODUCTION_CHECKLIST.md](./docs/PRODUCTION_CHECKLIST.md)**.

- **Vercel**: Set client vars with `VITE_*`; set server/API vars without `VITE_` on Railway (or Vercel serverless for `/api`).
- **Railway**: Discount API + MongoDB + SMTP + `ADMIN_API_SECRET` only on the Node service; set `CORS_ORIGINS` to production domains.
- **MongoDB Atlas**: IP allowlist + dedicated DB user with least privilege; rotate URI if leaked.
- **Cloudflare**: SSL Full (strict), bypass cache on `/api/*`, see [docs/CLOUDFLARE.md](./docs/CLOUDFLARE.md).

## Admin access

- Keep `VITE_ADMIN_ENABLED=false` in production unless required.
- Use a long random `ADMIN_API_SECRET` on the API (Railway / server env only). Never set `VITE_ADMIN_SECRET` — it would ship in the public JS bundle.
- Admin unlock stores the typed secret in sessionStorage for the tab; real protection is API `x-admin-secret` + rate limits.

## Client-exposed keys

These may appear in the built JS bundle — treat as public and restrict in provider dashboards:

- `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` (unsigned upload preset)
- `VITE_RAZORPAY_KEY_ID` (public key only; never put Razorpay **secret** in frontend)

**Do not** use `VITE_OPENWEATHER_API_KEY` in production. Set `OPENWEATHER_API_KEY` on the
discount API (Railway) and let the browser call `/api/v1/weather` only.

## Hardening checklist

- Run `pnpm security:check` before every release (tracked-file secret scan).
- Run `pnpm -C src/frontend build` — build fails if secrets appear in `dist/assets/*.js`.
- `dist/env.json` is always `{}` — local `env.json` is never copied to production.
- Vercel sends security headers (CSP, HSTS, frame deny) via `src/frontend/vercel.json`.
- Express API disables `X-Powered-By` and returns minimal JSON errors in production.
- Production JS uses hashed chunk names (no `react-vendor` labels in filenames).

## Reporting

Report security issues privately to the project maintainers; do not open public issues with exploit details or live credentials.
