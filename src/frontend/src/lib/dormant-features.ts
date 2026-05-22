/**
 * Feature flags — implementation stays in the repo; enable via env at build time.
 *
 * Production defaults (all off):
 *   VITE_ENABLE_LOGIN=false
 *   VITE_ENABLE_PAYMENT=false
 *   VITE_ENABLE_EMI=false
 */
function envEnabled(name: string, defaultValue = false): boolean {
  const raw = import.meta.env[name];
  if (raw === undefined || raw === "") return defaultValue;
  return raw === "true" || raw === "1";
}

export const DORMANT_FEATURES = {
  emi: envEnabled("VITE_ENABLE_EMI", false),
  login: envEnabled("VITE_ENABLE_LOGIN", false),
  payment: envEnabled("VITE_ENABLE_PAYMENT", false),
} as const;

export type DormantFeature = keyof typeof DORMANT_FEATURES;

export function isFeatureLive(feature: DormantFeature): boolean {
  return DORMANT_FEATURES[feature];
}
