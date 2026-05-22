import { createActor } from "@/backend";
import type { UserProfile } from "@/backend.d.ts";
import { useActor } from "@trekora/icp";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

function useProfileByCode(code: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["trekkerProfile", code],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserByReferralCode(code);
    },
    enabled: !!actor && !isFetching && !!code,
  });
}

function BadgeCard({
  label,
  threshold,
  earned,
}: {
  label: string;
  threshold: number;
  earned: boolean;
}) {
  return (
    <div
      className="rounded-xl p-3 text-center"
      style={{
        background: earned ? "var(--ew-orange-lt)" : "var(--ew-gray-lt)",
        border: `1px solid ${earned ? "var(--ew-orange)" : "var(--ew-gray-mid)"}`,
      }}
    >
      <div className="text-2xl mb-1">{earned ? "🏔" : "🔒"}</div>
      <p
        className="text-xs font-bold"
        style={{ color: earned ? "var(--ew-orange)" : "var(--ew-gray-dark)" }}
      >
        {label}
      </p>
      {earned ? (
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "var(--ew-orange)", color: "#fff" }}
        >
          Earned!
        </span>
      ) : (
        <p
          className="text-[10px] mt-0.5"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          Above {threshold}m to unlock
        </p>
      )}
    </div>
  );
}

export default function TrekkerProfilePage() {
  const { username } = useParams({ from: "/layout/trekkers/$username" });
  const { data: profile, isLoading } = useProfileByCode(username);
  const [isCopied, setIsCopied] = useState(false);

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/trekkers/${username}`
      : "";

  function handleCopy() {
    navigator.clipboard.writeText(profileUrl).catch(() => null);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--ew-orange)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4 px-4"
        data-ocid="trekker_profile.error_state"
      >
        <div className="text-5xl">🏔</div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
          Trekker Not Found
        </h1>
        <p className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
          This trekker profile does not exist.
        </p>
        <Link to="/treks" className="btn-primary">
          Explore Treks
        </Link>
      </div>
    );
  }

  const joinYear = new Date(Number(profile.joinedAt) / 1_000_000).getFullYear();
  const displayName = profile.name || username;
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Derive points from wallet balance (100 points per ₹500 wallet credit)
  const points =
    Number(profile.walletBalance) > 0
      ? Math.floor(Number(profile.walletBalance) / 5)
      : 0;

  return (
    <div
      className="pt-20 min-h-screen pb-12"
      style={{ background: "var(--ew-gray-lt)" }}
      data-ocid="trekker_profile.page"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          {/* Hero band */}
          <div className="h-24" style={{ background: "var(--ew-footer)" }} />

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg"
                style={{ background: "var(--ew-red)" }}
                aria-label={`${displayName} avatar`}
              >
                {initials}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary text-sm"
                data-ocid="trekker_profile.share_button"
              >
                {isCopied ? "✓ Copied!" : "Share Profile"}
              </button>
            </div>

            {/* Name & joined */}
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              {displayName}
            </h1>
            <p
              className="text-sm mt-0.5"
              style={{ color: "var(--ew-gray-dark)" }}
            >
              Joined {joinYear} · EternaWings Trekker
            </p>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 gap-3 mt-5 rounded-xl p-4"
              style={{ background: "var(--ew-gray-lt)" }}
            >
              {[
                { label: "Treks Completed", value: "—" },
                { label: "Highest Altitude", value: "—" },
                { label: "Points", value: points > 0 ? String(points) : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p
                    className="text-xl font-bold"
                    style={{ color: "var(--ew-text)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[11px] mt-0.5"
                    style={{ color: "var(--ew-gray-dark)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Altitude Badges */}
            <div className="mt-6">
              <h2
                className="font-bold text-sm mb-3"
                style={{ color: "var(--ew-text)" }}
              >
                🏔️ Altitude Badges
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <BadgeCard label="3000m Club" threshold={3000} earned={false} />
                <BadgeCard label="4000m Club" threshold={4000} earned={false} />
                <BadgeCard label="5000m Club" threshold={5000} earned={false} />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <Link
            to="/treks"
            className="text-sm font-semibold hover:underline"
            style={{ color: "var(--ew-red)" }}
          >
            Explore EternaWings Treks →
          </Link>
        </div>
      </div>
    </div>
  );
}
