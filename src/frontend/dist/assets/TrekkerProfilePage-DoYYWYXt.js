import { m as useParams, r as reactExports, j as jsxRuntimeExports, L as Link } from "./router-Bky4FFc7.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-JpGNVgMw.js";
import { m as motion } from "./index-C6rgoof8.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
function useProfileByCode(code) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["trekkerProfile", code],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserByReferralCode(code);
    },
    enabled: !!actor && !isFetching && !!code
  });
}
function BadgeCard({
  label,
  threshold,
  earned
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-3 text-center",
      style: {
        background: earned ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
        border: `1px solid ${earned ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl mb-1", children: earned ? "🏔" : "🔒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-bold",
            style: { color: earned ? "var(--ew-orange)" : "var(--ew-gray-dark)" },
            children: label
          }
        ),
        earned ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
            style: { background: "var(--ew-orange)", color: "#fff" },
            children: "Earned!"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            className: "text-[10px] mt-0.5",
            style: { color: "var(--ew-gray-dark)" },
            children: [
              "Above ",
              threshold,
              "m to unlock"
            ]
          }
        )
      ]
    }
  );
}
function TrekkerProfilePage() {
  const { username } = useParams({ from: "/layout/trekkers/$username" });
  const { data: profile, isLoading } = useProfileByCode(username);
  const [isCopied, setIsCopied] = reactExports.useState(false);
  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/trekkers/${username}` : "";
  function handleCopy() {
    navigator.clipboard.writeText(profileUrl).catch(() => null);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2e3);
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-24 min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 border-4 border-[var(--ew-orange)] border-t-transparent rounded-full animate-spin" }) });
  }
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "pt-24 min-h-screen flex flex-col items-center justify-center gap-4 px-4",
        "data-ocid": "trekker_profile.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl", children: "🏔" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", style: { color: "var(--ew-text)" }, children: "Trekker Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: "This trekker profile does not exist." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/treks", className: "btn-primary", children: "Explore Treks" })
        ]
      }
    );
  }
  const joinYear = new Date(Number(profile.joinedAt) / 1e6).getFullYear();
  const displayName = profile.name || username;
  const initials = displayName.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const points = Number(profile.walletBalance) > 0 ? Math.floor(Number(profile.walletBalance) / 5) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "pt-20 min-h-screen pb-12",
      style: { background: "var(--ew-gray-lt)" },
      "data-ocid": "trekker_profile.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "bg-white rounded-2xl shadow-card overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24", style: { background: "var(--ew-footer)" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between -mt-10 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg",
                      style: { background: "var(--ew-red)" },
                      "aria-label": `${displayName} avatar`,
                      children: initials
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleCopy,
                      className: "btn-secondary text-sm",
                      "data-ocid": "trekker_profile.share_button",
                      children: isCopied ? "✓ Copied!" : "Share Profile"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "text-2xl font-bold",
                    style: { color: "var(--ew-text)" },
                    children: displayName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm mt-0.5",
                    style: { color: "var(--ew-gray-dark)" },
                    children: [
                      "Joined ",
                      joinYear,
                      " · EternaWings Trekker"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-3 gap-3 mt-5 rounded-xl p-4",
                    style: { background: "var(--ew-gray-lt)" },
                    children: [
                      { label: "Treks Completed", value: "—" },
                      { label: "Highest Altitude", value: "—" },
                      { label: "Points", value: points > 0 ? String(points) : "—" }
                    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xl font-bold",
                          style: { color: "var(--ew-text)" },
                          children: value
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-[11px] mt-0.5",
                          style: { color: "var(--ew-gray-dark)" },
                          children: label
                        }
                      )
                    ] }, label))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-bold text-sm mb-3",
                      style: { color: "var(--ew-text)" },
                      children: "🏔️ Altitude Badges"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCard, { label: "3000m Club", threshold: 3e3, earned: false }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCard, { label: "4000m Club", threshold: 4e3, earned: false }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCard, { label: "5000m Club", threshold: 5e3, earned: false })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/treks",
            className: "text-sm font-semibold hover:underline",
            style: { color: "var(--ew-red)" },
            children: "Explore EternaWings Treks →"
          }
        ) })
      ] })
    }
  );
}
export {
  TrekkerProfilePage as default
};
