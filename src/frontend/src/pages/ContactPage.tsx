import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
    text: "15 Rajpur Road, Rishikesh, Uttarakhand 249201",
  },
  { icon: Phone, title: "Toll Free", text: "1800-XXX-XXXX (9AM–9PM Daily)" },
  { icon: Mail, title: "Email", text: "hello@eternawings.com" },
  {
    icon: Clock,
    title: "Office Hours",
    text: "Mon–Sat: 9AM–9PM | Sun: 10AM–5PM",
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>();

  const {
    register: regCb,
    handleSubmit: handleCb,
    reset: resetCb,
  } = useForm<CallbackForm>();

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);
    toast.success("Message sent! We will reply within 24 hours.");
    reset();
  };

  const onCallback = (data: CallbackForm) => {
    console.log("Callback request:", data);
    toast.success("Callback request received! We'll call you within 2 hours.");
    resetCb();
  };

  return (
    <div
      className="pt-16 min-h-screen"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Hero */}
      <div
        style={{ background: "var(--ew-red)" }}
        className="py-14 text-white text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-3">
            Contact Trekora
          </h1>
          <p className="opacity-80 text-sm">
            We're available Mon–Sat 9AM–9PM. Reach out anytime.
          </p>
        </motion.div>
      </div>

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13819.13009906774!2d78.2517!3d30.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39091512091c0f5f%3A0xb5e9b53a6a6b5a00!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000"
              />
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
              <div className="flex gap-3 mt-6">
                <a
                  href="https://wa.me/919999999999?text=Hi%20Trekora%2C%20I%27d%20like%20to%20enquire%20about%20trekking%20packages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-full text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: "#25D366" }}
                  data-ocid="contact.whatsapp_button"
                >
                  💬 WhatsApp Chat
                </a>
                <a
                  href="tel:+919999999999"
                  className="flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-full text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: "var(--ew-orange)" }}
                  data-ocid="contact.call_button"
                >
                  📞 Call Now
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
                Leave your number — we'll call within 2 hours.
              </p>
              <form
                onSubmit={handleCb(onCallback)}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="tel"
                  {...regCb("cbPhone", { required: true })}
                  placeholder="+91 XXXXX XXXXX"
                  className="flex-1 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="contact.callback_phone.input"
                />
                <select
                  {...regCb("cbTime")}
                  className="rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none"
                  style={{ border: "1px solid var(--ew-gray-mid)" }}
                  data-ocid="contact.callback_time.select"
                >
                  <option>Morning (9–12)</option>
                  <option>Afternoon (12–4)</option>
                  <option>Evening (4–9)</option>
                </select>
                <button
                  type="submit"
                  className="btn-primary"
                  data-ocid="contact.callback.submit_button"
                >
                  Call Me
                </button>
              </form>
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
                      Phone *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      {...register("phone", { required: "Required" })}
                      className="w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none"
                      style={{ border: "1px solid var(--ew-gray-mid)" }}
                      data-ocid="contact.phone.input"
                    />
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
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50"
                  data-ocid="contact.submit_button"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
