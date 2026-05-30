import FormSuccessMessage from "@/components/FormSuccessMessage";
import PhoneInput from "@/components/ui/PhoneInput";
import { buildCorporateQuotePayload } from "@/lib/corporate-quote-payload";
import { CTA_OUTLINE_WHITE } from "@/lib/cta-buttons";
import type { ImageDeliveryOptions } from "@/lib/images/cloudinary-url";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import { validateNationalPhone } from "@/lib/phone-countries";
import { SITE_ORIGIN } from "@/lib/site-config";
import { buildWhatsAppUrl } from "@/lib/site-contact";
import { submitCorporateQuoteEmail } from "@/services/corporate-quote-email-api";
import { useSearch } from "@tanstack/react-router";
import { ChevronRight, Loader2, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import OptimizedImage from "../components/media/OptimizedImage";

type OrgType = "corporate" | "school" | "college";

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

const ORG_LABEL: Record<OrgType, { org: string; contact: string }> = {
  corporate: { org: "Company Name", contact: "HR / Team Lead" },
  school: { org: "School / Institution", contact: "Coordinator Name" },
  college: { org: "College / University", contact: "Faculty / Club Lead" },
};

const ORG_TOAST: Record<OrgType, string> = {
  corporate:
    "Corporate enquiry received! Our team will contact you within 4 hours.",
  school:
    "School enquiry received! We'll send a tailored quote within 4 hours.",
  college:
    "College enquiry received! We'll send a tailored quote within 4 hours.",
};

function groupSizeLabel(org: OrgType): string {
  if (org === "school") return "Students / Group size";
  if (org === "college") return "Participants / Group size";
  return "Team size";
}

function requirementsPlaceholder(org: OrgType): string {
  if (org === "school") {
    return "Grade level, learning goals, guardian policies, preferred trek or yatra...";
  }
  if (org === "college") {
    return "Department or club, semester dates, adventure/outdoor goals, preferred trek...";
  }
  return "Team-building goals, preferred trek, dietary needs, logistics...";
}

const ORG_PILL_LABEL: Record<OrgType, string> = {
  corporate: "Corporate",
  school: "School",
  college: "College",
};

const INFOSYS_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289089/pnskcikzn8gbmlej70fj.jpg";

const TCS_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289216/heejmc1iamx49awxtamb.jpg";

const WIPRO_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289287/jv0vkhzaxu2ews1bwiuh.png";

const HCL_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289783/m3ulypcfwhwwqz5jk4nk.png";

const ZOMATO_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289880/fdabo7yexszedm6rp2h8.png";

const SWIGGY_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289577/qbhv5j0ksauhh2yrk0eh.webp";

const BYJUS_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289613/bbqynskop359uqtrvqan.png";

const PHONEPE_LOGO_URL =
  "https://res.cloudinary.com/ddbcauxef/image/upload/v1779289619/txwo1l6saeur8pvaacv2.webp";

/** Sharp logos on white — trim/cleanup checkerboard on uploads. */
const LOGO_DELIVERY: ImageDeliveryOptions = {
  crop: "e_trim,c_limit",
  format: "f_png",
  quality: "q_95",
};

const LOGO_DELIVERY_ALPHA: ImageDeliveryOptions = {
  crop: "e_trim,e_background_removal,c_limit",
  format: "f_png",
  quality: "q_92",
};

type ClientLogo = {
  name: string;
  logoSrc?: string;
  delivery?: ImageDeliveryOptions;
};

const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Infosys", logoSrc: INFOSYS_LOGO_URL, delivery: LOGO_DELIVERY },
  { name: "TCS", logoSrc: TCS_LOGO_URL, delivery: LOGO_DELIVERY },
  { name: "Wipro", logoSrc: WIPRO_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
  { name: "HCL", logoSrc: HCL_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
  { name: "Zomato", logoSrc: ZOMATO_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
  { name: "Swiggy", logoSrc: SWIGGY_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
  { name: "BYJU'S", logoSrc: BYJUS_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
  { name: "PhonePe", logoSrc: PHONEPE_LOGO_URL, delivery: LOGO_DELIVERY_ALPHA },
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
    text: "Trekora handled everything flawlessly — logistics, safety, meals. Our leadership team's Hampta Pass trek was a defining experience for our culture.",
    badge: "Leadership Trek",
  },
  {
    name: "Sandeep Joshi",
    company: "TCS",
    text: "Third year running with Trekora for our annual team outing. Every year exceeds the last. Highly recommend their Triund overnight package.",
    badge: "3-Year Partner",
  },
];

const QUOTE_SUCCESS: Record<OrgType, { title: string; description: string }> = {
  corporate: {
    title: "Quote request sent!",
    description:
      "Thank you. Our corporate team will email your custom itinerary quote within 4 hours (Mon–Sat, 9AM–9PM).",
  },
  school: {
    title: "Quote request sent!",
    description:
      "Thank you. We'll send a tailored school expedition quote within 4 hours (Mon–Sat, 9AM–9PM).",
  },
  college: {
    title: "Quote request sent!",
    description:
      "Thank you. We'll send a tailored college group quote within 4 hours (Mon–Sat, 9AM–9PM).",
  },
};

export default function CorporatePage() {
  const [orgType, setOrgType] = useState<OrgType>("corporate");
  const [phoneCountry, setPhoneCountry] = useState("IN");
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CorporateForm>({ defaultValues: { phone: "" } });

  const orgFromUrl = useSearch({
    from: "/layout/corporate",
    select: (s) => s.org,
  });

  useEffect(() => {
    if (
      orgFromUrl === "school" ||
      orgFromUrl === "college" ||
      orgFromUrl === "corporate"
    ) {
      setOrgType(orgFromUrl);
    }
  }, [orgFromUrl]);

  const onSubmit = (data: CorporateForm) => {
    if (submitting) return;
    setSubmitting(true);
    const payload = buildCorporateQuotePayload({
      orgType,
      company: data.company,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      phoneCountry,
      groupSize: data.groupSize,
      budget: data.budget,
      preferredDates: data.preferredDates,
      requirements: data.requirements,
    });

    submitEmailOptimistic(
      () => submitCorporateQuoteEmail(payload),
      () => {
        setQuoteSubmitted(true);
        reset();
        toast.success(ORG_TOAST[orgType]);
      },
      (message) => {
        setQuoteSubmitted(false);
        setSubmitting(false);
        toast.error(message);
      },
      () => {
        setSubmitting(false);
      },
    );
  };

  const labels = ORG_LABEL[orgType];

  return (
    <div className="pt-16 min-h-screen corporate-page">
      <SEOHead
        title="Corporate & School Treks — Team Building in the Himalayas | Trekora"
        description="Custom corporate and school trek programs in Uttarakhand and Himachal. Team building, leadership development, and certified Himalayan experiences for groups of all sizes."
        keywords="corporate trekking India, school trek programs, team building Himalayas, corporate outing Trekora"
        canonical={`${SITE_ORIGIN}/corporate`}
      />

      {/* Hero — matches treks / packages listing */}
      <div
        className="relative overflow-hidden"
        data-travel-image-section
        style={{ backgroundColor: "var(--ew-red)" }}
      >
        <OptimizedImage
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80"
          alt="Corporate trekking"
          variant="hero"
          sizes="(max-width: 1024px) 0px, 50vw"
          priority
          className="absolute right-0 top-0 h-full w-1/2 opacity-20 hidden lg:block object-cover pointer-events-none"
        />
        <svg
          className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden
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
        <svg
          className="absolute right-8 top-4 opacity-10 pointer-events-none hidden md:block"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
        </svg>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Corporate &amp; School Programs
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-shadow">
              Corporate &amp; School Treks
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
              Build Teams, Break Barriers
            </p>
            <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto mb-8">
              Custom Himalayan programs for companies and schools of all sizes.
              Strengthen culture, boost morale, and create stories your team
              will tell for years.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#quote-form"
                className={CTA_OUTLINE_WHITE}
                data-ocid="corporate.hero_quote_button"
              >
                Get a Custom Quote <ChevronRight size={14} aria-hidden />
              </a>
              <a
                href={buildWhatsAppUrl(
                  "Hi Trekora, I'd like to enquire about Corporate Treks",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_OUTLINE_WHITE}
                data-ocid="corporate.whatsapp_button"
              >
                <MessageCircle size={16} aria-hidden />
                WhatsApp Us <ChevronRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-corporate" />

      {/* Benefits */}
      <section className="py-16 section-alt">
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
                className="corporate-benefit-card p-6 group"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-105"
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
          <div className="corporate-client-logos">
            {CLIENT_LOGOS.map((client) => (
              <div key={client.name} className="corporate-client-logo">
                {client.logoSrc ? (
                  <OptimizedImage
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    variant="brand-logo"
                    width={160}
                    height={48}
                    delivery={client.delivery ?? LOGO_DELIVERY}
                    className="corporate-client-logo__img"
                  />
                ) : (
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--ew-gray-mid)" }}
                  >
                    {client.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 section-alt">
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
                className="card p-6"
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

      {/* Quote Form — corporate & school customizable quote */}
      <section id="quote-form" className="py-16 bg-white scroll-mt-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--ew-red)" }}
            >
              Custom itinerary
            </span>
            <h2 className="section-title mt-2 mx-auto block">
              Get a Custom Quote
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--ew-text-lt)" }}>
              Corporate offsites, school &amp; college expeditions, and private
              group packages — tailored to your dates, budget, and goals.
            </p>
          </div>

          <div
            className="listing-region-pills flex justify-center gap-2 mb-6"
            role="tablist"
            aria-label="Organization type"
          >
            {(["corporate", "school", "college"] as const).map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={orgType === type}
                onClick={() => {
                  setOrgType(type);
                  setQuoteSubmitted(false);
                }}
                className={`listing-region-pill ${orgType === type ? "listing-region-pill--active" : ""}`}
                data-ocid={`corporate.org_type.${type}`}
              >
                {ORG_PILL_LABEL[type]}
              </button>
            ))}
          </div>

          {quoteSubmitted ? (
            <div
              className="card corporate-quote-form p-6 md:p-8"
              data-ocid="corporate.quote_success"
            >
              <FormSuccessMessage
                title={QUOTE_SUCCESS[orgType].title}
                description={QUOTE_SUCCESS[orgType].description}
                data-ocid="corporate.quote_success.message"
              />
              <button
                type="button"
                className="btn-secondary w-full justify-center mt-2"
                onClick={() => setQuoteSubmitted(false)}
                data-ocid="corporate.quote_success.another_button"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card corporate-quote-form p-6 md:p-8 space-y-4"
              noValidate
              data-ocid="corporate.quote_form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="corp-company"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {labels.org} *
                  </label>
                  <input
                    id="corp-company"
                    type="text"
                    {...register("company", { required: true })}
                    className="ew-field"
                    data-ocid="corporate.company.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="corp-name"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {labels.contact} *
                  </label>
                  <input
                    id="corp-name"
                    type="text"
                    {...register("contactName", { required: true })}
                    className="ew-field"
                    data-ocid="corporate.contact_name.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="corp-email"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Email *
                  </label>
                  <input
                    id="corp-email"
                    type="email"
                    {...register("email", { required: true })}
                    className="ew-field"
                    data-ocid="corporate.email.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="corp-phone"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Mobile Number *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: "Required",
                      validate: (v) => validateNationalPhone(v, phoneCountry),
                    }}
                    render={({ field }) => (
                      <PhoneInput
                        id="corp-phone"
                        value={field.value}
                        countryIso={phoneCountry}
                        onValueChange={field.onChange}
                        onCountryChange={(meta) => setPhoneCountry(meta.iso)}
                        hasError={Boolean(errors.phone)}
                        placeholder="Enter Your Mobile Number"
                        data-ocid="corporate.phone.input"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--ew-red)" }}
                    >
                      {String(errors.phone.message ?? errors.phone)}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="corp-group"
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {groupSizeLabel(orgType)}
                  </label>
                  <select
                    id="corp-group"
                    {...register("groupSize")}
                    className="ew-field"
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
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Budget per person
                  </label>
                  <select
                    id="corp-budget"
                    {...register("budget")}
                    className="ew-field"
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
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Preferred month
                </label>
                <input
                  id="corp-dates"
                  type="text"
                  placeholder="e.g., June 2026"
                  {...register("preferredDates")}
                  className="ew-field"
                  data-ocid="corporate.dates.input"
                />
              </div>
              <div>
                <label
                  htmlFor="corp-requirements"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--ew-text)" }}
                >
                  Trip goals &amp; requirements
                </label>
                <textarea
                  id="corp-requirements"
                  rows={4}
                  {...register("requirements")}
                  placeholder={requirementsPlaceholder(orgType)}
                  className="ew-field resize-none"
                  data-ocid="corporate.requirements.textarea"
                />
              </div>
              <button
                type="submit"
                className="btn-secondary w-full justify-center inline-flex items-center gap-2"
                disabled={submitting}
                data-ocid="corporate.submit_button"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    Request Custom Quote <ChevronRight size={14} aria-hidden />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
