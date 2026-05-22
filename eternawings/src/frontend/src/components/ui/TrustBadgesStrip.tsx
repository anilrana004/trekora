import { Mountain, Phone, Shield, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const BADGES = [
  { Icon: Mountain, label: "40+ Treks & Yatras" },
  { Icon: Users, label: "5,000+ Happy Trekkers" },
  { Icon: Star, label: "4.9 / 5 Rated" },
  { Icon: Shield, label: "DTOI Registered" },
  { Icon: Phone, label: "24/7 Trek Support" },
];

/** Injected directly under the homepage hero — scroll-snap row on small screens. */
export default function TrustBadgesStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="w-full border-y border-black/10 bg-[var(--ew-white)] py-5"
      data-ocid="home.trust_badges"
    >
      <div className="scrollbar-hide mx-auto flex max-w-6xl flex-nowrap items-center justify-start gap-0 overflow-x-auto px-4 md:justify-center md:overflow-visible">
        {BADGES.map(({ Icon, label }, i) => (
          <div key={label} className="flex shrink-0 items-center">
            {i > 0 && (
              <span
                className="hidden h-8 w-px bg-black/10 md:inline-block"
                aria-hidden
              />
            )}
            <div className="flex min-w-max items-center gap-3 px-5 md:px-6">
              <Icon
                size={20}
                strokeWidth={2}
                style={{ color: "var(--ew-orange)" }}
                aria-hidden
              />
              <span
                className="text-sm font-medium"
                style={{ color: "var(--ew-text)" }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
