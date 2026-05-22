/** Read gift card fields (supports legacy documents). */
export function normalizeGiftCard(doc) {
  if (!doc) return null;
  const balance = doc.balance ?? doc.remainingBalance ?? 0;
  const active =
    doc.active ??
    (doc.isFullyRedeemed != null ? !doc.isFullyRedeemed : true);
  const expiresAt = doc.expiresAt ?? doc.expiryDate;
  const currency = (doc.currency ?? "INR").toUpperCase();
  return {
    ...doc,
    code: doc.code,
    balance,
    currency,
    active: active && balance > 0,
    expiresAt,
    transactions: doc.transactions ?? [],
  };
}
