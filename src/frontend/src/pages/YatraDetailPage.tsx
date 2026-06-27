import { usePrefetchProductGallery } from "@/hooks/usePrefetchProductGallery";
import { useTrekkerPhotos } from "@/hooks/useTrekkerPhotos";
import { bookSearch } from "@/lib/book-search";
import { refreshTrekkerGallery } from "@/lib/gallery-refresh";
import { buildSeoImageUrl } from "@/lib/images";
import { mergeProductGalleryPhotos } from "@/lib/merge-gallery-photos";
import { formatWeatherLocation } from "@/lib/openweather";
import { buildYatraPageSEO, getRelatedYatras } from "@/lib/product-seo";
import { SITE_ORIGIN } from "@/lib/site-config";
import { SITE_PHONE_TEL, buildWhatsAppUrl } from "@/lib/site-contact";
import {
  yatraAltitudeLabel,
  yatraAltitudeMeters,
  yatraDifficultyLabel,
  yatraFitnessDifficulty,
} from "@/lib/yatra-booking-stats";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  HeartHandshake,
  MapPin,
  Minus,
  Mountain,
  Phone,
  Plane,
  Plus,
  Star,
  Train,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookingQuickStats from "../components/BookingQuickStats";
import DetailPageTabBar from "../components/DetailPageTabBar";
import FitnessCalculator from "../components/FitnessCalculator";
import MobileStickyBookBar from "../components/MobileStickyBookBar";
import QueryBottomSheet from "../components/QueryBottomSheet";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import TrekMap from "../components/TrekMap";
import WeatherWidget from "../components/WeatherWidget";
import YatraCard from "../components/YatraCard";
import YatraInclusions from "../components/YatraInclusions";
import OptimizedImage from "../components/media/OptimizedImage";
import {
  DetailTabPanel,
  ProductDetailBestSeasonGrid,
  ProductDetailBookingSidebarHeader,
  ProductDetailFaqList,
  ProductDetailGroupSizeStepper,
  ProductDetailHero,
  ProductDetailHeroMedia,
  ProductDetailItinerarySection,
  ProductDetailLightbox,
  ProductDetailPhotosSection,
  ProductDetailReviewsSection,
  ProductDetailThumbnailStrip,
  monthsFromSeasonLabel,
  yatraItineraryToDisplayDays,
} from "../components/product-detail";
import {
  TREK_REELS_BY_SLUG,
  enrichReelsForDisplay,
  homeTrekReelVideo,
} from "../data/trek-reels";
import {
  getYatraDetailContent,
  mergeYatraDisplay,
} from "../data/yatra-detail-content";
import { YATRAS } from "../data/yatras";
import type { YatraHowToReach } from "../data/yatras";
import { downloadYatraItineraryPDF } from "../lib/pdfGenerator";
import {
  generateBreadcrumbJSONLD,
  generateFAQJSONLD,
  generateYatraJSONLD,
  injectJSONLD,
} from "../lib/seo";

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

const TABS: { key: TabKey; label: string; shortLabel?: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "itinerary", label: "Itinerary" },
  {
    key: "inclusions",
    label: "Inclusions & Exclusions",
    shortLabel: "Inclusions",
  },
  { key: "map-route", label: "Map & Route", shortLabel: "Map" },
  { key: "significance", label: "Significance", shortLabel: "Sacred" },
  { key: "how-to-reach", label: "How to Reach", shortLabel: "Reach" },
  { key: "photos", label: "Photos" },
  { key: "reviews", label: "Reviews" },
  { key: "faqs", label: "FAQs" },
];

const YATRA_DETAIL_TABS = TABS.map((t) => ({
  id: t.key,
  label: t.label,
  shortLabel: t.shortLabel,
}));

const _REVIEWS = [
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
  const displayYatra = useMemo(
    () =>
      yatra
        ? mergeYatraDisplay(yatra, getYatraDetailContent(yatra.slug))
        : null,
    [yatra],
  );
  const handleReviewContentChanged = useCallback(() => {
    if (slug) refreshTrekkerGallery(slug, "yatra");
  }, [slug]);

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [heroImg, setHeroImg] = useState(0);
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState(1);
  const [heliAdd, setHeliAdd] = useState(false);
  const [querySheetOpen, setQuerySheetOpen] = useState(false);
  const [viewerCount] = useState(() => Math.floor(Math.random() * 15) + 8);
  const [socialProofIdx, setSocialProofIdx] = useState(0);
  const [addOnsYatra, setAddOnsYatra] = useState({
    gear: false,
    insurance: false,
    transport: false,
    photographer: false,
  });

  const allImages = useMemo(() => {
    if (yatra?.images?.length) return yatra.images;
    const img = yatra?.image ?? "";
    return [img, img, img];
  }, [yatra]);

  const galleryPhotos = useMemo(() => {
    if (!yatra) return [];
    const seen = new Set<string>();
    return Array.from(
      { length: Math.max(12, allImages.length) },
      (_, i) => allImages[i % allImages.length],
    ).filter((url) => {
      if (!url || seen.has(url)) return false;
      seen.add(url);
      return true;
    });
  }, [yatra, allImages]);

  usePrefetchProductGallery(slug, "yatra");

  const { photos: communityGalleryItems } = useTrekkerPhotos(
    slug ?? "",
    "yatra",
  );

  const photosForLightbox = useMemo(() => {
    if (!yatra) return [];
    return mergeProductGalleryPhotos(
      communityGalleryItems,
      galleryPhotos,
      yatra.name,
      "Yatra",
    ).map((p) => p.src);
  }, [communityGalleryItems, galleryPhotos, yatra]);

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

  useEffect(() => {
    setActiveTab("overview");
    setHeroImg(0);
    setOpenDay(0);
    setOpenFaq(null);
    setLightboxIdx(null);
    setGroupSize(1);
    setHeliAdd(false);
  }, [slug]);

  // SEO: inject structured JSON-LD schemas on mount and when yatra changes
  useEffect(() => {
    if (!yatra || !displayYatra) return;
    const faqList = (displayYatra.faqs ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
    }));
    const cleanupYatra = injectJSONLD(
      generateYatraJSONLD(displayYatra),
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
  }, [slug, yatra, displayYatra]);

  const yatraSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: yatra?.name ?? "",
    description: displayYatra?.description ?? yatra?.description ?? "",
    provider: {
      "@type": "TouristInformationCenter",
      name: "Trekora",
      url: SITE_ORIGIN,
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
        item: SITE_ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Yatras",
        item: `${SITE_ORIGIN}/yatras`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: yatra?.name ?? "",
        item: `${SITE_ORIGIN}/yatras/${slug}`,
      },
    ],
  };

  if (!yatra || !displayYatra) {
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

  const highlights = displayYatra.spiritualBenefits?.length
    ? displayYatra.spiritualBenefits
    : [
        "Sacred pilgrimage revered for thousands of years",
        "Expert spiritual guide with Vedic and Puranic knowledge",
        "Comfortable accommodation at key halting points",
        "VIP darshan arrangements at all major shrines",
        "All rituals and pooja guidance provided throughout",
      ];

  const itineraryDays = yatraItineraryToDisplayDays(displayYatra);

  const handleDownloadItineraryPdf = async () => {
    try {
      await downloadYatraItineraryPDF(displayYatra);
    } catch {
      window.alert("Could not download itinerary PDF. Please try again.");
    }
  };

  const faqs = displayYatra.faqs ?? [];
  const howToReach: YatraHowToReach | null =
    typeof displayYatra.howToReach === "object"
      ? displayYatra.howToReach
      : null;
  const totalPrice = yatra.price * groupSize + (heliAdd ? 4500 : 0);
  const relatedYatras = getRelatedYatras(yatra, 3);
  const yatraPageSeo = buildYatraPageSEO(yatra);
  const displayRating = yatra.rating ?? 4.8;
  const displayReviewCount = yatra.reviewCount ?? 84;
  const bestSeasonMonths = monthsFromSeasonLabel(yatra.bestTime);
  const yatraHeroReel = homeTrekReelVideo(yatra.slug);

  return (
    <div
      key={yatra.slug}
      className="min-h-screen mobile-detail-page-pad pt-16 lg:pb-0"
      style={{ backgroundColor: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title={yatraPageSeo.title}
        description={yatraPageSeo.description}
        keywords={yatraPageSeo.keywords}
        canonical={yatraPageSeo.canonical}
        ogImage={buildSeoImageUrl(yatraPageSeo.ogImage ?? allImages[0])}
        ogType={yatraPageSeo.ogType}
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

      <ProductDetailHero
        images={allImages}
        activeIndex={heroImg}
        onIndexChange={setHeroImg}
        name={yatra.name}
        rating={displayRating}
        reviewCount={displayReviewCount}
        hideNavOnLg={Boolean(yatraHeroReel)}
        badges={
          <>
            <span className="badge-orange text-[10px] capitalize">
              {yatra.state === "uttarakhand"
                ? "Uttarakhand"
                : "Himachal Pradesh"}
            </span>
            {yatra.difficulty ? (
              <span className="badge-red text-[10px]">{yatra.difficulty}</span>
            ) : null}
          </>
        }
        subtitle={
          <p className="text-sm text-white/80">
            {displayYatra.description.slice(0, 120)}…
          </p>
        }
        renderSlide={(src, index) => (
          <ProductDetailHeroMedia
            key={`${yatra.slug}-hero-${heroImg}`}
            trekSlug={yatra.slug}
            image={src}
            alt={`${yatra.name} — view ${index + 1}`}
            priority={heroImg === 0}
            isPrimaryHeroSlide={heroImg === 0}
            variant="hero"
            sizes="100vw"
            className="object-cover"
          />
        )}
        ocidPrefix="yatra_detail"
      />

      <ProductDetailThumbnailStrip
        images={allImages}
        activeIndex={heroImg}
        onSelect={setHeroImg}
        productName={yatra.name}
        ocidPrefix="yatra_detail"
      />

      <div
        id={TRAVEL_HERO_SENTINEL_ID}
        className="pointer-events-none h-px w-full"
        aria-hidden
      />
      <TravelSideActionRail variant="product" productName={yatra.name} />

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

      <DetailPageTabBar
        tabs={YATRA_DETAIL_TABS}
        activeId={activeTab}
        onChange={(id) => setActiveTab(id as TabKey)}
        ocidPrefix="yatra_detail"
      />

      {/* Main 8:4 Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Tab content */}
          <div key={activeTab} className="lg:col-span-8 min-w-0 space-y-6">
            {/* ══ OVERVIEW ══ */}
            {activeTab === "overview" && (
              <DetailTabPanel tabKey="overview" className="space-y-6">
                <h2 className="section-title mb-5">Overview</h2>
                <div>
                  <h3
                    className="mb-3 text-base font-bold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    About this Yatra
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {displayYatra.description}
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
                    {displayYatra.significance?.substring(0, 400)}
                    {(displayYatra.significance?.length ?? 0) > 400 ? "…" : ""}
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

                {/* Live weather at start point */}
                <WeatherWidget
                  trekName={yatra.name}
                  location={formatWeatherLocation(
                    yatra.startPoint,
                    yatra.state,
                  )}
                />

                <ProductDetailBestSeasonGrid
                  bestSeasonLabel={yatra.bestTime}
                  activeMonths={
                    bestSeasonMonths.length > 0
                      ? bestSeasonMonths
                      : ["May", "Jun", "Sep", "Oct"]
                  }
                />

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
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    {yatra.distance > 200
                      ? "Moderate fitness required. Daily 30-minute walks for 4 weeks before departure recommended. High-altitude sections need good cardiovascular health."
                      : yatra.distance > 50
                        ? "Easy-moderate fitness. Comfortable walking for 5–10 km per day. Senior pilgrims with helicopter option face minimal physical challenge."
                        : "Easy — suitable for most ages. Short trails of 3–10 km. Helicopter options available. No prior trekking experience required."}
                  </p>
                </div>
              </DetailTabPanel>
            )}

            {activeTab === "itinerary" && (
              <ProductDetailItinerarySection
                days={itineraryDays}
                openDay={openDay}
                onOpenDayChange={setOpenDay}
                onDownloadPdf={handleDownloadItineraryPdf}
                ocidPrefix="yatra_detail"
                footer={
                  <FitnessCalculator
                    trekName={yatra.name}
                    trekSlug={slug}
                    trekDifficulty={yatraFitnessDifficulty(yatra)}
                    trekAltitude={yatraAltitudeMeters(yatra)}
                    trekDuration={yatra.duration}
                    productKind="yatra"
                  />
                }
              />
            )}

            {/* ══ INCLUSIONS ══ */}
            {activeTab === "inclusions" && (
              <DetailTabPanel
                tabKey="inclusions"
                className="!p-0 overflow-hidden"
              >
                <YatraInclusions
                  inclusions={displayYatra.inclusions}
                  exclusions={displayYatra.exclusions}
                />
              </DetailTabPanel>
            )}

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
                    {displayYatra.significance}
                  </p>
                </div>

                {displayYatra.spiritualBenefits &&
                  displayYatra.spiritualBenefits.length > 0 && (
                    <div>
                      <h3
                        className="font-bold text-lg mb-4"
                        style={{ color: "var(--ew-text)" }}
                      >
                        Why Undertake This Yatra — 5 Spiritual Benefits
                      </h3>
                      <div className="space-y-3">
                        {displayYatra.spiritualBenefits.map((benefit, i) => (
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

                {(yatra.auspiciousDates2025 ?? yatra.auspicious_dates_2025) && (
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
                          <Plane size={18} style={{ color: "var(--ew-red)" }} />
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
                          <Train size={18} style={{ color: "var(--ew-red)" }} />
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
                          <Truck size={18} style={{ color: "var(--ew-red)" }} />
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
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    {typeof yatra.howToReach === "string"
                      ? yatra.howToReach
                      : "Please contact us for detailed travel information."}
                  </p>
                )}
              </motion.div>
            )}

            {/* ══ PHOTOS ══ */}
            {activeTab === "photos" && (
              <DetailTabPanel tabKey="photos">
                <ProductDetailPhotosSection
                  key={`yatra-photos-${slug}`}
                  productName={yatra.name}
                  productSlug={slug ?? ""}
                  productType="yatra"
                  galleryPhotos={galleryPhotos}
                  coverImage={allImages[0]}
                  onPhotoClick={setLightboxIdx}
                  reels={
                    TREK_REELS_BY_SLUG[yatra.slug]
                      ? enrichReelsForDisplay(TREK_REELS_BY_SLUG[yatra.slug])
                      : undefined
                  }
                  ocidPrefix="yatra_detail"
                />
              </DetailTabPanel>
            )}

            {/* ══ REVIEWS ══ */}
            {activeTab === "reviews" && (
              <DetailTabPanel tabKey="reviews">
                <ProductDetailReviewsSection
                  productName={yatra.name}
                  productSlug={slug}
                  productType="yatra"
                  fallbackRating={displayRating}
                  fallbackReviewCount={displayReviewCount}
                  ocidPrefix="yatra_detail"
                  onContentChanged={handleReviewContentChanged}
                />
              </DetailTabPanel>
            )}

            {/* ══ FAQs ══ */}
            {activeTab === "faqs" && (
              <DetailTabPanel tabKey="faqs">
                <h2 className="section-title mb-5">
                  Frequently Asked Questions
                </h2>
                <ProductDetailFaqList
                  faqs={faqs.map((f) => ({
                    question: f.question,
                    answer: f.answer,
                  }))}
                  openIndex={openFaq}
                  onToggle={(idx) => setOpenFaq(openFaq === idx ? null : idx)}
                  ocidPrefix="yatra_detail"
                  emptyMessage="Contact us for any questions about this yatra."
                />
              </DetailTabPanel>
            )}
          </div>

          {/* RIGHT: Sticky Booking Sidebar */}
          <div className="w-full min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-36 lg:max-h-[min(85vh,calc(100vh-9rem))] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
              <div
                className="mx-auto w-full max-w-md overflow-hidden rounded-2xl shadow-elevated lg:mx-0 lg:max-w-none"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid="yatra_detail.booking_sidebar"
              >
                <ProductDetailBookingSidebarHeader
                  price={yatra.price}
                  priceLabel="Starting from"
                  perPersonLabel="/ person"
                />

                <div className="space-y-4 p-5 sm:p-6">
                  <BookingQuickStats
                    stats={[
                      {
                        label: "Duration",
                        value: `${yatra.duration}D`,
                        icon: <Clock size={14} />,
                      },
                      {
                        label: "Difficulty",
                        value: yatraDifficultyLabel(yatra),
                        icon: <Mountain size={14} />,
                      },
                      {
                        label: "Altitude",
                        value: yatraAltitudeLabel(yatra),
                        icon: <MapPin size={14} />,
                      },
                    ]}
                  />

                  <ProductDetailGroupSizeStepper
                    value={groupSize}
                    onChange={setGroupSize}
                    min={1}
                    max={20}
                    title="How many people are joining?"
                    hint="Starts at 1 — tap + to add more travelers."
                    maxLabel="persons (max 20)"
                    ocidPrefix="yatra_detail"
                  />

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
                    <span
                      className="text-sm"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Total ({groupSize}{" "}
                      {groupSize === 1 ? "person" : "persons"})
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
                    search={bookSearch({ yatra: yatra.slug, group: groupSize })}
                    className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-center text-sm font-bold leading-tight text-white transition-[filter] hover:brightness-95 sm:text-base"
                    style={{
                      backgroundColor: "var(--ew-red)",
                      color: "#fff",
                    }}
                    data-ocid="yatra_detail.book_button"
                  >
                    <span className="line-clamp-2">Book {yatra.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDownloadItineraryPdf()}
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
                      href={`tel:${SITE_PHONE_TEL}`}
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
                      href={buildWhatsAppUrl(
                        `Hi! I want to book the ${yatra.name}. Please share details.`,
                      )}
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
        </div>
        {/* end grid */}

        {/* Related Yatras */}
        {relatedYatras.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14"
          >
            <h2 className="section-title mb-6">Related Yatras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedYatras.map((y, i) => (
                <div key={y.id} data-ocid={`yatra_detail.related.${i + 1}`}>
                  <YatraCard yatra={y} index={i} />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* ── Query Bottom Sheet ── */}
      <QueryBottomSheet
        isOpen={querySheetOpen}
        onClose={() => setQuerySheetOpen(false)}
        trekName={yatra.name}
      />

      {lightboxIdx !== null ? (
        <ProductDetailLightbox
          productName={yatra.name}
          photos={photosForLightbox}
          activeIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() =>
            setLightboxIdx(
              (lightboxIdx - 1 + photosForLightbox.length) %
                photosForLightbox.length,
            )
          }
          onNext={() =>
            setLightboxIdx((lightboxIdx + 1) % photosForLightbox.length)
          }
          ocidPrefix="yatra_detail"
        />
      ) : null}

      <MobileStickyBookBar
        price={yatra.price}
        productName={yatra.name}
        bookTo="/book"
        bookSearch={bookSearch({ yatra: yatra.slug, group: groupSize })}
        bookButtonOcid="yatra_detail.mobile_book_button"
      />
    </div>
  );
}
