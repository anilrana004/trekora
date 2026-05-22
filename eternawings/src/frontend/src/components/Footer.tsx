import { SITE_LOGO_URL } from "@/lib/site-brand";
import {
  SITE_ADDRESS_LINE,
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_PHONE_WA_DIGITS,
} from "@/lib/site-contact";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import OptimizedImage from "./media/OptimizedImage";

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
  { name: "Panch Kedar", slug: "panch-kedar" },
  { name: "Mani Mahesh Yatra", slug: "mani-mahesh-yatra" },
  { name: "Kinnaur Kailash", slug: "kinnaur-kailash" },
  { name: "Hemkund Sahib", slug: "hemkund-sahib" },
  { name: "Shrikhand Mahadev", slug: "shrikhand-mahadev" },
  { name: "Adi Kailash", slug: "adi-kailash" },
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
];

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", to: "/privacy-policy" },
  { name: "Terms & Conditions", to: "/terms-and-conditions" },
  { name: "Refund Policy", to: "/contact" },
  { name: "Cookie Policy", to: "/contact" },
  { name: "Sitemap", to: "/" },
];

const ACCORDION_SECTIONS = [
  {
    key: "quick-links",
    title: "Quick Links",
    content: "quick-links",
  },
  {
    key: "popular-treks",
    title: "Popular Treks",
    content: "popular-treks",
  },
  {
    key: "popular-yatras",
    title: "Popular Yatras",
    content: "popular-yatras",
  },
  {
    key: "contact",
    title: "Contact Us",
    content: "contact",
  },
] as const;

type AccordionKey = (typeof ACCORDION_SECTIONS)[number]["key"];

export default function Footer() {
  const year = new Date().getFullYear();
  const isMobile = useIsMobile();
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(null);

  function toggleAccordion(key: AccordionKey) {
    setOpenAccordion((prev) => (prev === key ? null : key));
  }

  return (
    <footer className="footer" data-ocid="footer">
      <div className="container mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="mb-3 inline-block max-w-[220px]"
              data-ocid="footer.logo"
            >
              <OptimizedImage
                src={SITE_LOGO_URL}
                alt="Trekora — Where Every Peak Tells a Story"
                width={200}
                height={48}
                variant="blog-card"
                sizes="200px"
                className="h-10 w-auto max-w-full object-contain object-left opacity-95 transition-opacity hover:opacity-100"
              />
            </Link>

            {/* Star rating */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="flex">
                {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                  <svg
                    key={id}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="var(--ew-gold)"
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </span>
              <span className="text-white/70 text-xs">
                4.8/5 based on 2,400 reviews
              </span>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--ew-orange)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.1)";
                  }}
                >
                  <Icon size={14} color="#fff" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: 4 columns | Mobile: accordions */}
          {ACCORDION_SECTIONS.map((section) => (
            <div key={section.key} className="lg:block">
              {/* Mobile accordion header */}
              {isMobile ? (
                <button
                  type="button"
                  onClick={() => toggleAccordion(section.key)}
                  className="w-full flex items-center justify-between py-3"
                  style={{
                    borderBottom:
                      openAccordion === section.key
                        ? "none"
                        : "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    touchAction: "manipulation",
                  }}
                  data-ocid={`footer.${section.key}.toggle`}
                >
                  <span
                    className="text-sm font-bold uppercase tracking-wider"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {section.title}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: "var(--ew-orange)",
                      transform:
                        openAccordion === section.key
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.22s",
                    }}
                  />
                </button>
              ) : (
                <h4 className="footer-heading">{section.title}</h4>
              )}

              {/* Content — always visible on desktop, accordion on mobile */}
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
                      <ul className="pb-2">
                        {QUICK_LINKS.map((link) => (
                          <li key={link.name}>
                            <Link
                              to={link.to}
                              resetScroll
                              className="footer-link"
                              style={{ textDecoration: "none" }}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.key === "popular-treks" && (
                      <ul className="pb-2">
                        {POPULAR_TREKS.map((trek) => (
                          <li key={trek.slug}>
                            <Link
                              to="/treks/$slug"
                              params={{ slug: trek.slug }}
                              resetScroll
                              className="footer-link"
                              style={{ textDecoration: "none" }}
                            >
                              {trek.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.key === "popular-yatras" && (
                      <ul className="pb-2">
                        {POPULAR_YATRAS.map((yatra) => (
                          <li key={yatra.slug}>
                            <Link
                              to="/yatras/$slug"
                              params={{ slug: yatra.slug }}
                              resetScroll
                              className="footer-link"
                              style={{ textDecoration: "none" }}
                            >
                              {yatra.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.key === "contact" && (
                      <ul className="space-y-3 text-sm pb-2">
                        <li
                          className="flex gap-2"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                          <MapPin
                            size={15}
                            style={{
                              color: "var(--ew-orange)",
                              flexShrink: 0,
                              marginTop: 2,
                            }}
                          />
                          <span>{SITE_ADDRESS_LINE}</span>
                        </li>
                        <li>
                          <a
                            href={`tel:${SITE_PHONE_TEL}`}
                            className="flex gap-2 transition-colors"
                            style={{
                              color: "rgba(255,255,255,0.65)",
                              textDecoration: "none",
                            }}
                          >
                            <Phone
                              size={15}
                              style={{
                                color: "var(--ew-orange)",
                                flexShrink: 0,
                              }}
                            />
                            {SITE_PHONE_DISPLAY}
                          </a>
                        </li>
                        <li>
                          <a
                            href={`https://wa.me/${SITE_PHONE_WA_DIGITS}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-2 transition-colors"
                            style={{
                              color: "rgba(255,255,255,0.65)",
                              textDecoration: "none",
                            }}
                          >
                            <svg
                              width="15"
                              height="15"
                              fill="#25D366"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              style={{ flexShrink: 0 }}
                            >
                              <title>WhatsApp</title>
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            {SITE_PHONE_DISPLAY}
                          </a>
                        </li>
                        <li>
                          <a
                            href={`mailto:${SITE_EMAIL}`}
                            className="flex gap-2 transition-colors"
                            style={{
                              color: "rgba(255,255,255,0.65)",
                              textDecoration: "none",
                            }}
                          >
                            <Mail
                              size={15}
                              style={{
                                color: "var(--ew-orange)",
                                flexShrink: 0,
                              }}
                            />
                            {SITE_EMAIL}
                          </a>
                        </li>
                        <li
                          style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 12,
                          }}
                        >
                          Mon–Sat 9AM–9PM IST
                        </li>
                        {/* Mobile: large tap-to-call + tap-to-WhatsApp buttons */}
                        {isMobile ? (
                          <li className="space-y-2 pt-2">
                            <a
                              href={`tel:${SITE_PHONE_TEL}`}
                              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white"
                              style={{
                                background: "var(--ew-orange)",
                                textDecoration: "none",
                                touchAction: "manipulation",
                              }}
                              data-ocid="footer.call_button"
                            >
                              <Phone size={16} /> Call Now: {SITE_PHONE_DISPLAY}
                            </a>
                            <a
                              href={`https://wa.me/${SITE_PHONE_WA_DIGITS}?text=${encodeURIComponent("Hi Trekora, I'd like to plan a trek")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white"
                              style={{
                                background: "#25D366",
                                textDecoration: "none",
                                touchAction: "manipulation",
                              }}
                              data-ocid="footer.whatsapp_button"
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <title>WA</title>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                              WhatsApp Chat
                            </a>
                          </li>
                        ) : (
                          <li className="flex gap-2 pt-2">
                            <a
                              href={`https://wa.me/${SITE_PHONE_WA_DIGITS}?text=${encodeURIComponent("Hi Trekora, I'd like to plan a trek")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white transition-colors"
                              style={{
                                background: "#25D366",
                                textDecoration: "none",
                              }}
                              data-ocid="footer.whatsapp_button"
                            >
                              <svg
                                width="13"
                                height="13"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <title>WA</title>
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                              WhatsApp Chat
                            </a>
                            <a
                              href={`tel:${SITE_PHONE_TEL}`}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-white transition-colors"
                              style={{
                                background: "var(--ew-orange)",
                                textDecoration: "none",
                              }}
                              data-ocid="footer.call_button"
                            >
                              <Phone size={12} />
                              Call Now
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Mobile social icons: 2-row grid */}
          {isMobile && (
            <div className="lg:hidden col-span-full">
              <div className="grid grid-cols-5 gap-2 mt-2" style={{}}>
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      touchAction: "manipulation",
                    }}
                  >
                    <Icon size={18} color="#fff" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {year} Trekora. All Rights Reserved. &nbsp;|&nbsp; GST:
            05AAACE0000A1Z5
          </p>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.name}
                to={l.to}
                className="text-xs transition-colors"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                }}
                data-ocid={`footer.${l.name.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {["Razorpay", "UPI", "Visa", "MC", "RuPay"].map((p) => (
              <span
                key={p}
                className="text-[10px] font-semibold px-2 py-1 rounded"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
