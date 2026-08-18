import { bookSearch } from "@/lib/book-search";
import { PRIMARY_SITE_NAV, generateHomePageSchema } from "@/lib/brand-seo";
import { isFeatureLive } from "@/lib/dormant-features";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import { HOME_PRESS_PARTNERS, pressLogoForName } from "@/lib/press-media-logos";
import { buildHomePageSEO, SITELINK_CANDIDATE_TREK_SLUGS } from "@/lib/product-seo";
import { buildLeadMagnetPayload } from "@/lib/query-email-payloads";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Leaf,
  Loader2,
  RotateCcw,
  Shield,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion } from "@/lib/motion";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import FeaturedInMedia from "../components/FeaturedInMedia";
import FormSuccessMessage from "../components/FormSuccessMessage";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import HomeMobileReelsSection from "../components/HomeMobileReelsSection";
import HomeMobileSearchPanel from "../components/HomeMobileSearchPanel";
import HomepageReviews from "../components/HomepageReviews";
import InstagramSection from "../components/InstagramSection";
import LandingFlashVoucherBanner from "../components/LandingFlashVoucherBanner";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
import { SEOHead } from "../components/SEOHead";
import SocialProofTicker from "../components/SocialProofTicker";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import TrekCard from "../components/TrekCard";
import UpcomingBatchesSection from "../components/UpcomingBatchesSection";
import YatraCard from "../components/YatraCard";
import YouTubeSection from "../components/YouTubeSection";
import HomeTrekFeatureMedia from "../components/media/HomeTrekFeatureMedia";
import OptimizedImage from "../components/media/OptimizedImage";
import TrustBadgesStrip from "../components/ui/TrustBadgesStrip";
import { getPublishedBlogs } from "../data/blogs";
import { homeTrekReelVideo } from "../data/trek-reels";
import { TREKS } from "../data/treks";
import { YATRAS } from "../data/yatras";
import { resolveBlogCardImage } from "../lib/blog-product-images";

const PANCH_KEDAR_YATRA = YATRAS.find((y) => y.slug === "panch-kedar-yatra");
const PANCH_BADRI_YATRA = YATRAS.find((y) => y.slug === "panch-badri-yatra");
const HEMKUND_SAHIB_YATRA = YATRAS.find(
  (y) => y.slug === "hemkund-sahib-yatra",
);
const KARTIK_SWAMI_YATRA = YATRAS.find((y) => y.slug === "kartik-swami-temple");
const CHURDHAR_YATRA = YATRAS.find((y) => y.slug === "churdhar-yatra");
const SHRIKHAND_MAHADEV_YATRA = YATRAS.find(
  (y) => y.slug === "shrikhand-mahadev-yatra",
);
const KINNAUR_KAILASH_YATRA = YATRAS.find(
  (y) => y.slug === "kinnaur-kailash-yatra",
);
const MANI_MAHESH_YATRA = YATRAS.find((y) => y.slug === "mani-mahesh-yatra");
const TRIYUGINARAYAN_YATRA = YATRAS.find(
  (y) => y.slug === "triyuginarayan-temple",
);
const DO_DHAM_YATRA = YATRAS.find((y) => y.slug === "do-dham-yatra");
const KEDARNATH_YATRA = YATRAS.find((y) => y.slug === "kedarnath-yatra");
/** Char Dham Yatra — `hero/yatras/char-dham-yatra` (order left-to-right in grid). */
const CHAR_DHAM_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773622/hdcqmlampuxdxcd3ixmu.png",
    alt: "Char Dham Yatra collage — Yamunotri, Gangotri, Kedarnath and Badrinath shrines",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773747/op6noetbepos6hoxx7bg.png",
    alt: "Gangotri temple with white domes against forested Garhwal peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773717/js3s5ps4zjgxkfccgaob.jpg",
    alt: "Kedarnath stone temple with pilgrims and snow-capped Himalayan mountains",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773660/boxdwesrvdj5h6gzqs4f.png",
    alt: "Yamunotri temple on the sacred Yamuna source pilgrimage route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778773688/qrbhk9v9fr9kummt85xt.png",
    alt: "Badrinath temple ornate facade with Neelkanth peak at dusk",
  },
];

const CHAR_DHAM_COVER = CHAR_DHAM_PHOTO_GALLERY[0].src;

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

/** Kartik Swami Temple Trek — summit shrine & Himalayan panorama (home yatras strip). */
const KARTIK_SWAMI_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127413/gdf8o4bjefb45bmkjszu.jpg",
    alt: "Kartik Swami temple on a rocky Himalayan summit with prayer flags and snow peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127423/mewsw7b5e3vqzsar2hzy.jpg",
    alt: "Pilgrims on the steep forest trail ascending to Kartik Swami near Rudraprayag",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127434/yvezslozsgklhelnmw5h.jpg",
    alt: "Panoramic Garhwal Himalaya vista from the Kartik Swami temple ridge at sunrise",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127445/qydtgxc8lqqsdqh7jpyy.webp",
    alt: "Ancient Kartikeya shrine perched on Kanakchauri hilltop above Rudraprayag valley",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127455/nsxxwivjb7l3nfkihbqs.webp",
    alt: "Snow-capped peaks of Kedarnath and Chaukhamba visible from Kartik Swami temple",
  },
];

/** Churdhar Yatra — Shirgul Maharaj summit & Sirmaur Shivalik (home yatras strip). */
const CHURDHAR_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125643/knylgm28qswce3csjjbg.jpg",
    alt: "Shirgul Maharaj temple atop Churdhar Peak with prayer flags and Himalayan panorama",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125650/xs4qldukxvb8imhyr2bs.jpg",
    alt: "Trekkers on the deodar forest trail from Nohradhar toward Churdhar summit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125663/otuhnf6c5cbezcz53ebb.jpg",
    alt: "Rhododendron-lined path through Sirmaur hills on the Churdhar Yatra route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125676/dxklfm4wpbpb6hno23st.jpg",
    alt: "360° Shivalik and plains vista from Churdhar Peak at 3,647m in Himachal Pradesh",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125684/rpjvdklw7lv4hvkwwuzg.jpg",
    alt: "Churdhar summit shrine and snow ridges above the outer Himalaya in Sirmaur district",
  },
];

/** Shrikhand Mahadev Yatra — natural Shiva lingam at 5,155m · Kullu (home yatras strip). */
const SHRIKHAND_MAHADEV_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125919/wc4tbcy191zvlzauo45b.webp",
    alt: "Natural rock Shiva Lingam formation at Shrikhand Mahadev summit, 5,155m Kullu",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125944/mzxlbztog1kv6unsrjcc.webp",
    alt: "Pilgrims ascending snow fields on the Shrikhand Mahadev trail from Jaon village",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125960/vinkwvr1mdtblugliazj.webp",
    alt: "Prayer flags and rocky ridge near Bheem Dwar on the Shrikhand Mahadev Yatra",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125969/rb6dz2kkatm26nxy64k2.webp",
    alt: "High-altitude Himalayan panorama from Shrikhand Mahadev pilgrimage in Himachal Pradesh",
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
  /** Mobile-only inline reel (homepage hero / dest grid). */
  videoSrc?: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  /** When `ctaLink` is `/book`, pre-fills trek/yatra/package on the booking page. */
  ctaBookSearch?: {
    trek?: string;
    yatra?: string;
    package?: string;
  };
}

function trekSlugFromCtaLink(ctaLink: string): string | undefined {
  return /^\/treks\/([^/]+)$/.exec(ctaLink)?.[1];
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

const VALLEY_OF_FLOWERS_TREK = TREKS.find(
  (t) => t.slug === "valley-of-flowers",
);

/** Valley of Flowers — UNESCO meadow gallery (Uttarakhand feature strip). */
const VALLEY_OF_FLOWERS_PHOTO_GALLERY: { src: string; alt: string }[] = (
  VALLEY_OF_FLOWERS_TREK?.images?.length
    ? VALLEY_OF_FLOWERS_TREK.images
    : [HOME_HERO_VALLEY_OF_FLOWERS_MAIN_IMAGE]
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Alpine wildflowers in full bloom in the UNESCO Valley of Flowers National Park"
      : idx === 1
        ? "Trekkers on a lush green trail through the Valley of Flowers monsoon meadow"
        : idx === 2
          ? "Snow-capped peaks above the flower-filled Valley of Flowers basin"
          : idx === 3
            ? "Close view of Brahma Kamal and alpine blooms on the Valley of Flowers trek"
            : "Himalayan scenery on the Valley of Flowers and Hemkund circuit",
}));

/** Brahmatal winter trek — Trending Uttarakhand grid + feature strip. */
const HOME_HERO_BRAHMATAL_WINTER_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778700831/cqkhz2o0jehuskfikrih.jpg";

const BRAHMATAL_TREK = TREKS.find((t) => t.slug === "brahmatal-trek");
const KEDARKANTHA_TREK = TREKS.find((t) => t.slug === "kedarkantha-trek");
const DAYARA_BUGYAL_TREK = TREKS.find((t) => t.slug === "dayara-bugyal");
const RUPIN_PASS_TREK = TREKS.find((t) => t.slug === "rupin-pass");

/** Rupin Pass — dramatic valley crossing (Uttarakhand feature strip). */
const RUPIN_PASS_PHOTO_GALLERY: { src: string; alt: string }[] = (
  RUPIN_PASS_TREK?.images?.length
    ? RUPIN_PASS_TREK.images
    : RUPIN_PASS_TREK
      ? [RUPIN_PASS_TREK.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Dramatic Rupin Pass valley waterfall and snow bridge on the trek trail"
      : idx === 1
        ? "High alpine meadows on the Rupin Pass trek in Uttarakhand"
        : idx === 2
          ? "Snow-covered pass approach on the Rupin Pass expedition"
          : "Himalayan ridgeline views from the Rupin Pass trek route",
}));

/** Dayara Bugyal — alpine meadow trek (Uttarakhand feature strip). */
const DAYARA_BUGYAL_PHOTO_GALLERY: { src: string; alt: string }[] = (
  DAYARA_BUGYAL_TREK?.images?.length
    ? DAYARA_BUGYAL_TREK.images
    : DAYARA_BUGYAL_TREK
      ? [DAYARA_BUGYAL_TREK.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Rolling Dayara Bugyal alpine meadow with Bandarpoonch peaks in Uttarakhand"
      : idx === 1
        ? "Wildflower-covered bugyal on the Dayara Bugyal trek trail"
        : idx === 2
          ? "Trekkers crossing high meadow ridges on Dayara Bugyal"
          : "Panoramic Himalayan views from Dayara Bugyal campsite",
}));

/** Kedarkantha — winter summit trek (Uttarakhand feature strip). */
const KEDARKANTHA_PHOTO_GALLERY: { src: string; alt: string }[] = (
  KEDARKANTHA_TREK?.images?.length
    ? KEDARKANTHA_TREK.images
    : KEDARKANTHA_TREK
      ? [KEDARKANTHA_TREK.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Snow-covered Kedarkantha summit trail with Himalayan peaks at sunrise"
      : idx === 1
        ? "Winter pine forest on the Kedarkantha trek from Sankri"
        : idx === 2
          ? "Frozen meadow campsite on the Kedarkantha winter trek"
          : "360° summit views from Kedarkantha peak in Uttarakhand",
}));

const CHOPTA_TUNGNATH_TREK = TREKS.find((t) => t.slug === "chopta-tungnath");
const PANGARCHULLA_TREK = TREKS.find((t) => t.slug === "pangarchulla-peak");
const DEORIATAL_CHANDRASHILA_TREK = TREKS.find(
  (t) => t.slug === "deoriatal-chandrashila",
);
const AUDENS_COL_TREK = TREKS.find((t) => t.slug === "audens-col");
const KEDARTAL_TREK = TREKS.find((t) => t.slug === "kedartal");
const HAR_KI_DUN_TREK = TREKS.find((t) => t.slug === "har-ki-dun");

/** Pangarchulla Peak trek — `hero/treks/pangarchulla-peak` (order left-to-right in grid). */
const PANGARCHULLA_PEAK_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110196/zicesdvggif1pxye65kq.webp",
    alt: "Snow-covered summit ridge on Pangarchulla Peak with Nanda Devi massif, Garhwal Himalaya",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110209/fyrqdf7p6046myyvth2z.webp",
    alt: "Trekkers crossing Khullara bugyal meadows on the Pangarchulla Peak summit trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110218/xja7mgekq6jjbwgxobpc.webp",
    alt: "Steep snow and rock approach to Pangarchulla summit at 4,586m in Uttarakhand",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110226/rui1j6fpf44kgxhcz273.webp",
    alt: "360° Himalayan panorama from Pangarchulla Peak — Dronagiri and Hathi-Ghodi peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779110234/upx7hmp4yubpldnfxyzk.webp",
    alt: "High-altitude camp and Kuari Pass region ridgelines on the Pangarchulla Peak circuit",
  },
] as const;

const HOME_HERO_PANGARCHULLA_PEAK_IMAGE = PANGARCHULLA_PEAK_TREK_IMAGES[0].src;

/** Pangarchulla Peak — summit climb · Kuari region (Uttarakhand feature strip). */
const PANGARCHULLA_PHOTO_GALLERY: { src: string; alt: string }[] =
  PANGARCHULLA_PEAK_TREK_IMAGES.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

/** Deoriatal Chandrashila trek — `hero/treks/deoriatal-chandrashila`. */
const DEORIATAL_CHANDRASHILA_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779098235/sytzfdbqwe4slnrblzgl.jpg",
    alt: "Deoriatal lake reflecting Chaukhamba peaks at sunrise on the Chandrashila trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779098245/jgcpi7n3zjxwxln0carr.jpg",
    alt: "Rhododendron forest trail from Sari village toward Deoriatal in Garhwal Himalaya",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779098255/ga8ronscnuxoepezv9vg.jpg",
    alt: "Trekkers at Deoriatal lakeside camp with snow peaks mirrored in still water",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779098266/pzo38odcjwnn1l85jymg.jpg",
    alt: "Chandrashila summit ridge panorama above Chopta meadows at 4,090m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779098273/kosmewn9tqlelq65n1v8.jpg",
    alt: "Golden-hour Himalayan vista from Chandrashila on the Deoriatal Chandrashila circuit",
  },
] as const;

const HOME_HERO_DEORIATAL_CHANDRASHILA_IMAGE =
  DEORIATAL_CHANDRASHILA_TREK_IMAGES[0].src;

/** Deoriatal Chandrashila — lake & summit weekend (Uttarakhand feature strip). */
const DEORIATAL_CHANDRASHILA_PHOTO_GALLERY: { src: string; alt: string }[] =
  DEORIATAL_CHANDRASHILA_TREK_IMAGES.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

/** Auden's Col trek — `hero/treks/audens-col`. */
const AUDENS_COL_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096640/cami1uct7alkbydbadir.jpg",
    alt: "Technical glacier crossing on Auden's Col trek between Gangotri and Kedarnath",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096648/qcfzu06o491oxtomsoga.jpg",
    alt: "Crevasse-laced ice field on the Auden's Col high-altitude route at 5,490m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096657/jjwjw7sw761m98erh8h1.jpg",
    alt: "Mountaineers roped on steep snow slope approaching Auden's Col pass",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096665/nrr2za078guy1tf9547b.jpg",
    alt: "Remote Garhwal ridgeline and moraine on the Auden's Col expedition",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096674/iqyguk8wqm1rlwuojqmj.jpg",
    alt: "Summit camp below jagged peaks on India's legendary Auden's Col glacier trek",
  },
] as const;

const _HOME_HERO_AUDENS_COL_IMAGE = AUDENS_COL_TREK_IMAGES[0].src;

/** Auden's Col — extreme glacier pass (Uttarakhand feature strip). */
const AUDENS_COL_PHOTO_GALLERY: { src: string; alt: string }[] =
  AUDENS_COL_TREK_IMAGES.map((item) => ({ src: item.src, alt: item.alt }));

/** Kedartal trek — `hero/treks/kedartal` (order left-to-right in grid). */
const KEDARTAL_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779094566/y7ly2faaw5i510f1rqml.webp",
    alt: "Kedartal glacial lake at 4,750m reflecting Thalay Sagar and Bhrigupanth peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779094557/mlusmmphrcf67pgjswzl.webp",
    alt: "Turquoise Kedartal tarn rimmed by moraine below granite walls in Gangotri National Park",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779094548/bfy8gtldowajcx14as34.webp",
    alt: "Steep boulder and moraine trail from Gangotri toward Lord Shiva's Kedartal lake",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779094534/keupqfxnevciufwajlzd.webp",
    alt: "High camp with jagged Himalayan spires on the challenging Kedartal trek route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779094526/smfl5cftr4io2eg4sqca.webp",
    alt: "Kedar Glacier basin and sacred high-altitude scenery on the Kedartal expedition",
  },
] as const;

const HOME_HERO_KEDARTAL_IMAGE = KEDARTAL_TREK_IMAGES[0].src;

/** Kedartal — Shiva's lake · Thalay Sagar (Uttarakhand feature strip). */
const KEDARTAL_PHOTO_GALLERY: { src: string; alt: string }[] =
  KEDARTAL_TREK_IMAGES.map((item) => ({ src: item.src, alt: item.alt }));

/** Har Ki Dun — Valley of the Gods (Uttarakhand feature strip). */
const HAR_KI_DUN_PHOTO_GALLERY: { src: string; alt: string }[] = (
  HAR_KI_DUN_TREK?.images?.length
    ? HAR_KI_DUN_TREK.images
    : HAR_KI_DUN_TREK
      ? [HAR_KI_DUN_TREK.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Har Ki Dun valley meadows with Swargarohini peaks in Garhwal Himalaya"
      : idx === 1
        ? "Ancient Osla village on the Har Ki Dun trek trail in Uttarakhand"
        : idx === 2
          ? "Alpine forest and river crossing on the Har Ki Dun valley trek"
          : "Scenic campsite and mountain views on the Har Ki Dun trek",
}));

/** Chopta Tungnath — Panch Kedar & Chandrashila (Uttarakhand feature strip). */
const CHOPTA_TUNGNATH_PHOTO_GALLERY: { src: string; alt: string }[] = (
  CHOPTA_TUNGNATH_TREK?.images?.length
    ? CHOPTA_TUNGNATH_TREK.images
    : CHOPTA_TUNGNATH_TREK
      ? [CHOPTA_TUNGNATH_TREK.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Rhododendron forest trail toward Tungnath temple on the Chopta Tungnath trek"
      : idx === 1
        ? "Chandrashila summit panorama above Chopta meadows in Garhwal Himalaya"
        : idx === 2
          ? "Tungnath temple and snow peaks on the Panch Kedar circuit"
          : "Scenery on the Chopta Tungnath Chandrashila trek in Uttarakhand",
}));

/** Brahmatal Winter Trek — snow lakes & Trishul views (Uttarakhand feature strip). */
const BRAHMATAL_PHOTO_GALLERY: { src: string; alt: string }[] = (
  BRAHMATAL_TREK?.images?.length
    ? BRAHMATAL_TREK.images
    : [HOME_HERO_BRAHMATAL_WINTER_IMAGE]
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Snow-covered Brahmatal trail with frozen forest and distant Trishul peaks"
      : idx === 1
        ? "Trekkers crossing a white winter meadow on the Brahmatal Winter Trek"
        : idx === 2
          ? "Frozen Bekaltal or Brahmatal lake rimmed by snow-laden oak forest"
          : idx === 3
            ? "Summit camp panorama — Garhwal Himalaya from Brahmatal at 3,861m"
            : "Winter trekking path through deep snow on the Brahmatal circuit",
}));

/** Triund trek — `hero/treks/triund-trek` (order left-to-right in grid). */
const TRIUND_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778762878/qkhu5phox4x6diqpllii.jpg",
    alt: "Triund ridge camp with Dhauladhar peaks above McLeod Ganj",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778762895/qxpcbgkqfl8tj95m7jmr.jpg",
    alt: "Oak and rhododendron forest trail on the Triund weekend trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778762930/rlmplvv2apshtxlwnbmw.jpg",
    alt: "Panoramic Kangra Valley vista from Triund top at 2,828m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778762955/dm9qnffccv4a1mzgrejk.jpg",
    alt: "Trekkers at Triund meadow with snow-capped Dhauladhar backdrop",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778762999/rla7vu2gzqlmfzms9n48.jpg",
    alt: "Golden-hour sunset over Triund ridge and Himalayan ridgelines",
  },
] as const;

const HOME_HERO_TRIUND_IMAGE = TRIUND_TREK_IMAGES[0].src;

/** Hampta Pass trek — `hero/treks/hampta-pass`. */
const HAMPTA_PASS_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763372/d6igt6vhmcv8w70xog9n.jpg",
    alt: "Hampta Pass trail through lush Kullu Valley meadows near Manali",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763428/c2jp1mzkgj4vkfjan2ib.jpg",
    alt: "Alpine river crossing on the Hampta Pass contrast trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763406/yd8ruvk6pff92duunugb.jpg",
    alt: "High meadow camp below Hampta Pass with Pir Panjal views",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763390/tqzlqqhys5z4w94oemdg.jpg",
    alt: "Snow patches and boulders on the approach to Hampta Pass at 4,270m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763381/ydf0yaorapb0aj11ygz5.jpg",
    alt: "Barren Spiti-side descent after crossing Hampta Pass into Lahaul",
  },
] as const;

const HOME_HERO_HAMPTA_PASS_IMAGE = HAMPTA_PASS_TREK_IMAGES[0].src;

/** Sar Pass trek — `hero/treks/sar-pass`. */
const SAR_PASS_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771073/qhvb9wlwzl6x3pslktln.jpg",
    alt: "Sar Pass alpine meadow with Parvati Valley peaks in Himachal",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771124/vejxmjntznrrsx3ktrtx.jpg",
    alt: "Snow-lined trail on the Sar Pass trek from Kasol",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771143/mjzlnjt5d3dyh1smrbga.jpg",
    alt: "Trekkers ascending forested switchbacks toward Sar Pass",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771109/osdmrxevxuxxrjgodlyq.jpg",
    alt: "High-altitude camp with Himalayan ridgelines on Sar Pass circuit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778771088/oip9aatnxewaa77hrlrh.jpg",
    alt: "Summit panorama from Sar Pass at 4,250m in Parvati Valley",
  },
] as const;

const HOME_HERO_SAR_PASS_IMAGE = SAR_PASS_TREK_IMAGES[0].src;

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

/** Chandratal trek — single hero card (`hero/treks/chandratal-trek`). */
const HOME_HERO_CHANDRATAL_TREK_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763958/e0wqfec93qgb2510weua.jpg";

/** Chandratal Lake trek — `hero/treks/chandratal-lake`. */
const CHANDRATAL_LAKE_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763919/onypowdlhqpxerj54o3r.jpg",
    alt: "Chandratal Moon Lake crescent shoreline in Lahaul–Spiti",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763904/o7pxq47ylheuqnvqqbn5.jpg",
    alt: "Turquoise glacial water of Chandratal at 4,300m",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763937/gsk17paadcrmbve6cewu.jpg",
    alt: "Chandratal lake reflection with barren Spiti mountains",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763947/sfdxfildo0mawbyauczp.jpg",
    alt: "Lakeside camping at Chandratal under Himalayan twilight",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1778763958/e0wqfec93qgb2510weua.jpg",
    alt: "Wide view of Chandratal high-altitude lake in cold desert terrain",
  },
] as const;

const HOME_HERO_CHANDRATAL_LAKE_IMAGE = HOME_HERO_CHANDRATAL_TREK_IMAGE;

/** Spiti Valley Circuit — `hero/treks/spiti-valley-circuit`. */
const SPITI_VALLEY_CIRCUIT_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779097189/gcfek7p9w7hzfx0qf2m.jpg",
    alt: "Key Monastery perched above the cold-desert Spiti Valley on the circuit trek",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779097196/x95zfk6bprjguerez7jr.jpg",
    alt: "Ancient Buddhist gompa and prayer flags in high-altitude Spiti village",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779097210/xz47lpwtf9gxi1n8rg9i.jpg",
    alt: "Barren Spiti moonscape with braided river and distant snow peaks",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779097217/xgstsxm3alodgktofgjw.jpg",
    alt: "Fossil-rich cliffs and turquoise stream in Pin Valley on the Spiti circuit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779097231/pvyk94ns57xeetcnmo5v.jpg",
    alt: "High mountain road through Spiti cold desert toward Kaza and Chandratal",
  },
] as const;

const _HOME_HERO_SPITI_VALLEY_CIRCUIT_IMAGE =
  SPITI_VALLEY_CIRCUIT_TREK_IMAGES[0].src;

/** Pin Parvati Pass trek — `hero/treks/pin-parvati-pass`. */
const PIN_PARVATI_PASS_TREK_IMAGES = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779095979/lni2oa8lfrxr05syce6o.webp",
    alt: "Pin Parvati Pass high ridge with Parvati Valley meadows and Spiti desert beyond",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779095989/nb5fd7hgu2qrjavguk2l.webp",
    alt: "Snow bridge and glacial stream on the Pin Parvati Pass extreme crossing",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096005/ybvdzafi77gcyomj884k.webp",
    alt: "Trekkers on moraine below 5,319m Pin Parvati Pass in Himachal Pradesh",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096017/ahiud7htfgg5tz0p3nso.webp",
    alt: "Barren Pin Valley landscape after crossing Pin Parvati Pass into Spiti",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779096034/gewqqkmgiovc3mrnq6bm.webp",
    alt: "Summit panorama from Pin Parvati Pass — one of India's toughest high passes",
  },
] as const;

const HOME_HERO_PIN_PARVATI_PASS_IMAGE = PIN_PARVATI_PASS_TREK_IMAGES[0].src;

/** Do Dham Yatra — Kedarnath & Badrinath (home yatras strip + hero). */
const DO_DHAM_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125096/qyjicoc6biih2ghwodne.jpg",
    alt: "Kedarnath temple with snow-capped peaks on the Do Dham Yatra circuit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125108/p5ezmk0a0zw0klyrgoxt.jpg",
    alt: "Badrinath temple colourful facade and Neelkanth peak on Do Dham pilgrimage",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125121/tyogrgtxm8ocgjb3flxz.jpg",
    alt: "Pilgrims on the Kedarnath trek path during Do Dham Yatra in Garhwal Himalaya",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125153/zbjkynrx4btrxewjmwff.jpg",
    alt: "Tapt Kund hot spring and Badrinath valley on the Kedarnath–Badrinath Do Dham route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779125178/fdcekxsm7tctentvje8q.jpg",
    alt: "Himalayan confluence and mountain shrines along Do Dham Yatra in Uttarakhand",
  },
];

/** Kedarnath Yatra — Jyotirlinga at 3,583m (home yatras strip). */
const KEDARNATH_YATRA_PHOTO_GALLERY: { src: string; alt: string }[] = (
  KEDARNATH_YATRA?.images?.length
    ? KEDARNATH_YATRA.images
    : KEDARNATH_YATRA
      ? [KEDARNATH_YATRA.image]
      : []
).map((src, idx) => ({
  src,
  alt:
    idx === 0
      ? "Kedarnath temple at 3,583m with snow-capped Himalayan peaks"
      : idx === 1
        ? "Pilgrims on the Kedarnath trek from Gaurikund along the Mandakini valley"
        : idx === 2
          ? "Ancient Kedarnath shrine and surrounding Garhwal Himalaya scenery"
          : idx === 3
            ? "Mountain trail and prayer flags on the Kedarnath Yatra route"
            : "Sacred Kedarnath Dham pilgrimage views in Rudraprayag, Uttarakhand",
}));

/** Triyuginarayan Temple Yatra — Shiva–Parvati wedding site & eternal flame (home strip). */
const TRIYUGINARAYAN_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127178/sfbjp1qs6w2rgf5tskey.jpg",
    alt: "Triyuginarayan Temple with stone shikhara and Himalayan backdrop near Kedarnath",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127164/vgbqzzcq6zqxquet9kbn.jpg",
    alt: "Akhand dhuni eternal fire at Triyuginarayan where Shiva and Parvati were wed",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127147/ea2mfuao4nz74tbcy36h.jpg",
    alt: "Pilgrims at Triyuginarayan village temple in Rudraprayag district, Uttarakhand",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127134/stcckupnukwugrvpjwii.jpg",
    alt: "Ancient stone temple courtyard at Triyuginarayan sacred wedding venue",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779127127/lvmkbidskzjlvdedn0ft.jpg",
    alt: "Mandakini valley views on the route to Triyuginarayan Temple from Sonprayag",
  },
];

/** Mani Mahesh Yatra — sacred lake & Kailash of Chamba (home yatras strip + hero). */
const MANI_MAHESH_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126662/xn4z1zp0waiusiisbpnk.jpg",
    alt: "Turquoise Mani Mahesh Lake at 4,080m with Mani Mahesh Kailash peak above Chamba",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126677/lfl5zoldc1xowscg9ekc.jpg",
    alt: "Pilgrims on the forest trail from Hadsar toward Mani Mahesh Lake during annual yatra",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126653/exo2ldjgxdmuaurhfv8p.jpg",
    alt: "Mani Mahesh Kailash snow peak reflected in the glacial lake at Bhadon Chaturdashi",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126705/zomr4e5g2npv3c2rejtl.jpg",
    alt: "Prayer flags and alpine meadows on the Mani Mahesh Yatra route near Bharmour",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126692/punzv0qkr8uldttsqa7r.jpg",
    alt: "Devotees at Shiva Kund holy dip on the shores of Mani Mahesh Lake, Himachal Pradesh",
  },
];

/** Kinnaur Kailash Parikrama Yatra — sacred peak & parikrama (home yatras strip + hero). */
const KINNAUR_KAILASH_PHOTO_GALLERY: { src: string; alt: string }[] = [
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126257/v5zerq649e0hfxmqtsaw.jpg",
    alt: "Kinnaur Kailash peak and natural Shivalinga rock formation on the parikrama circuit",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126230/dfrqtyywkwbupvnvygyk.webp",
    alt: "Pilgrims crossing high alpine terrain on the Kinnaur Kailash Parikrama in Himachal",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126245/orkriejad6yaue5cspxo.jpg",
    alt: "Ancient Kinnauri village and Buddhist monastery along the Kinnaur Kailash Yatra route",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126270/vstfgwpnxmikvilgsnlu.jpg",
    alt: "Snow-covered Charang La approach with views of the Kinnaur Kailash massif",
  },
  {
    src: "https://res.cloudinary.com/ddbcauxef/image/upload/v1779126306/ozcokzp0z614pjnjvezn.jpg",
    alt: "Prayer flags and Himalayan ridges on the Kinnaur Kailash Parikrama near Sangla",
  },
];

const _HOME_HERO_KINNAUR_KAILASH_IMAGE = KINNAUR_KAILASH_PHOTO_GALLERY[0].src;

/** Panch Kedar Yatra — five-shrine collage (yatras section banner). */
const HOME_HERO_PANCH_KEDAR_YATRA_IMAGE =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1778822747/idvfsvrybj0q9crjdl3n.png";

const HERO_SETS: HeroSet[] = [
  {
    left: {
      image: CHOPTA_TUNGNATH_PHOTO_GALLERY[0].src,
      videoSrc: homeTrekReelVideo("chopta-tungnath"),
      title: "Chopta Tungnath Trek",
      subtitle: "Panch Kedar · Chandrashila Summit",
      cta: "Book Trek",
      ctaLink: "/treks/chopta-tungnath",
    },
    right: [
      {
        image: CHAR_DHAM_COVER,
        title: "Char Dham Yatra 2026",
        subtitle: "Sacred Journey · Limited Spots",
        cta: "Book Yatra",
        ctaLink: "/book",
        ctaBookSearch: { yatra: "char-dham-yatra" },
      },
      {
        image: DO_DHAM_PHOTO_GALLERY[0].src,
        title: "Do Dham Yatra",
        subtitle: "Kedarnath + Badrinath · 7 Days",
        cta: "Book Yatra",
        ctaLink: "/yatras/do-dham-yatra",
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
      videoSrc: homeTrekReelVideo("valley-of-flowers"),
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
        image: KINNAUR_KAILASH_PHOTO_GALLERY[0].src,
        title: "Kinnaur Kailash Parikrama",
        subtitle: "Sacred parikrama · 5,241m pass",
        cta: "Book Yatra",
        ctaLink: "/yatras/kinnaur-kailash-yatra",
      },
      {
        image: TRIYUGINARAYAN_PHOTO_GALLERY[0].src,
        title: "Triyuginarayan Temple Yatra",
        subtitle: "Shiva–Parvati wedding site",
        cta: "Book Yatra",
        ctaLink: "/yatras/triyuginarayan-temple",
      },
    ],
  },
  {
    left: {
      image: HOME_HERO_ROOPKUND_MAIN_IMAGE,
      videoSrc: homeTrekReelVideo("roopkund-trek"),
      title: "Roopkund Trek",
      subtitle: "The Skeleton Lake Awaits",
      cta: "Explore Now",
      ctaLink: "/treks/roopkund-trek",
    },
    right: [
      {
        image: SHRIKHAND_MAHADEV_PHOTO_GALLERY[0].src,
        title: "Shrikhand Mahadev Yatra",
        subtitle: "Natural Shiva lingam · 5,155m",
        cta: "Book Yatra",
        ctaLink: "/yatras/shrikhand-mahadev-yatra",
      },
      {
        image: PANCH_BADRI_PHOTO_GALLERY[0].src,
        title: "Panch Badri Yatra",
        subtitle: "Five Vishnu shrines · 8 Days",
        cta: "Book Yatra",
        ctaLink: "/yatras/panch-badri-yatra",
      },
      {
        image: MANI_MAHESH_PHOTO_GALLERY[0].src,
        title: "Mani Mahesh Yatra",
        subtitle: "Kailash of Chamba · sacred lake",
        cta: "Book Yatra",
        ctaLink: "/yatras/mani-mahesh-yatra",
      },
    ],
  },
];

// ─── Destination Grid Data ────────────────────────────────────────────────────

function ukDestPrice(trek: (typeof TREKS)[number]): string {
  return `₹${trek.price.toLocaleString("en-IN")}`;
}

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
  ...(RUPIN_PASS_TREK
    ? [
        {
          name: RUPIN_PASS_TREK.name,
          image: RUPIN_PASS_TREK.image,
          price: ukDestPrice(RUPIN_PASS_TREK),
          slug: RUPIN_PASS_TREK.slug,
        },
      ]
    : []),
  ...(HAR_KI_DUN_TREK
    ? [
        {
          name: HAR_KI_DUN_TREK.name,
          image: HAR_KI_DUN_TREK.image,
          price: ukDestPrice(HAR_KI_DUN_TREK),
          slug: HAR_KI_DUN_TREK.slug,
        },
      ]
    : []),
  ...(PANGARCHULLA_TREK
    ? [
        {
          name: PANGARCHULLA_TREK.name,
          image: HOME_HERO_PANGARCHULLA_PEAK_IMAGE,
          price: ukDestPrice(PANGARCHULLA_TREK),
          slug: PANGARCHULLA_TREK.slug,
        },
      ]
    : []),
  ...(DEORIATAL_CHANDRASHILA_TREK
    ? [
        {
          name: DEORIATAL_CHANDRASHILA_TREK.name,
          image: HOME_HERO_DEORIATAL_CHANDRASHILA_IMAGE,
          price: ukDestPrice(DEORIATAL_CHANDRASHILA_TREK),
          slug: DEORIATAL_CHANDRASHILA_TREK.slug,
        },
      ]
    : []),
  ...(KEDARTAL_TREK
    ? [
        {
          name: KEDARTAL_TREK.name,
          image: HOME_HERO_KEDARTAL_IMAGE,
          price: ukDestPrice(KEDARTAL_TREK),
          slug: KEDARTAL_TREK.slug,
        },
      ]
    : []),
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
    price: "₹8,000",
    slug: "chandratal-lake",
  },
  {
    name: "Sar Pass",
    image: HOME_HERO_SAR_PASS_IMAGE,
    price: "₹8,500",
    slug: "sar-pass",
  },
  {
    name: "Pin Parvati Pass",
    image: HOME_HERO_PIN_PARVATI_PASS_IMAGE,
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

/** Himachal trek photo strips (`hero/treks/*`) on the trending section. */
const HP_TREK_GALLERIES: {
  title: string;
  slug: string;
  images: readonly { src: string; alt: string }[];
  ocid: string;
}[] = [
  {
    title: "Triund Trek — McLeod Ganj ridge weekend",
    slug: "triund-trek",
    images: TRIUND_TREK_IMAGES,
    ocid: "triund",
  },
  {
    title: "Hampta Pass — Kullu to Spiti contrast crossing",
    slug: "hampta-pass",
    images: HAMPTA_PASS_TREK_IMAGES,
    ocid: "hampta",
  },
  {
    title: "Sar Pass — Parvati Valley classic",
    slug: "sar-pass",
    images: SAR_PASS_TREK_IMAGES,
    ocid: "sar_pass",
  },
  {
    title: "Chandratal Lake — Moon Lake camping trek",
    slug: "chandratal-lake",
    images: CHANDRATAL_LAKE_TREK_IMAGES,
    ocid: "chandratal_lake",
  },
  {
    title: "Pin Parvati Pass — 5,319m Parvati to Spiti crossing",
    slug: "pin-parvati-pass",
    images: PIN_PARVATI_PASS_TREK_IMAGES,
    ocid: "pin_parvati",
  },
  {
    title: "Spiti Valley Circuit — monasteries & cold desert",
    slug: "spiti-valley-circuit",
    images: SPITI_VALLEY_CIRCUIT_TREK_IMAGES,
    ocid: "spiti_circuit",
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
  ctaBookSearch,
  className,
  style,
  children,
  "data-ocid": dataOcid,
}: {
  ctaLink: string;
  ctaBookSearch?: HeroBanner["ctaBookSearch"];
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  "data-ocid"?: string;
}) {
  if (ctaLink === "/book") {
    return (
      <Link
        to="/book"
        search={bookSearch(ctaBookSearch ?? {})}
        preload="intent"
        className={className}
        style={style}
        data-ocid={dataOcid}
      >
        {children}
      </Link>
    );
  }
  const yatraSlug = /^\/yatras\/([^/]+)$/.exec(ctaLink)?.[1];
  if (yatraSlug) {
    return (
      <Link
        to="/yatras/$slug"
        params={{ slug: yatraSlug }}
        preload="intent"
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
        preload="intent"
        className={className}
        style={style}
        data-ocid={dataOcid}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      to="/treks"
      preload="intent"
      className={className}
      style={style}
      data-ocid={dataOcid}
    >
      {children}
    </Link>
  );
}

function HeroFeaturedMedia({
  banner,
  setIdx,
  mobile,
  sizes,
  className,
  priority,
}: {
  banner: HeroBanner;
  setIdx: number;
  mobile: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const trekSlug = trekSlugFromCtaLink(banner.ctaLink);

  if (mobile && trekSlug && homeTrekReelVideo(trekSlug)) {
    return (
      <HomeTrekFeatureMedia
        key={`hero-reel-video-${setIdx}`}
        trekSlug={trekSlug}
        image={banner.image}
        alt={banner.title}
        sizes={sizes}
        className={className ?? "object-cover"}
        priority={priority}
      />
    );
  }

  return (
    <OptimizedImage
      key={`hero-img-${setIdx}-${mobile ? "m" : "d"}`}
      src={banner.image}
      alt={banner.title}
      fill
      variant="hero"
      priority={priority}
      sizes={sizes}
      className={className ?? "object-cover lg:min-h-[420px]"}
    />
  );
}

/**
 * Phone landing screen shows the reels feed instead of the banner cards. The card
 * markup is kept intact below — flip this to `true` to restore the old phone hero.
 */
const SHOW_PHONE_BANNER_HERO = false;

function HeroBannerGrid() {
  const [setIdx, setSetIdx] = useState(0);
  const [mediaVisible, setMediaVisible] = useState(true);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToSet = (index: number) => {
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    setMediaVisible(true);
    setSetIdx(index);
  };

  useEffect(() => {
    if (carouselPaused) {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
      setMediaVisible(true);
      return;
    }

    const timer = setInterval(() => {
      setMediaVisible(false);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => {
        setSetIdx((prev) => (prev + 1) % HERO_SETS.length);
        setMediaVisible(true);
        fadeTimerRef.current = null;
      }, 400);
    }, 5000);

    return () => {
      clearInterval(timer);
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };
  }, [carouselPaused]);

  /** Never leave hero media faded out (tab throttle / timer races). */
  useEffect(() => {
    if (mediaVisible) return;
    const safety = setTimeout(() => setMediaVisible(true), 900);
    return () => clearTimeout(safety);
  }, [mediaVisible]);

  const set = HERO_SETS[setIdx];
  const [deskPromoWide, ...deskPromoTall] = set.right;

  const renderDeskPromo = (
    b: HeroBanner,
    i: number,
    layout: "wide" | "tall",
  ) => (
    <article
      key={b.title}
      className={`home-hero__desk-promo group home-hero__desk-promo--${layout}`}
    >
      <div
        className="home-hero__desk-media"
        style={{ opacity: mediaVisible ? 1 : 0 }}
        aria-hidden={!mediaVisible}
      >
        <OptimizedImage
          key={`hero-right-desk-${setIdx}-${i}-${layout}`}
          src={b.image}
          alt={b.title}
          fill
          variant={layout === "wide" ? "hero" : "destination"}
          sizes={layout === "wide" ? "28vw" : "14vw"}
          className="home-hero__desk-img home-hero__desk-img--promo"
        />
      </div>
      <div
        className="home-hero__desk-scrim home-hero__desk-scrim--promo"
        aria-hidden
      />
      <div className="home-hero__desk-copy home-hero__desk-copy--promo">
        <h3 className="text-shadow text-sm font-bold leading-snug text-white line-clamp-2">
          {b.title}
        </h3>
        <p className="text-shadow mt-0.5 line-clamp-1 text-[11px] leading-snug text-white">
          {b.subtitle}
        </p>
        <HeroRightPromoCta
          ctaLink={b.ctaLink}
          ctaBookSearch={b.ctaBookSearch}
          className="btn-primary home-hero__cta home-hero__cta--strip mt-1.5 shrink-0 px-3 py-1 text-xs"
          style={{ width: "fit-content" }}
          data-ocid={`hero.right_cta.${i + 1}`}
        >
          {b.cta}
        </HeroRightPromoCta>
      </div>
    </article>
  );

  const heroDots = (
    <div className="home-hero__dots flex justify-center gap-2">
      {HERO_SETS.map((heroSet, i) => (
        <button
          key={heroSet.left.title}
          type="button"
          onClick={() => goToSet(i)}
          aria-label={`Banner set ${i + 1}`}
          className="rounded-full transition-all"
          style={{
            width: i === setIdx ? 24 : 8,
            height: 8,
            background:
              i === setIdx ? "var(--ew-orange)" : "rgba(255,255,255,0.35)",
          }}
        />
      ))}
    </div>
  );

  const featuredCard = (
    <div className="home-hero__featured relative overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 transition-opacity duration-400 ease-out"
        style={{ opacity: mediaVisible ? 1 : 0 }}
        aria-hidden={!mediaVisible}
      >
        <HeroFeaturedMedia
          banner={set.left}
          setIdx={setIdx}
          mobile
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      </div>
      <div className="home-hero__copy absolute bottom-0 left-0 right-0 z-[2] p-4 sm:p-6">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 sm:text-xs">
          Trekora Featured
        </p>
        <h2 className="text-shadow mb-1 text-xl font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
          {set.left.title}
        </h2>
        <p className="text-shadow mb-3 line-clamp-2 text-sm text-white">
          {set.left.subtitle}
        </p>
        <HeroRightPromoCta
          ctaLink={set.left.ctaLink}
          className="btn-primary home-hero__cta home-hero__cta--featured text-sm"
          data-ocid="hero.left_cta"
        >
          {set.left.cta}
        </HeroRightPromoCta>
      </div>
    </div>
  );

  return (
    <section
      className="home-hero w-full"
      data-ocid="hero.section"
      data-travel-image-section
      style={{ background: "#111", position: "relative" }}
      onPointerEnter={() => setCarouselPaused(true)}
      onPointerLeave={() => setCarouselPaused(false)}
      onFocusCapture={() => setCarouselPaused(true)}
      onBlurCapture={() => setCarouselPaused(false)}
    >
      {/* ── Phone: full-screen trek reels feed ── */}
      <HomeMobileReelsSection />

      {/* ── Phone banner hero: retained, rendered only when re-enabled ── */}
      {SHOW_PHONE_BANNER_HERO ? (
        <div className="home-hero__mobile lg:hidden">
          <div className="container mx-auto px-4 pb-3 pt-3">
            {featuredCard}
            <div
              className="home-hero__strip mt-2.5 flex gap-2 overflow-x-auto pb-1"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {set.right.map((b, i) => (
                <div
                  key={b.title}
                  className="home-hero__strip-card relative shrink-0 overflow-hidden rounded-xl"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-400 ease-out"
                    style={{ opacity: mediaVisible ? 1 : 0 }}
                    aria-hidden={!mediaVisible}
                  >
                    <OptimizedImage
                      src={b.image}
                      alt={b.title}
                      fill
                      variant="hero"
                      sizes="78vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  </div>
                  <div className="home-hero__copy absolute bottom-0 left-0 right-0 z-[2] p-3">
                    <h3 className="text-shadow text-sm font-bold leading-tight text-white">
                      {b.title}
                    </h3>
                    <p className="text-shadow mb-2 line-clamp-1 text-[11px] text-white">
                      {b.subtitle}
                    </p>
                    <HeroRightPromoCta
                      ctaLink={b.ctaLink}
                      ctaBookSearch={b.ctaBookSearch}
                      className="btn-primary home-hero__cta home-hero__cta--strip"
                      data-ocid={`hero.right_cta.${i + 1}`}
                    >
                      {b.cta}
                    </HeroRightPromoCta>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">{heroDots}</div>
          </div>
        </div>
      ) : null}

      {/* ── Desktop: premium 2-column hero grid ── */}
      <div className="home-hero__desktop hidden lg:block">
        <div className="container mx-auto px-4 py-4">
          <div className="home-hero__desk-grid">
            <article className="home-hero__desk-featured group">
              <div
                className="home-hero__desk-media"
                style={{ opacity: mediaVisible ? 1 : 0 }}
                aria-hidden={!mediaVisible}
              >
                <OptimizedImage
                  key={`hero-left-desk-${setIdx}`}
                  src={set.left.image}
                  alt={set.left.title}
                  fill
                  variant="hero"
                  priority
                  sizes="55vw"
                  className="home-hero__desk-img"
                />
              </div>
              <div
                className="home-hero__desk-scrim home-hero__desk-scrim--featured"
                aria-hidden
              />
              <div className="home-hero__desk-copy home-hero__desk-copy--featured">
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
                  Trekora Featured
                </p>
                <h2 className="text-shadow mb-1.5 max-w-lg text-3xl font-bold leading-tight text-white xl:text-[2rem]">
                  {set.left.title}
                </h2>
                <p className="text-shadow mb-4 max-w-md text-sm text-white">
                  {set.left.subtitle}
                </p>
                <HeroRightPromoCta
                  ctaLink={set.left.ctaLink}
                  className="btn-primary home-hero__cta home-hero__cta--featured w-fit text-sm"
                  style={{ width: "fit-content" }}
                  data-ocid="hero.left_cta"
                >
                  {set.left.cta}
                </HeroRightPromoCta>
              </div>
            </article>

            <div className="home-hero__desk-promos">
              {deskPromoWide ? renderDeskPromo(deskPromoWide, 0, "wide") : null}
              <div className="home-hero__desk-promo-duo">
                {deskPromoTall.map((b, i) => renderDeskPromo(b, i + 1, "tall"))}
              </div>
            </div>
          </div>
          <div className="mt-4">{heroDots}</div>
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
      className="home-strip-marquee marquee-container py-3"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="trust.section"
    >
      <div className="marquee-track">
        {items.map((item) => (
          <span
            key={item.key}
            className="home-strip-marquee__item flex shrink-0 items-center gap-2 whitespace-nowrap px-4 text-[13px] sm:px-5"
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
  { end: 1000, suffix: "+", label: "Trekking Experiences" },
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
        className="home-carousel-nav absolute left-0 top-1/2 z-10 -ml-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-elevated transition-all hover:scale-110 sm:flex"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <ChevronLeft size={16} style={{ color: "var(--ew-red)" }} />
      </button>
      <div
        ref={scrollRef}
        className="home-carousel-track flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {treks.map((trek, i) => (
          <div
            key={trek.id}
            className="home-carousel-card flex-none w-[85vw] sm:w-64 md:w-56"
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
        className="home-carousel-nav absolute right-0 top-1/2 z-10 -mr-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-elevated transition-all hover:scale-110 sm:flex"
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
          <HomeTrekFeatureMedia
            trekSlug={d.slug}
            image={d.image}
            alt={d.name}
            sizes="(max-width: 1024px) 33vw, 200px"
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

const SITELINK_FEATURED_TREK_SLUGS = SITELINK_CANDIDATE_TREK_SLUGS;

function prioritizeSitelinkTreks<T extends { slug: string }>(treks: T[]): T[] {
  const prioritized = SITELINK_FEATURED_TREK_SLUGS.map((slug) =>
    treks.find((t) => t.slug === slug),
  ).filter(Boolean) as T[];
  const rest = treks.filter(
    (t) => !SITELINK_FEATURED_TREK_SLUGS.includes(t.slug as (typeof SITELINK_FEATURED_TREK_SLUGS)[number]),
  );
  return [...prioritized, ...rest];
}

function RecommendedSection() {
  const [activeFilter, setActiveFilter] = useState<TrekFilter>("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = prioritizeSitelinkTreks(
    TREKS.filter((t) => {
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
    }),
  ).slice(0, 16);

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
          className="home-section-head mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="min-w-0">
            <SectionTitle>Recommended Treks &amp; Packages</SectionTitle>
            <p className="text-sm mt-1" style={{ color: "var(--ew-text-lt)" }}>
              Handpicked experiences for every kind of trekker
            </p>
          </div>
          <Link
            to="/treks"
            className="home-section-link shrink-0 text-sm font-semibold flex items-center gap-1"
            style={{ color: "var(--ew-red)" }}
            data-ocid="recommended.view_all_link"
          >
            View All 40+ Packages <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <div className="home-filter-tabs flex gap-1.5 overflow-x-auto scrollbar-hide pb-3 mb-4">
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
            className="home-carousel-nav absolute left-0 top-1/2 z-10 -ml-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-elevated transition-all hover:scale-110 sm:flex"
            style={{ borderColor: "var(--ew-gray-mid)" }}
            data-ocid="recommended.carousel_prev"
          >
            <ChevronLeft size={16} style={{ color: "var(--ew-red)" }} />
          </button>
          <div
            ref={scrollRef}
            className="home-carousel-track flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {filtered.map((trek, i) => (
              <div
                key={trek.id}
                className="home-carousel-card flex-none w-[85vw] sm:w-64 md:w-56"
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
            className="home-carousel-nav absolute right-0 top-1/2 z-10 -mr-4 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-elevated transition-all hover:scale-110 sm:flex"
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
  const [guideSubmitting, setGuideSubmitting] = useState(false);

  // Season treks: filter from TREKS by slug
  const seasonTreks = SEASON_TREKS[season]
    .map((slug) => TREKS.find((t) => t.slug === slug))
    .filter(Boolean) as typeof TREKS;

  // Featured carousel treks (first 12)
  // Featured carousel treks (first 12)
  const _featuredTreks = TREKS.filter((t) => t.isFeatured).slice(0, 12);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (guideSubmitting) return;

    setGuideSubmitting(true);
    submitEmailOptimistic(
      () => submitPlanTrekEmail(buildLeadMagnetPayload(email)),
      () => {
        setNewsSubmitted(true);
        setNewsEmail("");
        toast.success(
          "Success! Your free guide is on the way — check your inbox.",
        );
      },
      (message) => {
        setNewsSubmitted(false);
        toast.error(message);
      },
      () => {
        setGuideSubmitting(false);
      },
    );
  };

  const homeSeo = buildHomePageSEO();

  return (
    <div className="home-page min-h-screen">
      <SEOHead
        title={homeSeo.title}
        description={homeSeo.description}
        keywords={homeSeo.keywords}
        canonical={homeSeo.canonical}
        ogImage={homeSeo.ogImage}
        schema={generateHomePageSchema()}
      />
      <h1 className="sr-only">
        Trekora — Book Himalayan Treks, Yatras &amp; Adventure Packages Online
      </h1>
      <nav className="sr-only" aria-label="Primary site sections">
        <ul>
          {PRIMARY_SITE_NAV.map((item) => (
            <li key={item.path}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      {/* ── SECTION 1: HERO BANNER GRID ── */}
      <HeroBannerGrid />

      <TrustBadgesStrip />

      <LandingFlashVoucherBanner />

      {/* ── SOCIAL PROOF TICKER (below hero) ── */}
      <SocialProofTicker />

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />

      <TravelSideActionRail variant="home" />

      <ListingStickyToolbar className="home-listing-chrome border-b border-[var(--ew-gray-mid)]">
        <HomeMobileSearchPanel />
      </ListingStickyToolbar>

      {/* ── SECTION 2: SEARCH PANEL (desktop) ── */}
      <section
        className="home-search-desktop hidden bg-white py-5 shadow-card lg:block"
        data-ocid="search.section"
      >
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
            {(
              [
                { label: "Valley of Flowers Trek", to: "/treks/$slug", slug: "valley-of-flowers" },
                { label: "Hemkund Sahib Trek", to: "/yatras/$slug", slug: "hemkund-sahib-yatra" },
                { label: "Kedarnath", to: "/treks" },
                { label: "Roopkund", to: "/treks" },
                { label: "Triund", to: "/treks" },
                { label: "Hampta Pass", to: "/treks" },
                { label: "Char Dham", to: "/yatras" },
                { label: "Spiti", to: "/treks" },
              ] as const
            ).map((item) => (
              <Link
                key={item.label}
                to={item.to}
                params={"slug" in item ? { slug: item.slug } : undefined}
                className="text-[12px] px-3 py-1 rounded-full transition-colors hover:text-white"
                style={{
                  background: "var(--ew-gray-lt)",
                  color: "var(--ew-text-lt)",
                }}
                data-ocid={`search.tag.${item.label.toLowerCase().replace(/\s+/g, "_")}`}
              >
                {item.label}
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
      <section
        className="py-6 bg-white border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
        data-ocid="homepage.featured_destinations"
        aria-label="Featured treks and yatras"
      >
        <div className="container mx-auto px-4">
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em] mb-3"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Featured Destinations
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/treks/$slug"
              params={{ slug: "valley-of-flowers" }}
              className="flex-1 rounded-xl border px-4 py-3 no-underline transition-shadow hover:shadow-md"
              style={{
                borderColor: "var(--ew-gray-mid)",
                color: "var(--ew-text)",
              }}
              data-ocid="homepage.featured.valley_of_flowers"
            >
              <span className="block text-sm font-bold">
                Valley of Flowers Trek
              </span>
              <span
                className="block text-xs mt-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                UNESCO alpine flowers · Jul–Sep batches · 6-day itinerary
              </span>
            </Link>
            <Link
              to="/yatras/$slug"
              params={{ slug: "hemkund-sahib-yatra" }}
              className="flex-1 rounded-xl border px-4 py-3 no-underline transition-shadow hover:shadow-md"
              style={{
                borderColor: "var(--ew-gray-mid)",
                color: "var(--ew-text)",
              }}
              data-ocid="homepage.featured.hemkund_sahib"
            >
              <span className="block text-sm font-bold">Hemkund Sahib Trek</span>
              <span
                className="block text-xs mt-1"
                style={{ color: "var(--ew-text-lt)" }}
              >
                World&apos;s highest gurudwara · 4,633m · Govindghat yatra
              </span>
            </Link>
          </div>
        </div>
      </section>
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
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.bali_pass_feature"
                  >
                    <OptimizedImage
                      src={BALI_PASS_PHOTO_GALLERY[0].src}
                      alt={BALI_PASS_PHOTO_GALLERY[0].alt}
                      fill
                      variant="hero"
                      className="media-frame__img object-cover"
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {BALI_PASS_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "bali-pass" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.bali_pass_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {RUPIN_PASS_TREK && RUPIN_PASS_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.rupin_pass_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Rupin Pass Trek — 4,650m pass · snow bridge & valley drama
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "rupin-pass" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.rupin_pass_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="rupin-pass"
                      image={RUPIN_PASS_PHOTO_GALLERY[0].src}
                      alt={RUPIN_PASS_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {RUPIN_PASS_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "rupin-pass" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.rupin_pass_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {VALLEY_OF_FLOWERS_TREK &&
              VALLEY_OF_FLOWERS_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.valley_of_flowers_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Valley of Flowers — UNESCO alpine meadow · 500+ wildflower
                    species
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "valley-of-flowers" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.valley_of_flowers_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="valley-of-flowers"
                      image={VALLEY_OF_FLOWERS_PHOTO_GALLERY[0].src}
                      alt={VALLEY_OF_FLOWERS_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {VALLEY_OF_FLOWERS_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "valley-of-flowers" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.valley_of_flowers_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {BRAHMATAL_TREK && BRAHMATAL_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.brahmatal_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Brahmatal Winter Trek — frozen lakes · Trishul & Nanda
                    Ghunti views
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "brahmatal-trek" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.brahmatal_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="brahmatal-trek"
                      image={BRAHMATAL_PHOTO_GALLERY[0].src}
                      alt={BRAHMATAL_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {BRAHMATAL_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "brahmatal-trek" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.brahmatal_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {KEDARKANTHA_TREK && KEDARKANTHA_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.kedarkantha_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Kedarkantha Trek — winter summit · 360° Himalayan views
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "kedarkantha-trek" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.kedarkantha_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="kedarkantha-trek"
                      image={KEDARKANTHA_PHOTO_GALLERY[0].src}
                      alt={KEDARKANTHA_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {KEDARKANTHA_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "kedarkantha-trek" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.kedarkantha_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {DAYARA_BUGYAL_TREK && DAYARA_BUGYAL_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.dayara_bugyal_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Dayara Bugyal — alpine meadows · Bandarpoonch panorama
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "dayara-bugyal" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.dayara_bugyal_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="dayara-bugyal"
                      image={DAYARA_BUGYAL_PHOTO_GALLERY[0].src}
                      alt={DAYARA_BUGYAL_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {DAYARA_BUGYAL_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "dayara-bugyal" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.dayara_bugyal_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {HAR_KI_DUN_TREK && HAR_KI_DUN_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.har_ki_dun_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Har Ki Dun — Valley of the Gods · Swargarohini views
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "har-ki-dun" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.har_ki_dun_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="har-ki-dun"
                      image={HAR_KI_DUN_PHOTO_GALLERY[0].src}
                      alt={HAR_KI_DUN_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {HAR_KI_DUN_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "har-ki-dun" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.har_ki_dun_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {CHOPTA_TUNGNATH_TREK &&
              CHOPTA_TUNGNATH_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.chopta_tungnath_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Chopta Tungnath — Panch Kedar · Chandrashila 4,090m
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "chopta-tungnath" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.chopta_tungnath_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="chopta-tungnath"
                      image={CHOPTA_TUNGNATH_PHOTO_GALLERY[0].src}
                      alt={CHOPTA_TUNGNATH_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {CHOPTA_TUNGNATH_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "chopta-tungnath" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.chopta_tungnath_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {PANGARCHULLA_TREK && PANGARCHULLA_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.pangarchulla_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Pangarchulla Peak — 4,586m summit · Nanda Devi panorama
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "pangarchulla-peak" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.pangarchulla_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="pangarchulla-peak"
                      image={PANGARCHULLA_PHOTO_GALLERY[0].src}
                      alt={PANGARCHULLA_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {PANGARCHULLA_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "pangarchulla-peak" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.pangarchulla_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {DEORIATAL_CHANDRASHILA_TREK &&
              DEORIATAL_CHANDRASHILA_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.deoriatal_chandrashila_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Deoriatal Chandrashila — lake reflections · 4,090m summit
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "deoriatal-chandrashila" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.deoriatal_chandrashila_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="deoriatal-chandrashila"
                      image={DEORIATAL_CHANDRASHILA_PHOTO_GALLERY[0].src}
                      alt={DEORIATAL_CHANDRASHILA_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {DEORIATAL_CHANDRASHILA_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "deoriatal-chandrashila" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.deoriatal_chandrashila_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {AUDENS_COL_TREK && AUDENS_COL_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.audens_col_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Auden's Col — 5,490m glacier pass · Gangotri to Kedarnath
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "audens-col" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.audens_col_feature"
                  >
                    <OptimizedImage
                      src={AUDENS_COL_PHOTO_GALLERY[0].src}
                      alt={AUDENS_COL_PHOTO_GALLERY[0].alt}
                      fill
                      variant="hero"
                      className="media-frame__img object-cover"
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {AUDENS_COL_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "audens-col" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.audens_col_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              {KEDARTAL_TREK && KEDARTAL_PHOTO_GALLERY.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-6"
                  data-ocid="uttarakhand.kedartal_strip"
                >
                  <p
                    className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    Kedartal — Shiva's lake at 4,750m · Thalay Sagar backdrop
                  </p>
                  <Link
                    to="/treks/$slug"
                    params={{ slug: "kedartal" }}
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="uttarakhand.kedartal_feature"
                  >
                    <HomeTrekFeatureMedia
                      trekSlug="kedartal"
                      image={KEDARTAL_PHOTO_GALLERY[0].src}
                      alt={KEDARTAL_PHOTO_GALLERY[0].alt}
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {KEDARTAL_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "kedartal" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`uttarakhand.kedartal_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  to="/treks"
                  className="btn-primary home-section-cta home-section-cta--primary"
                  data-ocid="uttarakhand.view_all_button"
                >
                  View All Packages
                </Link>
                <Link
                  to="/destinations"
                  className="btn-secondary home-section-cta home-section-cta--secondary"
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
                    className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                    data-ocid="himachal.beas_kund_feature"
                  >
                    <OptimizedImage
                      src={BEAS_KUND_PHOTO_GALLERY[0].src}
                      alt={BEAS_KUND_PHOTO_GALLERY[0].alt}
                      fill
                      variant="hero"
                      className="media-frame__img object-cover"
                      sizes="(max-width:768px) 100vw, 768px"
                    />
                  </Link>
                  <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                    {BEAS_KUND_PHOTO_GALLERY.map((item, idx) => (
                      <Link
                        key={`${item.src}-${idx}`}
                        to="/treks/$slug"
                        params={{ slug: "beas-kund" }}
                        className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                        data-ocid={`himachal.beas_kund_thumb.${idx + 1}`}
                      >
                        <OptimizedImage
                          src={item.src}
                          alt={item.alt}
                          fill
                          variant="gallery-thumb"
                          className="media-frame__img object-cover"
                          sizes="(max-width:640px) 50vw, 25vw"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : null}
              <div className="mt-8 space-y-8">
                {HP_TREK_GALLERIES.map((gallery) => (
                  <motion.div
                    key={gallery.slug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    data-ocid={`himachal.${gallery.ocid}_strip`}
                  >
                    <p
                      className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {gallery.title}
                    </p>
                    <Link
                      to="/treks/$slug"
                      params={{ slug: gallery.slug }}
                      className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                      data-ocid={`himachal.${gallery.ocid}_feature`}
                    >
                      <OptimizedImage
                        src={gallery.images[0].src}
                        alt={gallery.images[0].alt}
                        fill
                        variant="hero"
                        className="media-frame__img object-cover"
                        sizes="(max-width:768px) 100vw, 768px"
                      />
                    </Link>
                    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                      {gallery.images.map((item, idx) => (
                        <Link
                          key={`${item.src}-${idx}`}
                          to="/treks/$slug"
                          params={{ slug: gallery.slug }}
                          className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-black/10 transition-shadow hover:ring-black/25"
                          data-ocid={`himachal.${gallery.ocid}_thumb.${idx + 1}`}
                        >
                          <OptimizedImage
                            src={item.src}
                            alt={item.alt}
                            fill
                            variant="gallery-thumb"
                            className="media-frame__img object-cover"
                            sizes="(max-width:640px) 50vw, 25vw"
                          />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div
                className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
                data-ocid="himachal.spiti_gallery"
              >
                {SPITI_VALLEY_TREK_IMAGES.map((img) => (
                  <Link
                    key={img.src}
                    to="/treks/$slug"
                    params={{ slug: "spiti-valley-trek" }}
                    className="media-frame relative aspect-[4/3] rounded-lg overflow-hidden ring-1 ring-black/5 hover:opacity-95 transition-opacity"
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
                  className="btn-primary home-section-cta home-section-cta--primary"
                  data-ocid="himachal.view_all_button"
                >
                  View All Packages
                </Link>
                <Link
                  to="/destinations"
                  className="btn-secondary home-section-cta home-section-cta--secondary"
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
              View fixed-departure dates on our upcoming batches page.
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
          {CHAR_DHAM_PHOTO_GALLERY.length > 0 ? (
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
              <Link
                to="/yatras/$slug"
                params={{ slug: "char-dham-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.char_dham_feature"
              >
                <OptimizedImage
                  src={CHAR_DHAM_PHOTO_GALLERY[0].src}
                  alt={CHAR_DHAM_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-1">
                {CHAR_DHAM_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "char-dham-yatra" }}
                    className="media-frame relative aspect-[4/3] rounded-lg overflow-hidden ring-2 ring-white/15 hover:ring-white/45 transition-shadow"
                    data-ocid={`yatras.char_dham_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 20vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {DO_DHAM_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.do_dham_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Do Dham Yatra — Kedarnath & Badrinath · 7-day sacred circuit
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "do-dham-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.do_dham_feature"
              >
                <OptimizedImage
                  src={DO_DHAM_PHOTO_GALLERY[0].src}
                  alt={DO_DHAM_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {DO_DHAM_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "do-dham-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.do_dham_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {KEDARNATH_YATRA && KEDARNATH_YATRA_PHOTO_GALLERY.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.kedarnath_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Kedarnath Yatra — Jyotirlinga at 3,583m · Mandakini valley trek
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "kedarnath-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.kedarnath_feature"
              >
                <HomeTrekFeatureMedia
                  trekSlug="kedarnath-yatra"
                  image={KEDARNATH_YATRA_PHOTO_GALLERY[0].src}
                  alt={KEDARNATH_YATRA_PHOTO_GALLERY[0].alt}
                  sizes="(max-width:768px) 100vw, 768px"
                  variant="hero"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {KEDARNATH_YATRA_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "kedarnath-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.kedarnath_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
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
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.panch_kedar_feature"
              >
                <OptimizedImage
                  src={HOME_HERO_PANCH_KEDAR_YATRA_IMAGE}
                  alt="Panch Kedar Yatra — collage of the five sacred Shiva temples in Garhwal: Kedarnath, Kalpeshwar, Rudranath, Tungnath, and Madhyamaheshwar"
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {PANCH_KEDAR_WEBP_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "panch-kedar-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.panch_kedar_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
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
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.panch_badri_feature"
              >
                <OptimizedImage
                  src={PANCH_BADRI_YATRA_COLLAGE_WEBP}
                  alt="Panch Badri Yatra — collage of the five Vishnu shrines: Vishal (Badrinath), Yogdhyan, Bhavishya, Vridha, and Adi Badri in Uttarakhand"
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {PANCH_BADRI_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "panch-badri-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.panch_badri_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {KARTIK_SWAMI_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.kartik_swami_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Kartik Swami Temple Trek — Kartikeya shrine at 3,048m ·
                Rudraprayag
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "kartik-swami-temple" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.kartik_swami_feature"
              >
                <OptimizedImage
                  src={KARTIK_SWAMI_PHOTO_GALLERY[0].src}
                  alt={KARTIK_SWAMI_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {KARTIK_SWAMI_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "kartik-swami-temple" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.kartik_swami_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {CHURDHAR_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.churdhar_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Churdhar Yatra — Shirgul Maharaj at 3,647m · Sirmaur, Himachal
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "churdhar-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.churdhar_feature"
              >
                <OptimizedImage
                  src={CHURDHAR_PHOTO_GALLERY[0].src}
                  alt={CHURDHAR_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {CHURDHAR_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "churdhar-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.churdhar_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {TRIYUGINARAYAN_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.triyuginarayan_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Triyuginarayan Temple Yatra — Shiva & Parvati wedding · eternal
                flame
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "triyuginarayan-temple" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.triyuginarayan_feature"
              >
                <OptimizedImage
                  src={TRIYUGINARAYAN_PHOTO_GALLERY[0].src}
                  alt={TRIYUGINARAYAN_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {TRIYUGINARAYAN_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "triyuginarayan-temple" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.triyuginarayan_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {MANI_MAHESH_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.mani_mahesh_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Mani Mahesh Yatra — Shiva&apos;s lake at 4,080m · Chamba,
                Himachal
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "mani-mahesh-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.mani_mahesh_feature"
              >
                <OptimizedImage
                  src={MANI_MAHESH_PHOTO_GALLERY[0].src}
                  alt={MANI_MAHESH_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {MANI_MAHESH_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "mani-mahesh-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.mani_mahesh_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {KINNAUR_KAILASH_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.kinnaur_kailash_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Kinnaur Kailash Parikrama Yatra — 79km sacred circuit · Kinnaur,
                Himachal
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "kinnaur-kailash-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.kinnaur_kailash_feature"
              >
                <OptimizedImage
                  src={KINNAUR_KAILASH_PHOTO_GALLERY[0].src}
                  alt={KINNAUR_KAILASH_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {KINNAUR_KAILASH_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "kinnaur-kailash-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.kinnaur_kailash_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
                      sizes="(max-width:640px) 50vw, 25vw"
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
          {SHRIKHAND_MAHADEV_YATRA ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
              data-ocid="yatras.shrikhand_mahadev_strip"
            >
              <p
                className="text-center text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Shrikhand Mahadev Yatra — 75-ft natural lingam at 5,155m · Kullu
              </p>
              <Link
                to="/yatras/$slug"
                params={{ slug: "shrikhand-mahadev-yatra" }}
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.shrikhand_mahadev_feature"
              >
                <OptimizedImage
                  src={SHRIKHAND_MAHADEV_PHOTO_GALLERY[0].src}
                  alt={SHRIKHAND_MAHADEV_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {SHRIKHAND_MAHADEV_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "shrikhand-mahadev-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.shrikhand_mahadev_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
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
                className="media-frame relative mx-auto mb-3 block aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-xl ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                data-ocid="yatras.hemkund_sahib_feature"
              >
                <OptimizedImage
                  src={HEMKUND_SAHIB_PHOTO_GALLERY[0].src}
                  alt={HEMKUND_SAHIB_PHOTO_GALLERY[0].alt}
                  fill
                  variant="hero"
                  className="media-frame__img object-cover"
                  sizes="(max-width:768px) 100vw, 768px"
                />
              </Link>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-5">
                {HEMKUND_SAHIB_PHOTO_GALLERY.map((item, idx) => (
                  <Link
                    key={`${item.src}-${idx}`}
                    to="/yatras/$slug"
                    params={{ slug: "hemkund-sahib-yatra" }}
                    className="media-frame relative aspect-[4/3] overflow-hidden rounded-lg ring-2 ring-white/15 transition-shadow hover:ring-white/45"
                    data-ocid={`yatras.hemkund_sahib_thumb.${idx + 1}`}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      variant="gallery-thumb"
                      className="media-frame__img object-cover"
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
              className="offer-banner offer-banner--orange"
              data-ocid="offers.bogo_banner"
            >
              <div className="offer-banner__media-wrap" aria-hidden>
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
                  alt=""
                  width={400}
                  height={280}
                  variant="banner-strip"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="offer-banner__content">
                <span className="offer-banner__eyebrow">Limited Offer</span>
                <h3 className="offer-banner__title">
                  Buy 1 Get 1 Trek Packages
                </h3>
                <p className="offer-banner__desc">
                  Book any trek and bring a friend free — limited seats
                  available
                </p>
                <Link
                  to="/treks"
                  className="btn-white text-sm py-2 px-5 inline-flex items-center gap-1"
                  data-ocid="offers.bogo_button"
                >
                  Claim Offer
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            </div>
            <div
              className="offer-banner offer-banner--red"
              data-ocid="offers.chardham_banner"
            >
              <div className="offer-banner__media-wrap" aria-hidden>
                <OptimizedImage
                  src={CHAR_DHAM_COVER}
                  alt=""
                  width={400}
                  height={280}
                  variant="banner-strip"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="offer-banner__content">
                <span className="offer-banner__eyebrow">2026 Season Open</span>
                <h3 className="offer-banner__title">Char Dham Yatra 2026</h3>
                <p className="offer-banner__desc">
                  Sacred journey packages from ₹18,999 — seats filling fast
                </p>
                <Link
                  to="/book"
                  search={bookSearch({ yatra: "char-dham-yatra" })}
                  className="btn-white text-sm py-2 px-5 inline-flex items-center gap-1"
                  data-ocid="offers.chardham_button"
                >
                  Book Now
                  <ChevronRight size={16} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            </div>
          </div>
          {/* 3 small offer cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "TREKORA15 · 15% Off",
                desc: "Copy the landing gift voucher — valid 7 days on every trek and yatra",
                icon: "🎁",
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

      {/* ── SECTION 11: WHY CHOOSE TREKORA ── */}
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
            {WHY_CHOOSE.filter(
              (item) =>
                item.title !== "EMI & Easy Payments" ||
                (isFeatureLive("payment") && isFeatureLive("emi")),
            ).map((item, i) => (
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
            {getPublishedBlogs().slice(0, 4).map((blog, i) => (
              <Link
                key={blog.id}
                to="/blog/$slug"
                params={{ slug: blog.slug }}
                className="flex-none w-64 bg-white rounded-lg overflow-hidden shadow-card group block"
                data-ocid={`blog.card.${i + 1}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <OptimizedImage
                    src={resolveBlogCardImage(blog)}
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
                  <span className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 px-3 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] group-hover:bg-[var(--ew-red)] group-hover:text-white transition-colors">
                    Read More <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-[var(--ew-red)] text-[var(--ew-red)] hover:bg-[var(--ew-red)] hover:text-white transition-colors"
              data-ocid="blog.view_all_button"
            >
              View All Blogs <ArrowRight size={14} aria-hidden />
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
              <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg max-w-md mx-auto">
                <FormSuccessMessage
                  title="You're all set!"
                  description="Your free Trek Planning Guide (PDF) is on the way. Check your inbox in a few minutes — and your spam folder just in case."
                  className="py-4"
                  data-ocid="newsletter.success_state"
                />
                <button
                  type="button"
                  onClick={() => setNewsSubmitted(false)}
                  className="mt-2 text-sm font-semibold underline text-[var(--ew-red)]"
                  data-ocid="newsletter.success_another"
                >
                  Send to another email
                </button>
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
                  disabled={guideSubmitting}
                  className="flex-1 px-4 py-3 rounded-full text-[var(--ew-text)] text-sm focus:outline-none border-0 disabled:opacity-70"
                  style={{ background: "#fff" }}
                  data-ocid="newsletter.email.input"
                />
                <button
                  type="submit"
                  disabled={guideSubmitting}
                  className="btn-white whitespace-nowrap text-sm inline-flex items-center justify-center gap-2 min-w-[9.5rem] disabled:opacity-70"
                  style={{ color: "var(--ew-red)" }}
                  data-ocid="newsletter.submit_button"
                >
                  {guideSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Get Free Guide"
                  )}
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
            {HOME_PRESS_PARTNERS.map(({ name, url }) => {
              const logoSrc = pressLogoForName(name);
              return (
                <Link
                  key={name}
                  to={url}
                  className="flex items-center justify-center px-3 py-2 rounded border opacity-80 hover:opacity-100 transition-opacity min-h-[52px]"
                  style={{
                    borderColor: "var(--ew-gray-mid)",
                    textDecoration: "none",
                  }}
                  data-ocid={`partners.logo.${name.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  {logoSrc ? (
                    <FeaturedInMedia
                      item={{ name, logoSrc }}
                      className="h-9 w-auto max-w-[min(180px,40vw)] object-contain"
                    />
                  ) : (
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--ew-gray-dark)" }}
                    >
                      {name}
                    </span>
                  )}
                </Link>
              );
            })}
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
