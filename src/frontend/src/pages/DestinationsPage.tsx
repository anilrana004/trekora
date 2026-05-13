import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { DESTINATIONS, type Destination } from "../data/destinations";

type Filter = "All" | "Uttarakhand" | "Himachal Pradesh";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "All", label: "All Destinations" },
  { key: "Uttarakhand", label: "Uttarakhand" },
  { key: "Himachal Pradesh", label: "Himachal Pradesh" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ── Destination Card ───────────────────────────────────────────────────────────

function DestinationCard({
  dest,
  index,
}: {
  dest: Destination;
  index: number;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.035,
        y: -6,
        boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      style={{ transformOrigin: "center center" }}
      className="group bg-white rounded-xl overflow-hidden relative"
      data-ocid={`destination.card.${index + 1}`}
    >
      {/* Hover left border accent via pseudo-element substitute */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 z-10 pointer-events-none"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background: "var(--ew-red)",
          transformOrigin: "top",
        }}
      />

      {/* Image */}
      <div className="h-[200px] overflow-hidden relative">
        <motion.img
          src={dest.image}
          alt={`${dest.name} - ${dest.tagline}`}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* State badge top-right */}
        <span
          className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
          style={{ background: "var(--ew-red)", color: "#fff" }}
        >
          {dest.stateBadge}
        </span>
        {/* Trek count badge bottom-left */}
        {dest.trekCount > 0 && (
          <span
            className="absolute bottom-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "var(--ew-orange)", color: "#fff" }}
          >
            {dest.trekCount} Trek{dest.trekCount !== 1 ? "s" : ""}
          </span>
        )}
        {dest.yatraCount && (
          <span
            className="absolute bottom-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(192,0,28,0.85)", color: "#fff" }}
          >
            {dest.yatraCount} Yatra{dest.yatraCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name + state badge */}
        <div className="flex items-center justify-between gap-2">
          <h3
            className="font-bold text-[16px] leading-tight truncate"
            style={{ color: "var(--ew-text)" }}
          >
            {dest.name}
          </h3>
          <span
            className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
              background: "var(--ew-red-lt)",
              color: "var(--ew-red)",
            }}
          >
            {dest.state}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-[12px] leading-relaxed line-clamp-2"
          style={{ color: "var(--ew-text-lt)" }}
        >
          {dest.description}
        </p>

        {/* Altitude + Season */}
        <div className="flex flex-wrap gap-1.5">
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "var(--ew-gray-lt)",
              color: "var(--ew-gray-dark)",
            }}
          >
            &#9650; {dest.altitude}
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{
              background: "var(--ew-gray-lt)",
              color: "var(--ew-gray-dark)",
            }}
          >
            &#128336; {dest.bestSeason}
          </span>
        </div>

        {/* Explore button */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className="mt-1"
        >
          <Link
            to="/treks"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ew-orange)" }}
            data-ocid={`destination.explore_button.${index + 1}`}
          >
            Explore Treks
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Destinations Page ─────────────────────────────────────────────────────────

export default function DestinationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    destination: "",
    dates: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const filteredDestinations = useMemo(() => {
    if (activeFilter === "All") return DESTINATIONS;
    return DESTINATIONS.filter((d) => d.state === activeFilter);
  }, [activeFilter]);

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

      {/* ── Filter Tabs ─────────────────────────────────────────────────────── */}
      <div
        className="bg-white shadow-sm sticky top-16 z-20"
        style={{ borderBottom: "1px solid var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-1 justify-center py-3 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className="relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus-visible:outline-none"
                style={
                  activeFilter === f.key
                    ? {
                        background: "var(--ew-red)",
                        color: "#fff",
                        boxShadow: "0 2px 8px rgba(192,0,28,0.3)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--ew-text-lt)",
                      }
                }
                data-ocid={`destinations.filter.${f.key.toLowerCase().replace(" ", "-")}`}
              >
                {f.label}
                {activeFilter === f.key && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "var(--ew-red)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Destination Count Label ──────────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-8 pb-2">
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          Showing{" "}
          <strong style={{ color: "var(--ew-text)" }}>
            {filteredDestinations.length} destination
            {filteredDestinations.length !== 1 ? "s" : ""}
          </strong>
          {activeFilter !== "All" && (
            <>
              {" "}
              in{" "}
              <strong style={{ color: "var(--ew-red)" }}>{activeFilter}</strong>
            </>
          )}
        </p>
      </div>

      {/* ── Card Grid ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 pb-16 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
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
