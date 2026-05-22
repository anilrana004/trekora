# Step 1 — Railway (click-by-click)

## A. Create the project

1. Open [https://railway.app](https://railway.app) → **Login with GitHub**.
2. **+ New Project** → **Deploy from GitHub repo**.
3. Select **`anilrana004/trekora`** (authorize GitHub if asked).
4. Railway creates a service — click it.

## B. Point Railway at the API folder

1. **Settings** tab.
2. **Root Directory** → set to: `backend`
3. **Watch Paths** (optional): `backend/**`
4. Save — Railway redeploys.

## C. Builder (pick one)

**Option 1 — Nixpacks (easiest)**  
Leave builder default. Start command should be: `node server.js`  
(Railway reads `backend/package.json` → `"start": "node server.js"`)

**Option 2 — Dockerfile**  
Settings → Builder → **Dockerfile**  
Path: `backend/Dockerfile` (with root dir `backend`, use `Dockerfile`)

## D. Environment variables

Open **Variables** → **RAW Editor** → paste keys from local `src/.env`:

```
NODE_ENV=production
MONGODB_URI=<paste from src/.env>
ADMIN_API_SECRET=<paste from src/.env>
CORS_ORIGINS=https://www.trekora.in,https://trekora.in
CLOUDINARY_CLOUD_NAME=ddbcauxef
CLOUDINARY_API_KEY=<paste>
CLOUDINARY_API_SECRET=<paste>
MONGODB_USE_PUBLIC_DNS=true
```

Do **not** upload `src/.env` as a file — paste values only.

Railway sets `PORT` automatically; the server listens on it.

## E. Networking

1. **Settings** → **Networking** → **Generate Domain**.
2. Copy the URL, e.g. `https://trekora-production-xxxx.up.railway.app`.

## F. Verify

Open in browser:

```
https://YOUR-RAILWAY-URL.up.railway.app/health
```

Expected JSON:

```json
{"ok":true,"mongo":true}
```

If `mongo: false`:

- Check `MONGODB_URI` in Railway Variables (exact name, uppercase).
- Atlas → **Network Access** → allow `0.0.0.0/0` (or Railway IPs).

## G. Deploy logs

**Deployments** tab → latest deploy → **View Logs**.  
Look for: `Trekora discount API listening` and `[mongodb] connected`.

---

When `/health` is good, continue to **Step 2 — Vercel** in [DEPLOYMENT.md](./DEPLOYMENT.md).
