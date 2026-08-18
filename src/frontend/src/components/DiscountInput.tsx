import { useDiscount } from "@/hooks/useDiscount";
import { CTA_NAV_PRIMARY, ctaMerge } from "@/lib/cta-buttons";
import type { DiscountValidationSuccess } from "@/lib/discount-api";
import { Loader2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type DiscountInputProps = {
  bookingAmount: number;
  packageId: string;
  userId: string;
  onDiscountApplied: (result: DiscountValidationSuccess) => void;
  onDiscountRemoved: () => void;
  /** When set (e.g. from `/book?voucher=`), show as already applied without re-entry. */
  prefilledResult?: DiscountValidationSuccess | null;
};

function formatINR(n: number) {
  return n.toLocaleString("en-IN");
}

function savingsLabel(result: DiscountValidationSuccess): string {
  if (result.kind === "giftcard") {
    return `₹${formatINR(result.discountAmount)} used`;
  }
  const pct =
    result.type === "percent" && result.value != null
      ? ` (${result.value}% OFF)`
      : "";
  return `You save ₹${formatINR(result.discountAmount)}${pct}`;
}

export default function DiscountInput({
  bookingAmount,
  packageId,
  userId,
  onDiscountApplied,
  onDiscountRemoved,
  prefilledResult = null,
}: DiscountInputProps) {
  const {
    appliedCode,
    discountResult,
    isValidating,
    error,
    validateCode,
    removeDiscount,
    setError,
  } = useDiscount();
  const [input, setInput] = useState("");
  const prefillSynced = useRef(false);

  useEffect(() => {
    if (!prefilledResult?.success) {
      prefillSynced.current = false;
      return;
    }
    if (prefillSynced.current) return;
    prefillSynced.current = true;
    setInput(prefilledResult.code);
  }, [prefilledResult]);

  const inpBase =
    "min-w-0 w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]";

  const handleApply = useCallback(async () => {
    await validateCode(bookingAmount, packageId, userId, input);
  }, [validateCode, bookingAmount, packageId, userId, input]);

  const handleRemove = useCallback(() => {
    prefillSynced.current = false;
    removeDiscount();
    setInput("");
    onDiscountRemoved();
  }, [removeDiscount, onDiscountRemoved]);

  useEffect(() => {
    if (!discountResult || prefillSynced.current) return;
    onDiscountApplied(discountResult);
  }, [discountResult, onDiscountApplied]);

  const activeResult =
    discountResult ?? (prefilledResult?.success ? prefilledResult : null);
  const activeCode = appliedCode || prefilledResult?.code || "";

  if (activeResult) {
    return (
      <div
        className="rounded-xl p-4 space-y-1"
        style={{
          background: activeResult.kind === "giftcard" ? "#F3E8FF" : "#ECFDF5",
          border: `1px solid ${activeResult.kind === "giftcard" ? "#C4B5FD" : "#86EFAC"}`,
        }}
        data-ocid="booking.discount.applied"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="text-sm font-bold"
              style={{
                color: activeResult.kind === "giftcard" ? "#6D28D9" : "#15803D",
              }}
            >
              {activeResult.kind === "giftcard" ? "🎁" : "✅"} {activeCode}{" "}
              applied
            </p>
            <p
              className="text-sm mt-0.5"
              style={{
                color: activeResult.kind === "giftcard" ? "#5B21B6" : "#166534",
              }}
            >
              {savingsLabel(activeResult)}
              {activeResult.kind === "giftcard" &&
              activeResult.remainingBalance != null ? (
                <span>
                  {" "}
                  · ₹{formatINR(activeResult.remainingBalance ?? 0)} remaining
                </span>
              ) : null}
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg transition-colors hover:bg-black/5"
            aria-label="Remove discount code"
            data-ocid="booking.discount.remove_button"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative z-[1] space-y-2"
      data-ocid="booking.discount.input_block"
    >
      <p
        className="text-[13px] font-medium"
        style={{ color: "var(--ew-text)" }}
      >
        🏷️ Have a voucher or gift card?
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value.toUpperCase());
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              void handleApply();
            }
          }}
          placeholder="Enter code e.g. TREKORA15"
          disabled={isValidating}
          className={`${inpBase} sm:flex-1 ${error ? "border-[#C0001C] ring-2 ring-[#C0001C]/20" : ""}`}
          style={{ minHeight: 48 }}
          autoComplete="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "discount-error" : undefined}
          data-ocid="booking.discount.code_input"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void handleApply();
          }}
          disabled={isValidating || !input.trim()}
          className={ctaMerge(
            CTA_NAV_PRIMARY,
            "shrink-0 w-full sm:w-auto min-h-12 px-6",
          )}
          data-ocid="booking.discount.apply_button"
        >
          {isValidating ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden />
              Checking...
            </>
          ) : (
            "Apply"
          )}
        </button>
      </div>
      {error ? (
        <p
          id="discount-error"
          className="text-xs font-medium"
          style={{ color: "#C0001C" }}
          role="alert"
          data-ocid="booking.discount.error"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
