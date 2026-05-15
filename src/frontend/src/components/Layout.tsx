import { useEffect, useState } from "react";
import AnimatedOutlet from "./AnimatedOutlet";
import FloatingCTA from "./FloatingCTA";
import Footer from "./Footer";
import LanguageBanner from "./LanguageBanner";
import LiveChatWidget from "./LiveChatWidget";
import MobileBottomNav from "./MobileBottomNav";
import Navbar from "./Navbar";
import QueryModal from "./QueryModal";
import { CompareBar } from "./TrekCompare";
import TrekRecommenderQuiz from "./TrekRecommenderQuiz";
import { EnquiryProvider } from "./ui/EnquiryContext";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Layout() {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  // Allow Navbar "Plan My Trek" button to open modal via custom event
  useEffect(() => {
    const handler = () => setIsQueryModalOpen(true);
    window.addEventListener("open-query-modal", handler);
    return () => window.removeEventListener("open-query-modal", handler);
  }, []);

  return (
    <EnquiryProvider>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: "var(--ew-white)" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#C0001C] focus:border-2 focus:border-[#C0001C] focus:px-4 focus:py-2 focus:rounded-md focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <LanguageBanner />
        <main
          id="main-content"
          className="flex-1"
          style={{ paddingBottom: "var(--mobile-nav-height, 0)" }}
        >
          <AnimatedOutlet />
        </main>
        <Footer />
        <FloatingCTA onOpenModal={() => setIsQueryModalOpen(true)} />
        <QueryModal
          isOpen={isQueryModalOpen}
          onClose={() => setIsQueryModalOpen(false)}
        />
        <MobileBottomNav />
        <LiveChatWidget />
        <WhatsAppButton />
        <CompareBar />
        <TrekRecommenderQuiz />
      </div>
    </EnquiryProvider>
  );
}
