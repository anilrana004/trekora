import { SiteLogo } from "@/components/SiteLogo";
import { NAV_GALLERY_FEATURED } from "@/data/nav-gallery-menu";
import { NAV_HP_TREKS, NAV_UK_TREKS } from "@/data/nav-trek-menu";
import { NAV_HP_YATRAS, NAV_UK_YATRAS } from "@/data/nav-yatra-menu";
import { bookSearch } from "@/lib/book-search";
import { isFeatureLive } from "@/lib/dormant-features";
import { openQueryModalFromLayout } from "@/lib/layout-modals";
import { SITE_LOGO_URL } from "@/lib/site-brand";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site-contact";
import { syncMobileNavHidden } from "@/lib/site-header-offset";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import LanguageBanner from "./LanguageBanner";
import MobileSearchModal from "./MobileSearchModal";
import SearchDropdown from "./SearchDropdown";
import OptimizedImage from "./media/OptimizedImage";
const CHAR_DHAM_YATRA_SLUG = "char-dham-yatra";

/** Shared easing for mobile nav drawer + accordion (smooth, no bounce). */
const NAV_DRAWER_EASE = [0.32, 0.72, 0, 1] as const;
const NAV_ACCORDION_EASE = [0.4, 0, 0.2, 1] as const;

const UK_TREKS = NAV_UK_TREKS;

const HP_TREKS = NAV_HP_TREKS;

const DIFFICULTY = [
  { label: "Easy", count: "12 Treks", color: "#2E7D32" },
  { label: "Moderate", count: "16 Treks", color: "#E87722" },
  { label: "Difficult", count: "9 Treks", color: "#C0001C" },
  { label: "Extreme", count: "3 Treks", color: "#7B1FA2" },
];

const SEASONS = [
  { label: "Summer", months: "Apr–Jun", desc: "Best conditions, clear skies" },
  { label: "Monsoon", months: "Jul–Sep", desc: "Lush green, fewer crowds" },
  { label: "Winter", months: "Nov–Mar", desc: "Snow treks, magical views" },
  { label: "Year-Round", months: "All Year", desc: "Open every season" },
];

const UK_YATRAS = NAV_UK_YATRAS;
const HP_YATRAS = NAV_HP_YATRAS;

const _SEARCH_TAGS = [
  "Kedarnath",
  "Triund",
  "Roopkund",
  "Hampta Pass",
  "Char Dham",
  "Valley of Flowers",
  "Spiti",
];

const NAV_LINKS = [
  { label: "Treks", to: "/treks", key: "treks" },
  { label: "Yatras", to: "/yatras", key: "yatras" },
  { label: "Destinations", to: "/destinations", key: null },
  { label: "Packages", to: "/packages", key: null },
  { label: "Gallery", to: "/gallery", key: "gallery" },
  { label: "Blog", to: "/blog", key: null },
  { label: "More", to: "/about", key: null },
];

function TrekoraLogo() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center group"
      data-ocid="nav.logo"
    >
      <OptimizedImage
        src={SITE_LOGO_URL}
        alt="Trekora — Where Every Peak Tells a Story"
        width={200}
        height={48}
        priority
        variant="blog-card"
        sizes="(max-width: 768px) 46vw, 220px"
        className="h-10 w-auto max-w-[min(220px,48vw)] object-contain object-left md:h-11 md:max-w-[240px] transition-opacity group-hover:opacity-90 drop-shadow-sm"
      />
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileNavHidden, setMobileNavHidden] = useState(false);
  const [lang, setLang] = useState<"en" | "hi">(() => {
    return (localStorage.getItem("ew_lang") as "en" | "hi") || "en";
  });
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const hideNavBar = isMobile && mobileNavHidden;

  function toggleLang() {
    const next = lang === "en" ? "hi" : "en";
    localStorage.setItem("ew_lang", next);
    setLang(next);
    if (next === "hi") {
      // Clear dismissed state so banner shows again when switching to Hindi
      sessionStorage.removeItem("ew_hindi_banner_dismissed");
    }
  }

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        const isScrollingDown = y > lastScrollY.current;
        const scrolled = y > 10;
        if (isScrollingDown && y > 60) {
          setAnnouncementVisible((v) => (v ? false : v));
          if (isMobile) {
            setMobileNavHidden((v) => (v ? v : true));
          }
        } else if (!isScrollingDown) {
          setAnnouncementVisible((v) => (v === false ? true : v));
          if (isMobile) {
            setMobileNavHidden((v) => (v ? false : v));
          }
        }
        setScrolled((prev) => (prev === scrolled ? prev : scrolled));
        lastScrollY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    syncMobileNavHidden(isMobile && mobileNavHidden);
    return () => syncMobileNavHidden(false);
  }, [isMobile, mobileNavHidden]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Announcement Bar — hidden on mobile */}
      <AnimatePresence initial={false}>
        {announcementVisible && !isMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="announcement-bar overflow-hidden"
            data-ocid="announcement.bar"
          >
            <div className="container mx-auto px-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z" />
                </svg>
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className="text-white/95 hover:text-white transition-colors no-underline hover:underline"
                >
                  Call us: {SITE_PHONE_DISPLAY}
                </a>
                &nbsp;|&nbsp; 9AM–9PM Daily
              </span>
              <span className="hidden md:flex items-center gap-4">
                <Link
                  to="/about"
                  className="text-white/90 hover:text-white transition-colors no-underline"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-white/90 hover:text-white transition-colors no-underline"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Customer Support
                </Link>
                <Link
                  to="/blog"
                  className="text-white/90 hover:text-white transition-colors no-underline"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Blog
                </Link>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Navbar */}
      <motion.header
        animate={{
          y: hideNavBar ? "-100%" : "0%",
        }}
        transition={{
          duration: hideNavBar ? 0.26 : 0.32,
          ease: NAV_ACCORDION_EASE,
        }}
        className={`sticky top-0 z-[60] bg-white transition-shadow duration-300 will-change-transform ${scrolled ? "shadow-lg" : "shadow-sm"}`}
        style={{ height: isMobile ? 56 : 64 }}
        data-ocid="navbar"
      >
        <div
          className="container mx-auto px-4 h-full flex items-center justify-between gap-4"
          ref={menuRef}
        >
          {/* Logo */}
          <TrekoraLogo />

          {/* Mobile Center: Plan My Trek ghost button */}
          {isMobile && (
            <button
              type="button"
              onClick={() => openQueryModalFromLayout()}
              className="flex-1 mx-2 text-xs font-semibold rounded-full px-3 py-1.5 transition-colors"
              style={{
                border: "1.5px solid var(--ew-red)",
                color: "var(--ew-red)",
                background: "transparent",
                maxWidth: 140,
                touchAction: "manipulation",
              }}
              data-ocid="nav.mobile.plan_trek_ghost_button"
            >
              Plan My Trek
            </button>
          )}

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.key ? setActiveMenu(link.key) : setActiveMenu(null)
                }
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={link.to}
                  className="nav-link flex items-center gap-0.5 px-3 py-1.5 text-sm font-medium rounded-md"
                  data-ocid={`nav.${link.label.toLowerCase()}.link`}
                  aria-haspopup={link.key ? "true" : undefined}
                >
                  {link.label}
                  {link.key && <ChevronDown size={13} className="mt-0.5" />}
                </Link>

                {/* Treks Mega Menu */}
                {link.key === "treks" && (
                  <AnimatePresence>
                    {activeMenu === "treks" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[780px] p-6 rounded-b-xl"
                        style={{ borderTop: "3px solid var(--ew-red)" }}
                        data-ocid="nav.treks.dropdown"
                      >
                        <div className="grid grid-cols-4 gap-6">
                          {/* Col 1: Uttarakhand */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              Uttarakhand Treks
                            </p>
                            <ul className="space-y-1.5">
                              {UK_TREKS.map((t) => (
                                <li key={t.slug}>
                                  <Link
                                    to="/treks/$slug"
                                    params={{ slug: t.slug }}
                                    className="text-[13px] text-[var(--ew-text-lt)] hover:text-[var(--ew-red)] flex items-center gap-1 transition-colors"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span
                                      style={{
                                        color: "var(--ew-red)",
                                        fontSize: 10,
                                      }}
                                    >
                                      →
                                    </span>
                                    {t.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 2: Himachal */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              Himachal Pradesh Treks
                            </p>
                            <ul className="space-y-1.5">
                              {HP_TREKS.map((t) => (
                                <li key={t.slug}>
                                  <Link
                                    to="/treks/$slug"
                                    params={{ slug: t.slug }}
                                    className="text-[13px] text-[var(--ew-text-lt)] hover:text-[var(--ew-red)] flex items-center gap-1 transition-colors"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span
                                      style={{
                                        color: "var(--ew-red)",
                                        fontSize: 10,
                                      }}
                                    >
                                      →
                                    </span>
                                    {t.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 3: By Difficulty */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              By Difficulty
                            </p>
                            <ul className="space-y-3">
                              {DIFFICULTY.map((d) => (
                                <li key={d.label}>
                                  <Link
                                    to="/treks"
                                    className="flex items-center justify-between group"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span
                                      className="text-sm font-semibold group-hover:opacity-80 transition-opacity"
                                      style={{ color: d.color }}
                                    >
                                      {d.label}
                                    </span>
                                    <span
                                      className="text-[11px] font-semibold rounded-full px-2 py-0.5"
                                      style={{
                                        backgroundColor: "var(--ew-orange)",
                                        color: "#fff",
                                      }}
                                    >
                                      {d.count}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 4: By Season */}
                          <div>
                            <p className="mega-menu-header mb-3">By Season</p>
                            <ul className="space-y-3">
                              {SEASONS.map((s) => (
                                <li key={s.label}>
                                  <Link
                                    to="/treks"
                                    className="block group"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span className="text-sm font-semibold text-[var(--ew-text)] group-hover:text-[var(--ew-red)] transition-colors block">
                                      {s.label}
                                      <span className="text-[11px] font-normal text-[var(--ew-gray-dark)] ml-1">
                                        ({s.months})
                                      </span>
                                    </span>
                                    <span className="text-[12px] text-[var(--ew-gray-dark)]">
                                      {s.desc}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Footer row */}
                        <div className="mt-5 pt-4 border-t border-[var(--ew-gray-mid)]">
                          <Link
                            to="/treks"
                            className="font-semibold text-sm hover:underline"
                            style={{
                              color: "var(--ew-orange)",
                              textDecoration: "none",
                            }}
                          >
                            View All 40+ Treks →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Yatras Mega Menu */}
                {link.key === "yatras" && (
                  <AnimatePresence>
                    {activeMenu === "yatras" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[640px] p-6 rounded-b-xl"
                        style={{ borderTop: "3px solid var(--ew-red)" }}
                        data-ocid="nav.yatras.dropdown"
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {/* Col 1: Uttarakhand Yatras */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              Uttarakhand Yatras
                            </p>
                            <ul className="space-y-1.5">
                              {UK_YATRAS.map((y) => (
                                <li key={y.slug}>
                                  <Link
                                    to="/yatras/$slug"
                                    params={{ slug: y.slug }}
                                    className="text-[13px] text-[var(--ew-text-lt)] hover:text-[var(--ew-red)] flex items-center gap-1 transition-colors"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span
                                      style={{
                                        color: "var(--ew-red)",
                                        fontSize: 10,
                                      }}
                                    >
                                      →
                                    </span>
                                    {y.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 2: Himachal Yatras */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              Himachal Pradesh Yatras
                            </p>
                            <ul className="space-y-1.5">
                              {HP_YATRAS.map((y) => (
                                <li key={y.slug}>
                                  <Link
                                    to="/yatras/$slug"
                                    params={{ slug: y.slug }}
                                    className="text-[13px] text-[var(--ew-text-lt)] hover:text-[var(--ew-red)] flex items-center gap-1 transition-colors"
                                    style={{ textDecoration: "none" }}
                                  >
                                    <span
                                      style={{
                                        color: "var(--ew-red)",
                                        fontSize: 10,
                                      }}
                                    >
                                      →
                                    </span>
                                    {y.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Col 3: Featured Yatra promo */}
                          <div>
                            <p className="mega-menu-header mb-3">
                              Featured Yatra
                            </p>
                            <div
                              className="rounded-lg overflow-hidden border"
                              style={{ borderColor: "var(--ew-gray-mid)" }}
                            >
                              <div
                                className="h-24 flex items-end p-3"
                                style={{
                                  background:
                                    "linear-gradient(135deg, #C0001C 0%, #E87722 100%)",
                                }}
                              >
                                <span className="text-white font-bold text-sm leading-tight">
                                  Char Dham Yatra 2026
                                  <br />
                                  <span className="font-normal text-white/80 text-xs">
                                    Register Now — Limited Spots
                                  </span>
                                </span>
                              </div>
                              <div className="p-3">
                                <p className="text-[12px] text-[var(--ew-text-lt)] mb-2">
                                  Starting from{" "}
                                  <strong style={{ color: "var(--ew-orange)" }}>
                                    ₹25,000
                                  </strong>
                                </p>
                                <Link
                                  to="/book"
                                  search={bookSearch({
                                    yatra: CHAR_DHAM_YATRA_SLUG,
                                  })}
                                  className="btn-primary text-xs px-3 py-1.5 inline-flex items-center justify-center"
                                  onClick={() => setActiveMenu(null)}
                                  data-ocid="nav.yatras_mega.book_char_dham"
                                >
                                  Book Now →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-[var(--ew-gray-mid)]">
                          <Link
                            to="/yatras"
                            className="font-semibold text-sm hover:underline"
                            style={{
                              color: "var(--ew-orange)",
                              textDecoration: "none",
                            }}
                          >
                            Explore All Sacred Yatras →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Gallery dropdown — community photos by trek/yatra */}
                {link.key === "gallery" && (
                  <AnimatePresence>
                    {activeMenu === "gallery" && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="mega-menu absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[420px] p-5 rounded-b-xl"
                        style={{ borderTop: "3px solid var(--ew-red)" }}
                        data-ocid="nav.gallery.dropdown"
                      >
                        <p className="mega-menu-header mb-3">
                          Trekker-uploaded photos
                        </p>
                        <p
                          className="text-[11px] mb-3 leading-relaxed"
                          style={{ color: "var(--ew-text-lt)" }}
                        >
                          Only photos shared by travellers — tagged with trek or
                          yatra name.
                        </p>
                        <ul className="space-y-1.5 mb-4">
                          {NAV_GALLERY_FEATURED.map((g) => (
                            <li key={g.slug}>
                              <Link
                                to="/gallery"
                                search={{ trekSlug: g.slug }}
                                className="text-[13px] text-[var(--ew-text-lt)] hover:text-[var(--ew-red)] flex items-center gap-1 transition-colors"
                                style={{ textDecoration: "none" }}
                              >
                                <span
                                  style={{
                                    color: "var(--ew-red)",
                                    fontSize: 10,
                                  }}
                                >
                                  →
                                </span>
                                {g.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-3 border-t border-[var(--ew-gray-mid)] flex flex-wrap gap-3">
                          <Link
                            to="/gallery"
                            search={{ trekSlug: undefined }}
                            className="font-semibold text-sm hover:underline"
                            style={{
                              color: "var(--ew-orange)",
                              textDecoration: "none",
                            }}
                          >
                            All gallery photos →
                          </Link>
                          <Link
                            to="/treks/$slug"
                            params={{ slug: "valley-of-flowers" }}
                            className="text-sm hover:underline"
                            style={{
                              color: "var(--ew-text-lt)",
                              textDecoration: "none",
                            }}
                          >
                            Valley of Flowers trek page →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full hover:bg-[var(--ew-gray-lt)] transition-colors text-[var(--ew-text)]"
              aria-label="Search treks and blogs"
              data-ocid="nav.search_button"
            >
              <Search size={19} />
            </button>
            {isFeatureLive("login") ? (
              <button
                type="button"
                onClick={() => navigate({ to: "/dashboard" })}
                className="text-sm font-medium px-4 py-2 rounded-md text-[var(--ew-text)] hover:text-[var(--ew-red)] hover:bg-[var(--ew-red-lt)] transition-colors"
                data-ocid="nav.login_button"
              >
                Login
              </button>
            ) : null}
            <button
              type="button"
              onClick={toggleLang}
              className="text-xs font-bold px-2.5 py-1.5 rounded border transition-colors"
              style={{
                borderColor:
                  lang === "hi" ? "var(--ew-orange)" : "var(--ew-gray-mid)",
                color:
                  lang === "hi" ? "var(--ew-orange)" : "var(--ew-gray-dark)",
                background:
                  lang === "hi" ? "var(--ew-orange-lt)" : "transparent",
              }}
              aria-label={
                lang === "en" ? "Switch to Hindi" : "Switch to English"
              }
              data-ocid="nav.lang_toggle"
            >
              {lang === "en" ? "EN" : "हि"}
            </button>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline text-[var(--ew-text)]"
              data-ocid="nav.phone_link"
            >
              <Phone size={17} strokeWidth={2} aria-hidden />
              {SITE_PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => openQueryModalFromLayout()}
              className="btn-primary text-sm"
              data-ocid="nav.plan_trek_button"
            >
              Plan My Trek
            </button>
          </div>

          {/* Mobile Controls: Search + Hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileSearchOpen(true)}
              className="p-2 rounded-full"
              style={{ color: "var(--ew-text)", touchAction: "manipulation" }}
              aria-label="Search"
              data-ocid="nav.mobile.search_button"
            >
              <Search size={22} />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2"
              style={{ color: "var(--ew-text)", touchAction: "manipulation" }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              data-ocid="nav.mobile_menu_button"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-16"
            style={{ background: "rgba(26,26,46,0.96)" }}
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            data-ocid="nav.search_modal"
          >
            <div className="w-full max-w-2xl relative pt-4">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute -top-1 right-4 text-white"
                aria-label="Close search"
                data-ocid="nav.search_close_button"
              >
                <X size={26} />
              </button>
              <SearchDropdown
                initialQuery={searchQuery}
                onClose={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Search Modal */}
      <MobileSearchModal
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />

      {/* Mobile Drawer — Full-screen slide-over */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: NAV_DRAWER_EASE }}
              className="fixed inset-0 z-[94] border-0 bg-[rgba(26,26,46,0.45)]"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: NAV_DRAWER_EASE }}
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[100vw] flex-col shadow-2xl"
              style={{ background: "#fff" }}
              data-ocid="nav.mobile_drawer"
            >
              {/* Drawer header — brand orange on phone */}
              <div
                className="flex items-center justify-between px-5"
                style={{
                  background: "var(--ew-orange)",
                  height: 60,
                  flexShrink: 0,
                }}
              >
                <SiteLogo
                  className="mobile-drawer-logo min-w-0 max-w-[min(220px,58vw)]"
                  imgClassName="site-logo__img site-logo__img--drawer h-9 w-auto max-w-full object-contain object-left"
                  sizes="(max-width: 768px) 58vw, 220px"
                  onNavigate={() => setMobileOpen(false)}
                  dataOcid="nav.mobile_drawer_logo"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded-full"
                  style={{ color: "#fff", touchAction: "manipulation" }}
                  data-ocid="nav.mobile_close_button"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <div
                    key={link.label}
                    style={{ borderBottom: "1px solid var(--ew-gray-mid)" }}
                  >
                    {link.key ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === link.key ? null : link.key,
                            )
                          }
                          className="w-full flex items-center justify-between px-5 font-semibold text-base transition-colors"
                          style={{
                            height: 48,
                            color:
                              mobileExpanded === link.key
                                ? "var(--ew-red)"
                                : "var(--ew-text)",
                            touchAction: "manipulation",
                          }}
                          data-ocid={`nav.mobile.${link.label.toLowerCase()}.toggle`}
                        >
                          {link.label}
                          <ChevronDown
                            size={16}
                            style={{
                              transform:
                                mobileExpanded === link.key
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition:
                                "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              color: "var(--ew-gray-dark)",
                            }}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: NAV_ACCORDION_EASE,
                              }}
                              className="overflow-hidden"
                              style={{ background: "var(--ew-gray-lt)" }}
                            >
                              {link.key === "treks" && (
                                <div className="px-5 py-4 space-y-1">
                                  <p
                                    className="text-[11px] font-bold uppercase tracking-wider mb-2"
                                    style={{ color: "var(--ew-red)" }}
                                  >
                                    Uttarakhand
                                  </p>
                                  {UK_TREKS.slice(0, 6).map((t) => (
                                    <Link
                                      key={t.slug}
                                      to="/treks/$slug"
                                      params={{ slug: t.slug }}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 text-sm transition-colors"
                                      style={{
                                        color: "var(--ew-text-lt)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {t.name}
                                    </Link>
                                  ))}
                                  <p
                                    className="text-[11px] font-bold uppercase tracking-wider mt-3 mb-2"
                                    style={{ color: "var(--ew-red)" }}
                                  >
                                    Himachal Pradesh
                                  </p>
                                  {HP_TREKS.slice(0, 6).map((t) => (
                                    <Link
                                      key={t.slug}
                                      to="/treks/$slug"
                                      params={{ slug: t.slug }}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 text-sm transition-colors"
                                      style={{
                                        color: "var(--ew-text-lt)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {t.name}
                                    </Link>
                                  ))}
                                  <Link
                                    to="/treks"
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-sm font-semibold mt-3"
                                    style={{
                                      color: "var(--ew-orange)",
                                      textDecoration: "none",
                                    }}
                                  >
                                    View All 40+ Treks →
                                  </Link>
                                </div>
                              )}
                              {link.key === "yatras" && (
                                <div className="px-5 py-4 space-y-1">
                                  <p
                                    className="text-[11px] font-bold uppercase tracking-wider mb-2"
                                    style={{ color: "var(--ew-red)" }}
                                  >
                                    Uttarakhand
                                  </p>
                                  {UK_YATRAS.map((y) => (
                                    <Link
                                      key={y.slug}
                                      to="/yatras/$slug"
                                      params={{ slug: y.slug }}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 text-sm transition-colors"
                                      style={{
                                        color: "var(--ew-text-lt)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {y.name}
                                    </Link>
                                  ))}
                                  <p
                                    className="text-[11px] font-bold uppercase tracking-wider mt-3 mb-2"
                                    style={{ color: "var(--ew-red)" }}
                                  >
                                    Himachal Pradesh
                                  </p>
                                  {HP_YATRAS.map((y) => (
                                    <Link
                                      key={y.slug}
                                      to="/yatras/$slug"
                                      params={{ slug: y.slug }}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 text-sm transition-colors"
                                      style={{
                                        color: "var(--ew-text-lt)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {y.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                              {link.key === "gallery" && (
                                <div className="px-5 py-4 space-y-1">
                                  {NAV_GALLERY_FEATURED.map((g) => (
                                    <Link
                                      key={g.slug}
                                      to="/gallery"
                                      search={{ trekSlug: g.slug }}
                                      onClick={() => setMobileOpen(false)}
                                      className="block py-1.5 text-sm transition-colors"
                                      style={{
                                        color: "var(--ew-text-lt)",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {g.name}
                                    </Link>
                                  ))}
                                  <Link
                                    to="/gallery"
                                    search={{ trekSlug: undefined }}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-sm font-semibold mt-3"
                                    style={{
                                      color: "var(--ew-orange)",
                                      textDecoration: "none",
                                    }}
                                  >
                                    All gallery photos →
                                  </Link>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center px-5 font-semibold text-base transition-colors"
                        style={{
                          height: 48,
                          color: "var(--ew-text)",
                          textDecoration: "none",
                          touchAction: "manipulation",
                        }}
                        data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}

                {/* State pills */}
                <div className="px-5 py-4 flex gap-2 flex-wrap">
                  <Link
                    to="/treks"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      border: "1.5px solid var(--ew-red)",
                      color: "var(--ew-red)",
                      background: "var(--ew-red-lt)",
                      textDecoration: "none",
                    }}
                    data-ocid="nav.mobile.state_uk_pill"
                  >
                    Uttarakhand
                  </Link>
                  <Link
                    to="/treks"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-semibold"
                    style={{
                      border: "1.5px solid var(--ew-orange)",
                      color: "var(--ew-orange)",
                      background: "var(--ew-orange-lt)",
                      textDecoration: "none",
                    }}
                    data-ocid="nav.mobile.state_hp_pill"
                  >
                    Himachal Pradesh
                  </Link>
                </div>
              </nav>

              {/* Drawer footer — WhatsApp + Call */}
              <div
                className="flex gap-3 px-5 py-4"
                style={{
                  borderTop: "1px solid var(--ew-gray-mid)",
                  flexShrink: 0,
                }}
              >
                <a
                  href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20trekking%20with%20Trekora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{
                    background: "#25D366",
                    textDecoration: "none",
                    touchAction: "manipulation",
                  }}
                  data-ocid="nav.mobile.whatsapp_button"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{
                    background: "var(--ew-orange)",
                    textDecoration: "none",
                    touchAction: "manipulation",
                  }}
                  data-ocid="nav.mobile.call_button"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
