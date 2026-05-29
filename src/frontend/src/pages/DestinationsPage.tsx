import { submitEmailOptimistic } from "@/lib/optimistic-email";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import { buildDestinationPlanPayload } from "@/lib/query-email-payloads";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import DestinationCard from "../components/DestinationCard";
import FormSuccessMessage from "../components/FormSuccessMessage";
import ListingRegionFilterPills, {
  type ListingRegionTab,
} from "../components/ListingRegionFilterPills";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
import ListingToolbarRegions from "../components/ListingToolbarRegions";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import { DESTINATIONS } from "../data/destinations";

const TAB_STATE_LABEL: Record<ListingRegionTab, string | null> = {
  all: null,
  uttarakhand: "Uttarakhand",
  himachal: "Himachal Pradesh",
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

export default function DestinationsPage() {
  const [tab, setTab] = useState<ListingRegionTab>("all");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    destination: "",
    dates: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const filteredDestinations = useMemo(() => {
    const stateLabel = TAB_STATE_LABEL[tab];
    if (!stateLabel) return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.state === stateLabel);
  }, [tab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formState.name.trim();
    const email = formState.email.trim();
    const destination = formState.destination.trim();
    const preferredDates = formState.dates.trim();

    if (!name || name.length < 2) {
      toast.error("Enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    submitEmailOptimistic(
      () =>
        submitPlanTrekEmail(
          buildDestinationPlanPayload({
            name,
            email,
            destination,
            preferredDates,
          }),
        ),
      () => {
        // Instant success UI (optimistic)
        setSubmitted(true);
        setFormState({ name: "", email: "", destination: "", dates: "" });
        toast.success("Request submitted! We’re emailing you the details now.");
      },
      (message) => {
        setSubmitted(false);
        toast.error(message);
      },
      () => {
        setSubmitting(false);
      },
    );
  };

  const waHref = buildWhatsAppUrl(
    "Hi Trekora! I submitted a destination trip plan and would like to discuss my itinerary.",
  );

  return (
    <div
      id="main-content"
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <TravelSideActionRail variant="listing-gallery" />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden"
        data-travel-image-section
        style={{
          background:
            "linear-gradient(135deg, var(--ew-orange) 0%, #c45a10 55%, #8a3a08 100%)",
        }}
      >
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: "#fff" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "#fff" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
              Uttarakhand &amp; Himachal Pradesh
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Explore Himalayan Destinations
            </h1>
            <p className="max-w-xl mx-auto text-sm text-white/75 leading-relaxed">
              From spiritual river towns to wind-swept cold deserts — discover
              extraordinary places in the Himalayas with Trekora.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { n: "24", l: "Destinations" },
              { n: "40+", l: "Treks" },
              { n: "15+", l: "Yatras" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-2xl font-bold text-white">{s.n}</p>
                <p className="text-xs text-white/70">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />

      <ListingStickyToolbar className="bg-white shadow-sm border-b border-[var(--ew-gray-mid)]">
        <ListingToolbarRegions>
          <ListingRegionFilterPills
            kind="destinations"
            active={tab}
            onChange={setTab}
          />
        </ListingToolbarRegions>
      </ListingStickyToolbar>

      <div className="container mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDestinations.map((dest, i) => (
              <DestinationCard key={dest.id} dest={dest} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-orange)" }}
            >
              Start Planning
            </span>
            <h2 className="section-title mt-2 block mx-auto">
              Plan Your Destination Trip
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Tell us where you want to go — Trekora will craft the perfect
              Himalayan itinerary and email you details.
            </p>
          </motion.div>

          {submitted ? (
            <div className="text-center">
              <FormSuccessMessage
                title="Request received!"
                description="Our trek experts will email you a personalised plan within 24 hours (Mon–Sat, 9AM–9PM)."
                className="py-6"
                data-ocid="destinations.form.success_state"
              />
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "#25D366" }}
                data-ocid="destinations.whatsapp_button"
              >
                Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 shadow-card space-y-4"
              style={{ background: "var(--ew-gray-lt)" }}
              data-ocid="destinations.plan_form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="dest-name"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Your Name *
                  </label>
                  <input
                    id="dest-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Full name"
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="destinations.name.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dest-email"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="dest-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="destinations.email.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="dest-place"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Destination of Interest
                </label>
                <input
                  id="dest-place"
                  type="text"
                  value={formState.destination}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      destination: e.target.value,
                    }))
                  }
                  placeholder="e.g. Haridwar, Manali, Spiti"
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="destinations.place.input"
                />
              </div>
              <div>
                <label
                  htmlFor="dest-dates"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Preferred Travel Dates
                </label>
                <input
                  id="dest-dates"
                  type="text"
                  value={formState.dates}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, dates: e.target.value }))
                  }
                  placeholder="e.g. June 2026"
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="destinations.dates.input"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
                disabled={submitting}
                data-ocid="destinations.submit_button"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  "Send My Trip Plan Request"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
