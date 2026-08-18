import { bookSearch } from "@/lib/book-search";
import {
  LANDING_FLASH_VOUCHER,
  isLandingFlashVoucherLive,
} from "@/lib/booking-promos";
import { copyText } from "@/lib/copy-text";
import { Link } from "@tanstack/react-router";
import { Check, Clock, Copy, Gift, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Variant = "card" | "chip";

type LandingFlashVoucherBannerProps = {
  variant?: Variant;
};

type Remain = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

function remainingUntil(expiresAtMs: number, nowMs: number): Remain | null {
  const ms = expiresAtMs - nowMs;
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const secs = Math.floor((ms % 60_000) / 1000);
  return { days, hours, mins, secs };
}

function formatRemain(remain: Remain): string {
  if (remain.days > 0) {
    return `${remain.days}d ${remain.hours}h ${remain.mins}m`;
  }
  return `${remain.hours}h ${remain.mins}m ${remain.secs}s`;
}

export default function LandingFlashVoucherBanner({
  variant = "card",
}: LandingFlashVoucherBannerProps) {
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);
  const live = isLandingFlashVoucherLive(now);
  const remain = remainingUntil(
    Date.parse(LANDING_FLASH_VOUCHER.expiresAtIso),
    now,
  );

  useEffect(() => {
    if (!live) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tickMs = reduced ? 30_000 : remain && remain.days > 0 ? 15_000 : 1000;
    const id = window.setInterval(() => setNow(Date.now()), tickMs);
    return () => window.clearInterval(id);
  }, [live, remain?.days]);

  if (!live || !remain) return null;

  async function handleCopy() {
    const ok = await copyText(LANDING_FLASH_VOUCHER.code);
    if (!ok) {
      toast.error("Could not copy the code. Please copy it manually.");
      return;
    }
    setCopied(true);
    toast.success(
      `${LANDING_FLASH_VOUCHER.code} copied — paste it at checkout`,
    );
    window.setTimeout(() => setCopied(false), 2200);
  }

  const bookSearchParams = bookSearch({
    voucher: LANDING_FLASH_VOUCHER.code,
  });

  if (variant === "chip") {
    return (
      <div className="landing-voucher-chip-wrap" data-ocid="home.voucher.chip">
        <div className="landing-voucher-chip">
          <span className="landing-voucher-chip__label">
            {LANDING_FLASH_VOUCHER.discountPercent}% off
          </span>
          <span className="landing-voucher-chip__code" aria-hidden>
            {LANDING_FLASH_VOUCHER.code}
          </span>
          <button
            type="button"
            className="landing-voucher-chip__copy"
            onClick={() => void handleCopy()}
            aria-label={`Copy discount code ${LANDING_FLASH_VOUCHER.code}`}
            data-ocid="home.voucher.chip.copy"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      className="bg-white py-5 sm:py-6"
      data-ocid="home.voucher.section"
      aria-label={`${LANDING_FLASH_VOUCHER.discountPercent} percent off treks and yatras`}
    >
      <div className="container mx-auto px-4">
        <div className="landing-voucher-card">
          <div className="landing-voucher-card__inner">
            <div>
              <span className="landing-voucher-card__eyebrow">
                <Gift size={14} aria-hidden />
                7-day gift voucher
              </span>
              <h2 className="landing-voucher-card__title">
                {LANDING_FLASH_VOUCHER.discountPercent}% off every trek &amp;
                yatra
              </h2>
              <p className="landing-voucher-card__desc">
                Copy the code, pick any Himalayan trek or yatra, and paste it on
                the booking review step. Gift cards still work the same way at
                checkout.
              </p>
              <div className="landing-voucher-card__meta mt-3">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} aria-hidden />
                  Ends in {formatRemain(remain)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Tag size={14} aria-hidden />
                  Treks &amp; yatras
                </span>
              </div>
            </div>
            <div className="landing-voucher-card__ticket">
              <div className="landing-voucher-card__code-row">
                <p className="landing-voucher-card__code" aria-live="polite">
                  {LANDING_FLASH_VOUCHER.code}
                </p>
                <button
                  type="button"
                  className="landing-voucher-card__copy"
                  onClick={() => void handleCopy()}
                  aria-label={`Copy discount code ${LANDING_FLASH_VOUCHER.code}`}
                  data-ocid="home.voucher.copy"
                >
                  {copied ? (
                    <Check size={16} aria-hidden />
                  ) : (
                    <Copy size={16} aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <Link
                to="/book"
                search={bookSearchParams}
                className="landing-voucher-card__book"
                data-ocid="home.voucher.book"
              >
                Use code on booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
