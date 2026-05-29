#!/usr/bin/env node
/**
 * Scans production JS bundles for accidental secret patterns.
 * Run after `pnpm -C src/frontend build`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/frontend/dist/assets");

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

if (!fs.existsSync(assetsDir)) {
  process.stderr.write(
    "[check-bundle] dist/assets missing — run frontend build first.\n",
  );
  process.exit(1);
}

const hits = [];
for (const file of fs.readdirSync(assetsDir)) {
  if (!file.endsWith(".js")) continue;
  const text = fs.readFileSync(path.join(assetsDir, file), "utf8");
  for (const rule of RULES) {
    if (rule.re.test(text)) {
      hits.push({ file, rule: rule.id });
      rule.re.lastIndex = 0;
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
