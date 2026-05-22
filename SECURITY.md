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
- Use a long random `ADMIN_API_SECRET` on the API; avoid reusing the same value in client `VITE_ADMIN_SECRET` if possible.
- Client admin gate is obfuscation only — real protection is API `x-admin-secret` + rate limits.

## Client-exposed keys

These are visible in the built JS bundle by design:

- `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` (unsigned upload preset — restrict in Cloudinary dashboard)
- `VITE_OPENWEATHER_API_KEY` (restrict by HTTP referrer in OpenWeather dashboard)
- `VITE_RAZORPAY_KEY_ID` (public key only; never put Razorpay secret in frontend)

## Reporting

Report security issues privately to the project maintainers; do not open public issues with exploit details or live credentials.
