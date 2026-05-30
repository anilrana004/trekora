import { CTA_OUTLINE_DASHED, ctaMerge } from "@/lib/cta-buttons";
import { normalizeIndianPhoneDigits } from "@/lib/phone-countries";
import { Plus, Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import {
  BLOOD_GROUPS,
  COMPANION_RELATIONSHIPS,
  type CoTraveler,
  type CoTravelerFieldErrors,
  type FormDataAccumulated,
  emptyCoTraveler,
  maxCompanionSlots,
  partyHeadcount,
  syncPartyGroupSize,
} from "./booking-form-shared";

const COMPANION_GENDERS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
] as const;

export default function TravelingWithYouSection({
  fd,
  setFd,
  maxPartySlots,
  companionErrors,
  onCompanionFieldChange,
}: {
  fd: FormDataAccumulated;
  setFd: React.Dispatch<React.SetStateAction<FormDataAccumulated>>;
  maxPartySlots: number;
  companionErrors: Record<number, CoTravelerFieldErrors>;
  onCompanionFieldChange: (index: number) => void;
}) {
  const inp =
    "w-full border rounded-lg px-3 text-[16px] focus:outline-none focus:ring-2 transition-colors" +
    " border-[var(--ew-gray-mid)] focus:ring-[#C0001C]/30 focus:border-[#C0001C]" +
    " min-h-[48px]";
  const lbl = "block text-[13px] font-medium mb-1.5";
  const maxCompanions = maxCompanionSlots(maxPartySlots);
  const headcount = partyHeadcount(fd);
  const canAdd = fd.coTravelers.length < maxCompanions;

  const addCompanion = () => {
    if (!canAdd) {
      toast.error(
        maxCompanions === 0
          ? "Only one seat is available for this batch."
          : `You can add up to ${maxCompanions} companion(s) for this booking.`,
      );
      return;
    }
    setFd((p) =>
      syncPartyGroupSize(
        {
          ...p,
          coTravelers: [...p.coTravelers, emptyCoTraveler()],
        },
        maxPartySlots,
      ),
    );
  };

  const removeCompanion = (i: number) => {
    setFd((p) => {
      const coTravelers = p.coTravelers.filter((_, idx) => idx !== i);
      return syncPartyGroupSize(
        {
          ...p,
          coTravelers,
        },
        maxPartySlots,
      );
    });
  };

  const updateCompanion = (
    i: number,
    field: keyof CoTraveler,
    value: string,
  ) => {
    onCompanionFieldChange(i);
    setFd((p) => ({
      ...p,
      coTravelers: p.coTravelers.map((ct, idx) =>
        idx === i ? { ...ct, [field]: value } : ct,
      ),
      hasCoTravelers: true,
    }));
  };

  const companionErr = (i: number, field: keyof CoTraveler) =>
    companionErrors[i]?.[field] ? (
      <p className="text-xs mt-1" style={{ color: "#C0001C" }} role="alert">
        {companionErrors[i][field]}
      </p>
    ) : null;

  return (
    <div
      className="rounded-xl border p-4 sm:p-5 space-y-4"
      style={{
        borderColor: "var(--ew-gray-mid)",
        background: "linear-gradient(180deg, #fff 0%, var(--ew-gray-lt) 100%)",
      }}
      data-ocid="booking.traveling_with_you"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ background: "var(--ew-red-lt)", color: "var(--ew-red)" }}
        >
          <Users size={20} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className="text-base font-bold"
            style={{ color: "var(--ew-text)" }}
          >
            Traveling with you
          </h3>
          <p
            className="text-xs mt-1 leading-relaxed"
            style={{ color: "var(--ew-text-lt)" }}
          >
            Add everyone in your group besides yourself — family, friends, or
            colleagues. You can add as many people as you need (up to batch
            availability).
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-2 text-xs font-semibold"
        style={{ color: "var(--ew-text)" }}
      >
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "#E8F5E9", color: "#2E7D32" }}
        >
          <Users size={14} aria-hidden />
          {headcount} in your group (including you)
        </span>
        {fd.coTravelers.length > 0 && (
          <span style={{ color: "var(--ew-gray-dark)" }}>
            · {fd.coTravelers.length} companion
            {fd.coTravelers.length !== 1 ? "s" : ""} added
          </span>
        )}
      </div>

      {fd.coTravelers.length === 0 ? (
        <div
          className="rounded-xl border-2 border-dashed px-4 py-6 text-center"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "var(--ew-text)" }}
          >
            Booking solo?
          </p>
          <p
            className="text-xs mt-1 mb-4"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            Skip this section, or add people who are traveling with you.
          </p>
          <button
            type="button"
            onClick={addCompanion}
            className={ctaMerge(CTA_OUTLINE_DASHED, "inline-flex")}
            data-ocid="booking.add_companion_button.empty"
          >
            <UserPlus size={18} aria-hidden />
            Add person traveling with me
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {fd.coTravelers.map((ct, i) => (
            <div
              key={`companion-${i + 1}`}
              data-booking-companion={i}
              className="rounded-xl p-4 relative"
              style={{
                background: "#fff",
                border: "1px solid var(--ew-gray-mid)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
              data-ocid={`booking.companion.item.${i + 1}`}
            >
              <button
                type="button"
                onClick={() => removeCompanion(i)}
                className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold"
                style={{ color: "#C0001C", background: "#FFF5F5" }}
                aria-label={`Remove ${ct.name.trim() || `person ${i + 2}`}`}
                data-ocid={`booking.companion.remove.${i + 1}`}
              >
                <Trash2 size={12} aria-hidden /> Remove
              </button>

              <p
                className="text-sm font-bold mb-3 pr-20"
                style={{ color: "var(--ew-red)" }}
              >
                Person {i + 2} · Traveling with you
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`cmp-rel-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Relationship to you
                  </label>
                  <select
                    id={`cmp-rel-${i}`}
                    value={ct.relationship}
                    onChange={(e) =>
                      updateCompanion(i, "relationship", e.target.value)
                    }
                    className={inp}
                  >
                    {COMPANION_RELATIONSHIPS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`cmp-name-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Full name (as on ID) *
                  </label>
                  <input
                    id={`cmp-name-${i}`}
                    type="text"
                    value={ct.name}
                    onChange={(e) => updateCompanion(i, "name", e.target.value)}
                    className={inp}
                    autoComplete="name"
                    data-ocid={`booking.companion.name.${i + 1}`}
                  />
                  {companionErr(i, "name")}
                </div>
                <div>
                  <label
                    htmlFor={`cmp-age-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Age *
                  </label>
                  <input
                    id={`cmp-age-${i}`}
                    type="number"
                    inputMode="numeric"
                    min={12}
                    max={70}
                    value={ct.age}
                    onChange={(e) => updateCompanion(i, "age", e.target.value)}
                    className={inp}
                    placeholder="12–70"
                    data-ocid={`booking.companion.age.${i + 1}`}
                  />
                  {companionErr(i, "age")}
                </div>
                <div data-booking-field={`companion-gender-${i}`}>
                  <label
                    htmlFor={`cmp-gender-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Gender *
                  </label>
                  <select
                    id={`cmp-gender-${i}`}
                    value={ct.gender}
                    onChange={(e) => {
                      updateCompanion(i, "gender", e.target.value);
                      onCompanionFieldChange(i);
                    }}
                    className={`${inp} booking-gender-select`}
                    data-ocid={`booking.companion.gender.${i + 1}`}
                  >
                    <option value="">Select gender</option>
                    {COMPANION_GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {companionErr(i, "gender")}
                </div>
                <div>
                  <label
                    htmlFor={`cmp-email-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Email (optional)
                  </label>
                  <input
                    id={`cmp-email-${i}`}
                    type="email"
                    value={ct.email}
                    onChange={(e) =>
                      updateCompanion(i, "email", e.target.value)
                    }
                    className={inp}
                    autoComplete="email"
                    placeholder="for confirmation copy"
                    data-ocid={`booking.companion.email.${i + 1}`}
                  />
                  {companionErr(i, "email")}
                </div>
                <div>
                  <label
                    htmlFor={`cmp-mobile-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Mobile (optional)
                  </label>
                  <input
                    id={`cmp-mobile-${i}`}
                    type="tel"
                    inputMode="numeric"
                    value={ct.mobile}
                    onChange={(e) =>
                      updateCompanion(
                        i,
                        "mobile",
                        normalizeIndianPhoneDigits(e.target.value),
                      )
                    }
                    className={inp}
                    maxLength={10}
                    placeholder="10-digit Indian mobile"
                    data-ocid={`booking.companion.mobile.${i + 1}`}
                  />
                  {companionErr(i, "mobile")}
                </div>
                <div>
                  <label
                    htmlFor={`cmp-blood-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Blood group
                  </label>
                  <select
                    id={`cmp-blood-${i}`}
                    value={ct.bloodGroup}
                    onChange={(e) =>
                      updateCompanion(i, "bloodGroup", e.target.value)
                    }
                    className={inp}
                  >
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor={`cmp-medical-${i}`}
                    className={lbl}
                    style={{ color: "var(--ew-text)" }}
                  >
                    Medical notes (optional)
                  </label>
                  <input
                    id={`cmp-medical-${i}`}
                    type="text"
                    value={ct.medicalNote}
                    onChange={(e) =>
                      updateCompanion(i, "medicalNote", e.target.value)
                    }
                    className={inp}
                    placeholder="Allergies, conditions, or None"
                    data-ocid={`booking.companion.medical.${i + 1}`}
                  />
                </div>
              </div>
            </div>
          ))}

          {canAdd && (
            <button
              type="button"
              onClick={addCompanion}
              className={ctaMerge(CTA_OUTLINE_DASHED, "w-full")}
              data-ocid="booking.add_companion_button"
            >
              <Plus size={18} aria-hidden />
              Add another person traveling with me
            </button>
          )}
        </div>
      )}
    </div>
  );
}
