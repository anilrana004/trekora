/** Search params for `/book` deep links from trek/yatra/package pages, reels, and CTAs. */

export function bookSearch(params: {
  trek?: string;
  yatra?: string;
  package?: string;
  /** Voucher or gift-card code to auto-apply on the review step. */
  voucher?: string;
  /** Comma-separated booking add-on ids (e.g. `gear` for equipment rental). */
  addons?: string;
  /** Party size from trek/yatra detail (1–20). */
  group?: number;
}): {
  trek: string | undefined;
  yatra: string | undefined;
  package: string | undefined;
  voucher: string | undefined;
  addons: string | undefined;
  group: number | undefined;
} {
  const voucher =
    typeof params.voucher === "string" && params.voucher.trim().length > 0
      ? params.voucher.trim().toUpperCase()
      : undefined;
  const addons =
    typeof params.addons === "string" && params.addons.trim().length > 0
      ? params.addons.trim().toLowerCase()
      : undefined;
  const group =
    typeof params.group === "number" &&
    Number.isFinite(params.group) &&
    params.group >= 1
      ? Math.min(20, Math.floor(params.group))
      : undefined;

  const base = { voucher, addons, group };

  if (params.package) {
    return {
      trek: undefined,
      yatra: undefined,
      package: params.package,
      ...base,
    };
  }
  if (params.yatra) {
    return {
      trek: undefined,
      yatra: params.yatra,
      package: undefined,
      ...base,
    };
  }
  if (params.trek) {
    return {
      trek: params.trek,
      yatra: undefined,
      package: undefined,
      ...base,
    };
  }
  return {
    trek: undefined,
    yatra: undefined,
    package: undefined,
    ...base,
  };
}
