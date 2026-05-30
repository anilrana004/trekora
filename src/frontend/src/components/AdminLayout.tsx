import { SiteLogo } from "@/components/SiteLogo";
import { revokeAdminSession } from "@/lib/admin-access";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Mountain,
  Settings,
  Tag,
  Users,
} from "lucide-react";
import AdminScrollOutlet from "./AdminScrollOutlet";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Treks Manager", to: "/admin/treks", icon: MapPin },
  { label: "Batches", to: "/admin/batches", icon: Mountain },
  { label: "Bookings", to: "/admin/bookings", icon: BookOpen },
  { label: "Queries", to: "/admin/queries", icon: MessageSquare },
  { label: "Yatras", to: "/admin/yatras", icon: Mountain },
  { label: "Blog", to: "/admin/blogs", icon: FileText },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Promo Codes", to: "/admin/promos", icon: Tag },
  { label: "Reviews", to: "/admin/reviews", icon: MessageSquare },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      {/* Sidebar — ew-footer bg */}
      <aside
        className="w-64 flex flex-col shrink-0"
        style={{ background: "var(--ew-footer)" }}
      >
        {/* Logo */}
        <div
          className="p-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2.5">
            <SiteLogo
              link={false}
              priority
              className="shrink-0"
              imgClassName="site-logo__img site-logo__img--admin"
              sizes="88px"
            />
            <div>
              <p className="font-bold text-white text-sm leading-tight">
                Trekora
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {ADMIN_NAV.map(({ label, to, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive
                    ? "var(--ew-orange)"
                    : "rgba(255,255,255,0.65)",
                  background: isActive
                    ? "rgba(232,119,34,0.12)"
                    : "transparent",
                  borderLeft: isActive
                    ? "3px solid var(--ew-orange)"
                    : "3px solid transparent",
                }}
                data-ocid={`admin.nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
              >
                <Icon
                  size={16}
                  style={{
                    color: isActive
                      ? "var(--ew-orange)"
                      : "rgba(255,255,255,0.5)",
                  }}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onClick={() => revokeAdminSession()}
          >
            <LogOut size={15} />
            Sign out & back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header
          className="bg-white border-b px-6 py-3.5 flex items-center justify-between shrink-0"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          <div>
            <h1
              className="text-base font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              Trekora Admin Dashboard
            </h1>
            <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
              Where Every Peak Tells a Story
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
              Admin User
            </span>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "var(--ew-red)" }}
            >
              A
            </div>
          </div>
        </header>

        <AdminScrollOutlet />
      </div>
    </div>
  );
}
