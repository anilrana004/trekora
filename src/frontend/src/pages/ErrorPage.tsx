import { SEOHead } from "@/components/SEOHead";
import { ERROR_PAGE_SEO } from "@/lib/route-seo";
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  buildWhatsAppUrl,
} from "@/lib/site-contact";
import { AlertTriangle, MessageCircle, Phone, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function ErrorPage() {
  return (
    <main id="main-content">
      <SEOHead
        title={ERROR_PAGE_SEO.title}
        description={ERROR_PAGE_SEO.description}
        canonical={ERROR_PAGE_SEO.canonical}
        noindex={ERROR_PAGE_SEO.noindex}
      />
      <section
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "var(--ew-red-lt)" }}
          >
            <AlertTriangle size={40} style={{ color: "var(--ew-red)" }} />
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Oops! Something Went Wrong
          </h1>
          <p className="mt-3 text-base" style={{ color: "var(--ew-text-lt)" }}>
            Our team has been notified. Please try again or contact support and
            we'll get you back on the trail.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary flex items-center gap-2"
              data-ocid="error.reload_button"
            >
              <RefreshCw size={18} />
              Reload Page
            </button>
            <a
              href={buildWhatsAppUrl("Hi, I need help on Trekora")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
              data-ocid="error.whatsapp_button"
            >
              <MessageCircle size={18} />
              WhatsApp Support
            </a>
          </div>

          {/* Contact info */}
          <div
            className="mt-10 rounded-xl p-6 text-left"
            style={{
              background: "#ffffff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              className="font-semibold text-base mb-4"
              style={{ color: "var(--ew-text)" }}
            >
              Contact Trekora Support
            </h2>
            <div className="space-y-3">
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className="flex items-center gap-3 no-underline"
                style={{ color: "var(--ew-text-lt)" }}
                data-ocid="error.call_link"
              >
                <Phone size={16} style={{ color: "var(--ew-red)" }} />
                <span>
                  {SITE_PHONE_DISPLAY} (9AM–9PM Daily)
                </span>
              </a>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="flex items-center gap-3 no-underline"
                style={{ color: "var(--ew-text-lt)" }}
                data-ocid="error.email_link"
              >
                <MessageCircle
                  size={16}
                  style={{ color: "var(--ew-orange)" }}
                />
                <span>{SITE_EMAIL}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
