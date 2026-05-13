import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bus,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Mountain,
  Phone,
  Plane,
  Plus,
  Share2,
  Shield,
  Star,
  Train,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import EMICalculator from "../components/EMICalculator";
import TrekCard from "../components/TrekCard";
import TrustSignals from "../components/TrustSignals";
import WeatherWidget from "../components/WeatherWidget";
import WhatsAppCTA from "../components/WhatsAppCTA";
import { TREKS } from "../data/treks";

import AltitudeChart from "../components/AltitudeChart";
import BookingDrawer from "../components/BookingDrawer";
import FitnessCalculator from "../components/FitnessCalculator";
import QueryBottomSheet from "../components/QueryBottomSheet";
import ReviewSubmitForm from "../components/ReviewSubmitForm";
import { SEOHead } from "../components/SEOHead";
import SeoTagCloud from "../components/SeoTagCloud";
import ShareSection from "../components/ShareSection";
import TrailConditionBadge from "../components/TrailConditionBadge";
import TrekMap from "../components/TrekMap";
import TrekkerPhotoWall from "../components/TrekkerPhotoWall";
import { useGTM } from "../hooks/useGTM";
import { downloadTrekItineraryPDF } from "../lib/pdfGenerator";
import {
  generateBreadcrumbJSONLD,
  generateFAQJSONLD,
  generateTrekJSONLD,
  injectJSONLD,
} from "../lib/seo";

/* ── Tab config ── */
const TABS = [
  "Overview",
  "Itinerary",
  "Inclusions & Exclusions",
  "Map & Route",
  "How to Reach",
  "Gear List",
  "Photos",
  "Reviews",
  "FAQs",
] as const;

type Tab = (typeof TABS)[number];

/* ── Difficulty badge colors using ew tokens ── */
function DifficultyBadge({ level }: { level: string }) {
  const classMap: Record<string, string> = {
    Easy: "trek-difficulty-easy",
    "Easy-Moderate": "trek-difficulty-easy",
    Moderate: "trek-difficulty-moderate",
    "Moderate-Difficult": "trek-difficulty-moderate",
    Difficult: "trek-difficulty-difficult",
    "Difficult-Extreme": "trek-difficulty-difficult",
    Extreme: "trek-difficulty-extreme",
  };
  return (
    <span className={classMap[level] ?? "trek-difficulty-moderate"}>
      {level}
    </span>
  );
}

/* ── Stars ── */
function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          style={{ color: "var(--ew-gold)" }}
          className={
            s <= Math.round(rating) ? "fill-[var(--ew-gold)]" : "fill-none"
          }
        />
      ))}
    </span>
  );
}

/* ── Itinerary data helper ── */
function buildItinerary(duration: number, startPoint: string, maxAlt: number) {
  const base = Math.round(maxAlt * 0.3);
  const templates = [
    {
      title: "Arrival & Acclimatization",
      desc: `Arrive at ${startPoint} and check into your accommodation. The afternoon is free for rest and acclimatization to the mountain air. Your trek leader conducts a comprehensive briefing covering safety protocols, gear check, route overview, and altitude guidelines. The evening includes a hearty dinner and an introduction to your fellow trekkers. Overnight stay at the base camp guesthouse.`,
      altitude: base,
      stay: startPoint,
      meals: [true, false, true],
    },
    {
      title: "Trek Begins — Into the Forest",
      desc: "After an energizing breakfast, the trek begins through lush oak and rhododendron forests. The trail gradually gains altitude, offering your first glimpses of the majestic Himalayan peaks ahead. Trek for 5–6 hours through scenic terrain. Camp is set up at a beautiful meadow with unobstructed mountain views. Hot dinner and a warm campfire under a canopy of stars.",
      altitude: Math.round(maxAlt * 0.45),
      stay: "Forest Campsite",
      meals: [true, true, true],
    },
    {
      title: "High Altitude Meadows",
      desc: "Today's trail takes you above the treeline into vast alpine meadows carpeted with wildflowers. The views of snow-capped peaks become increasingly dramatic. Cross small glacial streams and navigate rocky switchbacks. The campsite at this altitude offers a breathtaking 360° panorama of the surrounding mountains. Walk slowly, breathe deeply — altitude awareness is critical from this point.",
      altitude: Math.round(maxAlt * 0.6),
      stay: "Meadow Campsite",
      meals: [true, true, true],
    },
    {
      title: "Summit Push / Highest Point",
      desc: "The most challenging and most rewarding day. An alpine start at 4 AM gives you time to reach the highest point before afternoon clouds roll in. The trail crosses snow and ancient rock. At the summit or lake, take in the breathtaking panoramic views that stretch across multiple Himalayan ranges. Descend carefully to camp. This is the day you will remember for the rest of your life.",
      altitude: maxAlt,
      stay: "High Camp",
      meals: [true, true, true],
    },
    {
      title: "Descent Begins",
      desc: "After the highs of yesterday, begin a steady descent through varied terrain. The landscape transforms as altitude drops — from barren rock to green meadows to fragrant pine forests. Legs may be tired but spirits are high. Camp at a lower altitude, breathing easier and enjoying lush surroundings. A well-earned rest after the most demanding days of the trek.",
      altitude: Math.round(maxAlt * 0.55),
      stay: "Descent Campsite",
      meals: [true, true, true],
    },
    {
      title: "Return to Base",
      desc: `The final day of trekking brings you back to ${startPoint}. Reminisce the journey as the familiar trail descends through well-trodden territory. On arrival, enjoy a hot meal, a warm shower, and the deep satisfaction of completing a Himalayan trek. Trek completion certificates are awarded to all participants at a small celebration ceremony.`,
      altitude: base,
      stay: startPoint,
      meals: [true, false, true],
    },
  ];
  return Array.from(
    { length: duration },
    (_, i) => templates[Math.min(i, templates.length - 1)],
  );
}

/* ── Gear categories ── */
const GEAR_CATEGORIES = [
  {
    label: "Clothing",
    icon: "👕",
    items: [
      "Thermal base layer (top & bottom)",
      "Fleece mid-layer jacket",
      "Waterproof outer shell",
      "Trekking pants ×2",
      "Warm gloves",
      "Woolen balaclava / beanie",
      "Trekking socks ×4–5",
      "Gaiters (snow treks)",
    ],
  },
  {
    label: "Footwear",
    icon: "👟",
    items: [
      "Waterproof trekking boots (ankle support)",
      "Camp sandals / slippers",
      "Crampons (provided if needed)",
      "Gaiters",
    ],
  },
  {
    label: "Equipment",
    icon: "🎒",
    items: [
      "40–50L trekking backpack",
      "Rain cover for backpack",
      "Trekking poles",
      "Headlamp + extra batteries",
      "Water bottles (2L minimum)",
      "Sleeping bag (−10°C rated)",
      "UV400 sunglasses",
      "Sun hat / cap",
    ],
  },
  {
    label: "Personal & Documents",
    icon: "📋",
    items: [
      "Government photo ID (Aadhaar / Passport)",
      "Medical certificate (high altitude)",
      "Personal first-aid kit",
      "Sunscreen SPF 50+",
      "Lip balm",
      "Insect repellent",
      "Personal medications",
      "Energy bars / dry snacks",
    ],
  },
];

/* ── FAQ data ── */
const FAQS = [
  {
    q: "What fitness level is required?",
    a: "Basic fitness is enough — you should be able to walk 8–12 km/day. Regular walking or jogging 3–4 weeks prior is strongly recommended.",
  },
  {
    q: "Is altitude sickness a concern?",
    a: "Our guides are trained to identify AMS symptoms. Emergency oxygen is always carried. Proper acclimatization days are built into every itinerary.",
  },
  {
    q: "What should I bring for gear?",
    a: "Layered warm clothing, waterproof trekking boots, rainwear, sunscreen, sunglasses, and a 40–50 L backpack. We send a complete gear list after booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund if cancelled 30+ days before. 50% refund 15–29 days before. No refund within 7 days of the trek start date.",
  },
  {
    q: "Are solo travellers welcome?",
    a: "Absolutely. Solo bookings are common. You will be placed in a group with other trekkers of similar experience levels.",
  },
  {
    q: "Is gear rental available?",
    a: "Yes — trekking poles, sleeping bags, crampons, backpacks, and rain jackets are available for rent from ₹100–₹200/day.",
  },
  {
    q: "What food is provided on trek?",
    a: "All meals on the trail are included — breakfast, packed lunch, and a hot dinner at camp. Special dietary requirements can be accommodated with advance notice.",
  },
  {
    q: "How do I get to the base camp?",
    a: "Transport from a major city to the base camp is not included but can be arranged at an additional cost. We share detailed travel instructions after booking.",
  },
  {
    q: "What happens if weather turns bad?",
    a: "Treks may be re-routed or delayed on safety grounds. Our guides take weather calls from certified met services. No charges apply for force-majeure delays.",
  },
  {
    q: "Is there mobile connectivity on trek?",
    a: "Connectivity is limited above a certain altitude. BSNL typically has the best coverage on most Himalayan routes. Inform your family beforehand.",
  },
  {
    q: "What is the maximum group size?",
    a: "We keep groups to a maximum of 12 trekkers per guide to ensure a personalised, safe, and eco-responsible experience.",
  },
  {
    q: "Can I book for a private/custom group?",
    a: "Yes — private corporate and school group bookings are available year-round. Contact us via the Inquiry form for custom pricing.",
  },
];

/* ── Best season months ── */
const ALL_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/* ── Review sample data ── */
const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "New Delhi",
    date: "Jan 2025",
    rating: 5,
    batch: "Winter Batch",
    text: "An absolutely magical experience! The Trekora guides were knowledgeable and ensured our safety throughout. The views were beyond any photograph. I would recommend this to every adventure-seeker.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    date: "Oct 2024",
    rating: 5,
    batch: "Autumn Batch",
    text: "Life-changing is the only word. The team handled every logistical detail perfectly — from campsite setup to the surprisingly excellent food at altitude. Highly recommend Trekora!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
  },
  {
    name: "Ananya Krishnan",
    city: "Bengaluru",
    date: "Sep 2024",
    rating: 4,
    batch: "Summer Batch",
    text: "My first Himalayan trek and I could not have chosen a better company. The guides were incredibly supportive. Challenging altitude, but every tough step was worth the breathtaking views.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
  },
];

/* ─────────────────────────────────────────────────────── */
export default function TrekDetailPage() {
  const { slug } = useParams({ from: "/layout/treks/$slug" });
  const trek = TREKS.find((t) => t.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [heroIndex, setHeroIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState(2);
  const [addOns, setAddOns] = useState({
    gear: false,
    insurance: false,
    transport: false,
    photographer: false,
  });
  const [viewerCount] = useState(() => Math.floor(Math.random() * 15) + 8);
  const [socialProofIdx, setSocialProofIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cancellationOpen, setCancellationOpen] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [querySheetOpen, setQuerySheetOpen] = useState(false);
  const [_copied, setCopied] = useState(false);

  const { push: gtmPush } = useGTM();

  // Rotate social proof every 10s
  useEffect(() => {
    const t = setInterval(() => setSocialProofIdx((i) => (i + 1) % 3), 10000);
    return () => clearInterval(t);
  }, []);

  const _handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).catch(() => null);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Parallax scroll effect — injects --scroll-y CSS variable
  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty(
        "--scroll-y",
        String(window.scrollY),
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // SEO: inject structured JSON-LD schemas on mount and when trek changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: trek.slug is the stable dep for full re-inject
  useEffect(() => {
    if (!trek) return;
    const cleanupTrek = injectJSONLD(generateTrekJSONLD(trek), "jsonld-trek");
    const cleanupBreadcrumb = injectJSONLD(
      generateBreadcrumbJSONLD([
        { name: "Home", url: "/" },
        { name: "Treks", url: "/treks" },
        {
          name:
            trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh",
          url:
            trek.state === "uttarakhand"
              ? "/destinations/uttarakhand"
              : "/destinations/himachal-pradesh",
        },
        { name: trek.name, url: `/treks/${trek.slug}` },
      ]),
      "jsonld-breadcrumb",
    );
    const cleanupFaq = injectJSONLD(
      generateFAQJSONLD(FAQS.map((f) => ({ question: f.q, answer: f.a }))),
      "jsonld-faq",
    );
    return () => {
      cleanupTrek();
      cleanupBreadcrumb();
      cleanupFaq();
    };
  }, [trek?.slug]);

  // GTM view_item — fire once per trek slug; biome-ignore to keep dep list minimal
  // biome-ignore lint/correctness/useExhaustiveDependencies: gtmPush is stable; trek fields tracked via trek.slug
  useEffect(() => {
    if (!trek) return;
    gtmPush({
      event: "view_item",
      item_name: trek.name,
      item_price: trek.price,
      item_category: trek.state,
    });
  }, [trek?.slug]);

  const trekSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trek?.name ?? "",
    description: trek?.description ?? "",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Trekora",
      url: "https://www.trekora.com",
    },
    touristType: "Adventure Trekking",
    offers: {
      "@type": "Offer",
      price: trek?.price ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trek?.rating ?? 4.5,
      reviewCount: trek?.reviewCount ?? 0,
      bestRating: 5,
    },
  };

  const breadcrumbSchema: Record<string, unknown> = {
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
        name: "Treks",
        item: "https://www.trekora.com/treks",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: trek?.name ?? "",
        item: `https://www.trekora.com/treks/${slug}`,
      },
    ],
  };

  if (!trek) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Mountain
            size={64}
            className="mx-auto mb-4"
            style={{ color: "var(--ew-red)" }}
          />
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--ew-text)" }}
          >
            Trek Not Found
          </h1>
          <p className="mb-6 text-sm" style={{ color: "var(--ew-gray-dark)" }}>
            The trek you're looking for doesn't exist or may have moved.
          </p>
          <Link to="/treks" className="btn-primary">
            Browse All Treks
          </Link>
        </div>
      </div>
    );
  }

  const related = TREKS.filter(
    (t) => t.slug !== slug && t.state === trek.state,
  ).slice(0, 4);
  const itinerary = buildItinerary(
    trek.duration,
    trek.startPoint,
    trek.altitude,
  );

  /* Price calculation */
  const baseTotal = trek.price * groupSize;
  const grandTotal =
    baseTotal +
    (addOns.gear ? 800 * groupSize : 0) +
    (addOns.insurance ? 350 * groupSize : 0) +
    (addOns.transport ? 1200 : 0) +
    (addOns.photographer ? 2500 : 0);

  /* Best season highlight (naive parser) */
  const activeBestMonths = ALL_MONTHS.filter((m) =>
    trek.bestSeason.toLowerCase().includes(m.toLowerCase()),
  );

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title={`${trek.name} Trek 2025 | ${trek.duration} Days | From ₹${trek.price.toLocaleString("en-IN")} | Trekora — Himalayan Treks & Yatras`}
        description={`Book ${trek.name} trek in ${trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}. ${trek.duration} days, max altitude ${trek.altitude.toLocaleString()}m, difficulty: ${trek.difficulty}. Starting from ₹${trek.price.toLocaleString("en-IN")}/person. NCISM-certified guides, full support.`}
        keywords={`${trek.name}, ${trek.state} trek, ${trek.difficulty} trek, Himalayan trekking, ${trek.name} 2025, book ${trek.name.toLowerCase()}, Trekora`}
        canonical={`https://www.trekora.com/treks/${trek.slug}`}
        ogImage={trek.image}
        schema={[trekSchema, breadcrumbSchema]}
      />
      {/* ── Breadcrumb strip ── */}
      <div
        style={{
          backgroundColor: "var(--ew-gray-lt)",
          borderBottom: "1px solid var(--ew-gray-mid)",
        }}
      >
        <div
          className="container mx-auto px-4 py-2 flex items-center gap-1.5 text-xs flex-wrap"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          <Link
            to="/"
            className="hover:underline"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Home
          </Link>
          <ChevronRight size={12} />
          <Link
            to="/treks"
            className="hover:underline"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Treks
          </Link>
          <ChevronRight size={12} />
          <span
            className="capitalize hover:underline cursor-default"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            {trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}
          </span>
          <ChevronRight size={12} />
          <span className="font-semibold" style={{ color: "var(--ew-red)" }}>
            {trek.name}
          </span>
        </div>
      </div>

      {/* ── Hero Image Slider ── */}
      <div
        className="trek-hero-parallax relative bg-black overflow-hidden"
        style={{
          height: "56vw",
          maxHeight: 520,
          minHeight: "clamp(280px, 60vw, 480px)",
        }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={heroIndex}
            src={trek.images[heroIndex] ?? trek.image}
            alt={`${trek.name} — view ${heroIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Prev / Next */}
        {trek.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() =>
                setHeroIndex(
                  (i) => (i - 1 + trek.images.length) % trek.images.length,
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 transition flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>
            <button
              type="button"
              onClick={() => setHeroIndex((i) => (i + 1) % trek.images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 backdrop-blur hover:bg-white/40 transition flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight size={22} className="text-white" />
            </button>
          </>
        )}

        {/* Bottom text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
          <div className="container mx-auto flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <DifficultyBadge level={trek.difficulty} />
                <span className="badge-orange text-[10px] capitalize">
                  {trek.state === "uttarakhand"
                    ? "Uttarakhand"
                    : "Himachal Pradesh"}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white text-shadow">
                {trek.name}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {trek.shortDesc}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur px-3 py-2 rounded-xl">
              <StarRow rating={trek.rating} size={16} />
              <span className="font-bold text-white text-lg">
                {trek.rating}
              </span>
              <span
                className="text-sm"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                ({trek.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail strip */}
      {trek.images.length > 1 && (
        <div className="bg-black flex gap-1 px-2 py-1 overflow-x-auto">
          {trek.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setHeroIndex(i)}
              className="flex-shrink-0 rounded overflow-hidden transition-all"
              style={{
                outline:
                  i === heroIndex
                    ? "2px solid var(--ew-orange)"
                    : "2px solid transparent",
                outlineOffset: 1,
              }}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.replace("w=1200", "w=120")}
                alt={`${trek.name} thumbnail ${i + 1}`}
                className="w-16 h-10 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Stats bar ── */}
      <div style={{ backgroundColor: "var(--ew-footer)", color: "#fff" }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-start text-sm">
            {[
              {
                label: "Duration",
                value: `${trek.duration} Days`,
                icon: <Clock size={14} />,
              },
              {
                label: "Max Altitude",
                value: `${trek.altitude.toLocaleString()}m`,
                icon: <Mountain size={14} />,
              },
              {
                label: "Difficulty",
                value: trek.difficulty,
                icon: <Shield size={14} />,
              },
              {
                label: "Distance",
                value: `${trek.distance} km`,
                icon: <MapPin size={14} />,
              },
              {
                label: "Best Season",
                value: trek.bestSeason,
                icon: <Star size={14} />,
              },
              {
                label: "Start Point",
                value: trek.startPoint,
                icon: <MapPin size={14} />,
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-2">
                <span style={{ color: "var(--ew-orange)" }}>{icon}</span>
                <div>
                  <p
                    className="text-[11px]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {label}
                  </p>
                  <p className="font-semibold text-[13px]">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tag Cloud ── */}
      {trek.tags && trek.tags.length > 0 && (
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
              {trek.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[12px] px-3 py-1 rounded-full border cursor-pointer transition-colors hover:border-[var(--ew-red)] hover:text-[var(--ew-red)]"
                  style={{
                    backgroundColor: "#fff",
                    color: "#555",
                    borderColor: "var(--ew-gray-mid)",
                  }}
                  data-ocid={`trek_detail.tag.${tag.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* ── Tab Navigation ── */}
      <div
        className="bg-white sticky z-30 shadow-sm"
        style={{ top: 64, borderBottom: "2px solid var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide -mx-4 px-4">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="whitespace-nowrap px-4 py-3.5 text-sm font-medium border-b-2 transition-colors flex-shrink-0"
                style={
                  activeTab === tab
                    ? {
                        borderBottomColor: "var(--ew-red)",
                        color: "var(--ew-red)",
                      }
                    : {
                        borderBottomColor: "transparent",
                        color: "var(--ew-gray-dark)",
                      }
                }
                data-ocid={`trek_detail.tab.${tab.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main 8:4 layout ── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── LEFT COLUMN ── */}
          <div key={activeTab} className="lg:col-span-8 space-y-6 min-w-0">
            {/* Weather — shown on Overview tab below highlights */}

            {/* ────── OVERVIEW ────── */}
            {activeTab === "Overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-5">Overview</h2>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    {
                      label: "Distance",
                      value: `${trek.distance} km`,
                      icon: <MapPin size={18} />,
                    },
                    {
                      label: "Duration",
                      value: `${trek.duration} Days`,
                      icon: <Clock size={18} />,
                    },
                    {
                      label: "Max Altitude",
                      value: `${trek.altitude.toLocaleString()}m`,
                      icon: <Mountain size={18} />,
                    },
                    {
                      label: "Trek Type",
                      value: trek.trekType,
                      icon: <Shield size={18} />,
                    },
                  ].map(({ label, value, icon }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        backgroundColor: "var(--ew-gray-lt)",
                        border: "1px solid var(--ew-gray-mid)",
                      }}
                    >
                      <span
                        style={{ color: "var(--ew-red)" }}
                        className="flex justify-center mb-1"
                      >
                        {icon}
                      </span>
                      <p
                        className="text-[11px] font-medium"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {trek.description}
                </p>

                {/* Key highlights */}
                <h3
                  className="font-bold text-base mb-3"
                  style={{ color: "var(--ew-text)" }}
                >
                  Key Highlights
                </h3>
                <ul className="space-y-2 mb-6">
                  {[
                    "Stunning panoramic views of snow-capped Himalayan peaks",
                    "Expert NCISM-certified guides with deep local knowledge",
                    "Well-planned acclimatization schedule for altitude safety",
                    "Small group sizes (max 12) for a personalized experience",
                    "Eco-friendly camping with Leave No Trace practices",
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--ew-red)" }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Trail Conditions */}
                <div className="mb-6">
                  <TrailConditionBadge trekSlug={trek.slug} variant="card" />
                </div>

                {/* Weather Widget */}
                <div className="mb-6">
                  <WeatherWidget
                    trekName={trek.name}
                    location={trek.startPoint}
                  />
                </div>

                {/* Best season grid */}
                <h3
                  className="font-bold text-base mb-3"
                  style={{ color: "var(--ew-text)" }}
                >
                  Best Season to Visit
                </h3>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 mb-2">
                  {ALL_MONTHS.map((m) => {
                    const active = activeBestMonths.includes(m);
                    return (
                      <div
                        key={m}
                        className="text-center rounded py-1.5 text-[11px] font-semibold transition-colors"
                        style={
                          active
                            ? {
                                backgroundColor: "var(--ew-green)",
                                color: "#fff",
                              }
                            : {
                                backgroundColor: "var(--ew-gray-lt)",
                                color: "var(--ew-gray-dark)",
                                border: "1px solid var(--ew-gray-mid)",
                              }
                        }
                      >
                        {m}
                      </div>
                    );
                  })}
                </div>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  Best season:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {trek.bestSeason}
                  </span>
                </p>
              </motion.div>
            )}

            {/* ────── ITINERARY ────── */}
            {activeTab === "Itinerary" && (
              <motion.div
                key="itinerary"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-3">
                  {itinerary.map((day, i) => (
                    <div
                      key={`day-${i + 1}`}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                    >
                      {/* Day accordion header */}
                      <button
                        type="button"
                        onClick={() => setOpenDay(openDay === i ? null : i)}
                        className="w-full flex items-center gap-4 p-4 text-left transition-colors"
                        style={{
                          backgroundColor:
                            openDay === i
                              ? "var(--ew-red-lt)"
                              : "var(--ew-gray-lt)",
                        }}
                        data-ocid={`trek_detail.itinerary.day.${i + 1}`}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{
                            backgroundColor: "var(--ew-red)",
                            color: "#fff",
                          }}
                        >
                          D{i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-bold text-sm truncate"
                            style={{ color: "var(--ew-text)" }}
                          >
                            Day {i + 1}: {day.title}
                          </p>
                          <p
                            className="text-[12px]"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            {day.stay} · ~{day.altitude.toLocaleString()}m
                          </p>
                        </div>
                        <ChevronRight
                          size={18}
                          style={{
                            color: "var(--ew-gray-dark)",
                            transform: openDay === i ? "rotate(90deg)" : "none",
                            transition: "transform 0.2s",
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {openDay === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="p-4 border-t"
                              style={{ borderColor: "var(--ew-gray-mid)" }}
                            >
                              <p
                                className="text-sm leading-relaxed mb-3"
                                style={{ color: "var(--ew-text-lt)" }}
                              >
                                {day.desc}
                              </p>
                              {/* Meal icons */}
                              <div className="flex items-center gap-3 text-xs">
                                <span
                                  className="font-medium"
                                  style={{ color: "var(--ew-text)" }}
                                >
                                  Meals:
                                </span>
                                {["Breakfast", "Lunch", "Dinner"].map(
                                  (meal, mi) => (
                                    <span
                                      key={meal}
                                      className="px-2 py-0.5 rounded-full font-medium"
                                      style={
                                        day.meals[mi]
                                          ? {
                                              backgroundColor:
                                                "var(--ew-orange-lt)",
                                              color: "var(--ew-orange)",
                                            }
                                          : {
                                              backgroundColor:
                                                "var(--ew-gray-lt)",
                                              color: "var(--ew-gray-dark)",
                                            }
                                      }
                                    >
                                      {meal}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Fitness Calculator (Itinerary tab) ── */}
            {activeTab === "Itinerary" && (
              <motion.div
                key="fitness"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FitnessCalculator
                  trekDifficulty={trek.difficulty}
                  trekAltitude={trek.altitude}
                  trekDuration={trek.duration}
                />
                {/* Download PDF at bottom of Itinerary */}
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => downloadTrekItineraryPDF(trek)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
                    style={{
                      backgroundColor: "var(--ew-orange)",
                      color: "#fff",
                    }}
                    data-ocid="trek_detail.itinerary.download_pdf_button"
                  >
                    📥 Download Full Itinerary PDF
                  </button>
                </div>
              </motion.div>
            )}
            {activeTab === "Inclusions & Exclusions" && (
              <motion.div
                key="inclusions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Two-column layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* INCLUDED column */}
                  <div
                    className="rounded-2xl overflow-hidden shadow-card"
                    style={{ border: "1px solid #a5d6a7" }}
                  >
                    <div
                      className="px-5 py-3 font-bold text-sm flex items-center gap-2"
                      style={{ backgroundColor: "#2E7D32", color: "#fff" }}
                    >
                      <CheckCircle2 size={15} />
                      What's INCLUDED
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#E8F5E9" }}>
                      <ul className="space-y-2.5">
                        {[
                          "Accommodation (tent/guesthouse as per itinerary)",
                          "All meals during the trek (breakfast, lunch, dinner, evening snacks)",
                          "Certified NCISM mountain trek leader",
                          "Trek support staff (cook + helper for groups 5+)",
                          "Forest department permits and national park entry fees",
                          "Quality camping equipment (high-altitude tents, sleeping mats, dining tent)",
                          "First-aid medical kit with AMS (Altitude Mountain Sickness) treatment",
                          "Portable oxygen cylinder (1 per group)",
                          "Trekora branded trek backpack cover (complimentary)",
                          "Safety equipment (rope, harness for technical sections)",
                          "Welcome and farewell meals",
                          "Daily morning tea/coffee at campsite",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            <CheckCircle2
                              size={14}
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: "#2E7D32" }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* EXCLUDED column */}
                  <div
                    className="rounded-2xl overflow-hidden shadow-card"
                    style={{ border: "1px solid #ef9a9a" }}
                  >
                    <div
                      className="px-5 py-3 font-bold text-sm flex items-center gap-2"
                      style={{
                        backgroundColor: "var(--ew-red)",
                        color: "#fff",
                      }}
                    >
                      <XCircle size={15} />
                      What's NOT INCLUDED
                    </div>
                    <div className="p-4" style={{ backgroundColor: "#FFEBEE" }}>
                      <ul className="space-y-2.5">
                        {[
                          "Transport to and from the trek base camp",
                          "Personal trekking gear (poles, boots, gaiters, rain gear)",
                          "Travel insurance (strongly recommended — we can arrange for ₹350)",
                          "Personal medication (antacids, paracetamol, personal prescriptions)",
                          "Tips and gratuity for guides and porters (voluntary, recommended)",
                          "Any meals before and after the trek",
                          "Helicopter evacuation charges (unless travel insurance covers it)",
                          "Porter charges for personal luggage (available at extra cost)",
                          "Alcoholic beverages",
                          "Any item of personal nature",
                          "GST 5% on total invoice amount",
                          "Monument/temple entry fees (if applicable)",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            <XCircle
                              size={14}
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: "var(--ew-red)" }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cancellation Policy accordion */}
                <div
                  className="bg-white rounded-2xl shadow-card overflow-hidden"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                >
                  <button
                    type="button"
                    onClick={() => setCancellationOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    style={{
                      backgroundColor: cancellationOpen
                        ? "var(--ew-orange-lt)"
                        : "var(--ew-gray-lt)",
                    }}
                    data-ocid="trek_detail.cancellation_policy_toggle"
                  >
                    <span
                      className="font-bold text-sm"
                      style={{ color: "var(--ew-text)" }}
                    >
                      📋 Cancellation Policy
                    </span>
                    <ChevronRight
                      size={18}
                      style={{
                        color: "var(--ew-gray-dark)",
                        transform: cancellationOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  <AnimatePresence>
                    {cancellationOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 py-4">
                          <table className="w-full text-sm">
                            <thead>
                              <tr
                                style={{
                                  borderBottom: "2px solid var(--ew-gray-mid)",
                                }}
                              >
                                <th
                                  className="text-left py-2 font-bold"
                                  style={{ color: "var(--ew-text)" }}
                                >
                                  When you cancel
                                </th>
                                <th
                                  className="text-right py-2 font-bold"
                                  style={{ color: "var(--ew-text)" }}
                                >
                                  Refund amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                {
                                  when: "30+ days before trek start",
                                  refund: "Full refund (100%)",
                                  color: "#2E7D32",
                                },
                                {
                                  when: "15–29 days before trek start",
                                  refund: "50% refund",
                                  color: "var(--ew-orange)",
                                },
                                {
                                  when: "7–14 days before trek start",
                                  refund: "25% refund",
                                  color: "var(--ew-orange)",
                                },
                                {
                                  when: "Less than 7 days before start",
                                  refund: "No refund",
                                  color: "var(--ew-red)",
                                },
                                {
                                  when: "Cancelled by Trekora (weather/force majeure)",
                                  refund: "Full refund or free reschedule",
                                  color: "#2E7D32",
                                },
                              ].map((row, i) => (
                                <tr
                                  key={row.when}
                                  style={{
                                    borderBottom:
                                      i < 4
                                        ? "1px solid var(--ew-gray-mid)"
                                        : "none",
                                    backgroundColor:
                                      i % 2 === 0
                                        ? "var(--ew-gray-lt)"
                                        : "white",
                                  }}
                                >
                                  <td
                                    className="py-2 pr-4"
                                    style={{ color: "var(--ew-text-lt)" }}
                                  >
                                    {row.when}
                                  </td>
                                  <td
                                    className="py-2 text-right font-semibold"
                                    style={{ color: row.color }}
                                  >
                                    {row.refund}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ────── PHOTOS ────── */}
            {activeTab === "Photos" && (
              <motion.div
                key="photos"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-5">Photos & Videos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                  {trek.images.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className="relative overflow-hidden rounded-xl group aspect-video"
                    >
                      <img
                        src={img.replace("w=1200", "w=400")}
                        alt={`${trek.name} view ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                        <Share2
                          size={22}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </button>
                  ))}
                </div>
                {/* Trekker Community Photos */}
                <TrekkerPhotoWall trekSlug={trek.slug} />

                {/* YouTube embeds */}
                <h3
                  className="font-bold text-base mb-3"
                  style={{ color: "var(--ew-text)" }}
                >
                  Trek Videos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: "Rz5g2-_Gu1c",
                      title: `${trek.name} — Full Trek Experience`,
                    },
                    {
                      id: "ypnRIHdlGE8",
                      title: `${trek.name} — Highlights & Tips`,
                    },
                  ].map((v) => (
                    <a
                      key={v.id}
                      href={`https://www.youtube.com/watch?v=${v.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block rounded-xl overflow-hidden"
                    >
                      <img
                        src={trek.image}
                        alt={v.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
                          style={{ backgroundColor: "var(--ew-red)" }}
                        >
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-white ml-1" />
                        </div>
                      </div>
                      <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium text-shadow">
                        {v.title}
                      </p>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ────── MAP ────── */}
            {activeTab === "Map & Route" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-5">
                  Trek Map & Altitude Profile
                </h2>

                {trek.coordinates ? (
                  <>
                    <TrekMap
                      trekName={trek.name}
                      coordinates={trek.coordinates}
                      distance={`${trek.distance} km`}
                      elevationGain={`~${(trek.altitude - Math.round(trek.altitude * 0.3)).toLocaleString()}m`}
                      highestPoint={`${trek.altitude.toLocaleString()}m`}
                    />

                    <div
                      className="mt-6 rounded-xl p-4"
                      style={{
                        backgroundColor: "var(--ew-gray-lt)",
                        border: "1px solid var(--ew-gray-mid)",
                      }}
                    >
                      <h3
                        className="font-bold text-sm mb-4"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Altitude Profile
                      </h3>
                      <AltitudeChart
                        altitudeProfile={trek.coordinates.altitudeProfile}
                        trekName={trek.name}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className="rounded-xl overflow-hidden flex flex-col items-center justify-center py-16 text-center"
                    style={{
                      backgroundColor: "var(--ew-gray-lt)",
                      border: "1px solid var(--ew-gray-mid)",
                    }}
                  >
                    <MapPin
                      size={48}
                      className="mb-3"
                      style={{ color: "var(--ew-orange)" }}
                    />
                    <p
                      className="font-bold text-base mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Map Coming Soon
                    </p>
                    <p
                      className="text-sm mb-5"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      Trail coordinates for {trek.name} are being mapped.
                    </p>
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(`${trek.name} trek route India`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "How to Reach" && (
              <motion.div
                key="how-to-reach"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  How to Reach
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Plane className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        By Air
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {trek.state === "uttarakhand"
                          ? "Jolly Grant Airport, Dehradun (DED) is the nearest airport, approximately 250-300 km from most trek base camps. Delhi IGI Airport is also accessible via Haridwar/Rishikesh."
                          : "Bhuntar Airport, Kullu (KUU) is the nearest airport for Himachal treks. Chandigarh Airport (IXC) and Delhi Airport (DEL) are alternative options via road."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Train className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        By Train
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {trek.state === "uttarakhand"
                          ? "Haridwar Railway Station (HW) and Rishikesh Railway Station (RKSH) are the main railheads. Dehradun Station (DDN) is also well-connected from Delhi and major cities."
                          : "Chandigarh Railway Station (CDG) and Kalka Station (KLK) are the main railheads. The Shimla-Kalka Toy Train offers a scenic mountain journey to Shimla."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Car className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        By Road
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {trek.state === "uttarakhand"
                          ? `${trek.startPoint} is well-connected by road. Buses and shared taxis operate from Haridwar, Rishikesh, and Dehradun. GMOU buses run daily routes to most base camps.`
                          : `${trek.startPoint} is accessible via NH-3 (Manali Road) and NH-5 (Hindustan-Tibet Road). HRTC buses and private taxis connect from Shimla, Manali, and Chandigarh.`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bus className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        By Bus / Shared Taxi
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {trek.state === "uttarakhand"
                          ? "GMOU and Uttarakhand Roadways buses operate from ISBT Kashmere Gate (Delhi) and Haridwar to most destinations. Shared jeeps and taxis from Uttarkashi, Chamoli, Rudraprayag cover last-mile connectivity."
                          : "HRTC (HP Tourism buses) and private operators connect Chandigarh, Delhi, and Manali to Himachal trek bases. Shared taxis from Rampur, Kaza, Recong Peo for high-altitude routes."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ────── GEAR LIST ────── */}
            {activeTab === "Gear List" && (
              <motion.div
                key="gear"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-4">Complete Gear List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {GEAR_CATEGORIES.map((cat) => (
                    <div key={cat.label}>
                      <h3
                        className="font-bold text-sm mb-3 flex items-center gap-2"
                        style={{ color: "var(--ew-text)" }}
                      >
                        <span>{cat.icon}</span>
                        {cat.label}
                      </h3>
                      <ul className="space-y-1.5">
                        {cat.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            <span
                              className="w-4 h-4 rounded flex-shrink-0"
                              style={{
                                border: "1.5px solid var(--ew-gray-mid)",
                              }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {/* Rental CTA */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--ew-orange-lt)",
                    border: "1px solid var(--ew-orange)",
                  }}
                >
                  <p
                    className="font-bold text-sm mb-3"
                    style={{ color: "var(--ew-text)" }}
                  >
                    🏕️ Rent Equipment from ₹200/day
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {[
                      { item: "Trekking Poles", price: "₹150/day" },
                      { item: "Sleeping Bag", price: "₹200/day" },
                      { item: "Crampons", price: "₹100/day" },
                      { item: "Gaiters", price: "₹80/day" },
                      { item: "Backpack 50L", price: "₹200/day" },
                      { item: "Rain Jacket", price: "₹120/day" },
                    ].map((g) => (
                      <div
                        key={g.item}
                        className="bg-white rounded-lg p-2 text-center"
                        style={{ border: "1px solid var(--ew-gray-mid)" }}
                      >
                        <p
                          className="text-[11px] font-medium"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {g.item}
                        </p>
                        <p
                          className="text-[12px] font-bold"
                          style={{ color: "var(--ew-orange)" }}
                        >
                          {g.price}
                        </p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-primary text-sm"
                    data-ocid="trek_detail.rent_equipment_button"
                  >
                    Rent Equipment — Book Now
                  </button>
                </div>
              </motion.div>
            )}

            {/* ────── REVIEWS ────── */}
            {activeTab === "Reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card space-y-6"
              >
                <ShareSection title={trek.name} />
                <h2 className="section-title">Reviews & Ratings</h2>
                <ReviewSubmitForm trekSlug={slug} trekName={trek.name} />

                {/* Rating summary */}
                <div
                  className="flex flex-col sm:flex-row gap-6 items-start rounded-xl p-5"
                  style={{ backgroundColor: "var(--ew-gray-lt)" }}
                >
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {trek.rating}
                    </div>
                    <div className="flex justify-center my-1">
                      <StarRow rating={trek.rating} size={18} />
                    </div>
                    <p
                      className="text-xs"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {trek.reviewCount} reviews
                    </p>
                  </div>
                  <div className="flex-1 w-full space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct =
                        star === 5 ? 72 : star === 4 ? 20 : star === 3 ? 6 : 1;
                      return (
                        <div
                          key={star}
                          className="flex items-center gap-3 text-sm"
                        >
                          <span
                            className="text-xs w-3"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            {star}
                          </span>
                          <Star
                            size={11}
                            style={{ color: "var(--ew-gold)" }}
                            className="fill-[var(--ew-gold)]"
                          />
                          <div
                            className="flex-1 rounded-full h-2"
                            style={{ backgroundColor: "var(--ew-gray-mid)" }}
                          >
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: "var(--ew-orange)",
                              }}
                            />
                          </div>
                          <span
                            className="text-[11px] w-8"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review cards */}
                <div className="space-y-4">
                  {REVIEWS.map((r, i) => (
                    <div
                      key={r.name}
                      className="rounded-xl p-4"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                      data-ocid={`trek_detail.review.${i + 1}`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                            <div>
                              <p
                                className="font-semibold text-sm"
                                style={{ color: "var(--ew-text)" }}
                              >
                                {r.name}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "var(--ew-gray-dark)" }}
                              >
                                {r.city} · {r.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <StarRow rating={r.rating} size={13} />
                              <span
                                className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  backgroundColor: "var(--ew-red-lt)",
                                  color: "var(--ew-red)",
                                }}
                              >
                                {r.batch}
                              </span>
                            </div>
                          </div>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--ew-text-lt)" }}
                          >
                            {r.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Write a review */}
                <div
                  className="border-t pt-5"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                >
                  <h3
                    className="font-bold text-base mb-4"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Write a Review
                  </h3>
                  <form
                    className="space-y-3"
                    onSubmit={(e) => e.preventDefault()}
                    data-ocid="trek_detail.review_form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                        style={{
                          border: "1px solid var(--ew-gray-mid)",
                          color: "var(--ew-text)",
                        }}
                        data-ocid="trek_detail.review.name.input"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                        style={{
                          border: "1px solid var(--ew-gray-mid)",
                          color: "var(--ew-text)",
                        }}
                        data-ocid="trek_detail.review.email.input"
                      />
                    </div>
                    {/* Star picker */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Rating:
                      </span>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setReviewRating(s)}
                          aria-label={`Rate ${s} stars`}
                        >
                          <Star
                            size={22}
                            style={{ color: "var(--ew-gold)" }}
                            className={
                              s <= (hoverRating || reviewRating)
                                ? "fill-[var(--ew-gold)]"
                                : "fill-none"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      placeholder="Share your trek experience..."
                      rows={4}
                      required
                      className="w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-none"
                      style={{
                        border: "1px solid var(--ew-gray-mid)",
                        color: "var(--ew-text)",
                      }}
                      data-ocid="trek_detail.review.textarea"
                    />
                    <button
                      type="submit"
                      className="btn-secondary text-sm"
                      data-ocid="trek_detail.review.submit_button"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ────── FAQs ────── */}
            {activeTab === "FAQs" && (
              <motion.div
                key="faqs"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <h2 className="section-title mb-5">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {FAQS.map((faq, i) => (
                    <div
                      key={faq.q}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                      data-ocid={`trek_detail.faq.${i + 1}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 text-left"
                        style={{
                          backgroundColor:
                            openFaq === i ? "var(--ew-red-lt)" : "#fff",
                        }}
                      >
                        <span
                          className="font-semibold text-sm pr-4"
                          style={{
                            color:
                              openFaq === i
                                ? "var(--ew-red)"
                                : "var(--ew-text)",
                          }}
                        >
                          {faq.q}
                        </span>
                        <ChevronRight
                          size={18}
                          style={{
                            color: "var(--ew-gray-dark)",
                            transform: openFaq === i ? "rotate(90deg)" : "none",
                            transition: "transform 0.2s",
                            flexShrink: 0,
                          }}
                        />
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <p
                              className="px-4 pb-4 text-sm leading-relaxed border-t"
                              style={{
                                color: "var(--ew-text-lt)",
                                borderColor: "var(--ew-gray-mid)",
                              }}
                            >
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT COLUMN — Sticky Booking Sidebar ── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <div
                className="bg-white rounded-2xl shadow-elevated overflow-hidden"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid="trek_detail.booking_sidebar"
              >
                {/* Header */}
                <div
                  className="px-5 py-4"
                  style={{ backgroundColor: "var(--ew-red)", color: "#fff" }}
                >
                  <p
                    className="text-xs font-medium"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                  >
                    Starting from
                  </p>
                  <div className="flex items-end gap-2">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      ₹{trek.price.toLocaleString("en-IN")}
                    </span>
                    <span
                      className="text-sm mb-0.5"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      / person
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      {
                        label: "Duration",
                        value: `${trek.duration}D`,
                        icon: <Clock size={14} />,
                      },
                      {
                        label: "Difficulty",
                        value: trek.difficulty.split("-")[0],
                        icon: <Shield size={14} />,
                      },
                      {
                        label: "Altitude",
                        value: `${Math.round(trek.altitude / 100) * 100}m`,
                        icon: <Mountain size={14} />,
                      },
                    ].map(({ label, value, icon }) => (
                      <div
                        key={label}
                        className="rounded-lg py-2"
                        style={{ backgroundColor: "var(--ew-gray-lt)" }}
                      >
                        <span
                          className="flex justify-center mb-0.5"
                          style={{ color: "var(--ew-red)" }}
                        >
                          {icon}
                        </span>
                        <p
                          className="text-[10px]"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-xs font-bold"
                          style={{ color: "var(--ew-text)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Date picker */}
                  <div>
                    <label
                      htmlFor="trek-date"
                      className="text-xs font-semibold block mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Select Batch Date
                    </label>
                    {/* Availability info */}
                    <div
                      className="rounded-lg px-3 py-2.5 mb-2 text-[12px]"
                      style={{
                        backgroundColor: "var(--ew-orange-lt)",
                        border: "1px solid var(--ew-orange)",
                        color: "var(--ew-orange)",
                      }}
                    >
                      <p className="font-semibold mb-0.5">
                        📅 Flexible Batch Dates
                      </p>
                      <p style={{ color: "var(--ew-text-lt)" }}>
                        Select your preferred date in the booking form. Our team
                        confirms availability within 2 hours.
                      </p>
                    </div>
                  </div>

                  {/* Group size stepper */}
                  <div>
                    <label
                      htmlFor="group-size-display"
                      className="text-xs font-semibold block mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Group Size
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGroupSize((n) => Math.max(1, n - 1))}
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors"
                        style={{
                          backgroundColor: "var(--ew-red)",
                          color: "#fff",
                        }}
                        aria-label="Decrease group size"
                        data-ocid="trek_detail.group_size.decrement"
                      >
                        <Minus size={16} />
                      </button>
                      <span
                        id="group-size-display"
                        className="text-xl font-bold w-8 text-center"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {groupSize}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGroupSize((n) => Math.min(12, n + 1))}
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold transition-colors"
                        style={{
                          backgroundColor: "var(--ew-red)",
                          color: "#fff",
                        }}
                        aria-label="Increase group size"
                        data-ocid="trek_detail.group_size.increment"
                      >
                        <Plus size={16} />
                      </button>
                      <span
                        className="text-xs"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        persons (max 12)
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
                          key: keyof typeof addOns;
                          label: string;
                          price: number;
                          per: string;
                        }[]
                      ).map(({ key, label, price, per }) => (
                        <label
                          key={key}
                          className="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 transition-colors"
                          style={{
                            backgroundColor: addOns[key]
                              ? "var(--ew-orange-lt)"
                              : "var(--ew-gray-lt)",
                            border: `1px solid ${addOns[key] ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={addOns[key]}
                            onChange={(e) =>
                              setAddOns((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            className="w-3.5 h-3.5"
                            data-ocid={`trek_detail.addon.${key}`}
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

                  {/* Price breakdown */}
                  <div
                    className="rounded-xl p-3 space-y-1.5 text-sm"
                    style={{ backgroundColor: "var(--ew-gray-lt)" }}
                  >
                    <div className="flex justify-between">
                      <span style={{ color: "var(--ew-text-lt)" }}>
                        Base (₹{trek.price.toLocaleString()} × {groupSize})
                      </span>
                      <span style={{ color: "var(--ew-text)" }}>
                        ₹{baseTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    {addOns.gear && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--ew-text-lt)" }}>
                          Gear Rental × {groupSize}
                        </span>
                        <span style={{ color: "var(--ew-text)" }}>
                          ₹{(800 * groupSize).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    {addOns.insurance && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--ew-text-lt)" }}>
                          Insurance × {groupSize}
                        </span>
                        <span style={{ color: "var(--ew-text)" }}>
                          ₹{(350 * groupSize).toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    {addOns.transport && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--ew-text-lt)" }}>
                          Base Transport (group)
                        </span>
                        <span style={{ color: "var(--ew-text)" }}>₹1,200</span>
                      </div>
                    )}
                    {addOns.photographer && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--ew-text-lt)" }}>
                          Photographer (group)
                        </span>
                        <span style={{ color: "var(--ew-text)" }}>₹2,500</span>
                      </div>
                    )}
                    <div
                      className="flex justify-between font-bold pt-1.5 border-t"
                      style={{ borderColor: "var(--ew-gray-mid)" }}
                    >
                      <span style={{ color: "var(--ew-text)" }}>Total</span>
                      <span
                        className="text-base"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2">
                    <Link
                      to="/book"
                      className="flex items-center justify-center w-full font-bold text-lg rounded-xl transition-colors"
                      style={{
                        backgroundColor: "var(--ew-red)",
                        color: "#fff",
                        height: 56,
                      }}
                      data-ocid="trek_detail.book_button"
                      onClick={() =>
                        gtmPush({
                          event: "add_to_cart",
                          item_name: trek.name,
                          item_price: trek.price,
                        })
                      }
                    >
                      Book Now
                    </Link>
                    <button
                      type="button"
                      onClick={() => downloadTrekItineraryPDF(trek)}
                      className="flex items-center justify-center gap-2 w-full font-semibold text-sm rounded-xl border-2 transition-colors"
                      style={{
                        borderColor: "var(--ew-orange)",
                        color: "var(--ew-orange)",
                        height: 44,
                      }}
                      data-ocid="trek_detail.download_pdf_button"
                    >
                      📥 Download Full Itinerary PDF
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full font-semibold text-sm rounded-xl border transition-colors"
                      style={{
                        borderColor: "var(--ew-gray-mid)",
                        color: "var(--ew-gray-dark)",
                        height: 40,
                      }}
                      data-ocid="trek_detail.query_button"
                      onClick={() => setQuerySheetOpen(true)}
                    >
                      Send Query
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
                        data-ocid="trek_detail.call_button"
                      >
                        <Phone size={14} /> Call Expert
                      </a>
                      <a
                        href={`https://wa.me/919810012345?text=${encodeURIComponent(`Hi! I want to book the ${trek.name} trek. Please share details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 font-semibold text-xs rounded-xl border-2 transition-colors"
                        style={{
                          borderColor: "#25D366",
                          color: "#25D366",
                          height: 40,
                        }}
                        data-ocid="trek_detail.whatsapp_button"
                      >
                        💬 WhatsApp
                      </a>
                    </div>
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

                  {/* Social proof rotating */}
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
                        "🔥 12 bookings made this week!",
                        "⏰ Next batch filling fast — only 4 spots left",
                      ][socialProofIdx]
                    }
                  </div>

                  {/* EMI Calculator */}
                  <EMICalculator price={trek.price} trekName={trek.name} />

                  {/* Trust Signals */}
                  <TrustSignals trekSlug={trek.slug} trekId={trek.id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Treks ── */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="section-title mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((t, i) => (
                <TrekCard key={t.id} trek={t} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── SEO Tag Cloud ── */}
      {trek && (
        <SeoTagCloud
          name={trek.name}
          slug={trek.slug}
          state={trek.state}
          difficulty={trek.difficulty}
          duration={trek.duration}
          type="trek"
          relatedSlugs={related.map((r) => r.slug)}
          relatedNames={related.map((r) => r.name)}
        />
      )}

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 shadow-elevated"
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid var(--ew-gray-mid)",
          height: 72,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[11px]" style={{ color: "var(--ew-gray-dark)" }}>
            Starting from
          </p>
          <p
            className="font-bold text-lg leading-none"
            style={{ color: "var(--ew-orange)" }}
          >
            ₹{trek.price.toLocaleString("en-IN")}
          </p>
        </div>
        <button
          type="button"
          className="btn-primary text-sm"
          style={{ borderRadius: "0.75rem", height: 44, padding: "0 1.25rem" }}
          data-ocid="trek_detail.mobile_book_button"
          onClick={() => setBookingDrawerOpen(true)}
        >
          Book Now
        </button>
        <Link
          to="/treks"
          className="flex items-center justify-center w-10 h-10 rounded-lg"
          style={{
            border: "1px solid var(--ew-gray-mid)",
            color: "var(--ew-text)",
          }}
          aria-label="Back to treks"
        >
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* ── WhatsApp CTA (scroll-triggered) ── */}
      <WhatsAppCTA trekName={trek.name} />

      {/* ── Booking Drawer ── */}
      <BookingDrawer
        isOpen={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        trekName={trek.name}
        trekSlug={trek.slug}
        price={trek.price}
        duration={`${trek.duration} Days`}
        difficulty={trek.difficulty}
        image={trek.image}
      />

      {/* ── Query Bottom Sheet ── */}
      <QueryBottomSheet
        isOpen={querySheetOpen}
        onClose={() => setQuerySheetOpen(false)}
        trekName={trek.name}
      />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
            onClick={() => setLightboxIndex(null)}
            data-ocid="trek_detail.lightbox"
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              data-ocid="trek_detail.lightbox.close_button"
            >
              <XCircle size={22} className="text-white" />
            </button>
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (i) =>
                    ((i ?? 0) - 1 + trek.images.length) % trek.images.length,
                );
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} className="text-white" />
            </button>
            <motion.img
              key={lightboxIndex}
              src={trek.images[lightboxIndex]}
              alt={`${trek.name} — full view ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) => ((i ?? 0) + 1) % trek.images.length);
              }}
              aria-label="Next image"
            >
              <ChevronRight size={22} className="text-white" />
            </button>
            <p className="absolute bottom-4 text-white text-sm">
              {lightboxIndex + 1} / {trek.images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
