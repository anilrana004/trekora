import { j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { e as useForm, m as motion, u as ue } from "./index-C6rgoof8.js";
import { a as MapPin, P as Phone, i as Mail, J as Clock } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Office Address",
    text: "15 Rajpur Road, Rishikesh, Uttarakhand 249201"
  },
  { icon: Phone, title: "Toll Free", text: "1800-XXX-XXXX (9AM–9PM Daily)" },
  { icon: Mail, title: "Email", text: "hello@eternawings.com" },
  {
    icon: Clock,
    title: "Office Hours",
    text: "Mon–Sat: 9AM–9PM | Sun: 10AM–5PM"
  }
];
function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();
  const {
    register: regCb,
    handleSubmit: handleCb,
    reset: resetCb
  } = useForm();
  const onSubmit = (data) => {
    console.log("Contact form:", data);
    ue.success("Message sent! We will reply within 24 hours.");
    reset();
  };
  const onCallback = (data) => {
    console.log("Callback request:", data);
    ue.success("Callback request received! We'll call you within 2 hours.");
    resetCb();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "pt-16 min-h-screen",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: { background: "var(--ew-red)" },
            className: "py-14 text-white text-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mt-2 mb-3", children: "Contact EternaWings" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-80 text-sm", children: "We're available Mon–Sat 9AM–9PM. Reach out anytime." })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "rounded-2xl overflow-hidden shadow-card",
                style: { height: 280 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "iframe",
                  {
                    title: "EternaWings Office Location",
                    width: "100%",
                    height: "100%",
                    style: { border: 0 },
                    loading: "lazy",
                    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13819.13009906774!2d78.2517!3d30.0869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39091512091c0f5f%3A0xb5e9b53a6a6b5a00!2sRishikesh%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1700000000000"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white rounded-2xl p-6 shadow-card",
                style: { border: "1px solid var(--ew-gray-mid)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold text-xl mb-5",
                      style: { color: "var(--ew-text)" },
                      children: "Get In Touch"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: CONTACT_INFO.map(({ icon: Icon, title, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        style: { background: "var(--ew-red-lt)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, style: { color: "var(--ew-red)" } })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-semibold text-sm",
                          style: { color: "var(--ew-text)" },
                          children: title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm",
                          style: { color: "var(--ew-text-lt)" },
                          children: text
                        }
                      )
                    ] })
                  ] }, title)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%27d%20like%20to%20enquire%20about%20trekking%20packages",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-full text-white text-sm transition-opacity hover:opacity-90",
                        style: { background: "#25D366" },
                        "data-ocid": "contact.whatsapp_button",
                        children: "💬 WhatsApp Chat"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "a",
                      {
                        href: "tel:+919999999999",
                        className: "flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-full text-white text-sm transition-opacity hover:opacity-90",
                        style: { background: "var(--ew-orange)" },
                        "data-ocid": "contact.call_button",
                        children: "📞 Call Now"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white rounded-2xl p-6 shadow-card",
                style: { border: "1px solid var(--ew-gray-mid)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-lg mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "Request a Callback"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm mb-4",
                      style: { color: "var(--ew-text-lt)" },
                      children: "Leave your number — we'll call within 2 hours."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleCb(onCallback),
                      className: "flex flex-col sm:flex-row gap-3",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "tel",
                            ...regCb("cbPhone", { required: true }),
                            placeholder: "+91 XXXXX XXXXX",
                            className: "flex-1 rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.callback_phone.input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            ...regCb("cbTime"),
                            className: "rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.callback_time.select",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Morning (9–12)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Afternoon (12–4)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Evening (4–9)" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "submit",
                            className: "btn-primary",
                            "data-ocid": "contact.callback.submit_button",
                            children: "Call Me"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-8 shadow-card sticky top-24",
              style: { border: "1px solid var(--ew-gray-mid)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-bold text-xl mb-6",
                    style: { color: "var(--ew-text)" },
                    children: "Send Us a Message"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleSubmit(onSubmit),
                    className: "space-y-4",
                    noValidate: true,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-name",
                            className: "block text-sm font-semibold mb-1",
                            style: { color: "var(--ew-text)" },
                            children: "Full Name *"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "contact-name",
                            type: "text",
                            ...register("name", { required: "Required" }),
                            className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.name.input"
                          }
                        ),
                        errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs mt-1",
                            style: { color: "var(--ew-red)" },
                            "data-ocid": "contact.name.field_error",
                            children: errors.name.message
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "contact-email",
                              className: "block text-sm font-semibold mb-1",
                              style: { color: "var(--ew-text)" },
                              children: "Email *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-email",
                              type: "email",
                              ...register("email", { required: "Required" }),
                              className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                              style: { border: "1px solid var(--ew-gray-mid)" },
                              "data-ocid": "contact.email.input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              htmlFor: "contact-phone",
                              className: "block text-sm font-semibold mb-1",
                              style: { color: "var(--ew-text)" },
                              children: "Phone *"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              id: "contact-phone",
                              type: "tel",
                              ...register("phone", { required: "Required" }),
                              className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                              style: { border: "1px solid var(--ew-gray-mid)" },
                              "data-ocid": "contact.phone.input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-subject",
                            className: "block text-sm font-semibold mb-1",
                            style: { color: "var(--ew-text)" },
                            children: "Subject"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "contact-subject",
                            type: "text",
                            ...register("subject"),
                            className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.subject.input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-trek",
                            className: "block text-sm font-semibold mb-1",
                            style: { color: "var(--ew-text)" },
                            children: "Trek of Interest"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            id: "contact-trek",
                            ...register("trekInterest"),
                            className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.trek_interest.select",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a trek (optional)" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Uttarakhand", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Roopkund Trek" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Valley of Flowers" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kedarnath Trek" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Brahmatal Trek" })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Himachal Pradesh", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Hampta Pass" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Triund Trek" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Sar Pass" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Spiti Valley" })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Yatras", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Char Dham Yatra" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Panch Kedar" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mani Mahesh Yatra" })
                              ] })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: "contact-message",
                            className: "block text-sm font-semibold mb-1",
                            style: { color: "var(--ew-text)" },
                            children: "Message *"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "textarea",
                          {
                            id: "contact-message",
                            rows: 4,
                            ...register("message", { required: "Required" }),
                            className: "w-full rounded-lg px-3 py-2.5 text-sm resize-none bg-white focus:outline-none",
                            style: { border: "1px solid var(--ew-gray-mid)" },
                            "data-ocid": "contact.message.textarea"
                          }
                        ),
                        errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs mt-1",
                            style: { color: "var(--ew-red)" },
                            "data-ocid": "contact.message.field_error",
                            children: errors.message.message
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: isSubmitting,
                          className: "btn-primary w-full justify-center disabled:opacity-50",
                          "data-ocid": "contact.submit_button",
                          children: "Send Message"
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ) })
        ] }) })
      ]
    }
  );
}
export {
  ContactPage as default
};
