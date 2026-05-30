import { CTA_OUTLINE_RED, CTA_OUTLINE_WHITE } from "@/lib/cta-buttons";
import type { ImageDeliveryOptions } from "@/lib/images/cloudinary-url";
import {
  CERTIFICATION_LOGOS,
  FEATURED_PRESS_MEDIA,
} from "@/lib/press-media-logos";
import { ABOUT_STORY_WATERMARK_URL } from "@/lib/site-brand";
import { SITE_ORIGIN } from "@/lib/site-config";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import FeaturedInMedia from "../components/FeaturedInMedia";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "CEO & Lead Guide",
    years: 15,
    bio: "Summited 50+ Himalayan peaks. Former GMVN guide. IMF certified mountaineer.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Priya Negi",
    role: "Operations Head",
    years: 12,
    bio: "Logistics expert ensuring every trek runs smoothly. Kedarnath specialist.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Vikram Singh",
    role: "Senior Trek Leader",
    years: 10,
    bio: "Roopkund veteran with 20+ crossings. First aid certified & AMS specialist.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    name: "Anjali Rawat",
    role: "Customer Experience",
    years: 8,
    bio: "Ensures every trekker gets personalized attention before, during and after the trek.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    name: "Deepak Bisht",
    role: "High Altitude Guide",
    years: 14,
    bio: "Pin Parvati & Auden's Col expert. Trained in wilderness medicine and rescue.",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
  },
  {
    name: "Sunita Devi",
    role: "Camp Manager",
    years: 9,
    bio: "Legendary for hot meals at 4000m. Manages all campsite operations with precision.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

const TIMELINE = [
  {
    year: "2009",
    title: "Founded in Rishikesh",
    desc: "Trekora started with a single Kedarnath trek with 6 friends, driven by a passion for the mountains.",
  },
  {
    year: "2012",
    title: "First 100 Trekkers",
    desc: "Word spread through the mountains. We crossed 100 happy trekkers and expanded our Uttarakhand routes.",
  },
  {
    year: "2016",
    title: "500 Treks Completed",
    desc: "Himachal Pradesh treks added. Certified all guides under IMF and wilderness first-aid programs.",
  },
  {
    year: "2020",
    title: "Online Booking Launch",
    desc: "Launched our digital platform, making it easier than ever to book Himalayan adventures from anywhere.",
  },
  {
    year: "2024",
    title: "10,000+ Trekkers",
    desc: "A major milestone — 10,000 trekkers have explored the Himalayas with Trekora safely and joyfully.",
  },
  {
    year: "2025",
    title: "Trekora Relaunch",
    desc: "Rebranded as Trekora — Where Every Peak Tells a Story. New routes, new experiences, same trusted team.",
  },
];

const CERTS = [
  {
    name: "NCISM Certified",
    desc: "National Council of Instruction & Scientific Management",
    imageSrc: CERTIFICATION_LOGOS["NCISM Certified"],
  },
  {
    name: "IMF Approved",
    desc: "Indian Mountaineering Foundation authorised operator",
    imageSrc: CERTIFICATION_LOGOS["IMF Approved"],
  },
  {
    name: "Wilderness First Aid",
    desc: "IMA wilderness & high-altitude emergency certified",
    imageSrc: CERTIFICATION_LOGOS["Wilderness First Aid"],
  },
  {
    name: "Eco-Tourism",
    desc: "Ministry of Tourism eco-responsible travel certified",
    imageSrc: CERTIFICATION_LOGOS["Eco-Tourism"],
  },
];

const VALUES = [
  {
    color: "var(--ew-red)",
    bg: "var(--ew-red-lt)",
    title: "Safety First",
    desc: "Every route is risk-assessed. Our guides carry oxygen, defibrillators, and satellite phones.",
    imageSrc:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1779187847/bmvejdpd7mcz5bmr6fxh.jpg",
  },
  {
    color: "var(--ew-green)",
    bg: "#e8f5e9",
    title: "Eco-Responsible",
    desc: "Zero plastic policy on all treks. We partner with local communities and offset our carbon footprint.",
    imageSrc:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1779188004/ag7ytxa8ljuaxifhvehb.jpg",
    imageDelivery: {
      crop: "c_limit",
      effects:
        "e_background_removal,e_make_transparent:40:FFFFFF,e_make_transparent:40:C0C0C0,e_trim",
      format: "f_png",
      quality: "q_92",
    },
  },
  {
    color: "var(--ew-orange)",
    bg: "var(--ew-orange-lt)",
    title: "Community Uplift",
    desc: "30% of our guides are from local Himalayan villages. We support mountain schools and sanitation.",
    imageSrc:
      "https://res.cloudinary.com/ddbcauxef/image/upload/v1779188101/jn5m3b6yt4pz3ynmihru.webp",
  },
];

const MEDIA = FEATURED_PRESS_MEDIA;

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      <SEOHead
        title="About Trekora | Himalayan Trekking & Yatra Experts"
        description="Learn about Trekora — founded in 2009, 10,000+ trekkers, IMF-certified guides, and responsible Himalayan adventures across Uttarakhand and Himachal."
        keywords="about Trekora, Himalayan trekking company, certified trek guides India"
        canonical={`${SITE_ORIGIN}/about`}
      />

      {/* Hero — Our Story watermark background */}
      <section
        className="about-hero relative flex min-h-[24rem] items-center justify-center overflow-hidden md:min-h-[28rem]"
        data-travel-image-section
        data-ocid="about.hero"
      >
        <OptimizedImage
          src={ABOUT_STORY_WATERMARK_URL}
          alt=""
          fill
          variant="hero"
          priority
          sizes="100vw"
          delivery={{
            crop: "c_fill,g_center",
            format: "f_png",
            quality: "q_100",
          }}
          className="about-hero__watermark pointer-events-none select-none"
          aria-hidden
        />
        <div
          className="about-hero__veil pointer-events-none absolute inset-0"
          aria-hidden
        />
        <div className="relative z-10 w-full px-4 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-2xl"
          >
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "var(--ew-red)",
                background: "var(--ew-red-lt)",
                border: "1px solid rgba(192,0,28,0.12)",
              }}
            >
              Our Story
            </span>
            <h1 className="about-hero__title mt-2 mb-3 text-4xl font-bold md:text-5xl">
              About Trekora
            </h1>
            <p className="about-hero__lead mx-auto mb-6 max-w-2xl text-base md:text-lg">
              Founded in 2009 with a single Kedarnath trek, we now lead 150+
              expeditions per year across the Himalayas.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/treks"
                className={CTA_OUTLINE_RED}
                data-ocid="about.hero.explore_button"
              >
                Explore Treks <ChevronRight size={14} aria-hidden />
              </Link>
              <Link
                to="/contact"
                className={CTA_OUTLINE_RED}
                data-ocid="about.hero.contact_button"
              >
                Talk to Us <ChevronRight size={14} aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-about" />

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Our Mission
            </span>
            <h2
              className="text-3xl font-bold mt-2 mb-4"
              style={{ color: "var(--ew-text)" }}
            >
              "We believe every peak has a story worth telling"
            </h2>
            <div
              className="w-16 h-1 mx-auto mb-6 rounded-full"
              style={{ background: "var(--ew-red)" }}
            />
            <p
              className="leading-relaxed mb-4"
              style={{ color: "var(--ew-text-lt)" }}
            >
              Trekora was born from a simple belief: every person deserves to
              experience the raw, soul-stirring beauty of the Himalayas. What
              started as a weekend trek with 6 friends in 2009 has grown into
              India's most trusted mountain adventure company.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--ew-text-lt)" }}
            >
              We are a team of certified guides, passionate trekkers, and
              hospitality professionals united by one goal — to create
              unforgettable, safe, and transformative mountain experiences. We
              practise responsible tourism, leaving no trace and supporting
              local Himalayan communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto block">Our Journey</h2>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ background: "var(--ew-red)" }}
            />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pl-16 relative"
                >
                  <div
                    className="absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10"
                    style={{
                      background: "var(--ew-red)",
                      border: "3px solid white",
                    }}
                  />
                  <div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-bold text-base mt-0.5"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              The People
            </span>
            <h2 className="section-title mt-2 mx-auto block">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card text-center hover:shadow-elevated transition-all"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid={`team.card.${i + 1}`}
              >
                <div className="pt-6 pb-2 flex justify-center">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    variant="avatar"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover"
                    style={{ border: "3px solid var(--ew-red)" }}
                  />
                </div>
                <div className="p-5 pt-3">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: "var(--ew-red)" }}
                  >
                    {member.role}
                  </p>
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 mb-3"
                    style={{
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)",
                    }}
                  >
                    {member.years} yrs experience
                  </span>
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto block">Our Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white text-center p-5 rounded-2xl shadow-card border border-[var(--ew-gray-mid)] transition-all hover:-translate-y-1 ${
                  i === 2
                    ? "col-span-2 max-w-[11.5rem] justify-self-center md:col-span-1 md:max-w-none"
                    : ""
                }`}
              >
                <div className="mb-3 flex items-center justify-center leading-none">
                  <OptimizedImage
                    src={v.imageSrc}
                    alt={v.title}
                    width={120}
                    height={64}
                    variant={
                      "imageDelivery" in v &&
                      v.imageDelivery?.format === "f_png"
                        ? "brand-logo"
                        : "blog-card"
                    }
                    delivery={
                      ("imageDelivery" in v && v.imageDelivery) ||
                      ({
                        crop: "e_trim",
                        quality: "q_90",
                      } satisfies ImageDeliveryOptions)
                    }
                    className="block h-14 w-auto max-h-14 max-w-[5.5rem] object-contain"
                  />
                </div>
                <p
                  className="font-bold text-sm"
                  style={{ color: "var(--ew-text)" }}
                >
                  {v.title}
                </p>
                <p
                  className="text-xs mt-1 leading-snug"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mx-auto block">
              Certifications &amp; Recognition
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-5 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: "var(--ew-gray-lt)",
                  border: "1px solid var(--ew-gray-mid)",
                }}
              >
                <div className="relative h-16 w-full mb-3 flex items-center justify-center">
                  <OptimizedImage
                    src={cert.imageSrc}
                    alt={cert.name}
                    width={120}
                    height={64}
                    variant="blog-card"
                    className="h-14 w-auto max-w-full object-contain mx-auto"
                  />
                </div>
                <p
                  className="font-bold text-sm"
                  style={{ color: "var(--ew-text)" }}
                >
                  {cert.name}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* As Seen In */}
          <div className="text-center">
            <h3
              className="font-bold text-lg mb-6"
              style={{ color: "var(--ew-text)" }}
            >
              As Featured In
            </h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {MEDIA.map((m) => (
                <FeaturedInMedia
                  key={m.name}
                  item={m}
                  className="h-10 w-auto max-w-[160px] object-contain opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white text-center"
        style={{ background: "var(--ew-footer)" }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Himalayan Journey?
          </h2>
          <p className="mb-8 opacity-75">
            Join 10,000+ trekkers who have discovered the Himalayas with
            Trekora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treks"
              className={CTA_OUTLINE_WHITE}
              data-ocid="about.explore_button"
            >
              Explore Treks <ChevronRight size={14} aria-hidden />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 px-6 rounded-full border-2 border-[var(--ew-orange)] text-[var(--ew-orange)] bg-white hover:bg-[var(--ew-orange)] hover:text-white transition-colors"
              data-ocid="about.contact_button"
            >
              Talk to Us <ChevronRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
