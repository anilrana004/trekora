/** Featured nav / campaign promos — deep-link to `/book` with `voucher` search param. */

export const CHAR_DHAM_FEATURED = {
  yatraSlug: "char-dham-yatra",
  /** Public promo code (seeded in MongoDB via `pnpm seed`). */
  voucherCode: "CHARDHAM2025",
  /** Marketing “from” price shown in mega-menu (matches ₹35k − ₹10k flat offer). */
  displayFromInr: 25_000,
} as const;
