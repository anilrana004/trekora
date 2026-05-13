import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `ErrorBoundary caught in ${this.props.section || "unknown"}:`,
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            padding: "24px",
            background: "#fff8e1",
            border: "1px solid #ffcc02",
            borderRadius: "8px",
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#c0001c", fontWeight: 600 }}>
            Something went wrong loading this section.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: "8px",
              padding: "8px 16px",
              background: "#e87722",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
