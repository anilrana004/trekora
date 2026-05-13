import { CheckCircle2, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const INCLUSIONS = [
  "Comfortable accommodation (temple guesthouses, dharamshalas, hotels as per route)",
  "All vegetarian meals during yatra — pure sattvic food (no onion/garlic)",
  "Experienced spiritual guide with Vedic and Puranic knowledge",
  "Darshan arrangement — VIP queue-free darshan wherever available",
  "Transport between all shrines in private AC vehicle",
  "Prasad at each shrine (arranged and offered by guide)",
  "Pujari services for personal abhishek/havan (premium packages)",
  "Medical support — first-aid kit and portable oxygen cylinder",
  "Welcome and farewell ceremonies with spiritual blessings",
  "EternaWings yatra kit — bag, photo ID card, lanyard, guidebook",
  "All permits and entry fees for temples and national parks",
  "Helicopter booking assistance (for applicable yatras)",
];

const EXCLUSIONS = [
  "Personal travel insurance (strongly recommended — available for ₹350)",
  "Air/train tickets to the yatra starting point",
  "Personal puja items (flowers, dhoop, offerings, prasad)",
  "Tips for guides and drivers (voluntary, ₹200–300 per day recommended)",
  "Helicopter charges (available as a separate add-on)",
  "Personal medication and prescription drugs",
  "Meals before and after the yatra period",
  "Porter charges for personal luggage (available at extra cost)",
  "GST 5% on total invoice amount",
  "Any items of personal nature",
  "Shopping at markets and bazaars along the route",
  "Donations to temples (voluntary and at pilgrim's discretion)",
];

const CANCELLATION = [
  {
    range: "30+ days before departure",
    refund: "Full refund",
    color: "var(--ew-green)",
  },
  {
    range: "15–29 days before departure",
    refund: "50% refund",
    color: "var(--ew-orange)",
  },
  {
    range: "7–14 days before departure",
    refund: "25% refund",
    color: "var(--ew-orange)",
  },
  {
    range: "Less than 7 days",
    refund: "No refund",
    color: "var(--ew-red)",
  },
  {
    range: "Cancelled by EternaWings (weather / force majeure)",
    refund: "Full refund or free reschedule",
    color: "var(--ew-green)",
  },
];

export default function YatraInclusions() {
  const [cancelOpen, setCancelOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="section-title">Inclusions &amp; Exclusions</h2>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Inclusions */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "#A5D6A7" }}
        >
          <div
            className="px-5 py-3.5 flex items-center gap-2"
            style={{ backgroundColor: "#E8F5E9" }}
          >
            <CheckCircle2 size={18} style={{ color: "var(--ew-green)" }} />
            <h3
              className="font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--ew-green)" }}
            >
              What&apos;s INCLUDED
            </h3>
          </div>
          <div className="p-4 space-y-2.5">
            {INCLUSIONS.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: INCLUSIONS.indexOf(item) * 0.04 }}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--ew-green)" }}
                />
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "#FFCDD2" }}
        >
          <div
            className="px-5 py-3.5 flex items-center gap-2"
            style={{ backgroundColor: "#FFEBEE" }}
          >
            <XCircle size={18} style={{ color: "var(--ew-red)" }} />
            <h3
              className="font-bold text-sm uppercase tracking-wide"
              style={{ color: "var(--ew-red)" }}
            >
              What&apos;s NOT INCLUDED
            </h3>
          </div>
          <div className="p-4 space-y-2.5">
            {EXCLUSIONS.map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: EXCLUSIONS.indexOf(item) * 0.04 }}
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <XCircle
                  size={14}
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--ew-red)" }}
                />
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <button
          type="button"
          className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
          onClick={() => setCancelOpen((o) => !o)}
          data-ocid="yatra_inclusions.cancellation_toggle"
        >
          <span
            className="font-bold text-sm"
            style={{ color: "var(--ew-text)" }}
          >
            Cancellation Policy
          </span>
          {cancelOpen ? (
            <ChevronUp size={16} style={{ color: "var(--ew-gray-dark)" }} />
          ) : (
            <ChevronDown size={16} style={{ color: "var(--ew-gray-dark)" }} />
          )}
        </button>
        <AnimatePresence>
          {cancelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-2">
                {CANCELLATION.map((row) => (
                  <div
                    key={row.range}
                    className="flex items-start justify-between gap-4 text-sm rounded-lg px-4 py-3"
                    style={{ backgroundColor: "var(--ew-gray-lt)" }}
                  >
                    <span style={{ color: "var(--ew-text-lt)" }}>
                      {row.range}
                    </span>
                    <span
                      className="font-semibold shrink-0"
                      style={{ color: row.color }}
                    >
                      {row.refund}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
