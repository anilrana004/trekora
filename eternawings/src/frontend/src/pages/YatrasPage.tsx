import { Link } from "@tanstack/react-router";
import { AlertCircle, ChevronRight, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import OptimizedImage from "../components/media/OptimizedImage";
import { SEOHead } from "../components/SEOHead";
import { HIMACHAL_YATRAS, UTTARAKHAND_YATRAS, YATRAS } from "../data/yatras";

const SIGNIFICANCE_LABELS: Record<string, string> = {
  "char-dham-yatra": "Moksha Pilgrimage",
  "panch-kedar-yatra": "Shiva Circuit",
  "panch-badri-yatra": "Vishnu Circuit",
  "hemkund-sahib-yatra": "Sikh Pilgrimage",
  "adi-kailash-om-parvat": "Indian Kailash",
  "kartik-swami-temple": "Kartikeya Shrine",
  "triyuginarayan-temple": "Divine Wedding Site",
  "mani-mahesh-yatra": "Shiva's Throne",
  "kinnaur-kailash-yatra": "Sacred Parikrama",
  "shrikhand-mahadev-yatra": "Shiva Lingam",
  "churdhar-yatra": "Shirgul Maharaj",
};

export default function YatrasPage() {
  const [tab, setTab] = useState<"all" | "uttarakhand" | "himachal">("all");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    yatra: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const list =
    tab === "uttarakhand"
      ? UTTARAKHAND_YATRAS
      : tab === "himachal"
        ? HIMACHAL_YATRAS
        : YATRAS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 min-h-screen">
      <SEOHead
        title="Himalayan Yatras 2025 — Sacred Pilgrimage Packages | Trekora"
        description="Book Char Dham, Panch Kedar, Panch Badri, Mani Mahesh and other sacred Himalayan yatras. Expert spiritual guides, all-inclusive packages with Trekora."
        keywords="Char Dham yatra, Panch Kedar, Himalayan pilgrimage, sacred yatra India, Trekora yatra"
        canonical="https://www.trekora.com/yatras"
      />
      {/* ── Hero Banner ── */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--ew-red)" }}
      >
        {/* Mountain SVG silhouette */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z"
            fill="white"
          />
          <path
            d="M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
        {/* Decorative mandala */}
        <svg
          className="absolute right-8 top-4 opacity-10 pointer-events-none hidden md:block"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="10"
              x2="100"
              y2="190"
              stroke="white"
              strokeWidth="0.8"
              style={{
                transformOrigin: "100px 100px",
                transform: `rotate(${deg}deg)`,
              }}
            />
          ))}
          <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
        </svg>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Sacred Journeys
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              Sacred Himalayan Yatras
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-6">
              Journey Beyond the Ordinary
            </p>
            <p className="text-white/70 text-sm max-w-xl mx-auto">
              Embark on timeless pilgrimages across Uttarakhand and Himachal
              Pradesh — from the sacred Char Dham circuit to the mystical
              heights of Kinnaur Kailash.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── State Filter Tabs ── */}
      <div
        className="bg-white shadow-sm py-3 sticky top-16 z-20 border-b"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="container mx-auto px-4 flex items-center gap-3 justify-center flex-wrap">
          {(["all", "uttarakhand", "himachal"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                tab === t
                  ? "text-white border-transparent"
                  : "bg-transparent border-current hover:opacity-80"
              }`}
              style={
                tab === t
                  ? {
                      backgroundColor: "var(--ew-red)",
                      borderColor: "var(--ew-red)",
                    }
                  : { color: "var(--ew-gray-dark)" }
              }
              data-ocid={`yatras.filter.${t}`}
            >
              {t === "all"
                ? "All Yatras"
                : t === "uttarakhand"
                  ? "Uttarakhand"
                  : "Himachal Pradesh"}
            </button>
          ))}
        </div>
      </div>

      {/* ── Urgency Note ── */}
      <div className="py-2" style={{ backgroundColor: "var(--ew-red-lt)" }}>
        <div
          className="container mx-auto px-4 flex items-center justify-center gap-2 text-sm font-medium"
          style={{ color: "var(--ew-red)" }}
        >
          <AlertCircle size={15} />
          Register early — spots fill fast for the 2025 yatra season
        </div>
      </div>

      {/* ── Yatra Grid ── */}
      <div className="py-12" style={{ backgroundColor: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {list.map((yatra, i) => (
              <motion.div
                key={yatra.id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card"
                data-ocid={`yatra.card.${i + 1}`}
              >
                <div className="relative h-52 overflow-hidden trek-card-img">
                  <OptimizedImage
                    src={yatra.image}
                    alt={yatra.name}
                    fill
                    variant="yatra-card"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  {/* Significance badge */}
                  <span
                    className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                    style={{ backgroundColor: "var(--ew-red)" }}
                  >
                    {SIGNIFICANCE_LABELS[yatra.slug] ??
                      (yatra.state === "uttarakhand"
                        ? "Uttarakhand"
                        : "Himachal Pradesh")}
                  </span>
                  <span
                    className="absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--ew-red-lt)",
                      color: "var(--ew-red)",
                    }}
                  >
                    {yatra.state === "uttarakhand"
                      ? "Uttarakhand"
                      : "Himachal Pradesh"}
                  </span>
                </div>

                <div className="p-5">
                  <h3
                    className="font-bold text-lg mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {yatra.name}
                  </h3>
                  <p
                    className="text-sm line-clamp-2 mb-3"
                    style={{ color: "var(--ew-text-lt)" }}
                  >
                    {yatra.significance}
                  </p>
                  <div
                    className="flex items-center gap-4 text-xs mb-3"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {yatra.duration} Days
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {yatra.startPoint}
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-between pt-3 border-t"
                    style={{ borderColor: "var(--ew-gray-mid)" }}
                  >
                    <div>
                      <span
                        className="text-xs"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        Starting from
                      </span>
                      <div
                        className="font-bold text-lg"
                        style={{ color: "var(--ew-orange)" }}
                      >
                        ₹{yatra.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <Link
                      to="/yatras/$slug"
                      params={{ slug: yatra.slug }}
                      className="btn-secondary text-sm"
                      data-ocid={`yatra.view_button.${i + 1}`}
                    >
                      View Yatra <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What is a Yatra? ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title mb-6">What is a Himalayan Yatra?</h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--ew-text-lt)" }}
            >
              A yatra is a sacred pilgrimage undertaken to seek the blessings of
              divine deities enshrined in remote Himalayan peaks and valleys.
              Unlike recreational trekking, a yatra is a deeply spiritual
              journey — a rite of passage for millions of Hindus and Sikhs. The
              routes traverse ancient trade paths, dense forests, glacial
              meadows, and high mountain passes, leading pilgrims to temples,
              shrines, and sacred lakes that have been revered for thousands of
              years. Trekora guides you through these transformative
              journeys with expert support, ensuring your safety and comfort
              while preserving the sanctity of each sacred destination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Inquiry Form ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--ew-gray-lt)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--ew-orange)" }}
            >
              Plan Your Pilgrimage
            </span>
            <h2
              className="text-3xl font-bold mt-2"
              style={{ color: "var(--ew-text)" }}
            >
              Send an Inquiry
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Our yatra specialists will help you plan the perfect sacred
              journey.
            </p>
          </motion.div>

          {submitted ? (
            <div
              className="bg-white rounded-2xl p-8 text-center shadow-card"
              data-ocid="yatras.form.success_state"
            >
              <p className="text-3xl mb-3">🙏</p>
              <h3
                className="font-bold text-xl mb-2"
                style={{ color: "var(--ew-text)" }}
              >
                Inquiry Received!
              </h3>
              <p
                className="text-sm mb-5"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Our yatra specialists will contact you within 24 hours.
              </p>
              <a
                href="https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20a%20yatra%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-ocid="yatras.whatsapp_button"
              >
                💬 Chat on WhatsApp Now
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-7 shadow-card space-y-4"
              data-ocid="yatras.inquiry_form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="yatra-name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="yatra-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    placeholder="Your full name"
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: "var(--ew-gray-mid)",
                        "--tw-ring-color": "var(--ew-red)",
                      } as React.CSSProperties
                    }
                    data-ocid="yatras.name.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yatra-email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    id="yatra-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    placeholder="your@email.com"
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: "var(--ew-gray-mid)",
                      } as React.CSSProperties
                    }
                    data-ocid="yatras.email.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yatra-phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Phone Number *
                  </label>
                  <input
                    id="yatra-phone"
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, phone: e.target.value }))
                    }
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: "var(--ew-gray-mid)",
                      } as React.CSSProperties
                    }
                    data-ocid="yatras.phone.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yatra-preferred"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Preferred Yatra
                  </label>
                  <select
                    id="yatra-preferred"
                    value={formState.yatra}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, yatra: e.target.value }))
                    }
                    className="w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2"
                    style={
                      {
                        borderColor: "var(--ew-gray-mid)",
                      } as React.CSSProperties
                    }
                    data-ocid="yatras.yatra.select"
                  >
                    <option value="">Select a yatra</option>
                    <optgroup label="Uttarakhand">
                      <option>Char Dham Yatra</option>
                      <option>Panch Kedar</option>
                      <option>Panch Badri</option>
                      <option>Hemkund Sahib</option>
                      <option>Adi Kailash & Om Parvat</option>
                    </optgroup>
                    <optgroup label="Himachal Pradesh">
                      <option>Mani Mahesh Yatra</option>
                      <option>Kinnaur Kailash Parikrama</option>
                      <option>Shrikhand Mahadev Yatra</option>
                      <option>Churdhar Yatra</option>
                    </optgroup>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="yatra-message"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Message
                </label>
                <textarea
                  id="yatra-message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder="Tell us about your group size, preferred dates, and any special requirements..."
                  className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                  style={
                    { borderColor: "var(--ew-gray-mid)" } as React.CSSProperties
                  }
                  data-ocid="yatras.message.textarea"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-primary flex-1 justify-center"
                  data-ocid="yatras.inquiry.submit_button"
                >
                  Send Inquiry
                </button>
                <a
                  href="https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20yatra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-full hover:bg-green-600 transition-colors text-sm"
                  data-ocid="yatras.whatsapp_button"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
