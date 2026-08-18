/** Read voucher fields (supports legacy documents from earlier schema). */
export function normalizeVoucher(doc) {
  if (!doc) return null;
  const discountType = doc.discountType ?? doc.type ?? "percent";
  const discountValue = doc.discountValue ?? doc.value ?? 0;
  const active = doc.active ?? doc.isActive ?? true;
  const expiresAt = doc.expiresAt ?? doc.expiryDate;
  return {
    ...doc,
    code: doc.code,
    discountType,
    discountValue,
    minBookingAmount: doc.minBookingAmount ?? 0,
    active,
    expiresAt,
    maxDiscountAmount: doc.maxDiscountAmount ?? null,
    applicablePackages: doc.applicablePackages ?? [],
    maxUses: doc.maxUses ?? null,
    usedCount: doc.usedCount ?? 0,
    usedBy: doc.usedBy ?? [],
  };
}

/**
 * Empty list = every package. Exact ids match, and `trek:*` / `yatra:*` wildcards
 * cover a whole product kind (packageId is `kind:slug`).
 */
export function packageIsApplicable(applicablePackages, packageId) {
  const list = Array.isArray(applicablePackages) ? applicablePackages : [];
  if (list.length === 0) return true;
  const pkg = String(packageId ?? "").trim();
  if (!pkg) return false;
  if (list.includes(pkg)) return true;
  const sep = pkg.indexOf(":");
  if (sep <= 0) return false;
  const kind = pkg.slice(0, sep);
  return list.includes(`${kind}:*`);
}

export function calcVoucherDiscount(voucher, bookingAmount) {
  const v = normalizeVoucher(voucher);
  let discount =
    v.discountType === "percent"
      ? Math.round((bookingAmount * v.discountValue) / 100)
      : Math.round(v.discountValue);
  if (
    v.maxDiscountAmount != null &&
    v.maxDiscountAmount > 0 &&
    discount > v.maxDiscountAmount
  ) {
    discount = v.maxDiscountAmount;
  }
  discount = Math.min(discount, bookingAmount);
  return Math.max(0, discount);
}
