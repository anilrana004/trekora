# Deploy — what’s done locally vs what you do in browsers

## Already verified on your machine (agent run)

| Check | Result |
|-------|--------|
| `pnpm security:check` | Pass — no secrets in tracked files |
| `node scripts/deploy-preflight.mjs` | Pass — required env keys set in `src/.env` |
| `pnpm -C src/frontend typecheck` | Pass |
| `pnpm -C src/frontend build` | Pass — sitemap + bundle secret scan OK |
| Git remote | `https://github.com/anilrana004/trekora.git` |

**You still need to push** uncommitted changes before Railway/Vercel pick up the latest code (see Step 0 below).

---

## Step 0 — Push code to GitHub (you, ~5 min)

Railway and Vercel deploy from GitHub, not your laptop.

1. Open terminal in `C:\Users\ASUS\Desktop\trekora`.
2. Run:

   ```powershell
   git status
   ```

3. If you see modified/untracked files you want live:

   ```powershell
   git add -A
   git commit -m "Production deploy: weather API, security, build fixes"
   git push origin main
   ```

4. Open https://github.com/anilrana004/trekora — confirm `main` shows your latest commit.

> Skip commit if you already pushed everything today.

---

## Step 1 — MongoDB Atlas (you, ~15 min)

Only if you do **not** already have a working `MONGODB_URI` in `src/.env`.

1. Go to https://cloud.mongodb.com → sign in.
2. **Database** → **Create** (or use existing cluster).
3. Region: **Mumbai (ap-south-1)** or nearest.
4. Wait until cluster status is **Active**.
5. **Database Access** → **Add New Database User**:
   - Password auth, username e.g. `trekora_api`
   - Role: `readWrite` on database `trekora`
   - Save password somewhere safe.
6. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (`0.0.0.0/0`) → Confirm.
7. **Database** → **Connect** → **Drivers** → copy connection string.
8. Replace `<password>` with URL-encoded password; ensure path ends with `/trekora`.
9. Put in local `src/.env` as `MONGODB_URI=...` (you likely already did — preflight passed).

**After Railway is live**, run once from repo root:

```powershell
$env:MONGODB_URI="<paste same URI>"
pnpm ensure-indexes
```

---

## Step 2 — Railway (you, ~20 min)

### 2.1 Create project

1. https://railway.app → **Login with GitHub**.
2. **+ New Project** → **Deploy from GitHub repo**.
3. Select **anilrana004/trekora**.
4. Click the new **service** (one box in the project).

### 2.2 Root directory (required)

1. Service → **Settings**.
2. **Root Directory** → type exactly: `backend`
3. Save. Wait for redeploy.

### 2.3 Builder

Repo uses Docker (`backend/railway.toml`).

1. **Settings** → **Build** → Builder: **Dockerfile**
2. Dockerfile path: `Dockerfile` (relative to `backend/`)

If Docker build fails in logs, switch to **Nixpacks** and set start command: `node server.js`.

### 2.4 Health check

1. **Settings** → **Deploy** / Healthcheck.
2. Path: `/health`
3. Timeout: `30`

### 2.5 Variables

1. **Variables** tab → **RAW Editor**.
2. Open your local `src/.env` in Notepad (do not commit this file).
3. Copy **values** for these keys into Railway (names must match exactly):

```
NODE_ENV=production
MONGODB_URI=<from src/.env>
ADMIN_API_SECRET=<from src/.env>
CORS_ORIGINS=https://www.trekora.in,https://trekora.in
CLOUDINARY_CLOUD_NAME=<from src/.env>
CLOUDINARY_API_KEY=<from src/.env>
CLOUDINARY_API_SECRET=<from src/.env>
MONGODB_USE_PUBLIC_DNS=true
OPENWEATHER_API_KEY=<from src/.env>
```

4. Save. Railway redeploys automatically.

### 2.6 Public URL

1. **Settings** → **Networking** → **Generate Domain**.
2. Copy URL, e.g. `https://trekora-production-xxxx.up.railway.app`.

### 2.7 Test

Open in browser:

```
https://YOUR-RAILWAY-URL.up.railway.app/health
```

Must show: `{"ok":true,"mongo":true}`

If `mongo: false` → fix `MONGODB_URI` or Atlas network access → **Redeploy**.

### 2.8 Indexes

In PowerShell (repo root):

```powershell
$env:MONGODB_URI="<same as Railway>"
pnpm ensure-indexes
```

**Reply here with:** Railway health URL result (`mongo: true` or error text).

---

## Step 3 — Vercel (you, ~25 min)

Do this **after** Railway `/health` works (or in parallel if you prefer).

### 3.1 Import

1. https://vercel.com → log in with GitHub.
2. **Add New** → **Project** → import **anilrana004/trekora**.

### 3.2 Root & build settings

| Field | Value |
|-------|--------|
| Root Directory | `src/frontend` |
| Framework | Vite |
| Install Command | `cd ../.. && pnpm install --prefer-offline` |
| Build Command | `pnpm build` |
| Output Directory | `dist` |

### 3.3 Environment variables

**Settings** → **Environment Variables** → **Production**.

From `src/.env`, add **every** key below (same values as local).  
Use `https://www.trekora.in` for `VITE_SITE_ORIGIN` if domain is ready; otherwise use Vercel preview URL first, then change and redeploy.

**VITE_ (client):**

- `VITE_SITE_ORIGIN`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_ADMIN_ENABLED` = `false`
- `VITE_ENABLE_LOGIN` = `false`
- `VITE_ENABLE_PAYMENT` = `false`
- `VITE_ENABLE_EMI` = `false`
- Optional: `VITE_GOOGLE_MAP_EMBED_SRC`, `VITE_GOOGLE_MAP_EMBED_PB`, `VITE_RAZORPAY_KEY_ID`

**Server (no VITE_ prefix):**

- `MONGODB_URI`
- `ADMIN_API_SECRET` (same as Railway)
- `OPENWEATHER_API_KEY`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`, `SMTP_TLS_REJECT_UNAUTHORIZED`, `SMTP_FROM`, `ADMIN_EMAIL`

Do **not** add `VITE_OPENWEATHER_API_KEY` in production.

### 3.4 Deploy

1. Click **Deploy**.
2. Wait for green **Ready**.
3. Open `https://your-project.vercel.app` — home page loads.
4. Test `.../sitemap.xml` and submit a contact form (SMTP).

**Any `VITE_*` change requires Redeploy** (not just save).

**Reply here with:** Vercel deployment URL or build error log (last 20 lines).

---

## Step 4 — Custom domain (you, ~30 min + DNS wait)

Assumes domain **trekora.in** on Cloudflare. Adjust names if different.

### 4.1 Vercel

1. Project → **Settings** → **Domains**.
2. Add `www.trekora.in` → note the **CNAME target** Vercel shows.
3. Add `trekora.in` (apex) → note **A** `76.76.21.21` or instructions.
4. Set **www.trekora.in** as **Primary**.
5. Enable redirect **trekora.in → www.trekora.in**.

### 4.2 Cloudflare DNS

1. https://dash.cloudflare.com → zone **trekora.in** → **DNS**.
2. Add **CNAME** `www` → Vercel CNAME target → **Proxied** (orange).
3. Add **A** `@` → `76.76.21.21` → **Proxied** (or follow Vercel apex instructions).
4. **SSL/TLS** → **Full (strict)**.
5. **Always Use HTTPS** → ON.

Wait 5–30 minutes. Vercel **Domains** should show green **Valid**.

### 4.3 Update env after domain works

1. Vercel: `VITE_SITE_ORIGIN` = `https://www.trekora.in` → **Redeploy**.
2. Railway: `CORS_ORIGINS` = `https://www.trekora.in,https://trekora.in` → redeploy if changed.

### 4.4 Cloudflare cache (recommended)

**Cache Rules:**

- `/assets/*` → cache
- `/api/*` → bypass cache
- HTML / `/` → bypass cache

**Reply here with:** Does `https://www.trekora.in` load? (yes/no + any SSL error)

---

## Step 5 — Final checks (you, ~10 min)

| URL | Expected |
|-----|----------|
| Railway `.../health` | `mongo: true` |
| `https://www.trekora.in/` | Site loads |
| `https://www.trekora.in/sitemap.xml` | XML |
| Contact form | Email received |

---

## What the agent cannot do

- Log into Railway, Vercel, Atlas, Cloudflare
- Paste your secrets into hosting dashboards
- Change DNS at your registrar
- Push to GitHub without your commit approval

## Next message from you

Do **Step 0** (push), then **Step 2** (Railway). Send back:

1. Railway `/health` JSON (or screenshot text)
2. Any red error from Railway **Deploy Logs**

Then we continue with Vercel + domain together.
