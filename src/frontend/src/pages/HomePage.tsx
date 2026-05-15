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
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import HomepageReviews from "../components/HomepageReviews";
import InstagramSection from "../components/InstagramSection";
import { SEOHead } from "../components/SEOHead";
import SocialProofTicker from "../components/SocialProofTicker";
import TrekCard from "../components/TrekCard";
import UpcomingBatchesSection from "../components/UpcomingBatchesSection";
import YatraCard from "../components/YatraCard";
import YouTubeSection from "../components/YouTubeSection";
import OptimizedImage from "../components/media/OptimizedImage";
import { EnquiryButton } from "../components/ui/EnquiryButton";
import TrustBadgesStrip from "../components/ui/TrustBadgesStrip";
import { BLOGS } from "../data/blogs";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";

const CHAR_DHAM_YATRA = YATRAS.find((y) => y.slug === "char-dham-yatra");
const PANCH_KEDAR_YATRA = YATRAS.find((y) => y.slug === "panch-kedar-yatra");
const PANCH_BADRI_YATRA = YATRAS.find((y) => y.slug === "panch-badri-yatra");
const HEMKUND_SAHIB_YATRA = YATRAS.find(
  (y) => y.slug === "hemkund-sahib-yatra",
);
const CHAR_DHAM_COVER =
  CHAR_DHAM_YATRA?.image ??
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773622/hdcqmlampuxdxcd3ixmu.png";

const CHAR_DHAM_GALLERY_ALTS = [
  "Yamunotri temple in the Garhwal Himalayas",
  "Gangotri temple with white domes against forested peaks",
  "Kedarnath stone temple with pilgrims and snow-capped mountains",
  "Badrinath temple ornate colourful facade",
  "Badrinath temple and Neelkanth peak at dusk",
] as const;

/** Panch Badri Yatra — five-shrine collage (`hero/home` + yatras section). */
const PANCH_BADRI_YATRA_COLLAGE_WEBP =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824340/i9c2rqglhap9kt57irxm.webp";

/** Panch Badri — individual shrine / route photos (home strip + catalog gallery). */
const PANCH_BADRI_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824303/alkvjnkapfjh5fywqzqf.jpg",
    alt: "Badrinath temple (Vishal Badri) with pilgrims at the entrance and misty Garhwal peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824252/osxg6q6dria3uvp5awfj.webp",
    alt: "Ancient grey stone Nagara-style shrines with tiered shikharas on the Panch Badri circuit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824242/y3zhv11abvtf0hdevura.webp",
    alt: "Traditional white-washed Himalayan temple with slate roof along the Panch Badri yatra",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824228/y85a9ad2kdgxwob0pa0r.webp",
    alt: "Bhavishya Badri shrine with forested approach and festive garlands at the Panch Badri site",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778824216/oxdyace9mdiq0stpd70q.jpg",
    alt: "Twin stone temples with shikharas and prayer flags in a green Himalayan valley on the Panch Badri route",
  },
];

/** Kedarnath temple at night — Panch Kedar home hero tile + gallery. */
const PANCH_KEDAR_KEDARNATH_NIGHT_JPG =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823571/ug5o1hpvj2pnvnuv9ufe.jpg";

/** Panch Kedar strip — thumbnail grid below collage (matches yatra `images` extras). */
const PANCH_KEDAR_WEBP_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823087/yd1hiyz4xzbuqdwnixjf.webp",
    alt: "Colourful hill shrine with prayer flags built into a rock cliff along the Garhwal Panch Kedar pilgrimage",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823073/s580fofsicknmvmxya2h.webp",
    alt: "Ancient stone Panch Kedar temple on a green Himalayan slope under a bright sky",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823087/yd1hiyz4xzbuqdwnixjf.webp",
    alt: "Sacred shrine entrance with orange banners on the Panch Kedar trail",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778823101/he972npqm84metx7sy8v.webp",
    alt: "Snow-covered high-altitude Shiva temple with trishul and prayer flags in winter light",
  },
  {
    src: PANCH_KEDAR_KEDARNATH_NIGHT_JPG,
    alt: "Kedarnath temple lit at night against snow-capped Himalayan peaks on the Panch Kedar pilgrimage",
  },
];

/** Hemkund Sahib Yatra — Gurudwara & lake (home strip + hero; order left-to-right in grid). */
const HEMKUND_SAHIB_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825202/xz51u9hwvb0cmevjsi0j.jpg",
    alt: "Gurudwara Shri Hemkund Sahib with star-shaped roof beside glacial lake and snow peaks at 4,633m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825192/ql0l3zrxgo8glvaepkb1.jpg",
    alt: "Hemkund Sahib gurudwara decorated with marigold garlands and pilgrims on the snow-lined approach path",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825180/ggkd5s4qisa6zgo7w5h1.jpg",
    alt: "Hemkund Sahib reflected in still waters of Lokpal Lake with Himalayan ridges under blue sky",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825167/mkbkazqiw7p2blcycwxu.jpg",
    alt: "Wide view of Hemkund Sahib gurudwara on the lake shore with pilgrims and cloud-wrapped peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825155/sye2fsmrm6fzl28pnzup.jpg",
    alt: "Hemkund Sahib white marble gurudwara and Nishan Sahib with snow-covered mountains behind the glacial lake",
  },
];

/** Bali Pass Trek — high pass & meadows (Uttarakhand strip + hero; order left-to-right in grid). */
const BALI_PASS_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825895/jpepjhvoxlffr2eqiscq.webp",
    alt: "Trekkers on a narrow snow-fringed ridge crossing Bali Pass in the Garhwal Himalayas",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825906/ezrkskp13r2xadjinh0n.webp",
    alt: "Line of trekkers ascending a boulder-strewn high-altitude slope on the Bali Pass route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825923/tqyoaz9kyssq0dfysg1a.webp",
    alt: "Single-file team crossing a wide snowfield below jagged peaks on the Bali Pass trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825937/utedsdmp5m4ytzthxozw.webp",
    alt: "Alpine meadow with wildflowers and forested ridges — Bali Pass trail below cloud-wrapped summits",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778825948/awnqlxcx0vvosog4jb3w.webp",
    alt: "Group trekking a winding dirt path through lush green hills toward distant glaciated peaks",
  },
];

const BALI_PASS_TREK = TREKS.find((t) => t.slug === "bali-pass");

/** Beas Kund Trek — Kullu meadows & glacial lake (Himachal strip + hero; order left-to-right in grid). */
const BEAS_KUND_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778826426/wr34i0d3nx4vasb1lqft.jpg",
    alt: "Trekkers and pack mules on a green hillside trail with snow peaks in the Beas Kund valley",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778826435/ifrqqxwkxmygpyoll02y.jpg",
    alt: "Massive glacier and jagged snow-covered peaks on the Beas Kund high-altitude route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778826444/b8us3jinddzv8k8uilh9.jpg",
    alt: "Lush green valley leading to a sharp snow-capped summit on the Beas Kund trek near Manali",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778826456/rniso9ncq78zkljxwubg.jpg",
    alt: "Rocky riverbed and pine-forested slopes below cloud-wrapped Himalayan ridges on the Beas Kund trail",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778826466/wsx3rz6e8q8lhzhcf6ba.jpg",
    alt: "Misty high valley with snow patches and trekkers crossing meadows toward Beas Kund glacial lake",
  },
];

const BEAS_KUND_TREK = TREKS.find((t) => t.slug === "beas-kund");

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

/** Brahmatal winter trek — hero slide + UK destinations (`hero/home`). */
const HOME_HERO_BRAHMATAL_WINTER_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778700831/cqkhz2o0jehuskfikrih.jpg";

/** Triund trek — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_TRIUND_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778701115/zm174z1j9ooi3tjjenhe.jpg";

/** Hampta Pass trek — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_HAMPTA_PASS_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763372/d6igt6vhmcv8w70xog9n.jpg";

/** Sar Pass trek — HP destinations (`hero/home`). */
const HOME_HERO_SAR_PASS_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771073/qhvb9wlwzl6x3pslktln.jpg";

/** Kedarnath Dham — hero strip + UK destinations (`hero/home`). */
const HOME_HERO_KEDARNATH_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778727122/glpponn0t6itj3cwhxo3.jpg";

/** Spiti Valley Trek — Cloudinary set (order: valley → Key → road → lake → gorge). */
const SPITI_VALLEY_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771717/afydimlzdw4hotiqs02b.jpg",
    alt: "Spiti high-altitude valley with braided riverbed and layered Himalayan peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771783/ksr51qxjcquemjpkxwsm.jpg",
    alt: "Key Monastery (Kee Gompa) on a hill above the cold-desert Spiti valley",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771728/hkoq0b9gzn96atdtr1nt.jpg",
    alt: "Winding high mountain road and switchbacks through barren Spiti terrain",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771854/hre8klhgn9j41l48iscu.jpg",
    alt: "Chandratal high-altitude lake with turquoise glacial water",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771874/cqo8fnd8aousfju8eyog.jpg",
    alt: "Deep river gorge and glacial blue water in the Spiti–Lahaul region",
  },
] as const;

/** Himachal destination card — second image for variety vs hero tile. */
const HOME_HP_SPITI_VALLEY_IMAGE = SPITI_VALLEY_TREK_IMAGES[1].src;

/** Chandratal Lake — hero strip + HP destinations (`hero/home`). */
const HOME_HERO_CHANDRATAL_LAKE_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763958/e0wqfec93qgb2510weua.jpg";

/** Kinnaur Kailash Yatra — hero strip (`hero/home`). */
const HOME_HERO_KINNAUR_KAILASH_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778728123/pfdxq1pqmnxmfgt1faxf.jpg";

/** Panch Kedar Yatra — five-shrine collage (yatras section banner). */
const HOME_HERO_PANCH_KEDAR_YATRA_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778822747/idvfsvrybj0q9crjdl3n.png";

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
        image: CHAR_DHAM_COVER,
        title: "Char Dham Yatra 2025",
        subtitle: "Sacred Journey · Limited Spots",
        cta: "Book Yatra",
        ctaLink: "/yatras/char-dham-yatra",
      },
      {
        image: BALI_PASS_PHOTO_GALLERY[0].src,
        title: "Bali Pass Trek",
        subtitle: "Har Ki Dun to Yamunotri · 9 Days",
        cta: "View Package",
        ctaLink: "/treks/bali-pass",
      },
      {
        image: BEAS_KUND_PHOTO_GALLERY[0].src,
        title: "Beas Kund Trek",
        subtitle: "Source of the Beas · 3 Days",
        cta: "View Package",
        ctaLink: "/treks/beas-kund",
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
        image: HOME_HERO_KINNAUR_KAILASH_IMAGE,
        title: "Kinnaur Kailash Yatra",
        subtitle: "Sacred Parikrama · Himachal",
        cta: "Book Yatra",
        ctaLink: "/yatras/kinnaur-kailash-yatra",
      },
      {
        image: PANCH_KEDAR_KEDARNATH_NIGHT_JPG,
        title: "Panch Kedar Yatra",
        subtitle: "Five Shiva shrines · 14 Days",
        cta: "Book Yatra",
        ctaLink: "/yatras/panch-kedar-yatra",
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
        image: PANCH_BADRI_PHOTO_GALLERY[0].src,
        title: "Panch Badri Yatra",
        subtitle: "Five Vishnu shrines · 8 Days",
        cta: "Book Yatra",
        ctaLink: "/yatras/panch-badri-yatra",
      },
      {
        image: HEMKUND_SAHIB_PHOTO_GALLERY[0].src,
        title: "Hemkund Sahib Yatra",
        subtitle: "World's highest Gurudwara · 3 Days",
        cta: "Book Yatra",
        ctaLink: "/yatras/hemkund-sahib-yatra",
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
    image: HOME_HERO_SAR_PASS_IMAGE,
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
    image: HOME_HP_SPITI_VALLEY_IMAGE,
    price: "₹14,000",
    slug: "spiti-valley-trek",
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

function HeroRightPromoCta({
  ctaLink,
  className,
  style,
  children,
  "data-ocid": dataOcid,
}: {
  ctaLink: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "data-ocid"?: string;
}) {
  const yatraSlug = /^\/yatras\/([^/]+)$/.exec(ctaLink)?.[1];
  if (yatraSlug) {
    return (
      <Link
        to="/yatras/$slug"
        params={{ slug: yatraSlug }}
        className={className}
        style={style}
        data-ocid={dataOcid}
      >
        {children}
      </Link>
    );
  }
  const trekSlug = /^\/treks\/([^/]+)$/.exec(ctaLink)?.[1];
  if (trekSlug) {
    return (
      <Link
        to="/treks/$slug"
        params={{ slug: trekSlug }}
        className={className}
        style={style}
        data-ocid={dataOcid}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link to="/treks" className={className} style={style} data-ocid={dataOcid}>
      {children}
    </Link>
  );
}

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
                  <HeroRightPromoCta
                    ctaLink={b.ctaLink}
                    className="btn-primary text-xs py-1 px-3"
                    style={{ width: "fit-content" }}
                    data-ocid={`hero.right_cta.${i + 1}`}
                  >
                    {b.cta}
                  </HeroRightPromoCta>
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
        left: dir === "left" ? -280 : 280,
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <ChevronLeft size={16} style={{ color: "var(--ew-red)" }} />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {treks.map((trek, i) => (
          <div
            key={trek.id}
            className="flex-none w-[85vw] sm:w-64 md:w-56"
            style={{ scrollSnapAlign: "start" }}
            data-ocid={`${id}.card.${i + 1}`}
          >
            <TrekCard trek={trek} index={i} compactCta />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        data-ocid={`${id}.carousel_next`}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 w-9 h-9 rounded-full bg-white shadow-elevated flex items-center justify-center transition-all hover:scale-110 border"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <ChevronRight size={16} style={{ color: "var(--ew-red)" }} />
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
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
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
              {BALI_PASS_TREK ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.bali_pass_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Bali Pass Trek — 4,950m crossing Har Ki Dun to Yamunotri
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "bali-pass" }}
                    className="relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.bali_pass_feature"
                  >
                    <OptimizedImage
                      src={BALI_PASS_PHOTO_GALLERY[0].src}
                      alt={BALI_PASS_PHOTO_GALLERY[0].alt}
                      fill
                      variant="yatra-card"
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {BALI_PASS_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "bali-pass" }}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.bali_pass_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="yatra-card"
                          className="object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
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
              {BEAS_KUND_TREK ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="himachal.beas_kund_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Beas Kund Trek — glacial source of the Beas at 3,690m near
                    Manali
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "beas-kund" }}
                    className="relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="himachal.beas_kund_feature"
                  >
                    <OptimizedImage
                      src={BEAS_KUND_PHOTO_GALLERY[0].src}
                      alt={BEAS_KUND_PHOTO_GALLERY[0].alt}
                      fill
                      variant="yatra-card"
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {BEAS_KUND_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "beas-kund" }}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`himachal.beas_kund_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="yatra-card"
                          className="object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              <div
                className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
                data-ocid="himachal.spiti_gallery"
              >
                {SPITI_VALLEY_TREK_IMAGES.map((img) => (
                  <Link
                    key={img.src}
                    to="/treks/$slug"
                    params={{ slug: "spiti-valley-trek" }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 hover:opacity-95 transition-opacity"
                    data-ocid="himachal.spiti_gallery_thumb"
                  >
                    <OptimizedImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      variant="gallery-thumb"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </Link>
                ))}
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
          {CHAR_DHAM_YATRA?.images && CHAR_DHAM_YATRA.images.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.char_dham_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Char Dham Yatra — The four sacred shrines
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-1">
                {CHAR_DHAM_YATRA.images.map((src, idx) => (
                  <Link
                    key={src}
                    to="/yatras/$slug"
                    params={{ slug: "char-dham-yatra" }}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden ring-2 ring-white/15 hover:ring-white/45 transition-shadow"
                    data-ocid={`yatras.char_dham_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={src}
                      alt={
                        CHAR_DHAM_GALLERY_ALTS[idx] ??
                        `Char Dham Yatra — photo ${idx + 1}`
                      }
                      fill
                      variant="yatra-card"
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {PANCH_KEDAR_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.panch_kedar_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Panch Kedar Yatra — Kedarnath, Tungnath, Rudranath,
                Madhyamaheshwar and Kalpeshwar
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "panch-kedar-yatra" }}
                className="relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.panch_kedar_feature"
              >
                <OptimizedImage
                  src={HOME_HERO_PANCH_KEDAR_YATRA_IMAGE}
                  alt="Panch Kedar Yatra — collage of the five sacred Shiva temples in Garhwal: Kedarnath, Kalpeshwar, Rudranath, Tungnath, and Madhyamaheshwar"
                  fill
                  variant="yatra-card"
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {PANCH_KEDAR_WEBP_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "panch-kedar-yatra" }}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.panch_kedar_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="yatra-card"
                      className="object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {PANCH_BADRI_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.panch_badri_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Panch Badri Yatra — Badrinath (Vishal Badri), Yogdhyan Badri,
                Bhavishya Badri, Vridha Badri, and Adi Badri
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "panch-badri-yatra" }}
                className="relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.panch_badri_feature"
              >
                <OptimizedImage
                  src={PANCH_BADRI_YATRA_COLLAGE_WEBP}
                  alt="Panch Badri Yatra — collage of the five Vishnu shrines: Vishal (Badrinath), Yogdhyan, Bhavishya, Vridha, and Adi Badri in Uttarakhand"
                  fill
                  variant="yatra-card"
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {PANCH_BADRI_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "panch-badri-yatra" }}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.panch_badri_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="yatra-card"
                      className="object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {HEMKUND_SAHIB_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.hemkund_sahib_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Hemkund Sahib Yatra — Lokpal Lake at 4,633m · Valley of Flowers
                gateway
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "hemkund-sahib-yatra" }}
                className="relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.hemkund_sahib_feature"
              >
                <OptimizedImage
                  src={HEMKUND_SAHIB_PHOTO_GALLERY[0].src}
                  alt={HEMKUND_SAHIB_PHOTO_GALLERY[0].alt}
                  fill
                  variant="yatra-card"
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {HEMKUND_SAHIB_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "hemkund-sahib-yatra" }}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.hemkund_sahib_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="yatra-card"
                      className="object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {/* Scroll carousel — same card layout as recommended treks */}
          <motion.div
            ref={yatrasScrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {YATRAS.slice(0, 6).map((y, i) => (
              <motion.div
                key={y.id}
                className="flex-none w-[85vw] sm:w-64 md:w-56 card bg-white rounded-xl overflow-hidden"
                style={{ scrollSnapAlign: "start" }}
                data-ocid={`yatras.card.${i + 1}`}
              >
                <YatraCard yatra={y} index={i} variant="listing" compactCta />
              </motion.div>
            ))}
          </motion.div>
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
                src={CHAR_DHAM_COVER}
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

      {/* ── GOOGLE REVIEWS ── */}
      <GoogleReviewsSection />
      {/* ── SECTION 11.5: SCROLLING REVIEWS ── */}
      <HomepageReviews />

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
    </div>
  );
}
