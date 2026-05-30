export type DiscountKind = "voucher" | "giftcard";

export type DiscountValidationSuccess = {
  success: true;
  kind: DiscountKind;
  code: string;
  discountAmount: number;
  finalAmount: number;
  message: string;
  type?: "percent" | "flat";
  value?: number;
  remainingBalance?: number;
  amountToUse?: number;
};

export type DiscountValidationFailure = {
  success: false;
  message: string;
};

export type DiscountValidationResult =
  | DiscountValidationSuccess
  | DiscountValidationFailure;

import { postJsonLenient } from "./api-fetch";

async function postDiscount<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  return postJsonLenient<T>(path, body);
}

export async function validateVoucherCode(payload: {
  code: string;
  bookingAmount: number;
  packageId: string;
  userId: string;
}): Promise<DiscountValidationResult> {
  return postDiscount<DiscountValidationResult>(
    "/api/vouchers/validate",
    payload,
  );
}

export async function validateGiftCardCode(payload: {
  code: string;
  bookingAmount: number;
}): Promise<DiscountValidationResult> {
  const data = await postDiscount<
    DiscountValidationResult & { amountToUse?: number }
  >("/api/giftcards/validate", payload);
  if (data.success && data.kind === "giftcard") {
    return {
      ...data,
      discountAmount: data.amountToUse ?? data.discountAmount,
    };
  }
  return data;
}

export async function markVoucherUsed(payload: {
  code: string;
  userId: string;
  bookingId: string;
}): Promise<{ success: boolean; message?: string }> {
  return postDiscount("/api/vouchers/mark-used", payload);
}

export async function redeemGiftCard(payload: {
  code: string;
  bookingId: string;
  amountUsed: number;
}): Promise<{ success: boolean; message?: string }> {
  return postDiscount("/api/giftcards/redeem", payload);
}
