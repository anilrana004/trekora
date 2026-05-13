import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CorporateForm {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  groupSize: string;
  preferredDates: string;
  budget: string;
  requirements: string;
}

const CLIENT_LOGOS = [
  "Infosys",
  "TCS",
  "Wipro",
  "HCL",
  "Zomato",
  "Swiggy",
  "BYJU'S",
  "PhonePe",
];

const BENEFITS = [
  {
    icon: "🤝",
    title: "Team Building",
    desc: "Himalayan challenges forge trust and camaraderie that lasts long after the trek ends.",
  },
  {
    icon: "🎯",
    title: "Leadership Development",
    desc: "Real-world high-pressure environments reveal and develop natural leaders in your team.",
  },
  {
    icon: "🌿",
    title: "Stress Detox",
    desc: "Disconnect from screens, reconnect with nature. Your team returns recharged and more focused.",
  },
  {
    icon: "🌄",
    title: "Nature Bonding",
    desc: "Shared campfires, summits, and sunrises create bonds that no team offsite can replicate.",
  },
  {
    icon: "📜",
    title: "Certificate Programs",
    desc: "Every participant receives a certified completion certificate and trek diary.",
  },
  {
    icon: "📅",
    title: "Customizable Dates",
    desc: "Flexible scheduling around your company calendar — weekends, long weekends, or extended trips.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ankit Mehta",
    company: "Infosys",
    text: "Our 40-person team came back completely transformed. The guides were professional and the itinerary was perfectly paced. Best corporate outing we've ever done.",
    badge: "Team of 40",
  },
  {
    name: "Riya Kapoor",
    company: "Zomato",
    text: "EternaWings handled everything flawlessly — logistics, safety, meals. Our leadership team's Hampta Pass trek was a defining experience for our culture.",
    badge: "Leadership Trek",
  },
  {
    name: "Sandeep Joshi",
    company: "TCS",
    text: "Third year running with EternaWings for our annual team outing. Every year exceeds the last. Highly recommend their Triund overnight package.",
    badge: "3-Year Partner",
  },
];

export default function CorporatePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CorporateForm>();

  const onSubmit = (data: CorporateForm) => {
    console.log("Corporate enquiry:", data);
    toast.success(
      "Enquiry received! Our corporate team will contact you within 4 hours.",
    );
    reset();
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero — ew-red bg with mountain image */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--ew-red)", minHeight: 280 }}
      >
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
          alt="Corporate trekking"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 hidden lg:block"
        />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white"
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-75">
              Team Building
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-3">
              Corporate &amp; School Treks
            </h1>
            <p className="text-2xl font-semibold opacity-90 mb-4">
              Build Teams, Break Barriers
            </p>
            <p className="opacity-80 text-sm max-w-lg">
              Custom Himalayan programs for companies of all sizes. Strengthen
              culture, boost morale, and create stories your team will tell for
              years.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a href="#quote-form" className="btn-white">
                Get a Custom Quote
              </a>
              <a
                href="https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%27d%20like%20to%20enquire%20about%20Corporate%20Treks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white transition-opacity hover:opacity-90 text-sm"
                style={{ background: "#25D366" }}
                data-ocid="corporate.whatsapp_button"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Why Trek Together
            </span>
            <h2 className="section-title mt-2 mx-auto block">
              Why Corporate Trekking Works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all group"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "var(--ew-red-lt)" }}
                >
                  {b.icon}
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: "var(--ew-text)" }}
                >
                  {b.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client logos */}
      <section
        className="py-12 bg-white"
        style={{
          borderTop: "1px solid var(--ew-gray-mid)",
          borderBottom: "1px solid var(--ew-gray-mid)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Trusted by Leading Companies
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {CLIENT_LOGOS.map((logo) => (
              <span
                key={logo}
                className="font-bold text-lg"
                style={{ color: "var(--ew-gray-mid)", filter: "grayscale(1)" }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16" style={{ background: "var(--ew-gray-lt)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mx-auto block">What Companies Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--ew-orange-lt)",
                    color: "var(--ew-orange)",
                  }}
                >
                  {t.badge}
                </span>
                <p
                  className="text-sm mt-3 mb-4 italic"
                  style={{ color: "var(--ew-text-lt)" }}
                >
                  "{t.text}"
                </p>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--ew-red)" }}>
                    {t.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="section-title mx-auto block">Get a Custom Quote</h2>
            <p className="mt-4 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Fill in your requirements and our corporate team will create a
              tailored itinerary within 4 hours.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-8 shadow-card space-y-4"
            style={{ border: "1px solid var(--ew-gray-mid)" }}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="corp-company"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Company Name *
                </label>
                <input
                  id="corp-company"
                  type="text"
                  {...register("company", { required: true })}
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.company.input"
                />
              </div>
              <div>
                <label
                  htmlFor="corp-name"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Contact Person *
                </label>
                <input
                  id="corp-name"
                  type="text"
                  {...register("contactName", { required: true })}
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.contact_name.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="corp-email"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Work Email *
                </label>
                <input
                  id="corp-email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.email.input"
                />
              </div>
              <div>
                <label
                  htmlFor="corp-phone"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Phone *
                </label>
                <input
                  id="corp-phone"
                  type="tel"
                  {...register("phone", { required: true })}
                  className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.phone.input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="corp-group"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Team Size
                </label>
                <select
                  id="corp-group"
                  {...register("groupSize")}
                  className="w-full rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.group_size.select"
                >
                  <option>10–25 people</option>
                  <option>25–50 people</option>
                  <option>50–100 people</option>
                  <option>100+ people</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="corp-budget"
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Budget per Person
                </label>
                <select
                  id="corp-budget"
                  {...register("budget")}
                  className="w-full rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="corporate.budget.select"
                >
                  <option>Under ₹5,000</option>
                  <option>₹5,000–₹10,000</option>
                  <option>₹10,000–₹20,000</option>
                  <option>₹20,000+</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="corp-dates"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Preferred Month
              </label>
              <input
                id="corp-dates"
                type="text"
                placeholder="e.g., June 2025"
                {...register("preferredDates")}
                className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid="corporate.dates.input"
              />
            </div>
            <div>
              <label
                htmlFor="corp-requirements"
                className="block text-sm font-semibold mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Special Requirements
              </label>
              <textarea
                id="corp-requirements"
                rows={4}
                {...register("requirements")}
                placeholder="Tell us about your goals, preferred location, activities, dietary needs..."
                className="w-full rounded-lg px-3 py-2.5 text-sm resize-none bg-white focus:outline-none"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
                data-ocid="corporate.requirements.textarea"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center disabled:opacity-50"
              data-ocid="corporate.submit_button"
            >
              Request Custom Quote
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
