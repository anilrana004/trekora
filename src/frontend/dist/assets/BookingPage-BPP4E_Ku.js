import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { T as TREKS, u as ue, e as useForm } from "./index-C6rgoof8.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-JpGNVgMw.js";
import { v as ChevronLeft, w as ChevronRight, af as Check, ag as ClipboardCopy, j as MessageCircle, ah as Trash2, a2 as Plus, n as LoaderCircle } from "./icons-DrFRvHmE.js";
import "./motion-CnUkbXTC.js";
const ADD_ONS = [
  {
    id: "gear",
    icon: "🎒",
    label: "Gear Rental Pack",
    desc: "Trekking poles, crampons, gaiters",
    price: 800,
    perPerson: true
  },
  {
    id: "insurance",
    icon: "🛡️",
    label: "Personal Travel Insurance",
    desc: "Comprehensive mountain coverage",
    price: 350,
    perPerson: true
  },
  {
    id: "transport",
    icon: "🚌",
    label: "Base Camp Transport",
    desc: "Pickup from Dehradun / Shimla",
    price: 1200,
    perPerson: false
  },
  {
    id: "photographer",
    icon: "📸",
    label: "Trek Photographer",
    desc: "Professional photos & reels",
    price: 2500,
    perPerson: false
  },
  {
    id: "porter",
    icon: "🥾",
    label: "Porter for Luggage",
    desc: "Personal luggage porter service",
    price: 1800,
    perPerson: true
  }
];
const CITIES = [
  "Delhi",
  "Mumbai",
  "Pune",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Dehradun",
  "Other"
];
const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
  "Don't Know"
];
const MEDICAL_CONDITIONS = [
  { id: "heart", icon: "❤️", label: "Heart condition or High blood pressure" },
  { id: "diabetes", icon: "🩸", label: "Diabetes (Type 1 or Type 2)" },
  { id: "asthma", icon: "🫁", label: "Asthma or respiratory issues" },
  { id: "epilepsy", icon: "🧠", label: "Epilepsy or seizure disorder" },
  { id: "joints", icon: "🦵", label: "Knee, hip, or joint problems" },
  { id: "none", icon: "✅", label: "None of the above" }
];
const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const STEP_LABELS = [
  "Select Date",
  "Your Details",
  "Health Info",
  "Documents",
  "Preferences",
  "Review"
];
const DEFAULT_FORM = {
  batchDate: null,
  groupSize: 2,
  addOns: [],
  fullName: "",
  email: "",
  mobile: "",
  whatsappSame: true,
  whatsapp: "",
  city: "",
  age: "",
  gender: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  bloodGroup: "",
  medicalConditions: [],
  medicalOther: "",
  fitnessLevel: "",
  hasTrekked: false,
  longestTrek: "",
  idProofUploaded: false,
  photoUploaded: false,
  hasCoTravelers: false,
  coTravelers: [],
  heardFrom: "",
  dietary: [],
  accommodationNote: "",
  needsTransport: false,
  transportCity: "",
  transportDate: "",
  contactMode: ["WhatsApp"],
  promoCode: "",
  promoApplied: false,
  promoDiscount: 0,
  otherNotes: "",
  termsAccepted: false
};
function formatINR(n) {
  return n.toLocaleString("en-IN");
}
function generateRef() {
  return `EW-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
}
function calcAddOnsTotal(addOns, groupSize) {
  return ADD_ONS.filter((a) => addOns.includes(a.id)).reduce(
    (sum, a) => sum + (a.perPerson ? a.price * groupSize : a.price),
    0
  );
}
function calcPrices(unitPrice, groupSize, addOns, promoDiscount) {
  const base = unitPrice * groupSize;
  const groupDiscount = groupSize >= 5 ? Math.round(base * 0.15) : 0;
  const afterGroup = base - groupDiscount;
  const addOnsTotal = calcAddOnsTotal(addOns, groupSize);
  const subtotal = afterGroup + addOnsTotal;
  const gst = Math.round(subtotal * 0.05);
  const promoSavings = Math.round(subtotal * promoDiscount);
  const grandTotal = subtotal + gst - promoSavings;
  return {
    base,
    groupDiscount,
    afterGroup,
    addOnsTotal,
    subtotal,
    gst,
    promoSavings,
    grandTotal
  };
}
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center overflow-x-auto pb-1", children: STEP_LABELS.map((label, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
          style: {
            background: i < current ? "#22C55E" : i === current ? "#C0001C" : "var(--ew-gray-mid)",
            color: i <= current ? "#fff" : "var(--ew-gray-dark)"
          },
          children: i < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }) : i + 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[10px] mt-1 font-medium whitespace-nowrap",
          style: {
            color: i === current ? "#C0001C" : i < current ? "#22C55E" : "var(--ew-gray-dark)"
          },
          children: label
        }
      )
    ] }),
    i < STEP_LABELS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 sm:w-12 h-0.5 mx-1 mb-4 flex-shrink-0 transition-colors",
        style: {
          background: i < current ? "#22C55E" : "var(--ew-gray-mid)"
        }
      }
    )
  ] }, label)) });
}
function BatchCalendar({
  batches,
  selectedDate,
  onSelectDate,
  isLoading
}) {
  const today = reactExports.useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewYear, setViewYear] = reactExports.useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = reactExports.useState(() => today.getMonth());
  const batchMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const b of batches) {
      if (!b.isActive) continue;
      const ms = Number(b.batchDate) / 1e6;
      const d = new Date(ms);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      map.set(key, b);
    }
    return map;
  }, [batches]);
  const calendarDays = reactExports.useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    let startOffset = firstOfMonth.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++)
      cells.push(new Date(viewYear, viewMonth, d));
    return cells;
  }, [viewYear, viewMonth]);
  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  }
  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("en-IN", {
    month: "long",
    year: "numeric"
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border p-4 space-y-3",
        style: { borderColor: "var(--ew-gray-mid)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-5 w-32 rounded animate-pulse",
                style: { background: "var(--ew-gray-mid)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-7 w-7 rounded-full animate-pulse",
                  style: { background: "var(--ew-gray-mid)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-7 w-7 rounded-full animate-pulse",
                  style: { background: "var(--ew-gray-mid)" }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: 35 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-9 rounded-md animate-pulse",
              style: { background: "var(--ew-gray-mid)", opacity: 0.5 }
            },
            `sk-${i + 1}`
          )) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border overflow-hidden",
      style: { borderColor: "var(--ew-gray-mid)" },
      "data-ocid": "booking.calendar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3",
            style: { background: "var(--ew-gray-lt)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: prevMonth,
                  className: "p-1 rounded-full transition-colors hover:opacity-70",
                  style: { color: "#C0001C" },
                  "aria-label": "Previous month",
                  "data-ocid": "booking.calendar.prev_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", style: { color: "var(--ew-text)" }, children: monthLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: nextMonth,
                  className: "p-1 rounded-full transition-colors hover:opacity-70",
                  style: { color: "#C0001C" },
                  "aria-label": "Next month",
                  "data-ocid": "booking.calendar.next_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-7 text-center py-1 px-2",
            style: {
              background: "var(--ew-gray-lt)",
              borderBottom: "1px solid var(--ew-gray-mid)"
            },
            children: DAYS_OF_WEEK.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xs font-semibold py-1",
                style: { color: "var(--ew-gray-dark)" },
                children: d
              },
              d
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 p-2", children: calendarDays.map((date, idx) => {
          if (!date)
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `pad-${viewYear}-${viewMonth}-${idx + 1}`);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          const batch = batchMap.get(key);
          const isPast = date < today;
          const isSelected = selectedDate === key;
          const isFull = batch && Number(batch.availableSlots) === 0;
          const isAvailable = batch && Number(batch.availableSlots) > 0;
          const slots = batch ? Number(batch.availableSlots) : 0;
          let cellStyle = {};
          let cellClass = "relative flex flex-col items-center justify-center h-10 rounded-md text-xs font-medium transition-all ";
          if (isAvailable) {
            cellClass += "cursor-pointer hover:opacity-80 ";
            cellStyle = { background: "#2E7D32", color: "#fff" };
          } else if (isFull) {
            cellClass += "cursor-not-allowed line-through ";
            cellStyle = { background: "#EBEBEB", color: "#888" };
          } else if (isPast) {
            cellClass += "cursor-not-allowed opacity-40 ";
            cellStyle = { color: "var(--ew-gray-dark)" };
          } else cellStyle = { color: "var(--ew-text-lt)" };
          if (isSelected && isAvailable)
            cellStyle = {
              ...cellStyle,
              outline: "2px solid #E87722",
              outlineOffset: "1px"
            };
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cellClass,
              style: cellStyle,
              onClick: () => isAvailable && onSelectDate(key, batch),
              onKeyDown: (e) => {
                if ((e.key === "Enter" || e.key === " ") && isAvailable)
                  onSelectDate(key, batch);
              },
              role: isAvailable ? "button" : void 0,
              tabIndex: isAvailable ? 0 : void 0,
              title: isAvailable ? `${slots} slot${slots !== 1 ? "s" : ""} available` : isFull ? "FULL" : void 0,
              "data-ocid": isAvailable ? "booking.calendar.available_date" : void 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: date.getDate() }),
                isFull && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[8px] font-bold leading-none mt-0.5",
                    style: { color: "#888" },
                    children: "FULL"
                  }
                ),
                isAvailable && slots <= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[8px] font-bold leading-none mt-0.5", children: [
                  slots,
                  "!"
                ] })
              ]
            },
            key
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-4 px-3 pb-3 text-xs",
            style: { color: "var(--ew-gray-dark)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded", style: { background: "#2E7D32" } }),
                " ",
                "Available"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-3 h-3 rounded",
                    style: { background: "#EBEBEB", border: "1px solid #ccc" }
                  }
                ),
                " ",
                "Full"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-3 h-3 rounded",
                    style: { outline: "2px solid #E87722" }
                  }
                ),
                " ",
                "Selected"
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SuccessScreen({
  bookingRef,
  trekName
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const copyRef = () => {
    navigator.clipboard.writeText(bookingRef).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      ue.success("Reference copied!");
    }).catch(() => ue.error("Could not copy"));
  };
  const waMsg = encodeURIComponent(
    `Hi Trekora! My booking reference is ${bookingRef} for ${trekName}. Please confirm my booking.`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-lg mx-auto text-center",
      "data-ocid": "booking.success_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 success-check-ring", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 40, className: "text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold mb-2",
            style: { color: "var(--ew-text)" },
            children: "Booking Request Submitted! 🎉"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-6", style: { color: "var(--ew-gray-dark)" }, children: "Our team will contact you within 2 hours to confirm your spot." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-5 mb-6 text-left",
            style: {
              background: "var(--ew-orange-lt)",
              border: "1px solid #E87722"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-semibold mb-1",
                  style: { color: "var(--ew-gray-dark)" },
                  children: "YOUR BOOKING REFERENCE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-2xl font-bold font-mono",
                    style: { color: "#C0001C" },
                    children: bookingRef
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: copyRef,
                    className: "flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors",
                    style: {
                      background: copied ? "#22C55E" : "#C0001C",
                      color: "#fff"
                    },
                    "data-ocid": "booking.copy_ref_button",
                    children: [
                      copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { size: 12 }),
                      copied ? "Copied!" : "Copy"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-5 mb-6 text-left",
            style: { background: "var(--ew-gray-lt)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-sm mb-4",
                  style: { color: "var(--ew-text)" },
                  children: "What happens next?"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
                { icon: "✅", text: "Your request is received", sub: "Right now" },
                { icon: "📞", text: "Our team calls you", sub: "Within 2 hours" },
                {
                  icon: "💳",
                  text: "Payment link sent",
                  sub: "Via WhatsApp & Email"
                },
                {
                  icon: "📄",
                  text: "Booking confirmation + PDF voucher",
                  sub: "On payment"
                }
              ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none mt-0.5", children: item.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-medium",
                      style: { color: "var(--ew-text)" },
                      children: item.text
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: item.sub })
                ] })
              ] }, `step-${i + 1}`)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `https://wa.me/919999999999?text=${waMsg}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold text-white transition-colors hover:opacity-90",
              style: { background: "#25D366" },
              "data-ocid": "booking.whatsapp_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
                "WhatsApp Our Team"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold border-2 transition-colors",
              style: {
                borderColor: "var(--ew-gray-mid)",
                color: "var(--ew-text-lt)"
              },
              "data-ocid": "booking.home_link",
              children: "← Back to Home"
            }
          )
        ] })
      ]
    }
  );
}
function Step1({
  fd,
  setFd,
  trek,
  batches,
  batchesLoading
}) {
  const [selectedBatchObj, setSelectedBatchObj] = reactExports.useState(null);
  const handleSelectDate = reactExports.useCallback(
    (dateStr, batch) => {
      setFd((prev) => ({ ...prev, batchDate: dateStr }));
      setSelectedBatchObj(batch);
    },
    [setFd]
  );
  const toggleAddOn = (id) => {
    setFd((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(id) ? prev.addOns.filter((a) => a !== id) : [...prev.addOns, id]
    }));
  };
  const unitPrice = reactExports.useMemo(() => {
    if ((selectedBatchObj == null ? void 0 : selectedBatchObj.priceOverride) != null)
      return Number(selectedBatchObj.priceOverride);
    return (trek == null ? void 0 : trek.price) ?? 0;
  }, [selectedBatchObj, trek]);
  const prices = calcPrices(unitPrice, fd.groupSize, fd.addOns, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    trek && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4 flex items-center gap-4",
        style: { background: "var(--ew-gray-lt)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trek.image,
              alt: trek.name,
              className: "w-16 h-16 rounded-lg object-cover flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold text-base truncate",
                style: { color: "var(--ew-text)" },
                children: trek.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
              trek.duration,
              " days · ",
              trek.difficulty
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", style: { color: "#C0001C" }, children: [
              "Rs.",
              formatINR(trek.price),
              "/person"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-semibold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Select Batch Date *"
        }
      ),
      !trek ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-xl border-2 border-dashed py-8 text-center text-sm",
          style: {
            borderColor: "var(--ew-gray-mid)",
            color: "var(--ew-gray-dark)"
          },
          children: "Select a trek to view available batch dates"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        BatchCalendar,
        {
          batches,
          selectedDate: fd.batchDate,
          onSelectDate: handleSelectDate,
          isLoading: batchesLoading
        }
      ),
      fd.batchDate && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-2 flex items-center justify-between rounded-lg px-4 py-2.5",
          style: {
            background: "var(--ew-orange-lt)",
            border: "1px solid #E87722"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-bold",
                  style: { color: "var(--ew-text)" },
                  children: new Date(fd.batchDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: selectedBatchObj ? `${Number(selectedBatchObj.availableSlots)} slots available` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                style: { background: "#E8F5E9", color: "#2E7D32" },
                children: "Selected ✓"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-semibold mb-2",
          style: { color: "var(--ew-text)" },
          children: "How many people are joining?"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFd((p) => ({ ...p, groupSize: Math.max(1, p.groupSize - 1) })),
            className: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors",
            style: {
              border: "2px solid var(--ew-gray-mid)",
              color: "var(--ew-text)"
            },
            "data-ocid": "booking.group_size.decrement_button",
            children: "−"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-2xl font-bold w-8 text-center",
            style: { color: "var(--ew-text)" },
            children: fd.groupSize
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFd((p) => ({ ...p, groupSize: Math.min(20, p.groupSize + 1) })),
            className: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors",
            style: {
              border: "2px solid var(--ew-gray-mid)",
              color: "var(--ew-text)"
            },
            "data-ocid": "booking.group_size.increment_button",
            children: "+"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "persons" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "p",
        {
          className: "mt-2 text-lg font-bold",
          style: { color: "var(--ew-orange)" },
          children: [
            "Total: Rs.",
            formatINR(prices.grandTotal)
          ]
        }
      ),
      fd.groupSize >= 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-2 rounded-lg px-4 py-2.5 text-sm font-semibold",
          style: {
            background: "#E8F5E9",
            color: "#2E7D32",
            border: "1px solid #a7d7a8"
          },
          children: [
            "🎉 15% Group Discount Applied! You save Rs.",
            formatINR(prices.groupDiscount)
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-semibold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Would you like any add-ons? (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ADD_ONS.map((addon) => {
        const checked = fd.addOns.includes(addon.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
            "data-ocid": `booking.addon.${addon.id}`,
            style: {
              border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
              background: checked ? "#FFF5F5" : "#fff"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked,
                  onChange: () => toggleAddOn(addon.id),
                  style: { accentColor: "#C0001C" },
                  className: "w-4 h-4 flex-shrink-0"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", children: addon.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "var(--ew-text)" },
                    children: addon.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs",
                    style: { color: "var(--ew-gray-dark)" },
                    children: addon.desc
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-sm font-bold flex-shrink-0",
                  style: { color: "#C0001C" },
                  children: [
                    "+Rs.",
                    formatINR(addon.price),
                    addon.perPerson ? "/person" : "/group"
                  ]
                }
              )
            ]
          },
          addon.id
        );
      }) })
    ] }),
    trek && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4 space-y-2 text-sm",
        style: { background: "var(--ew-gray-lt)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", style: { color: "var(--ew-text)" }, children: "Price Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
              "Base: Rs.",
              formatINR(unitPrice),
              " × ",
              fd.groupSize
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Rs.",
              formatINR(prices.base)
            ] })
          ] }),
          prices.groupDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: { color: "#22C55E" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Group discount (15%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−Rs.",
              formatINR(prices.groupDiscount)
            ] })
          ] }),
          prices.addOnsTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add-ons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+Rs.",
              formatINR(prices.addOnsTotal)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: "GST (5%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Rs.",
              formatINR(prices.gst)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between font-bold text-base border-t pt-2",
              style: { borderColor: "var(--ew-gray-mid)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "TOTAL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#E87722" }, children: [
                  "Rs.",
                  formatINR(prices.grandTotal)
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Step2({
  fd,
  setFd
}) {
  const {
    register,
    formState: { errors },
    trigger
    // getValues intentionally omitted — only register/trigger/errors needed
  } = useForm({
    defaultValues: {
      fullName: fd.fullName,
      email: fd.email,
      mobile: fd.mobile,
      city: fd.city,
      age: fd.age,
      emergencyName: fd.emergencyName,
      emergencyPhone: fd.emergencyPhone,
      emergencyRelation: fd.emergencyRelation
    },
    mode: "onBlur"
  });
  const syncField = (field) => (e) => {
    setFd((prev) => ({ ...prev, [field]: e.target.value }));
  };
  const inp = "w-full border rounded-lg px-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C] min-h-[48px]";
  const lbl = "block text-[13px] font-medium mb-1.5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-3 text-xs",
        style: {
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          color: "#795548"
        },
        children: "⚠️ Please enter your name exactly as on your Government ID (Aadhaar / Passport)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s2-name",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Full Name (as on Govt ID) *"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "s2-name",
          type: "text",
          className: inp,
          style: { minHeight: 48 },
          "data-ocid": "booking.name.input",
          ...register("fullName", { required: "Name is required" }),
          onBlur: (e) => {
            void trigger("fullName");
            syncField("fullName")(e);
          }
        }
      ),
      errors.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#C0001C" }, children: errors.fullName.message })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "s2-email",
            className: lbl,
            style: { color: "var(--ew-text)" },
            children: "Email Address *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "s2-email",
            type: "email",
            className: inp,
            style: { minHeight: 48 },
            "data-ocid": "booking.email.input",
            ...register("email", {
              required: "Email required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email"
              }
            }),
            onBlur: (e) => {
              void trigger("email");
              syncField("email")(e);
            }
          }
        ),
        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#C0001C" }, children: errors.email.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "s2-mobile",
            className: lbl,
            style: { color: "var(--ew-text)" },
            children: "Mobile Number *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "flex items-center px-3 text-sm rounded-lg border font-medium flex-shrink-0",
              style: {
                border: "1px solid var(--ew-gray-mid)",
                background: "var(--ew-gray-lt)",
                color: "var(--ew-text)",
                minHeight: 48
              },
              children: "+91"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "s2-mobile",
              type: "tel",
              className: inp,
              style: { minHeight: 48 },
              "data-ocid": "booking.mobile.input",
              ...register("mobile", {
                required: "Mobile required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit number"
                }
              }),
              onBlur: (e) => {
                void trigger("mobile");
                syncField("mobile")(e);
              }
            }
          )
        ] }),
        errors.mobile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#C0001C" }, children: errors.mobile.message })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          id: "s2-wa-same",
          checked: fd.whatsappSame,
          onChange: (e) => setFd((p) => ({ ...p, whatsappSame: e.target.checked })),
          style: { accentColor: "#C0001C" },
          className: "w-4 h-4"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s2-wa-same",
          className: "text-sm",
          style: { color: "var(--ew-text)" },
          children: "WhatsApp same as mobile number"
        }
      )
    ] }),
    !fd.whatsappSame && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s2-wa",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "WhatsApp Number"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "flex items-center px-3 text-sm rounded-lg border font-medium flex-shrink-0",
            style: {
              border: "1px solid var(--ew-gray-mid)",
              background: "var(--ew-gray-lt)",
              minHeight: 48
            },
            children: "+91"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "s2-wa",
            type: "tel",
            value: fd.whatsapp,
            onChange: (e) => setFd((p) => ({ ...p, whatsapp: e.target.value })),
            className: inp,
            style: { minHeight: 48 },
            "data-ocid": "booking.whatsapp.input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "s2-city",
            className: lbl,
            style: { color: "var(--ew-text)" },
            children: "City Travelling From *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "s2-city",
            value: fd.city,
            onChange: (e) => setFd((p) => ({ ...p, city: e.target.value })),
            className: inp,
            style: { minHeight: 48 },
            "data-ocid": "booking.city.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select city" }),
              CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "s2-age",
            className: lbl,
            style: { color: "var(--ew-text)" },
            children: "Age *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "s2-age",
            type: "number",
            min: 12,
            max: 70,
            value: fd.age,
            onChange: (e) => setFd((p) => ({ ...p, age: e.target.value })),
            className: inp,
            style: { minHeight: 48 },
            "data-ocid": "booking.age.input",
            placeholder: "12–70"
          }
        ),
        fd.age && (Number(fd.age) < 12 || Number(fd.age) > 70) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#C0001C" }, children: "Age must be 12–70 for most treks" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Gender *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["Male", "Female", "Non-binary", "Prefer not to say"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFd((p) => ({ ...p, gender: g })),
          className: "px-4 py-2 rounded-full text-sm font-medium transition-all border-2",
          style: {
            borderColor: fd.gender === g ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.gender === g ? "#FFF5F5" : "#fff",
            color: fd.gender === g ? "#C0001C" : "var(--ew-text)"
          },
          "data-ocid": `booking.gender.${g.toLowerCase().replace(/ /g, "_")}`,
          children: g
        },
        g
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border-t pt-4",
        style: { borderColor: "var(--ew-gray-mid)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-bold mb-3",
              style: { color: "var(--ew-text)" },
              children: "Emergency Contact"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "s2-emname",
                  className: lbl,
                  style: { color: "var(--ew-text)" },
                  children: "Contact Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "s2-emname",
                  type: "text",
                  value: fd.emergencyName,
                  onChange: (e) => setFd((p) => ({ ...p, emergencyName: e.target.value })),
                  className: inp,
                  style: { minHeight: 48 },
                  "data-ocid": "booking.emergency_name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "s2-emphone",
                  className: lbl,
                  style: { color: "var(--ew-text)" },
                  children: "Contact Phone *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "s2-emphone",
                  type: "tel",
                  value: fd.emergencyPhone,
                  onChange: (e) => setFd((p) => ({ ...p, emergencyPhone: e.target.value })),
                  className: inp,
                  style: { minHeight: 48 },
                  "data-ocid": "booking.emergency_phone.input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: "s2-emrel",
                className: lbl,
                style: { color: "var(--ew-text)" },
                children: "Relationship"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "s2-emrel",
                value: fd.emergencyRelation,
                onChange: (e) => setFd((p) => ({ ...p, emergencyRelation: e.target.value })),
                className: inp,
                style: { minHeight: 48 },
                "data-ocid": "booking.emergency_relation.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                  ["Parent", "Spouse", "Sibling", "Friend", "Child", "Other"].map(
                    (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r }, r)
                  )
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Step3({
  fd,
  setFd
}) {
  const toggleCondition = (id) => {
    if (id === "none") {
      setFd((p) => ({ ...p, medicalConditions: ["none"] }));
      return;
    }
    setFd((p) => ({
      ...p,
      medicalConditions: p.medicalConditions.includes(id) ? p.medicalConditions.filter((c) => c !== id && c !== "none") : [...p.medicalConditions.filter((c) => c !== "none"), id]
    }));
  };
  const hasConditions = fd.medicalConditions.some((c) => c !== "none");
  const inp = "w-full border rounded-lg px-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C] min-h-[48px]";
  const lbl = "block text-[13px] font-medium mb-1.5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-3 text-xs",
        style: {
          background: "#FFF8E1",
          border: "1px solid #FFD54F",
          color: "#795548"
        },
        children: "🔒 All health information is confidential and used only for your safety on the trek."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s3-blood",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Blood Group"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "s3-blood",
          value: fd.bloodGroup,
          onChange: (e) => setFd((p) => ({ ...p, bloodGroup: e.target.value })),
          className: inp,
          style: { minHeight: 48 },
          "data-ocid": "booking.blood_group.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select blood group" }),
            BLOOD_GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: g, children: g }, g))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Do you have any of these conditions?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: MEDICAL_CONDITIONS.map((c) => {
        const checked = fd.medicalConditions.includes(c.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
            style: {
              border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
              background: checked ? "#FFF5F5" : "#fff"
            },
            "data-ocid": `booking.condition.${c.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked,
                  onChange: () => toggleCondition(c.id),
                  style: { accentColor: "#C0001C" },
                  className: "w-4 h-4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "var(--ew-text)" }, children: c.label })
            ]
          },
          c.id
        );
      }) }),
      hasConditions && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mt-3 rounded-lg p-3 text-xs",
          style: {
            background: "#FFF8E1",
            border: "1px solid #FFD54F",
            color: "#795548"
          },
          children: "⚠️ Our guide will be briefed about your condition. Please bring relevant medications and a doctor's certificate."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s3-other",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Other conditions or medications (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "s3-other",
          rows: 2,
          value: fd.medicalOther,
          onChange: (e) => setFd((p) => ({ ...p, medicalOther: e.target.value })),
          className: `${inp} resize-none`,
          placeholder: "E.g., taking blood thinners, recent surgery...",
          "data-ocid": "booking.medical_other.textarea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Current Fitness Level *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
        {
          id: "active",
          icon: "🟢",
          label: "Very Active",
          sub: "Gym 4+ days/week or can run 5km easily"
        },
        {
          id: "moderate",
          icon: "🟡",
          label: "Moderately Active",
          sub: "Walk or exercise 2–3 days/week"
        },
        {
          id: "sedentary",
          icon: "🔴",
          label: "Sedentary",
          sub: "Minimal regular exercise"
        }
      ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setFd((p) => ({ ...p, fitnessLevel: f.id })),
          className: "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all border-2",
          style: {
            borderColor: fd.fitnessLevel === f.id ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.fitnessLevel === f.id ? "#FFF5F5" : "#fff"
          },
          "data-ocid": `booking.fitness.${f.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: f.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold",
                  style: { color: "var(--ew-text)" },
                  children: f.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: f.sub })
            ] })
          ]
        },
        f.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Have you done any trekking before?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [
        { val: true, l: "Yes" },
        { val: false, l: "No" }
      ].map(({ val, l }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFd((p) => ({ ...p, hasTrekked: val })),
          className: "px-6 py-2 rounded-full text-sm font-medium border-2 transition-all",
          style: {
            borderColor: fd.hasTrekked === val ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.hasTrekked === val ? "#FFF5F5" : "#fff",
            color: fd.hasTrekked === val ? "#C0001C" : "var(--ew-text)"
          },
          "data-ocid": `booking.trekked.${l.toLowerCase()}`,
          children: l
        },
        l
      )) }),
      fd.hasTrekked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "s3-longestTrek",
            className: lbl,
            style: { color: "var(--ew-text)" },
            children: "Longest trek duration?"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: "s3-longestTrek",
            value: fd.longestTrek,
            onChange: (e) => setFd((p) => ({ ...p, longestTrek: e.target.value })),
            className: inp,
            style: { minHeight: 48 },
            "data-ocid": "booking.longest_trek.select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
              ["1–3 days", "4–6 days", "7–10 days", "10+ days"].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s3-cert",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Upload Fitness Certificate (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-2", style: { color: "var(--ew-gray-dark)" }, children: "Recommended for treks above 4,000m. PDF or JPG, max 5MB." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "s3-cert",
          type: "file",
          accept: ".pdf,.jpg,.jpeg",
          className: "w-full text-sm",
          "data-ocid": "booking.fitness_cert.upload_button"
        }
      )
    ] })
  ] });
}
function Step4({
  fd,
  setFd
}) {
  const inp = "w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]";
  const lbl = "block text-[13px] font-medium mb-1";
  const addCoTraveler = () => {
    setFd((p) => ({
      ...p,
      coTravelers: [
        ...p.coTravelers,
        { name: "", age: "", gender: "", bloodGroup: "", medicalNote: "" }
      ]
    }));
  };
  const removeCoTraveler = (i) => {
    setFd((p) => ({
      ...p,
      coTravelers: p.coTravelers.filter((_, idx) => idx !== i)
    }));
  };
  const updateCoTraveler = (i, field, value) => {
    setFd((p) => ({
      ...p,
      coTravelers: p.coTravelers.map(
        (ct, idx) => idx === i ? { ...ct, [field]: value } : ct
      )
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-bold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Upload Government ID Proof *"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 mb-3", children: ["Aadhaar", "Passport", "Driving License", "Voter ID"].map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs px-2 py-1 rounded-lg border font-medium",
          style: {
            borderColor: "var(--ew-gray-mid)",
            color: "var(--ew-gray-dark)",
            background: "var(--ew-gray-lt)"
          },
          children: doc
        },
        doc
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          accept: ".pdf,.jpg,.jpeg,.png",
          onChange: (e) => setFd((p) => {
            var _a;
            return { ...p, idProofUploaded: !!((_a = e.target.files) == null ? void 0 : _a.length) };
          }),
          className: "w-full text-sm",
          "data-ocid": "booking.id_proof.upload_button"
        }
      ),
      fd.idProofUploaded && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#22C55E" }, children: "✓ File uploaded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-bold mb-1",
          style: { color: "var(--ew-text)" },
          children: "Upload Passport-size Photo *"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-2", style: { color: "var(--ew-gray-dark)" }, children: "Face clearly visible, white/light background. JPG or PNG, max 2MB." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "file",
          accept: ".jpg,.jpeg,.png",
          onChange: (e) => setFd((p) => {
            var _a;
            return { ...p, photoUploaded: !!((_a = e.target.files) == null ? void 0 : _a.length) };
          }),
          className: "w-full text-sm",
          "data-ocid": "booking.photo.upload_button"
        }
      ),
      fd.photoUploaded && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", style: { color: "#22C55E" }, children: "✓ Photo uploaded" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-sm font-bold mb-2",
          style: { color: "var(--ew-text)" },
          children: "Additional travelers in your group?"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [
        { val: true, l: "Yes" },
        { val: false, l: "No" }
      ].map(({ val, l }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFd((p) => ({ ...p, hasCoTravelers: val })),
          className: "px-6 py-2 rounded-full text-sm font-medium border-2 transition-all",
          style: {
            borderColor: fd.hasCoTravelers === val ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.hasCoTravelers === val ? "#FFF5F5" : "#fff",
            color: fd.hasCoTravelers === val ? "#C0001C" : "var(--ew-text)"
          },
          "data-ocid": `booking.co_travelers.${l.toLowerCase()}`,
          children: l
        },
        l
      )) }),
      fd.hasCoTravelers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4", children: [
        fd.coTravelers.map((ct, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-4 relative",
            style: {
              background: "var(--ew-gray-lt)",
              border: "1px solid var(--ew-gray-mid)"
            },
            "data-ocid": `booking.co_traveler.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => removeCoTraveler(i),
                  className: "absolute top-3 right-3 text-xs px-2 py-1 rounded-lg flex items-center gap-1",
                  style: { color: "#C0001C", background: "#FFF5F5" },
                  "aria-label": "Remove co-traveler",
                  "data-ocid": `booking.co_traveler.delete_button.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }),
                    " Remove"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs font-bold mb-3",
                  style: { color: "var(--ew-gray-dark)" },
                  children: [
                    "Traveler ",
                    i + 2
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `ct-name-${i}`,
                      className: lbl,
                      style: { color: "var(--ew-text)" },
                      children: "Name"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `ct-name-${i}`,
                      type: "text",
                      value: ct.name,
                      onChange: (e) => updateCoTraveler(i, "name", e.target.value),
                      className: inp,
                      style: { minHeight: 44 }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `ct-age-${i}`,
                      className: lbl,
                      style: { color: "var(--ew-text)" },
                      children: "Age"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: `ct-age-${i}`,
                      type: "number",
                      value: ct.age,
                      onChange: (e) => updateCoTraveler(i, "age", e.target.value),
                      className: inp,
                      style: { minHeight: 44 }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `ct-gender-${i}`,
                      className: lbl,
                      style: { color: "var(--ew-text)" },
                      children: "Gender"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: `ct-gender-${i}`,
                      value: ct.gender,
                      onChange: (e) => updateCoTraveler(i, "gender", e.target.value),
                      className: inp,
                      style: { minHeight: 44 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                        [
                          "Male",
                          "Female",
                          "Non-binary",
                          "Prefer not to say"
                        ].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: `ct-blood-${i}`,
                      className: lbl,
                      style: { color: "var(--ew-text)" },
                      children: "Blood Group"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "select",
                    {
                      id: `ct-blood-${i}`,
                      value: ct.bloodGroup,
                      onChange: (e) => updateCoTraveler(i, "bloodGroup", e.target.value),
                      className: inp,
                      style: { minHeight: 44 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
                        BLOOD_GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: g }, g))
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: `ct-medical-${i}`,
                    className: lbl,
                    style: { color: "var(--ew-text)" },
                    children: "Medical conditions (brief)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: `ct-medical-${i}`,
                    type: "text",
                    value: ct.medicalNote,
                    onChange: (e) => updateCoTraveler(i, "medicalNote", e.target.value),
                    className: inp,
                    style: { minHeight: 44 },
                    placeholder: "None / specify if any"
                  }
                )
              ] })
            ]
          },
          `ct-${i + 1}`
        )),
        fd.coTravelers.length < fd.groupSize - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: addCoTraveler,
            className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-colors hover:opacity-70",
            style: { borderColor: "#C0001C", color: "#C0001C" },
            "data-ocid": "booking.add_co_traveler_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
              " Add Traveler"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s4-heard",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "How did you hear about Trekora?"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "s4-heard",
          value: fd.heardFrom,
          onChange: (e) => setFd((p) => ({ ...p, heardFrom: e.target.value })),
          className: inp,
          style: { minHeight: 48 },
          "data-ocid": "booking.heard_from.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select" }),
            [
              "Google Search",
              "Instagram",
              "Facebook",
              "YouTube",
              "Friend / Family Referral",
              "Travel Blog",
              "Other"
            ].map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
          ]
        }
      )
    ] })
  ] });
}
function Step5({
  fd,
  setFd,
  unitPrice
}) {
  const [promoInput, setPromoInput] = reactExports.useState(fd.promoCode);
  const [promoStatus, setPromoStatus] = reactExports.useState(
    fd.promoApplied ? "valid" : "idle"
  );
  const toggleDietary = (id) => {
    if (id === "none_req") {
      setFd((p) => ({ ...p, dietary: ["none_req"] }));
      return;
    }
    setFd((p) => ({
      ...p,
      dietary: p.dietary.includes(id) ? p.dietary.filter((d) => d !== id && d !== "none_req") : [...p.dietary.filter((d) => d !== "none_req"), id]
    }));
  };
  const toggleContact = (mode) => {
    setFd((p) => ({
      ...p,
      contactMode: p.contactMode.includes(mode) ? p.contactMode.filter((m) => m !== mode) : [...p.contactMode, mode]
    }));
  };
  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "EW25") {
      const discount = 0.05;
      const savings = Math.round(unitPrice * fd.groupSize * discount);
      setFd((p) => ({
        ...p,
        promoCode: code,
        promoApplied: true,
        promoDiscount: discount
      }));
      setPromoStatus("valid");
      ue.success(`Promo applied! You save Rs.${formatINR(savings)}`);
    } else {
      setPromoStatus("invalid");
      setFd((p) => ({
        ...p,
        promoApplied: false,
        promoDiscount: 0,
        promoCode: ""
      }));
    }
  };
  const inp = "w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 transition-colors border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]";
  const lbl = "block text-[13px] font-medium mb-1";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Dietary Requirements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
        {
          id: "vegetarian",
          icon: "🌿",
          label: "Vegetarian",
          sub: "Standard — all trek meals are vegetarian"
        },
        {
          id: "vegan",
          icon: "🌱",
          label: "Vegan",
          sub: "We'll accommodate"
        },
        {
          id: "jain",
          icon: "🟤",
          label: "Jain Vegetarian",
          sub: "No root vegetables"
        },
        { id: "glutenfree", icon: "🌾", label: "Gluten-free", sub: "" },
        {
          id: "none_req",
          icon: "✅",
          label: "No specific requirement",
          sub: ""
        }
      ].map((d) => {
        const checked = fd.dietary.includes(d.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
            style: {
              border: `2px solid ${checked ? "#C0001C" : "var(--ew-gray-mid)"}`,
              background: checked ? "#FFF5F5" : "#fff"
            },
            "data-ocid": `booking.dietary.${d.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked,
                  onChange: () => toggleDietary(d.id),
                  style: { accentColor: "#C0001C" },
                  className: "w-4 h-4"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm font-semibold",
                    style: { color: "var(--ew-text)" },
                    children: d.label
                  }
                ),
                d.sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs",
                    style: { color: "var(--ew-gray-dark)" },
                    children: d.sub
                  }
                )
              ] })
            ]
          },
          d.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s5-accom",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Special accommodation requests (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "s5-accom",
          rows: 2,
          value: fd.accommodationNote,
          onChange: (e) => setFd((p) => ({ ...p, accommodationNote: e.target.value })),
          className: `${inp} resize-none`,
          placeholder: "E.g., prefer single tent, wheelchair access at base camp...",
          "data-ocid": "booking.accommodation.textarea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Arrange transport from your city?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [
        { val: true, l: "Yes" },
        { val: false, l: "No" }
      ].map(({ val, l }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setFd((p) => ({ ...p, needsTransport: val })),
          className: "px-6 py-2 rounded-full text-sm font-medium border-2 transition-all",
          style: {
            borderColor: fd.needsTransport === val ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.needsTransport === val ? "#FFF5F5" : "#fff",
            color: fd.needsTransport === val ? "#C0001C" : "var(--ew-text)"
          },
          "data-ocid": `booking.transport.${l.toLowerCase()}`,
          children: l
        },
        l
      )) }),
      fd.needsTransport && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s5-tcity",
              className: lbl,
              style: { color: "var(--ew-text)" },
              children: "Pickup city"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "s5-tcity",
              type: "text",
              value: fd.transportCity,
              onChange: (e) => setFd((p) => ({ ...p, transportCity: e.target.value })),
              className: inp,
              style: { minHeight: 48 },
              "data-ocid": "booking.transport_city.input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "s5-tdate",
              className: lbl,
              style: { color: "var(--ew-text)" },
              children: "Pickup date & time"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "s5-tdate",
              type: "datetime-local",
              value: fd.transportDate,
              onChange: (e) => setFd((p) => ({ ...p, transportDate: e.target.value })),
              className: inp,
              style: { minHeight: 48 },
              "data-ocid": "booking.transport_date.input"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: lbl, style: { color: "var(--ew-text)" }, children: "Preferred contact mode for updates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["SMS", "WhatsApp", "Email", "All"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => toggleContact(m),
          className: "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
          style: {
            borderColor: fd.contactMode.includes(m) ? "#C0001C" : "var(--ew-gray-mid)",
            background: fd.contactMode.includes(m) ? "#FFF5F5" : "#fff",
            color: fd.contactMode.includes(m) ? "#C0001C" : "var(--ew-text)"
          },
          "data-ocid": `booking.contact_mode.${m.toLowerCase()}`,
          children: m
        },
        m
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s5-promo",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Promo / Referral Code (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "s5-promo",
            type: "text",
            value: promoInput,
            onChange: (e) => {
              setPromoInput(e.target.value);
              setPromoStatus("idle");
            },
            placeholder: "Enter code e.g. EW25",
            className: `${inp} flex-1`,
            style: { minHeight: 48 },
            "data-ocid": "booking.promo.input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: applyPromo,
            className: "px-4 rounded-lg text-sm font-semibold text-white transition-colors",
            style: { background: "#22C55E", minHeight: 48 },
            "data-ocid": "booking.promo.apply_button",
            children: "Apply"
          }
        )
      ] }),
      promoStatus === "valid" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs mt-1 font-semibold",
          style: { color: "#22C55E" },
          "data-ocid": "booking.promo.success_state",
          children: "✓ Promo applied! 5% discount"
        }
      ),
      promoStatus === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs mt-1",
          style: { color: "#C0001C" },
          "data-ocid": "booking.promo.error_state",
          children: "✗ Invalid or expired promo code"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "s5-notes",
          className: lbl,
          style: { color: "var(--ew-text)" },
          children: "Anything else we should know? (optional)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          id: "s5-notes",
          rows: 3,
          value: fd.otherNotes,
          onChange: (e) => setFd((p) => ({ ...p, otherNotes: e.target.value })),
          className: `${inp} resize-none`,
          placeholder: "Any special requirements or notes for our team...",
          "data-ocid": "booking.notes.textarea"
        }
      )
    ] })
  ] });
}
function Step6({
  fd,
  setFd,
  trek,
  unitPrice,
  isSubmitting
}) {
  const prices = calcPrices(
    unitPrice,
    fd.groupSize,
    fd.addOns,
    fd.promoDiscount
  );
  const selectedAddOns = ADD_ONS.filter((a) => fd.addOns.includes(a.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    trek && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-4 p-4 rounded-xl",
        style: { background: "var(--ew-gray-lt)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: trek.image,
              alt: trek.name,
              className: "w-20 h-20 rounded-xl object-cover flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold text-base",
                style: { color: "var(--ew-text)" },
                children: trek.name
              }
            ),
            fd.batchDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
              "📅",
              " ",
              new Date(fd.batchDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
              "👥 ",
              fd.groupSize,
              " person",
              fd.groupSize !== 1 ? "s" : "",
              " ·",
              " ",
              fd.fullName
            ] }),
            selectedAddOns.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-1", children: selectedAddOns.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs px-2 py-0.5 rounded-full",
                style: {
                  background: "#FFF5F5",
                  color: "#C0001C",
                  border: "1px solid #C0001C"
                },
                children: [
                  a.icon,
                  " ",
                  a.label
                ]
              },
              a.id
            )) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4 space-y-2 text-sm",
        style: { background: "var(--ew-gray-lt)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", style: { color: "var(--ew-text)" }, children: "Price Breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
              "Rs.",
              formatINR(unitPrice),
              " × ",
              fd.groupSize,
              " persons"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Rs.",
              formatINR(prices.base)
            ] })
          ] }),
          prices.groupDiscount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: { color: "#22C55E" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Group discount (15%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−Rs.",
              formatINR(prices.groupDiscount)
            ] })
          ] }),
          prices.addOnsTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add-ons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "+Rs.",
              formatINR(prices.addOnsTotal)
            ] })
          ] }),
          prices.promoSavings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", style: { color: "#22C55E" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Promo discount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "−Rs.",
              formatINR(prices.promoSavings)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text-lt)" }, children: "GST (5%)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Rs.",
              formatINR(prices.gst)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex justify-between font-bold text-base border-t pt-2",
              style: { borderColor: "var(--ew-gray-mid)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "TOTAL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#E87722", fontSize: 18 }, children: [
                  "Rs.",
                  formatINR(prices.grandTotal)
                ] })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl p-4 text-sm",
        style: { background: "#E3F2FD", border: "1px solid #90CAF9" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", style: { color: "#1565C0" }, children: "💳 No payment required now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#1565C0" }, children: "Our team will contact you within 2 hours to confirm availability and share a secure payment link." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: "flex items-start gap-3 cursor-pointer",
        "data-ocid": "booking.terms.checkbox",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: fd.termsAccepted,
              onChange: (e) => setFd((p) => ({ ...p, termsAccepted: e.target.checked })),
              style: { accentColor: "#C0001C", marginTop: 2 },
              className: "w-5 h-5 flex-shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", style: { color: "var(--ew-text)" }, children: [
            "I confirm that the above details are accurate and I agree to Trekora",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/terms", className: "underline", style: { color: "#C0001C" }, children: "Terms & Conditions" }),
            " ",
            "and",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/cancellation",
                className: "underline",
                style: { color: "#C0001C" },
                children: "Cancellation Policy"
              }
            ),
            "."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: !fd.termsAccepted || isSubmitting,
        className: "w-full flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all disabled:opacity-50",
        style: {
          background: fd.termsAccepted && !isSubmitting ? "#C0001C" : "var(--ew-gray-mid)",
          height: 56,
          fontSize: 16
        },
        "data-ocid": "booking.submit_button",
        children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 20, className: "animate-spin" }),
          " Submitting your booking…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "✅ Submit Booking Request" })
      }
    )
  ] });
}
function BookingPage() {
  const [step, setStep] = reactExports.useState(0);
  const [trekSlug, setTrekSlug] = reactExports.useState("");
  const [fd, setFd] = reactExports.useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [successRef, setSuccessRef] = reactExports.useState(null);
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const trek = TREKS.find((t) => t.slug === trekSlug);
  const { data: batches = [], isLoading: batchesLoading } = useQuery({
    queryKey: ["trekBatches", trek == null ? void 0 : trek.id],
    queryFn: async () => {
      if (!actor || !trek) return [];
      try {
        return await actor.getTrekBatches(BigInt(trek.id));
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorFetching && !!trek,
    staleTime: 3e4
  });
  const unitPrice = reactExports.useMemo(() => (trek == null ? void 0 : trek.price) ?? 0, [trek]);
  const prices = calcPrices(
    unitPrice,
    fd.groupSize,
    fd.addOns,
    fd.promoDiscount
  );
  reactExports.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  const canGoNext = reactExports.useCallback(() => {
    switch (step) {
      case 0:
        if (!trekSlug) {
          ue.error("Please select a trek first.");
          return false;
        }
        if (!fd.batchDate) {
          ue.error("Please select an available batch date.");
          return false;
        }
        return true;
      case 1:
        if (!fd.fullName.trim()) {
          ue.error("Please enter your full name.");
          return false;
        }
        if (!fd.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(fd.email)) {
          ue.error("Please enter a valid email.");
          return false;
        }
        if (!fd.mobile.trim() || !/^[6-9]\d{9}$/.test(fd.mobile)) {
          ue.error("Please enter a valid 10-digit mobile number.");
          return false;
        }
        if (!fd.city) {
          ue.error("Please select your city.");
          return false;
        }
        if (!fd.age || Number(fd.age) < 12 || Number(fd.age) > 70) {
          ue.error("Age must be between 12 and 70.");
          return false;
        }
        if (!fd.gender) {
          ue.error("Please select your gender.");
          return false;
        }
        if (!fd.emergencyName.trim()) {
          ue.error("Please provide an emergency contact name.");
          return false;
        }
        if (!fd.emergencyPhone.trim()) {
          ue.error("Please provide an emergency contact number.");
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  }, [step, fd, trekSlug]);
  const handleNext = () => {
    if (!canGoNext()) return;
    setStep((s) => Math.min(s + 1, 5));
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleSubmit = reactExports.useCallback(
    async (e) => {
      e.preventDefault();
      if (!fd.termsAccepted) {
        ue.error("Please accept the terms and conditions.");
        return;
      }
      if (!trek || !fd.batchDate) {
        ue.error(
          "Booking data is incomplete. Please go back and try again."
        );
        return;
      }
      setIsSubmitting(true);
      try {
        const batchDateNs = BigInt(new Date(fd.batchDate).getTime()) * 1000000n;
        if (actor) {
          await actor.createBooking({
            itemId: BigInt(trek.id),
            itemName: trek.name,
            itemType: "trek",
            travelerName: fd.fullName,
            email: fd.email,
            phone: fd.mobile,
            groupSize: BigInt(fd.groupSize),
            totalAmount: BigInt(Math.round(prices.grandTotal)),
            advanceAmount: BigInt(0),
            batchDate: batchDateNs
          });
        }
        const ref = generateRef();
        setSuccessRef(ref);
        ue.success(`Booking submitted! Ref: ${ref}`);
      } catch (err) {
        ue.error("Submission failed. Please try again.");
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [fd, trek, actor, prices.grandTotal]
  );
  const STEP_TITLES = [
    {
      title: "Let's plan your Himalayan adventure! 🏔️",
      sub: "Select your trek, batch date, and add-ons"
    },
    {
      title: "Tell us about the lead traveler",
      sub: "These details are for booking confirmation and emergency contact"
    },
    {
      title: "A few health questions for your safety 🏥",
      sub: "This helps our certified mountain guides ensure your safety"
    },
    {
      title: "Documents & co-travelers",
      sub: "Upload your ID proof and add co-traveler details"
    },
    {
      title: "Almost done! Any special requirements? 🌟",
      sub: "Optional preferences — skip if none"
    },
    {
      title: "Review your booking summary",
      sub: "Confirm all details before submitting"
    }
  ];
  if (successRef) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "pt-24 min-h-screen pb-12 px-4",
        style: { background: "var(--ew-gray-lt)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SuccessScreen,
          {
            bookingRef: successRef,
            trekName: (trek == null ? void 0 : trek.name) ?? "your trek"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-16",
      style: { background: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-40 bg-white shadow-sm border-b",
            style: { borderColor: "var(--ew-gray-mid)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 h-16 flex items-center gap-3", children: trek ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: trek.image,
                    alt: trek.name,
                    className: "w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-semibold truncate",
                      style: { color: "var(--ew-text)" },
                      children: trek.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: [
                    trek.duration,
                    " days"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-sm font-bold flex-shrink-0",
                    style: { color: "#C0001C" },
                    children: [
                      "Rs.",
                      formatINR(trek.price),
                      "/person"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-semibold",
                  style: { color: "var(--ew-text)" },
                  children: "Trekora Booking"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-full",
                  style: { background: "var(--ew-gray-mid)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1 transition-all duration-500",
                      style: {
                        width: `${(step + 1) / 6 * 100}%`,
                        background: "#C0001C"
                      }
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 pt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "form",
            {
              onSubmit: step === 5 ? handleSubmit : (e) => {
                e.preventDefault();
                handleNext();
              },
              noValidate: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "bg-white rounded-2xl shadow-lg p-6 sm:p-8",
                  "data-ocid": "booking.form_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h2",
                        {
                          className: "text-xl sm:text-2xl font-bold",
                          style: { color: "var(--ew-text)" },
                          children: STEP_TITLES[step].title
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-sm mt-1",
                          style: { color: "var(--ew-gray-dark)" },
                          children: STEP_TITLES[step].sub
                        }
                      )
                    ] }),
                    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "trek-select",
                          className: "block text-[13px] font-medium mb-1",
                          style: { color: "var(--ew-text)" },
                          children: "Choose Your Trek *"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "trek-select",
                          value: trekSlug,
                          onChange: (e) => {
                            setTrekSlug(e.target.value);
                            setFd((p) => ({ ...p, batchDate: null }));
                          },
                          className: "w-full border rounded-lg px-3 py-3 text-[16px] focus:outline-none focus:ring-2 focus:border-[#C0001C] border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30",
                          style: { minHeight: 48 },
                          "data-ocid": "booking.trek.select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a trek…" }),
                            TREKS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: t.slug, children: [
                              t.name,
                              " — Rs.",
                              formatINR(t.price),
                              "/person"
                            ] }, t.slug))
                          ]
                        }
                      )
                    ] }),
                    step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Step1,
                      {
                        fd,
                        setFd,
                        trek,
                        batches,
                        batchesLoading
                      }
                    ),
                    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step2, { fd, setFd }),
                    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step3, { fd, setFd }),
                    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step4, { fd, setFd }),
                    step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(Step5, { fd, setFd, unitPrice }),
                    step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Step6,
                      {
                        fd,
                        setFd,
                        trek,
                        unitPrice,
                        isSubmitting
                      }
                    ),
                    step < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8", children: [
                      step > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: handleBack,
                          className: "flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-colors",
                          style: {
                            borderColor: "var(--ew-gray-mid)",
                            color: "var(--ew-text-lt)"
                          },
                          "data-ocid": `booking.step${step + 1}.back_button`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                            " Back"
                          ]
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "submit",
                          className: "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all",
                          style: { background: "#C0001C", minHeight: 48 },
                          "data-ocid": `booking.step${step + 1}.next_button`,
                          children: [
                            step === 4 ? "Review Booking" : "Next Step",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
                          ]
                        }
                      )
                    ] }),
                    step === 5 && step > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: handleBack,
                        className: "mt-4 flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-semibold text-sm transition-colors",
                        style: {
                          borderColor: "var(--ew-gray-mid)",
                          color: "var(--ew-text-lt)"
                        },
                        "data-ocid": "booking.step6.back_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
                          " Back"
                        ]
                      }
                    )
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-wrap justify-center gap-4 mt-6 text-xs",
              style: { color: "var(--ew-gray-dark)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒 Secure & encrypted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✅ Free cancellation (30 days)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⭐ 4.8 rated by 2,400+ trekkers" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        .success-check-ring {
          background: #22C55E;
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes pop-in {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      ` })
      ]
    }
  );
}
export {
  BookingPage as default
};
