/**
 * Client-safe env accessors — only VITE_* / NEXT_PUBLIC_* belong here.
 * Never add server secrets to this module.
 */

function read(name: string): string {
  return String(import.meta.env[name] ?? "").trim();
}

export function clientEnv(name: string): string {
  if (!name.startsWith("VITE_") && !name.startsWith("NEXT_PUBLIC_")) {
    if (import.meta.env.DEV) {
      console.warn(
        `[env-client] Refusing non-public env key in browser: ${name}`,
      );
    }
    return "";
  }
  return read(name);
}

export function isDev(): boolean {
  return Boolean(import.meta.env.DEV);
}
