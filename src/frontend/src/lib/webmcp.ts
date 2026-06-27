import { TREKS } from "@/data/treks";
import { YATRAS } from "@/data/yatras";

type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown>;
};

type ModelContext = {
  registerTool: (tool: WebMcpTool) => () => void;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

function normalizeQuery(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function filterTreks(query: string, region?: string, limit = 10) {
  const regionNorm = normalizeQuery(region);
  return TREKS.filter((trek) => {
    const haystack =
      `${trek.name} ${trek.region ?? trek.state} ${trek.slug} ${trek.difficulty}`.toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (regionNorm && !haystack.includes(regionNorm)) return false;
    return true;
  })
    .slice(0, Math.min(Math.max(limit, 1), 25))
    .map((trek) => ({
      slug: trek.slug,
      name: trek.name,
      region: trek.region ?? trek.state,
      difficulty: trek.difficulty,
      duration: trek.duration,
      price: trek.price,
      url: `/treks/${trek.slug}`,
    }));
}

function filterYatras(query: string, limit = 10) {
  return YATRAS.filter((yatra) => {
    const haystack = `${yatra.name} ${yatra.slug} ${yatra.state}`.toLowerCase();
    return !query || haystack.includes(query);
  })
    .slice(0, Math.min(Math.max(limit, 1), 25))
    .map((yatra) => ({
      slug: yatra.slug,
      name: yatra.name,
      region: yatra.state,
      duration: yatra.duration,
      price: yatra.price,
      url: `/yatras/${yatra.slug}`,
    }));
}

const TOOLS: WebMcpTool[] = [
  {
    name: "search-treks",
    description:
      "Search Himalayan treks on Trekora by keyword and optional region filter.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term (name, region, slug)" },
        region: { type: "string", description: "Filter by region, e.g. Uttarakhand" },
        limit: { type: "integer", minimum: 1, maximum: 25, default: 10 },
      },
    },
    execute: async (input) =>
      filterTreks(
        normalizeQuery(input.query),
        typeof input.region === "string" ? input.region : undefined,
        typeof input.limit === "number" ? input.limit : 10,
      ),
  },
  {
    name: "search-yatras",
    description: "Search sacred yatra pilgrimage packages on Trekora.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search term (name, region, slug)" },
        limit: { type: "integer", minimum: 1, maximum: 25, default: 10 },
      },
    },
    execute: async (input) =>
      filterYatras(
        normalizeQuery(input.query),
        typeof input.limit === "number" ? input.limit : 10,
      ),
  },
  {
    name: "get-trek",
    description: "Get details for a single trek by slug.",
    inputSchema: {
      type: "object",
      required: ["slug"],
      properties: {
        slug: { type: "string", description: "Trek slug, e.g. kedarkantha-trek" },
      },
    },
    execute: async (input) => {
      const slug = normalizeQuery(input.slug);
      const trek = TREKS.find((item) => item.slug === slug);
      if (!trek) return { found: false, slug };
      return {
        found: true,
        slug: trek.slug,
        name: trek.name,
        region: trek.region ?? trek.state,
        difficulty: trek.difficulty,
        duration: trek.duration,
        price: trek.price,
        maxAltitude: trek.altitude,
        url: `/treks/${trek.slug}`,
      };
    },
  },
  {
    name: "navigate",
    description: "Navigate the browser to a Trekora page path.",
    inputSchema: {
      type: "object",
      required: ["path"],
      properties: {
        path: {
          type: "string",
          description: "Site-relative path, e.g. /treks or /yatras/char-dham-yatra",
        },
      },
    },
    execute: async (input) => {
      const raw = typeof input.path === "string" ? input.path.trim() : "";
      if (!raw.startsWith("/")) {
        throw new Error("path must start with /");
      }
      window.location.assign(raw);
      return { navigated: true, path: raw };
    },
  },
];

/** Register Trekora WebMCP tools when the browser API is available. */
export function initWebMcp(): () => void {
  const modelContext = navigator.modelContext;
  if (!modelContext?.registerTool) return () => {};

  const unregister = TOOLS.map((tool) => modelContext.registerTool(tool));
  return () => {
    for (const dispose of unregister) {
      try {
        dispose();
      } catch {
        /* tool may already be unregistered */
      }
    }
  };
}
