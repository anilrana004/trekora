import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const PACKAGES = [
  {
    name: "Explorer",
    tagline: "Solo & Small Group",
    icon: "🎒",
    price: "From ₹5,999",
    popular: false,
    features: [
      "Standard tent accommodation",
      "Basic meals (dal-chawal, maggi)",
      "Certified guide (1:8 ratio)",
      "Forest permits included",
      "First-aid kit",
      "Emergency support",
    ],
    notIncluded: ["Porter", "Premium meals", "Photography", "Drone footage"],
  },
  {
    name: "Adventurer",
    tagline: "Most Popular Choice",
    icon: "⛰️",
    price: "From ₹9,999",
    popular: true,
    features: [
      "Premium camping tents",
      "All meals (4 course on trek)",
      "Expert guide + porter",
      "Forest permits included",
      "First-aid + oxygen cylinder",
      "Trek photography included",
      "Trekking poles provided",
      "Certificate of completion",
    ],
    notIncluded: ["Drone photography", "Private group"],
  },
  {
    name: "Summit",
    tagline: "Premium Experience",
    icon: "👑",
    price: "From ₹18,999",
    popular: false,
    features: [
      "Luxury tents + sleeping bags",
      "Gourmet meals + chef",
      "Dedicated guide + cook + porter",
      "Forest permits included",
      "Medical kit + oxygen",
      "Professional photography",
      "Drone footage + video",
      "Certificate + memento",
      "Private group (max 8)",
      "Pre-trek fitness consultation",
    ],
    notIncluded: [],
  },
];

const SEASONAL = [
  {
    season: "☀️ Summer (Apr–Jun)",
    desc: "Ideal for high passes and alpine meadows. Clear skies, blooming rhododendrons.",
    treks: [
      "Roopkund Trek",
      "Hampta Pass",
      "Pin Parvati Pass",
      "Valley of Flowers",
    ],
    color: "var(--ew-orange-lt)",
    accent: "var(--ew-orange)",
  },
  {
    season: "🌧️ Monsoon (Jul–Sep)",
    desc: "Valley of Flowers peaks, lush green forests, waterfall-lined trails.",
    treks: ["Valley of Flowers", "Kheerganga", "Har Ki Dun", "Kedarnath"],
    color: "#e3f2fd",
    accent: "#1565c0",
  },
  {
    season: "❄️ Winter (Nov–Feb)",
    desc: "Snow-laden trails, silent ridges, stunning winter sunrises.",
    treks: [
      "Brahmatal Trek",
      "Kedarkantha",
      "Triund Snow Trek",
      "Chopta Tungnath",
    ],
    color: "#e8eaf6",
    accent: "#3949ab",
  },
];

export default function PackagesPage() {
  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div
        className="py-16 text-center"
        style={{
          background: "var(--ew-white)",
          borderBottom: "3px solid var(--ew-red)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "var(--ew-red)" }}
          >
            Choose Your Adventure
          </span>
          <h1 className="section-title mt-2 mx-auto block">
            Curated Trek Packages
          </h1>
          <p
            className="mt-4 text-sm max-w-xl mx-auto"
            style={{ color: "var(--ew-text-lt)" }}
          >
            From budget-friendly to ultra-premium — EternaWings has a perfect
            package for every trekker.
          </p>
        </motion.div>
      </div>

      {/* Featured banner */}
      <div className="py-4" style={{ background: "var(--ew-orange)" }}>
        <div className="container mx-auto px-4 text-center text-white text-sm font-bold flex items-center justify-center gap-3 flex-wrap">
          <span>
            🔥 Summer Special: Book any Adventurer or Summit package before May
            31 and get 15% off!
          </span>
          <Link
            to="/book"
            className="btn-white text-xs py-1.5 px-4"
            data-ocid="packages.summer_deal_button"
          >
            Claim Offer
          </Link>
        </div>
      </div>

      {/* Package cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-white rounded-2xl shadow-card ${pkg.popular ? "shadow-elevated" : ""} p-6`}
              style={
                pkg.popular
                  ? {
                      outline: "2px solid var(--ew-orange)",
                      outlineOffset: "0px",
                    }
                  : {}
              }
              data-ocid={`package.card.${i + 1}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className="text-xs font-bold px-4 py-1 rounded-full text-white"
                    style={{ background: "var(--ew-orange)" }}
                  >
                    ⭐ Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <span className="text-4xl">{pkg.icon}</span>
                <h3
                  className="text-2xl font-bold mt-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  {pkg.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                  {pkg.tagline}
                </p>
                <p
                  className="font-bold text-2xl mt-3"
                  style={{ color: "var(--ew-orange)" }}
                >
                  {pkg.price}
                </p>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  per person
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    <Check
                      size={16}
                      style={{ color: "var(--ew-green)" }}
                      className="shrink-0 mt-0.5"
                    />
                    {f}
                  </li>
                ))}
                {pkg.notIncluded.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm line-through"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    <span className="w-4 shrink-0 text-center">✕</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className={
                  pkg.popular
                    ? "btn-primary w-full justify-center"
                    : "btn-secondary w-full justify-center"
                }
                data-ocid={`package.book_button.${i + 1}`}
              >
                Choose {pkg.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Group discount banner */}
      <div className="container mx-auto px-4 mb-8">
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--ew-orange-lt)",
            border: "1px solid var(--ew-orange)",
          }}
        >
          <div>
            <p
              className="font-bold text-lg"
              style={{ color: "var(--ew-text)" }}
            >
              👥 Group Discount
            </p>
            <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Bring 5 or more trekkers and get{" "}
              <strong style={{ color: "var(--ew-orange)" }}>20% off</strong> on
              all packages. Perfect for friends, family, or colleagues!
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-primary shrink-0"
            data-ocid="packages.group_discount_button"
          >
            Get Group Quote
          </Link>
        </div>
      </div>

      {/* Seasonal packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              By Season
            </span>
            <h2 className="section-title mt-2 mx-auto block">
              Seasonal Trek Picks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SEASONAL.map((s, i) => (
              <motion.div
                key={s.season}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 shadow-card"
                style={{
                  background: s.color,
                  border: `1px solid ${s.accent}22`,
                }}
              >
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: s.accent }}
                >
                  {s.season}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {s.desc}
                </p>
                <ul className="space-y-1.5">
                  {s.treks.map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: "var(--ew-text)" }}
                    >
                      <span style={{ color: s.accent }}>→</span> {t}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/treks"
                  className="btn-secondary mt-5 w-full justify-center text-sm"
                  style={{ borderColor: s.accent, color: s.accent }}
                  data-ocid={`packages.season_link.${i + 1}`}
                >
                  Explore Season →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom package CTA */}
      <div className="container mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-8 text-center shadow-card"
          style={{ background: "var(--ew-footer)" }}
        >
          <p className="text-white font-bold text-2xl mb-2">
            Need a Custom Package?
          </p>
          <p className="text-sm mb-6 opacity-70 text-white">
            We create fully customized packages for corporate groups, school
            trips, or special occasions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/corporate"
              className="btn-primary"
              data-ocid="packages.corporate_button"
            >
              Corporate Treks
            </Link>
            <Link
              to="/contact"
              className="btn-white"
              data-ocid="packages.contact_button"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
