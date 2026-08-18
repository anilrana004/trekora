import { connectDBSafe } from "../db/connect.js";
import {
  calcVoucherDiscount,
  normalizeVoucher,
  packageIsApplicable,
} from "../lib/voucher-normalize.js";
import { parseJsonBody } from "../lib/parse-body.js";
import { Voucher } from "../models/Voucher.model.js";

function normalizeCode(code) {
  return String(code ?? "")
    .trim()
    .toUpperCase();
}

function mapVoucherError(reason, extra) {
  switch (reason) {
    case "not_found":
      return "Invalid code — please check and try again";
    case "inactive":
      return "This code is not active";
    case "expired":
      return "This code has expired";
    case "max_uses":
      return "This code has reached its usage limit";
    case "min_amount":
      return `Minimum booking amount of ₹${extra?.toLocaleString("en-IN")} required`;
    case "package":
      return "Code not valid for this package";
    case "already_used":
      return "You've already used this code";
    case "unavailable":
      return "Discount service is temporarily unavailable. Please try again.";
    default:
      return "Invalid code — please check and try again";
  }
}

export async function validateVoucherLogic({
  code,
  bookingAmount,
  packageId,
  userId,
}) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: mapVoucherError("unavailable") };
  }

  const normalized = normalizeCode(code);
  const amount = Number(bookingAmount);
  const pkg = String(packageId ?? "").trim();
  const uid = String(userId ?? "").trim();

  if (!normalized) {
    return { success: false, message: mapVoucherError("not_found") };
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return { success: false, message: "Invalid booking amount" };
  }

  const raw = await Voucher.findOne({ code: normalized }).lean();
  if (!raw) {
    return { success: false, message: mapVoucherError("not_found") };
  }

  const voucher = normalizeVoucher(raw);
  if (!voucher.active) {
    return { success: false, message: mapVoucherError("inactive") };
  }
  if (!voucher.expiresAt || new Date() > new Date(voucher.expiresAt)) {
    return { success: false, message: mapVoucherError("expired") };
  }
  if (voucher.maxUses != null && voucher.usedCount >= voucher.maxUses) {
    return { success: false, message: mapVoucherError("max_uses") };
  }
  if (amount < voucher.minBookingAmount) {
    return {
      success: false,
      message: mapVoucherError("min_amount", voucher.minBookingAmount),
    };
  }
  if (!packageIsApplicable(voucher.applicablePackages, pkg)) {
    return { success: false, message: mapVoucherError("package") };
  }
  if (uid && voucher.usedBy.some((u) => u.userId === uid)) {
    return { success: false, message: mapVoucherError("already_used") };
  }

  const discountAmount = calcVoucherDiscount(voucher, amount);
  const finalAmount = Math.max(0, amount - discountAmount);

  return {
    success: true,
    discountAmount,
    finalAmount,
    message: "Voucher applied",
    kind: "voucher",
    code: voucher.code,
    type: voucher.discountType,
    value: voucher.discountValue,
  };
}

export async function markVoucherUsedLogic({ code, userId, bookingId }) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: mapVoucherError("unavailable") };
  }

  const normalized = normalizeCode(code);
  const uid = String(userId ?? "").trim();
  const bid = String(bookingId ?? "").trim();
  if (!normalized || !uid || !bid) {
    return { success: false, message: "Missing code, user, or booking reference" };
  }

  const updated = await Voucher.findOneAndUpdate(
    { code: normalized, active: true },
    {
      $inc: { usedCount: 1 },
      $push: {
        usedBy: { userId: uid, bookingId: bid, usedAt: new Date() },
      },
    },
    { new: true },
  );
  if (!updated) {
    return { success: false, message: "Voucher not found" };
  }
  return { success: true, message: "Voucher marked as used" };
}

export async function validateVoucher(req, res) {
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
    const result = await validateVoucherLogic(body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    process.stderr.write(
      `[voucher] validate error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: mapVoucherError("unavailable"),
    });
  }
}

export async function markVoucherUsed(req, res) {
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
    const result = await markVoucherUsedLogic(body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    process.stderr.write(
      `[voucher] mark-used error: ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: mapVoucherError("unavailable"),
    });
  }
}
