#!/usr/bin/env node
/**
 * Scans tracked/staged text files for likely secret patterns.
 * Does not print matched secret values — only file paths and rule ids.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const RULES = [
  { id: "mongodb-uri", re: /mongodb(\+srv)?:\/\/[^\s'"]+/i },
  { id: "aws-key", re: /AKIA[0-9A-Z]{16}/ },
  { id: "private-key-block", re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { id: "cloudinary-secret-assign", re: /CLOUDINARY_API_SECRET\s*=\s*[^\s#]+/i },
  { id: "smtp-pass-assign", re: /SMTP_PASS\s*=\s*[^\s#]+/i },
  { id: "generic-api-secret", re: /(?:api[_-]?secret|client[_-]?secret)\s*[:=]\s*['"][^'"]{8,}['"]/i },
];

const ALLOWLIST_FILES = new Set([
  "scripts/check-secrets.mjs",
  "SECURITY.md",
  "src/.env.example",
  "src/frontend/.env.example",
  "eternawings/src/frontend/.env.example",
]);

const BINARY_EXT = /\.(png|jpe?g|gif|webp|ico|woff2?|ttf|eot|pdf|zip|wasm)$/i;

function listCandidateFiles() {
  let files = [];
  try {
    const out = execSync("git ls-files -z", { cwd: root, encoding: "utf8" });
    files = out.split("\0").filter(Boolean);
  } catch {
    files = [];
  }
  return files.filter((f) => !BINARY_EXT.test(f));
}

const hits = [];

for (const rel of listCandidateFiles()) {
  if (ALLOWLIST_FILES.has(rel.replace(/\\/g, "/"))) continue;
  const abs = path.join(root, rel);
  let text;
  try {
    text = fs.readFileSync(abs, "utf8");
  } catch {
    continue;
  }
  for (const rule of RULES) {
    if (rule.re.test(text)) {
      hits.push({ file: rel, rule: rule.id });
      rule.re.lastIndex = 0;
    }
  }
}

if (hits.length > 0) {
  process.stderr.write(
    "[check-secrets] Potential secrets in tracked files (rotate if real):\n",
  );
  for (const h of hits) {
    process.stderr.write(`  - ${h.file} (${h.rule})\n`);
  }
  process.exit(1);
}

process.stdout.write("[check-secrets] No secret patterns in tracked files.\n");
