# Environment variables — copy into Vercel & Railway

Load values from your local `src/.env` (never commit that file).

## Railway (root directory: `backend`)

| Key | Notes |
|-----|--------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | Atlas connection string |
| `ADMIN_API_SECRET` | Same as local `src/.env` |
| `CORS_ORIGINS` | `https://www.trekora.in,https://trekora.in` |
| `CLOUDINARY_CLOUD_NAME` | `ddbcauxef` |
| `CLOUDINARY_API_KEY` | Server only |
| `CLOUDINARY_API_SECRET` | Server only |

Health check path: `/health`

## Vercel (root directory: `src/frontend`)

**Build**

- Install: `cd ../.. && pnpm install --prefer-offline`
- Build: `pnpm build`

**Environment** — add every key from `src/.env`:

- All `VITE_*` variables
- All `SMTP_*`, `MONGODB_URI`, `ADMIN_API_SECRET`, `CLOUDINARY_*` (for `/api` serverless routes)

Production flags:

```
VITE_ADMIN_ENABLED=false
VITE_ENABLE_PAYMENT=false
VITE_ENABLE_LOGIN=false
```
