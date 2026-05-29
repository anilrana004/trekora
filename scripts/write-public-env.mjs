#!/usr/bin/env node
/**
 * Writes a safe, empty env.json into dist — never copies local secrets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "src/frontend/dist");
const dest = path.join(distDir, "env.json");

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(dest, "{}\n", "utf8");
process.stdout.write("[write-public-env] Wrote empty dist/env.json (no secrets).\n");
