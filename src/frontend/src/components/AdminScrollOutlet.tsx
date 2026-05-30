import { useRouteScrollManager } from "@/hooks/useRouteScrollManager";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

/** Admin panel scroll container — same back/forward rules as public layout. */
export default function AdminScrollOutlet() {
  const [scrollRoot, setScrollRoot] = useState<HTMLElement | null>(null);
  useRouteScrollManager({ scrollRoot });

  return (
    <main
      ref={setScrollRoot}
      id="admin-scroll-root"
      className="flex-1 overflow-y-auto p-6 overscroll-y-contain"
    >
      <Outlet />
    </main>
  );
}
