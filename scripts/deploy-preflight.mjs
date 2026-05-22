/**
 * Pre-deploy env check — names only, never prints secret values.
 * Run: node scripts/deploy-preflight.mjs
 */
import { config as loadEnv } from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: join(root, "src/.env") });
loadEnv({ path: join(root, "src/.env.local"), override: true });

const required = [
  ["VITE_SITE_ORIGIN", (v) => v.startsWith("https://")],
  ["VITE_CLOUDINARY_CLOUD_NAME", (v) => v.length > 0],
  ["ADMIN_API_SECRET", (v) => v.length >= 24],
  ["CORS_ORIGINS", (v) => v.includes("trekora")],
];

const beforeLaunch = [
  ["MONGODB_URI", (v) => v.startsWith("mongodb")],
  ["VITE_CLOUDINARY_UPLOAD_PRESET", (v) => v.length > 0],
];

function check(name, test) {
  const value = String(process.env[name] ?? "").trim();
  const ok = value.length > 0 && test(value);
  return { name, ok, set: value.length > 0 };
}

let exit = 0;
process.stdout.write("[preflight] Required for deploy\n");
for (const [name, test] of required) {
  const r = check(name, test);
  if (!r.ok) exit = 1;
  process.stdout.write(`  ${r.ok ? "✓" : "✗"} ${name}${r.set ? "" : " (missing)"}\n`);
}

process.stdout.write("[preflight] Required before Mongo/API features\n");
for (const [name, test] of beforeLaunch) {
  const r = check(name, test);
  if (!r.ok) exit = 1;
  process.stdout.write(`  ${r.ok ? "✓" : "✗"} ${name}${r.set ? "" : " (missing)"}\n`);
}

process.exit(exit);
