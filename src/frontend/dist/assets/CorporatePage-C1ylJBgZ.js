import { j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { e as useForm, m as motion, u as ue } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
const CLIENT_LOGOS = [
  "Infosys",
  "TCS",
  "Wipro",
  "HCL",
  "Zomato",
  "Swiggy",
  "BYJU'S",
  "PhonePe"
];
const BENEFITS = [
  {
    icon: "🤝",
    title: "Team Building",
    desc: "Himalayan challenges forge trust and camaraderie that lasts long after the trek ends."
  },
  {
    icon: "🎯",
    title: "Leadership Development",
    desc: "Real-world high-pressure environments reveal and develop natural leaders in your team."
  },
  {
    icon: "🌿",
    title: "Stress Detox",
    desc: "Disconnect from screens, reconnect with nature. Your team returns recharged and more focused."
  },
  {
    icon: "🌄",
    title: "Nature Bonding",
    desc: "Shared campfires, summits, and sunrises create bonds that no team offsite can replicate."
  },
  {
    icon: "📜",
    title: "Certificate Programs",
    desc: "Every participant receives a certified completion certificate and trek diary."
  },
  {
    icon: "📅",
    title: "Customizable Dates",
    desc: "Flexible scheduling around your company calendar — weekends, long weekends, or extended trips."
  }
];
const TESTIMONIALS = [
  {
    name: "Ankit Mehta",
    company: "Infosys",
    text: "Our 40-person team came back completely transformed. The guides were professional and the itinerary was perfectly paced. Best corporate outing we've ever done.",
    badge: "Team of 40"
  },
  {
    name: "Riya Kapoor",
    company: "Zomato",
    text: "EternaWings handled everything flawlessly — logistics, safety, meals. Our leadership team's Hampta Pass trek was a defining experience for our culture.",
    badge: "Leadership Trek"
  },
  {
    name: "Sandeep Joshi",
    company: "TCS",
    text: "Third year running with EternaWings for our annual team outing. Every year exceeds the last. Highly recommend their Triund overnight package.",
    badge: "3-Year Partner"
  }
];
function CorporatePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();
  const onSubmit = (data) => {
    console.log("Corporate enquiry:", data);
    ue.success(
      "Enquiry received! Our corporate team will contact you within 4 hours."
    );
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden",
        style: { background: "var(--ew-red)", minHeight: 280 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
              alt: "Corporate trekking",
              className: "absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 hidden lg:block"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "max-w-2xl text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest opacity-75", children: "Team Building" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mt-2 mb-3", children: "Corporate & School Treks" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold opacity-90 mb-4", children: "Build Teams, Break Barriers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-80 text-sm max-w-lg", children: "Custom Himalayan programs for companies of all sizes. Strengthen culture, boost morale, and create stories your team will tell for years." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#quote-form", className: "btn-white", children: "Get a Custom Quote" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://wa.me/919999999999?text=Hi%20EternaWings%2C%20I%27d%20like%20to%20enquire%20about%20Corporate%20Treks",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white transition-opacity hover:opacity-90 text-sm",
                      style: { background: "#25D366" },
                      "data-ocid": "corporate.whatsapp_button",
                      children: "💬 WhatsApp Us"
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold uppercase tracking-widest",
            style: { color: "var(--ew-red)" },
            children: "Why Trek Together"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mt-2 mx-auto block", children: "Why Corporate Trekking Works" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: BENEFITS.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all group",
          style: { border: "1px solid var(--ew-gray-mid)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110",
                style: { background: "var(--ew-red-lt)" },
                children: b.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-bold text-base mb-2",
                style: { color: "var(--ew-text)" },
                children: b.title
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: b.desc })
          ]
        },
        b.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-12 bg-white",
        style: {
          borderTop: "1px solid var(--ew-gray-mid)",
          borderBottom: "1px solid var(--ew-gray-mid)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-bold uppercase tracking-widest mb-6",
              style: { color: "var(--ew-gray-dark)" },
              children: "Trusted by Leading Companies"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-8 items-center", children: CLIENT_LOGOS.map((logo) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-bold text-lg",
              style: { color: "var(--ew-gray-mid)", filter: "grayscale(1)" },
              children: logo
            },
            logo
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16", style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto block", children: "What Companies Say" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "bg-white rounded-2xl p-6 shadow-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-bold px-2.5 py-0.5 rounded-full",
                style: {
                  background: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)"
                },
                children: t.badge
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm mt-3 mb-4 italic",
                style: { color: "var(--ew-text-lt)" },
                children: [
                  '"',
                  t.text,
                  '"'
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-sm",
                  style: { color: "var(--ew-text)" },
                  children: t.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-red)" }, children: t.company })
            ] })
          ]
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "quote-form", className: "py-16 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mx-auto block", children: "Get a Custom Quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm", style: { color: "var(--ew-text-lt)" }, children: "Fill in your requirements and our corporate team will create a tailored itinerary within 4 hours." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit(onSubmit),
          className: "rounded-2xl p-8 shadow-card space-y-4",
          style: { border: "1px solid var(--ew-gray-mid)" },
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-company",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Company Name *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "corp-company",
                    type: "text",
                    ...register("company", { required: true }),
                    className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.company.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-name",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Contact Person *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "corp-name",
                    type: "text",
                    ...register("contactName", { required: true }),
                    className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.contact_name.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-email",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Work Email *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "corp-email",
                    type: "email",
                    ...register("email", { required: true }),
                    className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.email.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-phone",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Phone *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "corp-phone",
                    type: "tel",
                    ...register("phone", { required: true }),
                    className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.phone.input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-group",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Team Size"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "corp-group",
                    ...register("groupSize"),
                    className: "w-full rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.group_size.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "10–25 people" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "25–50 people" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "50–100 people" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "100+ people" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "corp-budget",
                    className: "block text-sm font-semibold mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Budget per Person"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    id: "corp-budget",
                    ...register("budget"),
                    className: "w-full rounded-lg px-3 py-2.5 bg-white text-sm focus:outline-none",
                    style: { border: "1px solid var(--ew-gray-mid)" },
                    "data-ocid": "corporate.budget.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Under ₹5,000" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "₹5,000–₹10,000" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "₹10,000–₹20,000" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "₹20,000+" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "corp-dates",
                  className: "block text-sm font-semibold mb-1",
                  style: { color: "var(--ew-text)" },
                  children: "Preferred Month"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "corp-dates",
                  type: "text",
                  placeholder: "e.g., June 2025",
                  ...register("preferredDates"),
                  className: "w-full rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none",
                  style: { border: "1px solid var(--ew-gray-mid)" },
                  "data-ocid": "corporate.dates.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "corp-requirements",
                  className: "block text-sm font-semibold mb-1",
                  style: { color: "var(--ew-text)" },
                  children: "Special Requirements"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "corp-requirements",
                  rows: 4,
                  ...register("requirements"),
                  placeholder: "Tell us about your goals, preferred location, activities, dietary needs...",
                  className: "w-full rounded-lg px-3 py-2.5 text-sm resize-none bg-white focus:outline-none",
                  style: { border: "1px solid var(--ew-gray-mid)" },
                  "data-ocid": "corporate.requirements.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: isSubmitting,
                className: "btn-primary w-full justify-center disabled:opacity-50",
                "data-ocid": "corporate.submit_button",
                children: "Request Custom Quote"
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  CorporatePage as default
};
