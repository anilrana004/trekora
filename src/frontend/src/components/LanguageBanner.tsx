import { X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "ew_hindi_banner_dismissed";

export default function LanguageBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

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
        Hindi content coming soon —{" "}
        <span className="font-bold">हिंदी सामग्री जल्द ही आ रही है</span>
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
