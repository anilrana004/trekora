import {
  SITE_ADDRESS_LINE,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  WHATSAPP_CHAT_URL,
} from "@/lib/site-contact";
import {
  SITE_PROPRIETARY_NOTICE,
  getSiteCopyrightLine,
  getSiteCopyrightYear,
} from "@/lib/site-legal";
import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgePercent,
  CalendarX,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Cookie,
  Facebook,
  HeartHandshake,
  Instagram,
  Linkedin,
  Mail,
  Map as MapIcon,
  MapPin,
  Phone,
  RotateCcw,
  Scale,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { Fragment, useCallback, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { SiteLogo } from "./SiteLogo";

const FOOTER_TAGLINE =
  "Trekora is your trusted travel partner for unforgettable Himalayan treks, spiritual yatras, and adventure experiences.";

const FOOTER_BRAND_STORY = {
  eyebrow: "Explore More · Live Beyond",
  headline:
    "Where every peak tells a story — and every traveler returns changed.",
  body: "From sacred yatra paths to high Himalayan passes, Trekora guides world travelers who seek more than a summit: perspective, humility, and the quiet courage that only wild places can give.",
  thought:
    "The mountains do not rush you. They wait — until you are ready to listen.",
} as const;

const POPULAR_TREKS = [
  { name: "Roopkund Trek", slug: "roopkund-trek" },
  { name: "Valley of Flowers", slug: "valley-of-flowers" },
  { name: "Kedarnath Trek", slug: "kedarnath-trek" },
  { name: "Brahmatal Trek", slug: "brahmatal-trek" },
  { name: "Hampta Pass", slug: "hampta-pass" },
  { name: "Triund Trek", slug: "triund-trek" },
  { name: "Chandratal Lake", slug: "chandratal-lake" },
  { name: "Kedarkantha Trek", slug: "kedarkantha-trek" },
  { name: "Har Ki Dun", slug: "har-ki-dun" },
  { name: "Sar Pass", slug: "sar-pass" },
];

const POPULAR_YATRAS = [
  { name: "Char Dham Yatra", slug: "char-dham-yatra" },
  { name: "Panch Kedar", slug: "panch-kedar-yatra" },
  { name: "Mani Mahesh Yatra", slug: "mani-mahesh-yatra" },
  { name: "Kinnaur Kailash", slug: "kinnaur-kailash" },
  { name: "Hemkund Sahib", slug: "hemkund-sahib-yatra" },
  { name: "Shrikhand Mahadev", slug: "shrikhand-mahadev" },
  { name: "Adi Kailash & Om Parvat", slug: "adi-kailash-om-parvat" },
];

const QUICK_LINKS = [
  { name: "About Us", to: "/about" },
  { name: "Our Team", to: "/about" },
  { name: "Careers", to: "/about" },
  { name: "Responsible Travel", to: "/about" },
  { name: "Corporate Treks", to: "/corporate" },
  { name: "School Programs", to: "/corporate" },
  { name: "Blog", to: "/blog" },
  { name: "Contact Us", to: "/contact" },
  { name: "Partner With Us", to: "/contact" },
  { name: "Sitemap", to: "/" },
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
] as const;

const TRUST_ITEMS: {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
}[] = [
  {
    Icon: Shield,
    title: "Trusted by Thousands",
    subtitle: "2,400+ Happy Travelers",
  },
  {
    Icon: BadgePercent,
    title: "Best Price Guaranteed",
    subtitle: "No Hidden Charges",
  },
  {
    Icon: Award,
    title: "Expert Guides & Support",
    subtitle: "Experienced & Certified",
  },
  {
    Icon: HeartHandshake,
    title: "Responsible Tourism",
    subtitle: "Travel with Impact",
  },
];

const LEGAL_STRIP: {
  name: string;
  to: string;
  Icon: LucideIcon;
}[] = [
  { name: "Privacy Policy", to: "/privacy-policy", Icon: Shield },
  { name: "Terms & Conditions", to: "/terms-and-conditions", Icon: Scale },
  { name: "Refund Policy", to: "/contact", Icon: RotateCcw },
  {
    name: "Cancellation Policy",
    to: "/terms-and-conditions",
    Icon: CalendarX,
  },
  { name: "Cookie Policy", to: "/privacy-policy", Icon: Cookie },
  { name: "Sitemap", to: "/", Icon: MapIcon },
];

const ACCORDION_SECTIONS = [
  { key: "quick-links", title: "Quick Links", content: "quick-links" as const },
  {
    key: "popular-treks",
    title: "Popular Treks",
    content: "popular-treks" as const,
  },
  {
    key: "popular-yatras",
    title: "Popular Yatras",
    content: "popular-yatras" as const,
  },
  { key: "contact", title: "Contact Us", content: "contact" as const },
] as const;

type AccordionKey = (typeof ACCORDION_SECTIONS)[number]["key"];

function openPlanMyTrekModal() {
  window.dispatchEvent(new CustomEvent("open-query-modal"));
}

function openFindMyTrekQuiz() {
  window.dispatchEvent(new CustomEvent("open-trek-quiz"));
}

function FooterHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #0a0203 0%, #1a0608 28%, #2a0a0c 52%, #1c0506 78%, #100303 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 88% 22%, rgba(255,70,50,0.18), transparent 52%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% 100%, rgba(192,0,28,0.2), transparent 58%)",
        }}
      />
    </div>
  );
}

function FooterMountainRidge() {
  return (
    <svg
      className="footer-ridge-svg relative z-[1] -mt-px block w-full"
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      aria-hidden
    >
      <title>Mountain ridge divider</title>
      <path
        fill="var(--footer-ridge-fill, #100303)"
        d="M0,72 L0,38 L45,28 L88,40 L132,22 L176,36 L220,18 L268,34 L312,20 L358,38 L402,24 L448,40 L492,26 L538,42 L582,28 L628,44 L672,30 L718,46 L762,32 L808,48 L852,34 L898,50 L942,36 L988,52 L1032,38 L1078,54 L1122,40 L1168,56 L1212,42 L1258,58 L1302,44 L1348,60 L1392,46 L1440,52 L1440,72 Z"
      />
    </svg>
  );
}

function FooterNavLink({
  to,
  children,
  params,
  dataOcid,
}: {
  to: string;
  children: ReactNode;
  params?: Record<string, string>;
  dataOcid?: string;
}) {
  const inner = (
    <>
      <ChevronRight
        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/80"
        aria-hidden
      />
      <span className="leading-snug">{children}</span>
    </>
  );
  const className =
    "group flex items-start gap-1.5 py-1.5 text-[0.875rem] transition-colors";
  const style = {
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none" as const,
  };

  if (params) {
    return (
      <li>
        <Link
          to={to as "/treks/$slug" | "/yatras/$slug"}
          params={params as never}
          resetScroll
          className={className}
          style={style}
          data-ocid={dataOcid}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.78)";
          }}
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={to}
        resetScroll
        className={className}
        style={style}
        data-ocid={dataOcid}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color =
            "rgba(255,255,255,0.78)";
        }}
      >
        {inner}
      </Link>
    </li>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function ContactColumnBody({
  isMobile,
  denseCtas,
  hideFindMyTrek,
}: {
  isMobile: boolean;
  denseCtas?: boolean;
  hideFindMyTrek?: boolean;
}) {
  const outlineBtn =
    "inline-flex flex-1 min-w-0 items-center justify-center gap-2 rounded-full border border-white/35 bg-transparent px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5";
  const iconRow = "flex gap-2";

  return (
    <ul className="space-y-3 pb-2 text-sm">
      <li className="flex gap-2" style={{ color: "rgba(255,255,255,0.72)" }}>
        <MapPin size={16} className="mt-0.5 shrink-0 text-white/75" />
        <span>{SITE_ADDRESS_LINE}</span>
      </li>
      <li>
        <a
          href={`tel:${SITE_PHONE_TEL}`}
          className="flex gap-2 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none" }}
        >
          <Phone size={16} className="shrink-0 text-white/75" />
          <span>{SITE_PHONE_DISPLAY}</span>
        </a>
      </li>
      <li>
        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none" }}
        >
          <span className="mt-0.5 shrink-0 text-[#25D366]">
            <WhatsAppGlyph />
          </span>
          <span>{SITE_PHONE_DISPLAY}</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="flex gap-2 transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.72)", textDecoration: "none" }}
        >
          <Mail size={16} className="shrink-0 text-white/75" />
          {SITE_EMAIL}
        </a>
      </li>
      <li
        className="flex gap-2"
        style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}
      >
        <Clock size={16} className="mt-0.5 shrink-0 text-white/75" />
        Mon–Sat 9AM–9PM IST
      </li>

      {isMobile ? (
        <li className="space-y-2.5 pt-1">
          <div className={iconRow}>
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineBtn} text-[#b8f5cf] border-[#2a8f4a]/80 hover:bg-[#25D366]/10`}
              data-ocid="footer.whatsapp_button"
            >
              <WhatsAppGlyph />
              WhatsApp Chat
            </a>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className={outlineBtn}
              data-ocid="footer.call_button"
            >
              <Phone size={15} />
              Call Now
            </a>
          </div>
          {!hideFindMyTrek ? (
            <button
              type="button"
              onClick={openFindMyTrekQuiz}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white shadow-lg transition-[filter] hover:brightness-110"
              style={{ backgroundColor: "var(--ew-red)" }}
              data-ocid="footer.find_my_trek"
            >
              <Compass size={17} strokeWidth={2.2} />
              Find My Trek
            </button>
          ) : null}
          <button
            type="button"
            onClick={openPlanMyTrekModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-[var(--ew-red)]/90 bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:border-[var(--ew-red)] hover:bg-[var(--ew-red)]/10"
            data-ocid="footer.plan_my_trek"
          >
            <MapIcon size={17} strokeWidth={2.2} />
            Plan My Trek
          </button>
        </li>
      ) : (
        <li className="space-y-2.5 pt-1">
          <div
            className={
              denseCtas ? "flex flex-col gap-2" : `${iconRow} flex-wrap`
            }
          >
            <a
              href={WHATSAPP_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${outlineBtn} ${denseCtas ? "w-full" : ""} text-[#c8ffe0] border-[#2f9b52]/75 hover:bg-[#25D366]/10`}
              data-ocid="footer.whatsapp_button"
            >
              <WhatsAppGlyph />
              WhatsApp Chat
            </a>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className={`${outlineBtn} ${denseCtas ? "w-full" : ""}`}
              data-ocid="footer.call_button"
            >
              <Phone size={15} />
              Call Now
            </a>
          </div>
          {!hideFindMyTrek ? (
            <button
              type="button"
              onClick={openFindMyTrekQuiz}
              className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold text-white shadow-md transition-[filter] hover:brightness-110"
              style={{ backgroundColor: "var(--ew-red)" }}
              data-ocid="footer.find_my_trek"
            >
              <Compass size={17} strokeWidth={2.2} />
              Find My Trek
            </button>
          ) : null}
          <button
            type="button"
            onClick={openPlanMyTrekModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-[var(--ew-red)]/90 bg-transparent py-2.5 text-sm font-semibold text-white transition-colors hover:border-[var(--ew-red)] hover:bg-[var(--ew-red)]/10"
            data-ocid="footer.plan_my_trek"
          >
            <MapIcon size={17} strokeWidth={2.2} />
            Plan My Trek
          </button>
        </li>
      )}
    </ul>
  );
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h4
      className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.14em]"
      style={{ color: "rgba(255,255,255,0.92)" }}
    >
      {children}
    </h4>
  );
}

export default function Footer() {
  const year = getSiteCopyrightYear();
  const isMobile = useIsMobile();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onBlog = pathname === "/blog" || pathname.startsWith("/blog/");
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(null);

  const toggleAccordion = useCallback((key: AccordionKey) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  }, []);

  return (
    <footer
      className="footer footer--immersive relative text-white"
      data-ocid="footer"
      style={
        {
          "--footer-ridge-fill": "#100303",
          background: "transparent",
        } as CSSProperties
      }
    >
      {/* ── Hero: reference artwork + brand ── */}
      <div
        className="relative min-h-[260px] overflow-hidden pb-0 md:min-h-[300px]"
        style={{
          clipPath:
            "polygon(0 18px, 6% 5px, 14% 20px, 22% 4px, 32% 17px, 42% 2px, 52% 16px, 62% 6px, 72% 19px, 82% 3px, 92% 14px, 100% 8px, 100% 100%, 0 100%)",
        }}
      >
        <FooterHeroBackdrop />
        <div className="container relative z-[2] mx-auto max-w-6xl px-4 pb-10 pt-12 md:pb-12 md:pt-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex max-w-xl flex-col gap-4">
              <SiteLogo
                className="max-w-[270px]"
                imgClassName="site-logo__img site-logo__img--footer drop-shadow-md"
                sizes="270px"
                dataOcid="footer.logo"
              />
              <p
                className="text-[0.9375rem] leading-relaxed md:text-base"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {FOOTER_TAGLINE}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex">
                  {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                    <svg
                      key={id}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      className="mr-0.5"
                      fill="#ffffff"
                      aria-hidden
                    >
                      <title>Star rating</title>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </span>
                <span className="text-sm text-white/70">
                  4.8/5 based on 2,400 reviews
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/5 transition-colors hover:border-white/55 hover:bg-white/12"
                  >
                    <Icon size={16} color="#fff" />
                  </a>
                ))}
              </div>
            </div>

            <div
              className="flex max-w-lg flex-col gap-4 lg:max-w-md lg:flex-1 lg:border-l lg:border-white/10 lg:pl-10 xl:max-w-xl"
              data-ocid="footer.brand_story"
            >
              <div className="flex items-center gap-2">
                <Compass
                  size={14}
                  className="shrink-0"
                  style={{ color: "var(--ew-orange)" }}
                  aria-hidden
                />
                <p
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: "var(--ew-orange)" }}
                >
                  {FOOTER_BRAND_STORY.eyebrow}
                </p>
              </div>
              <blockquote className="m-0 border-none p-0">
                <p className="text-xl font-bold leading-snug tracking-tight text-white md:text-[1.375rem] md:leading-snug">
                  {FOOTER_BRAND_STORY.headline}
                </p>
              </blockquote>
              <p
                className="text-[0.9375rem] leading-relaxed md:text-base"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {FOOTER_BRAND_STORY.body}
              </p>
              <p
                className="border-t border-white/10 pt-4 text-sm italic leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                &ldquo;{FOOTER_BRAND_STORY.thought}&rdquo;
                <span className="mt-2 block not-italic text-xs font-medium uppercase tracking-wider text-white/40">
                  — A thought carried by travelers across the Himalayas
                </span>
              </p>
            </div>
          </div>
        </div>
        <FooterMountainRidge />
      </div>

      {/* ── Main links slab ── */}
      <div
        className="footer-main-panel relative z-[2] -mt-1"
        style={{
          background:
            "linear-gradient(180deg, #100303 0%, #0a0202 42%, #060101 100%)",
        }}
      >
        <div className="container mx-auto max-w-6xl px-4 pb-12 pt-2 md:pb-14">
          {/* Desktop grid */}
          <div className="hidden gap-10 lg:grid lg:grid-cols-12">
            <div className="col-span-3">
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul>
                {QUICK_LINKS.map((link) => (
                  <FooterNavLink
                    key={link.name}
                    to={link.to}
                    dataOcid={`footer.quick.${link.name.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {link.name}
                  </FooterNavLink>
                ))}
              </ul>
            </div>
            <div className="col-span-3">
              <ColumnHeading>Popular Treks</ColumnHeading>
              <ul>
                {POPULAR_TREKS.map((trek) => (
                  <FooterNavLink
                    key={trek.slug}
                    to="/treks/$slug"
                    params={{ slug: trek.slug }}
                    dataOcid={`footer.trek.${trek.slug}`}
                  >
                    {trek.name}
                  </FooterNavLink>
                ))}
              </ul>
            </div>
            <div className="col-span-3">
              <ColumnHeading>Popular Yatras</ColumnHeading>
              <ul>
                {POPULAR_YATRAS.map((yatra) => (
                  <FooterNavLink
                    key={yatra.slug}
                    to="/yatras/$slug"
                    params={{ slug: yatra.slug }}
                    dataOcid={`footer.yatra.${yatra.slug}`}
                  >
                    {yatra.name}
                  </FooterNavLink>
                ))}
              </ul>
            </div>
            <div className="col-span-3">
              <ColumnHeading>Contact Us</ColumnHeading>
              <ContactColumnBody
                isMobile={false}
                denseCtas
                hideFindMyTrek={onBlog}
              />
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="lg:hidden">
            {ACCORDION_SECTIONS.map((section) => (
              <div key={section.key}>
                <button
                  type="button"
                  onClick={() => toggleAccordion(section.key)}
                  className="flex w-full touch-manipulation items-center justify-between border-b border-white/10 py-3.5 text-left"
                  style={{
                    borderBottomColor:
                      openAccordion === section.key
                        ? "transparent"
                        : "rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`footer.${section.key}.toggle`}
                >
                  <span className="text-[0.8rem] font-bold uppercase tracking-[0.12em] text-white/90">
                    {section.title}
                  </span>
                  <ChevronDown
                    size={17}
                    style={{
                      color: "var(--ew-red)",
                      transform:
                        openAccordion === section.key
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.22s ease",
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {(!isMobile || openAccordion === section.key) && (
                    <motion.div
                      initial={isMobile ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                      style={{
                        borderBottom:
                          isMobile && openAccordion === section.key
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "none",
                      }}
                    >
                      {section.key === "quick-links" && (
                        <ul className="pb-3 pt-1">
                          {QUICK_LINKS.map((link) => (
                            <FooterNavLink key={link.name} to={link.to}>
                              {link.name}
                            </FooterNavLink>
                          ))}
                        </ul>
                      )}
                      {section.key === "popular-treks" && (
                        <ul className="pb-3 pt-1">
                          {POPULAR_TREKS.map((trek) => (
                            <FooterNavLink
                              key={trek.slug}
                              to="/treks/$slug"
                              params={{ slug: trek.slug }}
                            >
                              {trek.name}
                            </FooterNavLink>
                          ))}
                        </ul>
                      )}
                      {section.key === "popular-yatras" && (
                        <ul className="pb-3 pt-1">
                          {POPULAR_YATRAS.map((yatra) => (
                            <FooterNavLink
                              key={yatra.slug}
                              to="/yatras/$slug"
                              params={{ slug: yatra.slug }}
                            >
                              {yatra.name}
                            </FooterNavLink>
                          ))}
                        </ul>
                      )}
                      {section.key === "contact" && (
                        <div className="pb-4 pt-1">
                          <ContactColumnBody isMobile hideFindMyTrek={onBlog} />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trust bar ── */}
        <div
          className="border-t border-white/[0.08]"
          style={{
            background:
              "linear-gradient(90deg, #2a0808 0%, #1a0404 35%, #120303 100%)",
          }}
        >
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="grid grid-cols-1 divide-y divide-white/[0.08] border-y border-white/[0.08] md:divide-x md:divide-y-0 lg:grid-cols-4">
              {TRUST_ITEMS.map(({ Icon, title, subtitle }) => (
                <div key={title} className="flex gap-4 px-4 py-5 md:px-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/90">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-white">
                      <span className="font-semibold">{title}</span>
                      <span className="text-white/35"> | </span>
                      <span className="text-white/70">{subtitle}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div
        className="footer-bottomStrip border-t border-white/[0.07]"
        style={{ background: "#040101" }}
      >
        <div className="container mx-auto max-w-6xl px-4 py-5">
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-6">
            <p
              className="order-2 text-center text-xs leading-relaxed lg:order-1 lg:text-left"
              style={{ color: "rgba(255,255,255,0.48)" }}
            >
              {getSiteCopyrightLine(year)}
              <span className="mt-1 block text-[10px] text-white/35">
                {SITE_PROPRIETARY_NOTICE}
              </span>
            </p>

            <nav
              className="order-1 flex w-full max-w-4xl flex-wrap items-center justify-center gap-y-2 lg:order-2"
              aria-label="Legal"
            >
              {LEGAL_STRIP.map(({ name, to, Icon }, index) => (
                <Fragment key={name}>
                  {index > 0 ? (
                    <span
                      className="mx-2 select-none text-white/35"
                      aria-hidden
                    >
                      |
                    </span>
                  ) : null}
                  <Link
                    to={to}
                    className="inline-flex items-center gap-1.5 text-[11px] transition-colors hover:text-white"
                    style={{
                      color: "rgba(255,255,255,0.48)",
                      textDecoration: "none",
                    }}
                    data-ocid={`footer.legal.${name.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    <Icon size={13} className="shrink-0 opacity-80" />
                    {name}
                  </Link>
                </Fragment>
              ))}
            </nav>

            <a
              href="https://omnistack.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="order-3 text-xs font-medium transition-colors hover:text-white"
              style={{
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
              data-ocid="footer.built_with_omnistack"
            >
              Built with omnistack.co.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
