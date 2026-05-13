const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src-9NeJaaKe.js","assets/router-Bky4FFc7.js","assets/jspdf.es.min-jZYBrjPN.js","assets/index-C6rgoof8.js","assets/motion-CnUkbXTC.js","assets/icons-DrFRvHmE.js","assets/index-CRKGSz93.css"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { A as AnimatePresence, m as motion, d as useIsMobile, u as ue, _ as __vitePreload } from "./index-C6rgoof8.js";
import { g as getReviewsByTrek } from "./reviews-DqUEh3Gg.js";
import { K as Star, a7 as Route, a8 as Minimize2, a9 as Maximize2, aa as ArrowUpDown, M as Mountain, J as Clock, V as Plane, _ as TramFront, $ as Car, a0 as Bus } from "./icons-DrFRvHmE.js";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as ReferenceArea, b as ReferenceLine, c as Area, D as Dot } from "./charts-VM0_pAiv.js";
function useScrollDepth() {
  const [hasReached40Percent, setHasReached40Percent] = reactExports.useState(false);
  const sentinelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (hasReached40Percent) return;
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "40%";
    sentinel.style.left = "0";
    sentinel.style.width = "1px";
    sentinel.style.height = "1px";
    sentinel.style.pointerEvents = "none";
    sentinel.style.visibility = "hidden";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.appendChild(sentinel);
    sentinelRef.current = sentinel;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => setHasReached40Percent(true));
            observer.disconnect();
          }
        }
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (sentinelRef.current && document.body.contains(sentinelRef.current)) {
        document.body.removeChild(sentinelRef.current);
      }
    };
  }, [hasReached40Percent]);
  return { hasReached40Percent };
}
const WA_ICON = /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    width: "26",
    height: "26",
    fill: "currentColor",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "WhatsApp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
    ]
  }
);
function WhatsAppCTA({ trekName }) {
  const { hasReached40Percent } = useScrollDepth();
  const encodedMessage = trekName ? encodeURIComponent(
    `Hi, I want to know more about ${trekName} with EternaWings`
  ) : encodeURIComponent("Hi, I want to book a trek with EternaWings");
  const waHref = `https://wa.me/919876543210?text=${encodedMessage}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasReached40Percent && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.a,
    {
      href: waHref,
      target: "_blank",
      rel: "noopener noreferrer",
      initial: { opacity: 0, scale: 0.7 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.7 },
      transition: { duration: 0.25 },
      whileHover: { scale: 1.12 },
      whileTap: { scale: 0.95 },
      className: "fixed bottom-[6.5rem] left-5 z-40 group",
      "aria-label": "Chat on WhatsApp",
      "data-ocid": "trek_detail.whatsapp_cta_button",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-elevated transition-transform",
            style: { background: "#25D366" },
            children: WA_ICON
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute left-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
            style: {
              background: "#25D366",
              color: "#fff"
            },
            children: "Chat on WhatsApp"
          }
        )
      ]
    }
  ) });
}
function reducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_DATE":
      return { ...state, selectedDate: action.date };
    case "SET_GROUP":
      return { ...state, groupSize: action.size };
    case "TOGGLE_ADDON":
      return {
        ...state,
        addOns: state.addOns.includes(action.addon) ? state.addOns.filter((a) => a !== action.addon) : [...state.addOns, action.addon]
      };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
const initialState = {
  step: 1,
  selectedDate: "",
  groupSize: 2,
  addOns: [],
  name: "",
  phone: "",
  email: ""
};
const ADD_ONS = [
  { id: "insurance", label: "Travel Insurance", price: 350 },
  { id: "porter", label: "Porter Service", price: 500 },
  { id: "transfer", label: "Airport Transfer", price: 1200 }
];
function BookingDrawer({
  isOpen,
  onClose,
  trekName,
  price,
  duration,
  difficulty,
  image
}) {
  const isMobile = useIsMobile();
  const [state, dispatch] = reactExports.useReducer(reducer, initialState);
  const [errors, setErrors] = reactExports.useState({});
  const [rzpLoading, setRzpLoading] = reactExports.useState(false);
  const drawerRef = reactExports.useRef(null);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
  reactExports.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (!isOpen) dispatch({ type: "RESET" });
  }, [isOpen]);
  const addOnTotal = ADD_ONS.filter((a) => state.addOns.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0
  );
  const total = (price + addOnTotal) * state.groupSize;
  function validateStep1() {
    const errs = {};
    if (!state.selectedDate) errs.date = "Please select a date";
    if (state.groupSize < 1) errs.group = "Minimum 1 person required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function validateStep2() {
    const errs = {};
    if (!state.name.trim()) errs.name = "Full name is required";
    if (!state.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Enter valid 10-digit mobile number";
    if (!state.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Enter valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function initiatePayment() {
    setRzpLoading(true);
    setTimeout(() => {
      setRzpLoading(false);
      if (typeof window.Razorpay !== "undefined") {
        const options = {
          key: "rzp_test_placeholder",
          amount: total * 100,
          currency: "INR",
          name: "Trekora",
          description: `${trekName} — ${state.selectedDate}`,
          prefill: {
            name: state.name,
            email: state.email,
            contact: state.phone
          },
          theme: { color: "#C0001C" },
          handler: (_response) => {
            ue.success(
              `🎉 Booking confirmed! Confirmation sent to ${state.email}`
            );
            onClose();
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        ue.success(
          "🎉 Booking request received! Our team will contact you shortly."
        );
        onClose();
      }
    }, 500);
  }
  function StepDots() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-full transition-all duration-300",
        style: {
          width: state.step === s ? 24 : 8,
          height: 8,
          backgroundColor: state.step === s ? "var(--ew-red)" : state.step > s ? "var(--ew-orange)" : "var(--ew-gray-mid)"
        }
      },
      s
    )) });
  }
  const drawerContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: drawerRef,
      className: "flex flex-col h-full bg-white",
      style: { maxWidth: isMobile ? "100vw" : 480 },
      children: [
        isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-full",
            style: {
              width: 32,
              height: 4,
              backgroundColor: "var(--ew-gray-mid)"
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-5 py-4 flex-shrink-0",
            style: {
              backgroundColor: "var(--ew-red)",
              color: "#fff"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                image && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: image.replace("w=1200", "w=80"),
                    alt: trekName,
                    className: "w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.75)" }, children: "Book Trek" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base truncate", children: trekName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "rgba(255,255,255,0.8)" }, children: [
                    duration,
                    " · ",
                    difficulty
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  "aria-label": "Close booking drawer",
                  className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-2",
                  style: { backgroundColor: "rgba(255,255,255,0.15)" },
                  "data-ocid": "booking_drawer.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 14 14",
                      fill: "none",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          d: "M1 1l12 12M13 1L1 13",
                          stroke: "white",
                          strokeWidth: "2",
                          strokeLinecap: "round"
                        }
                      )
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "px-5 py-2 flex items-center justify-between flex-shrink-0",
            style: { backgroundColor: "var(--ew-footer)", color: "#fff" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", style: { color: "rgba(255,255,255,0.6)" }, children: [
                "Step ",
                state.step,
                " of 3"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", style: { color: "var(--ew-orange)" }, children: [
                "₹",
                price.toLocaleString("en-IN"),
                "/person"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-5 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StepDots, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            state.step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.2 },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base",
                      style: { color: "var(--ew-text)" },
                      children: "Select Date & Group Size"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "booking-date",
                        className: "block text-xs font-semibold mb-1.5",
                        style: { color: "var(--ew-text)" },
                        children: "Trek Date *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "booking-date",
                        type: "date",
                        min: today,
                        value: state.selectedDate,
                        onChange: (e) => dispatch({ type: "SET_DATE", date: e.target.value }),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none transition-colors",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.date ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "booking_drawer.date_input"
                      }
                    ),
                    errors.date && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        children: errors.date
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-semibold mb-1.5",
                        style: { color: "var(--ew-text)" },
                        children: "Group Size *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => dispatch({
                            type: "SET_GROUP",
                            size: Math.max(1, state.groupSize - 1)
                          }),
                          "aria-label": "Decrease group size",
                          className: "w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors",
                          style: { backgroundColor: "var(--ew-red)", color: "#fff" },
                          "data-ocid": "booking_drawer.group_minus",
                          children: "−"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-2xl font-bold w-8 text-center",
                          style: { color: "var(--ew-text)" },
                          children: state.groupSize
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => dispatch({
                            type: "SET_GROUP",
                            size: Math.min(20, state.groupSize + 1)
                          }),
                          "aria-label": "Increase group size",
                          className: "w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl transition-colors",
                          style: { backgroundColor: "var(--ew-red)", color: "#fff" },
                          "data-ocid": "booking_drawer.group_plus",
                          children: "+"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs",
                          style: { color: "var(--ew-gray-dark)" },
                          children: "persons (max 20)"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs font-semibold mb-2",
                        style: { color: "var(--ew-text)" },
                        children: "Optional Add-ons"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ADD_ONS.map((addon) => {
                      const checked = state.addOns.includes(addon.id);
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          className: "flex items-center gap-3 cursor-pointer rounded-xl px-4 py-3 transition-colors",
                          style: {
                            backgroundColor: checked ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
                            border: `1px solid ${checked ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
                            height: 48
                          },
                          "data-ocid": `booking_drawer.addon.${addon.id}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "checkbox",
                                checked,
                                onChange: () => dispatch({ type: "TOGGLE_ADDON", addon: addon.id }),
                                className: "w-4 h-4"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: "flex-1 text-sm font-medium",
                                style: { color: "var(--ew-text)" },
                                children: addon.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-sm font-bold",
                                style: { color: "var(--ew-orange)" },
                                children: [
                                  "+₹",
                                  addon.price
                                ]
                              }
                            )
                          ]
                        },
                        addon.id
                      );
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4 space-y-1.5 text-sm",
                      style: { backgroundColor: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                            "Trek (₹",
                            price.toLocaleString("en-IN"),
                            " × ",
                            state.groupSize,
                            ")"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                            "₹",
                            (price * state.groupSize).toLocaleString("en-IN")
                          ] })
                        ] }),
                        ADD_ONS.filter((a) => state.addOns.includes(a.id)).map(
                          (addon) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                              addon.label,
                              " × ",
                              state.groupSize
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                              "₹",
                              (addon.price * state.groupSize).toLocaleString(
                                "en-IN"
                              )
                            ] })
                          ] }, addon.id)
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex justify-between font-bold pt-1.5 border-t",
                            style: { borderColor: "var(--ew-gray-mid)" },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text)" }, children: "Total" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-orange)" }, children: [
                                "₹",
                                total.toLocaleString("en-IN")
                              ] })
                            ]
                          }
                        )
                      ]
                    }
                  )
                ]
              },
              "step1"
            ),
            state.step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.2 },
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base",
                      style: { color: "var(--ew-text)" },
                      children: "Traveler Details"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "booking-name",
                        className: "block text-xs font-semibold mb-1.5",
                        style: { color: "var(--ew-text)" },
                        children: "Full Name *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "booking-name",
                        type: "text",
                        placeholder: "Your full name",
                        value: state.name,
                        onChange: (e) => dispatch({
                          type: "SET_FIELD",
                          field: "name",
                          value: e.target.value
                        }),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.name ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "booking_drawer.name_input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "booking_drawer.name_field_error",
                        children: errors.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "booking-phone",
                        className: "block text-xs font-semibold mb-1.5",
                        style: { color: "var(--ew-text)" },
                        children: "Mobile Number *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "booking-phone",
                        type: "tel",
                        placeholder: "10-digit mobile number",
                        value: state.phone,
                        onChange: (e) => dispatch({
                          type: "SET_FIELD",
                          field: "phone",
                          value: e.target.value
                        }),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.phone ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "booking_drawer.phone_input"
                      }
                    ),
                    errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "booking_drawer.phone_field_error",
                        children: errors.phone
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "booking-email",
                        className: "block text-xs font-semibold mb-1.5",
                        style: { color: "var(--ew-text)" },
                        children: "Email Address *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "booking-email",
                        type: "email",
                        placeholder: "your@email.com",
                        value: state.email,
                        onChange: (e) => dispatch({
                          type: "SET_FIELD",
                          field: "email",
                          value: e.target.value
                        }),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.email ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "booking_drawer.email_input"
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "booking_drawer.email_field_error",
                        children: errors.email
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs p-3 rounded-lg",
                      style: {
                        backgroundColor: "var(--ew-orange-lt)",
                        color: "#92400E"
                      },
                      children: "📧 We'll send your booking confirmation and voucher to this email."
                    }
                  )
                ]
              },
              "step2"
            ),
            state.step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -20 },
                transition: { duration: 0.2 },
                className: "space-y-5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base",
                      style: { color: "var(--ew-text)" },
                      children: "Review & Pay"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-xl p-4",
                      style: { border: "1px solid var(--ew-gray-mid)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
                          image && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: image.replace("w=1200", "w=80"),
                              alt: trekName,
                              className: "w-14 h-14 rounded-lg object-cover flex-shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "font-bold text-sm",
                                style: { color: "var(--ew-text)" },
                                children: trekName
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "text-xs",
                                style: { color: "var(--ew-gray-dark)" },
                                children: [
                                  "Date: ",
                                  state.selectedDate,
                                  " · ",
                                  state.groupSize,
                                  " person",
                                  state.groupSize > 1 ? "s" : ""
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "p",
                              {
                                className: "text-xs mt-0.5",
                                style: { color: "var(--ew-gray-dark)" },
                                children: [
                                  state.name,
                                  " · ",
                                  state.phone
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                              "Trek price × ",
                              state.groupSize
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                              "₹",
                              (price * state.groupSize).toLocaleString("en-IN")
                            ] })
                          ] }),
                          ADD_ONS.filter((a) => state.addOns.includes(a.id)).map(
                            (addon) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text-lt)" }, children: [
                                addon.label,
                                " × ",
                                state.groupSize
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-text)" }, children: [
                                "₹",
                                (addon.price * state.groupSize).toLocaleString(
                                  "en-IN"
                                )
                              ] })
                            ] }, addon.id)
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex justify-between font-bold pt-2 mt-1 border-t text-base",
                              style: { borderColor: "var(--ew-gray-mid)" },
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-text)" }, children: "Total Payable" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-orange)" }, children: [
                                  "₹",
                                  total.toLocaleString("en-IN")
                                ] })
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
                      className: "rounded-xl p-4 text-center text-sm",
                      style: { backgroundColor: "var(--ew-gray-lt)" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "font-medium mb-1",
                            style: { color: "var(--ew-text)" },
                            children: "🔒 100% Secure Payment via Razorpay"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: "UPI · Cards · Net Banking · EMI available" })
                      ]
                    }
                  )
                ]
              },
              "step3"
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 px-5 py-4 border-t space-y-2",
            style: { borderColor: "var(--ew-gray-mid)" },
            children: [
              state.step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    if (validateStep1()) dispatch({ type: "SET_STEP", step: 2 });
                  },
                  className: "w-full rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90",
                  style: { height: 48, backgroundColor: "var(--ew-orange)" },
                  "data-ocid": "booking_drawer.step1_continue",
                  children: "Continue →"
                }
              ),
              state.step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => dispatch({ type: "SET_STEP", step: 1 }),
                    className: "flex-1 rounded-xl font-semibold text-sm transition-colors",
                    style: {
                      height: 48,
                      border: "1px solid var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                      backgroundColor: "var(--ew-gray-lt)"
                    },
                    "data-ocid": "booking_drawer.step2_back",
                    children: "← Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      if (validateStep2()) dispatch({ type: "SET_STEP", step: 3 });
                    },
                    className: "flex-[2] rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90",
                    style: { height: 48, backgroundColor: "var(--ew-orange)" },
                    "data-ocid": "booking_drawer.step2_proceed",
                    children: "Proceed to Pay"
                  }
                )
              ] }),
              state.step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => dispatch({ type: "SET_STEP", step: 2 }),
                    className: "flex-1 rounded-xl font-semibold text-sm transition-colors",
                    style: {
                      height: 48,
                      border: "1px solid var(--ew-gray-mid)",
                      color: "var(--ew-text)",
                      backgroundColor: "var(--ew-gray-lt)"
                    },
                    "data-ocid": "booking_drawer.step3_back",
                    children: "← Back"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: initiatePayment,
                    disabled: rzpLoading,
                    className: "flex-[2] rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90 disabled:opacity-60",
                    style: { height: 48, backgroundColor: "var(--ew-red)" },
                    "data-ocid": "booking_drawer.pay_button",
                    children: rzpLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          className: "animate-spin",
                          width: "16",
                          height: "16",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "white",
                              strokeWidth: "3",
                              strokeDasharray: "30 70"
                            }
                          )
                        }
                      ),
                      "Loading..."
                    ] }) : `Pay Now ₹${total.toLocaleString("en-IN")}`
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed inset-0 z-[110]",
        style: { backgroundColor: "rgba(0,0,0,0.5)" },
        onClick: onClose,
        "aria-hidden": "true"
      },
      "backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: isMobile ? { y: "100%" } : { x: "100%" },
        animate: isMobile ? { y: 0 } : { x: 0 },
        exit: isMobile ? { y: "100%" } : { x: "100%" },
        transition: { type: "spring", stiffness: 300, damping: 30 },
        className: "fixed z-[120] overflow-hidden shadow-2xl",
        style: {
          ...isMobile ? {
            bottom: 0,
            left: 0,
            right: 0,
            top: "auto",
            maxHeight: "95vh",
            borderRadius: "20px 20px 0 0"
          } : {
            top: 0,
            right: 0,
            bottom: 0,
            width: 480,
            borderRadius: "20px 0 0 20px"
          }
        },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `Book ${trekName}`,
        "data-ocid": "booking_drawer.dialog",
        children: drawerContent
      },
      "drawer"
    )
  ] }) });
}
const INITIAL = { name: "", phone: "", email: "", message: "" };
function QueryBottomSheet({
  isOpen,
  onClose,
  trekName
}) {
  const isMobile = useIsMobile();
  const [form, setForm] = reactExports.useState(INITIAL);
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const sheetRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
  reactExports.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(INITIAL);
        setErrors({});
        setSubmitted(false);
      }, 300);
    }
  }, [isOpen]);
  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      errs.phone = "Enter valid 10-digit mobile";
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
      errs.email = "Enter valid email";
    if (!form.message.trim()) errs.message = "Please write a message";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    console.log("[EternaWings] Query submitted:", {
      trek: trekName,
      ...form,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    ue.success("Query sent! We'll contact you within 1 hour. 🏔️");
    setTimeout(onClose, 1800);
  }
  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: void 0 }));
  }
  const sheetHeight = isMobile ? "85vh" : "60vh";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
        className: "fixed inset-0 z-[110]",
        style: { backgroundColor: "rgba(0,0,0,0.45)" },
        onClick: onClose,
        "aria-hidden": "true"
      },
      "qs-backdrop"
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        ref: sheetRef,
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", stiffness: 320, damping: 32 },
        className: "fixed bottom-0 left-0 right-0 z-[120] bg-white overflow-hidden flex flex-col",
        style: {
          borderRadius: "20px 20px 0 0",
          maxHeight: sheetHeight,
          boxShadow: "0 -4px 32px rgba(0,0,0,0.18)"
        },
        role: "dialog",
        "data-ocid": "query_sheet.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-full",
              style: {
                width: 36,
                height: 4,
                backgroundColor: "var(--ew-gray-mid)"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between px-5 pb-3 pt-1 flex-shrink-0 border-b",
              style: { borderColor: "var(--ew-gray-mid)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "font-bold text-base",
                      style: { color: "var(--ew-text)" },
                      children: trekName ? `Ask Us About ${trekName}` : "Send a Query"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: "We'll respond within 1 hour · Toll-free: 1800-XXX-XXXX" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "Close query sheet",
                    className: "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                    style: {
                      backgroundColor: "var(--ew-gray-lt)",
                      color: "var(--ew-text)"
                    },
                    "data-ocid": "query_sheet.close_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 14 14",
                        fill: "none",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "path",
                          {
                            d: "M1 1l12 12M13 1L1 13",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round"
                          }
                        )
                      }
                    )
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto px-5 py-4", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              className: "flex flex-col items-center justify-center py-10 text-center",
              "data-ocid": "query_sheet.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl",
                    style: { backgroundColor: "#E8F5E9" },
                    children: "✅"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h4",
                  {
                    className: "font-bold text-lg mb-1",
                    style: { color: "var(--ew-text)" },
                    children: "Query Sent!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: [
                  "Our trek expert will contact you at ",
                  form.phone,
                  " within 1 hour."
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-4",
              noValidate: true,
              "data-ocid": "query_sheet.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "trek", value: trekName ?? "" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "qs-name",
                        className: "block text-xs font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Full Name *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "qs-name",
                        type: "text",
                        placeholder: "Your name",
                        value: form.name,
                        onChange: (e) => setField("name", e.target.value),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.name ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "query_sheet.name_input"
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "query_sheet.name_field_error",
                        children: errors.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "qs-phone",
                        className: "block text-xs font-semibold mb-1",
                        style: { color: "var(--ew-text)" },
                        children: "Mobile *"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        id: "qs-phone",
                        type: "tel",
                        placeholder: "10-digit number",
                        value: form.phone,
                        onChange: (e) => setField("phone", e.target.value),
                        onFocus: (e) => e.currentTarget.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        }),
                        className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                        style: {
                          height: 48,
                          border: `1px solid ${errors.phone ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)"
                        },
                        "data-ocid": "query_sheet.phone_input"
                      }
                    ),
                    errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-xs mt-1",
                        style: { color: "var(--ew-red)" },
                        "data-ocid": "query_sheet.phone_field_error",
                        children: errors.phone
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "qs-email",
                      className: "block text-xs font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "Email *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "qs-email",
                      type: "email",
                      placeholder: "your@email.com",
                      value: form.email,
                      onChange: (e) => setField("email", e.target.value),
                      onFocus: (e) => e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                      }),
                      className: "w-full rounded-xl px-4 text-sm focus:outline-none",
                      style: {
                        height: 48,
                        border: `1px solid ${errors.email ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                        color: "var(--ew-text)"
                      },
                      "data-ocid": "query_sheet.email_input"
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "query_sheet.email_field_error",
                      children: errors.email
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "qs-message",
                      className: "block text-xs font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "Message *"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "textarea",
                    {
                      id: "qs-message",
                      placeholder: trekName ? `I'd like to know more about ${trekName}...` : "Type your question or requirement...",
                      value: form.message,
                      onChange: (e) => setField("message", e.target.value),
                      onFocus: (e) => e.currentTarget.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                      }),
                      rows: 3,
                      className: "w-full rounded-xl px-4 py-3 text-sm focus:outline-none resize-none",
                      style: {
                        border: `1px solid ${errors.message ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                        color: "var(--ew-text)"
                      },
                      "data-ocid": "query_sheet.message_textarea"
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "query_sheet.message_field_error",
                      children: errors.message
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    className: "w-full rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90",
                    style: { height: 48, backgroundColor: "var(--ew-orange)" },
                    "data-ocid": "query_sheet.submit_button",
                    children: "Send Query 🏔️"
                  }
                )
              ]
            }
          ) })
        ]
      },
      "qs-sheet"
    )
  ] }) });
}
function RatingBreakdown({ reviews }) {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length
  }));
  const avg = total > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col sm:flex-row gap-6 items-start rounded-xl p-5 mb-6",
      style: { backgroundColor: "var(--ew-gray-lt)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-5xl font-bold leading-none mb-1",
              style: { color: "var(--ew-text)" },
              children: avg
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-0.5 my-1", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Star,
            {
              size: 15,
              style: { color: "var(--ew-gold)" },
              className: n <= Math.round(Number(avg)) ? "fill-[var(--ew-gold)]" : "fill-none"
            },
            n
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: [
            total,
            " ",
            total === 1 ? "review" : "reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full space-y-1.5", children: counts.map(({ star, count }) => {
          const pct = total > 0 ? Math.round(count / total * 100) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs w-3 flex-shrink-0",
                style: { color: "var(--ew-gray-dark)" },
                children: star
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 11,
                style: { color: "var(--ew-gold)" },
                className: "fill-[var(--ew-gold)] flex-shrink-0"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 rounded-full h-2",
                style: { backgroundColor: "var(--ew-gray-mid)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-2 rounded-full transition-all duration-500",
                    style: {
                      width: `${pct}%`,
                      backgroundColor: "var(--ew-orange)"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-[11px] w-8 text-right flex-shrink-0",
                style: { color: "var(--ew-gray-dark)" },
                children: [
                  pct,
                  "%"
                ]
              }
            )
          ] }, star);
        }) })
      ]
    }
  );
}
function ExistingReviewCard({
  review,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "rounded-xl p-4",
      style: { border: "1px solid var(--ew-gray-mid)" },
      "data-ocid": `review_form.review.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm",
            style: {
              background: "var(--ew-red-lt)",
              color: "var(--ew-red)"
            },
            children: review.author.charAt(0)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-semibold text-sm",
                  style: { color: "var(--ew-text)" },
                  children: review.author
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs", style: { color: "var(--ew-gray-dark)" }, children: [
                review.city,
                " · ",
                review.date
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                size: 13,
                style: { color: "var(--ew-gold)" },
                className: n <= review.rating ? "fill-[var(--ew-gold)]" : "fill-none"
              },
              n
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm leading-relaxed",
              style: { color: "var(--ew-text-lt)" },
              children: review.review
            }
          )
        ] })
      ] })
    }
  );
}
function StarPicker({
  value,
  onChange
}) {
  const [hover, setHover] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onMouseEnter: () => setHover(s),
        onMouseLeave: () => setHover(0),
        onClick: () => onChange(s),
        "aria-label": `Rate ${s} star${s > 1 ? "s" : ""}`,
        className: "transition-transform hover:scale-110",
        style: { padding: 2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            size: 26,
            style: {
              color: s <= (hover || value) ? "var(--ew-gold)" : "var(--ew-gray-mid)"
            },
            className: s <= (hover || value) ? "fill-[var(--ew-gold)]" : "fill-none"
          }
        )
      },
      s
    )),
    value > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "text-sm font-medium ml-2",
        style: { color: "var(--ew-text-lt)" },
        children: ["Bad", "Poor", "Okay", "Good", "Amazing!"][value - 1]
      }
    )
  ] });
}
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const YEARS = Array.from({ length: 6 }, (_, i) => String(2025 - i));
function ReviewSubmitForm({
  trekSlug,
  trekName
}) {
  const [form, setForm] = reactExports.useState({
    rating: 0,
    title: "",
    text: "",
    month: "",
    year: "",
    name: "",
    city: "",
    photos: []
  });
  const [errors, setErrors] = reactExports.useState({});
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [photoPreviews, setPhotoPreviews] = reactExports.useState([]);
  const fileInputRef = reactExports.useRef(null);
  const [localReviews, setLocalReviews] = reactExports.useState([]);
  const seededReviews = getReviewsByTrek(trekSlug);
  const allReviews = [...seededReviews, ...localReviews];
  const wordCount = form.text.trim().split(/\s+/).filter(Boolean).length;
  function validate() {
    const e = {};
    if (!form.rating) e.rating = "Please select a rating.";
    if (form.title.trim().length < 5)
      e.title = "Title must be at least 5 characters.";
    if (wordCount < 50)
      e.text = `Please write at least 50 words (${wordCount} so far).`;
    if (!form.name.trim()) e.name = "Your name is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleFileChange(e) {
    const files = Array.from(e.target.files ?? []).slice(0, 5);
    setForm((prev) => ({ ...prev, photos: files }));
    const previews = files.map((f) => URL.createObjectURL(f));
    setPhotoPreviews(previews);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const newReview = {
      id: Date.now(),
      author: form.name.trim(),
      city: form.city.trim() || "India",
      rating: form.rating,
      review: form.text.trim(),
      trek: trekName,
      trekSlug,
      trekBadge: true,
      date: `${form.month ? form.month.slice(0, 3) : ""} ${form.year}`.trim() || "2025"
    };
    setLocalReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);
    setForm({
      rating: 0,
      title: "",
      text: "",
      month: "",
      year: "",
      name: "",
      city: "",
      photos: []
    });
    setPhotoPreviews([]);
    setErrors({});
    ue.success(
      "Thank you! Your review will appear after verification (usually within 24 hours).",
      { duration: 5e3 }
    );
    setTimeout(() => setSubmitted(false), 6e3);
  }
  const inputCls = "w-full rounded-lg px-3 py-3 text-sm focus:outline-none transition-colors";
  const inputStyle = (hasError) => ({
    border: `1px solid ${hasError ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
    color: "var(--ew-text)",
    height: 48,
    background: "#fff"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    allReviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-12 rounded-2xl",
        style: { background: "var(--ew-gray-lt)" },
        "data-ocid": "review_form.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "🏔️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "h3",
            {
              className: "font-bold text-base mb-1",
              style: { color: "var(--ew-text)" },
              children: [
                "Be the first to review ",
                trekName,
                "!"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm max-w-xs mx-auto",
              style: { color: "var(--ew-text-lt)" },
              children: "Share your experience and help other trekkers plan their adventure."
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RatingBreakdown, { reviews: allReviews }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: allReviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExistingReviewCard, { review: r, index: i }, r.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between rounded-xl p-4 flex-wrap gap-3",
          style: {
            background: "var(--ew-orange-lt)",
            border: "1px solid var(--ew-orange)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🌟" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-sm",
                    style: { color: "var(--ew-text)" },
                    children: "4.8 ⭐ on Google · 2,400+ reviews"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-text-lt)" }, children: "Powered by Google My Business" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://g.page/r/eternawings/review",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-[12px] font-semibold px-4 py-2 rounded-full transition-colors",
                style: {
                  background: "var(--ew-orange)",
                  color: "#fff",
                  textDecoration: "none"
                },
                "data-ocid": "review_form.google_share_button",
                children: "Share on Google"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-6",
        style: { border: "1px solid var(--ew-gray-mid)", background: "#fff" },
        "data-ocid": "review_form.container",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-bold text-base mb-5",
              style: { color: "var(--ew-text)" },
              children: "Write a Review"
            }
          ),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center py-8",
              "data-ocid": "review_form.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-3", children: "✅" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-bold text-base",
                    style: { color: "var(--ew-text)" },
                    children: "Review Submitted!"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", style: { color: "var(--ew-text-lt)" }, children: "Your review will appear after our team verifies it (usually within 24 hours)." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-5",
              noValidate: true,
              "data-ocid": "review_form.form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "star-rating-input",
                      className: "block text-sm font-semibold mb-2",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Rate your experience",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-red)" }, children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "hidden",
                      id: "star-rating-input",
                      value: form.rating,
                      "aria-label": "Star rating",
                      "aria-required": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    StarPicker,
                    {
                      value: form.rating,
                      onChange: (n) => setForm((p) => ({ ...p, rating: n }))
                    }
                  ),
                  errors.rating && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "review_form.rating.field_error",
                      children: errors.rating
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "rv-title",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Review title ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-red)" }, children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "rv-title",
                      type: "text",
                      className: inputCls,
                      style: inputStyle(!!errors.title),
                      placeholder: "E.g., 'Most magical week of my life'",
                      value: form.title,
                      onChange: (e) => setForm((p) => ({ ...p, title: e.target.value })),
                      "data-ocid": "review_form.title.input"
                    }
                  ),
                  errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "review_form.title.field_error",
                      children: errors.title
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "rv-text",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Your review ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-red)" }, children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        id: "rv-text",
                        rows: 5,
                        className: "w-full rounded-lg px-3 py-3 text-sm focus:outline-none resize-none",
                        style: {
                          border: `1px solid ${errors.text ? "var(--ew-red)" : "var(--ew-gray-mid)"}`,
                          color: "var(--ew-text)",
                          background: "#fff",
                          minHeight: 120
                        },
                        placeholder: "Consider covering: Was the guide helpful? How was the food? Was the difficulty rating accurate? What surprised you most?",
                        value: form.text,
                        onChange: (e) => setForm((p) => ({ ...p, text: e.target.value })),
                        "data-ocid": "review_form.text.textarea"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "absolute bottom-2 right-3 text-[11px]",
                        style: {
                          color: wordCount < 50 ? "var(--ew-gray-dark)" : "var(--ew-green)"
                        },
                        children: [
                          wordCount,
                          " / 500 words"
                        ]
                      }
                    )
                  ] }),
                  errors.text && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "review_form.text.field_error",
                      children: errors.text
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "month-select",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: "When did you complete this trek?"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        id: "month-select",
                        className: "flex-1 rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                        style: {
                          border: "1px solid var(--ew-gray-mid)",
                          color: "var(--ew-text)",
                          height: 48,
                          background: "#fff"
                        },
                        value: form.month,
                        onChange: (e) => setForm((p) => ({ ...p, month: e.target.value })),
                        "data-ocid": "review_form.month.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Month" }),
                          MONTHS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m, children: m }, m))
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        className: "flex-1 rounded-lg px-3 py-2.5 text-sm focus:outline-none",
                        style: {
                          border: "1px solid var(--ew-gray-mid)",
                          color: "var(--ew-text)",
                          height: 48,
                          background: "#fff"
                        },
                        value: form.year,
                        onChange: (e) => setForm((p) => ({ ...p, year: e.target.value })),
                        "data-ocid": "review_form.year.select",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Year" }),
                          YEARS.map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: y, children: y }, y))
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "photo-upload-input",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Upload photos",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-normal",
                            style: { color: "var(--ew-gray-dark)" },
                            children: "(optional, max 5)"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "photo-upload-input",
                      className: "w-full rounded-lg py-3 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center",
                      style: {
                        border: "2px dashed var(--ew-gray-mid)",
                        color: "var(--ew-text-lt)",
                        background: "var(--ew-gray-lt)"
                      },
                      "data-ocid": "review_form.photo.upload_button",
                      children: "📷 Click to upload trek photos (JPG/PNG, max 5MB each)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      id: "photo-upload-input",
                      type: "file",
                      accept: "image/jpeg,image/png",
                      multiple: true,
                      className: "hidden",
                      onChange: handleFileChange
                    }
                  ),
                  photoPreviews.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-2 flex-wrap", children: photoPreviews.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src,
                      alt: `Preview ${i + 1}`,
                      className: "w-16 h-16 object-cover rounded-lg",
                      style: { border: "1px solid var(--ew-gray-mid)" }
                    },
                    i
                  )) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "rv-name",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Your name (displayed publicly)",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "var(--ew-red)" }, children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "rv-name",
                      type: "text",
                      className: inputCls,
                      style: inputStyle(!!errors.name),
                      placeholder: "Your full name or display name",
                      value: form.name,
                      onChange: (e) => setForm((p) => ({ ...p, name: e.target.value })),
                      "data-ocid": "review_form.name.input"
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs mt-1",
                      style: { color: "var(--ew-red)" },
                      "data-ocid": "review_form.name.field_error",
                      children: errors.name
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "label",
                    {
                      htmlFor: "rv-city",
                      className: "block text-sm font-semibold mb-1",
                      style: { color: "var(--ew-text)" },
                      children: [
                        "Your city",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-normal",
                            style: { color: "var(--ew-gray-dark)" },
                            children: "(optional)"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "rv-city",
                      type: "text",
                      className: inputCls,
                      style: inputStyle(false),
                      placeholder: "Mumbai, Delhi, Bangalore...",
                      value: form.city,
                      onChange: (e) => setForm((p) => ({ ...p, city: e.target.value })),
                      "data-ocid": "review_form.city.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    className: "w-full rounded-xl py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5",
                    style: {
                      background: "var(--ew-red)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(192,0,28,0.3)"
                    },
                    "data-ocid": "review_form.submit_button",
                    children: "Submit Review"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-center text-[11px]",
                    style: { color: "var(--ew-gray-dark)" },
                    children: "Your review will also help future trekkers plan their adventure."
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function makeSearchUrl(tag, type = "trek") {
  const base = type === "trek" ? "/treks" : "/yatras";
  return `${base}?filter=${encodeURIComponent(tag)}`;
}
function SeoTagCloud({
  name,
  slug,
  state,
  difficulty,
  duration,
  type = "trek",
  relatedSlugs = [],
  relatedNames = []
}) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const stateLabel = state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh";
  const basePath = type === "trek" ? "/treks" : "/yatras";
  const tags = [];
  const addSearch = (label) => tags.push({ label, href: makeSearchUrl(label, type) });
  const addPage = (label, href) => tags.push({ label, href });
  if (type === "trek") {
    addSearch(name);
    addSearch(`${name} ${year}`);
    addSearch(`${name} ${year + 1}`);
    addSearch(`${name} from Delhi`);
    addSearch(`${name} Package`);
    addSearch(`Best Treks in ${stateLabel}`);
    addSearch(`${stateLabel} Adventure Treks`);
    if (difficulty) addSearch(`${difficulty} Treks India`);
    addSearch("Summer Treks India 2025");
    addSearch("5000m Altitude Treks");
    if (duration) addSearch(`${duration} Days Trek`);
    addSearch("Himalayan Treks India");
    addSearch("Trek Packages from Delhi");
    addSearch("EternaWings Reviews");
    addSearch("Certified Mountain Guide Treks");
    addSearch("Safe Himalayan Treks");
    addSearch("Small Group Treks India");
    addSearch("Uttarakhand Treks");
    addSearch("Himachal Pradesh Treks");
    addSearch("Snow Treks India");
    addSearch("Weekend Treks from Delhi");
    addSearch("Adventure Tourism India");
    addSearch("Trek Packages 2025");
    addSearch("Beginner Treks Himalaya");
    addSearch("Family Treks India");
    addPage("Roopkund Trek", "/treks/roopkund-trek");
    addPage("Kedarkantha Trek", "/treks/kedarkantha-trek");
    addPage("Valley of Flowers Trek", "/treks/valley-of-flowers-trek");
    addPage("Hampta Pass Trek", "/treks/hampta-pass-trek");
    addPage("Triund Trek", "/treks/triund-trek");
    addPage("Har Ki Dun Trek", "/treks/har-ki-dun-trek");
    relatedNames.forEach((rName, i) => {
      if (relatedSlugs[i]) {
        addPage(rName, `${basePath}/${relatedSlugs[i]}`);
      }
    });
  } else {
    addSearch(name);
    addSearch(`${name} ${year}`);
    addSearch(`${name} ${year + 1}`);
    addSearch(`${name} Package`);
    addSearch(`Best Yatras in ${stateLabel}`);
    addSearch(`${stateLabel} Pilgrimage`);
    addSearch("Himalayan Yatra 2025");
    addSearch("Spiritual Trek India");
    addSearch("Sacred Pilgrimage India");
    addSearch("Char Dham Yatra");
    addSearch("Uttarakhand Pilgrimage");
    addSearch("Himachal Pilgrimage");
    addSearch("Hindu Pilgrimage India");
    addSearch("Sikh Pilgrimage India");
    addSearch("Pilgrimage Packages 2025");
    addSearch("EternaWings Yatra Reviews");
    addSearch("VIP Darshan Yatra");
    addSearch("Group Pilgrimage India");
    addSearch("Senior Friendly Yatra");
    addSearch("Helicopter Yatra Packages");
    addPage("Char Dham Yatra", "/yatras/char-dham-yatra");
    addPage("Kedarnath Yatra", "/yatras/kedarnath-yatra");
    addPage("Badrinath Yatra", "/yatras/badrinath-yatra");
    addPage("Hemkund Sahib Yatra", "/yatras/hemkund-sahib-yatra");
    addPage("Panch Kedar Yatra", "/yatras/panch-kedar-yatra");
    addPage("Mani Mahesh Yatra", "/yatras/mani-mahesh-yatra");
    relatedNames.forEach((rName, i) => {
      if (relatedSlugs[i]) {
        addPage(rName, `${basePath}/${relatedSlugs[i]}`);
      }
    });
  }
  const seen = /* @__PURE__ */ new Set();
  const uniqueTags = tags.filter(({ href }) => {
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });
  const [expanded, setExpanded] = reactExports.useState(false);
  const MOBILE_MAX = 15;
  const displayTags = !expanded && uniqueTags.length > MOBILE_MAX ? uniqueTags.slice(0, MOBILE_MAX) : uniqueTags;
  const hasMore = uniqueTags.length > MOBILE_MAX;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      style: {
        backgroundColor: "#F5F5F5",
        borderTop: "1px solid #EBEBEB"
      },
      "aria-label": `Explore more ${type === "trek" ? "treks" : "yatras"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-8 py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-[13px] uppercase tracking-wider mb-4",
            style: { color: "#888888" },
            children: [
              "Explore More —",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                stateLabel,
                " ",
                type === "trek" ? "Treks" : "Yatras",
                " & Packages"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          displayTags.map(({ label, href }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: href,
              className: "inline-block text-[11px] px-[10px] py-[4px] rounded-full no-underline transition-colors duration-150",
              style: {
                border: "1px solid #C0001C",
                color: "#C0001C"
              },
              onMouseEnter: (e) => {
                const t = e.currentTarget;
                t.style.backgroundColor = "#C0001C";
                t.style.color = "#ffffff";
              },
              onMouseLeave: (e) => {
                const t = e.currentTarget;
                t.style.backgroundColor = "transparent";
                t.style.color = "#C0001C";
              },
              "data-ocid": `seo_tag_cloud.tag.${slug}`,
              children: label
            },
            `${label}-${href}`
          )),
          hasMore && !expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setExpanded(true),
              className: "inline-block text-[11px] px-[10px] py-[4px] rounded-full transition-colors duration-150 cursor-pointer",
              style: { border: "1px solid #888", color: "#888" },
              "data-ocid": "seo_tag_cloud.expand_button",
              children: [
                "+",
                uniqueTags.length - MOBILE_MAX,
                " more"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
const ICON_SIZE = 48;
function ShareSection({ title, url }) {
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMsg = encodeURIComponent(
    `Check out ${title} on Trekora: ${shareUrl}`
  );
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => null);
    ue.success("Link copied!", { duration: 2e3 });
  };
  const buttons = [
    {
      label: "WhatsApp",
      ariaLabel: "Share on WhatsApp",
      bg: "#25D366",
      href: `https://wa.me/?text=${encodedMsg}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          width: "22",
          height: "22",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.124 1.523 5.86L0 24l6.292-1.497A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.855 0-3.594-.502-5.09-1.38l-.361-.216-3.734.889.94-3.631-.235-.374A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" })
          ]
        }
      )
    },
    {
      label: "Facebook",
      ariaLabel: "Share on Facebook",
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          width: "22",
          height: "22",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
        }
      )
    },
    {
      label: "Twitter/X",
      ariaLabel: "Share on Twitter / X",
      bg: "#000",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`${title} — Trekora Himalayan Adventures`)}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          width: "20",
          height: "20",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.66 2.25H8.08l4.252 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
        }
      )
    },
    {
      label: "Instagram",
      ariaLabel: "View Trekora on Instagram",
      bg: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      href: "https://www.instagram.com/trekora/",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          width: "22",
          height: "22",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
        }
      )
    },
    {
      label: "YouTube",
      ariaLabel: "View Trekora on YouTube",
      bg: "#FF0000",
      href: "https://www.youtube.com/@trekora",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "currentColor",
          width: "22",
          height: "22",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" })
        }
      )
    },
    {
      label: "Copy Link",
      ariaLabel: "Copy link to clipboard",
      bg: "#E5E7EB",
      onClick: handleCopy,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          width: "20",
          height: "20",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
          ]
        }
      )
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h3",
      {
        className: "font-semibold text-lg mb-4",
        style: { color: "var(--ew-text)" },
        children: "Share & Inspire Others"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 flex-wrap", children: buttons.map((btn) => {
      const isGradient = btn.bg.includes("gradient");
      const style = isGradient ? {
        background: btn.bg,
        color: "#fff",
        width: ICON_SIZE,
        height: ICON_SIZE
      } : {
        backgroundColor: btn.bg,
        color: btn.bg === "#E5E7EB" ? "#374151" : "#fff",
        width: ICON_SIZE,
        height: ICON_SIZE
      };
      if (btn.href) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.a,
          {
            href: btn.href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": btn.ariaLabel,
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 },
            style,
            className: "rounded-full flex items-center justify-center shadow-sm transition-shadow hover:shadow-md flex-shrink-0",
            "data-ocid": `share.${btn.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_button`,
            children: btn.icon
          },
          btn.label
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          "aria-label": btn.ariaLabel,
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.95 },
          onClick: btn.onClick,
          style,
          className: "rounded-full flex items-center justify-center shadow-sm transition-shadow hover:shadow-md flex-shrink-0",
          "data-ocid": `share.${btn.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_button`,
          children: btn.icon
        },
        btn.label
      );
    }) })
  ] });
}
function buildRichCoords(coords, trek) {
  var _a, _b;
  const profile = coords.altitudeProfile ?? [];
  const getAlt = (idx) => {
    var _a2;
    return ((_a2 = profile[idx]) == null ? void 0 : _a2.altitude) ?? 0;
  };
  const start = {
    lat: coords.start[0],
    lng: coords.start[1],
    name: trek.startPoint ?? "Start",
    altitude: getAlt(0),
    type: "start",
    day: 1,
    activity: ((_a = profile[0]) == null ? void 0 : _a.label) ?? "Trek starts here"
  };
  const waypoints = coords.waypoints.map((wp, i) => {
    var _a2, _b2, _c;
    const profIdx = Math.min(i + 1, Math.max(0, profile.length - 2));
    return {
      lat: wp[0],
      lng: wp[1],
      name: ((_a2 = profile[profIdx]) == null ? void 0 : _a2.label) ?? `Stop ${i + 1}`,
      altitude: ((_b2 = profile[profIdx]) == null ? void 0 : _b2.altitude) ?? 0,
      type: "camp",
      day: profIdx + 1,
      activity: ((_c = profile[profIdx]) == null ? void 0 : _c.label) ?? void 0
    };
  });
  const end = {
    lat: coords.end[0],
    lng: coords.end[1],
    name: trek.endPoint ?? "End",
    altitude: getAlt(Math.max(0, profile.length - 1)),
    type: "end",
    day: profile.length,
    activity: ((_b = profile[profile.length - 1]) == null ? void 0 : _b.label) ?? "Trek ends here"
  };
  return { start, waypoints, end };
}
function buildYatraRichCoords(yatra) {
  if (!yatra.coordinates) return null;
  const { start, waypoints, end } = yatra.coordinates;
  return {
    start: {
      lat: start[0],
      lng: start[1],
      name: yatra.startPoint ?? "Start",
      altitude: 1e3,
      type: "start"
    },
    waypoints: waypoints.map((wp, i) => ({
      lat: wp[0],
      lng: wp[1],
      name: `Stop ${i + 1}`,
      altitude: 2e3,
      type: "temple"
    })),
    end: {
      lat: end[0],
      lng: end[1],
      name: "Destination",
      altitude: 1e3,
      type: "end"
    }
  };
}
const MARKER_CONFIG = {
  start: { bg: "#2E7D32", emoji: "🚩" },
  end: { bg: "#C0001C", emoji: "🏁" },
  camp: { bg: "#E87722", emoji: "🏕️" },
  summit: { bg: "#7B1FA2", emoji: "⛰️" },
  village: { bg: "#1565C0", emoji: "🏘️" },
  pass: { bg: "#6A1B9A", emoji: "🗻" },
  lake: { bg: "#0277BD", emoji: "🏞️" },
  temple: { bg: "#C0001C", emoji: "🛕" }
};
function markerHtml(type, label) {
  const cfg = MARKER_CONFIG[type] ?? MARKER_CONFIG.camp;
  return `<div style="display:flex;flex-direction:column;align-items:center;">
    <div style="background:${cfg.bg};border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2.5px solid white;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-size:16px;cursor:pointer;">${cfg.emoji}</div>
    ${label ? `<div style="background:${cfg.bg};color:white;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600;margin-top:2px;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,0.25);">${label}</div>` : ""}
  </div>`;
}
function pulsingMarkerHtml() {
  return `<div style="position:relative;width:40px;height:40px;">
    <div style="position:absolute;inset:0;border-radius:50%;background:#C0001C;opacity:0.3;animation:ew-pulse-ring 1.5s ease-out infinite;"></div>
    <div style="position:absolute;inset:6px;border-radius:50%;background:#C0001C;border:2px solid white;box-shadow:0 2px 8px rgba(192,0,28,0.5);"></div>
  </div>`;
}
function StateOverviewMap({
  state,
  trekLat,
  trekLng,
  trekName
}) {
  const mapRef = reactExports.useRef(null);
  const mapInstanceRef = reactExports.useRef(null);
  const stateCenter = state === "himachal" ? [31.9165, 77.5723] : [30.0668, 79.0193];
  const stateName = state === "himachal" ? "Himachal Pradesh" : "Uttarakhand";
  reactExports.useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    __vitePreload(() => import("./leaflet-src-9NeJaaKe.js").then((n) => n.l), true ? __vite__mapDeps([0,1]) : void 0).then((mod) => {
      const L = mod.default;
      const map = L.map(mapRef.current, {
        center: stateCenter,
        zoom: 7,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: false
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(map);
      const pulseIcon = L.divIcon({
        html: pulsingMarkerHtml(),
        className: "ew-pulse-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22]
      });
      L.marker([trekLat, trekLng], { icon: pulseIcon }).addTo(map).bindPopup(`<strong>${trekName}</strong>`, { closeButton: false });
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [trekLat, trekLng, trekName, state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden",
      style: { border: "1px solid #e5e7eb", borderTop: "3px solid #C0001C" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5",
            style: {
              background: "white",
              color: "#1A1A2E",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full inline-block",
                  style: { background: "#C0001C" }
                }
              ),
              stateName,
              " Overview"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapRef, style: { height: 300, width: "100%" } })
      ]
    }
  );
}
function TrailMap({ richCoords, trekName }) {
  const mapRef = reactExports.useRef(null);
  const mapInstanceRef = reactExports.useRef(null);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const allPoints = [
      richCoords.start,
      ...richCoords.waypoints,
      richCoords.end
    ];
    __vitePreload(() => import("./leaflet-src-9NeJaaKe.js").then((n) => n.l), true ? __vite__mapDeps([0,1]) : void 0).then((mod) => {
      const L = mod.default;
      const lats = allPoints.map((p) => p.lat);
      const lngs = allPoints.map((p) => p.lng);
      const bounds = [
        [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
        [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02]
      ];
      const map = L.map(mapRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
        attributionControl: false
      });
      map.fitBounds(bounds, { padding: [40, 40] });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19
      }).addTo(map);
      const latLngs = allPoints.map((p) => [p.lat, p.lng]);
      L.polyline(latLngs, {
        color: "#C0001C",
        weight: 4,
        opacity: 0.85,
        lineJoin: "round"
      }).addTo(map);
      for (const wp of allPoints) {
        const isStartPt = wp.type === "start";
        const isEndPt = wp.type === "end";
        const labelText = isStartPt ? "START" : isEndPt ? "END" : void 0;
        const icon = L.divIcon({
          html: markerHtml(wp.type, labelText),
          className: "ew-trail-marker",
          iconSize: [34, isStartPt || isEndPt ? 52 : 34],
          iconAnchor: [17, isStartPt || isEndPt ? 52 : 17],
          popupAnchor: [0, -34]
        });
        const popupContent = `
          <div style="font-family:system-ui,sans-serif;min-width:160px;">
            <p style="font-size:14px;font-weight:700;color:#1A1A2E;margin:0 0 4px;">${wp.name}</p>
            ${wp.altitude ? `<p style="font-size:12px;color:#E87722;margin:0 0 2px;">🗻 ${wp.altitude.toLocaleString()}m above sea level</p>` : ""}
            ${wp.day ? `<p style="font-size:11px;color:#666;margin:0 0 2px;">Day ${wp.day}</p>` : ""}
            ${wp.activity ? `<p style="font-size:11px;color:#888;margin:0;">${wp.activity}</p>` : ""}
          </div>`;
        L.marker([wp.lat, wp.lng], { icon }).addTo(map).bindPopup(popupContent, { maxWidth: 220 });
      }
      mapInstanceRef.current = map;
    });
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [richCoords]);
  reactExports.useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        var _a;
        return (_a = mapInstanceRef.current) == null ? void 0 : _a.invalidateSize();
      }, 100);
    }
  }, [isFullscreen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative rounded-xl overflow-hidden",
      style: {
        border: "1px solid #e5e7eb",
        borderTop: "3px solid #C0001C",
        height: isFullscreen ? "100vh" : 450,
        ...isFullscreen ? { position: "fixed", inset: 0, zIndex: 9999, borderRadius: 0 } : {}
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute top-3 left-3 z-[1000] px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5",
            style: {
              background: "white",
              color: "#1A1A2E",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { size: 12, style: { color: "#C0001C" } }),
              "Trail Map — ",
              trekName
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsFullscreen((v) => !v),
            className: "absolute top-3 right-3 z-[1000] p-2 rounded-lg hover:bg-gray-100 transition-colors",
            style: { background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" },
            "aria-label": isFullscreen ? "Exit fullscreen" : "Expand map",
            "data-ocid": "trek_map.fullscreen_toggle",
            children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minimize2, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { size: 15 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: mapRef, style: { height: "100%", width: "100%" } })
      ]
    }
  );
}
function CustomAltTooltip({
  active,
  payload,
  label,
  data
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const dayNum = Number(String(label ?? "").replace("Day ", ""));
  const point = data.find((d) => d.day === dayNum);
  if (!point) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl px-3 py-2.5 text-xs shadow-xl",
      style: {
        background: "#1A1A2E",
        color: "white",
        minWidth: 150,
        border: "1px solid rgba(255,255,255,0.1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm mb-1", style: { color: "#E87722" }, children: [
          "Day ",
          point.day
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: point.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "rgba(255,255,255,0.75)" }, children: [
          point.altitude.toLocaleString(),
          "m altitude"
        ] }),
        point.amsRisk === "high" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", style: { color: "#ff6b6b" }, children: "⚠️ High AMS Risk" }),
        point.amsRisk === "medium" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", style: { color: "#E87722" }, children: "⚡ Moderate AMS Risk" })
      ]
    }
  );
}
function AltitudeProfile({ altitudeProfile }) {
  if (!altitudeProfile || altitudeProfile.length < 2) return null;
  const maxAlt = Math.max(...altitudeProfile.map((p) => p.altitude));
  const minAlt = Math.min(...altitudeProfile.map((p) => p.altitude));
  const yMax = maxAlt + 300;
  const yMin = Math.max(0, minAlt - 200);
  const hasAmsZone = maxAlt >= 4e3;
  const acclimDays = altitudeProfile.filter(
    (p, i) => i > 0 && altitudeProfile[i - 1].altitude >= p.altitude - 50
  ).map((p) => `Day ${p.day}`);
  const chartData = altitudeProfile.map((p) => ({
    ...p,
    name: `Day ${p.day}`
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs font-semibold mb-3 tracking-wide",
        style: { color: "#888" },
        children: "ALTITUDE PROFILE"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      AreaChart,
      {
        data: chartData,
        margin: { top: 10, right: 16, left: 0, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "altGradEw", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#E87722", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#E87722", stopOpacity: 0.05 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(0,0,0,0.06)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "name",
              tick: { fontSize: 11, fill: "#C0001C", fontWeight: 600 },
              tickLine: false,
              axisLine: { stroke: "#e5e7eb" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              domain: [yMin, yMax],
              tick: { fontSize: 10, fill: "#999" },
              tickLine: false,
              axisLine: false,
              tickFormatter: (v) => `${(v / 1e3).toFixed(1)}k`,
              width: 36
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomAltTooltip, { data: altitudeProfile }) }),
          hasAmsZone && /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceArea, { y1: 4e3, y2: yMax, fill: "rgba(192,0,28,0.08)" }),
          hasAmsZone && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              y: 4e3,
              stroke: "#C0001C",
              strokeDasharray: "4 4",
              label: {
                value: "AMS Risk Zone ↑",
                fill: "#C0001C",
                fontSize: 10,
                position: "insideTopRight"
              }
            }
          ),
          acclimDays.map((dayKey) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceLine,
            {
              x: dayKey,
              stroke: "#2E7D32",
              strokeDasharray: "3 3",
              strokeOpacity: 0.6
            },
            `accl-${dayKey}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Area,
            {
              type: "monotone",
              dataKey: "altitude",
              stroke: "#E87722",
              strokeWidth: 3,
              fill: "url(#altGradEw)",
              dot: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Dot,
                {
                  cx: props.cx,
                  cy: props.cy,
                  r: 4,
                  fill: "#E87722",
                  stroke: "white",
                  strokeWidth: 1.5
                },
                `dot-${props.index}`
              ),
              activeDot: {
                r: 6,
                fill: "#E87722",
                stroke: "white",
                strokeWidth: 2
              }
            }
          )
        ]
      }
    ) })
  ] });
}
function RouteStats({ stats }) {
  const tiles = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { size: 18, style: { color: "#C0001C" } }),
      value: stats.distance ? `${stats.distance} km` : "—",
      label: "Total Distance"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 18, style: { color: "#E87722" } }),
      value: stats.elevationGain ? `+${stats.elevationGain.toLocaleString()}m` : "—",
      label: "Elevation Gain"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 18, style: { color: "#7B1FA2" } }),
      value: stats.highestPoint ? `${stats.highestPoint.toLocaleString()}m` : "—",
      label: "Highest Point"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mountain, { size: 18, style: { color: "#1565C0" } }),
      value: stats.lowestPoint ? `${stats.lowestPoint.toLocaleString()}m` : "—",
      label: "Lowest Point"
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 18, style: { color: "#2E7D32" } }),
      value: stats.walkingHours ? `~${stats.walkingHours} hrs` : "—",
      label: "Walking Hours"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-5", children: tiles.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4 text-center flex flex-col items-center gap-1.5",
      style: { background: "#F5F5F5", border: "1px solid #e5e7eb" },
      children: [
        t.icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold", style: { color: "#1A1A2E" }, children: t.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px]", style: { color: "#888" }, children: t.label })
      ]
    },
    t.label
  )) });
}
function HowToReach({ data }) {
  var _a, _b;
  if (!data) return null;
  if (typeof data === "string") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-4",
        style: { background: "#F5F5F5", border: "1px solid #e5e7eb" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#444", lineHeight: 1.7 }, children: data })
      }
    );
  }
  const structured = data;
  const airport = structured.airport ? `${structured.airport.name} — ${structured.airport.distance} away, ~${structured.airport.time}${structured.airport.cost ? `, taxi ~${structured.airport.cost}` : ""}` : structured.byAir;
  const railway = structured.railway ? `${structured.railway.name} — ${structured.railway.distance} away${structured.railway.trains ? `. ${structured.railway.trains}` : ""}` : structured.byTrain;
  const road = ((_a = structured.road) == null ? void 0 : _a.description) ?? structured.byRoad;
  const bus = ((_b = structured.bus) == null ? void 0 : _b.description) ?? structured.localTransport;
  const items = [
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Plane, { size: 16, style: { color: "#C0001C" } }),
      label: "By Air",
      text: airport
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TramFront, { size: 16, style: { color: "#E87722" } }),
      label: "By Train",
      text: railway
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { size: 16, style: { color: "#2E7D32" } }),
      label: "By Road",
      text: road
    },
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bus, { size: 16, style: { color: "#1565C0" } }),
      label: "Local Transport",
      text: bus
    }
  ].filter((item) => !!item.text);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-4 flex gap-3",
      style: { background: "white", border: "1px solid #e5e7eb" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
            style: { background: "#F5F5F5" },
            children: item.icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold mb-1", style: { color: "#1A1A2E" }, children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed", style: { color: "#555" }, children: item.text })
        ] })
      ]
    },
    item.label
  )) });
}
function TrekMap({
  trek,
  yatra,
  trekName,
  coordinates,
  distance,
  elevationGain,
  highestPoint
}) {
  reactExports.useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }
    if (!document.getElementById("ew-map-styles")) {
      const style = document.createElement("style");
      style.id = "ew-map-styles";
      style.textContent = `
        @keyframes ew-pulse-ring {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .ew-pulse-marker, .ew-trail-marker { background: transparent !important; border: none !important; }
        .leaflet-popup-content-wrapper { border-radius: 10px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.18) !important; padding: 0 !important; }
        .leaflet-popup-content { margin: 12px 14px !important; }
        .leaflet-popup-tip-container { display: none; }
      `;
      document.head.appendChild(style);
    }
  }, []);
  const effectiveTrek = trek ?? (trekName && coordinates ? {
    name: trekName,
    state: "uttarakhand",
    duration: 1,
    altitude: highestPoint ? Number.parseInt(highestPoint) : 0,
    distance: distance ? Number.parseFloat(distance) : 0,
    startPoint: "Start",
    endPoint: "End",
    coordinates
  } : void 0);
  const entityName = (effectiveTrek == null ? void 0 : effectiveTrek.name) ?? (yatra == null ? void 0 : yatra.name) ?? "";
  const state = (effectiveTrek == null ? void 0 : effectiveTrek.state) ?? (yatra == null ? void 0 : yatra.state) ?? "uttarakhand";
  let richCoords = null;
  let startLat = state === "himachal" ? 31.9165 : 30.0668;
  let startLng = state === "himachal" ? 77.5723 : 79.0193;
  let altProfile = null;
  let routeStats = {};
  let howToReach;
  if (effectiveTrek) {
    if (effectiveTrek.coordinates) {
      richCoords = buildRichCoords(effectiveTrek.coordinates, effectiveTrek);
      startLat = effectiveTrek.coordinates.start[0];
      startLng = effectiveTrek.coordinates.start[1];
      altProfile = effectiveTrek.coordinates.altitudeProfile ?? null;
      const alts = (altProfile == null ? void 0 : altProfile.map((p) => p.altitude)) ?? [];
      routeStats = {
        distance: effectiveTrek.distance || (distance ? Number.parseFloat(distance) : void 0),
        highestPoint: alts.length ? Math.max(...alts) : highestPoint ? Number.parseInt(highestPoint) : effectiveTrek.altitude,
        lowestPoint: alts.length ? Math.min(...alts) : void 0,
        elevationGain: alts.length ? Math.max(...alts) - Math.min(...alts) : elevationGain ? Number.parseInt(elevationGain) : void 0,
        walkingHours: Math.round(
          (effectiveTrek.duration * 6 + (effectiveTrek.distance ?? 0) / 3) / 2
        )
      };
    } else {
      routeStats = {
        distance: effectiveTrek.distance,
        highestPoint: highestPoint ? Number.parseInt(highestPoint) : effectiveTrek.altitude,
        elevationGain: elevationGain ? Number.parseInt(elevationGain) : void 0
      };
    }
  } else if (yatra) {
    howToReach = yatra.howToReach;
    richCoords = buildYatraRichCoords(yatra);
    if (yatra.coordinates) {
      startLat = yatra.coordinates.start[0];
      startLng = yatra.coordinates.start[1];
    }
    routeStats = {
      distance: yatra.distance,
      highestPoint: yatra.maxAltitude ? Number.parseInt(yatra.maxAltitude) : void 0
    };
  }
  const hasMap = richCoords !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", "data-ocid": "trek_map.section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h3",
        {
          className: "text-sm font-bold mb-3 flex items-center gap-2",
          style: { color: "#1A1A2E" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-1 h-4 rounded-full",
                style: { background: "#C0001C" }
              }
            ),
            "State Location"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StateOverviewMap,
        {
          state,
          trekLat: startLat,
          trekLng: startLng,
          trekName: entityName
        }
      )
    ] }),
    hasMap && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h3",
        {
          className: "text-sm font-bold mb-3 flex items-center gap-2",
          style: { color: "#1A1A2E" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-1 h-4 rounded-full",
                style: { background: "#C0001C" }
              }
            ),
            "Trail Route Map"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrailMap, { richCoords, trekName: entityName })
    ] }),
    altProfile && altProfile.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-xl p-5",
        style: {
          background: "white",
          border: "1px solid #e5e7eb",
          borderTop: "3px solid #E87722"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AltitudeProfile, { altitudeProfile: altProfile })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h3",
        {
          className: "text-sm font-bold mb-3 flex items-center gap-2",
          style: { color: "#1A1A2E" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-1 h-4 rounded-full",
                style: { background: "#E87722" }
              }
            ),
            "Route Statistics"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RouteStats, { stats: routeStats })
    ] }),
    howToReach && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h3",
        {
          className: "text-sm font-bold mb-3 flex items-center gap-2",
          style: { color: "#1A1A2E" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-1 h-4 rounded-full",
                style: { background: "#2E7D32" }
              }
            ),
            "How to Reach"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HowToReach, { data: howToReach })
    ] })
  ] });
}
function buildTrekItinerary(trek) {
  const base = Math.round(trek.altitude * 0.3);
  const templates = [
    {
      title: "Arrival & Acclimatization",
      altitude: base,
      stay: trek.startPoint,
      desc: `Arrive at ${trek.startPoint}, rest and briefing.`
    },
    {
      title: "Trek Begins — Into the Forest",
      altitude: Math.round(trek.altitude * 0.45),
      stay: "Forest Campsite",
      desc: "Ascent through oak and rhododendron forest."
    },
    {
      title: "High Altitude Meadows",
      altitude: Math.round(trek.altitude * 0.6),
      stay: "Meadow Campsite",
      desc: "Above treeline into alpine meadows."
    },
    {
      title: "Summit Push",
      altitude: trek.altitude,
      stay: "High Camp",
      desc: "Reach the highest point of the trek."
    },
    {
      title: "Descent Begins",
      altitude: Math.round(trek.altitude * 0.55),
      stay: "Descent Campsite",
      desc: "Steady descent through varied terrain."
    },
    {
      title: "Return to Base",
      altitude: base,
      stay: trek.startPoint,
      desc: `Return to ${trek.startPoint}. Trek completion ceremony.`
    }
  ];
  return Array.from({ length: trek.duration }, (_, i) => ({
    ...templates[Math.min(i, templates.length - 1)],
    day: i + 1
  }));
}
async function downloadTrekItineraryPDF(trek) {
  const { jsPDF } = await __vitePreload(async () => {
    const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-jZYBrjPN.js").then((n) => n.j);
    return { jsPDF: jsPDF2 };
  }, true ? __vite__mapDeps([2,3,1,4,5,6]) : void 0);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const RED = [192, 0, 28];
  const ORANGE = [232, 119, 34];
  const NAVY = [26, 26, 46];
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;
  let y = 0;
  const addPage = () => {
    doc.addPage();
    y = 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
      WIDTH / 2,
      290,
      { align: "center" }
    );
    doc.setDrawColor(...RED);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  };
  const checkY = (needed) => {
    if (y + needed > 275) addPage();
  };
  doc.setFillColor(...RED);
  doc.rect(0, 0, WIDTH, 36, "F");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Trekora", MARGIN, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Himalayan Treks & Sacred Yatras", MARGIN, 24);
  doc.setFontSize(9);
  doc.setTextColor(255, 200, 120);
  doc.text("Where Every Peak Tells a Story", WIDTH - MARGIN, 24, {
    align: "right"
  });
  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(trek.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  doc.text(
    `${trek.duration} Days | ${trek.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from ₹${trek.price.toLocaleString("en-IN")}`,
    MARGIN,
    57
  );
  y = 70;
  const stats = [
    ["Max Altitude", `${trek.altitude.toLocaleString()}m`],
    ["Difficulty", trek.difficulty],
    ["Distance", `${trek.distance} km`],
    ["Best Season", trek.bestSeason],
    ["Start Point", trek.startPoint],
    ["Trek Type", trek.trekType]
  ];
  doc.setFontSize(8);
  const colW = CONTENT_W / 3;
  stats.forEach(([label, value], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = MARGIN + col * colW;
    const boxY = y + row * 14;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, boxY, colW - 3, 12, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, x + 3, boxY + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(String(value), x + 3, boxY + 10);
  });
  y += 32;
  checkY(24);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("About This Trek", MARGIN + 6, y + 8);
  y += 14;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const descLines = doc.splitTextToSize(trek.description, CONTENT_W);
  checkY(descLines.length * 5 + 4);
  doc.text(descLines, MARGIN, y);
  y += descLines.length * 5 + 8;
  checkY(16);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("Day-by-Day Itinerary", MARGIN + 6, y + 8);
  y += 14;
  const itinerary = buildTrekItinerary(trek);
  itinerary.forEach((day) => {
    checkY(22);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 5, y + 4, 5, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(`D${day.day ?? ""}`, MARGIN + 5, y + 5.5, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(`Day ${day.day}: ${day.title}`, MARGIN + 13, y + 3);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const sub = [
      day.stay && `Stay: ${day.stay}`,
      typeof day.altitude === "number" && `Alt: ${day.altitude.toLocaleString()}m`
    ].filter(Boolean).join(" | ");
    if (sub) doc.text(sub, MARGIN + 13, y + 8);
    const text = day.desc ?? day.description ?? "";
    if (text) {
      const lines = doc.splitTextToSize(text, CONTENT_W - 13);
      doc.setTextColor(60, 60, 60);
      checkY(lines.length * 4 + 2);
      doc.text(lines, MARGIN + 13, y + 13);
      y += lines.length * 4 + 16;
    } else {
      y += 14;
    }
  });
  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("What's Included", MARGIN + 6, y + 8);
  y += 14;
  const included = [
    "Accommodation (tent/guesthouse as per itinerary)",
    "All meals during the trek (breakfast, lunch, dinner)",
    "Certified NCISM mountain trek leader",
    "Forest department permits & national park entry fees",
    "Quality camping equipment (tents, sleeping mats)",
    "First-aid medical kit with AMS treatment",
    "Portable oxygen cylinder (1 per group)"
  ];
  included.forEach((item) => {
    checkY(7);
    doc.setFillColor(...[46, 125, 50]);
    doc.circle(MARGIN + 2, y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(item, MARGIN + 6, y + 3);
    y += 6;
  });
  y += 4;
  checkY(20);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, 3, 10, "F");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...NAVY);
  doc.text("Essential Gear", MARGIN + 6, y + 8);
  y += 14;
  const gear = [
    "Waterproof trekking boots (ankle support)",
    "Layered warm clothing (thermal + fleece + outer shell)",
    "40–50L trekking backpack with rain cover",
    "Trekking poles & headlamp",
    "Sleeping bag (−10°C rated)",
    "Sunscreen SPF 50+, UV400 sunglasses",
    "Government photo ID (Aadhaar / Passport)"
  ];
  gear.forEach((item) => {
    checkY(7);
    doc.setFillColor(...ORANGE);
    doc.circle(MARGIN + 2, y + 1.5, 1.5, "F");
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);
    doc.text(item, MARGIN + 6, y + 3);
    y += 6;
  });
  y += 4;
  checkY(30);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, CONTENT_W, 24, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Book This Trek — Trekora", MARGIN + 6, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("✉  bookings@trekora.com", MARGIN + 6, y + 15);
  doc.text("📞  +91 98100 12345", MARGIN + 80, y + 15);
  doc.text("🌐  www.trekora.com", MARGIN + 140, y + 15);
  doc.setPage(1);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
    WIDTH / 2,
    290,
    { align: "center" }
  );
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  doc.save(`${trek.slug}-itinerary.pdf`);
}
async function downloadYatraItineraryPDF(yatra) {
  const { jsPDF } = await __vitePreload(async () => {
    const { jsPDF: jsPDF2 } = await import("./jspdf.es.min-jZYBrjPN.js").then((n) => n.j);
    return { jsPDF: jsPDF2 };
  }, true ? __vite__mapDeps([2,3,1,4,5,6]) : void 0);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const RED = [192, 0, 28];
  const ORANGE = [232, 119, 34];
  const NAVY = [26, 26, 46];
  const WIDTH = 210;
  const MARGIN = 18;
  const CONTENT_W = WIDTH - MARGIN * 2;
  let y = 0;
  const addPage = () => {
    doc.addPage();
    y = 20;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
      WIDTH / 2,
      290,
      { align: "center" }
    );
    doc.setDrawColor(...RED);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  };
  const checkY = (needed) => {
    if (y + needed > 275) addPage();
  };
  doc.setFillColor(...RED);
  doc.rect(0, 0, WIDTH, 36, "F");
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Trekora", MARGIN, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Himalayan Treks & Sacred Yatras", MARGIN, 24);
  doc.setFontSize(9);
  doc.setTextColor(255, 200, 120);
  doc.text("Where Every Peak Tells a Story", WIDTH - MARGIN, 24, {
    align: "right"
  });
  doc.setFillColor(...NAVY);
  doc.rect(0, 36, WIDTH, 24, "F");
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(yatra.name, MARGIN, 51);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(200, 200, 255);
  doc.text(
    `${yatra.duration} Days | ${yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"} | Starting from ₹${yatra.price.toLocaleString("en-IN")}`,
    MARGIN,
    57
  );
  y = 70;
  const stats = [
    ["Duration", `${yatra.duration} Days`],
    ["Distance", `${yatra.distance} km`],
    ["Start Point", yatra.startPoint],
    ["Best Time", yatra.bestTime]
  ];
  doc.setFontSize(8);
  const colW = CONTENT_W / 4;
  stats.forEach(([label, value], i) => {
    const x = MARGIN + i * colW;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y, colW - 3, 12, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(label, x + 3, y + 5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text(value, x + 3, y + 10);
  });
  y += 18;
  if (yatra.significance) {
    checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, y, 3, 10, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("Spiritual Significance", MARGIN + 6, y + 8);
    y += 14;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const sigLines = doc.splitTextToSize(
      yatra.significance.substring(0, 600),
      CONTENT_W
    );
    checkY(sigLines.length * 5 + 4);
    doc.text(sigLines, MARGIN, y);
    y += sigLines.length * 5 + 8;
  }
  const itinerary = yatra.itinerary ?? [];
  if (itinerary.length > 0) {
    checkY(16);
    doc.setFillColor(...RED);
    doc.rect(MARGIN, y, 3, 10, "F");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    doc.text("Day-by-Day Itinerary", MARGIN + 6, y + 8);
    y += 14;
    itinerary.forEach((day) => {
      checkY(22);
      doc.setFillColor(...ORANGE);
      doc.circle(MARGIN + 5, y + 4, 5, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`D${day.day ?? ""}`, MARGIN + 5, y + 5.5, { align: "center" });
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text(`Day ${day.day}: ${day.title}`, MARGIN + 13, y + 3);
      const text = day.description ?? day.desc ?? "";
      if (text) {
        const lines = doc.splitTextToSize(text, CONTENT_W - 13);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        checkY(lines.length * 4 + 2);
        doc.text(lines, MARGIN + 13, y + 9);
        y += lines.length * 4 + 14;
      } else {
        y += 12;
      }
    });
  }
  y += 4;
  checkY(30);
  doc.setFillColor(...RED);
  doc.rect(MARGIN, y, CONTENT_W, 24, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Book This Yatra — Trekora", MARGIN + 6, y + 8);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("✉  bookings@trekora.com", MARGIN + 6, y + 15);
  doc.text("📞  +91 98100 12345", MARGIN + 80, y + 15);
  doc.text("🌐  www.trekora.com", MARGIN + 140, y + 15);
  doc.setPage(1);
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "Trekora | bookings@trekora.com | +91 98100 12345 | www.trekora.com",
    WIDTH / 2,
    290,
    { align: "center" }
  );
  doc.setDrawColor(...RED);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, 285, WIDTH - MARGIN, 285);
  doc.save(`${yatra.slug}-itinerary.pdf`);
}
function injectJSONLD(schema, id = "jsonld-schema") {
  let scriptEl = document.getElementById(id);
  if (!scriptEl) {
    scriptEl = document.createElement("script");
    scriptEl.id = id;
    scriptEl.setAttribute("type", "application/ld+json");
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(schema, null, 2);
  return () => {
    const el = document.getElementById(id);
    if (el) el.remove();
  };
}
function generateTrekJSONLD(trek) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: trek.name,
    description: trek.description,
    provider: {
      "@type": "TravelAgency",
      name: "Trekora",
      url: "https://www.trekora.com",
      telephone: "+91-98100-12345",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dehradun",
        addressRegion: "Uttarakhand",
        addressCountry: "IN"
      }
    },
    touristType: "Adventure Tourist",
    offers: {
      "@type": "Offer",
      price: trek.price.toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: `${year}-01-01`
    },
    ...trek.rating ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: trek.rating.toString(),
        reviewCount: (trek.reviewCount ?? 100).toString(),
        bestRating: "5"
      }
    } : {}
  };
}
function generateYatraJSONLD(yatra) {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return {
    "@context": "https://schema.org",
    "@type": ["TouristAttraction", "Event"],
    name: yatra.name,
    description: yatra.description || yatra.significance,
    startDate: `${year}-05-01`,
    endDate: `${year}-10-31`,
    location: {
      "@type": "Place",
      name: `${yatra.district ?? yatra.state} Himalayas, ${yatra.state === "uttarakhand" ? "Uttarakhand" : "Himachal Pradesh"}`,
      addressCountry: "IN"
    },
    organizer: {
      "@type": "Organization",
      name: "Trekora",
      url: "https://www.trekora.com"
    },
    offers: {
      "@type": "Offer",
      price: yatra.price.toString(),
      priceCurrency: "INR"
    }
  };
}
function generateBreadcrumbJSONLD(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": `https://www.trekora.com${item.url}`,
        name: item.name
      }
    }))
  };
}
function generateFAQJSONLD(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}
export {
  BookingDrawer as B,
  QueryBottomSheet as Q,
  ReviewSubmitForm as R,
  ShareSection as S,
  TrekMap as T,
  WhatsAppCTA as W,
  generateBreadcrumbJSONLD as a,
  generateFAQJSONLD as b,
  SeoTagCloud as c,
  downloadTrekItineraryPDF as d,
  generateYatraJSONLD as e,
  downloadYatraItineraryPDF as f,
  generateTrekJSONLD as g,
  injectJSONLD as i
};
