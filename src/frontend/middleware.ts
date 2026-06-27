import { next } from "@vercel/functions";

const STATIC_PREFIXES = ["/api/", "/.well-known/", "/assets/", "/markdown/"];
const STATIC_EXTENSIONS =
  /\.(?:js|css|woff2|webp|png|jpg|jpeg|svg|ico|webmanifest|xml|txt|json|map|md)$/i;

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

  const rewriteUrl = new URL("/api/agent-markdown", url.origin);
  rewriteUrl.searchParams.set("path", url.pathname);
  return next({ rewrite: rewriteUrl });
}

export const config = {
  matcher: ["/((?!api/|\\.well-known/|assets/).*)"],
};
