import { r as reactExports, j as jsxRuntimeExports } from "./router-Bky4FFc7.js";
import { A as AnimatePresence, m as motion, a as useQueryClient, T as TREKS, u as ue } from "./index-C6rgoof8.js";
import { S as Skeleton } from "./skeleton-C7PMHdk_.js";
import { u as useActor, c as createActor, a as useQuery } from "./backend-JpGNVgMw.js";
import { u as useMutation } from "./useMutation-CZf2c55A.js";
import "./motion-CnUkbXTC.js";
import "./icons-DrFRvHmE.js";
import "./charts-VM0_pAiv.js";
const DIFFICULTIES$1 = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme"
];
function slugify(name) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
const EMPTY = {
  name: "",
  slug: "",
  state: "uttarakhand",
  duration: "",
  altitude: "",
  difficulty: "Moderate",
  price: "",
  distance: "",
  startPoint: "",
  endPoint: "",
  category: "",
  bestSeason: "",
  description: "",
  image: "",
  images: "",
  trekType: "",
  isActive: true,
  isFeatured: false
};
function trekToFormState(trek) {
  return {
    name: trek.name,
    slug: trek.slug,
    state: trek.state,
    duration: String(trek.duration),
    altitude: String(trek.altitude),
    difficulty: trek.difficulty,
    price: String(trek.price),
    distance: String(trek.distance),
    startPoint: trek.startPoint,
    endPoint: trek.endPoint,
    category: trek.category,
    bestSeason: trek.bestSeason,
    description: trek.description,
    image: trek.image,
    images: trek.images.join("\n"),
    trekType: trek.trekType,
    isActive: trek.isActive,
    isFeatured: trek.isFeatured
  };
}
function TrekFormModal({
  open,
  trek,
  onClose,
  onSubmit,
  isPending
}) {
  const [form, setForm] = reactExports.useState(EMPTY);
  const [errors, setErrors] = reactExports.useState({});
  const [slugManual, setSlugManual] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      if (trek) {
        setForm(trekToFormState(trek));
        setSlugManual(true);
      } else {
        setForm(EMPTY);
        setSlugManual(false);
      }
      setErrors({});
    }
  }, [open, trek]);
  function set(field, value) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "name" && !slugManual && typeof value === "string") {
        next.slug = slugify(value);
      }
      return next;
    });
    setErrors((e) => ({ ...e, [field]: void 0 }));
  }
  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.duration || Number.isNaN(Number(form.duration)))
      e.duration = "Valid number required";
    if (!form.altitude || Number.isNaN(Number(form.altitude)))
      e.altitude = "Valid number required";
    if (!form.price || Number.isNaN(Number(form.price)))
      e.price = "Valid number required";
    if (!form.distance || Number.isNaN(Number(form.distance)))
      e.distance = "Valid number required";
    if (!form.startPoint.trim()) e.startPoint = "Start point is required";
    if (!form.endPoint.trim()) e.endPoint = "End point is required";
    if (!form.image.trim()) e.image = "Main image URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const input = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      state: form.state,
      duration: BigInt(Math.round(Number(form.duration))),
      altitude: BigInt(Math.round(Number(form.altitude))),
      difficulty: form.difficulty,
      price: BigInt(Math.round(Number(form.price))),
      distance: BigInt(Math.round(Number(form.distance))),
      startPoint: form.startPoint.trim(),
      endPoint: form.endPoint.trim(),
      category: form.category.trim(),
      bestSeason: form.bestSeason.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      images: form.images.split("\n").map((u) => u.trim()).filter(Boolean),
      trekType: form.trekType.trim(),
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      rating: 0,
      reviewCount: BigInt(0)
    };
    onSubmit(input);
  }
  const inputCls = (hasError) => `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${hasError ? "border-[var(--ew-red)] focus:ring-[var(--ew-red)]/30" : "border-[var(--ew-gray-mid)] focus:ring-[var(--ew-orange)]/30 focus:border-[var(--ew-orange)]"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center",
      "data-ocid": "trek_form.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: onClose
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 80 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 80 },
            transition: { type: "spring", stiffness: 300, damping: 30 },
            className: "relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col mx-4 md:mx-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-4 flex items-center justify-between",
                  style: { background: "var(--ew-red)" },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-white", children: trek ? "Edit Trek" : "Add New Trek" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "text-white/70 hover:text-white transition-colors text-xl leading-none",
                        "data-ocid": "trek_form.close_button",
                        "aria-label": "Close modal",
                        children: "✕"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  id: "trek-form",
                  onSubmit: handleSubmit,
                  className: "flex-1 overflow-y-auto p-6 space-y-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Trek Name *", error: errors.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.name,
                          onChange: (e) => set("name", e.target.value),
                          className: inputCls(!!errors.name),
                          style: { color: "var(--ew-text)" },
                          placeholder: "Roopkund Trek",
                          "data-ocid": "trek_form.name.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug *", error: errors.slug, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.slug,
                          onChange: (e) => {
                            setSlugManual(true);
                            set("slug", e.target.value);
                          },
                          className: inputCls(!!errors.slug),
                          style: { color: "var(--ew-text)" },
                          placeholder: "roopkund-trek",
                          "data-ocid": "trek_form.slug.input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "State", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: form.state,
                          onChange: (e) => set("state", e.target.value),
                          className: inputCls(false),
                          style: { color: "var(--ew-text)" },
                          "data-ocid": "trek_form.state.select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "uttarakhand", children: "Uttarakhand" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "himachal", children: "Himachal Pradesh" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Difficulty", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          value: form.difficulty,
                          onChange: (e) => set("difficulty", e.target.value),
                          className: inputCls(false),
                          style: { color: "var(--ew-text)" },
                          "data-ocid": "trek_form.difficulty.select",
                          children: DIFFICULTIES$1.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Duration (days) *", error: errors.duration, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.duration,
                          onChange: (e) => set("duration", e.target.value),
                          className: inputCls(!!errors.duration),
                          style: { color: "var(--ew-text)" },
                          placeholder: "7",
                          min: "1",
                          "data-ocid": "trek_form.duration.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Altitude (m) *", error: errors.altitude, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.altitude,
                          onChange: (e) => set("altitude", e.target.value),
                          className: inputCls(!!errors.altitude),
                          style: { color: "var(--ew-text)" },
                          placeholder: "4500",
                          min: "0",
                          "data-ocid": "trek_form.altitude.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price (₹) *", error: errors.price, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.price,
                          onChange: (e) => set("price", e.target.value),
                          className: inputCls(!!errors.price),
                          style: { color: "var(--ew-text)" },
                          placeholder: "12000",
                          min: "0",
                          "data-ocid": "trek_form.price.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Distance (km) *", error: errors.distance, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.distance,
                          onChange: (e) => set("distance", e.target.value),
                          className: inputCls(!!errors.distance),
                          style: { color: "var(--ew-text)" },
                          placeholder: "45",
                          min: "0",
                          "data-ocid": "trek_form.distance.input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Start Point *", error: errors.startPoint, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.startPoint,
                          onChange: (e) => set("startPoint", e.target.value),
                          className: inputCls(!!errors.startPoint),
                          style: { color: "var(--ew-text)" },
                          placeholder: "Lohajung",
                          "data-ocid": "trek_form.start_point.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "End Point *", error: errors.endPoint, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.endPoint,
                          onChange: (e) => set("endPoint", e.target.value),
                          className: inputCls(!!errors.endPoint),
                          style: { color: "var(--ew-text)" },
                          placeholder: "Lohajung",
                          "data-ocid": "trek_form.end_point.input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.category,
                          onChange: (e) => set("category", e.target.value),
                          className: inputCls(false),
                          style: { color: "var(--ew-text)" },
                          placeholder: "Snow Trek",
                          "data-ocid": "trek_form.category.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Best Season", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.bestSeason,
                          onChange: (e) => set("bestSeason", e.target.value),
                          className: inputCls(false),
                          style: { color: "var(--ew-text)" },
                          placeholder: "May-Jun, Sep-Oct",
                          "data-ocid": "trek_form.best_season.input"
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Trek Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.trekType,
                          onChange: (e) => set("trekType", e.target.value),
                          className: inputCls(false),
                          style: { color: "var(--ew-text)" },
                          placeholder: "Alpine",
                          "data-ocid": "trek_form.trek_type.input"
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full Description", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        value: form.description,
                        onChange: (e) => set("description", e.target.value),
                        rows: 4,
                        className: inputCls(false),
                        style: { color: "var(--ew-text)" },
                        placeholder: "Detailed trek description...",
                        "data-ocid": "trek_form.description.textarea"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Main Image URL *", error: errors.image, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "url",
                        value: form.image,
                        onChange: (e) => set("image", e.target.value),
                        className: inputCls(!!errors.image),
                        style: { color: "var(--ew-text)" },
                        placeholder: "https://images.unsplash.com/photo-...",
                        "data-ocid": "trek_form.image.input"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Additional Images (one URL per line)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        value: form.images,
                        onChange: (e) => set("images", e.target.value),
                        rows: 3,
                        className: inputCls(false),
                        style: { color: "var(--ew-text)" },
                        placeholder: "https://images.unsplash.com/photo-...",
                        "data-ocid": "trek_form.images.textarea"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Toggle,
                        {
                          label: "Is Active",
                          checked: form.isActive,
                          onChange: (v) => set("isActive", v),
                          ocid: "trek_form.is_active.toggle"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Toggle,
                        {
                          label: "Is Featured",
                          checked: form.isFeatured,
                          onChange: (v) => set("isFeatured", v),
                          ocid: "trek_form.is_featured.toggle"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "px-6 py-4 flex items-center justify-end gap-3",
                  style: {
                    borderTop: "1px solid var(--ew-gray-lt)",
                    background: "var(--ew-gray-lt)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: onClose,
                        className: "btn-secondary",
                        "data-ocid": "trek_form.cancel_button",
                        children: "Cancel"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "submit",
                        form: "trek-form",
                        onClick: handleSubmit,
                        disabled: isPending,
                        className: "btn-primary disabled:opacity-60",
                        "data-ocid": "trek_form.submit_button",
                        children: isPending ? "Saving…" : trek ? "Save Trek" : "Create Trek"
                      }
                    )
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  ) });
}
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs font-semibold uppercase tracking-wide",
        style: { color: "var(--ew-text-lt)" },
        children: label
      }
    ),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "var(--ew-red)" }, children: error })
  ] });
}
function Toggle({
  label,
  checked,
  onChange,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 cursor-pointer select-none",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(!checked),
            role: "switch",
            "aria-checked": checked,
            "aria-label": label,
            tabIndex: 0,
            className: "relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2",
            style: {
              background: checked ? "var(--ew-orange)" : "var(--ew-gray-mid)",
              // @ts-ignore
              "--tw-ring-color": "var(--ew-orange)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", style: { color: "var(--ew-text-lt)" }, children: label })
      ]
    }
  );
}
function useAdminTreks() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const invalidateTreks = () => queryClient.invalidateQueries({ queryKey: ["treks"] });
  const createTrek = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createTrek(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks
  });
  const updateTrek = useMutation({
    mutationFn: async ({ id, input }) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.updateTrek(id, input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks
  });
  const deleteTrek = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deleteTrek(id);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks
  });
  const duplicateTrek = useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.createTrek(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: invalidateTreks
  });
  return { createTrek, updateTrek, deleteTrek, duplicateTrek };
}
function useTreks() {
  const { actor, isFetching } = useActor(createActor);
  const CACHE_KEY = "ew_treks_cache";
  const CACHE_TIME_KEY = "ew_treks_cache_time";
  const TTL_MS = 6 * 60 * 60 * 1e3;
  return useQuery({
    queryKey: ["treks"],
    queryFn: async () => {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        const ts = sessionStorage.getItem(CACHE_TIME_KEY);
        if (raw && ts && Date.now() - Number(ts) < TTL_MS) {
          return JSON.parse(raw);
        }
      } catch {
      }
      if (!actor) return [];
      try {
        const result = await actor.getTreks();
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(result));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
        }
        return result;
      } catch {
        const fallback = TREKS.map((t) => ({
          id: BigInt(t.id),
          name: t.name,
          slug: t.slug,
          state: t.state,
          duration: BigInt(t.duration),
          altitude: BigInt(t.altitude),
          difficulty: t.difficulty,
          price: BigInt(t.price),
          rating: t.rating,
          reviewCount: BigInt(t.reviewCount),
          description: t.description,
          shortDesc: t.shortDesc ?? "",
          image: t.image,
          images: t.images,
          category: t.category,
          bestSeason: t.bestSeason,
          distance: BigInt(t.distance),
          startPoint: t.startPoint,
          endPoint: t.endPoint,
          trekType: t.trekType,
          isActive: t.isActive,
          isFeatured: t.isFeatured
        }));
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(fallback));
          sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
        } catch {
        }
        return fallback;
      }
    },
    enabled: !isFetching
  });
}
const DIFFICULTIES = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme"
];
const PAGE_SIZE = 10;
function AdminTreksPage() {
  const { data: treks = [], isLoading } = useTreks();
  const { createTrek, updateTrek, deleteTrek } = useAdminTreks();
  const [modal, setModal] = reactExports.useState({ mode: "closed" });
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [stateFilter, setStateFilter] = reactExports.useState("all");
  const [diffFilter, setDiffFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const filtered = reactExports.useMemo(() => {
    return treks.filter((t) => {
      const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === "all" || t.state === stateFilter;
      const matchDiff = diffFilter === "all" || t.difficulty === diffFilter;
      const matchStatus = statusFilter === "all" || statusFilter === "active" && t.isActive || statusFilter === "inactive" && !t.isActive;
      return matchSearch && matchState && matchDiff && matchStatus;
    });
  }, [treks, search, stateFilter, diffFilter, statusFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allPageSelected = paginated.length > 0 && paginated.every((t) => selected.has(String(t.id)));
  function toggleSelect(id) {
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function toggleSelectAll() {
    if (allPageSelected) {
      setSelected((s) => {
        const next = new Set(s);
        for (const t of paginated) next.delete(String(t.id));
        return next;
      });
    } else {
      setSelected((s) => {
        const next = new Set(s);
        for (const t of paginated) next.add(String(t.id));
        return next;
      });
    }
  }
  function openEdit(trek) {
    setModal({ mode: "edit", trek });
  }
  function openDuplicate(trek) {
    setModal({
      mode: "create",
      prefill: {
        name: `${trek.name} (Copy)`,
        slug: `${trek.slug}-copy`,
        state: trek.state,
        duration: trek.duration,
        altitude: trek.altitude,
        difficulty: trek.difficulty,
        price: trek.price,
        distance: trek.distance,
        startPoint: trek.startPoint,
        endPoint: trek.endPoint,
        category: trek.category,
        bestSeason: trek.bestSeason,
        description: trek.description,
        image: trek.image,
        images: [...trek.images],
        trekType: trek.trekType,
        isActive: false,
        isFeatured: false,
        rating: trek.rating,
        reviewCount: trek.reviewCount
      }
    });
  }
  function handleSubmit(input) {
    if (modal.mode === "create") {
      createTrek.mutate(input, {
        onSuccess: () => {
          ue.success("Trek created!");
          setModal({ mode: "closed" });
        },
        onError: (err) => ue.error(err.message)
      });
    } else if (modal.mode === "edit") {
      updateTrek.mutate(
        { id: modal.trek.id, input },
        {
          onSuccess: () => {
            ue.success("Trek updated!");
            setModal({ mode: "closed" });
          },
          onError: (err) => ue.error(err.message)
        }
      );
    }
  }
  function confirmDelete() {
    if (!deleteTarget) return;
    deleteTrek.mutate(deleteTarget.id, {
      onSuccess: () => {
        ue.success("Trek deleted");
        setDeleteTarget(null);
      },
      onError: (err) => {
        ue.error(err.message);
        setDeleteTarget(null);
      }
    });
  }
  async function bulkActivate(active) {
    const ids = [...selected].map(BigInt);
    await Promise.all(
      ids.map((id) => {
        const trek = treks.find((t) => t.id === id);
        if (!trek) return Promise.resolve();
        const input = {
          name: trek.name,
          slug: trek.slug,
          state: trek.state,
          duration: trek.duration,
          altitude: trek.altitude,
          difficulty: trek.difficulty,
          price: trek.price,
          distance: trek.distance,
          startPoint: trek.startPoint,
          endPoint: trek.endPoint,
          category: trek.category,
          bestSeason: trek.bestSeason,
          description: trek.description,
          image: trek.image,
          images: [...trek.images],
          trekType: trek.trekType,
          isActive: active,
          isFeatured: trek.isFeatured,
          rating: trek.rating,
          reviewCount: trek.reviewCount
        };
        return updateTrek.mutateAsync({ id: trek.id, input });
      })
    );
    ue.success(
      `${selected.size} treks ${active ? "activated" : "deactivated"}`
    );
    setSelected(/* @__PURE__ */ new Set());
  }
  async function bulkDelete() {
    const ids = [...selected].map(BigInt);
    await Promise.all(ids.map((id) => deleteTrek.mutateAsync(id)));
    ue.success(`${selected.size} treks deleted`);
    setSelected(/* @__PURE__ */ new Set());
  }
  const isPending = createTrek.isPending || updateTrek.isPending;
  const selectCls = "px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white";
  const selectStyle = {
    border: "1px solid var(--ew-gray-mid)",
    color: "var(--ew-text)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "admin.treks.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-2xl font-bold",
            style: { color: "var(--ew-text)" },
            children: "Trek Manager"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "var(--ew-gray-dark)" }, children: [
          filtered.length,
          " of ",
          treks.length,
          " treks"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setModal({ mode: "create" }),
          className: "btn-primary",
          "data-ocid": "admin.treks.add_button",
          children: "+ Add New Trek"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl p-4 shadow-card flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Search trek name…",
          value: search,
          onChange: (e) => {
            setSearch(e.target.value);
            setPage(1);
          },
          className: `flex-1 min-w-[180px] ${selectCls}`,
          style: selectStyle,
          "data-ocid": "admin.treks.search_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: stateFilter,
          onChange: (e) => {
            setStateFilter(e.target.value);
            setPage(1);
          },
          className: selectCls,
          style: selectStyle,
          "data-ocid": "admin.treks.state.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All States" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "uttarakhand", children: "Uttarakhand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "himachal", children: "Himachal Pradesh" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: diffFilter,
          onChange: (e) => {
            setDiffFilter(e.target.value);
            setPage(1);
          },
          className: selectCls,
          style: selectStyle,
          "data-ocid": "admin.treks.difficulty.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Difficulties" }),
            DIFFICULTIES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: statusFilter,
          onChange: (e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          },
          className: selectCls,
          style: selectStyle,
          "data-ocid": "admin.treks.status.select",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "active", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inactive", children: "Inactive" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        className: "rounded-xl px-4 py-3 flex items-center gap-3 flex-wrap",
        style: { background: "var(--ew-footer)" },
        "data-ocid": "admin.treks.bulk_bar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-white", children: [
            selected.size,
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void bulkActivate(true),
              className: "text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors",
              style: { background: "var(--ew-green)" },
              "data-ocid": "admin.treks.bulk_activate_button",
              children: "Activate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void bulkActivate(false),
              className: "text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors",
              style: { background: "var(--ew-gray-dark)", color: "white" },
              "data-ocid": "admin.treks.bulk_deactivate_button",
              children: "Deactivate"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => void bulkDelete(),
              className: "text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors",
              style: { background: "var(--ew-red)" },
              "data-ocid": "admin.treks.bulk_delete_button",
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSelected(/* @__PURE__ */ new Set()),
              className: "ml-auto text-xs transition-colors",
              style: { color: "rgba(255,255,255,0.5)" },
              "data-ocid": "admin.treks.bulk_clear_button",
              children: "Clear"
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-card overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { style: { background: "var(--ew-gray-lt)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: allPageSelected,
              onChange: toggleSelectAll,
              className: "rounded border-gray-300",
              style: { accentColor: "var(--ew-orange)" },
              "data-ocid": "admin.treks.select_all.checkbox",
              "aria-label": "Select all"
            }
          ) }),
          [
            "Trek Name",
            "State",
            "Difficulty",
            "Price",
            "Status",
            "Actions"
          ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: `px-4 py-3 text-left font-medium ${h === "Price" ? "text-right" : ""} ${h === "Status" || h === "Actions" ? "text-center" : ""}`,
              style: { color: "var(--ew-text-lt)" },
              children: h
            },
            h
          ))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: isLoading ? ["s1", "s2", "s3", "s4", "s5"].map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            style: { borderBottom: "1px solid var(--ew-gray-lt)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", colSpan: 7, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }) })
          },
          sk
        )) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: 7,
            className: "px-4 py-12 text-center",
            style: { color: "var(--ew-gray-dark)" },
            "data-ocid": "admin.treks.empty_state",
            children: "No treks found. Try adjusting your filters."
          }
        ) }) : paginated.map((trek, i) => {
          const rowIdx = (page - 1) * PAGE_SIZE + i + 1;
          const isSelected = selected.has(String(trek.id));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "transition-colors",
              style: {
                background: isSelected ? "var(--ew-orange-lt)" : "white",
                borderBottom: "1px solid var(--ew-gray-lt)"
              },
              "data-ocid": `admin.trek.row.${rowIdx}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: () => toggleSelect(String(trek.id)),
                    className: "rounded border-gray-300",
                    style: { accentColor: "var(--ew-orange)" },
                    "aria-label": `Select ${trek.name}`
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: trek.image,
                      alt: trek.name,
                      className: "w-8 h-8 rounded-lg object-cover hidden sm:block"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-semibold truncate max-w-[180px]",
                        style: { color: "var(--ew-text)" },
                        children: trek.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-xs",
                        style: { color: "var(--ew-gray-dark)" },
                        children: [
                          String(trek.duration),
                          "d · ",
                          String(trek.altitude),
                          "m"
                        ]
                      }
                    )
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-4 py-3 capitalize",
                    style: { color: "var(--ew-text-lt)" },
                    children: trek.state === "himachal" ? "Himachal" : "Uttarakhand"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLORS[trek.difficulty] ?? "bg-gray-100 text-gray-600"}`,
                    children: trek.difficulty
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "td",
                  {
                    className: "px-4 py-3 text-right font-semibold",
                    style: { color: "var(--ew-orange)" },
                    children: [
                      "₹",
                      Number(trek.price).toLocaleString("en-IN")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-xs px-2 py-0.5 rounded-full font-medium",
                    style: trek.isActive ? {
                      background: "rgba(46,125,50,0.1)",
                      color: "var(--ew-green)"
                    } : {
                      background: "var(--ew-gray-lt)",
                      color: "var(--ew-gray-dark)"
                    },
                    children: trek.isActive ? "Active" : "Inactive"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => openEdit(trek),
                      className: "text-xs font-semibold transition-colors px-2 py-1 rounded",
                      style: {
                        color: "var(--ew-orange)",
                        background: "var(--ew-orange-lt)"
                      },
                      "data-ocid": `admin.trek.edit_button.${rowIdx}`,
                      children: "Edit"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => openDuplicate(trek),
                      className: "text-xs font-medium transition-colors",
                      style: { color: "var(--ew-gray-dark)" },
                      "data-ocid": `admin.trek.duplicate_button.${rowIdx}`,
                      children: "Dup"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(trek),
                      className: "text-xs font-semibold transition-colors px-2 py-1 rounded",
                      style: {
                        color: "var(--ew-red)",
                        background: "var(--ew-red-lt)"
                      },
                      "data-ocid": `admin.trek.delete_button.${rowIdx}`,
                      children: "Delete"
                    }
                  )
                ] }) })
              ]
            },
            String(trek.id)
          );
        }) })
      ] }) }),
      !isLoading && filtered.length > PAGE_SIZE && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-4 py-3 flex items-center justify-between text-sm",
          style: { borderTop: "1px solid var(--ew-gray-lt)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--ew-gray-dark)" }, children: [
              "Page ",
              page,
              " of ",
              totalPages,
              " · ",
              filtered.length,
              " results"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: page === 1,
                  onClick: () => setPage((p) => p - 1),
                  className: "px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors",
                  style: {
                    border: "1px solid var(--ew-gray-mid)",
                    color: "var(--ew-text)"
                  },
                  "data-ocid": "admin.treks.pagination_prev",
                  children: "← Prev"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  disabled: page === totalPages,
                  onClick: () => setPage((p) => p + 1),
                  className: "px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-40 transition-colors",
                  style: {
                    border: "1px solid var(--ew-gray-mid)",
                    color: "var(--ew-text)"
                  },
                  "data-ocid": "admin.treks.pagination_next",
                  children: "Next →"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TrekFormModal,
      {
        open: modal.mode !== "closed",
        trek: modal.mode === "edit" ? modal.trek : null,
        onClose: () => setModal({ mode: "closed" }),
        onSubmit: handleSubmit,
        isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center",
        "data-ocid": "admin.trek.delete.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
              onClick: () => setDeleteTarget(null)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.95 },
              className: "relative bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-elevated",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "text-lg font-bold mb-2",
                    style: { color: "var(--ew-text)" },
                    children: "Delete Trek"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-sm mb-5",
                    style: { color: "var(--ew-text-lt)" },
                    children: [
                      "Are you sure you want to delete",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget.name }),
                      "? This cannot be undone."
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeleteTarget(null),
                      className: "btn-secondary",
                      style: { borderRadius: "8px" },
                      "data-ocid": "admin.trek.delete.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: confirmDelete,
                      disabled: deleteTrek.isPending,
                      className: "px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-60 transition-colors",
                      style: { background: "var(--ew-red)" },
                      "data-ocid": "admin.trek.delete.confirm_button",
                      children: deleteTrek.isPending ? "Deleting…" : "Delete Trek"
                    }
                  )
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
const DIFF_COLORS = {
  Easy: "bg-green-100 text-green-700",
  "Easy-Moderate": "bg-lime-100 text-lime-700",
  Moderate: "bg-yellow-100 text-yellow-700",
  "Moderate-Difficult": "bg-orange-100 text-orange-700",
  Difficult: "bg-red-100 text-red-700",
  "Difficult-Extreme": "bg-purple-100 text-purple-700",
  Extreme: "bg-purple-200 text-purple-800"
};
export {
  AdminTreksPage as default
};
