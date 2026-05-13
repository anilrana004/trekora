import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ih_ref";

/** Reads ?ref=CODE from URL on mount and stores in localStorage. */
function captureReferralFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    localStorage.setItem(STORAGE_KEY, ref);
  }
}

export function useReferral() {
  const { actor } = useActor(createActor);
  const [referralCode, setReferralCode] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );

  useEffect(() => {
    captureReferralFromUrl();
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setReferralCode(stored);
  }, []);

  async function applyReferral(bookingComplete: boolean): Promise<void> {
    if (!bookingComplete || !referralCode || !actor) return;
    try {
      await actor.processReferral(referralCode);
      // Clear after successful processing so it's not double-applied
      localStorage.removeItem(STORAGE_KEY);
      setReferralCode(null);
    } catch {
      // Silently ignore — referral credit is non-blocking
    }
  }

  return { referralCode, applyReferral };
}

// Export the capture function for use at app boot
export { captureReferralFromUrl };
