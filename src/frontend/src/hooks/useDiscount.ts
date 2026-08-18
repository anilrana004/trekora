import {
  type DiscountValidationResult,
  type DiscountValidationSuccess,
  validateDiscountCode,
} from "@/lib/discount-api";
import { useCallback, useState } from "react";

export function useDiscount() {
  const [appliedCode, setAppliedCode] = useState("");
  const [discountResult, setDiscountResult] =
    useState<DiscountValidationSuccess | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCode = useCallback(
    async (
      bookingAmount: number,
      packageId: string,
      userId: string,
      code: string,
    ) => {
      const normalized = code.trim().toUpperCase();
      if (!normalized) {
        setError("Enter a voucher or gift card code");
        return;
      }
      setIsValidating(true);
      setError(null);
      try {
        const result = await validateDiscountCode({
          code: normalized,
          bookingAmount,
          packageId,
          userId,
        });
        if (result.success) {
          setAppliedCode(normalized);
          setDiscountResult(result);
          return;
        }
        setDiscountResult(null);
        setAppliedCode("");
        setError(result.message || "Invalid code — please check and try again");
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
