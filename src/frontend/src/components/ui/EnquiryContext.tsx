import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import EnquiryModal from "./EnquiryModal";

type EnquiryContextValue = {
  openEnquiry: (trekName?: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [trekPreset, setTrekPreset] = useState<string | undefined>();

  const openEnquiry = useCallback((trekName?: string) => {
    setTrekPreset(trekName);
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <EnquiryModal
        isOpen={open}
        onClose={closeEnquiry}
        presetTrekLabel={trekPreset}
      />
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryContextValue {
  const ctx = useContext(EnquiryContext);
  if (!ctx) {
    throw new Error("useEnquiry must be used within EnquiryProvider");
  }
  return ctx;
}
