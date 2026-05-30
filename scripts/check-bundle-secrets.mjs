#!/usr/bin/env node
/**
 * Scans production JS bundles for accidental secret patterns.
 * Run after `pnpm -C src/frontend build`.
 */
import fs from "node:fs";
import path from "node:path";
import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "src/frontend/dist/assets");
const envPath = path.join(root, "src/.env");

loadEnv({ path: envPath });
loadEnv({ path: path.join(root, "src/.env.local"), override: true });

const RULES = [
  { id: "mongodb-uri", re: /mongodb(\+srv)?:\/\/[^\s"'`]+/i },
  { id: "aws-key", re: /AKIA[0-9A-Z]{16}/ },
  { id: "private-key", re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { id: "cloudinary-secret", re: /CLOUDINARY_API_SECRET[=:][^\s"'`]{8,}/i },
  { id: "smtp-pass", re: /SMTP_PASS[=:][^\s"'`]{4,}/i },
  {
    id: "razorpay-secret",
    re: /rzp_(live|test)_[A-Za-z0-9]{20,}/,
  },
  { id: "openweather-in-bundle", re: /appid=[a-f0-9]{32}/i },
];

/** Env values that must never appear in client bundles (from src/.env at build time). */
const FORBIDDEN_IN_BUNDLE = [
  "MONGODB_URI",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_API_KEY",
  "SMTP_PASS",
  "ADMIN_API_SECRET",
  "OPENWEATHER_API_KEY",
  "OPENWEATHERMAP_API_KEY",
  "VITE_OPENWEATHER_API_KEY",
  "VITE_OPENWEATHERMAP_KEY",
  "VITE_ADMIN_SECRET",
];

if (!fs.existsSync(assetsDir)) {
  process.stderr.write(
    "[check-bundle] dist/assets missing — run frontend build first.\n",
  );
  process.exit(1);
}

const hits = [];
const bundleText = [];

for (const file of fs.readdirSync(assetsDir)) {
  if (!file.endsWith(".js")) continue;
  const text = fs.readFileSync(path.join(assetsDir, file), "utf8");
  bundleText.push({ file, text });
  for (const rule of RULES) {
    if (rule.re.test(text)) {
      hits.push({ file, rule: rule.id });
      rule.re.lastIndex = 0;
    }
  }
}

for (const name of FORBIDDEN_IN_BUNDLE) {
  const value = String(process.env[name] ?? "").trim();
  if (value.length < 8) continue;
  for (const { file, text } of bundleText) {
    if (text.includes(value)) {
      hits.push({ file, rule: `env-leak:${name}` });
    }
  }
}

if (hits.length > 0) {
  process.stderr.write("[check-bundle] Possible secrets in client bundles:\n");
  for (const h of hits) {
    process.stderr.write(`  - assets/${h.file} (${h.rule})\n`);
  }
  process.exit(1);
}

process.stdout.write("[check-bundle] No secret patterns in dist/assets.\n");
