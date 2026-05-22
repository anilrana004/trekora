import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Home,
  MessageCircle,
  RefreshCw,
} from "lucide-react";
import { SEOHead } from "./SEOHead";
import { ERROR_PAGE_SEO } from "@/lib/route-seo";
import {
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  buildWhatsAppUrl,
} from "@/lib/site-contact";

/** Route-level error UI — keeps navbar/footer via parent layout when possible. */
export default function RouteErrorFallback({
  error,
  reset,
}: ErrorComponentProps) {
  const message =
    error instanceof Error
      ? error.message
      : "An unexpected error occurred on this page.";

  return (
    <section
      className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center"
      role="alert"
      aria-live="assertive"
    >
      <SEOHead
        title={ERROR_PAGE_SEO.title}
        description={ERROR_PAGE_SEO.description}
        canonical={ERROR_PAGE_SEO.canonical}
        noindex={ERROR_PAGE_SEO.noindex}
      />
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--ew-red-lt)" }}
      >
        <AlertTriangle size={32} style={{ color: "var(--ew-red)" }} aria-hidden />
      </div>
      <h1 className="text-2xl font-bold" style={{ color: "var(--ew-text)" }}>
        Something went wrong
      </h1>
      <p className="mt-2 text-sm" style={{ color: "var(--ew-text-lt)" }}>
        {message}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary inline-flex items-center justify-center gap-2"
        >
          <RefreshCw size={18} aria-hidden />
          Try again
        </button>
        <Link
          to="/"
          className="btn-secondary inline-flex items-center justify-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <Home size={18} aria-hidden />
          Home
        </Link>
      </div>
      <p className="mt-8 text-xs" style={{ color: "var(--ew-gray-dark)" }}>
        Need help? Call{" "}
        <a href={`tel:${SITE_PHONE_TEL}`} className="font-semibold">
          {SITE_PHONE_DISPLAY}
        </a>{" "}
        or{" "}
        <a
          href={buildWhatsAppUrl("Hi, I had an issue on Trekora")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold"
        >
          <MessageCircle size={14} aria-hidden />
          WhatsApp
        </a>
      </p>
    </section>
  );
}
