import CallbackRequestPanel from "@/components/CallbackRequestPanel";
import { ListingScrollChromeProvider } from "@/contexts/ListingScrollChromeContext";
import { registerLayoutModalOpeners } from "@/lib/layout-modals";
import { useEffect, useState } from "react";
import AnimatedOutlet from "./AnimatedOutlet";
import ExploreTagsSection from "./ExploreTagsSection";
import FloatingCTA from "./FloatingCTA";
import Footer from "./Footer";
import LanguageBanner from "./LanguageBanner";
import LiveChatWidget from "./LiveChatWidget";
import MobileBottomNav from "./MobileBottomNav";
import Navbar from "./Navbar";
import QueryModal from "./QueryModal";
import RoutePageSEO from "./RoutePageSEO";
import { CompareBar } from "./TrekCompare";
import TrekRecommenderQuiz from "./TrekRecommenderQuiz";
import { EnquiryProvider } from "./ui/EnquiryContext";
import WhatsAppButton from "./ui/WhatsAppButton";

export default function Layout() {
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  useEffect(() => {
    const openQuery = () => setIsQueryModalOpen(true);
    const openQuiz = () => setIsQuizOpen(true);
    const openCallback = () => setIsCallbackOpen(true);

    registerLayoutModalOpeners({
      openQueryModal: openQuery,
      openTrekQuiz: openQuiz,
      openCallback,
    });

    window.addEventListener("open-query-modal", openQuery);
    window.addEventListener("open-trek-quiz", openQuiz);
    window.addEventListener("open-callback-panel", openCallback);

    return () => {
      registerLayoutModalOpeners({
        openQueryModal: null,
        openTrekQuiz: null,
        openCallback: null,
      });
      window.removeEventListener("open-query-modal", openQuery);
      window.removeEventListener("open-trek-quiz", openQuiz);
      window.removeEventListener("open-callback-panel", openCallback);
    };
  }, []);

  return (
    <EnquiryProvider>
      <ListingScrollChromeProvider>
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
          <RoutePageSEO />
          <Navbar />
          <LanguageBanner />
          <main
            id="main-content"
            className="flex-1"
            style={{
              paddingBottom:
                "calc(var(--mobile-nav-height, 0px) + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <AnimatedOutlet />
          </main>
          <ExploreTagsSection />
          <Footer />
          <FloatingCTA onOpenModal={() => setIsQueryModalOpen(true)} />
          <QueryModal
            isOpen={isQueryModalOpen}
            onClose={() => setIsQueryModalOpen(false)}
          />
          <CallbackRequestPanel
            open={isCallbackOpen}
            onClose={() => setIsCallbackOpen(false)}
            placement="modal"
            source="Site CTA"
          />
          <MobileBottomNav />
          <LiveChatWidget />
          <WhatsAppButton />
          <CompareBar />
          <TrekRecommenderQuiz open={isQuizOpen} onOpenChange={setIsQuizOpen} />
        </div>
      </ListingScrollChromeProvider>
    </EnquiryProvider>
  );
}
