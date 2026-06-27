import { buildWhatsAppUrl } from "@/lib/site-contact";
import { motion } from "@/lib/motion";
import { toast } from "sonner";

interface ShareSectionProps {
  title: string;
  url?: string;
}

const ICON_SIZE = 48;

export default function ShareSection({ title, url }: ShareSectionProps) {
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareMessage = `Check out ${title} on Trekora: ${shareUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => null);
    toast.success("Link copied!", { duration: 2000 });
  };

  const buttons: {
    label: string;
    ariaLabel: string;
    bg: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }[] = [
    {
      label: "WhatsApp",
      ariaLabel: "Share on WhatsApp",
      bg: "#25D366",
      href: buildWhatsAppUrl(shareMessage),
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.124 1.523 5.86L0 24l6.292-1.497A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.855 0-3.594-.502-5.09-1.38l-.361-.216-3.734.889.94-3.631-.235-.374A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      ariaLabel: "Share on Facebook",
      bg: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Twitter/X",
      ariaLabel: "Share on Twitter / X",
      bg: "#000",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`${title} — Trekora Himalayan Adventures`)}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.66 2.25H8.08l4.252 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      ariaLabel: "View Trekora on Instagram",
      bg: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      href: "https://www.instagram.com/trekora/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      ariaLabel: "View Trekora on YouTube",
      bg: "#FF0000",
      href: "https://www.youtube.com/@trekora",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="22"
          height="22"
          aria-hidden="true"
        >
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
      ),
    },
    {
      label: "Copy Link",
      ariaLabel: "Copy link to clipboard",
      bg: "#E5E7EB",
      onClick: handleCopy,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-6">
      <h3
        className="font-semibold text-lg mb-4"
        style={{ color: "var(--ew-text)" }}
      >
        Share &amp; Inspire Others
      </h3>
      <div className="flex items-center gap-3 flex-wrap">
        {buttons.map((btn) => {
          const isGradient = btn.bg.includes("gradient");
          const style: React.CSSProperties = isGradient
            ? {
                background: btn.bg,
                color: "#fff",
                width: ICON_SIZE,
                height: ICON_SIZE,
              }
            : {
                backgroundColor: btn.bg,
                color: btn.bg === "#E5E7EB" ? "#374151" : "#fff",
                width: ICON_SIZE,
                height: ICON_SIZE,
              };

          if (btn.href) {
            return (
              <motion.a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={btn.ariaLabel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={style}
                className="rounded-full flex items-center justify-center shadow-sm transition-shadow hover:shadow-md flex-shrink-0"
                data-ocid={`share.${btn.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_button`}
              >
                {btn.icon}
              </motion.a>
            );
          }
          return (
            <motion.button
              key={btn.label}
              type="button"
              aria-label={btn.ariaLabel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.onClick}
              style={style}
              className="rounded-full flex items-center justify-center shadow-sm transition-shadow hover:shadow-md flex-shrink-0"
              data-ocid={`share.${btn.label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_button`}
            >
              {btn.icon}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
