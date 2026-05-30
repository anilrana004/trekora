/**
 * Single source of truth for Trekora server env — always loads from `src/.env`.
 * Used by Vite dev API, Express discount-api, MongoDB, and Cloudinary admin.
 */
import dns from "dns";
import { config as loadEnvFile } from "dotenv";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Absolute path to trekora/src (contains .env). */
export const TREKORA_ENV_DIR = join(__dirname, "../../src");

let loaded = false;
let dnsConfigured = false;

function trimEnv(name) {
  const raw = process.env[name];
  if (raw == null) return "";
  return String(raw).trim();
}

function configureMongoDnsFromEnv() {
  if (dnsConfigured) return;
  dnsConfigured = true;

  const custom = trimEnv("MONGODB_DNS_SERVERS");
  if (custom) {
    dns.setServers(
      custom
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    );
    return;
  }

  const usePublic =
    trimEnv("MONGODB_USE_PUBLIC_DNS") === "true" ||
    (process.platform === "win32" && trimEnv("MONGODB_URI").startsWith("mongodb+srv://"));

  if (usePublic) {
    dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
  }
}

/**
 * Load `src/.env` then `src/.env.local` (override). Idempotent.
 * @returns {{ loaded: boolean; envDir: string; files: string[] }}
 */
export function loadTrekoraEnv() {
  if (loaded) {
    return { loaded: true, envDir: TREKORA_ENV_DIR, files: [] };
  }

  const files = [];
  const primary = join(TREKORA_ENV_DIR, ".env");
  const local = join(TREKORA_ENV_DIR, ".env.local");

  if (existsSync(primary)) {
    loadEnvFile({ path: primary });
    files.push(primary);
  }
  if (existsSync(local)) {
    loadEnvFile({ path: local, override: true });
    files.push(local);
  }

  loaded = true;
  configureMongoDnsFromEnv();

  return { loaded: true, envDir: TREKORA_ENV_DIR, files };
}

/** Ensure env is loaded before reading secrets (safe to call repeatedly). */
export function ensureTrekoraEnv() {
  return loadTrekoraEnv();
}

/** Trimmed MongoDB URI from env — empty when unset. */
export function getMongoUri() {
  ensureTrekoraEnv();
  return trimEnv("MONGODB_URI");
}

/** Non-secret env readiness for startup logs. */
export function trekoraEnvStatus() {
  ensureTrekoraEnv();
  const mongoUri = getMongoUri();
  const cloudName =
    trimEnv("CLOUDINARY_CLOUD_NAME") || trimEnv("VITE_CLOUDINARY_CLOUD_NAME");
  const cloudKey = trimEnv("CLOUDINARY_API_KEY");
  const cloudSecret = trimEnv("CLOUDINARY_API_SECRET");
  const uploadPreset = trimEnv("VITE_CLOUDINARY_UPLOAD_PRESET");

  return {
    envDir: TREKORA_ENV_DIR,
    mongo: mongoUri
      ? mongoUri.startsWith("mongodb")
        ? "configured"
        : "invalid"
      : "missing",
    cloudinaryServer:
      cloudName && cloudKey && cloudSecret ? "configured" : "partial",
    cloudinaryClient:
      (cloudName || trimEnv("VITE_CLOUDINARY_CLOUD_NAME")) && uploadPreset
        ? "configured"
        : "partial",
  };
}

/** One-line startup diagnostic — never prints secret values. */
export function logTrekoraEnvStatus(label = "trekora-env") {
  const s = trekoraEnvStatus();
  const files = s.envDir;
  process.stdout.write(
    `[${label}] src/.env → MongoDB: ${s.mongo}, Cloudinary server: ${s.cloudinaryServer}, Cloudinary client preset: ${s.cloudinaryClient} (${files})\n`,
  );
  if (s.mongo === "missing") {
    process.stderr.write(
      `[${label}] Add MONGODB_URI to src/.env — reviews and photos API will not work until then.\n`,
    );
  }
}
