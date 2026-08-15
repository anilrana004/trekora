import { useIsMobile } from "@/hooks/use-mobile";
import { useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ew_hindi_banner_dismissed";

export default function LanguageBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPhone = useIsMobile();

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  // The phone home screen is a full-bleed video landing — a strip between the
  // header and the clip would break it. Every other page still shows the notice.
  if (!visible || (isPhone && pathname === "/")) return null;

  function dismiss() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  return (
    <div
      className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-medium text-white"
      style={{ background: "var(--ew-orange)" }}
      role="alert"
      data-ocid="language.banner"
    >
      <span className="flex-1 text-center">
        Trekora is live in English —{" "}
        <span className="font-bold">हिंदी गाइड ब्लॉग पर उपलब्ध</span>
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="flex-none p-1 rounded transition-colors hover:bg-white/20"
        data-ocid="language.banner.close_button"
      >
        <X size={16} />
      </button>
    </div>
  );
}
