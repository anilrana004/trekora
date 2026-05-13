import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const TEAM = [
  {
    name: "Rahul Sharma",
    role: "CEO & Lead Guide",
    years: 15,
    bio: "Summited 50+ Himalayan peaks. Former GMVN guide. IMF certified mountaineer.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Priya Negi",
    role: "Operations Head",
    years: 12,
    bio: "Logistics expert ensuring every trek runs smoothly. Kedarnath specialist.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Vikram Singh",
    role: "Senior Trek Leader",
    years: 10,
    bio: "Roopkund veteran with 20+ crossings. First aid certified & AMS specialist.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    name: "Anjali Rawat",
    role: "Customer Experience",
    years: 8,
    bio: "Ensures every trekker gets personalized attention before, during and after the trek.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    name: "Deepak Bisht",
    role: "High Altitude Guide",
    years: 14,
    bio: "Pin Parvati & Auden's Col expert. Trained in wilderness medicine and rescue.",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
  },
  {
    name: "Sunita Devi",
    role: "Camp Manager",
    years: 9,
    bio: "Legendary for hot meals at 4000m. Manages all campsite operations with precision.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

const TIMELINE = [
  {
    year: "2009",
    title: "Founded in Rishikesh",
    desc: "EternaWings started with a single Kedarnath trek with 6 friends, driven by a passion for the mountains.",
  },
  {
    year: "2012",
    title: "First 100 Trekkers",
    desc: "Word spread through the mountains. We crossed 100 happy trekkers and expanded our Uttarakhand routes.",
  },
  {
    year: "2016",
    title: "500 Treks Completed",
    desc: "Himachal Pradesh treks added. Certified all guides under IMF and wilderness first-aid programs.",
  },
  {
    year: "2020",
    title: "Online Booking Launch",
    desc: "Launched our digital platform, making it easier than ever to book Himalayan adventures from anywhere.",
  },
  {
    year: "2024",
    title: "10,000+ Trekkers",
    desc: "A major milestone — 10,000 trekkers have explored the Himalayas with EternaWings safely and joyfully.",
  },
  {
    year: "2025",
    title: "EternaWings Relaunch",
    desc: "Rebranded as EternaWings — Where Every Peak Tells a Story. New routes, new experiences, same trusted team.",
  },
];

const CERTS = [
  {
    icon: "🏆",
    name: "NCISM Certified",
    desc: "National Council of Instruction & Scientific Management",
  },
  {
    icon: "🏔️",
    name: "IMF Approved",
    desc: "Indian Mountaineering Foundation authorised operator",
  },
  {
    icon: "🩺",
    name: "Wilderness First Aid",
    desc: "IMA wilderness & high-altitude emergency certified",
  },
  {
    icon: "🌿",
    name: "Eco-Tourism",
    desc: "Ministry of Tourism eco-responsible travel certified",
  },
];

const VALUES = [
  {
    icon: "🛡️",
    color: "var(--ew-red)",
    bg: "var(--ew-red-lt)",
    title: "Safety First",
    desc: "Every route is risk-assessed. Our guides carry oxygen, defibrillators, and satellite phones.",
  },
  {
    icon: "🌱",
    color: "var(--ew-green)",
    bg: "#e8f5e9",
    title: "Eco-Responsible",
    desc: "Zero plastic policy on all treks. We partner with local communities and offset our carbon footprint.",
  },
  {
    icon: "🤝",
    color: "var(--ew-orange)",
    bg: "var(--ew-orange-lt)",
    title: "Community Uplift",
    desc: "30% of our guides are from local Himalayan villages. We support mountain schools and sanitation.",
  },
];

const MEDIA = [
  "Times of India",
  "NDTV",
  "Outlook Traveller",
  "Hindustan Times",
  "India Today",
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt="EternaWings team in the mountains"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(26,26,46,0.75)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">
              Our Story
            </span>
            <h1 className="text-5xl font-bold mt-2 mb-3 text-shadow">
              About EternaWings
            </h1>
            <p className="text-lg max-w-2xl opacity-80">
              Founded in 2009 with a single Kedarnath trek, we now lead 150+
              expeditions per year across the Himalayas.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Our Mission
            </span>
            <h2
              className="text-3xl font-bold mt-2 mb-4"
              style={{ color: "var(--ew-text)" }}
            >
              "We believe every peak has a story worth telling"
            </h2>
            <div
              className="w-16 h-1 mx-auto mb-6 rounded-full"
              style={{ background: "var(--ew-red)" }}
            />
            <p
              className="leading-relaxed mb-4"
              style={{ color: "var(--ew-text-lt)" }}
            >
              EternaWings was born from a simple belief: every person deserves
              to experience the raw, soul-stirring beauty of the Himalayas. What
              started as a weekend trek with 6 friends in 2009 has grown into
              India's most trusted mountain adventure company.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--ew-text-lt)" }}
            >
              We are a team of certified guides, passionate trekkers, and
              hospitality professionals united by one goal — to create
              unforgettable, safe, and transformative mountain experiences. We
              practise responsible tourism, leaving no trace and supporting
              local Himalayan communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto block">Our Journey</h2>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{ background: "var(--ew-red)" }}
            />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 pl-16 relative"
                >
                  <div
                    className="absolute left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 z-10"
                    style={{
                      background: "var(--ew-red)",
                      border: "3px solid white",
                    }}
                  />
                  <div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "var(--ew-orange)" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-bold text-base mt-0.5"
                      style={{ color: "var(--ew-text)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--ew-text-lt)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              The People
            </span>
            <h2 className="section-title mt-2 mx-auto block">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card text-center hover:shadow-elevated transition-all"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid={`team.card.${i + 1}`}
              >
                <div className="pt-6 pb-2 flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                    style={{ border: "3px solid var(--ew-red)" }}
                  />
                </div>
                <div className="p-5 pt-3">
                  <h3
                    className="font-bold text-lg"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mt-0.5"
                    style={{ color: "var(--ew-red)" }}
                  >
                    {member.role}
                  </p>
                  <span
                    className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 mb-3"
                    style={{
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-orange)",
                    }}
                  >
                    {member.years} yrs experience
                  </span>
                  <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title mx-auto block">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card text-center"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: v.bg }}
                >
                  {v.icon}
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mx-auto block">
              Certifications &amp; Recognition
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-5 rounded-2xl transition-all hover:-translate-y-1"
                style={{
                  background: "var(--ew-gray-lt)",
                  border: "1px solid var(--ew-gray-mid)",
                }}
              >
                <span className="text-3xl">{cert.icon}</span>
                <p
                  className="font-bold text-sm mt-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  {cert.name}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--ew-gray-dark)" }}
                >
                  {cert.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* As Seen In */}
          <div className="text-center">
            <h3
              className="font-bold text-lg mb-6"
              style={{ color: "var(--ew-text)" }}
            >
              As Featured In
            </h3>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {MEDIA.map((m) => (
                <span
                  key={m}
                  className="font-bold text-lg"
                  style={{
                    color: "var(--ew-gray-dark)",
                    filter: "grayscale(1)",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-white text-center"
        style={{ background: "var(--ew-footer)" }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Himalayan Journey?
          </h2>
          <p className="mb-8 opacity-75">
            Join 10,000+ trekkers who have discovered the Himalayas with
            EternaWings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/treks"
              className="btn-primary"
              data-ocid="about.explore_button"
            >
              Explore Treks
            </Link>
            <Link
              to="/contact"
              className="btn-white"
              data-ocid="about.contact_button"
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
