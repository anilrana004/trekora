/** `/book` query params — shared by router and booking page (avoids router import cycle). */
export type BookSearchParams = {
  trek?: string;
  yatra?: string;
  package?: string;
  voucher?: string;
  addons?: string;
  group?: number;
};

export function validateBookSearch(
  raw: Record<string, unknown>,
): BookSearchParams {
  return {
    trek:
      typeof raw.trek === "string" && raw.trek.length > 0
        ? raw.trek
        : undefined,
    yatra:
      typeof raw.yatra === "string" && raw.yatra.length > 0
        ? raw.yatra
        : undefined,
    package:
      typeof raw.package === "string" && raw.package.length > 0
        ? raw.package
        : undefined,
    voucher:
      typeof raw.voucher === "string" && raw.voucher.trim().length > 0
        ? raw.voucher.trim().toUpperCase()
        : undefined,
    addons:
      typeof raw.addons === "string" && raw.addons.trim().length > 0
        ? raw.addons.trim().toLowerCase()
        : undefined,
    group: (() => {
      const rawGroup = raw.group;
      const n =
        typeof rawGroup === "number"
          ? rawGroup
          : typeof rawGroup === "string" && /^\d+$/.test(rawGroup.trim())
            ? Number.parseInt(rawGroup.trim(), 10)
            : Number.NaN;
      if (!Number.isFinite(n) || n < 1) return undefined;
      return Math.min(20, Math.floor(n));
    })(),
  };
}
