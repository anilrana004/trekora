/**
 * Server-side environment validation — never logs secret values.
 */

const SERVER_SECRET_KEYS = [
  "MONGODB_URI",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "SMTP_PASS",
  "ADMIN_API_SECRET",
  "OPENWEATHER_API_KEY",
  "OPENWEATHERMAP_API_KEY",
];

const CLIENT_EXPOSED_PREFIXES = ["VITE_", "NEXT_PUBLIC_"];

export function isProduction() {
  return (
    process.env.NODE_ENV === "production" ||
    process.env.RAILWAY_ENVIRONMENT === "production" ||
    process.env.VERCEL_ENV === "production"
  );
}

/** True when name must never be bundled into the Vite client. */
export function isServerOnlyEnvKey(name) {
  const key = String(name ?? "");
  if (SERVER_SECRET_KEYS.includes(key)) return true;
  if (CLIENT_EXPOSED_PREFIXES.some((p) => key.startsWith(p))) return false;
  return /(SECRET|PASSWORD|PASS|TOKEN|PRIVATE|URI|API_KEY)/i.test(key);
}

/**
 * @param {string} name
 * @param {{ required?: boolean; minLength?: number }} [opts]
 */
export function getEnv(name, opts = {}) {
  const raw = process.env[name];
  const value = raw == null ? "" : String(raw).trim();
  if (opts.required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  if (opts.minLength && value.length > 0 && value.length < opts.minLength) {
    throw new Error(`Environment variable ${name} is too short`);
  }
  return value;
}

/**
 * Startup diagnostics — lists missing optional/required keys by name only.
 * @param {{ requireMongo?: boolean; requireAdmin?: boolean }} [opts]
 */
export function validateServerEnv(opts = {}) {
  const warnings = [];
  const errors = [];

  if (opts.requireMongo && !getEnv("MONGODB_URI")) {
    errors.push("MONGODB_URI");
  }

  if (opts.requireAdmin) {
    const admin = getEnv("ADMIN_API_SECRET");
    if (!admin) errors.push("ADMIN_API_SECRET");
    else if (admin.length < 24) {
      warnings.push("ADMIN_API_SECRET should be at least 24 characters");
    }
  }

  const smtpHost = getEnv("SMTP_HOST");
  const smtpUser = getEnv("SMTP_USER");
  const smtpPass = getEnv("SMTP_PASS");
  if ((smtpHost || smtpUser) && !(smtpHost && smtpUser && smtpPass)) {
    warnings.push("SMTP partially configured (need SMTP_HOST, SMTP_USER, SMTP_PASS)");
  }

  const cKey = getEnv("CLOUDINARY_API_KEY");
  const cSecret = getEnv("CLOUDINARY_API_SECRET");
  if ((cKey && !cSecret) || (!cKey && cSecret)) {
    warnings.push("Cloudinary API credentials incomplete");
  }

  if (isProduction() && getEnv("VITE_ADMIN_SECRET")) {
    warnings.push(
      "VITE_ADMIN_SECRET is client-exposed; prefer ADMIN_API_SECRET server-side only",
    );
  }

  return { ok: errors.length === 0, errors, warnings };
}

export function logEnvValidation(result, label = "env") {
  for (const w of result.warnings) {
    process.stderr.write(`[${label}] warning: ${w}\n`);
  }
  if (!result.ok) {
    process.stderr.write(
      `[${label}] missing required: ${result.errors.join(", ")}\n`,
    );
  }
}
