import type { TrekBatchPublic } from "@/backend";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  DAYS_OF_WEEK,
  countFutureAvailableSlotsInMonth,
  firstMonthWithFutureBatch,
  formatYmdFromBatchTs,
  formatYmdLocal,
  parseYmdLocal,
} from "./booking-form-shared";

export default function BatchCalendar({
  batches,
  selectedDate,
  onSelectDate,
  isLoading,
}: {
  batches: TrekBatchPublic[];
  selectedDate: string | null;
  onSelectDate: (dateStr: string, batch: TrekBatchPublic | null) => void;
  isLoading: boolean;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  useEffect(() => {
    if (!selectedDate) return;
    const d = parseYmdLocal(selectedDate);
    if (!d) return;
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  }, [selectedDate]);

  const batchMap = useMemo(() => {
    const byDay = new Map<string, TrekBatchPublic[]>();
    for (const b of batches) {
      if (!b.isActive) continue;
      const key = formatYmdFromBatchTs(b.batchDate);
      if (!key) continue;
      const list = byDay.get(key) ?? [];
      list.push(b);
      byDay.set(key, list);
    }
    const map = new Map<string, TrekBatchPublic>();
    for (const [key, list] of byDay) {
      const best = list.reduce((acc, cur) =>
        Number(cur.availableSlots) > Number(acc.availableSlots) ? cur : acc,
      );
      map.set(key, best);
    }
    return map;
  }, [batches]);

  const batchesSnapSig = useMemo(
    () =>
      batches
        .map((b) => `${b.id}:${b.availableSlots}:${b.batchDate}:${b.isActive}`)
        .sort()
        .join("|"),
    [batches],
  );

  const snapSigRef = useRef<string>("");

  useEffect(() => {
    if (isLoading) return;
    if (selectedDate) return;
    if (batches.length === 0) {
      snapSigRef.current = "";
      return;
    }
    if (batchesSnapSig === snapSigRef.current) return;

    const availableHere = countFutureAvailableSlotsInMonth(
      viewYear,
      viewMonth,
      today,
      batchMap,
    );
    if (availableHere > 0) {
      snapSigRef.current = batchesSnapSig;
      return;
    }

    const target = firstMonthWithFutureBatch(batches, today);
    if (target) {
      setViewYear(target.y);
      setViewMonth(target.m);
    }
    snapSigRef.current = batchesSnapSig;
  }, [
    isLoading,
    batches,
    batchesSnapSig,
    viewYear,
    viewMonth,
    today,
    batchMap,
    selectedDate,
  ]);

  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    let startOffset = firstOfMonth.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: (Date | null)[] = [];
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
    year: "numeric",
  });

  if (isLoading) {
    return (
      <div
        className="w-full min-w-0 rounded-xl border p-3 sm:p-4"
        style={{ borderColor: "var(--ew-gray-mid)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <div
            className="h-5 w-28 rounded animate-pulse sm:w-32"
            style={{ background: "var(--ew-gray-mid)" }}
          />
          <div className="flex gap-2">
            <div
              className="h-12 w-12 shrink-0 rounded-full animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
            <div
              className="h-12 w-12 shrink-0 rounded-full animate-pulse"
              style={{ background: "var(--ew-gray-mid)" }}
            />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-1.5">
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={`sk-${i + 1}`}
              className="min-h-12 rounded-md animate-pulse"
              style={{ background: "var(--ew-gray-mid)", opacity: 0.5 }}
            />
          ))}
        </div>
      </div>
    );
  }

  const atOrBeforeCurrentMonth =
    viewYear < today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth <= today.getMonth());

  return (
    <div
      className="relative z-10 w-full min-w-0 touch-manipulation rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--ew-gray-mid)" }}
      data-ocid="booking.calendar"
      role="application"
      aria-label="Batch departure calendar"
    >
      <div
        className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ background: "var(--ew-gray-lt)" }}
      >
        <button
          type="button"
          onClick={prevMonth}
          disabled={atOrBeforeCurrentMonth}
          className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-80 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
          style={{ color: "#C0001C" }}
          aria-label="Previous month"
          data-ocid="booking.calendar.prev_button"
        >
          <ChevronLeft size={22} className="shrink-0" strokeWidth={2.25} />
        </button>
        <span
          className="min-w-0 truncate text-center text-sm font-bold sm:text-base px-1"
          style={{ color: "var(--ew-text)" }}
          aria-live="polite"
        >
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-80 active:scale-95"
          style={{ color: "#C0001C" }}
          aria-label="Next month"
          data-ocid="booking.calendar.next_button"
        >
          <ChevronRight size={22} className="shrink-0" strokeWidth={2.25} />
        </button>
      </div>
      <div
        className="grid grid-cols-7 gap-1 px-2 py-1.5 text-center sm:gap-1.5 sm:px-3"
        style={{
          background: "var(--ew-gray-lt)",
          borderBottom: "1px solid var(--ew-gray-mid)",
        }}
      >
        {DAYS_OF_WEEK.map((d) => (
          <div
            key={d}
            className="truncate py-1.5 text-[11px] font-semibold uppercase tracking-wide sm:text-xs"
            style={{ color: "var(--ew-gray-dark)" }}
            title={d}
          >
            {d}
          </div>
        ))}
      </div>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">Departure dates</legend>
        <div className="grid grid-cols-7 gap-1 p-2 sm:gap-1.5 sm:p-3">
          {calendarDays.map((date, idx) => {
            if (!date)
              return (
                <div
                  key={`pad-${viewYear}-${viewMonth}-${idx + 1}`}
                  className="min-h-12 min-w-0"
                  aria-hidden
                />
              );
            const key = formatYmdLocal(date);
            const batch = batchMap.get(key);
            const isPast = date < today;
            const isSelected = selectedDate === key;
            const isFull = batch && Number(batch.availableSlots) === 0;
            const isAvailable = batch && Number(batch.availableSlots) > 0;
            const slots = batch ? Number(batch.availableSlots) : 0;
            const isOnRequest = !isPast && !isFull && !isAvailable;

            let cellStyle: React.CSSProperties = {};
            let cellClass =
              "relative flex min-h-12 min-w-0 select-none flex-col items-center justify-center rounded-lg px-0.5 py-1 text-sm font-semibold transition-all sm:min-h-[3.25rem] sm:text-base ";
            if (isAvailable) {
              cellClass +=
                "cursor-pointer transition-transform active:scale-[0.98] hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0001C] ";
              cellStyle = { background: "#2E7D32", color: "#fff" };
            } else if (isFull) {
              cellClass +=
                "cursor-not-allowed line-through opacity-90 focus-visible:outline-none ";
              cellStyle = { background: "#EBEBEB", color: "#888" };
            } else if (isPast) {
              cellClass +=
                "cursor-not-allowed opacity-40 focus-visible:outline-none ";
              cellStyle = { color: "var(--ew-gray-dark)" };
            } else if (isOnRequest) {
              cellClass +=
                "cursor-pointer border border-dashed transition-transform active:scale-[0.98] hover:bg-[var(--ew-gray-lt)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0001C] ";
              cellStyle = {
                borderColor: "var(--ew-gray-mid)",
                color: "var(--ew-text-lt)",
              };
            } else {
              cellClass += "cursor-default focus-visible:outline-none ";
              cellStyle = { color: "var(--ew-text-lt)" };
            }
            if (isSelected) {
              cellStyle = {
                ...cellStyle,
                outline: "2px solid #E87722",
                outlineOffset: "1px",
                ...(isOnRequest
                  ? {
                      background: "var(--ew-orange-lt)",
                      color: "var(--ew-text)",
                      borderColor: "#E87722",
                    }
                  : {}),
              };
            }

            const labelParts = [
              date.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            ];
            if (isAvailable)
              labelParts.push(
                `${slots} slot${slots !== 1 ? "s" : ""} available`,
              );
            else if (isFull) labelParts.push("Full");
            else if (isPast) labelParts.push("Past date");
            else if (isOnRequest)
              labelParts.push(
                isSelected
                  ? "Selected — we will confirm availability"
                  : "Request this date — we will confirm availability",
              );
            else labelParts.push("No departure");

            const canSelect = (isAvailable && batch) || isOnRequest;

            if (canSelect) {
              const pickBatch = isAvailable && batch ? batch : null;
              return (
                <button
                  key={key}
                  type="button"
                  className={`${cellClass} w-full bg-transparent p-0 font-inherit ${isOnRequest ? "" : "border-0"}`}
                  style={cellStyle}
                  onClick={() => onSelectDate(key, pickBatch)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectDate(key, pickBatch);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={labelParts.join(". ")}
                  title={
                    isAvailable
                      ? `${slots} slot${slots !== 1 ? "s" : ""} available`
                      : "We will confirm availability for this date"
                  }
                  data-ocid={
                    isAvailable
                      ? "booking.calendar.available_date"
                      : "booking.calendar.request_date"
                  }
                >
                  <span className="tabular-nums">{date.getDate()}</span>
                  {isAvailable && slots <= 3 && (
                    <span
                      className="mt-0.5 text-[9px] sm:text-[10px] font-bold leading-none"
                      aria-hidden
                    >
                      {slots} left
                    </span>
                  )}
                </button>
              );
            }

            return (
              <div
                key={key}
                className={cellClass}
                style={cellStyle}
                aria-disabled
                aria-label={labelParts.join(". ")}
                title={isFull ? "FULL" : undefined}
              >
                <span className="tabular-nums">{date.getDate()}</span>
                {isFull && (
                  <span
                    className="mt-0.5 text-[9px] sm:text-[10px] font-bold leading-none"
                    style={{ color: "#888" }}
                    aria-hidden
                  >
                    FULL
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
      <div
        className="flex flex-wrap gap-x-4 gap-y-2.5 px-3 pb-3 pt-0.5 text-xs sm:text-sm"
        style={{ color: "var(--ew-gray-dark)" }}
      >
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ background: "#2E7D32" }}
          />{" "}
          Available
        </span>
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ background: "#EBEBEB", border: "1px solid #ccc" }}
          />{" "}
          Full
        </span>
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded border border-dashed"
            style={{ borderColor: "var(--ew-gray-mid)" }}
          />{" "}
          On request
        </span>
        <span className="flex items-center gap-2 min-h-[44px] sm:min-h-0">
          <span
            className="h-3.5 w-3.5 shrink-0 rounded"
            style={{ outline: "2px solid #E87722" }}
          />{" "}
          Selected
        </span>
      </div>
    </div>
  );
}
