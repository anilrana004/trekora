/**
 * Cross-package environment key names (documentation + scripts).
 * Never put secret values here.
 */

export const CLIENT_ENV_PREFIXES = ["VITE_", "NEXT_PUBLIC_"];

export const SERVER_SECRET_KEYS = [
  "MONGODB_URI",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "SMTP_PASS",
  "ADMIN_API_SECRET",
];

export const PRODUCTION_CLIENT_FLAGS = {
  VITE_ADMIN_ENABLED: "false",
  VITE_ENABLE_LOGIN: "false",
  VITE_ENABLE_PAYMENT: "false",
  VITE_ENABLE_EMI: "false",
};

export const DEPLOY_LABELS = {
  frontend: "src/frontend",
  mongoApi: "backend",
  canister: "src/backend",
};
