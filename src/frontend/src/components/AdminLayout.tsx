import type { ComponentType, CSSProperties } from "react";
import { SiteLogo } from "@/components/SiteLogo";
import { revokeAdminSession } from "@/lib/admin-access";
import { Link, useLocation } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  FilePlus2,
  FileText,
  FolderOpen,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Mountain,
  Settings,
  Tags,
  Tag,
  Users,
} from "lucide-react";
import AdminScrollOutlet from "./AdminScrollOutlet";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Treks Manager", to: "/admin/treks", icon: MapPin },
  { label: "Batches", to: "/admin/batches", icon: Mountain },
  { label: "Bookings", to: "/admin/bookings", icon: BookOpen },
  { label: "Queries", to: "/admin/queries", icon: MessageSquare },
  { label: "Yatras", to: "/admin/yatras", icon: Mountain },
  { label: "All Articles", to: "/admin/blogs", icon: FileText, exact: true },
  { label: "Create Article", to: "/admin/blogs/new", icon: FilePlus2 },
  { label: "Categories", to: "/admin/blogs/categories", icon: FolderOpen },
  { label: "Tags", to: "/admin/blogs/tags", icon: Tags },
  { label: "Media Library", to: "/admin/blogs/media", icon: ImageIcon },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Promo Codes", to: "/admin/promos", icon: Tag },
  { label: "Reviews", to: "/admin/reviews", icon: MessageSquare },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function isActivePath(pathname: string, to: string, exact?: boolean) {
  if (exact) return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: "#0f1219" }}
      data-ocid="admin.shell"
    >
      <aside
        className="w-64 flex flex-col shrink-0 border-r"
        style={{
          background: "#12161f",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="admin-sidebar-brand shrink-0 border-b px-4 py-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <SiteLogo
            link={false}
            priority
            className="admin-sidebar-brand__logo"
            imgClassName="site-logo__img site-logo__img--admin"
            sizes="132px"
          />
          <p
            className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Admin Console
          </p>
        </div>

        <nav className="flex-1 min-h-0 p-3 space-y-0.5 overflow-y-auto">
          <p
            className="px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Content
          </p>
          {ADMIN_NAV.slice(0, 6).map(({ label, to, icon: Icon, exact }) => {
            const isActive = isActivePath(location.pathname, to, exact);
            return (
              <AdminNavLink
                key={to}
                to={to}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            );
          })}
          <p
            className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Blog CMS
          </p>
          {ADMIN_NAV.slice(6, 11).map(({ label, to, icon: Icon, exact }) => {
            const isActive = isActivePath(location.pathname, to, exact);
            return (
              <AdminNavLink
                key={to}
                to={to}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            );
          })}
          <p
            className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Operations
          </p>
          {ADMIN_NAV.slice(11).map(({ label, to, icon: Icon, exact }) => {
            const isActive = isActivePath(location.pathname, to, exact);
            return (
              <AdminNavLink
                key={to}
                to={to}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            );
          })}
        </nav>

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

      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#f3f4f6" }}>
        <header
          className="bg-white border-b px-6 py-3.5 flex items-center justify-between shrink-0"
          style={{ borderColor: "var(--ew-gray-mid)" }}
        >
          <div>
            <h1
              className="text-base font-bold"
              style={{ color: "var(--ew-text)" }}
            >
              Trekora Admin
            </h1>
            <p className="text-xs" style={{ color: "var(--ew-gray-dark)" }}>
              Separate from the storefront — manage treks, blogs &amp; ops
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "var(--ew-gray-dark)" }}>
              Admin
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

function AdminNavLink({
  to,
  label,
  Icon,
  isActive,
}: {
  to: string;
  label: string;
  Icon: ComponentType<{ size?: number; style?: CSSProperties }>;
  isActive: boolean;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
      style={{
        color: isActive ? "var(--ew-orange)" : "rgba(255,255,255,0.65)",
        background: isActive ? "rgba(232,119,34,0.12)" : "transparent",
        borderLeft: isActive
          ? "3px solid var(--ew-orange)"
          : "3px solid transparent",
      }}
      data-ocid={`admin.nav.${label.toLowerCase().replace(/\s+/g, "_")}.link`}
    >
      <Icon
        size={16}
        style={{
          color: isActive ? "var(--ew-orange)" : "rgba(255,255,255,0.5)",
        }}
      />
      {label}
    </Link>
  );
}
