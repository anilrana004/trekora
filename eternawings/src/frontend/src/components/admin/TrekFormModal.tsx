import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { TrekInput } from "../../backend.d.ts";
import type { BackendTrek } from "../../hooks/useTreks";
import ImageUploadField from "./ImageUploadField";

interface TrekFormModalProps {
  open: boolean;
  trek?: BackendTrek | null;
  onClose: () => void;
  onSubmit: (input: TrekInput) => void;
  isPending?: boolean;
}

const DIFFICULTIES = [
  "Easy",
  "Easy-Moderate",
  "Moderate",
  "Moderate-Difficult",
  "Difficult",
  "Difficult-Extreme",
  "Extreme",
] as const;

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type FormState = {
  name: string;
  slug: string;
  state: string;
  duration: string;
  altitude: string;
  difficulty: string;
  price: string;
  distance: string;
  startPoint: string;
  endPoint: string;
  category: string;
  bestSeason: string;
  description: string;
  image: string;
  images: string;
  trekType: string;
  isActive: boolean;
  isFeatured: boolean;
};

const EMPTY: FormState = {
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
  isFeatured: false,
};

function trekToFormState(trek: BackendTrek): FormState {
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
    isFeatured: trek.isFeatured,
  };
}

export default function TrekFormModal({
  open,
  trek,
  onClose,
  onSubmit,
  isPending,
}: TrekFormModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
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

  function set(field: keyof FormState, value: string | boolean) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      if (field === "name" && !slugManual && typeof value === "string") {
        next.slug = slugify(value);
      }
      return next;
    });
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const input: TrekInput = {
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
      images: form.images
        .split("\n")
        .map((u) => u.trim())
        .filter(Boolean),
      trekType: form.trekType.trim(),
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      rating: 0,
      reviewCount: BigInt(0),
    };
    onSubmit(input);
  }

  function handleMainImageUploaded(urls: string[]) {
    if (urls.length === 0) return;
    set("image", urls[0] ?? "");
  }

  function handleAdditionalImagesUploaded(urls: string[]) {
    if (urls.length === 0) return;
    const existing = form.images
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    const merged = [...existing, ...urls];
    set("images", merged.join("\n"));
  }

  const inputCls = (hasError: boolean) =>
    `w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? "border-[var(--ew-red)] focus:ring-[var(--ew-red)]/30"
        : "border-[var(--ew-gray-mid)] focus:ring-[var(--ew-orange)]/30 focus:border-[var(--ew-orange)]"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          data-ocid="trek_form.dialog"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col mx-4 md:mx-0"
          >
            {/* Header — ew-red bg */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ background: "var(--ew-red)" }}
            >
              <h3 className="text-lg font-bold text-white">
                {trek ? "Edit Trek" : "Add New Trek"}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors text-xl leading-none"
                data-ocid="trek_form.close_button"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <form
              id="trek-form"
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-6 space-y-5"
            >
              {/* Name + Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Trek Name *" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls(!!errors.name)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="Roopkund Trek"
                    data-ocid="trek_form.name.input"
                  />
                </Field>
                <Field label="Slug *" error={errors.slug}>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => {
                      setSlugManual(true);
                      set("slug", e.target.value);
                    }}
                    className={inputCls(!!errors.slug)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="roopkund-trek"
                    data-ocid="trek_form.slug.input"
                  />
                </Field>
              </div>

              {/* State + Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="State">
                  <select
                    value={form.state}
                    onChange={(e) => set("state", e.target.value)}
                    className={inputCls(false)}
                    style={{ color: "var(--ew-text)" }}
                    data-ocid="trek_form.state.select"
                  >
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="himachal">Himachal Pradesh</option>
                  </select>
                </Field>
                <Field label="Difficulty">
                  <select
                    value={form.difficulty}
                    onChange={(e) => set("difficulty", e.target.value)}
                    className={inputCls(false)}
                    style={{ color: "var(--ew-text)" }}
                    data-ocid="trek_form.difficulty.select"
                  >
                    {DIFFICULTIES.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Duration + Altitude + Price + Distance */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Field label="Duration (days) *" error={errors.duration}>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    className={inputCls(!!errors.duration)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="7"
                    min="1"
                    data-ocid="trek_form.duration.input"
                  />
                </Field>
                <Field label="Altitude (m) *" error={errors.altitude}>
                  <input
                    type="number"
                    value={form.altitude}
                    onChange={(e) => set("altitude", e.target.value)}
                    className={inputCls(!!errors.altitude)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="4500"
                    min="0"
                    data-ocid="trek_form.altitude.input"
                  />
                </Field>
                <Field label="Price (₹) *" error={errors.price}>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    className={inputCls(!!errors.price)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="12000"
                    min="0"
                    data-ocid="trek_form.price.input"
                  />
                </Field>
                <Field label="Distance (km) *" error={errors.distance}>
                  <input
                    type="number"
                    value={form.distance}
                    onChange={(e) => set("distance", e.target.value)}
                    className={inputCls(!!errors.distance)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="45"
                    min="0"
                    data-ocid="trek_form.distance.input"
                  />
                </Field>
              </div>

              {/* Start + End */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Start Point *" error={errors.startPoint}>
                  <input
                    type="text"
                    value={form.startPoint}
                    onChange={(e) => set("startPoint", e.target.value)}
                    className={inputCls(!!errors.startPoint)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="Lohajung"
                    data-ocid="trek_form.start_point.input"
                  />
                </Field>
                <Field label="End Point *" error={errors.endPoint}>
                  <input
                    type="text"
                    value={form.endPoint}
                    onChange={(e) => set("endPoint", e.target.value)}
                    className={inputCls(!!errors.endPoint)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="Lohajung"
                    data-ocid="trek_form.end_point.input"
                  />
                </Field>
              </div>

              {/* Category + Best Season + Trek Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Category">
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputCls(false)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="Snow Trek"
                    data-ocid="trek_form.category.input"
                  />
                </Field>
                <Field label="Best Season">
                  <input
                    type="text"
                    value={form.bestSeason}
                    onChange={(e) => set("bestSeason", e.target.value)}
                    className={inputCls(false)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="May-Jun, Sep-Oct"
                    data-ocid="trek_form.best_season.input"
                  />
                </Field>
                <Field label="Trek Type">
                  <input
                    type="text"
                    value={form.trekType}
                    onChange={(e) => set("trekType", e.target.value)}
                    className={inputCls(false)}
                    style={{ color: "var(--ew-text)" }}
                    placeholder="Alpine"
                    data-ocid="trek_form.trek_type.input"
                  />
                </Field>
              </div>

              {/* Description */}
              <Field label="Full Description">
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={4}
                  className={inputCls(false)}
                  style={{ color: "var(--ew-text)" }}
                  placeholder="Detailed trek description..."
                  data-ocid="trek_form.description.textarea"
                />
              </Field>

              {/* Main Image */}
              <Field label="Main Image URL *" error={errors.image}>
                <ImageUploadField
                  label="Upload Main Image"
                  folder="treks"
                  acceptVideo={false}
                  onUploaded={handleMainImageUploaded}
                />
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => set("image", e.target.value)}
                  className={inputCls(!!errors.image)}
                  style={{ color: "var(--ew-text)" }}
                  placeholder="https://images.unsplash.com/photo-..."
                  data-ocid="trek_form.image.input"
                />
              </Field>

              {/* Additional Images */}
              <Field label="Additional Images (one URL per line)">
                <ImageUploadField
                  label="Upload Additional Images"
                  folder="gallery"
                  multiple
                  acceptVideo={false}
                  onUploaded={handleAdditionalImagesUploaded}
                />
                <textarea
                  value={form.images}
                  onChange={(e) => set("images", e.target.value)}
                  rows={3}
                  className={inputCls(false)}
                  style={{ color: "var(--ew-text)" }}
                  placeholder="https://images.unsplash.com/photo-..."
                  data-ocid="trek_form.images.textarea"
                />
              </Field>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <Toggle
                  label="Is Active"
                  checked={form.isActive}
                  onChange={(v) => set("isActive", v)}
                  ocid="trek_form.is_active.toggle"
                />
                <Toggle
                  label="Is Featured"
                  checked={form.isFeatured}
                  onChange={(v) => set("isFeatured", v)}
                  ocid="trek_form.is_featured.toggle"
                />
              </div>
            </form>

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-end gap-3"
              style={{
                borderTop: "1px solid var(--ew-gray-lt)",
                background: "var(--ew-gray-lt)",
              }}
            >
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                data-ocid="trek_form.cancel_button"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="trek-form"
                onClick={handleSubmit}
                disabled={isPending}
                className="btn-primary disabled:opacity-60"
                data-ocid="trek_form.submit_button"
              >
                {isPending ? "Saving…" : trek ? "Save Trek" : "Create Trek"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--ew-text-lt)" }}
      >
        {label}
      </p>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "var(--ew-red)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  ocid,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
}) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      data-ocid={ocid}
    >
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        tabIndex={0}
        className="relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2"
        style={{
          background: checked ? "var(--ew-orange)" : "var(--ew-gray-mid)",
          // @ts-ignore
          "--tw-ring-color": "var(--ew-orange)",
        }}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
      <span className="text-sm" style={{ color: "var(--ew-text-lt)" }}>
        {label}
      </span>
    </div>
  );
}
