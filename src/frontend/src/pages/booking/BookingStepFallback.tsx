import { Loader2 } from "lucide-react";
import { type ReactNode, Suspense } from "react";

export function BookingStepFallback({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div
          className="flex flex-col items-center justify-center gap-3 py-12 min-h-[200px]"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2
            size={28}
            className="animate-spin text-[#C0001C]"
            aria-hidden
          />
          <p
            className="text-sm font-medium"
            style={{ color: "var(--ew-gray-dark)" }}
          >
            {label}
          </p>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
