import {
  useListingScrollChrome,
  type ListingScrollChromeState,
} from "@/hooks/useListingScrollChrome";
import { createContext, useContext, type ReactNode } from "react";

const ListingScrollChromeContext = createContext<ListingScrollChromeState>({
  chromeActive: false,
  pastHero: false,
  isScrolling: false,
  enabled: false,
});

export function ListingScrollChromeProvider({ children }: { children: ReactNode }) {
  const value = useListingScrollChrome();
  return (
    <ListingScrollChromeContext.Provider value={value}>
      {children}
    </ListingScrollChromeContext.Provider>
  );
}

export function useListingScrollChromeContext(): ListingScrollChromeState {
  return useContext(ListingScrollChromeContext);
}
