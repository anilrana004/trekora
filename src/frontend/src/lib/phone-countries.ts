export type PhoneCountry = {
  iso: string;
  label: string;
  dial: string;
};

/** Common countries for Himalayan travel enquiries (India default). */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso: "IN", label: "India", dial: "91" },
  { iso: "US", label: "United States", dial: "1" },
  { iso: "GB", label: "United Kingdom", dial: "44" },
  { iso: "AE", label: "UAE", dial: "971" },
  { iso: "SG", label: "Singapore", dial: "65" },
  { iso: "AU", label: "Australia", dial: "61" },
  { iso: "CA", label: "Canada", dial: "1" },
  { iso: "DE", label: "Germany", dial: "49" },
  { iso: "FR", label: "France", dial: "33" },
  { iso: "NP", label: "Nepal", dial: "977" },
  { iso: "BD", label: "Bangladesh", dial: "880" },
  { iso: "LK", label: "Sri Lanka", dial: "94" },
  { iso: "QA", label: "Qatar", dial: "974" },
  { iso: "SA", label: "Saudi Arabia", dial: "966" },
  { iso: "MY", label: "Malaysia", dial: "60" },
];

export function getPhoneCountry(iso: string): PhoneCountry {
  return (
    PHONE_COUNTRIES.find((c) => c.iso === iso) ?? PHONE_COUNTRIES[0]
  );
}

export function formatPhoneForDisplay(
  nationalDigits: string,
  iso: string,
): string {
  const country = getPhoneCountry(iso);
  const digits = nationalDigits.replace(/\D/g, "");
  if (!digits) return "";
  return `+${country.dial} ${digits}`;
}

/**
 * Normalize Indian mobile input: strips +91 / 91 prefix and a leading 0
 * (e.g. 07579143847 → 7579143847). Caps at 10 national digits.
 */
export function normalizeIndianPhoneDigits(raw: string): string {
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

export function validateNationalPhone(
  nationalDigits: string,
  iso: string,
): true | string {
  if (iso === "IN") {
    const digits = normalizeIndianPhoneDigits(nationalDigits);
    if (!digits) return "Mobile number is required";
    if (!/^[6-9]\d{9}$/.test(digits)) {
      return "Enter valid 10-digit mobile number";
    }
    return true;
  }

  const digits = nationalDigits.replace(/\D/g, "");
  if (!digits) return "Mobile number is required";

  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number";
  }
  return true;
}

export function isNationalPhoneValid(
  nationalDigits: string,
  iso: string,
): boolean {
  return validateNationalPhone(nationalDigits, iso) === true;
}

/** Parse free-form tel input (+91, leading 0, spaces) into 10-digit Indian mobile or null. */
export function parseIndianMobileInput(raw: string): string | null {
  const digits = normalizeIndianPhoneDigits(raw);
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  return null;
}
