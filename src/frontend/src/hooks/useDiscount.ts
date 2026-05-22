import { useCallback, useState } from "react";
import {
  type DiscountValidationResult,
  type DiscountValidationSuccess,
  validateGiftCardCode,
  validateVoucherCode,
} from "@/lib/discount-api";

export function useDiscount() {
  const [appliedCode, setAppliedCode] = useState("");
  const [discountResult, setDiscountResult] =
    useState<DiscountValidationSuccess | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCode = useCallback(
    async (bookingAmount: number, packageId: string, userId: string, code: string) => {
      const normalized = code.trim().toUpperCase();
      if (!normalized) {
        setError("Enter a voucher or gift card code");
        return;
      }
      setIsValidating(true);
      setError(null);
      try {
        const voucherRes = await validateVoucherCode({
          code: normalized,
          bookingAmount,
          packageId,
          userId,
        });
        if (voucherRes.success) {
          setAppliedCode(normalized);
          setDiscountResult(voucherRes);
          return;
        }

        const giftRes = await validateGiftCardCode({
          code: normalized,
          bookingAmount,
        });
        if (giftRes.success) {
          setAppliedCode(normalized);
          setDiscountResult(giftRes);
          return;
        }

        setDiscountResult(null);
        setAppliedCode("");
        setError(
          giftRes.message ||
            voucherRes.message ||
            "Invalid code — please check and try again",
        );
      } catch {
        setDiscountResult(null);
        setAppliedCode("");
        setError("Unable to validate code right now. Please try again.");
      } finally {
        setIsValidating(false);
      }
    },
    [],
  );

  const removeDiscount = useCallback(() => {
    setAppliedCode("");
    setDiscountResult(null);
    setError(null);
    setIsValidating(false);
  }, []);

  return {
    appliedCode,
    discountResult,
    isValidating,
    error,
    validateCode,
    removeDiscount,
    setError,
  };
}

export type { DiscountValidationResult };
