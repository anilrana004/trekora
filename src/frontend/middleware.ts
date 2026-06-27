import { next } from "@vercel/functions";
import routes from "./api/_generated/agent-markdown-routes.json";

type MarkdownRoutes = Record<string, string>;

const MARKDOWN_ROUTES = routes as MarkdownRoutes;

const STATIC_PREFIXES = ["/api/", "/.well-known/", "/assets/"];
const STATIC_EXTENSIONS =
  /\.(?:js|css|woff2|webp|png|jpg|jpeg|svg|ico|webmanifest|xml|txt|json|map|md)$/i;

const FALLBACK = `# Trekora

Visit https://www.trekora.in for the full experience.
`;

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const trimmed =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function estimateTokens(text: string): string {
  return String(Math.max(1, Math.ceil(text.length / 4)));
}

function shouldNegotiateMarkdown(pathname: string): boolean {
  if (STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return false;
  }
  if (STATIC_EXTENSIONS.test(pathname)) {
    return false;
  }
  return true;
}

export default function middleware(request: Request) {
  const accept = request.headers.get("accept") ?? "";
  if (!/\btext\/markdown\b/i.test(accept)) {
    return next();
  }

  const url = new URL(request.url);
  if (!shouldNegotiateMarkdown(url.pathname)) {
    return next();
  }

  const lookup = normalizePath(url.pathname);
  const body = MARKDOWN_ROUTES[lookup] ?? MARKDOWN_ROUTES["/"] ?? FALLBACK;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "x-markdown-tokens": estimateTokens(body),
      "Cache-Control": "public, max-age=300",
    },
  });
}

export const config = {
  matcher: ["/((?!api/|\\.well-known/|assets/).*)"],
};
