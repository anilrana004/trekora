import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import DestinationCard from "../components/DestinationCard";
import ListingRegionFilterPills, {
  type ListingRegionTab,
} from "../components/ListingRegionFilterPills";
import ListingStickyToolbar from "../components/ListingStickyToolbar";
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

  const filteredDestinations = useMemo(() => {
    const stateLabel = TAB_STATE_LABEL[tab];
    if (!stateLabel) return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.state === stateLabel);
  }, [tab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="main-content"
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--ew-red) 0%, #7a0010 60%, #3a0008 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
          style={{ background: "var(--ew-orange)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "var(--ew-orange)" }}
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
              From spiritual river towns to wind-swept cold deserts &mdash;
              discover 24 of the most extraordinary places in the Himalayas.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-6"
          >
            {[
              { label: "Destinations", value: "24" },
              { label: "Active Treks", value: "40+" },
              { label: "Sacred Yatras", value: "11" },
              { label: "States", value: "2" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white">
                  {stat.value}
                </p>
                <p className="text-[11px] text-white/60 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        id={TRAVEL_HERO_SENTINEL_ID}
        className="h-0 w-full"
        aria-hidden
      />
      <TravelSideActionRail variant="listing-destinations" />

      {/* ── Region tabs (same shell as Treks / Yatras) ── */}
      <ListingStickyToolbar
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="listing-sticky-toolbar__regions container mx-auto px-4">
          <ListingRegionFilterPills
            kind="destinations"
            active={tab}
            onChange={setTab}
          />
        </div>
      </ListingStickyToolbar>

      {/* ── Destination grid ── */}
      <div className="py-12" style={{ backgroundColor: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <p className="text-sm mb-6" style={{ color: "var(--ew-gray-dark)" }}>
            Showing{" "}
            <strong style={{ color: "var(--ew-text)" }}>
              {filteredDestinations.length} destination
              {filteredDestinations.length !== 1 ? "s" : ""}
            </strong>
            {TAB_STATE_LABEL[tab] ? (
              <>
                {" "}
                in{" "}
                <strong style={{ color: "var(--ew-red)" }}>
                  {TAB_STATE_LABEL[tab]}
                </strong>
              </>
            ) : null}
          </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDestinations.map((dest, i) => (
              <DestinationCard key={dest.id} dest={dest} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>

      {/* ── Plan Your Trip Form ──────────────────────────────────────────────── */}
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
              style={{ color: "var(--ew-red)" }}
            >
              Start Planning
            </span>
            <h2 className="section-title mt-2 block mx-auto">
              Plan Your Destination Trip
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Tell us where you want to go &mdash; EternaWings will craft the
              perfect Himalayan itinerary.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl p-8 text-center"
              style={{
                background: "var(--ew-red-lt)",
                border: "1px solid var(--ew-red)",
              }}
              data-ocid="destinations.form.success_state"
            >
              <p className="text-4xl mb-3">&#127956;</p>
              <h3
                className="font-bold text-xl mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                Request Received!
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Our trek experts will reach out with a personalised plan within
                24 hours.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%20want%20to%20plan%20a%20Himalayan%20destination%20trip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-opacity hover:opacity-90"
                style={{ background: "#25D366" }}
                data-ocid="destinations.whatsapp_button"
              >
                &#128172; Continue on WhatsApp
              </a>
            </motion.div>
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
                <div>
                  <label
                    htmlFor="dest-destination"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Preferred Destination
                  </label>
                  <select
                    id="dest-destination"
                    value={formState.destination}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        destination: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="destinations.destination.select"
                  >
                    <option value="">Select destination</option>
                    <optgroup label="Uttarakhand">
                      {DESTINATIONS.filter(
                        (d) => d.state === "Uttarakhand",
                      ).map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Himachal Pradesh">
                      {DESTINATIONS.filter(
                        (d) => d.state === "Himachal Pradesh",
                      ).map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="dest-dates"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Travel Dates
                  </label>
                  <input
                    id="dest-dates"
                    type="date"
                    value={formState.dates}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, dates: e.target.value }))
                    }
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="destinations.dates.input"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                  data-ocid="destinations.plan.submit_button"
                >
                  Plan My Trip
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%20want%20to%20plan%20a%20Himalayan%20destination%20trip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 font-bold py-2.5 rounded-full text-center flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90"
                  style={{ background: "#25D366" }}
                  data-ocid="destinations.whatsapp_button"
                >
                  &#128172; WhatsApp Us
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
