import {
  SITE_EMAIL,
  SITE_OFFICE_ADDRESS,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  WHATSAPP_CHAT_URL,
  getSiteMapEmbedSrc,
  getSiteMapOpenUrl,
} from "@/lib/site-contact";
import FormSuccessMessage from "@/components/FormSuccessMessage";
import PhoneInput from "@/components/ui/PhoneInput";
import {
  normalizeIndianPhoneDigits,
  parseIndianMobileInput,
} from "@/lib/phone-countries";
import { submitEmailOptimistic } from "@/lib/optimistic-email";
import { submitCallbackEmail } from "@/services/callback-email-api";
import { submitPlanTrekEmail } from "@/services/query-email-api";
import { ChevronRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SEOHead } from "../components/SEOHead";
import TravelSideActionRail, {
  TRAVEL_HERO_SENTINEL_ID,
} from "../components/TravelSideActionRail";
import {
  CTA_OUTLINE_ORANGE_FLEX,
  CTA_OUTLINE_RED,
  CTA_OUTLINE_WHATSAPP_FLEX,
  CTA_OUTLINE_WHITE,
} from "@/lib/cta-buttons";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  trekInterest: string;
  message: string;
}

interface CallbackForm {
  cbPhone: string;
  cbTime: string;
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Office Address",
    text: SITE_OFFICE_ADDRESS,
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    text: `${SITE_PHONE_DISPLAY} (9AM–9PM Daily)`,
  },
  { icon: Mail, title: "Email", text: SITE_EMAIL },
  {
    icon: Clock,
    title: "Office Hours",
    text: "Mon–Sat: 9AM–9PM | Sun: 10AM–5PM",
  },
];

export default function ContactPage() {
  const [contactPhoneCountry, setContactPhoneCountry] = useState("IN");
  const [callbackPhoneCountry, setCallbackPhoneCountry] = useState("IN");
  const [callbackSent, setCallbackSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactForm>({ defaultValues: { phone: "" } });

  const {
    register: regCb,
    control: cbControl,
    handleSubmit: handleCb,
    reset: resetCb,
  } = useForm<CallbackForm>({ defaultValues: { cbPhone: "", cbTime: "Morning (9–12)" } });

  const onSubmit = (data: ContactForm) => {
    const phone =
      contactPhoneCountry === "IN"
        ? normalizeIndianPhoneDigits(data.phone)
        : data.phone.replace(/\D/g, "");
    if (contactPhoneCountry === "IN" && phone.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    const messageBody = [
      data.subject.trim() && `Subject: ${data.subject.trim()}`,
      data.trekInterest && `Trek / yatra: ${data.trekInterest}`,
      data.message.trim(),
    ]
      .filter(Boolean)
      .join("\n\n");

    submitEmailOptimistic(
      () =>
        submitPlanTrekEmail({
          name: data.name.trim(),
          email: data.email.trim(),
          phone,
          phoneCountry: contactPhoneCountry,
          destination: "",
          destinationLabel: data.trekInterest || data.subject || "General contact",
          message: messageBody,
          source: "Send Query — Contact page",
        }),
      () => {
        setContactSent(true);
        reset();
      },
      (message) => {
        setContactSent(false);
        toast.error(message);
      },
    );
  };

  const onCallback = (data: CallbackForm) => {
    const digits = parseIndianMobileInput(data.cbPhone);
    if (!digits) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    submitEmailOptimistic(
      () =>
        submitCallbackEmail({
          phone: digits,
          preferredTime: data.cbTime,
          source: "Contact page",
          pagePath: "/contact",
        }),
      () => {
        setCallbackSent(true);
        resetCb();
      },
      (message) => {
        setCallbackSent(false);
        toast.error(message);
      },
    );
  };

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <SEOHead
        title="Contact Trekora | Book Treks & Yatras"
        description="Contact Trekora in Dehradun — phone, WhatsApp, email, and callback. Mon–Sat 9AM–9PM. Plan your Himalayan trek or yatra."
        keywords="contact Trekora, book Himalayan trek, Trekora Dehradun office"
        canonical="https://www.trekora.in/contact"
      />

      {/* Hero — matches gallery / blog listing */}
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor: "var(--ew-red)" }}
      >
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

        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center text-white"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-shadow">
              Contact Trekora
            </h1>
            <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto mb-6">
              We&apos;re available Mon–Sat 9AM–9PM. Reach out anytime.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={WHATSAPP_CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={CTA_OUTLINE_WHITE}
                data-ocid="contact.hero.whatsapp_button"
              >
                <MessageCircle size={16} aria-hidden />
                WhatsApp Chat <ChevronRight size={14} aria-hidden />
              </a>
              <a
                href={`tel:${SITE_PHONE_TEL}`}
                className={CTA_OUTLINE_WHITE}
                data-ocid="contact.hero.call_button"
              >
                <Phone size={16} aria-hidden />
                Call Now <ChevronRight size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div id={TRAVEL_HERO_SENTINEL_ID} className="h-0 w-full" aria-hidden />
      <TravelSideActionRail variant="listing-contact" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column: info + map + callback */}
          <div className="lg:col-span-3 space-y-8">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden shadow-card"
              style={{ height: 280 }}
            >
              <iframe
                title="Trekora Office Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                src={getSiteMapEmbedSrc()}
              />
              <a
                href={getSiteMapOpenUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
                data-ocid="contact.map.open_link"
              >
                Open Trekora office in Google Maps
              </a>
            </div>

            {/* Contact info */}
            <div
              className="bg-white rounded-2xl p-6 shadow-card"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
            >
              <h2
                className="font-bold text-xl mb-5"
                style={{ color: "var(--ew-text)" }}
              >
                Get In Touch
              </h2>
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--ew-red-lt)" }}
                    >
                      <Icon size={18} style={{ color: "var(--ew-red)" }} />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--ew-text)" }}
                      >
                        {title}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: "var(--ew-text-lt)" }}
                      >
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CTA_OUTLINE_WHATSAPP_FLEX}
                  data-ocid="contact.whatsapp_button"
                >
                  <MessageCircle size={16} aria-hidden />
                  WhatsApp Chat <ChevronRight size={14} aria-hidden />
                </a>
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className={CTA_OUTLINE_ORANGE_FLEX}
                  data-ocid="contact.call_button"
                >
                  <Phone size={16} aria-hidden />
                  Call Now <ChevronRight size={14} aria-hidden />
                </a>
              </div>
            </div>

            {/* Callback widget */}
            <div
              className="bg-white rounded-2xl p-6 shadow-card"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
            >
              <h3
                className="font-bold text-lg mb-1"
                style={{ color: "var(--ew-text)" }}
              >
                Request a Callback
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "var(--ew-text-lt)" }}
              >
                Leave your number — we&apos;ll call within 2 hours.
              </p>
              {callbackSent ? (
                <div>
                  <FormSuccessMessage
                    title="Callback requested!"
                    description="We'll call you within 2 hours (Mon–Sat 9AM–9PM)."
                    className="py-4"
                    data-ocid="contact.callback.success_state"
                  />
                  <button
                    type="button"
                    className="text-sm font-semibold w-full text-center"
                    style={{ color: "var(--ew-red)" }}
                    onClick={() => setCallbackSent(false)}
                    data-ocid="contact.callback.another_button"
                  >
                    Request another callback
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleCb(onCallback)}
                  className="flex flex-col sm:flex-row gap-3 sm:items-stretch"
                >
                  <div className="flex-1 min-w-0">
                    <Controller
                      name="cbPhone"
                      control={cbControl}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <PhoneInput
                          value={field.value}
                          countryIso={callbackPhoneCountry}
                          onValueChange={field.onChange}
                          onCountryChange={(meta) =>
                            setCallbackPhoneCountry(meta.iso)
                          }
                          placeholder="Enter Your Mobile Number"
                          data-ocid="contact.callback_phone.input"
                        />
                      )}
                    />
                  </div>
                  <select
                    {...regCb("cbTime")}
                    className="rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none sm:max-w-[11rem]"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="contact.callback_time.select"
                  >
                    <option>Morning (9–12)</option>
                    <option>Afternoon (12–4)</option>
                    <option>Evening (4–9)</option>
                  </select>
                  <button
                    type="submit"
                    className={`${CTA_OUTLINE_RED} shrink-0`}
                    data-ocid="contact.callback.submit_button"
                  >
                    Call Me <ChevronRight size={14} aria-hidden />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right column: contact form */}
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-2xl p-8 shadow-card sticky top-24"
              style={{ border: "1px solid var(--ew-gray-mid)" }}
            >
              <h2
                className="font-bold text-xl mb-6"
                style={{ color: "var(--ew-text)" }}
              >
                Send Us a Message
              </h2>
              {contactSent ? (
                <div>
                  <FormSuccessMessage
                    title="Message sent!"
                    description="We'll reply within 24 hours (Mon–Sat 9AM–9PM)."
                    className="py-4"
                    data-ocid="contact.form.success_state"
                  />
                  <button
                    type="button"
                    className="text-sm font-semibold w-full text-center"
                    style={{ color: "var(--ew-red)" }}
                    onClick={() => setContactSent(false)}
                    data-ocid="contact.form.another_button"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    {...register("name", { required: "Required" })}
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="contact.name.input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--ew-red)" }}
                      data-ocid="contact.name.field_error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register("email", { required: "Required" })}
                      className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                      data-ocid="contact.email.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-semibold mb-1"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Mobile Number *
                    </label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <PhoneInput
                          id="contact-phone"
                          value={field.value}
                          countryIso={contactPhoneCountry}
                          onValueChange={field.onChange}
                          onCountryChange={(meta) =>
                            setContactPhoneCountry(meta.iso)
                          }
                          hasError={Boolean(errors.phone)}
                          placeholder="Enter Your Mobile Number"
                          data-ocid="contact.phone.input"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--ew-red)" }}
                        data-ocid="contact.phone.field_error"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    {...register("subject")}
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="contact.subject.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-trek"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Trek of Interest
                  </label>
                  <select
                    id="contact-trek"
                    {...register("trekInterest")}
                    className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="contact.trek_interest.select"
                  >
                    <option value="">Select a trek (optional)</option>
                    <optgroup label="Uttarakhand">
                      <option>Roopkund Trek</option>
                      <option>Valley of Flowers</option>
                      <option>Kedarnath Trek</option>
                      <option>Brahmatal Trek</option>
                    </optgroup>
                    <optgroup label="Himachal Pradesh">
                      <option>Hampta Pass</option>
                      <option>Triund Trek</option>
                      <option>Sar Pass</option>
                      <option>Spiti Valley</option>
                    </optgroup>
                    <optgroup label="Yatras">
                      <option>Char Dham Yatra</option>
                      <option>Panch Kedar</option>
                      <option>Mani Mahesh Yatra</option>
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold mb-1"
                    style={{ color: "var(--ew-text)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    {...register("message", { required: "Required" })}
                    className="w-full rounded-lg px-3 py-2.5 text-sm resize-none bg-white focus:outline-none"
                    style={{ border: "1px solid var(--ew-gray-mid)" }}
                    data-ocid="contact.message.textarea"
                  />
                  {errors.message && (
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--ew-red)" }}
                      data-ocid="contact.message.field_error"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`${CTA_OUTLINE_RED} w-full`}
                  data-ocid="contact.submit_button"
                >
                  Send Message <ChevronRight size={14} aria-hidden />
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
