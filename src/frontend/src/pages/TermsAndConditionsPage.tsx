import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
} from "@/lib/site-contact";
import { Link } from "@tanstack/react-router";
import { SEOHead } from "../components/SEOHead";

const LAST_UPDATED = "May 13, 2026";

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-white min-h-[70vh]">
      <SEOHead
        title="Terms & Conditions | Trekora"
        description="Bookings, cancellations, liability, and governing law for Trekora treks and yatras."
        canonical="https://www.trekora.in/terms-and-conditions"
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
            <span>Terms & Conditions</span>
          </nav>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Terms & Conditions
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
              1. Bookings & Payments
            </h2>
            <p>
              A non-refundable booking deposit of 25% of the trek fee is
              required to confirm your slot. The remaining balance is due 7 days
              before the trek departure date.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              2. Cancellation Policy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Cancelled 30+ days before departure: 75% refund of total amount
                paid
              </li>
              <li>Cancelled 15–29 days before departure: 50% refund</li>
              <li>Cancelled 7–14 days before departure: 25% refund</li>
              <li>Cancelled less than 7 days before departure: No refund</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              3. Trek Modifications
            </h2>
            <p>
              Trekora reserves the right to modify or cancel a trek due to
              adverse weather, government restrictions, natural events, or
              safety concerns. In such cases, a full refund or alternative date
              will be offered.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              4. Health & Fitness
            </h2>
            <p>
              Participants must truthfully disclose any pre-existing medical
              conditions at the time of booking. High-altitude trekking involves
              physical exertion and inherent risks. Trekora is not liable for
              health complications arising from undisclosed conditions.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              5. Liability Disclaimer
            </h2>
            <p>
              Trekking and yatra activities involve inherent risks including but
              not limited to altitude sickness, difficult terrain, and variable
              weather. Participants undertake these activities at their own
              risk. Trekora carries group insurance but recommends individual
              travel insurance for all participants.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              6. Code of Conduct
            </h2>
            <p>
              All participants are expected to respect local culture, fellow
              trekkers, guides, and the natural environment. Trekora reserves
              the right to remove any participant from a trek for misconduct
              without refund.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              7. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of India. Any disputes shall
              be subject to the exclusive jurisdiction of courts in Dehradun,
              Uttarakhand.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold mb-2 text-[var(--ew-text)]">
              8. Contact
            </h2>
            <p>
              {SITE_EMAIL} |{" "}
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
