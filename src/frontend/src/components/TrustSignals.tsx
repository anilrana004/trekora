// INVARIANT: batchDate is epoch milliseconds (ms) from the canister.
// Do NOT divide by 1_000_000 (that would be for nanoseconds). Do NOT multiply on write.
import { useActor } from "@trekora/icp";
import { useEffect, useState } from "react";
import { createActor } from "../backend";
import type { TrekBatchPublic } from "../backend.d.ts";

interface TrustSignalsProps {
  trekSlug: string;
  trekId: number;
}

interface TrustData {
  bookingCount: number;
  spotsLeft: number | null;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached(key: string): TrustData | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: TrustData; ts: number };
    if (Date.now() - parsed.ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function setCache(key: string, data: TrustData) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // ignore storage errors
  }
}

export default function TrustSignals({ trekSlug, trekId }: TrustSignalsProps) {
  const { actor, isFetching } = useActor(createActor);
  const [trust, setTrust] = useState<TrustData | null>(null);

  useEffect(() => {
    if (isFetching || !actor) return;

    const cacheKey = `ew_trust_${trekSlug}`;
    const cached = getCached(cacheKey);
    if (cached) {
      setTrust(cached);
      return;
    }

    const load = async () => {
      try {
        const [bookingsResult, batches] = await Promise.all([
          actor.getAllBookings(),
          actor.getTrekBatches(BigInt(trekId)),
        ]);

        const bookings =
          bookingsResult.__kind__ === "ok" ? bookingsResult.ok : [];
        const trekBookings = bookings.filter(
          (b) => b.itemId === BigInt(trekId) && b.status === "confirmed",
        );

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const todayStartMs = BigInt(startOfToday.getTime());

        const upcomingBatches = (batches as TrekBatchPublic[]).filter(
          (batch) =>
            batch.isActive &&
            batch.batchDate >= todayStartMs &&
            Number(batch.availableSlots) > 0,
        );

        upcomingBatches.sort((a, b) => {
          if (a.batchDate < b.batchDate) return -1;
          if (a.batchDate > b.batchDate) return 1;
          return 0;
        });

        const nextBatch = upcomingBatches[0] ?? null;
        const spotsLeft = nextBatch ? Number(nextBatch.availableSlots) : null;

        const data: TrustData = {
          bookingCount: trekBookings.length,
          spotsLeft,
        };

        setCache(cacheKey, data);
        setTrust(data);
      } catch {
        // silently fail — trust signals are non-critical
      }
    };

    void load();
  }, [actor, isFetching, trekSlug, trekId]);

  if (!trust) return null;

  const { bookingCount, spotsLeft } = trust;

  return (
    <div className="space-y-2" data-ocid="trek_detail.trust_signals">
      {/* Bookings badge */}
      {bookingCount > 0 && (
        <div
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: "#e8f5e9",
            color: "var(--ew-green)",
            border: "1px solid rgba(46,125,50,0.2)",
          }}
        >
          <span>✓</span>
          <span>
            {bookingCount.toLocaleString("en-IN")} trekkers have booked this
            trek
          </span>
        </div>
      )}

      {/* Spots left badge */}
      {spotsLeft !== null && spotsLeft <= 10 && (
        <div
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            backgroundColor:
              spotsLeft <= 5 ? "var(--ew-red-lt)" : "var(--ew-orange-lt)",
            color: spotsLeft <= 5 ? "var(--ew-red)" : "var(--ew-orange)",
            border: `1px solid ${spotsLeft <= 5 ? "rgba(192,0,28,0.2)" : "rgba(232,119,34,0.2)"}`,
          }}
        >
          <span>⚡</span>
          <span>
            {spotsLeft <= 5
              ? `Only ${spotsLeft} spots left in the next batch!`
              : "Spots filling fast!"}
          </span>
        </div>
      )}
    </div>
  );
}
