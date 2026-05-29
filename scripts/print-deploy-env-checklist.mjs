/**
 * Prints which env keys to set on Railway vs Vercel (names only, no values).
 * Run: node scripts/print-deploy-env-checklist.mjs
 */
import { config as loadEnv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: join(root, "src/.env") });
loadEnv({ path: join(root, "src/.env.local"), override: true });

const railway = [
  "NODE_ENV",
  "MONGODB_URI",
  "ADMIN_API_SECRET",
  "CORS_ORIGINS",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "MONGODB_USE_PUBLIC_DNS",
  "OPENWEATHER_API_KEY",
];

const vercelVite = [
  "VITE_SITE_ORIGIN",
  "VITE_CLOUDINARY_CLOUD_NAME",
  "VITE_CLOUDINARY_UPLOAD_PRESET",
  "VITE_ADMIN_ENABLED",
  "VITE_ENABLE_LOGIN",
  "VITE_ENABLE_PAYMENT",
  "VITE_ENABLE_EMI",
  "VITE_GOOGLE_MAP_EMBED_SRC",
  "VITE_GOOGLE_MAP_EMBED_PB",
  "VITE_RAZORPAY_KEY_ID",
];

const vercelServer = [
  "MONGODB_URI",
  "ADMIN_API_SECRET",
  "OPENWEATHER_API_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_SECURE",
  "SMTP_TLS_REJECT_UNAUTHORIZED",
  "SMTP_FROM",
  "ADMIN_EMAIL",
];

function status(name) {
  const v = String(process.env[name] ?? "").trim();
  return v.length > 0 ? "✓ set locally" : "✗ missing in src/.env";
}

process.stdout.write("\n=== Railway (root: backend) ===\n");
for (const k of railway) {
  process.stdout.write(`  ${status(k)}  ${k}\n`);
}

process.stdout.write("\n=== Vercel — VITE_* (rebuild after change) ===\n");
for (const k of vercelVite) {
  process.stdout.write(`  ${status(k)}  ${k}\n`);
}

process.stdout.write("\n=== Vercel — server (no VITE_) ===\n");
for (const k of vercelServer) {
  process.stdout.write(`  ${status(k)}  ${k}\n`);
}

process.stdout.write(
  "\nCopy values from src/.env into each dashboard RAW editor.\n",
);
