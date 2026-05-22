import { SITE_EMAIL, SITE_PHONE_TEL } from "@/lib/site-contact";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Leaf,
  RotateCcw,
  Shield,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import HomepageReviews from "../components/HomepageReviews";
import InstagramSection from "../components/InstagramSection";
import { SEOHead } from "../components/SEOHead";
import SocialProofTicker from "../components/SocialProofTicker";
import TrekCard from "../components/TrekCard";
import TrekRecommenderQuiz from "../components/TrekRecommenderQuiz";
import UpcomingBatchesSection from "../components/UpcomingBatchesSection";
import YouTubeSection from "../components/YouTubeSection";
import OptimizedImage from "../components/media/OptimizedImage";
import { EnquiryButton } from "../components/ui/EnquiryButton";
import TrustBadgesStrip from "../components/ui/TrustBadgesStrip";
import { BLOGS } from "../data/blogs";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

// ─── Hero Banner Sets ────────────────────────────────────────────────────────

interface HeroBanner {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
}

interface HeroSet {
  left: HeroBanner;
  right: HeroBanner[];
}

/** Roopkund main hero — Cloudinary uploaded asset (portrait source; `object-cover` in layout). */
const HOME_HERO_ROOPKUND_MAIN_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778697592/h1vliuxnes32vhhovzao.jpg";

/** Valley of Flowers main hero — Cloudinary `hero/home` asset. */
const HOME_HERO_VALLEY_OF_FLOWERS_MAIN_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778700231/pkew3vrpnvqbwbdxltff.jpg";

/** Char Dham collage — hero strip + offers (`hero/home`). */
const HOME_CHAR_DHAM_COLLAGE_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778700474/v5bizj0wiktbzvbja1xr.jpg";

/** Brahmatal winter trek — hero slide + UK destinations (`hero/home`). */
const HOME_HERO_BRAHMATAL_WINTER_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778700831/cqkhz2o0jehuskfikrih.jpg";

/** Triund trek — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_TRIUND_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778701115/zm174z1j9ooi3tjjenhe.jpg";

/** Hampta Pass trek — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_HAMPTA_PASS_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778701266/e0jblnje7uswaoa324cr.jpg";

/** Kedarnath Dham — hero strip + UK destinations (`hero/home`). */
const HOME_HERO_KEDARNATH_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778727122/glpponn0t6itj3cwhxo3.jpg";

/** Spiti Valley — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_SPITI_VALLEY_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778727342/c8ls5afaoyxnp6dih8ho.jpg";

/** Chandratal Lake — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_CHANDRATAL_LAKE_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778727960/c4nzcaqcgazxdv1ohjpt.jpg";

/** Kinnaur Kailash Yatra — hero strip (`hero/home`). */
const HOME_HERO_KINNAUR_KAILASH_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778728123/pfdxq1pqmnxmfgt1faxf.jpg";

const HERO_SETS: HeroSet[] = [
  {
    left: {
      image: HOME_HERO_ROOPKUND_MAIN_IMAGE,
      title: "Roopkund Trek",
      subtitle: "The Skeleton Lake Awaits",
      cta: "Explore Now",
      ctaLink: "/treks/roopkund-trek",
    },
    right: [
      {
        image: HOME_CHAR_DHAM_COLLAGE_IMAGE,
        title: "Char Dham Yatra 2025",
        subtitle: "Sacred Journey · Limited Spots",
        cta: "Book Yatra",
        ctaLink: "/yatras/char-dham-yatra",
      },
      {
        image: HOME_HERO_TRIUND_IMAGE,
        title: "Triund Weekend Trek",
        subtitle: "2 Days from ₹3,500",
        cta: "View Package",
        ctaLink: "/treks/triund-trek",
      },
      {
        image: HOME_HERO_HAMPTA_PASS_IMAGE,
        title: "Hampta Pass",
        subtitle: "Two Worlds in 5 Days",
        cta: "Book Now",
        ctaLink: "/treks/hampta-pass",
      },
    ],
  },
  {
    left: {
      image: HOME_HERO_VALLEY_OF_FLOWERS_MAIN_IMAGE,
      title: "Valley of Flowers",
      subtitle: "A Bloom Like No Other",
      cta: "Explore",
      ctaLink: "/treks/valley-of-flowers",
    },
    right: [
      {
        image: HOME_HERO_KEDARNATH_IMAGE,
        title: "Kedarnath Dham",
        subtitle: "Divine Journey · Book Early",
        cta: "Book Now",
        ctaLink: "/yatras/char-dham-yatra",
      },
      {
        image: HOME_HERO_SPITI_VALLEY_IMAGE,
        title: "Spiti Valley",
        subtitle: "The Last Horizon",
        cta: "Explore",
        ctaLink: "/treks/spiti-valley-trek",
      },
      {
        image:
          "https://images.unsplash.com/photo-1609766418204-94aaeaf0f4b7?w=700&q=80",
        title: "Mani Mahesh Yatra",
        subtitle: "Sacred Circuit · 9 Days",
        cta: "View Details",
        ctaLink: "/yatras/mani-mahesh-yatra",
      },
    ],
  },
  {
    left: {
      image: HOME_HERO_BRAHMATAL_WINTER_IMAGE,
      title: "Brahmatal Winter Trek",
      subtitle: "Frozen Wonderland Awaits",
      cta: "Book Winter Trek",
      ctaLink: "/treks/brahmatal-trek",
    },
    right: [
      {
        image: HOME_HERO_CHANDRATAL_LAKE_IMAGE,
        title: "Chandratal Lake",
        subtitle: "The Moon Lake · 5 Days",
        cta: "View Package",
        ctaLink: "/treks/chandratal-lake-trek",
      },
      {
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80",
        title: "Pin Parvati Pass",
        subtitle: "India's Most Challenging Crossing",
        cta: "Explore",
        ctaLink: "/treks/pin-parvati-pass",
      },
      {
        image: HOME_HERO_KINNAUR_KAILASH_IMAGE,
        title: "Kinnaur Kailash Yatra",
        subtitle: "Parikrama of the Gods",
        cta: "Book Yatra",
        ctaLink: "/yatras/kinnaur-kailash-yatra",
      },
    ],
  },
];

// ─── Destination Grid Data ────────────────────────────────────────────────────

const UK_DESTINATIONS = [
  {
    name: "Roopkund",
    image: HOME_HERO_ROOPKUND_MAIN_IMAGE,
    price: "₹12,000",
    slug: "roopkund-trek",
  },
  {
    name: "Valley of Flowers",
    image: HOME_HERO_VALLEY_OF_FLOWERS_MAIN_IMAGE,
    price: "₹8,500",
    slug: "valley-of-flowers",
  },
  {
    name: "Kedarnath",
    image: HOME_HERO_KEDARNATH_IMAGE,
    price: "₹9,999",
    slug: "kedarnath-trek",
  },
  {
    name: "Brahmatal",
    image: HOME_HERO_BRAHMATAL_WINTER_IMAGE,
    price: "₹7,500",
    slug: "brahmatal-trek",
  },
  {
    name: "Rupin Pass",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80",
    price: "₹11,000",
    slug: "rupin-pass-trek",
  },
  {
    name: "Har Ki Dun",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    price: "₹8,000",
    slug: "har-ki-dun-trek",
  },
];

const HP_DESTINATIONS = [
  {
    name: "Triund",
    image: HOME_HERO_TRIUND_IMAGE,
    price: "₹3,500",
    slug: "triund-trek",
  },
  {
    name: "Hampta Pass",
    image: HOME_HERO_HAMPTA_PASS_IMAGE,
    price: "₹9,500",
    slug: "hampta-pass",
  },
  {
    name: "Chandratal Lake",
    image: HOME_HERO_CHANDRATAL_LAKE_IMAGE,
    price: "₹10,000",
    slug: "chandratal-lake-trek",
  },
  {
    name: "Sar Pass",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
    price: "₹8,000",
    slug: "sar-pass-trek",
  },
  {
    name: "Pin Parvati Pass",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    price: "₹18,000",
    slug: "pin-parvati-pass",
  },
  {
    name: "Spiti Valley",
    image: HOME_HERO_SPITI_VALLEY_IMAGE,
    price: "₹14,000",
    slug: "spiti-valley-trek",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    trek: "Kedarkantha Trek",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    review:
      "Absolutely magical winter experience! The guides were extremely knowledgeable and safety-conscious. Waking up to a snow-covered tent was surreal. Trekora made every moment count.",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    trek: "Roopkund Trek",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80",
    review:
      "The Roopkund trek was the most challenging yet rewarding experience of my life. The team handled everything perfectly — from food to tents to safety. The skeleton lake view was worth every step!",
  },
  {
    name: "Ananya Krishnan",
    city: "Bangalore",
    trek: "Valley of Flowers",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80",
    review:
      "Heaven on earth! 500 species of flowers in full bloom. I had zero trekking experience and the guides were incredibly patient. Already planning Hampta Pass next season.",
  },
  {
    name: "Amit Patel",
    city: "Ahmedabad",
    trek: "Hampta Pass",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&q=80",
    review:
      "Two completely different landscapes in one trek is mind-blowing. Lush Kullu valley to barren Spiti — the contrast is unreal. Excellent guide, excellent food, excellent memories!",
  },
  {
    name: "Sneha Reddy",
    city: "Hyderabad",
    trek: "Triund Trek",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80",
    review:
      "Perfect first trek! The Dhauladhar range at sunset is something I will never forget. Small group made it very comfortable. Will definitely book a longer trek with Trekora.",
  },
  {
    name: "Vikram Singh",
    city: "Jaipur",
    trek: "Char Dham Yatra",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80",
    review:
      "Spiritual journey of a lifetime. The team arranged everything perfectly — from permits to darshan at each dham. Highly recommended for anyone seeking divine blessings.",
  },
  {
    name: "Meera Nair",
    city: "Kochi",
    trek: "Brahmatal Trek",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80",
    review:
      "Brahmatal in winter is surreal. Frozen lake, snow-capped peaks, cozy camps. The team's professionalism gave me full confidence throughout. Will definitely come back!",
  },
  {
    name: "Arun Kapoor",
    city: "Pune",
    trek: "Kedarnath Trek",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&q=80",
    review:
      "Trekora transformed my Kedarnath trip into an adventure. The trail guidance, local knowledge, and hospitality were second to none. Spiritual and thrilling at once.",
  },
];

// ─── YouTube Videos ──────────────────────────────────────────────────────────

const _YOUTUBE_VIDEOS = [
  {
    id: "Rz5g2-_Gu1c",
    title: "Roopkund Trek — Skeleton Lake",
    thumb:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&q=80",
  },
  {
    id: "ypnRIHdlGE8",
    title: "Valley of Flowers Trek",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=480&q=80",
  },
  {
    id: "JsXuiahVIEQ",
    title: "Triund Trek from McLeod Ganj",
    thumb:
      "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=480&q=80",
  },
];

const _REELS = [
  {
    thumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80",
    title: "Brahmatal Winter",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=300&q=80",
    title: "Kedarnath Darshan",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
    title: "Pin Parvati",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=300&q=80",
    title: "Hampta Pass",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&q=80",
    title: "Kedarkantha Summit",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=300&q=80",
    title: "Chandratal Lake",
  },
];

// ─── Instagram Grid ──────────────────────────────────────────────────────────

const _INSTAGRAM_GRID = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    likes: 2341,
    caption: "Roopkund magic ✨",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    likes: 3201,
    caption: "Valley of Flowers in bloom 🌸",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80",
    likes: 4102,
    caption: "Kedarnath divine 🕉️",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1536086759-b94ed3e9e35a?w=400&q=80",
    likes: 1893,
    caption: "Hampta Pass crossing ❄️",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&q=80",
    likes: 2756,
    caption: "Chandratal moon lake 🌙",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    likes: 3451,
    caption: "Kedarkantha summit ❄️",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80",
    likes: 1654,
    caption: "Camp vibes at Brahmatal ⛺",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1556296240-b6b6e89c0f9f?w=400&q=80",
    likes: 2234,
    caption: "Triund golden hour 🌅",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80",
    likes: 1987,
    caption: "Rupin Pass snow wall! 🏔️",
  },
];

// ─── Upcoming Batches ────────────────────────────────────────────────────────

const BATCHES = [
  {
    trek: "Roopkund Trek",
    dates: "15–23 May 2025",
    duration: "8D/7N",
    slots: 4,
    price: 12000,
    full: false,
  },
  {
    trek: "Valley of Flowers",
    dates: "1–7 Aug 2025",
    duration: "6D/5N",
    slots: 0,
    price: 8500,
    full: true,
  },
  {
    trek: "Triund Trek",
    dates: "20–22 Apr 2025",
    duration: "2D/1N",
    slots: 8,
    price: 3500,
    full: false,
  },
  {
    trek: "Hampta Pass",
    dates: "10–15 Jun 2025",
    duration: "5D/4N",
    slots: 3,
    price: 9500,
    full: false,
  },
  {
    trek: "Kedarkantha Trek",
    dates: "5–11 Jan 2026",
    duration: "6D/5N",
    slots: 6,
    price: 7500,
    full: false,
  },
  {
    trek: "Brahmatal Trek",
    dates: "8–14 Feb 2026",
    duration: "6D/5N",
    slots: 0,
    price: 7500,
    full: true,
  },
];

// ─── Why Choose ──────────────────────────────────────────────────────────────

const WHY_CHOOSE = [
  {
    icon: Shield,
    title: "NCISM-Certified Guides",
    desc: "Every guide is NCISM & IMF certified with 5+ years of high-altitude experience.",
  },
  {
    icon: Users,
    title: "Small Groups (Max 12)",
    desc: "Intimate batches for a personalized, safe, and memorable trekking experience.",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Support",
    desc: "Round-the-clock coordination team and emergency evacuation network on standby.",
  },
  {
    icon: Leaf,
    title: "Eco-Responsible Trekking",
    desc: "Leave No Trace certified operations. We protect the mountains we explore.",
  },
  {
    icon: RotateCcw,
    title: "Flexible Cancellation",
    desc: "Full refund 30 days prior. 50% refund up to 15 days. Plans change — we get it.",
  },
  {
    icon: CreditCard,
    title: "EMI & Easy Payments",
    desc: "Pay 30% advance to book. Balance in easy EMIs via Razorpay, UPI, Net Banking.",
  },
];

// ─── Season tabs ─────────────────────────────────────────────────────────────

type Season = "Summer" | "Monsoon" | "Autumn" | "Winter";

const SEASON_TREKS: Record<Season, string[]> = {
  Summer: [
    "valley-of-flowers",
    "roopkund-trek",
    "har-ki-dun",
    "kedarkantha-trek",
  ],
  Monsoon: ["valley-of-flowers", "kheerganga", "hampta-pass", "beas-kund"],
  Autumn: [
    "roopkund-trek",
    "pangarchulla-peak",
    "chandratal-lake",
    "kedarnath-trek",
  ],
  Winter: [
    "kedarkantha-trek",
    "triund-trek",
    "brahmatal-trek",
    "deoriatal-chandrashila",
  ],
};

interface SeasonMeta {
  desc: string;
  months: string;
  temp: string;
  conditions: string;
  emoji: string;
}

const SEASON_META: Record<Season, SeasonMeta> = {
  Summer: {
    emoji: "☀️",
    months: "Apr–Jun",
    desc: "Crisp alpine air, wildflowers blooming across meadows, snow still on high passes. Ideal for most Himalayan treks — Valley of Flowers (UNESCO meadows), Roopkund (skeleton lake visible), Kedarkantha summit, Har Ki Dun valley.",
    temp: "10–22°C in valleys, –5 to 5°C at camps above 4,000m",
    conditions: "Clear skies, snow bridges on passes, wildflower meadows",
  },
  Monsoon: {
    emoji: "🌧️",
    months: "Jul–Aug",
    desc: "Dramatic cloud formations, roaring waterfalls, rhododendrons and Brahma Kamal in peak bloom. Valley of Flowers is exclusively a monsoon trek — UNESCO meadows burst with 300+ wildflower species. Lower crowds, mystical mist.",
    temp: "15–25°C at valley altitudes",
    conditions: "Lush greenery, leeches in lower sections, mist-covered peaks",
  },
  Autumn: {
    emoji: "🍂",
    months: "Sep–Oct",
    desc: "Crystal clear skies, fresh mountain air post-monsoon, views extending 300km. Best season for summit treks — Kedarkantha (3,800m), Pangarchulla, Brahmatal lake. Char Dham yatra season ends October. Peak season for photography.",
    temp: "5–18°C, nights cold at altitude",
    conditions:
      "Crystal clear visibility, stable weather, best for photography",
  },
  Winter: {
    emoji: "❄️",
    months: "Nov–Mar",
    desc: "Snow-covered trails, frozen lakes, ethereal silence. Kedarkantha is India's best winter trek (snow guaranteed). Triund, Kheerganga accessible with warm gear. Most Himalayan temples closed — but the snow landscapes are breathtaking.",
    temp: "–5 to 10°C in lower sections, –15 to –20°C at high camps",
    conditions: "Heavy snowfall, frozen lakes, very cold nights",
  },
};

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  end,
  suffix,
  started,
}: { end: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);
  return (
    <span className="counter-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Hero Banner Grid ────────────────────────────────────────────────────────

function HeroBannerGrid() {
  const [setIdx, setSetIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSetIdx((prev) => (prev + 1) % HERO_SETS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const set = HERO_SETS[setIdx];

  return (
    <section
      className="w-full"
      data-ocid="hero.section"
      style={{ background: "#111", position: "relative" }}
    >
      <div
        className="container mx-auto px-4 py-4"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          /* Fixed height prevents any layout shift that could trigger scroll restoration */
          minHeight: 520,
        }}
      >
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto",
            /* Prevent height change on content swap */
            height: "100%",
          }}
        >
          {/* Left — tall */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{ minHeight: 280, height: "clamp(280px, 50vw, 420px)" }}
          >
            <OptimizedImage
              key={`hero-left-${setIdx}`}
              src={set.left.image}
              alt={set.left.title}
              fill
              variant="hero"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="min-h-[420px]"
              style={{ minHeight: 420 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/80 text-xs uppercase tracking-widest mb-1">
                Trekora Featured
              </p>
              <h2 className="text-white font-bold text-2xl md:text-3xl mb-1 text-shadow">
                {set.left.title}
              </h2>
              <p className="text-white/90 text-sm mb-4 text-shadow">
                {set.left.subtitle}
              </p>
              <Link
                to="/treks"
                className="btn-primary text-sm"
                data-ocid="hero.left_cta"
              >
                {set.left.cta}
              </Link>
            </div>
          </div>
          {/* Right — 3 stacked */}
          <div
            className="flex flex-col gap-2"
            style={{ height: "clamp(280px, 50vw, 420px)" }}
          >
            {set.right.map((b, i) => (
              <div
                key={b.title}
                className="relative rounded-lg overflow-hidden flex-1"
                style={{ minHeight: 128 }}
              >
                <OptimizedImage
                  src={b.image}
                  alt={b.title}
                  fill
                  variant="hero"
                  sizes="(max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                <div className="absolute inset-0 flex flex-col justify-center px-4">
                  <h3 className="text-white font-bold text-base leading-tight text-shadow">
                    {b.title}
                  </h3>
                  <p className="text-white/85 text-xs mb-2 text-shadow">
                    {b.subtitle}
                  </p>
                  <Link
                    to="/treks"
                    className="btn-primary text-xs py-1 px-3"
                    style={{ width: "fit-content" }}
                    data-ocid={`hero.right_cta.${i + 1}`}
                  >
                    {b.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-3">
          {HERO_SETS.map((heroSet, i) => (
            <button
              key={heroSet.left.title}
              type="button"
              onClick={() => setSetIdx(i)}
              aria-label={`Banner set ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === setIdx ? 24 : 8,
                height: 8,
                background:
                  i === setIdx ? "var(--ew-orange)" : "var(--ew-gray-mid)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Marquee ───────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  "Certified Mountain Guides",
  "Pioneers of Himalayan Trekking",
  "Trusted for 15 Years",
  "Safe Travel for Every Age",
  "Fully Customizable Packages",
  "India's Favourite Trek Partner",
  "40+ Unique Trek Experiences",
  "10,000+ Happy Trekkers",
];

function TrustMarquee() {
  const items = TRUST_ITEMS.map((t, i) => ({ text: t, key: `a${i}` })).concat(
    TRUST_ITEMS.map((t, i) => ({ text: t, key: `b${i}` })),
  );
  return (
    <div
      className="marquee-container py-3"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="trust.section"
    >
      <div className="marquee-track">
        {items.map((item) => (
          <span
            key={item.key}
            className="flex items-center gap-2 whitespace-nowrap px-5 text-[13px]"
            style={{ color: "var(--ew-text-lt)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="var(--ew-red)"
                stroke="none"
              />
            </svg>
            {item.text}
            <span style={{ color: "var(--ew-gray-dark)", margin: "0 8px" }}>
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Stats Section ───────────────────────────────────────────────────────────

const STATS = [
  { end: 1000, suffix: "+", label: "International Packages" },
  { end: 300, suffix: "+", label: "Domestic Treks" },
  { end: 3000, suffix: "+", label: "Trusted Hotels" },
  { end: 15, suffix: "+", label: "Years Experience" },
];

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="bg-white" data-ocid="stats.section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="py-8 px-4 text-center border-b-4"
              style={{ borderBottomColor: "var(--ew-red)" }}
            >
              <AnimatedCounter
                end={s.end}
                suffix={s.suffix}
                started={started}
              />
              <p
                className="text-[13px] mt-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Trek Carousel ───────────────────────────────────────────────────────────

function TrekCarousel({ treks, id }: { treks: typeof TREKS; id: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        data-ocid={`${id}.carousel_prev`}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 w-9 h-9 rounded-full flex items-center justify-center shadow-elevated transition-all hover:scale-110"
        style={{ background: "var(--ew-orange)", color: "#fff" }}
      >
        <ChevronLeft size={18} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {treks.map((trek, i) => (
          <div
            key={trek.id}
            className="flex-none w-[85vw] sm:w-64 md:w-56"
            style={{ scrollSnapAlign: "start" }}
            data-ocid={`${id}.card.${i + 1}`}
          >
            <TrekCard trek={trek} index={i} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        data-ocid={`${id}.carousel_next`}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 w-9 h-9 rounded-full flex items-center justify-center shadow-elevated transition-all hover:scale-110"
        style={{ background: "var(--ew-orange)", color: "#fff" }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// ─── Destination Grid ────────────────────────────────────────────────────────

function DestGrid({
  items,
  prefix,
}: { items: typeof UK_DESTINATIONS; prefix: string }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((d, i) => (
        <Link
          key={d.slug}
          to="/treks/$slug"
          params={{ slug: d.slug }}
          className="group relative rounded-lg overflow-hidden"
          style={{ aspectRatio: "4/3" }}
          data-ocid={`${prefix}.dest.${i + 1}`}
        >
          <OptimizedImage
            src={d.image}
            alt={d.name}
            fill
            variant="destination"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white font-bold text-xs leading-tight">
              {d.name}
            </p>
            <p
              className="font-bold text-[11px]"
              style={{ color: "var(--ew-orange)" }}
            >
              from {d.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── Yatra Card ──────────────────────────────────────────────────────────────

const YATRA_ICONS = ["🕉️", "⛰️", "🙏", "🏔️", "🌿", "✨"];

function YatraCard({ yatra, idx }: { yatra: (typeof YATRAS)[0]; idx: number }) {
  return (
    <Link
      to="/yatras/$slug"
      params={{ slug: yatra.slug }}
      className="flex-none w-52 bg-white rounded-lg overflow-hidden shadow-card flex flex-col"
      data-ocid={`yatras.card.${idx + 1}`}
      style={{ scrollSnapAlign: "start", textDecoration: "none" }}
    >
      <div className="relative h-28">
        <OptimizedImage
          src={yatra.image}
          alt={yatra.name}
          fill
          variant="yatra-card"
          sizes="208px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="text-xl mb-1">
          {YATRA_ICONS[idx % YATRA_ICONS.length]}
        </div>
        <h3
          className="font-bold text-[14px] leading-snug mb-1"
          style={{ color: "var(--ew-red)" }}
        >
          {yatra.name}
        </h3>
        <p
          className="text-[11px] mb-1"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          {yatra.duration} Days · {yatra.startPoint}
        </p>
        <p
          className="font-bold text-[14px] mt-auto"
          style={{ color: "var(--ew-orange)" }}
        >
          from ₹{yatra.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}

// ─── Section title helper ────────────────────────────────────────────────────

function SectionTitle({
  children,
  center = false,
}: { children: string; center?: boolean }) {
  return (
    <h2
      className="section-title"
      style={
        center
          ? { display: "block", textAlign: "center", paddingBottom: 12 }
          : {}
      }
    >
      {children}
    </h2>
  );
}

// ─── Recommended Filter Tabs ──────────────────────────────────────────────────

type TrekFilter =
  | "All"
  | "Uttarakhand"
  | "Himachal Pradesh"
  | "Easy"
  | "Moderate"
  | "Difficult"
  | "Budget"
  | "Premium";

const FILTER_TABS: { label: string; value: TrekFilter }[] = [
  { label: "All", value: "All" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Easy", value: "Easy" },
  { label: "Moderate", value: "Moderate" },
  { label: "Difficult", value: "Difficult" },
  { label: "Budget <Rs.8K", value: "Budget" },
  { label: "Premium >Rs.15K", value: "Premium" },
];

function RecommendedSection() {
  const [activeFilter, setActiveFilter] = useState<TrekFilter>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = TREKS.filter((t) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Uttarakhand") return t.state === "uttarakhand";
    if (activeFilter === "Himachal Pradesh") return t.state === "himachal";
    if (activeFilter === "Easy") return t.difficulty.startsWith("Easy");
    if (activeFilter === "Moderate") return t.difficulty.includes("Moderate");
    if (activeFilter === "Difficult")
      return t.difficulty.includes("Difficult") || t.difficulty === "Extreme";
    if (activeFilter === "Budget") return t.price < 8000;
    if (activeFilter === "Premium") return t.price > 15000;
    return true;
  }).slice(0, 16);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
  };

  return (
    <section className="py-10 bg-white" data-ocid="recommended.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-4"
        >
          <div>
            <SectionTitle>Recommended Treks &amp; Packages</SectionTitle>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Handpicked experiences for every kind of trekker
            </p>
          </div>
          <Link
            to="/treks"
            className="text-sm font-semibold flex items-center gap-1 whitespace-nowrap"
            style={{ color: "var(--ew-red)" }}
            data-ocid="recommended.view_all_link"
          >
            View All 40+ Packages <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-3 mb-4">
          {FILTER_TABS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setActiveFilter(f.value)}
              className="flex-none text-[12px] font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap border"
              style={
                activeFilter === f.value
                  ? {
                      background: "#C0001C",
                      color: "#fff",
                      borderColor: "#C0001C",
                    }
                  : { background: "#fff", color: "#555", borderColor: "#ddd" }
              }
              data-ocid={`recommended.filter.${f.value.toLowerCase().replace(/[\s<>/.]+/g, "_")}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border"
            style={{ borderColor: "var(--ew-gray-mid)" }}
            data-ocid="recommended.carousel_prev"
          >
            <ChevronLeft size={16} style={{ color: "var(--ew-red)" }} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filtered.map((trek, i) => (
              <div
                key={trek.id}
                className="flex-none w-[85vw] sm:w-64 md:w-56"
                style={{ scrollSnapAlign: "start" }}
                data-ocid={`recommended.card.${i + 1}`}
              >
                <TrekCard trek={trek} index={i} compactCta />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border"
            style={{ borderColor: "var(--ew-gray-mid)" }}
            data-ocid="recommended.carousel_next"
          >
            <ChevronRight size={16} style={{ color: "var(--ew-red)" }} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const [season, setSeason] = useState<Season>("Summer");
  const seasonMeta = SEASON_META[season];
  const [batchTab, setBatchTab] = useState<string>("This Month");
  const yatrasScrollRef = useRef<HTMLDivElement>(null);
  const [newsEmail, setNewsEmail] = useState("");
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Season treks: filter from TREKS by slug
  const seasonTreks = SEASON_TREKS[season]
    .map((slug) => TREKS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TREKS;

  // Featured carousel treks (first 12)
  // Featured carousel treks (first 12)
  const _featuredTreks = TREKS.filter((t) => t.isFeatured).slice(0, 12);

  // Upcoming batches by tab
  const batchTabs = ["This Month", "Next 3 Months", "Summer 2025", "All"];
  const visibleBatches = BATCHES.slice(0, 6);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsSubmitted(true);
  };

  return (
    <div>
      <SEOHead
        title="Trekora — Himalayan Treks & Yatras | Book Expert-Led Treks in India"
        description="Trekora offers 40+ guided Himalayan treks and sacred yatras in Uttarakhand and Himachal Pradesh. Certified guides, all-inclusive packages, Razorpay booking. Roopkund, Kedarnath, Valley of Flowers and more."
        keywords="Himalayan treks, trekking in India, Uttarakhand trek, Himachal trek, Char Dham yatra, book trek online, Trekora, Roopkund trek, Valley of Flowers"
        canonical="https://www.trekora.com"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "TouristInformationCenter",
            name: "Trekora",
            description:
              "Himalayan treks and yatras with certified mountain guides in Uttarakhand and Himachal Pradesh",
            url: "https://www.trekora.com",
            telephone: SITE_PHONE_TEL,
            email: SITE_EMAIL,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dehradun",
              addressRegion: "Uttarakhand",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 30.3165,
              longitude: 78.0322,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "08:00",
              closes: "20:00",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Trekora",
            url: "https://www.trekora.com",
            logo: "https://www.trekora.com/logo.png",
            description:
              "India's premier Himalayan trekking and yatra company. 40+ treks, 11 yatras across Uttarakhand and Himachal Pradesh.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: SITE_PHONE_TEL,
              contactType: "customer service",
              availableLanguage: ["English", "Hindi"],
            },
            sameAs: [
              "https://www.instagram.com/trekora",
              "https://www.facebook.com/trekora",
              "https://www.youtube.com/c/trekora",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Trekora",
            url: "https://www.trekora.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.trekora.com/treks?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      {/* ── SECTION 1: HERO BANNER GRID ── */}
      <HeroBannerGrid />

      <TrustBadgesStrip />

      {/* ── SOCIAL PROOF TICKER (below hero) ── */}
      <SocialProofTicker />

      {/* ── SECTION 2: SEARCH PANEL ── */}
      <section className="bg-white py-5 shadow-card" data-ocid="search.section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 items-end">
            {/* Destination */}
            <div className="flex-1 min-w-[130px]">
              <label
                htmlFor="s-dest"
                className="block text-[11px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Trek Destination
              </label>
              <select
                id="s-dest"
                className="w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none"
                style={{ borderColor: "var(--ew-gray-mid)" }}
                data-ocid="search.destination.select"
              >
                <option value="">All Destinations ▼</option>
                <option>Uttarakhand</option>
                <option>Himachal Pradesh</option>
              </select>
            </div>
            {/* Trek Type */}
            <div className="flex-1 min-w-[120px]">
              <label
                htmlFor="s-type"
                className="block text-[11px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Trek Type
              </label>
              <select
                id="s-type"
                className="w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none"
                style={{ borderColor: "var(--ew-gray-mid)" }}
                data-ocid="search.type.select"
              >
                <option value="">Trek Type ▼</option>
                <option>Snow Trek</option>
                <option>Alpine Trek</option>
                <option>Yatra</option>
                <option>Weekend Trek</option>
              </select>
            </div>
            {/* Difficulty */}
            <div className="flex-1 min-w-[120px]">
              <label
                htmlFor="s-diff"
                className="block text-[11px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Difficulty
              </label>
              <select
                id="s-diff"
                className="w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none"
                style={{ borderColor: "var(--ew-gray-mid)" }}
                data-ocid="search.difficulty.select"
              >
                <option value="">Difficulty ▼</option>
                <option>Easy</option>
                <option>Moderate</option>
                <option>Difficult</option>
                <option>Extreme</option>
              </select>
            </div>
            {/* Month */}
            <div className="flex-1 min-w-[120px]">
              <label
                htmlFor="s-month"
                className="block text-[11px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Month of Travel
              </label>
              <select
                id="s-month"
                className="w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none"
                style={{ borderColor: "var(--ew-gray-mid)" }}
                data-ocid="search.month.select"
              >
                <option value="">Month ▼</option>
                {[
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
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            {/* People */}
            <div className="flex-1 min-w-[110px]">
              <label
                htmlFor="s-people"
                className="block text-[11px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                No. of People
              </label>
              <select
                id="s-people"
                className="w-full px-3 py-2 border rounded text-sm bg-white focus:outline-none"
                style={{ borderColor: "var(--ew-gray-mid)" }}
                data-ocid="search.people.select"
              >
                <option>1 Person</option>
                <option>2 People</option>
                <option>3–5</option>
                <option>6–10</option>
                <option>10+</option>
              </select>
            </div>
            <Link
              to="/treks"
              className="btn-primary flex items-center gap-1.5 whitespace-nowrap"
              data-ocid="search.submit_button"
            >
              🔍 Search Treks
            </Link>
          </div>
          {/* Popular tags */}
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            <span
              className="text-[12px]"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Popular Searches:
            </span>
            {[
              "Kedarnath",
              "Roopkund",
              "Triund",
              "Hampta Pass",
              "Char Dham",
              "Valley of Flowers",
              "Spiti",
            ].map((tag) => (
              <Link
                key={tag}
                to="/treks"
                className="text-[12px] px-3 py-1 rounded-full transition-colors hover:text-white"
                style={{
                  background: "var(--ew-gray-lt)",
                  color: "var(--ew-text-lt)",
                }}
                data-ocid={`search.tag.${tag.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: TRUST MARQUEE ── */}
      <TrustMarquee />

      {/* ── SECTION 4: STATS ── */}
      <StatsSection />

      {/* ── SECTION 5: RECOMMENDED TREKS CAROUSEL (with filter tabs) ── */}
      <RecommendedSection />

      {/* ── SECTION 6: TRENDING UTTARAKHAND ── */}
      <section className="py-12 section-alt" data-ocid="uttarakhand.section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-[55%]"
            >
              <SectionTitle>Trending Uttarakhand Treks</SectionTitle>
              <div
                className="text-sm leading-relaxed mt-4 space-y-3"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <p>
                  Uttarakhand, known as the "Land of Gods" (Devbhumi), is home
                  to some of the most spectacular trekking trails in the world.
                  Nestled in the western Himalayas, this state offers trekkers
                  an unparalleled combination of dramatic high-altitude
                  landscapes, ancient temples, sacred rivers, and vibrant local
                  culture.
                </p>
                <p>
                  From the mystical Roopkund Skeleton Lake at 5,029m to the
                  UNESCO-listed Valley of Flowers blooming with 500+ alpine
                  species, Uttarakhand's trails cater to every level — weekend
                  escapes like Chopta Tungnath to epic multi-week expeditions
                  like Milam Glacier or Nanda Devi Base Camp.
                </p>
                <p>
                  The Garhwal and Kumaon regions each have distinct characters —
                  Garhwal boasts iconic pilgrimage treks and high passes, while
                  Kumaon's trails wind through oak forests, terraced farms, and
                  hidden valleys unspoiled by mass tourism. Har Ki Dun, called
                  the Valley of the Gods, is one of the few places on earth
                  where Hindu mythology and breathtaking natural beauty
                  converge.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  to="/treks"
                  className="btn-primary"
                  data-ocid="uttarakhand.view_all_button"
                >
                  View All Packages
                </Link>
                <Link
                  to="/destinations"
                  className="btn-secondary"
                  data-ocid="uttarakhand.destinations_button"
                >
                  Explore Destinations
                </Link>
              </div>
            </motion.div>
            {/* Right grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-[45%] w-full"
            >
              <DestGrid items={UK_DESTINATIONS} prefix="uttarakhand" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TRENDING HIMACHAL ── */}
      <section className="py-12 bg-white" data-ocid="himachal.section">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-[45%] w-full"
            >
              <DestGrid items={HP_DESTINATIONS} prefix="himachal" />
            </motion.div>
            {/* Right text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-[55%]"
            >
              <SectionTitle>Trending Himachal Pradesh Treks</SectionTitle>
              <div
                className="text-sm leading-relaxed mt-4 space-y-3"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <p>
                  Himachal Pradesh is the crown jewel of India's trekking
                  universe — a land of contrasts where lush green Kullu Valley
                  meets the stark moonscapes of Spiti, where pine forests give
                  way to ancient Buddhist monasteries perched at impossible
                  heights, and where every mountain pass opens onto a landscape
                  you've never imagined before.
                </p>
                <p>
                  The Triund Trail from McLeod Ganj offers trekkers a perfect
                  weekend escape with panoramic Dhauladhar views, while Hampta
                  Pass delivers one of India's most dramatic landscape
                  transitions — from green Manali meadows to the barren,
                  mythical Spiti desert in just five days. For those seeking
                  extremes, Pin Parvati Pass at 5,319m is considered one of
                  Asia's most challenging high-altitude crossings.
                </p>
                <p>
                  Himachal's Spiti Valley — sometimes called "Little Tibet" — is
                  a world apart. At 4,000m average altitude, ancient gompas, yak
                  herders, and fossil-embedded cliffs create an otherworldly
                  backdrop for treks that are equal parts adventure and cultural
                  immersion.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <Link
                  to="/treks"
                  className="btn-primary"
                  data-ocid="himachal.view_all_button"
                >
                  View All Packages
                </Link>
                <Link
                  to="/destinations"
                  className="btn-secondary"
                  data-ocid="himachal.destinations_button"
                >
                  Explore Destinations
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: SEASON TABS (upgraded 4 seasons) ── */}
      <section className="py-12 section-alt" data-ocid="seasons.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="section-heading" style={{ color: "var(--ew-text)" }}>
              When Should I Trek?
            </h2>
            <p className="text-sm mt-2" style={{ color: "var(--ew-text-lt)" }}>
              Every season in the Himalayas has its own magic
            </p>
          </motion.div>
          {/* Tabs — scrollable on mobile */}
          <div
            className="flex overflow-x-auto scrollbar-hide border-b mb-6"
            style={{ borderColor: "var(--ew-gray-mid)" }}
          >
            {(["Summer", "Monsoon", "Autumn", "Winter"] as Season[]).map(
              (s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={`flex-none px-5 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                    season === s ? "tab-active" : ""
                  }`}
                  style={season !== s ? { color: "var(--ew-gray-dark)" } : {}}
                  data-ocid={`seasons.tab.${s.toLowerCase()}`}
                >
                  {SEASON_META[s].emoji} {s}
                </button>
              ),
            )}
          </div>
          {/* Season info card */}
          <div
            className="rounded-xl p-5 mb-6 flex flex-col sm:flex-row gap-4 items-start"
            style={{ background: "var(--ew-orange-lt)" }}
          >
            <div className="text-4xl flex-shrink-0">{seasonMeta.emoji}</div>
            <div className="flex-1">
              <div
                className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2"
                style={{ background: "var(--ew-orange)", color: "#fff" }}
              >
                {seasonMeta.months}
              </div>
              <p
                className="text-sm leading-relaxed mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                {seasonMeta.desc}
              </p>
              <div
                className="flex flex-wrap gap-x-5 gap-y-1 text-[12px]"
                style={{ color: "var(--ew-text-lt)" }}
              >
                <span>
                  🌡️ <strong>Temp:</strong> {seasonMeta.temp}
                </span>
                <span>
                  ⛅ <strong>Conditions:</strong> {seasonMeta.conditions}
                </span>
              </div>
            </div>
          </div>
          {seasonTreks.length > 0 ? (
            <TrekCarousel treks={seasonTreks} id="seasons" />
          ) : (
            <p
              className="text-center text-sm"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Coming soon — batches being added.
            </p>
          )}
        </div>
      </section>

      {/* ── SECTION 9: YATRA SECTION ── */}
      <section
        className="py-14 relative overflow-hidden"
        style={{ background: "var(--ew-red)" }}
        data-ocid="yatras.section"
      >
        {/* Decorative SVG */}
        <svg
          className="absolute right-0 top-0 opacity-10 pointer-events-none"
          width="300"
          height="300"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="white"
            strokeWidth="1"
          />
          <path d="M60 140 L100 60 L140 140 Z" fill="white" opacity="0.4" />
        </svg>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-white font-bold text-3xl md:text-4xl mb-1">
              Sacred Himalayan Yatras
            </h2>
            <p className="text-white/80 text-base">
              Journey Beyond the Ordinary
            </p>
          </motion.div>
          {/* Scroll carousel */}
          <div
            ref={yatrasScrollRef}
            className="flex gap-4 overflow-x-auto overflow-hidden scrollbar-hide pb-3 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {YATRAS.slice(0, 6).map((y, i) => (
              <YatraCard key={y.id} yatra={y} idx={i} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/yatras"
              className="btn-white"
              data-ocid="yatras.explore_all_button"
            >
              Explore All Yatras <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: OFFER BANNERS ── */}
      <section className="py-10 bg-white" data-ocid="offers.section">
        <div className="container mx-auto px-4">
          {/* 2 wide banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div
              className="relative rounded-lg overflow-hidden flex items-center p-6 min-h-[140px]"
              style={{ background: "var(--ew-orange)" }}
              data-ocid="offers.bogo_banner"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                alt="Trek offer"
                fill
                variant="banner-strip"
                className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
              />
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1 block">
                  Limited Offer
                </span>
                <h3 className="text-white font-bold text-xl mb-1">
                  Buy 1 Get 1 Trek Packages
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Book any trek and bring a friend free — limited seats
                  available
                </p>
                <button
                  type="button"
                  className="btn-white text-sm py-2 px-5"
                  data-ocid="offers.bogo_button"
                >
                  Claim Offer
                </button>
              </div>
            </div>
            <div
              className="relative rounded-lg overflow-hidden flex items-center p-6 min-h-[140px]"
              style={{ background: "var(--ew-red)" }}
              data-ocid="offers.chardham_banner"
            >
              <OptimizedImage
                src={HOME_CHAR_DHAM_COLLAGE_IMAGE}
                alt="Char Dham"
                fill
                variant="banner-strip"
                className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-30"
              />
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1 block">
                  2025 Season Open
                </span>
                <h3 className="text-white font-bold text-xl mb-1">
                  Char Dham Yatra 2025
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Sacred journey packages from ₹18,999 — seats filling fast
                </p>
                <EnquiryButton
                  type="button"
                  className="btn-white text-sm py-2 px-5"
                  trekName="Char Dham Yatra"
                  data-ocid="offers.chardham_button"
                >
                  Book Now
                </EnquiryButton>
              </div>
            </div>
          </div>
          {/* 3 small offer cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Early Bird 15% Off",
                desc: "Book summer treks before March 31 and save 15%",
                icon: "🐦",
              },
              {
                label: "Group Discount 20% Off",
                desc: "Bring 5 or more friends and everyone saves 20%",
                icon: "👥",
              },
              {
                label: "Student Special ₹1,000 Off",
                desc: "Show your college ID and get ₹1,000 off any trek",
                icon: "🎓",
              },
            ].map((o, i) => (
              <div
                key={o.label}
                className="rounded-lg p-4 flex items-start gap-3"
                style={{ background: "var(--ew-orange-lt)" }}
                data-ocid={`offers.card.${i + 1}`}
              >
                <span className="text-2xl">{o.icon}</span>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--ew-orange)" }}
                  >
                    {o.label}
                  </p>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {o.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY CHOOSE ETERNAWINGS ── */}
      <section className="py-12 section-alt" data-ocid="why_choose.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <SectionTitle>Why Choose Trekora</SectionTitle>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg p-5 border-2 transition-all group cursor-default"
                style={{ borderColor: "transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--ew-orange)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "transparent";
                }}
                data-ocid={`why_choose.card.${i + 1}`}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: "var(--ew-red-lt)" }}
                >
                  <item.icon size={20} style={{ color: "var(--ew-red)" }} />
                </div>
                <h3
                  className="font-bold text-[15px] mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 12: TESTIMONIALS ── */}
      <section className="py-12 bg-white" data-ocid="testimonials.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <SectionTitle>What Our Trekkers Say</SectionTitle>
          </motion.div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto overflow-hidden scrollbar-hide pb-3">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className="flex-none w-72 bg-white rounded-lg p-5 shadow-card border"
                  style={{ borderColor: "var(--ew-gray-mid)" }}
                  data-ocid={`testimonial.card.${i + 1}`}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5]
                      .filter((n) => n <= t.rating)
                      .map((n) => (
                        <span
                          key={n}
                          style={{ color: "var(--ew-gold)", fontSize: 13 }}
                        >
                          ★
                        </span>
                      ))}
                  </div>
                  {/* Trek badge */}
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded mb-2 inline-block"
                    style={{
                      background: "var(--ew-red-lt)",
                      color: "var(--ew-red)",
                    }}
                  >
                    {t.trek}
                  </span>
                  <p
                    className="text-[13px] leading-relaxed mb-4"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    "{t.review}"
                  </p>
                  <div className="flex items-center gap-3">
                    <OptimizedImage
                      src={t.image}
                      alt={t.name}
                      width={36}
                      height={36}
                      variant="avatar"
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p
                        className="font-semibold text-[13px]"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {t.name}
                      </p>
                      <p
                        className="text-[11px]"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {t.city}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} style={{ color: "var(--ew-gold)", fontSize: 15 }}>
                  ★
                </span>
              ))}
            </div>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              4.8/5
            </span>
            <span className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
              Google Reviews · 2,400+ ratings
            </span>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ── */}
      <GoogleReviewsSection />
      {/* ── SECTION 11.5: SCROLLING REVIEWS ── */}
      <HomepageReviews />

      {/* ── SECTION 13: UPCOMING BATCHES ── */}
      <section className="py-12 section-alt" data-ocid="batches.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-6"
          >
            <SectionTitle>Upcoming Trek Batches</SectionTitle>
          </motion.div>
          {/* Tab filters */}
          <div
            className="flex gap-0 border-b mb-5"
            style={{ borderColor: "var(--ew-gray-mid)" }}
          >
            {batchTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setBatchTab(tab)}
                className={`px-5 py-2.5 text-[13px] font-medium transition-colors ${batchTab === tab ? "tab-active" : ""}`}
                style={batchTab !== tab ? { color: "var(--ew-gray-dark)" } : {}}
                data-ocid={`batches.tab.${tab.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid var(--ew-gray-mid)",
                    background: "var(--ew-gray-lt)",
                  }}
                >
                  <th
                    className="text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Trek
                  </th>
                  <th
                    className="text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Dates
                  </th>
                  <th
                    className="text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Duration
                  </th>
                  <th
                    className="text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Slots
                  </th>
                  <th
                    className="text-left py-3 px-3 font-semibold text-[12px] uppercase tracking-wide"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Price
                  </th>
                  <th className="py-3 px-3" />
                </tr>
              </thead>
              <tbody>
                {visibleBatches.map((b, i) => (
                  <tr
                    key={b.trek}
                    style={{ borderBottom: "1px solid var(--ew-gray-mid)" }}
                    data-ocid={`batches.row.${i + 1}`}
                  >
                    <td
                      className="py-3 px-3 font-semibold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {b.trek}
                    </td>
                    <td
                      className="py-3 px-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.dates}
                    </td>
                    <td
                      className="py-3 px-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {b.duration}
                    </td>
                    <td className="py-3 px-3">
                      {b.full ? (
                        <span
                          className="text-[11px] font-bold line-through"
                          style={{ color: "var(--ew-gray-dark)" }}
                        >
                          FULL
                        </span>
                      ) : b.slots <= 3 ? (
                        <span className="badge-red text-[10px]">
                          Only {b.slots} left!
                        </span>
                      ) : (
                        <span className="badge-green text-[10px]">
                          {b.slots} Available
                        </span>
                      )}
                    </td>
                    <td
                      className="py-3 px-3 font-bold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      ₹{b.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3">
                      {!b.full && (
                        <EnquiryButton
                          type="button"
                          trekName={b.trek}
                          className="btn-primary text-[12px] py-1.5 px-4"
                          data-ocid={`batches.book_button.${i + 1}`}
                        >
                          Book Now
                        </EnquiryButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/treks"
              className="text-sm font-semibold flex items-center gap-1 justify-end"
              style={{ color: "var(--ew-red)" }}
              data-ocid="batches.view_all_link"
            >
              View All Batches <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 13b: UPCOMING BATCHES ENHANCED ── */}
      <UpcomingBatchesSection />

      {/* ── SECTION 14: YOUTUBE SECTION (upgraded) ── */}
      <YouTubeSection />

      {/* ── SECTION 15: INSTAGRAM SECTION (upgraded) ── */}
      <InstagramSection />

      {/* ── SECTION 16: BLOG SECTION ── */}
      <section className="py-12 section-alt" data-ocid="blog.section">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-7"
          >
            <SectionTitle>Travel Stories &amp; Tips</SectionTitle>
          </motion.div>
          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">
            {BLOGS.slice(0, 4).map((blog, i) => (
              <Link
                key={blog.id}
                to="/blog/$slug"
                params={{ slug: blog.slug }}
                className="flex-none w-64 bg-white rounded-lg overflow-hidden shadow-card group block"
                data-ocid={`blog.card.${i + 1}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <OptimizedImage
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    variant="blog-card"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded mb-2 inline-block"
                    style={{
                      background: "var(--ew-red-lt)",
                      color: "var(--ew-red)",
                    }}
                  >
                    {blog.category}
                  </span>
                  <p
                    className="text-[11px] mb-1"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {blog.publishedAt}
                  </p>
                  <h3
                    className="font-bold text-[14px] leading-snug mb-2 line-clamp-2"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="text-[12px] line-clamp-2 mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {blog.excerpt}
                  </p>
                  <span
                    className="text-[12px] font-semibold flex items-center gap-1"
                    style={{ color: "var(--ew-red)" }}
                  >
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/blog"
              className="btn-primary"
              data-ocid="blog.view_all_button"
            >
              View All Blogs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 17: NEWSLETTER BANNER ── */}
      <section
        className="py-14"
        style={{ background: "var(--ew-orange)" }}
        data-ocid="newsletter.section"
      >
        <div className="container mx-auto px-4 text-center max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-1">
              Get Your Free Trek Planning Guide (PDF)
            </h2>
            <p className="text-white/85 text-sm mb-5">
              Enter your email and receive it instantly
            </p>
            {newsSubmitted ? (
              <div className="flex items-center justify-center gap-2 bg-white/20 rounded-lg py-4">
                <span className="text-white font-semibold">
                  ✅ Check your inbox! Guide sent.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full text-[var(--ew-text)] text-sm focus:outline-none border-0"
                  style={{ background: "#fff" }}
                  data-ocid="newsletter.email.input"
                />
                <button
                  type="submit"
                  className="btn-white whitespace-nowrap text-sm"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="newsletter.submit_button"
                >
                  Get Free Guide
                </button>
              </form>
            )}
            <p className="text-white/70 text-[12px] mt-3">
              Join 50,000+ trekkers already subscribed
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 18: PARTNER LOGOS ── */}
      <section className="py-8 bg-white" data-ocid="partners.section">
        <div className="container mx-auto px-4">
          <p
            className="text-center text-[13px] mb-5 font-semibold uppercase tracking-wider"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {(
              [
                { name: "Times of India", url: "/press" },
                { name: "NDTV", url: "/press" },
                { name: "Outlook Traveller", url: "/press" },
                { name: "National Geographic", url: "/press" },
                { name: "Adventure Nation", url: "/press" },
                { name: "Thrillophilia", url: "/press" },
                { name: "MakeMyTrip", url: "/press" },
              ] as { name: string; url: string }[]
            ).map(({ name, url }) => (
              <Link
                key={name}
                to={url}
                className="px-4 py-2 rounded border text-sm font-bold opacity-40 hover:opacity-80 transition-opacity"
                style={{
                  borderColor: "var(--ew-gray-mid)",
                  color: "var(--ew-gray-dark)",
                  textDecoration: "none",
                }}
                data-ocid={`partners.logo.${name.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link
              to="/press"
              className="text-[12px] font-semibold"
              style={{ color: "var(--ew-red)" }}
              data-ocid="partners.view_press_link"
            >
              View all press coverage →
            </Link>
          </div>
        </div>
      </section>

      {/* Trek Recommender Quiz */}
      <TrekRecommenderQuiz />
    </div>
  );
}
