import { bookSearch } from "@/lib/book-search";
import { isFeatureLive } from "@/lib/dormant-features";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface EMICalculatorProps {
  price: number;
  trekName: string;
  /** Deep-link prefill on `/book` when opened from a trek or yatra page. */
  bookTrekSlug?: string;
  bookYatraSlug?: string;
}

const RAZORPAY_LOGO = (
  <svg
    width="60"
    height="14"
    viewBox="0 0 120 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Razorpay"
    role="img"
  >
    <title>Razorpay</title>
    <path
      d="M13.5 0L0 28h8l3-7h8l1 7h8L22 0h-8.5zm-1 15l4-9 2 9h-6zM30 2v26h7V2h-7zm12 0v26h7V2h-7zm12 5c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 5c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm14-5v26h7v-8h3l5 8h8l-6-9c3-1 5-4 5-7 0-5-4-10-10-10h-12zm7 5h5c2 0 3 1 3 3s-1 3-3 3h-5V12zm18-5v26h7v-8l8-18h-8l-4 10-4-10h-9zm20 0v26h7V7h-7z"
      fill="#528FF0"
    />
  </svg>
);

export default function EMICalculator({
  price,
  trekName,
  bookTrekSlug,
  bookYatraSlug,
}: EMICalculatorProps) {
  const [open, setOpen] = useState(false);
  const bookLinkSearch = bookSearch({
    trek: bookTrekSlug,
    yatra: bookYatraSlug,
  });

  if (!isFeatureLive("emi") || price <= 8000) {
    return null;
  }

  const emi3 = Math.ceil(price / 3);
  const emi6 = Math.ceil(price / 6);
  const emi12 = Math.ceil(price / 12);

  const plans = [
    { label: "3 months", emi: emi3, months: 3 },
    { label: "6 months", emi: emi6, months: 6 },
    { label: "12 months", emi: emi12, months: 12 },
  ];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--ew-gray-mid)" }}
      data-ocid="trek_detail.emi_calculator"
    >
      {/* Header toggle */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
        style={{
          backgroundColor: open ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
        }}
        data-ocid="trek_detail.emi_calculator.toggle"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">💳</span>
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--ew-text)" }}
          >
            Pay in Easy EMIs
          </span>
          {RAZORPAY_LOGO}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} style={{ color: "var(--ew-orange)" }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-3 space-y-3">
              {/* EMI rows */}
              {plans.map((plan) => (
                <div
                  key={plan.months}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: "var(--ew-orange-lt)",
                    border: "1px solid rgba(232,119,34,0.2)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--ew-orange)",
                        color: "#fff",
                      }}
                    >
                      {plan.label}
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      ₹{plan.emi.toLocaleString("en-IN")}/month
                    </span>
                  </div>
                  <Link
                    to="/book"
                    search={bookLinkSearch}
                    className="text-xs font-semibold px-3 py-1 rounded-full transition-colors"
                    style={{
                      backgroundColor: "var(--ew-orange)",
                      color: "#fff",
                    }}
                    data-ocid={`trek_detail.emi_book_button.${plan.months}`}
                  >
                    Book
                  </Link>
                </div>
              ))}

              {/* Book with EMI CTA */}
              <Link
                to="/book"
                search={bookLinkSearch}
                className="btn-primary w-full justify-center text-sm py-2.5"
                style={{ borderRadius: "0.5rem" }}
                data-ocid="trek_detail.emi_book_button"
              >
                Book {trekName} with EMI
              </Link>

              <p
                className="text-[11px] text-center"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                *EMI subject to bank charges. Final amount may vary.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
