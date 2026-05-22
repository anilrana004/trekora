import { ChevronDown } from "lucide-react";
import { useId } from "react";
import {
  getPhoneCountry,
  normalizeIndianPhoneDigits,
  PHONE_COUNTRIES,
  type PhoneCountry,
} from "@/lib/phone-countries";

export type PhoneInputChangeMeta = {
  iso: string;
  dialCode: string;
};

export type PhoneInputProps = {
  id?: string;
  value: string;
  countryIso?: string;
  onValueChange: (nationalDigits: string) => void;
  onCountryChange?: (meta: PhoneInputChangeMeta) => void;
  hasError?: boolean;
  placeholder?: string;
  disabled?: boolean;
  "data-ocid"?: string;
};

export default function PhoneInput({
  id: idProp,
  value,
  countryIso = "IN",
  onValueChange,
  onCountryChange,
  hasError = false,
  placeholder = "Enter Your Mobile Number",
  disabled = false,
  "data-ocid": dataOcid,
}: PhoneInputProps) {
  const autoId = useId();
  const inputId = idProp ?? autoId;
  const country = getPhoneCountry(countryIso);
  const maxLength = countryIso === "IN" ? 10 : 15;

  const handleCountrySelect = (iso: string) => {
    const next = getPhoneCountry(iso);
    onCountryChange?.({ iso: next.iso, dialCode: next.dial });
    const trimmed =
      iso === "IN"
        ? value.replace(/\D/g, "").slice(0, 10)
        : value.replace(/\D/g, "").slice(0, 15);
    if (trimmed !== value) onValueChange(trimmed);
  };

  return (
    <div
      className={`phone-input${hasError ? " phone-input--error" : ""}`}
      data-ocid={dataOcid}
    >
      <div className="phone-input__country">
        <label htmlFor={`${inputId}-country`} className="sr-only">
          Country code
        </label>
        <span className="phone-input__iso" aria-hidden>
          {country.iso}
        </span>
        <select
          id={`${inputId}-country`}
          value={country.iso}
          disabled={disabled}
          className="phone-input__country-select"
          aria-label="Country calling code"
          onChange={(e) => handleCountrySelect(e.target.value)}
        >
          {PHONE_COUNTRIES.map((c: PhoneCountry) => (
            <option key={c.iso} value={c.iso}>
              {c.iso} +{c.dial}
            </option>
          ))}
        </select>
        <span className="phone-input__dial" aria-hidden>
          {country.dial}
        </span>
        <ChevronDown
          size={16}
          className="phone-input__chevron shrink-0 pointer-events-none"
          aria-hidden
        />
      </div>
      <div className="phone-input__divider" aria-hidden />
      <input
        id={inputId}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        className="phone-input__number"
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");
          const digits =
            countryIso === "IN"
              ? normalizeIndianPhoneDigits(raw)
              : raw.slice(0, maxLength);
          onValueChange(digits);
        }}
      />
    </div>
  );
}
