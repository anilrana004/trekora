import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  FileText,
  HeartHandshake,
  MapPin,
  Mountain,
  Phone,
  Plane,
  Star,
  Train,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import BookingDrawer from "../components/BookingDrawer";
import QueryBottomSheet from "../components/QueryBottomSheet";
import ReviewSubmitForm from "../components/ReviewSubmitForm";
import { SEOHead } from "../components/SEOHead";
import SeoTagCloud from "../components/SeoTagCloud";
import ShareSection from "../components/ShareSection";
import TrekMap from "../components/TrekMap";
import WhatsAppCTA from "../components/WhatsAppCTA";
import YatraInclusions from "../components/YatraInclusions";
import { YATRAS } from "../data/yatras";
import type { YatraHowToReach } from "../data/yatras";
import { downloadYatraItineraryPDF } from "../lib/pdfGenerator";
import {
  generateBreadcrumbJSONLD,
  generateFAQJSONLD,
  generateYatraJSONLD,
  injectJSONLD,
} from "../lib/seo";

function StarRow({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          style={{ color: "var(--ew-gold)" }}
          className={
            s <= Math.round(rating) ? "fill-[var(--ew-gold)]" : "fill-none"
          }
        />
      ))}
    </span>
  );
}

type TabKey =
  | "overview"
  | "itinerary"
  | "inclusions"
  | "map-route"
  | "significance"
  | "how-to-reach"
  | "photos"
  | "reviews"
  | "faqs";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  { key: "inclusions", label: "Inclusions" },
  { key: "map-route", label: "Map & Route" },
  { key: "significance", label: "Significance" },
  { key: "how-to-reach", label: "How to Reach" },
  { key: "photos", label: "Photos" },
  { key: "reviews", label: "Reviews" },
  { key: "faqs", label: "FAQs" },
];

const REVIEWS = [
  {
    name: "Suresh Patel",
    city: "Ahmedabad",
    rating: 5,
    when: "Sep 2024",
    text: "An absolutely divine experience. Trekora team was incredibly supportive throughout. Every detail was taken care of — from VIP darshan arrangements to sattvic meals. I felt truly blessed completing this sacred journey.",
  },
  {
    name: "Anita Sharma",
    city: "Pune",
    rating: 5,
    when: "Jun 2024",
    text: "The guides were knowledgeable about every temple's significance. The Tungnath sunrise was something I will never forget. Well-organized from start to finish. Booking again for Panch Badri next year!",
  },
  {
    name: "Ramesh Kumar",
    city: "Chennai",
    rating: 4,
    when: "Aug 2024",
    text: "The yatra was deeply spiritual and beautifully organized. The spiritual guide's knowledge of Puranic stories brought every shrine to life. The langar experience was an experience in itself.",
  },
  {
    name: "Priya Nair",
    city: "Hyderabad",
    rating: 5,
    when: "Oct 2024",
    text: "First time doing a high-altitude yatra and I was nervous. The Trekora team made it seamless. The puja arrangements, VIP darshan, and the warm group atmosphere made this truly transformative.",
  },
];

const DEFAULT_ITINERARY = [
  {
    day: 1,
    title: "Arrival & Acclimatization",
    altitude: "Base town",
    distance: "",
    description:
      "Arrive at the base town. Rest, acclimatization, briefing by guide, and distribution of Trekora yatra kit.",
    stay: "Hotel / guesthouse",
    meals: "Dinner",
  },
  {
    day: 2,
    title: "Commence Trek to Trail Head",
    altitude: "Varies",
    distance: "Variable",
    description:
      "Early morning start. Drive or walk to the main trail head. Begin the pilgrimage with prayers at the base temple.",
    stay: "Dharamshala / camp",
    meals: "Breakfast, Dinner",
  },
  {
    day: 3,
    title: "Main Shrine Darshan",
    altitude: "Varies",
    distance: "Variable",
    description:
      "Reach the main shrine after gradual ascent. Ritual bath in sacred water. VIP darshan and aarti at the temple.",
    stay: "Temple trust accommodation",
    meals: "Breakfast, Dinner",
  },
  {
    day: 4,
    title: "Return Journey",
    altitude: "Base town",
    distance: "Variable",
    description:
      "Morning prayers and final darshan. Descend to base town. Debrief and departure preparations.",
    stay: "Hotel / guesthouse",
    meals: "Breakfast",
  },
];

const TRUST_ITEMS = [
  "100% Secure Payment",
  "Free Cancellation up to 30 days",
  "VIP Darshan Included",
  "Expert Spiritual Guide",
];

export default function YatraDetailPage() {
  // CRITICAL BUG FIX: correct route path (was "/layout/yatras/$slug")
  const { slug } = useParams({ from: "/layout/yatras/$slug" });
  const yatra = YATRAS.find((y) => y.slug === slug);

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [heroImg, setHeroImg] = useState(0);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState(2);
  const [heliAdd, setHeliAdd] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    title: "",
    text: "",
    when: "",
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [querySheetOpen, setQuerySheetOpen] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const [viewerCount] = useState(() => Math.floor(Math.random() * 15) + 8);
  const [socialProofIdx, setSocialProofIdx] = useState(0);
  const [addOnsYatra, setAddOnsYatra] = useState({
    gear: false,
    insurance: false,
    transport: false,
    photographer: false,
  });

  const allImages = yatra?.images?.length
    ? yatra.images
    : [yatra?.image ?? "", yatra?.image ?? "", yatra?.image ?? ""];

  // Auto-rotate hero slider
  useEffect(() => {
    if (allImages.length < 2) return;
    const t = setInterval(
      () => setHeroImg((i) => (i + 1) % allImages.length),
      4000,
    );
    return () => clearInterval(t);
  }, [allImages.length]);

  useEffect(() => {
    const t = setInterval(() => setSocialProofIdx((i) => (i + 1) % 3), 10000);
    return () => clearInterval(t);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: slug triggers full content reset; state setters are stable
  useEffect(() => {
    setActiveTab("overview");
    setHeroImg(0);
    setOpenDay(0);
    setOpenFaq(null);
    setLightboxIdx(null);
    setGroupSize(2);
    setHeliAdd(false);
  }, [slug]);

  // SEO: inject structured JSON-LD schemas on mount and when yatra changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: slug is the stable dep for re-inject
  useEffect(() => {
    if (!yatra) return;
    const faqList = (yatra.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    }));
    const cleanupYatra = injectJSONLD(
      generateYatraJSONLD(yatra),
      "jsonld-yatra",
    );
    const cleanupBreadcrumb = injectJSONLD(
      generateBreadcrumbJSONLD([
        { name: "Home", url: "/" },
        { name: "Yatras", url: "/yatras" },
        {
          name:
            yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh",
          url:
            yatra.state === "uttarakhand"
              ? "/destinations/uttarakhand"
              : "/destinations/himachal-pradesh",
        },
        { name: yatra.name, url: `/yatras/${yatra.slug}` },
      ]),
      "jsonld-breadcrumb",
    );
    const cleanupFaq =
      faqList.length > 0
        ? injectJSONLD(generateFAQJSONLD(faqList), "jsonld-faq")
        : () => {};
    return () => {
      cleanupYatra();
      cleanupBreadcrumb();
      cleanupFaq();
    };
  }, [slug]);

  const yatraSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: yatra?.name ?? "",
    description: yatra?.description ?? "",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Trekora",
      url: "https://www.trekora.com",
    },
    offers: {
      "@type": "Offer",
      price: yatra?.price ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  const yBreadcrumbSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.trekora.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yatras",
        item: "https://www.trekora.com/yatras",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: yatra?.name ?? "",
        item: `https://www.trekora.com/yatras/${slug}`,
      },
    ],
  };

  if (!yatra) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Mountain
            size={48}
            style={{ color: "var(--ew-red)" }}
            className="mx-auto mb-4"
          />
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--ew-text)" }}
          >
            Yatra not found
          </h1>
          <p className="text-sm mb-5" style={{ color: "var(--ew-text-lt)" }}>
            The yatra “{slug}” does not exist in our catalog.
          </p>
          <Link to="/yatras" className="btn-primary">
            Browse All Yatras
          </Link>
        </div>
      </div>
    );
  }

  const highlights = yatra.spiritualBenefits?.length
    ? yatra.spiritualBenefits
    : [
        "Sacred pilgrimage revered for thousands of years",
        "Expert spiritual guide with Vedic and Puranic knowledge",
        "Comfortable accommodation at key halting points",
        "VIP darshan arrangements at all major shrines",
        "All rituals and pooja guidance provided throughout",
      ];

  const itinerary =
    (yatra as unknown as { itinerary?: typeof DEFAULT_ITINERARY }).itinerary ??
    DEFAULT_ITINERARY;

  const faqs = yatra.faqs ?? [];
  const howToReach: YatraHowToReach | null =
    typeof yatra.howToReach === "object" ? yatra.howToReach : null;
  const totalPrice = yatra.price * groupSize + (heliAdd ? 4500 : 0);
  const relatedYatras = YATRAS.filter(
    (y) => y.slug !== yatra.slug && y.state === yatra.state,
  ).slice(0, 3);
  const photoGrid = Array.from(
    { length: 12 },
    (_, i) => allImages[i % allImages.length],
  );

  return (
    <div key={yatra.slug} className="pt-16 min-h-screen bg-white">
      <SEOHead
        title={`${yatra.name} 2025 | ${yatra.duration} Days | From ₹${yatra.price.toLocaleString("en-IN")} | Trekora`}
        description={`Book ${yatra.name} package. ${yatra.duration} days, spiritual pilgrimage to the Himalayas. All-inclusive: accommodation, meals, darshan arrangements, certified spiritual guide.`}
        keywords={`${yatra.name}, pilgrimage India, Himalayan yatra, ${yatra.name} 2025, book ${yatra.name.toLowerCase()}, Trekora yatra`}
        canonical={`https://www.trekora.com/yatras/${yatra.slug}`}
        ogImage={allImages[0]}
        schema={[yatraSchema, yBreadcrumbSchema]}
      />
      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--ew-gray-lt)",
          borderColor: "var(--ew-gray-mid)",
        }}
      >
        <div className="container mx-auto px-4 py-2.5 flex items-center gap-1.5 text-sm flex-wrap">
          <Link
            to="/"
            className="hover:underline"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Home
          </Link>
          <ChevronRight size={13} style={{ color: "var(--ew-gray-dark)" }} />
          <Link
            to="/yatras"
            className="hover:underline"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Yatras
          </Link>
          <ChevronRight size={13} style={{ color: "var(--ew-gray-dark)" }} />
          <span className="capitalize" style={{ color: "var(--ew-gray-dark)" }}>
            {yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}
          </span>
          <ChevronRight size={13} style={{ color: "var(--ew-gray-dark)" }} />
          <span className="font-semibold" style={{ color: "var(--ew-red)" }}>
            {yatra.name}
          </span>
        </div>
      </div>

      {/* Hero Slider */}
      <div
        className="relative overflow-hidden bg-black"
        style={{ minHeight: "clamp(280px, 60vw, 480px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={heroImg}
            src={allImages[heroImg]}
            alt={`${yatra.name} — view ${heroImg + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          type="button"
          aria-label="Previous image"
          onClick={() =>
            setHeroImg((i) => (i - 1 + allImages.length) % allImages.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          data-ocid="yatra_detail.hero_prev"
        >
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={() => setHeroImg((i) => (i + 1) % allImages.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/40 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
          data-ocid="yatra_detail.hero_next"
        >
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-6 left-0 right-0 container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-1">
            {yatra.name}
          </h1>
          <div className="flex items-center gap-3 flex-wrap text-sm text-white/80">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {yatra.duration} Days
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} /> Starts: {yatra.startPoint}
            </span>
            <span className="flex items-center gap-1">
              <Mountain size={14} /> {yatra.distance} km
            </span>
          </div>
        </div>
        {/* Dot pagination */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {allImages.map((img, i) => (
            <button
              key={img || String(i)}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setHeroImg(i)}
              className="rounded-full transition-all"
              style={{
                width: heroImg === i ? 20 : 8,
                height: 8,
                backgroundColor:
                  heroImg === i ? "var(--ew-red)" : "rgba(255,255,255,0.6)",
              }}
              data-ocid={`yatra_detail.hero_dot.${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{ backgroundColor: "var(--ew-red)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-0 divide-x divide-white/20">
            {[
              { label: "Duration", value: `${yatra.duration} Days` },
              { label: "Distance", value: `${yatra.distance} km` },
              { label: "Start Point", value: yatra.startPoint },
              { label: "Best Season", value: yatra.bestTime },
              {
                label: "Difficulty",
                value:
                  yatra.distance > 200
                    ? "Moderate"
                    : yatra.distance > 50
                      ? "Easy-Mod"
                      : "Easy",
              },
              {
                label: yatra.helicopterAvailable ? "Helicopter" : "Type",
                value: yatra.helicopterAvailable ? "Available" : "Guided Yatra",
              },
            ].map((s) => (
              <div key={s.label} className="py-3.5 px-3 text-center">
                <div className="text-white/70 text-xs mb-0.5">{s.label}</div>
                <div className="text-white font-bold text-xs md:text-sm leading-tight">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tag Cloud */}
      {yatra.tags && yatra.tags.length > 0 && (
        <div
          className="py-3"
          style={{
            backgroundColor: "var(--ew-gray-lt)",
            borderBottom: "1px solid var(--ew-gray-mid)",
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span
                className="text-[11px] font-semibold mr-1"
                style={{ color: "var(--ew-gray-dark)" }}
              >
                Tags:
              </span>
              {yatra.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] px-3 py-1 rounded-full border cursor-pointer transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]"
                  style={{
                    backgroundColor: "#fff",
                    color: "#555",
                    borderColor: "var(--ew-gray-mid)",
                  }}
                  data-ocid={`yatra_detail.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Main 8:4 Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Tabs + Content */}
          <div className="lg:col-span-8 min-w-0">
            {/* Tab bar */}
            <div
              ref={tabBarRef}
              className="flex overflow-x-auto mb-7 border-b scrollbar-hide -mx-4 px-4"
              style={{ borderColor: "var(--ew-gray-mid)" }}
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className="shrink-0 px-4 py-3 text-sm font-semibold -mb-px border-b-2 transition-colors whitespace-nowrap"
                  style={
                    activeTab === t.key
                      ? { color: "var(--ew-red)", borderColor: "var(--ew-red)" }
                      : {
                          color: "var(--ew-gray-dark)",
                          borderColor: "transparent",
                        }
                  }
                  data-ocid={`yatra_detail.tab.${t.key}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {/* Tab content — key forces remount on tab change */}
            <div key={activeTab}>
              {/* ══ OVERVIEW ══ */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="section-title mb-4">About this Yatra</h2>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {yatra.description}
                    </p>
                  </div>

                  {/* Spiritual significance box */}
                  <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: "#FFF8E1" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🛕</span>
                      <h3
                        className="font-bold text-base"
                        style={{ color: "#B45309" }}
                      >
                        Spiritual Significance
                      </h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#92400E" }}
                    >
                      {yatra.significance?.substring(0, 400)}
                      {(yatra.significance?.length ?? 0) > 400 ? "…" : ""}
                    </p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Duration", value: `${yatra.duration} Days` },
                      { label: "Distance", value: `${yatra.distance} km` },
                      { label: "Start Point", value: yatra.startPoint },
                      { label: "Best Time", value: yatra.bestTime },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg p-3 text-center"
                        style={{ backgroundColor: "var(--ew-gray-lt)" }}
                      >
                        <div
                          className="text-xs mb-0.5"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          {s.label}
                        </div>
                        <div
                          className="font-bold text-sm"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div
                    className="rounded-xl p-5"
                    style={{ backgroundColor: "var(--ew-red-lt)" }}
                  >
                    <h3
                      className="font-bold text-base mb-3"
                      style={{ color: "var(--ew-red)" }}
                    >
                      Key Highlights
                    </h3>
                    <ul className="space-y-2">
                      {highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-sm"
                          style={{ color: "var(--ew-text)" }}
                        >
                          <CheckCircle2
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color: "var(--ew-red)" }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best time table */}
                  <div>
                    <h3
                      className="font-bold text-base mb-3"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Best Time to Visit
                    </h3>
                    <div
                      className="rounded-xl border overflow-hidden"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    >
                      <table className="w-full text-sm">
                        <thead style={{ backgroundColor: "var(--ew-red)" }}>
                          <tr>
                            {["Period", "Season", "Condition", "Rec"].map(
                              (h) => (
                                <th
                                  key={h}
                                  className="py-2.5 px-3 text-left text-white font-semibold text-xs"
                                >
                                  {h}
                                </th>
                              ),
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            [
                              "May–June",
                              "Pre-monsoon",
                              "Clear skies, moderate crowd",
                              "Ideal ✓",
                            ],
                            [
                              "July–Aug",
                              "Monsoon",
                              "Heavy rain, landslide risk",
                              "Caution ⚠",
                            ],
                            [
                              "Sep–Oct",
                              "Post-monsoon",
                              "Crisp weather, fewer crowds",
                              "Excellent ✓",
                            ],
                            [
                              "Nov–Apr",
                              "Winter",
                              "Most shrines closed",
                              "Avoid ✗",
                            ],
                          ].map(([period, season, condition, rec], ri) => (
                            <tr
                              key={period}
                              style={{
                                backgroundColor:
                                  ri % 2 === 0 ? "var(--ew-gray-lt)" : "white",
                              }}
                            >
                              <td
                                className="py-2.5 px-3 font-medium"
                                style={{ color: "var(--ew-text)" }}
                              >
                                {period}
                              </td>
                              <td
                                className="py-2.5 px-3"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {season}
                              </td>
                              <td
                                className="py-2.5 px-3"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {condition}
                              </td>
                              <td
                                className="py-2.5 px-3 font-semibold"
                                style={{
                                  color: rec.includes("✓")
                                    ? "var(--ew-green)"
                                    : rec.includes("⚠")
                                      ? "var(--ew-orange)"
                                      : "var(--ew-red)",
                                }}
                              >
                                {rec}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Fitness requirements */}
                  <div
                    className="rounded-xl border-l-4 p-5"
                    style={{
                      borderColor: "var(--ew-orange)",
                      backgroundColor: "var(--ew-orange-lt)",
                    }}
                  >
                    <h3
                      className="font-bold text-sm mb-1.5"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Fitness Requirements
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {yatra.distance > 200
                        ? "Moderate fitness required. Daily 30-minute walks for 4 weeks before departure recommended. High-altitude sections need good cardiovascular health."
                        : yatra.distance > 50
                          ? "Easy-moderate fitness. Comfortable walking for 5–10 km per day. Senior pilgrims with helicopter option face minimal physical challenge."
                          : "Easy — suitable for most ages. Short trails of 3–10 km. Helicopter options available. No prior trekking experience required."}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ══ ITINERARY ══ */}
              {activeTab === "itinerary" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h2 className="section-title mb-5">Day-by-Day Itinerary</h2>
                  {itinerary.map((day, idx) => (
                    <div
                      key={day.day}
                      className="border rounded-xl overflow-hidden"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    >
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenDay(openDay === idx ? null : idx)}
                        data-ocid={`yatra_detail.itinerary.day.${day.day}`}
                      >
                        <div
                          id="yatra-group-size"
                          className="flex items-center gap-3"
                        >
                          <span
                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: "var(--ew-red)" }}
                          >
                            {day.day}
                          </span>
                          <div>
                            <span
                              className="font-semibold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              {day.title}
                            </span>
                            {day.altitude && (
                              <span
                                className="ml-3 text-xs"
                                style={{ color: "var(--ew-gray-dark)" }}
                              >
                                {day.altitude}
                              </span>
                            )}
                          </div>
                        </div>
                        {openDay === idx ? (
                          <ChevronUp
                            size={16}
                            style={{ color: "var(--ew-gray-dark)" }}
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            style={{ color: "var(--ew-gray-dark)" }}
                          />
                        )}
                      </button>
                      <AnimatePresence>
                        {openDay === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pt-1">
                              <p
                                className="text-sm leading-relaxed mb-3"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {day.description}
                              </p>
                              <div
                                className="flex gap-4 text-xs flex-wrap"
                                style={{ color: "var(--ew-gray-dark)" }}
                              >
                                {day.distance && (
                                  <span>Distance: {day.distance}</span>
                                )}
                                <span>Stay: {day.stay}</span>
                                <span>Meals: {day.meals}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* ══ INCLUSIONS ══ */}
              {activeTab === "inclusions" && <YatraInclusions />}

              {/* ══ MAP & ROUTE ══ */}
              {activeTab === "map-route" && (
                <motion.div
                  key="map-route"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-card"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Map &amp; Route
                  </h2>
                  <TrekMap yatra={yatra} />
                </motion.div>
              )}

              {/* ══ SIGNIFICANCE ══ */}
              {activeTab === "significance" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-7"
                >
                  <div>
                    <h2 className="section-title mb-4">
                      Spiritual &amp; Mythological Significance
                    </h2>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {yatra.significance}
                    </p>
                  </div>

                  {yatra.spiritualBenefits &&
                    yatra.spiritualBenefits.length > 0 && (
                      <div>
                        <h3
                          className="font-bold text-lg mb-4"
                          style={{ color: "var(--ew-text)" }}
                        >
                          Why Undertake This Yatra — 5 Spiritual Benefits
                        </h3>
                        <div className="space-y-3">
                          {yatra.spiritualBenefits.map((benefit, i) => (
                            <div
                              key={benefit.slice(0, 40)}
                              className="flex items-start gap-3 rounded-xl p-4"
                              style={{ backgroundColor: "var(--ew-gray-lt)" }}
                            >
                              <span
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                                style={{ backgroundColor: "var(--ew-red)" }}
                              >
                                {i + 1}
                              </span>
                              <span
                                className="text-sm"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {benefit}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {yatra.deities && yatra.deities.length > 0 && (
                    <div>
                      <h3
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Deities Worshipped
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {yatra.deities.map((deity) => (
                          <div
                            key={deity}
                            className="flex items-center gap-2.5 text-sm rounded-lg px-4 py-3 border"
                            style={{
                              borderColor: "var(--ew-gray-mid)",
                              color: "var(--ew-text-lt)",
                            }}
                          >
                            <span className="text-base">🛕</span>
                            {deity}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {yatra.rituals && yatra.rituals.length > 0 && (
                    <div>
                      <h3
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Religious Rituals Performed
                      </h3>
                      <ul className="space-y-2">
                        {yatra.rituals.map((ritual) => (
                          <li
                            key={ritual}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            <CheckCircle2
                              size={14}
                              className="mt-0.5 shrink-0"
                              style={{ color: "var(--ew-orange)" }}
                            />
                            {ritual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(yatra.auspiciousDates2025 ??
                    yatra.auspicious_dates_2025) && (
                    <div>
                      <h3
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Auspicious Dates 2025
                      </h3>
                      <div
                        className="rounded-xl border overflow-hidden"
                        style={{ borderColor: "var(--ew-gray-mid)" }}
                      >
                        {(
                          yatra.auspiciousDates2025 ??
                          yatra.auspicious_dates_2025 ??
                          []
                        ).map((date, i) => (
                          <div
                            key={date || String(i)}
                            className="flex items-start gap-3 px-4 py-3 text-sm border-b last:border-b-0"
                            style={{
                              borderColor: "var(--ew-gray-mid)",
                              backgroundColor:
                                i % 2 === 0 ? "var(--ew-gray-lt)" : "white",
                            }}
                          >
                            <Star
                              size={13}
                              className="mt-0.5 shrink-0 fill-[var(--ew-gold)]"
                              style={{ color: "var(--ew-gold)" }}
                            />
                            <span style={{ color: "var(--ew-text-lt)" }}>
                              {date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(yatra.pujaItems ?? yatra.puja_items) && (
                    <div>
                      <h3
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Required Items for Puja
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(yatra.pujaItems ?? yatra.puja_items ?? []).map(
                          (item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
                              style={{
                                backgroundColor: "var(--ew-orange-lt)",
                                color: "var(--ew-text-lt)",
                              }}
                            >
                              <span>🌸</span>
                              {item}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ══ HOW TO REACH ══ */}
              {activeTab === "how-to-reach" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="section-title mb-5">How to Reach</h2>

                  {howToReach ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          className="rounded-xl border p-5"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Plane
                              size={18}
                              style={{ color: "var(--ew-red)" }}
                            />
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              By Air
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {howToReach.byAir}
                          </p>
                        </div>
                        <div
                          className="rounded-xl border p-5"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Train
                              size={18}
                              style={{ color: "var(--ew-red)" }}
                            />
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              By Train
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {howToReach.byTrain}
                          </p>
                        </div>
                        <div
                          className="rounded-xl border p-5"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Truck
                              size={18}
                              style={{ color: "var(--ew-red)" }}
                            />
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              By Road
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {howToReach.byRoad}
                          </p>
                        </div>
                        <div
                          className="rounded-xl border p-5"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin
                              size={18}
                              style={{ color: "var(--ew-red)" }}
                            />
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              Local Transport
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {howToReach.localTransport}
                          </p>
                        </div>
                      </div>

                      {yatra.helicopterAvailable && howToReach.helicopter && (
                        <div
                          className="rounded-xl p-5 border-l-4"
                          style={{
                            backgroundColor: "var(--ew-orange-lt)",
                            borderColor: "var(--ew-orange)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🚁</span>
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              Helicopter Options
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {howToReach.helicopter}
                          </p>
                        </div>
                      )}

                      {yatra.registrationRequired && yatra.registrationInfo && (
                        <div
                          className="rounded-xl border p-5"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <FileText
                              size={18}
                              style={{ color: "var(--ew-red)" }}
                            />
                            <h3
                              className="font-bold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              Registration &amp; Permits
                            </h3>
                          </div>
                          <p
                            className="text-sm leading-relaxed mb-3"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {yatra.registrationInfo}
                          </p>
                          <a
                            href="https://badrinath-kedarnath.gov.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex text-sm"
                            data-ocid="yatra_detail.registration_link"
                          >
                            <FileText size={14} /> Devasthanam Board Portal
                          </a>
                        </div>
                      )}

                      <div
                        className="rounded-xl border-l-4 p-5"
                        style={{
                          borderColor: "var(--ew-orange)",
                          backgroundColor: "var(--ew-orange-lt)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle
                            size={16}
                            style={{ color: "var(--ew-orange)" }}
                          />
                          <h3
                            className="font-bold text-sm"
                            style={{ color: "var(--ew-text)" }}
                          >
                            Medical Requirements
                          </h3>
                        </div>
                        <ul
                          className="space-y-1.5 text-sm"
                          style={{ color: "var(--ew-text-lt)" }}
                        >
                          <li>
                            Age limit: Pilgrims below 2 years and above 75 years
                            not permitted for shrines above 3,000m
                          </li>
                          <li>
                            Mandatory medical certificate from MBBS doctor for
                            pilgrims aged 60+
                          </li>
                          <li>
                            Persons with heart disease, high BP, asthma, or
                            diabetes must carry prescriptions
                          </li>
                          <li>
                            AMS (Altitude Mountain Sickness) risk above 3,000m —
                            acclimatization days mandatory
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {typeof yatra.howToReach === "string"
                        ? yatra.howToReach
                        : "Please contact us for detailed travel information."}
                    </p>
                  )}
                </motion.div>
              )}

              {/* ══ PHOTOS ══ */}
              {activeTab === "photos" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="section-title mb-5">Photo Gallery</h2>
                  <div className="columns-1 sm:columns-2 md:columns-3 gap-3">
                    {photoGrid.map((img, idx) => (
                      <button
                        key={img}
                        type="button"
                        className="w-full block mb-3 rounded-xl overflow-hidden group"
                        onClick={() => setLightboxIdx(idx)}
                        data-ocid={`yatra_detail.photo.${idx + 1}`}
                        aria-label={`View photo ${idx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${yatra.name} — ${idx + 1}`}
                          className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{
                            aspectRatio:
                              idx % 3 === 0
                                ? "4/3"
                                : idx % 3 === 1
                                  ? "1/1"
                                  : "16/9",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3
                      className="font-bold text-base mb-4"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Trek Diaries — Video Gallery
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2].map((n) => (
                        <div
                          key={`yt-${n}`}
                          className="rounded-xl overflow-hidden aspect-video flex items-center justify-center"
                          style={{ backgroundColor: "#111" }}
                        >
                          <div className="text-center text-white p-4">
                            <div className="text-4xl mb-2">▶️</div>
                            <p className="text-xs opacity-70">
                              Video {n} — {yatra.name}
                            </p>
                            <p className="text-xs opacity-50 mt-1">
                              Add YouTube embed ID
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ══ REVIEWS ══ */}
              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5"
                >
                  <ShareSection title={yatra.name} />
                  <h2 className="section-title mb-4">Reviews and Ratings</h2>
                  <ReviewSubmitForm trekSlug={slug} trekName={yatra.name} />
                  <div
                    className="flex items-center gap-5 p-5 rounded-xl"
                    style={{ backgroundColor: "var(--ew-gray-lt)" }}
                  >
                    <div className="text-center shrink-0">
                      <div
                        className="text-4xl font-bold"
                        style={{ color: "var(--ew-red)" }}
                      >
                        4.7
                      </div>
                      <StarRow rating={4.7} />
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        84 reviews
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      {["Excellent", "Good", "Average", "Poor"].map(
                        (label, li) => (
                          <div
                            key={label}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span
                              className="w-16"
                              style={{ color: "var(--ew-gray-dark)" }}
                            >
                              {label}
                            </span>
                            <div
                              className="flex-1 rounded-full h-2"
                              style={{ backgroundColor: "var(--ew-gray-mid)" }}
                            >
                              <div
                                className="h-2 rounded-full"
                                style={{
                                  width: ["72%", "18%", "7%", "3%"][li],
                                  backgroundColor: "var(--ew-orange)",
                                }}
                              />
                            </div>
                            <span
                              className="w-8 text-right"
                              style={{ color: "var(--ew-gray-dark)" }}
                            >
                              {["72%", "18%", "7%", "3%"][li]}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {REVIEWS.map((r) => (
                    <div
                      key={r.name}
                      className="border rounded-xl p-5"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                          style={{ backgroundColor: "var(--ew-red)" }}
                        >
                          {r.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="font-semibold text-sm"
                              style={{ color: "var(--ew-text)" }}
                            >
                              {r.name}
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "var(--ew-gray-dark)" }}
                            >
                              {r.city}
                            </span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "var(--ew-red-lt)",
                                color: "var(--ew-red)",
                              }}
                            >
                              {r.when}
                            </span>
                          </div>
                          <StarRow rating={r.rating} />
                        </div>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {r.text}
                      </p>
                    </div>
                  ))}

                  <div
                    className="rounded-xl border p-5"
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                  >
                    <h3
                      className="font-bold text-base mb-4"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Share Your Experience
                    </h3>
                    {reviewSubmitted ? (
                      <div
                        className="text-center py-6 rounded-xl"
                        style={{ backgroundColor: "var(--ew-gray-lt)" }}
                        data-ocid="yatra_detail.review.success_state"
                      >
                        <p className="text-2xl mb-2">🙏</p>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--ew-text)" }}
                        >
                          Thank you for your review!
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          Your review will appear after admin approval.
                        </p>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setReviewSubmitted(true);
                        }}
                        className="space-y-3"
                        data-ocid="yatra_detail.review_form"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={reviewForm.name}
                            onChange={(e) =>
                              setReviewForm((f) => ({
                                ...f,
                                name: e.target.value,
                              }))
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            style={{ borderColor: "var(--ew-gray-mid)" }}
                            data-ocid="yatra_detail.review.name_input"
                          />
                          <input
                            type="text"
                            placeholder="When did you travel?"
                            value={reviewForm.when}
                            onChange={(e) =>
                              setReviewForm((f) => ({
                                ...f,
                                when: e.target.value,
                              }))
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            style={{ borderColor: "var(--ew-gray-mid)" }}
                            data-ocid="yatra_detail.review.when_input"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Review title"
                          value={reviewForm.title}
                          onChange={(e) =>
                            setReviewForm((f) => ({
                              ...f,
                              title: e.target.value,
                            }))
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                          data-ocid="yatra_detail.review.title_input"
                        />
                        <textarea
                          required
                          rows={3}
                          placeholder="Share your experience..."
                          value={reviewForm.text}
                          onChange={(e) =>
                            setReviewForm((f) => ({
                              ...f,
                              text: e.target.value,
                            }))
                          }
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none resize-none"
                          style={{ borderColor: "var(--ew-gray-mid)" }}
                          data-ocid="yatra_detail.review.text_textarea"
                        />
                        <button
                          type="submit"
                          className="btn-primary"
                          data-ocid="yatra_detail.review.submit_button"
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ══ FAQs ══ */}
              {activeTab === "faqs" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <h2 className="section-title mb-5">
                    Frequently Asked Questions
                  </h2>
                  {faqs.length === 0 && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      Contact us for any questions about this yatra.
                    </p>
                  )}
                  {faqs.map((faq, idx) => (
                    <div
                      key={faq.question}
                      className="border rounded-xl overflow-hidden"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    >
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        data-ocid={`yatra_detail.faq.${idx + 1}`}
                      >
                        <span
                          className="font-semibold text-sm pr-4"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {faq.question}
                        </span>
                        {openFaq === idx ? (
                          <ChevronUp
                            size={16}
                            className="shrink-0"
                            style={{ color: "var(--ew-red)" }}
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="shrink-0"
                            style={{ color: "var(--ew-gray-dark)" }}
                          />
                        )}
                      </button>
                      <AnimatePresence>
                        {openFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-5 pb-4 text-sm leading-relaxed"
                              style={{ color: "var(--ew-text-lt)" }}
                            >
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>{" "}
            {/* end key={activeTab} */}
          </div>

          {/* RIGHT: Sticky Booking Sidebar */}
          <div className="lg:col-span-4">
            <div
              className="sticky top-24 rounded-2xl shadow-elevated overflow-hidden border"
              style={{ borderColor: "var(--ew-gray-mid)" }}
            >
              <div
                className="px-5 py-4 border-b"
                style={{
                  backgroundColor: "var(--ew-gray-lt)",
                  borderColor: "var(--ew-gray-mid)",
                }}
              >
                <p
                  className="text-xs mb-0.5"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Package starting from
                </p>
                <div
                  className="text-3xl font-bold"
                  style={{ color: "var(--ew-orange)" }}
                >
                  &#8377;{yatra.price.toLocaleString("en-IN")}
                </div>
                <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
                  per person (twin sharing)
                </p>
              </div>

              <div className="p-5 space-y-3">
                <div
                  className="grid grid-cols-3 gap-2 text-xs text-center pb-3 border-b"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  {[
                    { label: "Duration", value: `${yatra.duration}D` },
                    { label: "Dist", value: `${yatra.distance}km` },
                    { label: "From", value: yatra.startPoint.split(" ")[0] },
                  ].map((s) => (
                    <div key={s.label}>
                      <div
                        className="font-bold text-sm"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {s.value}
                      </div>
                      <div style={{ color: "var(--ew-gray-dark)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Group size stepper */}
                <div>
                  <label
                    htmlFor="yatra-group-size"
                    className="text-xs font-medium block mb-1.5"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Group Size
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors hover:opacity-80"
                      style={{
                        borderColor: "var(--ew-red)",
                        color: "var(--ew-red)",
                      }}
                      data-ocid="yatra_detail.group_minus"
                      aria-label="Decrease group size"
                    >
                      −
                    </button>
                    <span
                      className="font-bold text-sm w-6 text-center"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {groupSize}
                    </span>
                    <button
                      type="button"
                      onClick={() => setGroupSize((g) => Math.min(20, g + 1))}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold transition-colors hover:opacity-80"
                      style={{
                        borderColor: "var(--ew-red)",
                        color: "var(--ew-red)",
                      }}
                      data-ocid="yatra_detail.group_plus"
                      aria-label="Increase group size"
                    >
                      +
                    </button>
                    <span
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      persons
                    </span>
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <p
                    className="text-xs font-semibold mb-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Add-ons
                  </p>
                  <div className="space-y-1.5">
                    {(
                      [
                        {
                          key: "gear",
                          label: "🎒 Gear Rental Pack",
                          price: 800,
                          per: "person",
                        },
                        {
                          key: "insurance",
                          label: "🛡️ Travel Insurance",
                          price: 350,
                          per: "person",
                        },
                        {
                          key: "transport",
                          label: "🚌 Base Camp Transport",
                          price: 1200,
                          per: "group",
                        },
                        {
                          key: "photographer",
                          label: "📸 Photographer",
                          price: 2500,
                          per: "group",
                        },
                      ] as {
                        key: keyof typeof addOnsYatra;
                        label: string;
                        price: number;
                        per: string;
                      }[]
                    ).map(({ key, label, price, per }) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition-colors"
                        style={{
                          backgroundColor: addOnsYatra[key]
                            ? "var(--ew-orange-lt)"
                            : "var(--ew-gray-lt)",
                          border: `1px solid ${addOnsYatra[key] ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={addOnsYatra[key]}
                          onChange={(e) =>
                            setAddOnsYatra((prev) => ({
                              ...prev,
                              [key]: e.target.checked,
                            }))
                          }
                          className="w-3.5 h-3.5"
                          data-ocid={`yatra_detail.addon.${key}`}
                        />
                        <span
                          className="flex-1 text-xs font-medium"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {label}
                        </span>
                        <span
                          className="text-[11px] font-bold"
                          style={{ color: "var(--ew-orange)" }}
                        >
                          +₹{price.toLocaleString("en-IN")}
                          <span
                            className="font-normal text-[10px]"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            /{per}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {yatra.helicopterAvailable && (
                  <label
                    className="flex items-center gap-2.5 cursor-pointer"
                    data-ocid="yatra_detail.helicopter_checkbox"
                  >
                    <input
                      type="checkbox"
                      checked={heliAdd}
                      onChange={(e) => setHeliAdd(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      Add Helicopter (+&#8377;4,500/person)
                    </span>
                  </label>
                )}

                {yatra.registrationRequired && (
                  <div
                    className="text-xs rounded-lg px-3 py-2"
                    style={{
                      backgroundColor: "var(--ew-orange-lt)",
                      color: "#92400E",
                    }}
                  >
                    ⚠️ Registration required. Trekora assists with permits.
                  </div>
                )}

                {/* Total price */}
                <div
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg"
                  style={{ backgroundColor: "var(--ew-gray-lt)" }}
                >
                  <span className="text-sm" style={{ color: "var(--ew-text)" }}>
                    Total ({groupSize} {groupSize === 1 ? "person" : "persons"})
                  </span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: "var(--ew-orange)" }}
                  >
                    &#8377;{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <Link
                  to="/book"
                  className="flex items-center justify-center w-full font-bold text-lg rounded-xl transition-colors"
                  style={{
                    backgroundColor: "var(--ew-red)",
                    color: "#fff",
                    height: 56,
                  }}
                  data-ocid="yatra_detail.book_button"
                >
                  Book Yatra Now
                </Link>
                <button
                  type="button"
                  onClick={() => downloadYatraItineraryPDF(yatra)}
                  className="flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: "var(--ew-orange)",
                    color: "var(--ew-orange)",
                    height: 44,
                  }}
                  data-ocid="yatra_detail.download_pdf_button"
                >
                  📥 Download Full Itinerary PDF
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border transition-colors"
                  style={{
                    borderColor: "var(--ew-gray-mid)",
                    color: "var(--ew-gray-dark)",
                    height: 40,
                  }}
                  data-ocid="yatra_detail.inquiry_button"
                  onClick={() => setQuerySheetOpen(true)}
                >
                  <HeartHandshake size={15} /> Send Inquiry
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919810012345"
                    className="flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors"
                    style={{
                      borderColor: "var(--ew-red)",
                      color: "var(--ew-red)",
                      height: 40,
                    }}
                    data-ocid="yatra_detail.call_button"
                  >
                    <Phone size={14} /> Call Expert
                  </a>
                  <a
                    href={`https://wa.me/919810012345?text=${encodeURIComponent(`Hi! I want to book the ${yatra.name}. Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors"
                    style={{
                      borderColor: "#25D366",
                      color: "#25D366",
                      height: 40,
                    }}
                    data-ocid="yatra_detail.whatsapp_button"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-1 text-center">
                  {[
                    { icon: "🔒", text: "Secure Payment" },
                    { icon: "✅", text: "Free Cancel 30d" },
                    { icon: "⭐", text: "4.8 Rated" },
                  ].map((badge) => (
                    <div
                      key={badge.text}
                      className="rounded-lg py-2 px-1"
                      style={{
                        backgroundColor: "var(--ew-gray-lt)",
                        border: "1px solid var(--ew-gray-mid)",
                      }}
                    >
                      <div className="text-base">{badge.icon}</div>
                      <div
                        className="text-[10px] leading-tight mt-0.5"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {badge.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social proof */}
                <div
                  className="text-center text-xs py-1.5 rounded-lg"
                  style={{
                    backgroundColor: "var(--ew-red-lt)",
                    color: "var(--ew-red)",
                  }}
                >
                  {
                    [
                      `👁️ ${viewerCount} people viewed this in the last 24 hrs`,
                      "🔥 8 bookings made this week!",
                      "⏰ Next batch filling fast — only 6 spots left",
                    ][socialProofIdx]
                  }
                </div>

                <div
                  className="pt-2 border-t space-y-1.5"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  {TRUST_ITEMS.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      <CheckCircle2
                        size={12}
                        style={{ color: "var(--ew-green)" }}
                      />
                      {t}
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-lg p-3 text-xs"
                  style={{ backgroundColor: "var(--ew-orange-lt)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--ew-orange)" }}
                  >
                    Best Time:{" "}
                  </span>
                  <span style={{ color: "var(--ew-text-lt)" }}>
                    {yatra.bestTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end grid */}

        {/* Related Yatras */}
        {relatedYatras.length > 0 && (
          <section className="mt-14">
            <h2 className="section-title mb-6">Related Yatras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedYatras.map((y, i) => (
                <Link
                  key={y.id}
                  to="/yatras/$slug"
                  params={{ slug: y.slug }}
                  className="card group block"
                  data-ocid={`yatra_detail.related.${i + 1}`}
                >
                  <div className="h-44 overflow-hidden trek-card-img">
                    <img
                      src={y.image}
                      alt={y.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className="font-bold text-sm mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {y.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <span style={{ color: "var(--ew-gray-dark)" }}>
                        {y.duration} Days
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        &#8377;{y.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── SEO Tag Cloud ── */}
      <SeoTagCloud
        name={yatra.name}
        slug={yatra.slug}
        state={yatra.state}
        type="yatra"
        relatedSlugs={relatedYatras.map((y) => y.slug)}
        relatedNames={relatedYatras.map((y) => y.name)}
      />

      <WhatsAppCTA trekName={yatra.name} />

      {/* ── Booking Drawer ── */}
      <BookingDrawer
        isOpen={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        trekName={yatra.name}
        trekSlug={yatra.slug}
        price={yatra.price}
        duration={`${yatra.duration} Days`}
        difficulty={yatra.distance > 200 ? "Moderate" : "Easy"}
        image={yatra.image}
      />

      {/* ── Query Bottom Sheet ── */}
      <QueryBottomSheet
        isOpen={querySheetOpen}
        onClose={() => setQuerySheetOpen(false)}
        trekName={yatra.name}
      />

      {/* Photo Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
            data-ocid="yatra_detail.lightbox"
          >
            <button
              type="button"
              aria-label="Close lightbox"
              className="absolute top-4 right-4 text-white text-2xl hover:opacity-70"
              onClick={() => setLightboxIdx(null)}
              data-ocid="yatra_detail.lightbox.close_button"
            >
              ×
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx(
                  (i) => ((i ?? 0) - 1 + photoGrid.length) % photoGrid.length,
                );
              }}
              data-ocid="yatra_detail.lightbox.prev"
            >
              ‹
            </button>
            <img
              src={photoGrid[lightboxIdx]}
              alt={`${yatra.name} — ${lightboxIdx + 1}`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl hover:opacity-70"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIdx((i) => ((i ?? 0) + 1) % photoGrid.length);
              }}
              data-ocid="yatra_detail.lightbox.next"
            >
              ›
            </button>
            <div className="absolute bottom-4 text-white text-sm opacity-70">
              {lightboxIdx + 1} / {photoGrid.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-between px-4 py-3 lg:hidden"
        style={{ backgroundColor: "white", borderColor: "var(--ew-gray-mid)" }}
      >
        <div>
          <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
            Starting from
          </p>
          <p
            className="text-xl font-bold"
            style={{ color: "var(--ew-orange)" }}
          >
            &#8377;{yatra.price.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          data-ocid="yatra_detail.mobile_book_button"
          onClick={() => setBookingDrawerOpen(true)}
        >
          Book Yatra
        </button>
      </div>
    </div>
  );
}
