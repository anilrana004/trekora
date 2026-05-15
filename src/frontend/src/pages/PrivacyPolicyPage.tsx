import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-contact";
import { Link } from "@tanstack/react-router";
import { SEOHead } from "../components/SEOHead";

const LAST_UPDATED = "May 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <SEOHead
        title="Privacy Policy | Trekora"
        description="How Trekora collects, uses, and protects your personal information."
        canonical="https://www.trekora.com/privacy-policy"
      />
      <section
        className="py-12 text-white"
        style={{ background: "var(--ew-footer)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <nav className="text-xs text-white/60 mb-3">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">→</span>
            <span>Privacy Policy</span>
          </nav>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Privacy Policy
          </h1>
        </div>
      </section>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-sm mb-8" style={{ color: "var(--ew-gray-dark)" }}>
          Last Updated: {LAST_UPDATED}
        </p>
        <div
          className="space-y-8 text-sm leading-relaxed"
          style={{ color: "var(--ew-text-lt)" }}
        >
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you submit
              an enquiry form, including your name, mobile number, email
              address, and travel preferences. We do not collect payment
              information directly — all payments are processed through secure
              third-party gateways.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information solely to respond to your enquiry, confirm
              your booking, send trip-related communications, and improve our
              services. We do not sell, trade, or share your personal data with
              third parties except as required to complete your booking (e.g.,
              accommodation partners, transport providers).
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              3. Data Storage & Security
            </h2>
            <p>
              Your data is stored securely and handled in accordance with the
              Information Technology Act, 2000 and the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive
              Personal Data or Information) Rules, 2011.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              4. Cookies
            </h2>
            <p>
              This website uses minimal cookies required for the site to
              function. We do not use advertising or tracking cookies.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              5. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting us at {SITE_EMAIL}.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              6. Contact
            </h2>
            <p>
              For any privacy-related concerns: {SITE_EMAIL} |{" "}
              <a href={`tel:${SITE_PHONE_TEL}`} className="underline">
                {SITE_PHONE_DISPLAY}
              </a>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
