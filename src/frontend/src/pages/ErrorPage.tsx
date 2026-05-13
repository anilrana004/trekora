import { AlertTriangle, MessageCircle, Phone, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function ErrorPage() {
  return (
    <main id="main-content">
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
              href="https://wa.me/911800000000?text=Hi%2C%20I%20need%20help%20on%20EternaWings"
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
              Contact EternaWings Support
            </h2>
            <div className="space-y-3">
              <a
                href="tel:+911800000000"
                className="flex items-center gap-3 no-underline"
                style={{ color: "var(--ew-text-lt)" }}
                data-ocid="error.call_link"
              >
                <Phone size={16} style={{ color: "var(--ew-red)" }} />
                <span>Toll Free: 1800-000-0000 (9AM–9PM Daily)</span>
              </a>
              <a
                href="mailto:hello@eternawings.com"
                className="flex items-center gap-3 no-underline"
                style={{ color: "var(--ew-text-lt)" }}
                data-ocid="error.email_link"
              >
                <MessageCircle
                  size={16}
                  style={{ color: "var(--ew-orange)" }}
                />
                <span>hello@eternawings.com</span>
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
