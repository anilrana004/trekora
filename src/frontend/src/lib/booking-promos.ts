/** Featured nav / campaign promos — deep-link to `/book` with `voucher` search param. */

export const CHAR_DHAM_FEATURED = {
  yatraSlug: "char-dham-yatra",
  /** Public promo code (seeded in MongoDB via `pnpm seed`). */
  voucherCode: "CHARDHAM2026",
  /** Marketing “from” price shown in mega-menu (matches ₹35k − ₹10k flat offer). */
  displayFromInr: 25_000,
} as const;

/**
 * 7-day landing flash: 15% off every trek & yatra.
 * Seeded in Mongo via `pnpm seed` — keep `expiresAtIso` in sync with `scripts/seed-discounts.mjs`.
 *
 * Window: 19 Aug 2026 00:00 IST → 26 Aug 2026 00:00 IST (exactly 7 × 24h).
 */
export const LANDING_FLASH_VOUCHER = {
  code: "TREKORA15",
  discountPercent: 15,
  startsAtIso: "2026-08-18T18:30:00.000Z",
  expiresAtIso: "2026-08-25T18:30:00.000Z",
  applicablePackages: ["trek:*", "yatra:*"] as const,
} as const;

export function isLandingFlashVoucherLive(nowMs = Date.now()): boolean {
  const start = Date.parse(LANDING_FLASH_VOUCHER.startsAtIso);
  const end = Date.parse(LANDING_FLASH_VOUCHER.expiresAtIso);
  return (
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    nowMs >= start &&
    nowMs < end
  );
}
