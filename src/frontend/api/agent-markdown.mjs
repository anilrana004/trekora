import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routes = JSON.parse(
  readFileSync(join(__dirname, "_generated/agent-markdown-routes.json"), "utf8"),
);

const FALLBACK = `# Trekora

Markdown representation not available for this path.

Visit https://www.trekora.in for the full experience.
`;

function estimateTokens(text) {
  return Math.max(1, Math.ceil(text.length / 4));
}

function wantsMarkdown(acceptHeader) {
  if (!acceptHeader) return false;
  return /\btext\/markdown\b/i.test(acceptHeader);
}

function normalizePath(pagePath) {
  if (!pagePath || pagePath === "/") return "/";
  let path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

/** Serves markdown representations when clients negotiate Accept: text/markdown. */
export default function handler(req, res) {
  if (req.method && req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end();
    return;
  }

  const url = new URL(req.url ?? "/", "http://localhost");
  const lookup = normalizePath(url.searchParams.get("path"));
  const body = routes[lookup] ?? routes["/"] ?? FALLBACK;
  const tokens = estimateTokens(body);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Vary", "Accept");
  res.setHeader("x-markdown-tokens", String(tokens));

  if (req.method === "HEAD") {
    res.setHeader("Content-Length", Buffer.byteLength(body, "utf8"));
    res.end();
    return;
  }

  res.end(body);
}

export { wantsMarkdown };
