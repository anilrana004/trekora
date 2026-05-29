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
      className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around"
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
            className={`mobile-bottom-nav__link${isActive ? " mobile-bottom-nav__link--active" : ""}`}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            data-ocid={`mobile_bottom_nav.${label.toLowerCase()}.link`}
          >
            <span className="mobile-bottom-nav__icon" aria-hidden>
              <Icon
                size={16}
                strokeWidth={isActive ? 2.25 : 2}
                style={{
                  color: isActive ? "var(--ew-red)" : "var(--ew-gray-dark)",
                  transition: "color 0.2s",
                }}
              />
            </span>
            <span className="mobile-bottom-nav__label">{label}</span>
            {isActive ? (
              <span className="mobile-bottom-nav__dot" aria-hidden />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
