import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, MapPin, Mountain, User } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const NAV_ITEMS = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Treks", icon: Mountain, to: "/treks" },
  { label: "Yatras", icon: Heart, to: "/yatras" },
  { label: "Destinations", icon: MapPin, to: "/destinations" },
  { label: "Contact", icon: User, to: "/contact" },
] as const;

/** Hide nav on flows where fixed chrome blocks taps (e.g. booking calendar on `/book`). */
const HIDDEN_ROUTES = ["/booking", "/book", "/admin"];

export default function MobileBottomNav() {
  const isMobile = useIsMobile();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  if (!isMobile) return null;
  if (HIDDEN_ROUTES.some((r) => pathname.startsWith(r))) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
      style={{
        height: 56,
        background: "#fff",
        borderTop: "1px solid #EBEBEB",
        WebkitBackfaceVisibility: "hidden",
        /* Safe-area for iPhone home indicator */
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      aria-label="Mobile bottom navigation"
      data-ocid="mobile_bottom_nav"
    >
      {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
        const isActive =
          to === "/" ? pathname === "/" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative"
            style={{
              textDecoration: "none",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            data-ocid={`mobile_bottom_nav.${label.toLowerCase()}.link`}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{
                background: isActive ? "#ffffff" : "transparent",
              }}
            >
              <Icon
                size={20}
                style={{
                  color: isActive ? "var(--ew-red)" : "var(--ew-gray-dark)",
                  transition: "color 0.2s",
                }}
              />
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--ew-red)" : "var(--ew-gray-dark)",
                transition: "color 0.2s",
                lineHeight: 1,
              }}
            >
              {label}
            </span>
            {/* Active dot */}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  bottom: 4,
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--ew-red)",
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
