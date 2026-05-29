import { QueryClientProvider } from "@tanstack/react-query";
import { createAppQueryClient } from "./lib/query-client";
import { InternetIdentityProvider } from "@trekora/icp";
import { Component, type ErrorInfo, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/booking-mobile.css";
import "leaflet/dist/leaflet.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

class RootErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error(error);
    console.error(info.componentStack);
  }

  render() {
    if (this.state.error) {
      const isDev = import.meta.env.DEV;
      return (
        <div
          style={{
            fontFamily: "system-ui, sans-serif",
            padding: 24,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <h1 style={{ color: "#c0001c", fontSize: "1.25rem" }}>
            Trekora could not start the UI
          </h1>
          <p style={{ color: "#444", fontSize: 14 }}>
            {isDev
              ? "Open DevTools (F12) → Console for details."
              : "Please refresh the page or try again later."}
          </p>
          {isDev ? (
            <pre
              style={{
                background: "#f5f5f5",
                padding: 12,
                borderRadius: 8,
                fontSize: 13,
                overflow: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {this.state.error.message}
            </pre>
          ) : null}
        </div>
      );
    }
    return this.props.children;
  }
}

const queryClient = createAppQueryClient();

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error('Missing <div id="root"></div> in index.html');
}

const root = ReactDOM.createRoot(rootEl, {
  onUncaughtError: (error, info) => {
    console.error("Uncaught error while rendering:", error);
    console.error(info.componentStack);
  },
});

root.render(
  <RootErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <App />
      </InternetIdentityProvider>
    </QueryClientProvider>
  </RootErrorBoundary>,
);
