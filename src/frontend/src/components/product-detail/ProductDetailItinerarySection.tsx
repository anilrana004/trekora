import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import DetailTabPanel from "./DetailTabPanel";
import type { DisplayItineraryDay } from "./itinerary-utils";

function MealBadges({ meals }: { meals: [boolean, boolean, boolean] }) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="font-medium" style={{ color: "var(--ew-text)" }}>
        Meals:
      </span>
      {(["Breakfast", "Lunch", "Dinner"] as const).map((meal, mi) => (
        <span
          key={meal}
          className="rounded-full px-2 py-0.5 font-medium"
          style={
            meals[mi]
              ? {
                  backgroundColor: "var(--ew-orange-lt)",
                  color: "var(--ew-orange)",
                }
              : {
                  backgroundColor: "var(--ew-gray-lt)",
                  color: "var(--ew-gray-dark)",
                }
          }
        >
          {meal}
        </span>
      ))}
    </div>
  );
}

export default function ProductDetailItinerarySection({
  days,
  openDay,
  onOpenDayChange,
  onDownloadPdf,
  ocidPrefix,
  showMealBadges = false,
  footer,
}: {
  days: DisplayItineraryDay[];
  openDay: number | null;
  onOpenDayChange: (index: number | null) => void;
  onDownloadPdf: () => void | Promise<void>;
  ocidPrefix: string;
  /** Trek-style B/L/D chips when `meals` is a boolean tuple. */
  showMealBadges?: boolean;
  /** e.g. FitnessCalculator below the accordion card */
  footer?: ReactNode;
}) {
  return (
    <>
      <DetailTabPanel tabKey="itinerary">
        <h2 className="section-title mb-6">Day-by-Day Itinerary</h2>
        <div className="space-y-3">
          {days.map((day, i) => {
            const subtitle = [
              day.stay,
              day.altitude != null
                ? typeof day.altitude === "number"
                  ? `~${day.altitude.toLocaleString()}m`
                  : day.altitude
                : null,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <div
                key={`day-${day.day}-${i}`}
                className="overflow-hidden rounded-xl"
                style={{ border: "1px solid var(--ew-gray-mid)" }}
              >
                <button
                  type="button"
                  onClick={() => onOpenDayChange(openDay === i ? null : i)}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors"
                  style={{
                    backgroundColor:
                      openDay === i ? "var(--ew-red-lt)" : "var(--ew-gray-lt)",
                  }}
                  data-ocid={`${ocidPrefix}.itinerary.day.${day.day}`}
                >
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: "var(--ew-red)",
                      color: "#fff",
                    }}
                  >
                    D{day.day}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-bold"
                      style={{ color: "var(--ew-text)" }}
                    >
                      Day {day.day}: {day.title}
                    </p>
                    {subtitle ? (
                      <p
                        className="text-[12px]"
                        style={{ color: "var(--ew-gray-dark)" }}
                      >
                        {subtitle}
                      </p>
                    ) : null}
                  </div>
                  <ChevronRight
                    size={18}
                    style={{
                      color: "var(--ew-gray-dark)",
                      transform: openDay === i ? "rotate(90deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {openDay === i ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border-t p-4"
                        style={{ borderColor: "var(--ew-gray-mid)" }}
                      >
                        <p
                          className="mb-3 text-sm leading-relaxed"
                          style={{ color: "var(--ew-text-lt)" }}
                        >
                          {day.description}
                        </p>
                        {showMealBadges &&
                        Array.isArray(day.meals) &&
                        day.meals.length === 3 ? (
                          <MealBadges meals={day.meals} />
                        ) : (
                          <div
                            className="flex flex-wrap gap-4 text-xs"
                            style={{ color: "var(--ew-gray-dark)" }}
                          >
                            {day.distance ? (
                              <span>Distance: {day.distance}</span>
                            ) : null}
                            {day.stay ? <span>Stay: {day.stay}</span> : null}
                            {typeof day.meals === "string" ? (
                              <span>Meals: {day.meals}</span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--ew-gray-mid)" }}>
          <button
            type="button"
            onClick={() => void onDownloadPdf()}
            className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--ew-orange)",
              color: "#fff",
            }}
            data-ocid={`${ocidPrefix}.itinerary.download_pdf_button`}
          >
            📥 Download Full Itinerary PDF
          </button>
        </div>
      </DetailTabPanel>

      {footer ? (
        <motion.div
          key="itinerary-footer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {footer}
        </motion.div>
      ) : null}
    </>
  );
}
