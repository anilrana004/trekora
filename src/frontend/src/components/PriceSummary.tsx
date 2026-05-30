import { AnimatePresence, motion } from "motion/react";

type PriceSummaryProps = {
  packageTotal: number;
  gst: number;
  codeDiscount?: number;
  promoSavings?: number;
  bundleSavings?: number;
  grandTotal: number;
};

function formatINR(n: number) {
  return n.toLocaleString("en-IN");
}

export default function PriceSummary({
  packageTotal,
  gst,
  codeDiscount = 0,
  promoSavings = 0,
  bundleSavings = 0,
  grandTotal,
}: PriceSummaryProps) {
  const totalSavings = codeDiscount + promoSavings + bundleSavings;
  const hasCodeDiscount = codeDiscount > 0;

  return (
    <div
      className="rounded-xl p-4 space-y-2 text-sm"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="booking.price_summary"
    >
      <p className="font-bold" style={{ color: "var(--ew-text)" }}>
        Price Summary
      </p>
      <div className="flex justify-between">
        <span style={{ color: "var(--ew-text-lt)" }}>Package Total</span>
        <span>₹{formatINR(packageTotal)}</span>
      </div>
      {bundleSavings > 0 ? (
        <div className="flex justify-between" style={{ color: "#22C55E" }}>
          <span>Bundle savings</span>
          <span>−₹{formatINR(bundleSavings)}</span>
        </div>
      ) : null}
      {promoSavings > 0 ? (
        <div className="flex justify-between" style={{ color: "#22C55E" }}>
          <span>Promo discount</span>
          <span>−₹{formatINR(promoSavings)}</span>
        </div>
      ) : null}
      <AnimatePresence initial={false}>
        {hasCodeDiscount ? (
          <motion.div
            key="code-discount"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex justify-between" style={{ color: "#22C55E" }}>
              <span>Voucher / Gift card</span>
              <span>−₹{formatINR(codeDiscount)}</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex justify-between">
        <span style={{ color: "var(--ew-text-lt)" }}>GST (5%)</span>
        <span>₹{formatINR(gst)}</span>
      </div>
      <div
        className="border-t pt-2 flex justify-between font-bold text-base"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <span>Total Payable</span>
        <span style={{ color: "#E87722", fontSize: 18 }}>
          ₹{formatINR(grandTotal)}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {totalSavings > 0 ? (
          <motion.p
            key="savings-badge"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-semibold text-center rounded-full py-1.5 px-3"
            style={{ background: "#ECFDF5", color: "#15803D" }}
          >
            You&apos;re saving ₹{formatINR(totalSavings)}! 🎉
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
