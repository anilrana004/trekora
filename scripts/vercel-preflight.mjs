/**
 * Guards against Vercel deploy blockers (edge middleware, import attributes).
 * Run automatically before frontend production builds.
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const frontend = join(root, "src/frontend");

const failures = [];

if (existsSync(join(frontend, "middleware.ts"))) {
  failures.push("Remove src/frontend/middleware.ts — use vercel.json beforeFiles rewrites for markdown.");
}

if (existsSync(join(frontend, "middleware.js"))) {
  failures.push("Remove src/frontend/middleware.js — not supported on this Vite SPA setup.");
}

const agentMarkdown = join(frontend, "api/agent-markdown.mjs");
if (!existsSync(agentMarkdown)) {
  failures.push("Missing src/frontend/api/agent-markdown.mjs");
} else {
  const source = readFileSync(agentMarkdown, "utf8");
  if (/\bwith\s*\{\s*type\s*:/.test(source)) {
    failures.push(
      "agent-markdown.mjs must not use import attributes (with { type: \"json\" }) — Vercel esbuild rejects them.",
    );
  }
  if (!source.includes("readFileSync")) {
    failures.push("agent-markdown.mjs should load routes via readFileSync at runtime.");
  }
}

for (const file of ["vercel.json", "package.json", "tsconfig.json", "tsconfig.app.json"]) {
  if (!existsSync(join(frontend, file))) {
    failures.push(`Missing src/frontend/${file}`);
  }
}

// Root tsconfig must stay API-scoped. Vercel typechecks with this file (no path
// aliases) after packaging serverless functions — including React `src/` causes
// false framer-motion / Radix failures even when `pnpm typecheck` is green.
try {
  const tsconfig = JSON.parse(
    readFileSync(join(frontend, "tsconfig.json"), "utf8"),
  );
  const include = tsconfig.include;
  const includeList = Array.isArray(include) ? include : [include].filter(Boolean);
  const pullsSrc = includeList.some(
    (p) => typeof p === "string" && (p === "src" || p.startsWith("src/") || p.includes("src/**")),
  );
  if (pullsSrc) {
    failures.push(
      "src/frontend/tsconfig.json must not include React src/ (use tsconfig.app.json for the app; keep root tsconfig API-only for Vercel).",
    );
  }
} catch {
  failures.push("src/frontend/tsconfig.json is not valid JSON");
}

if (failures.length) {
  console.error("[vercel-preflight] Deploy blockers found:\n");
  for (const msg of failures) {
    console.error(`  ✗ ${msg}`);
  }
  process.exit(1);
}

console.log("[vercel-preflight] OK — no known Vercel deploy blockers.");
