import { connectDBSafe } from "../db/connect.js";
import { normalizeGiftCard } from "../lib/giftcard-normalize.js";
import { parseJsonBody } from "../lib/parse-body.js";
import { GiftCard } from "../models/GiftCard.model.js";

function normalizeCode(code) {
  return String(code ?? "")
    .trim()
    .toUpperCase();
}

function mapGiftCardError(reason) {
  switch (reason) {
    case "not_found":
      return "Invalid code — please check and try again";
    case "inactive":
      return "This gift card is not active";
    case "expired":
      return "This code has expired";
    case "redeemed":
      return "This gift card has been fully redeemed";
    case "unavailable":
      return "Discount service is temporarily unavailable. Please try again.";
    default:
      return "Invalid code — please check and try again";
  }
}

export async function validateGiftCardLogic({ code, bookingAmount }) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: mapGiftCardError("unavailable") };
  }

  const normalized = normalizeCode(code);
  const amount = Number(bookingAmount);

  if (!normalized) {
    return { success: false, message: mapGiftCardError("not_found") };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, message: "Invalid booking amount" };
  }

  const raw = await GiftCard.findOne({ code: normalized }).lean();
  if (!raw) {
    return { success: false, message: mapGiftCardError("not_found") };
  }

  const card = normalizeGiftCard(raw);
  if (!card.active || card.balance <= 0) {
    return { success: false, message: mapGiftCardError("redeemed") };
  }
  if (!card.expiresAt || new Date() > new Date(card.expiresAt)) {
    return { success: false, message: mapGiftCardError("expired") };
  }

  const amountToUse = Math.min(card.balance, amount);
  const finalAmount = Math.max(0, amount - amountToUse);
  const remainingBalance = card.balance - amountToUse;

  return {
    success: true,
    discountAmount: amountToUse,
    amountToUse,
    finalAmount,
    remainingBalance,
    message: "Gift card applied",
    kind: "giftcard",
    code: card.code,
    currency: card.currency,
  };
}

export async function redeemGiftCardLogic({ code, bookingId, amountUsed }) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: mapGiftCardError("unavailable") };
  }

  const normalized = normalizeCode(code);
  const bid = String(bookingId ?? "").trim();
  const used = Number(amountUsed);

  if (!normalized || !bid || !Number.isFinite(used) || used <= 0) {
    return {
      success: false,
      message: "Missing code, booking reference, or amount",
    };
  }

  const card = await GiftCard.findOne({ code: normalized });
  if (!card) {
    return { success: false, message: "Gift card not found" };
  }

  const state = normalizeGiftCard(card.toObject());
  if (!state.active || state.balance <= 0) {
    return { success: false, message: mapGiftCardError("redeemed") };
  }
  if (!state.expiresAt || new Date() > new Date(state.expiresAt)) {
    return { success: false, message: mapGiftCardError("expired") };
  }
  if (used > state.balance) {
    return { success: false, message: "Amount exceeds gift card balance" };
  }

  const balanceBefore = state.balance;
  const balanceAfter = balanceBefore - used;
  card.balance = balanceAfter;
  card.active = balanceAfter > 0;
  card.transactions.push({
    bookingId: bid,
    amountUsed: used,
    balanceBefore,
    balanceAfter,
    usedAt: new Date(),
  });
  await card.save();

  return {
    success: true,
    message: "Gift card redeemed",
    remainingBalance: balanceAfter,
  };
}

export async function validateGiftCard(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method && req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  let body;
  try {
    body = await parseJsonBody(req);
  } catch {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  try {
    const result = await validateGiftCardLogic(body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    process.stderr.write(
      `[giftcard] validate error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: mapGiftCardError("unavailable"),
    });
  }
}

export async function redeemGiftCard(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method && req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  let body;
  try {
    body = await parseJsonBody(req);
  } catch {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  try {
    const result = await redeemGiftCardLogic(body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    process.stderr.write(
      `[giftcard] redeem error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: mapGiftCardError("unavailable"),
    });
  }
}
