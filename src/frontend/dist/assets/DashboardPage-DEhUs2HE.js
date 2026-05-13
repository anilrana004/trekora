import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { m as motion, u as ue } from "./index-C6rgoof8.js";
import { L as LayoutDashboard, ab as Calendar, ai as CircleCheckBig, k as Heart, aj as Trophy, ak as Gift, l as User, O as CircleX, al as Headphones, B as BookOpen, G as Download, K as Star, am as Wallet, an as Lock, ac as Copy, Q as Share2 } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const MOCK_BOOKINGS = [
  {
    id: "TK240512",
    trek: "Roopkund Trek",
    dates: "Sep 15–22, 2024",
    status: "Completed",
    amount: 12e3,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    location: "Uttarakhand"
  },
  {
    id: "TK250103",
    trek: "Kedarkantha Trek",
    dates: "Dec 20–25, 2025",
    status: "Confirmed",
    amount: 8500,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    location: "Uttarakhand"
  },
  {
    id: "TK250218",
    trek: "Hampta Pass",
    dates: "Jun 12–16, 2025",
    status: "Pending",
    amount: 9500,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    location: "Himachal Pradesh"
  }
];
const PAST_TREKS = [
  {
    name: "Triund",
    image: "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?w=400&q=80"
  },
  {
    name: "Valley of Flowers",
    image: "https://images.unsplash.com/photo-1444214518-a0e5c3b8b8c4?w=400&q=80"
  },
  {
    name: "Roopkund",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80"
  }
];
const STATUS_CONFIG = {
  Completed: { label: "Completed", color: "var(--ew-green)", bg: "#e8f5e9" },
  Confirmed: {
    label: "Confirmed",
    color: "var(--ew-orange)",
    bg: "var(--ew-orange-lt)"
  },
  Pending: {
    label: "Pending",
    color: "var(--ew-gray-dark)",
    bg: "var(--ew-gray-lt)"
  },
  Cancelled: {
    label: "Cancelled",
    color: "var(--ew-red)",
    bg: "var(--ew-red-lt)"
  }
};
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "My Bookings", id: "bookings" },
  { icon: Calendar, label: "Upcoming Treks", id: "upcoming" },
  { icon: CircleCheckBig, label: "Past Treks", id: "past" },
  { icon: Heart, label: "Wishlist", id: "wishlist" },
  { icon: Trophy, label: "Badges & Points", id: "badges" },
  { icon: Gift, label: "Refer & Earn", id: "referral" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: CircleX, label: "Cancellations", id: "cancellations" },
  { icon: Headphones, label: "Support", id: "support" }
];
function DashboardPage() {
  const [activeTab, setActiveTab] = reactExports.useState("bookings");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pt-20 min-h-screen pb-10",
      style: { background: "var(--ew-gray-lt)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-5xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            className: "mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg",
                  style: { background: "var(--ew-red)" },
                  children: "R"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-2xl font-bold",
                    style: { color: "var(--ew-text)" },
                    children: "My Trekora Account"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "Where Every Peak Tells a Story" })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "md:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3 border-b",
                  style: { borderColor: "var(--ew-gray-mid)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🏔️" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "font-bold text-sm",
                        style: { color: "var(--ew-red)" },
                        children: "Trekora"
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "p-2", children: NAV_ITEMS.map(({ icon: Icon, label, id }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveTab(id),
                  className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left",
                  style: {
                    background: activeTab === id ? "var(--ew-red-lt)" : "transparent",
                    color: activeTab === id ? "var(--ew-red)" : "var(--ew-text-lt)"
                  },
                  "data-ocid": `dashboard.nav.${id}.tab`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        size: 16,
                        style: {
                          color: activeTab === id ? "var(--ew-red)" : "var(--ew-gray-dark)"
                        }
                      }
                    ),
                    label
                  ]
                },
                id
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-card p-4 mt-4 space-y-3", children: [
              {
                icon: BookOpen,
                label: "Total Treks",
                value: 3,
                color: "var(--ew-orange)"
              },
              {
                icon: Calendar,
                label: "Upcoming",
                value: 2,
                color: "var(--ew-green)"
              },
              {
                icon: Download,
                label: "Completed",
                value: 1,
                color: "var(--ew-red)"
              }
            ].map(({ icon: Icon, label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-xl flex items-center justify-center",
                  style: { background: "var(--ew-gray-lt)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, style: { color } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg font-bold leading-none",
                    style: { color: "var(--ew-text)" },
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs",
                    style: { color: "var(--ew-gray-dark)" },
                    children: label
                  }
                )
              ] })
            ] }, label)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 space-y-4", children: [
            activeTab === "bookings" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "px-5 py-4 border-b flex items-center justify-between",
                      style: { borderColor: "var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "h2",
                          {
                            className: "font-bold",
                            style: { color: "var(--ew-text)" },
                            children: "Trek Bookings"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Link,
                          {
                            to: "/treks",
                            className: "text-sm font-semibold hover:underline",
                            style: { color: "var(--ew-orange)" },
                            "data-ocid": "dashboard.browse_treks_button",
                            children: "Browse More Treks"
                          }
                        )
                      ]
                    }
                  ),
                  MOCK_BOOKINGS.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "p-12 text-center",
                      "data-ocid": "dashboard.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-2xl font-bold mb-2",
                            style: { color: "var(--ew-text)" },
                            children: "No bookings yet"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "mb-6",
                            style: { color: "var(--ew-gray-dark)" },
                            children: "Your trek adventures start here!"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Book Your First Trek" })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "divide-y",
                      style: { borderColor: "var(--ew-gray-lt)" },
                      children: MOCK_BOOKINGS.map((booking, i) => {
                        const st = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.Pending;
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "p-5 flex items-center gap-4 flex-wrap",
                            "data-ocid": `dashboard.booking.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "img",
                                {
                                  src: booking.image,
                                  alt: booking.trek,
                                  className: "w-16 h-16 rounded-xl object-cover shrink-0 hidden sm:block"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "p",
                                  {
                                    className: "font-bold truncate",
                                    style: { color: "var(--ew-text)" },
                                    children: booking.trek
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    className: "text-sm",
                                    style: { color: "var(--ew-text-lt)" },
                                    children: [
                                      booking.dates,
                                      " · ",
                                      booking.location
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "p",
                                  {
                                    className: "text-xs mt-0.5",
                                    style: { color: "var(--ew-gray-dark)" },
                                    children: [
                                      "Booking ID: ",
                                      booking.id
                                    ]
                                  }
                                )
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "span",
                                  {
                                    className: "text-xs font-semibold px-3 py-1 rounded-full",
                                    style: { background: st.bg, color: st.color },
                                    children: st.label
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "font-bold",
                                    style: { color: "var(--ew-orange)" },
                                    children: [
                                      "₹",
                                      booking.amount.toLocaleString("en-IN")
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "button",
                                  {
                                    type: "button",
                                    className: "btn-secondary text-xs py-1.5 px-4",
                                    "data-ocid": `dashboard.download_button.${i + 1}`,
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                                      "Voucher"
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "button",
                                  {
                                    type: "button",
                                    className: "text-xs font-semibold hover:underline",
                                    style: { color: "var(--ew-red)" },
                                    children: "Cancel"
                                  }
                                )
                              ] })
                            ]
                          },
                          booking.id
                        );
                      })
                    }
                  )
                ] })
              }
            ),
            activeTab === "past" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold mb-4",
                      style: { color: "var(--ew-text)" },
                      children: "Past Treks Gallery"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: PAST_TREKS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "relative group rounded-xl overflow-hidden aspect-square",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: t.image,
                            alt: t.name,
                            className: "w-full h-full object-cover"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                            style: { background: "rgba(192,0,28,0.8)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 20, className: "text-white" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "button",
                                {
                                  type: "button",
                                  className: "text-white text-xs font-bold hover:underline",
                                  children: "Write Review"
                                }
                              )
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "absolute bottom-0 left-0 right-0 px-2 py-1.5",
                            style: {
                              background: "linear-gradient(transparent, rgba(0,0,0,0.7))"
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-xs font-semibold", children: t.name })
                          }
                        )
                      ]
                    },
                    t.name
                  )) })
                ] })
              }
            ),
            activeTab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold mb-5",
                      style: { color: "var(--ew-text)" },
                      children: "My Profile"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                    {
                      label: "Full Name",
                      placeholder: "Rahul Sharma",
                      type: "text"
                    },
                    {
                      label: "Email",
                      placeholder: "rahul@gmail.com",
                      type: "email"
                    },
                    {
                      label: "Phone",
                      placeholder: "+91 98765 43210",
                      type: "tel"
                    },
                    { label: "City", placeholder: "New Delhi", type: "text" }
                  ].map(({ label, placeholder, type }) => {
                    const fieldId = `profile-${label.toLowerCase().replace(/\s+/g, "-")}`;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: fieldId,
                          className: "block text-sm font-semibold mb-1",
                          style: { color: "var(--ew-red)" },
                          children: label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: fieldId,
                          type,
                          placeholder,
                          className: "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition-colors",
                          style: {
                            borderColor: "var(--ew-gray-mid)",
                            "--tw-ring-color": "var(--ew-red)"
                          }
                        }
                      )
                    ] }, label);
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn-primary mt-5", children: "Save Changes" })
                ] })
              }
            ),
            ["upcoming", "wishlist", "cancellations", "support"].includes(
              activeTab
            ) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "bg-white rounded-2xl shadow-card p-10 text-center",
                    "data-ocid": `dashboard.${activeTab}.empty_state`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl mb-3", children: "🏔️" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "p",
                        {
                          className: "font-bold text-lg mb-2",
                          style: { color: "var(--ew-text)" },
                          children: [
                            activeTab === "upcoming" && "No Upcoming Treks",
                            activeTab === "wishlist" && "Your Wishlist is Empty",
                            activeTab === "cancellations" && "No Cancellations",
                            activeTab === "support" && "Support"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "mb-5 text-sm",
                          style: { color: "var(--ew-gray-dark)" },
                          children: activeTab === "support" ? "Reach our trek experts anytime" : "Explore our treks and start your Himalayan journey"
                        }
                      ),
                      activeTab === "support" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "https://wa.me/919999999999",
                          className: "btn-primary",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: "WhatsApp Us"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Explore Treks" })
                    ]
                  }
                )
              }
            ),
            activeTab === "badges" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "font-bold mb-4",
                        style: { color: "var(--ew-text)" },
                        children: "🏔️ Altitude Badges"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm mb-4",
                        style: { color: "var(--ew-gray-dark)" },
                        children: "Earn altitude badges by completing treks above the threshold elevation."
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                      { label: "3000m Club", threshold: 3e3, achieved: true },
                      { label: "4000m Club", threshold: 4e3, achieved: false },
                      { label: "5000m Club", threshold: 5e3, achieved: false }
                    ].map(({ label, threshold, achieved }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-4 text-center",
                        style: {
                          background: achieved ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
                          border: `1px solid ${achieved ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`
                        },
                        "data-ocid": `dashboard.badge.${label.replace(" ", "_").toLowerCase()}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl mb-2", children: achieved ? "🏔" : "🔒" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: "font-bold text-sm",
                              style: {
                                color: achieved ? "var(--ew-orange)" : "var(--ew-gray-dark)"
                              },
                              children: label
                            }
                          ),
                          achieved ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "mt-1 inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full",
                              style: {
                                background: "var(--ew-orange)",
                                color: "#fff"
                              },
                              children: "Earned!"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "mt-1 text-[11px]",
                              style: { color: "var(--ew-gray-dark)" },
                              children: [
                                "Complete a trek above ",
                                threshold,
                                "m to unlock"
                              ]
                            }
                          )
                        ]
                      },
                      label
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "h2",
                      {
                        className: "font-bold mb-4 flex items-center gap-2",
                        style: { color: "var(--ew-text)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 18, style: { color: "var(--ew-orange)" } }),
                          "Points & Wallet"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl p-4",
                          style: {
                            background: "var(--ew-orange-lt)",
                            border: "1px solid var(--ew-orange)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-3xl font-bold",
                                style: { color: "var(--ew-orange)" },
                                children: "100"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm font-medium mt-1",
                                style: { color: "var(--ew-text)" },
                                children: "Total Points"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs mt-0.5",
                                style: { color: "var(--ew-gray-dark)" },
                                children: "Earn 100 points per completed trek"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "rounded-xl p-4",
                          style: {
                            background: "#e8f5e9",
                            border: "1px solid var(--ew-green)"
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-3xl font-bold",
                                style: { color: "var(--ew-green)" },
                                children: "₹0"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-sm font-medium mt-1",
                                style: { color: "var(--ew-text)" },
                                children: "Wallet Balance"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-xs mt-0.5",
                                style: { color: "var(--ew-gray-dark)" },
                                children: "Earned via referrals (₹500/referral)"
                              }
                            )
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "mt-4 rounded-xl p-3 text-sm",
                        style: {
                          background: "var(--ew-gray-lt)",
                          border: "1px solid var(--ew-gray-mid)"
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "p",
                            {
                              className: "font-medium",
                              style: { color: "var(--ew-text)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  Lock,
                                  {
                                    size: 13,
                                    className: "inline mr-1",
                                    style: { color: "var(--ew-orange)" }
                                  }
                                ),
                                "How to earn more points"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "ul",
                            {
                              className: "mt-1.5 space-y-1 text-xs",
                              style: { color: "var(--ew-text-lt)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• 100 points per completed trek" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Refer a friend → earn ₹500 wallet credit" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Redeem points on your next booking" })
                              ]
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            activeTab === "referral" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "🔗 Refer & Earn"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "p",
                    {
                      className: "text-sm mb-5",
                      style: { color: "var(--ew-gray-dark)" },
                      children: [
                        "Share your referral link. When a friend books using your link, you earn",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "var(--ew-orange)" }, children: " ₹500" }),
                        " ",
                        "in wallet credits!"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4 mb-4",
                      style: {
                        background: "var(--ew-gray-lt)",
                        border: "1px dashed var(--ew-orange)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-xs font-semibold mb-1",
                            style: { color: "var(--ew-gray-dark)" },
                            children: "Your Referral Code"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-2xl font-bold tracking-widest font-mono",
                            style: { color: "var(--ew-red)" },
                            "data-ocid": "dashboard.referral.code",
                            children: "TK-RAHUL42"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 rounded-xl px-3 py-2 mb-4",
                      style: {
                        background: "var(--ew-orange-lt)",
                        border: "1px solid var(--ew-orange)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "flex-1 truncate text-sm",
                            style: { color: "var(--ew-text-lt)" },
                            children: typeof window !== "undefined" ? `${window.location.origin}?ref=TK-RAHUL42` : ""
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              const link = `${window.location.origin}?ref=TK-RAHUL42`;
                              navigator.clipboard.writeText(link).catch(() => null);
                              ue.success("Referral link copied!");
                            },
                            className: "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-colors",
                            style: {
                              background: "var(--ew-orange)",
                              color: "#fff"
                            },
                            "data-ocid": "dashboard.referral.copy_link_button",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 12 }),
                              " Copy Link"
                            ]
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "a",
                    {
                      href: `https://wa.me/?text=${encodeURIComponent(
                        `Join me on Trekora! Use my referral code TK-RAHUL42 for your first trek: ${typeof window !== "undefined" ? `${window.location.origin}?ref=TK-RAHUL42` : ""}`
                      )}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-semibold",
                      style: {
                        background: "#e8f5e9",
                        color: "#2E7D32",
                        border: "1px solid #2E7D32"
                      },
                      "data-ocid": "dashboard.referral.whatsapp_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 15 }),
                        " Share via WhatsApp"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "mt-4 rounded-xl p-3 text-sm",
                      style: {
                        background: "var(--ew-gray-lt)",
                        border: "1px solid var(--ew-gray-mid)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--ew-text-lt)" }, children: "👉 Every time a friend books a trek using your referral link, ₹500 is credited to your Trekora wallet automatically." })
                    }
                  )
                ] })
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  DashboardPage as default
};
