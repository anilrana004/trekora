/** Mirror of src/lib/phone-countries.ts — normalize Indian mobile for API validation. */
export function normalizeIndianPhoneDigits(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  while (digits.startsWith("0") && digits.length > 10) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function parseIndianMobile(raw) {
  const digits = normalizeIndianPhoneDigits(raw);
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}
