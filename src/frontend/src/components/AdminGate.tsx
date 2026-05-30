import {
  getAdminSecret,
  grantAdminSession,
  hasAdminSession,
  isAdminUiEnabled,
} from "@/lib/admin-access";
import { Navigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import AdminLayout from "./AdminLayout";

export default function AdminGate() {
  const enabled = isAdminUiEnabled();
  const secretConfigured = getAdminSecret().length > 0;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authed, setAuthed] = useState(() => hasAdminSession());

  if (!enabled) {
    return <Navigate to="/" replace />;
  }

  if (!secretConfigured) {
    return (
      <AdminShell
        title="Admin panel not configured"
        body="Admin access is disabled. Configure credentials in your secure deployment environment."
      />
    );
  }

  if (!authed) {
    return (
      <AdminShell
        title="Admin sign-in"
        body="Enter the admin secret configured for this deployment."
      >
        <form
          className="mt-6 flex w-full max-w-sm flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (grantAdminSession(password.trim())) {
              setError("");
              setAuthed(true);
              return;
            }
            setError("Invalid admin secret.");
          }}
        >
          <label className="sr-only" htmlFor="admin-secret">
            Admin secret
          </label>
          <input
            id="admin-secret"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin secret"
            className="w-full rounded-lg border px-4 py-2.5 text-sm"
            style={{
              borderColor: "var(--ew-gray-mid)",
              color: "var(--ew-text)",
            }}
          />
          {error ? (
            <p className="text-sm" style={{ color: "var(--ew-red)" }}>
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
            style={{ background: "var(--ew-red)" }}
          >
            Unlock admin
          </button>
        </form>
      </AdminShell>
    );
  }

  return <AdminLayout />;
}

function AdminShell({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ background: "var(--ew-gray-lt)" }}
    >
      <div className="flex w-full max-w-lg flex-col items-center rounded-2xl bg-white p-8 shadow-lg">
        <Lock size={40} style={{ color: "var(--ew-red)" }} />
        <h1
          className="mt-4 text-xl font-bold"
          style={{ color: "var(--ew-text)" }}
        >
          {title}
        </h1>
        <p
          className="mt-2 max-w-md text-center text-sm"
          style={{ color: "var(--ew-gray-dark)" }}
        >
          {body}
        </p>
        {children}
      </div>
    </div>
  );
}
