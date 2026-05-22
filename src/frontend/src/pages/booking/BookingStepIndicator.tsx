import { Check } from "lucide-react";
import { STEP_LABELS } from "./booking-form-shared";

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center overflow-x-auto pb-1">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
              style={{
                background:
                  i < current
                    ? "#22C55E"
                    : i === current
                      ? "#C0001C"
                      : "var(--ew-gray-mid)",
                color: i <= current ? "#fff" : "var(--ew-gray-dark)",
              }}
            >
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span
              className="text-[10px] mt-1 font-medium whitespace-nowrap"
              style={{
                color:
                  i === current
                    ? "#C0001C"
                    : i < current
                      ? "#22C55E"
                      : "var(--ew-gray-dark)",
              }}
            >
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div
              className="w-8 sm:w-12 h-0.5 mx-1 mb-4 flex-shrink-0 transition-colors"
              style={{
                background: i < current ? "#22C55E" : "var(--ew-gray-mid)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default StepIndicator;
