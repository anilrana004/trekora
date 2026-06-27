import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { CompareProvider } from "./components/TrekCompare";
import { captureReferralFromUrl } from "./hooks/useReferral";
import { initWebMcp } from "./lib/webmcp";
import { router } from "./router";

export default function App() {
  // Capture ?ref=CODE from URL on mount and store in localStorage
  useEffect(() => {
    captureReferralFromUrl();
  }, []);

  useEffect(() => initWebMcp(), []);

  return (
    <CompareProvider>
      <RouterProvider router={router} />
    </CompareProvider>
  );
}
