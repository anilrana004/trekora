import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { S as SEOHead } from "./SEOHead-CgkIidI5.js";
import { m as motion, b as UTTARAKHAND_YATRAS, c as HIMACHAL_YATRAS, Y as YATRAS } from "./index-C6rgoof8.js";
import { a4 as CircleAlert, J as Clock, a as MapPin, w as ChevronRight } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const SIGNIFICANCE_LABELS = {
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
  "churdhar-yatra": "Shirgul Maharaj"
};
function YatrasPage() {
  const [tab, setTab] = reactExports.useState("all");
  const [formState, setFormState] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    yatra: "",
    message: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const list = tab === "uttarakhand" ? UTTARAKHAND_YATRAS : tab === "himachal" ? HIMACHAL_YATRAS : YATRAS;
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-16 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SEOHead,
      {
        title: "Himalayan Yatras 2025 — Sacred Pilgrimage Packages | EternaWings",
        description: "Book Char Dham, Panch Kedar, Panch Badri, Mani Mahesh and other sacred Himalayan yatras. Expert spiritual guides, all-inclusive packages with EternaWings.",
        keywords: "Char Dham yatra, Panch Kedar, Himalayan pilgrimage, sacred yatra India, EternaWings yatra",
        canonical: "https://www.eternawings.com/yatras"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative overflow-hidden",
        style: { backgroundColor: "var(--ew-red)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "absolute bottom-0 left-0 w-full opacity-10 pointer-events-none",
              viewBox: "0 0 1440 180",
              preserveAspectRatio: "none",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M0 180L120 90L240 150L360 60L480 120L600 40L720 100L840 30L960 110L1080 50L1200 120L1320 70L1440 130L1440 180Z",
                    fill: "white"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M0 180L180 110L360 155L540 80L720 130L900 55L1080 120L1260 75L1440 145L1440 180Z",
                    fill: "white",
                    opacity: "0.5"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "absolute right-8 top-4 opacity-10 pointer-events-none hidden md:block",
              width: "200",
              height: "200",
              viewBox: "0 0 200 200",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "90",
                    stroke: "white",
                    strokeWidth: "1.5",
                    fill: "none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "70",
                    stroke: "white",
                    strokeWidth: "1",
                    fill: "none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    cx: "100",
                    cy: "100",
                    r: "50",
                    stroke: "white",
                    strokeWidth: "1",
                    fill: "none"
                  }
                ),
                [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "line",
                  {
                    x1: "100",
                    y1: "10",
                    x2: "100",
                    y2: "190",
                    stroke: "white",
                    strokeWidth: "0.8",
                    style: {
                      transformOrigin: "100px 100px",
                      transform: `rotate(${deg}deg)`
                    }
                  },
                  deg
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "8", fill: "white", opacity: "0.6" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55 },
              className: "text-center text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs font-semibold uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full mb-4", children: "Sacred Journeys" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-3 text-shadow", children: "Sacred Himalayan Yatras" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/85 text-lg max-w-2xl mx-auto mb-6", children: "Journey Beyond the Ordinary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm max-w-xl mx-auto", children: "Embark on timeless pilgrimages across Uttarakhand and Himachal Pradesh — from the sacred Char Dham circuit to the mystical heights of Kinnaur Kailash." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-white shadow-sm py-3 sticky top-16 z-20 border-b",
        style: { borderColor: "var(--ew-gray-mid)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 flex items-center gap-3 justify-center flex-wrap", children: ["all", "uttarakhand", "himachal"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(t),
            className: `px-6 py-2 rounded-full text-sm font-semibold transition-all border-2 ${tab === t ? "text-white border-transparent" : "bg-transparent border-current hover:opacity-80"}`,
            style: tab === t ? {
              backgroundColor: "var(--ew-red)",
              borderColor: "var(--ew-red)"
            } : { color: "var(--ew-gray-dark)" },
            "data-ocid": `yatras.filter.${t}`,
            children: t === "all" ? "All Yatras" : t === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"
          },
          t
        )) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", style: { backgroundColor: "var(--ew-red-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "container mx-auto px-4 flex items-center justify-center gap-2 text-sm font-medium",
        style: { color: "var(--ew-red)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 15 }),
          "Register early — spots fill fast for the 2025 yatra season"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-12", style: { backgroundColor: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7", children: list.map((yatra, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07 },
        className: "card",
        "data-ocid": `yatra.card.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-52 overflow-hidden trek-card-img", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: yatra.image,
                alt: yatra.name,
                className: "w-full h-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white",
                style: { backgroundColor: "var(--ew-red)" },
                children: SIGNIFICANCE_LABELS[yatra.slug] ?? (yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full",
                style: {
                  backgroundColor: "var(--ew-red-lt)",
                  color: "var(--ew-red)"
                },
                children: yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-bold text-lg mb-1",
                style: { color: "var(--ew-text)" },
                children: yatra.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-sm line-clamp-2 mb-3",
                style: { color: "var(--ew-text-lt)" },
                children: yatra.significance
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-4 text-xs mb-3",
                style: { color: "var(--ew-gray-dark)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                    " ",
                    yatra.duration,
                    " Days"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12 }),
                    " ",
                    yatra.startPoint
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between pt-3 border-t",
                style: { borderColor: "var(--ew-gray-mid)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs",
                        style: { color: "var(--ew-gray-dark)" },
                        children: "Starting from"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "font-bold text-lg",
                        style: { color: "var(--ew-orange)" },
                        children: [
                          "₹",
                          yatra.price.toLocaleString("en-IN")
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/yatras/$slug",
                      params: { slug: yatra.slug },
                      className: "btn-secondary text-sm",
                      "data-ocid": `yatra.view_button.${i + 1}`,
                      children: [
                        "View Yatra ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14 })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ]
      },
      yatra.id
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-14 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title mb-6", children: "What is a Himalayan Yatra?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-base leading-relaxed",
              style: { color: "var(--ew-text-lt)" },
              children: "A yatra is a sacred pilgrimage undertaken to seek the blessings of divine deities enshrined in remote Himalayan peaks and valleys. Unlike recreational trekking, a yatra is a deeply spiritual journey — a rite of passage for millions of Hindus and Sikhs. The routes traverse ancient trade paths, dense forests, glacial meadows, and high mountain passes, leading pilgrims to temples, shrines, and sacred lakes that have been revered for thousands of years. EternaWings guides you through these transformative journeys with expert support, ensuring your safety and comfort while preserving the sanctity of each sacred destination."
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16",
        style: { backgroundColor: "var(--ew-gray-lt)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-semibold uppercase tracking-wider",
                    style: { color: "var(--ew-orange)" },
                    children: "Plan Your Pilgrimage"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "text-3xl font-bold mt-2",
                    style: { color: "var(--ew-text)" },
                    children: "Send an Inquiry"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm", style: { color: "var(--ew-text-lt)" }, children: "Our yatra specialists will help you plan the perfect sacred journey." })
              ]
            }
          ),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-8 text-center shadow-card",
              "data-ocid": "yatras.form.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-3", children: "🙏" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-bold text-xl mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "Inquiry Received!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm mb-5",
                    style: { color: "var(--ew-text-lt)" },
                    children: "Our yatra specialists will contact you within 24 hours."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20a%20yatra%20package",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-primary",
                    "data-ocid": "yatras.whatsapp_button",
                    children: "💬 Chat on WhatsApp Now"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "bg-white rounded-2xl p-7 shadow-card space-y-4",
              "data-ocid": "yatras.inquiry_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "yatra-name",
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Full Name *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "yatra-name",
                        type: "text",
                        required: true,
                        value: formState.name,
                        onChange: (e) => setFormState((s) => ({ ...s, name: e.target.value })),
                        placeholder: "Your full name",
                        className: "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2",
                        style: {
                          borderColor: "var(--ew-gray-mid)",
                          "--tw-ring-color": "var(--ew-red)"
                        },
                        "data-ocid": "yatras.name.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "yatra-email",
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Email Address *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "yatra-email",
                        type: "email",
                        required: true,
                        value: formState.email,
                        onChange: (e) => setFormState((s) => ({ ...s, email: e.target.value })),
                        placeholder: "your@email.com",
                        className: "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2",
                        style: {
                          borderColor: "var(--ew-gray-mid)"
                        },
                        "data-ocid": "yatras.email.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "yatra-phone",
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Phone Number *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "yatra-phone",
                        type: "tel",
                        required: true,
                        value: formState.phone,
                        onChange: (e) => setFormState((s) => ({ ...s, phone: e.target.value })),
                        placeholder: "+91 XXXXX XXXXX",
                        className: "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2",
                        style: {
                          borderColor: "var(--ew-gray-mid)"
                        },
                        "data-ocid": "yatras.phone.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "yatra-preferred",
                        className: "block text-sm font-medium mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Preferred Yatra"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "yatra-preferred",
                        value: formState.yatra,
                        onChange: (e) => setFormState((s) => ({ ...s, yatra: e.target.value })),
                        className: "w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2",
                        style: {
                          borderColor: "var(--ew-gray-mid)"
                        },
                        "data-ocid": "yatras.yatra.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a yatra" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Uttarakhand", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Char Dham Yatra" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Panch Kedar" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Panch Badri" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Hemkund Sahib" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Adi Kailash & Om Parvat" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("optgroup", { label: "Himachal Pradesh", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mani Mahesh Yatra" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Kinnaur Kailash Parikrama" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Shrikhand Mahadev Yatra" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Churdhar Yatra" })
                          ] })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "yatra-message",
                      className: "block text-sm font-medium mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "Message"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "yatra-message",
                      rows: 3,
                      value: formState.message,
                      onChange: (e) => setFormState((s) => ({ ...s, message: e.target.value })),
                      placeholder: "Tell us about your group size, preferred dates, and any special requirements...",
                      className: "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      "data-ocid": "yatras.message.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "submit",
                      className: "btn-primary flex-1 justify-center",
                      "data-ocid": "yatras.inquiry.submit_button",
                      children: "Send Inquiry"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://wa.me/919999999999?text=Hi%20I%20am%20interested%20in%20yatra",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-full hover:bg-green-600 transition-colors text-sm",
                      "data-ocid": "yatras.whatsapp_button",
                      children: "💬 WhatsApp Us"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  YatrasPage as default
};
