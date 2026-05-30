import { CTA_OUTLINE_RED } from "@/lib/cta-buttons";
import { pressLogoForName } from "@/lib/press-media-logos";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import FeaturedInMedia from "../components/FeaturedInMedia";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";

interface PressMention {
  name: string;
  logo: string;
  headline: string;
  url: string;
  date: string;
  featured: boolean;
}

const PRESS_MENTIONS: PressMention[] = [
  {
    name: "Times of India",
    logo: "TOI",
    headline: "Trekora Redefines Himalayan Trekking Experience",
    url: "https://timesofindia.com",
    date: "March 2025",
    featured: true,
  },
  {
    name: "NDTV",
    logo: "NDTV",
    headline: "Top 5 Trekking Companies Making India's Mountains Accessible",
    url: "https://ndtv.com",
    date: "February 2025",
    featured: true,
  },
  {
    name: "Outlook Traveller",
    logo: "OT",
    headline: "Hidden Gems: Uttarakhand Treks You Haven't Heard Of",
    url: "https://outlooktraveller.com",
    date: "January 2025",
    featured: true,
  },
  {
    name: "National Geographic",
    logo: "NG",
    headline: "Responsible Trekking: The Future of Himalayan Tourism",
    url: "https://nationalgeographic.com",
    date: "December 2024",
    featured: false,
  },
  {
    name: "Adventure Nation",
    logo: "AN",
    headline: "Trekora Named Top Trek Operator 2024",
    url: "https://adventurenation.com",
    date: "November 2024",
    featured: false,
  },
  {
    name: "Thrillophilia",
    logo: "T",
    headline: "Best Trekking Companies in India 2024",
    url: "https://thrillophilia.com",
    date: "October 2024",
    featured: false,
  },
  {
    name: "MakeMyTrip",
    logo: "MMT",
    headline: "Partner Spotlight: Trekora Adventure Treks",
    url: "https://makemytrip.com",
    date: "September 2024",
    featured: false,
  },
];

export default function PressPage() {
  const featured = PRESS_MENTIONS.filter((m) => m.featured);
  const rest = PRESS_MENTIONS.filter((m) => !m.featured);

  return (
    <div>
      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-press" />
      {/* Hero */}
      <section
        className="py-16 text-center"
        style={{ background: "var(--ew-red)" }}
        data-travel-image-section
        data-ocid="press.hero"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-widest mb-2">
              Media & Press
            </p>
            <h1 className="text-white font-bold text-4xl md:text-5xl mb-3">
              Trekora in the Press
            </h1>
            <p className="text-white/80 text-base max-w-xl mx-auto">
              Our journey covered by India's leading media — celebrating
              Himalayan adventures that inspire millions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured mentions */}
      <section className="py-14 bg-white" data-ocid="press.featured">
        <div className="container mx-auto px-4">
          <h2
            className="section-title mb-8"
            style={{ display: "block", paddingBottom: 12 }}
          >
            Featured Coverage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((m, i) => (
              <motion.a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group block rounded-xl p-6 transition-shadow hover:shadow-elevated"
                style={{
                  background: "var(--ew-orange-lt)",
                  border: "1px solid var(--ew-gray-mid)",
                  textDecoration: "none",
                }}
                data-ocid={`press.featured.card.${i + 1}`}
              >
                <div className="mb-4 min-h-[56px] flex items-center">
                  {pressLogoForName(m.name) ? (
                    <FeaturedInMedia
                      item={{
                        name: m.name,
                        logoSrc: pressLogoForName(m.name),
                      }}
                      className="h-10 w-auto max-w-[180px] object-contain"
                    />
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl font-black text-lg"
                      style={{
                        background: "var(--ew-orange)",
                        color: "#fff",
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {m.logo}
                    </div>
                  )}
                </div>
                <p
                  className="font-bold text-sm mb-1"
                  style={{ color: "var(--ew-orange)" }}
                >
                  {m.name}
                </p>
                <p
                  className="font-semibold text-base leading-snug mb-3"
                  style={{ color: "var(--ew-text)" }}
                >
                  {m.headline}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[12px]"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {m.date}
                  </span>
                  <span
                    className={`${CTA_OUTLINE_RED} text-xs py-2 px-4`}
                    aria-hidden
                    style={{ pointerEvents: "none" }}
                  >
                    Read Article <ArrowUpRight size={13} aria-hidden />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of mentions */}
      <section className="py-12 section-alt" data-ocid="press.all_mentions">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-8">More Coverage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map((m, i) => (
              <motion.a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-card"
                style={{
                  border: "1px solid var(--ew-gray-mid)",
                  textDecoration: "none",
                }}
                data-ocid={`press.mention.card.${i + 1}`}
              >
                <div className="min-h-[44px] flex items-center self-start">
                  {pressLogoForName(m.name) ? (
                    <FeaturedInMedia
                      item={{
                        name: m.name,
                        logoSrc: pressLogoForName(m.name)!,
                      }}
                      className="h-8 w-auto max-w-[140px] object-contain"
                    />
                  ) : (
                    <div
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg font-black text-sm"
                      style={{
                        background: "var(--ew-gray-lt)",
                        color: "var(--ew-text)",
                      }}
                    >
                      {m.logo}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className="font-bold text-[13px] mb-0.5"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {m.name}
                  </p>
                  <p
                    className="text-[12px] leading-snug line-clamp-2"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {m.headline}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {m.date}
                  </span>
                  <span
                    className={`${CTA_OUTLINE_RED} text-[11px] py-1.5 px-3`}
                    aria-hidden
                    style={{ pointerEvents: "none" }}
                  >
                    Read <ArrowUpRight size={12} aria-hidden />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
