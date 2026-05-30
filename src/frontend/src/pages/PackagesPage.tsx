import { Link } from "@tanstack/react-router";
import { bookSearch } from "@/lib/book-search";
import {
  CURATED_PACKAGES,
  PACKAGE_CATEGORIES,
  type CuratedPackageCategory,
} from "@/data/curated-packages";
import { CTA_OUTLINE_WHITE } from "@/lib/cta-buttons";
import {
  openCallbackFromLayout,
  openQueryModalFromLayout,
  openTrekQuizFromLayout,
} from "@/lib/layout-modals";
import {
  AlertCircle,
  Binoculars,
  Check,
  ChevronRight,
  MapPinned,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
import ListingToolbarRegions from "../components/ListingToolbarRegions";
import PackageCard from "../components/PackageCard";
import { SEOHead } from "../components/SEOHead";
import { SITE_ORIGIN } from "@/lib/site-config";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";

const SERVICE_TIERS = [
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

const WHY_TREKORA = [
  {
    title: "Built from real treks & yatras",
    desc: "Every package combines live Trekora itineraries — not generic tour templates.",
  },
  {
    title: "Faith + adventure in one booking",
    desc: "Char Dham with Valley of Flowers, Panch Kedar with summit treks — combos no one else offers.",
  },
  {
    title: "One team, one permit chain",
    desc: "Single operator from Haridwar to high camp — fewer hand-offs, safer logistics.",
  },
  {
    title: "Global trekker ready",
    desc: "English-speaking leads, AMS protocols, and clear inclusions for international guests.",
  },
];

export default function PackagesPage() {
  const [category, setCategory] = useState<CuratedPackageCategory | "all">(
    "all",
  );

  const filtered = useMemo(
    () =>
      category === "all"
        ? CURATED_PACKAGES
        : CURATED_PACKAGES.filter((p) => p.category === category),
    [category],
  );

  const featured = useMemo(
    () =>
      category === "all"
        ? (CURATED_PACKAGES.find((p) => p.popular) ?? CURATED_PACKAGES[0])
        : null,
    [category],
  );

  const gridPackages = useMemo(() => {
    if (featured) return filtered.filter((p) => p.id !== featured.id);
    return filtered;
  }, [filtered, featured]);

  return (
    <div
      className="pt-16 min-h-screen packages-page"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title="Himalayan Trek & Yatra Packages — Curated Combo Circuits | Trekora"
        description="Book world-first Himalayan packages combining Char Dham, Panch Kedar, Valley of Flowers, Hampta Pass, Spiti and more. Real treks + yatras, bundle savings, IMF-certified guides."
        keywords="Himalayan package tours, Char Dham trek combo, trek yatra package India, Trekora curated packages, pilgrimage trek package"
        canonical={`${SITE_ORIGIN}/packages`}
      />

      {/* Hero — matches /treks and /yatras listing */}
      <div
        className="relative overflow-hidden"
        data-travel-image-section
        style={{ backgroundColor: "var(--ew-red)" }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z"
            fill="white"
          />
          <path
            d="M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
        <svg
          className="absolute right-8 top-4 opacity-10 pointer-events-none hidden md:block"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
        </svg>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Trekora — Trek + Yatra Combos
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              Himalayan Combo Packages
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-6">
              Real treks and sacred yatras from our catalogue — one journey, one
              team, bundle pricing.
            </p>
            <p className="text-white/70 text-sm max-w-xl mx-auto mb-6">
              {CURATED_PACKAGES.length} curated circuits · Save up to 15% vs
              booking separately
            </p>
            <span
              className="inline-block px-7 py-2.5 rounded-full text-sm font-semibold text-white shadow-md"
              style={{
                backgroundColor: "var(--ew-red)",
                border: "2px solid rgba(255,255,255,0.35)",
              }}
            >
              All Packages
            </span>
            <div className="packages-hero-ctas flex flex-wrap items-center justify-center gap-3 mt-6 relative z-20 pointer-events-auto">
              <button
                type="button"
                onClick={() => openQueryModalFromLayout()}
                className={CTA_OUTLINE_WHITE}
                data-ocid="packages.hero.plan_button"
              >
                <MapPinned size={16} aria-hidden />
                Plan My Trek <ChevronRight size={14} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => openTrekQuizFromLayout()}
                className={CTA_OUTLINE_WHITE}
                data-ocid="packages.hero.find_button"
              >
                <Binoculars size={16} aria-hidden />
                Find My Trek <ChevronRight size={14} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => openCallbackFromLayout()}
                className={CTA_OUTLINE_WHITE}
                data-ocid="packages.hero.callback_button"
              >
                <Phone size={16} aria-hidden />
                Call Back <ChevronRight size={14} aria-hidden />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-packages" />

      {/* Promo — matches yatra urgency strip */}
      <div className="packages-promo py-2.5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm font-medium text-center sm:text-left">
          <span className="inline-flex items-center gap-2">
            <AlertCircle size={15} aria-hidden />
            Bundle on Adventurer or Summit tier — extra 10% off for groups of 5+
          </span>
          <Link
            to="/book"
            search={bookSearch({})}
            className="packages-promo__cta"
            data-ocid="packages.summer_deal_button"
          >
            Start Booking <ChevronRight size={14} aria-hidden />
          </Link>
        </div>
      </div>

      {/* Category filters — listing-region-pill system */}
      <ListingStickyToolbar
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <ListingToolbarRegions>
          <div
            className="listing-region-pills"
            role="tablist"
            aria-label="Filter packages by category"
          >
            {PACKAGE_CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat.id)}
                  className={`listing-region-pill ${isActive ? "listing-region-pill--active" : ""}`}
                  data-ocid={`packages.filter.${cat.id}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ListingToolbarRegions>
      </ListingStickyToolbar>

      {/* Curated packages grid — matches /yatras listing shell */}
      <div className="py-12 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              From our catalogue
            </span>
            <h2 className="section-title mt-2 mx-auto block">
              Curated Combo Packages
            </h2>
            <p className="text-sm mt-3" style={{ color: "var(--ew-text-lt)" }}>
              Each combo links real{" "}
              <Link
                to="/treks"
                className="font-semibold hover:underline"
                style={{ color: "var(--ew-red)" }}
              >
                treks
              </Link>{" "}
              and{" "}
              <Link
                to="/yatras"
                className="font-semibold hover:underline"
                style={{ color: "var(--ew-red)" }}
              >
                yatras
              </Link>{" "}
              — coordinated dates and one invoice.
            </p>
          </div>

          {filtered.length === 0 ? (
            <p
              className="text-center py-12 text-sm"
              style={{ color: "var(--ew-text-lt)" }}
            >
              No packages in this category — try All Packages.
            </p>
          ) : (
            <>
              {featured ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card package-featured mb-10 overflow-hidden"
                  style={{ pointerEvents: "auto" }}
                  data-ocid="packages.featured"
                >
                  <PackageCard pkg={featured} featured />
                </motion.div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {gridPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="card overflow-hidden"
                    style={{ pointerEvents: "auto" }}
                    data-ocid={`packages.curated_card.${i + 1}`}
                  >
                    <PackageCard pkg={pkg} index={i} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Why Trekora */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mx-auto block">
              Why Only on Trekora
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {WHY_TREKORA.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="packages-why-card p-5 text-center"
              >
                <p
                  className="font-bold text-sm mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service tiers */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Comfort level
            </span>
            <h2 className="section-title mt-2 mx-auto block">
              Choose Your Service Tier
            </h2>
            <p
              className="text-sm max-w-xl mx-auto mt-2"
              style={{ color: "var(--ew-text-lt)" }}
            >
              Apply Explorer, Adventurer, or Summit to any curated package
              above.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto items-stretch">
            {SERVICE_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                className={`card packages-tier-card flex flex-col p-6 relative ${tier.popular ? "md:-mt-2 md:mb-2" : ""}`}
                style={
                  tier.popular
                    ? {
                        outline: "2px solid var(--ew-orange)",
                        outlineOffset: "0",
                      }
                    : undefined
                }
                data-ocid={`package.tier.${i + 1}`}
              >
                {tier.popular ? (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="text-xs font-bold px-4 py-1 rounded-full text-white"
                      style={{ background: "var(--ew-orange)" }}
                    >
                      Most Popular
                    </span>
                  </div>
                ) : null}
                <div className="text-center mb-6">
                  <span className="text-4xl" aria-hidden>
                    {tier.icon}
                  </span>
                  <h3
                    className="text-2xl font-bold mt-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
                    {tier.tagline}
                  </p>
                  <p className="font-bold text-2xl mt-3 trek-price">
                    {tier.price}
                  </p>
                  <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                    per person · on any combo
                  </p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      <Check
                        size={16}
                        style={{ color: "var(--ew-green)" }}
                        className="shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm line-through"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      <span className="w-4 shrink-0 text-center" aria-hidden>
                        ✕
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  search={bookSearch({})}
                  className="btn-secondary text-sm w-full justify-center inline-flex items-center gap-1"
                  data-ocid={`package.tier_book.${i + 1}`}
                >
                  Book {tier.name} <ChevronRight size={14} aria-hidden />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group discount */}
      <div className="container mx-auto px-4 pb-8">
        <div
          className="rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "var(--ew-orange-lt)",
            border: "1px solid var(--ew-orange)",
          }}
        >
          <div className="text-center sm:text-left">
            <p className="font-bold text-lg" style={{ color: "var(--ew-text)" }}>
              Group discount
            </p>
            <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
              5+ travellers on any curated package —{" "}
              <strong style={{ color: "var(--ew-orange)" }}>20% off</strong> on
              top of bundle savings.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-secondary text-sm shrink-0 inline-flex items-center gap-1"
            data-ocid="packages.group_discount_button"
          >
            Get Group Quote <ChevronRight size={14} aria-hidden />
          </Link>
        </div>
      </div>

      {/* Custom CTA — matches site footer CTA blocks */}
      <div className="container mx-auto px-4 pb-12">
        <div
          className="rounded-lg p-8 text-center shadow-card"
          style={{ background: "var(--ew-footer)" }}
        >
          <p className="text-white font-bold text-2xl mb-2">
            Build Your Own Combo
          </p>
          <p className="text-sm mb-6 opacity-70 text-white max-w-lg mx-auto">
            Mix any treks and yatras from our catalogue — corporate retreats,
            school groups, or a private Char Dham + trek route.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link
              to="/corporate"
              search={{ org: "corporate" }}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-[var(--ew-orange)] text-[var(--ew-orange)] bg-white hover:bg-[var(--ew-orange)] hover:text-white transition-colors"
              data-ocid="packages.corporate_quote_button"
            >
              Corporate Quote <ChevronRight size={14} aria-hidden />
            </Link>
            <Link
              to="/corporate"
              search={{ org: "school" }}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-white text-white hover:bg-white hover:text-[var(--ew-footer)] transition-colors"
              data-ocid="packages.school_quote_button"
            >
              School Quote <ChevronRight size={14} aria-hidden />
            </Link>
            <Link
              to="/corporate"
              search={{ org: "college" }}
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-white/60 text-white hover:border-white transition-colors"
              data-ocid="packages.college_quote_button"
            >
              College Quote <ChevronRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
