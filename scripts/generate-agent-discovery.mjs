/**
 * Generates agent-discovery assets: .well-known catalog, OpenAPI, auth.md,
 * agent skills index, markdown route map, and MCP server card.
 * Run: node scripts/generate-agent-discovery.mjs
 * Wired into frontend `pnpm build`.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  resolveSitemapSiteOrigin,
  TREKORA_PUBLIC_SITE_ORIGIN,
} from "./lib/public-site-origin.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendRoot = path.join(__dirname, "../src/frontend");
const publicDir = path.join(frontendRoot, "public");
const skillsSourceDir = path.join(__dirname, "agent-discovery/skills");

const siteOrigin = resolveSitemapSiteOrigin(process.env.VITE_SITE_ORIGIN);
const apiOrigin = "https://api.trekora.in";

function sha256Digest(content) {
  const hex = crypto.createHash("sha256").update(content, "utf8").digest("hex");
  return `sha256:${hex}`;
}

function writeFileEnsuringDir(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function buildOpenApi() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Trekora Public API",
      version: "1.0.0",
      description:
        "Public HTTP APIs for Trekora — Himalayan treks, yatras, reviews, gallery, and weather.",
      contact: {
        name: "Trekora",
        url: siteOrigin,
        email: "hello@trekora.in",
      },
    },
    servers: [
      { url: `${siteOrigin}/api`, description: "Same-origin (Vercel)" },
      { url: `${siteOrigin}/api/v1`, description: "Versioned alias" },
      { url: `${apiOrigin}`, description: "Direct Mongo API (Railway)" },
    ],
    paths: {
      "/reviews/{slug}": {
        get: {
          summary: "List approved reviews for a trek or yatra slug",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
            {
              name: "limit",
              in: "query",
              schema: { type: "integer", default: 100, maximum: 100 },
            },
            {
              name: "skip",
              in: "query",
              schema: { type: "integer", default: 0 },
            },
          ],
          responses: {
            "200": { description: "Review list" },
          },
        },
        post: {
          summary: "Submit a new review (moderated)",
          requestBody: { required: true },
          responses: {
            "201": { description: "Review submitted" },
          },
        },
      },
      "/gallery": {
        get: {
          summary: "Trekker photo gallery metadata",
          parameters: [
            { name: "trekSlug", in: "query", schema: { type: "string" } },
            { name: "type", in: "query", schema: { type: "string" } },
            { name: "tag", in: "query", schema: { type: "string" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 120 } },
          ],
          responses: { "200": { description: "Gallery payload" } },
        },
      },
      "/weather": {
        get: {
          summary: "Weather for a trek location (OpenWeather proxy)",
          parameters: [
            { name: "q", in: "query", schema: { type: "string" } },
            { name: "lat", in: "query", schema: { type: "number" } },
            { name: "lon", in: "query", schema: { type: "number" } },
          ],
          responses: { "200": { description: "Current and forecast weather" } },
        },
      },
      "/product-photos": {
        get: {
          summary: "Product hero and gallery photos",
          responses: { "200": { description: "Photo metadata" } },
        },
      },
      "/query": {
        post: {
          summary: "Plan-a-trek / general inquiry email",
          responses: { "200": { description: "Inquiry accepted" } },
        },
      },
      "/callback": {
        post: {
          summary: "Request a phone callback",
          responses: { "200": { description: "Callback request accepted" } },
        },
      },
      "/booking": {
        post: {
          summary: "Booking intent submission",
          responses: { "200": { description: "Booking request accepted" } },
        },
      },
    },
  };
}

function buildApiCatalog() {
  return {
    linkset: [
      {
        anchor: `${siteOrigin}/.well-known/api-catalog`,
        item: [{ href: `${siteOrigin}/api` }, { href: `${apiOrigin}` }],
      },
      {
        anchor: `${siteOrigin}/api`,
        "service-desc": [
          {
            href: `${siteOrigin}/.well-known/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${siteOrigin}/docs/api.md`,
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: `${apiOrigin}/health`,
            type: "application/json",
          },
        ],
      },
      {
        anchor: `${apiOrigin}`,
        "service-desc": [
          {
            href: `${siteOrigin}/.well-known/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${siteOrigin}/docs/api.md`,
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: `${apiOrigin}/health`,
            type: "application/json",
          },
        ],
      },
    ],
  };
}

function buildAuthMd() {
  return `# auth.md

You are an agent. Trekora (${siteOrigin}) supports **agentic registration** for API access: discover → register → use credentials.

## Step 1 — Discover

### 1a. Protected Resource Metadata

\`\`\`http
GET /.well-known/oauth-protected-resource
\`\`\`

Canonical resource: \`${siteOrigin}/api\`

### 1b. Authorization Server metadata (includes \`agent_auth\`)

\`\`\`http
GET /.well-known/oauth-authorization-server
\`\`\`

The \`agent_auth\` block in that document contains:

- \`skill\` — this file (${siteOrigin}/auth.md)
- \`register_uri\` — ${siteOrigin}/oauth/register
- \`identity_endpoint\` — ${siteOrigin}/oauth/agent/identity
- \`claim_endpoint\` — ${siteOrigin}/oauth/agent/identity/claim
- \`identity_types_supported\` — \`["anonymous"]\`
- \`credential_types_supported\` — \`["none"]\`
- \`anonymous.credential_types_supported\` — \`["none"]\`
- \`anonymous.claim_uri\` — ${siteOrigin}/auth.md

## Step 2 — Pick a method

| Method | When to use | Credential |
|--------|-------------|------------|
| \`anonymous\` | Public read/inquiry APIs | \`none\` — no bearer token |
| \`api_key_header\` | Operator moderation only | \`x-admin-secret\` header |

Public endpoints in [OpenAPI](${siteOrigin}/.well-known/openapi.json) require **no registration**. Send requests to \`${siteOrigin}/api\` without an \`Authorization\` header.

Operator routes (e.g. \`GET /api/reviews/pending\`) require \`x-admin-secret\` — provisioned by Trekora staff only (hello@trekora.in).

## Step 3 — Register (anonymous)

For anonymous public API access, no POST is required. Discovery metadata above is sufficient.

Optional registration endpoint (metadata only; passive scans should not POST):

\`\`\`http
POST /oauth/agent/identity
Content-Type: application/json

{ "type": "anonymous" }
\`\`\`

## Discovery links

- [API catalog](${siteOrigin}/.well-known/api-catalog)
- [OpenAPI spec](${siteOrigin}/.well-known/openapi.json)
- [API documentation](${siteOrigin}/docs/api.md)
- [Agent skills index](${siteOrigin}/.well-known/agent-skills/index.json)

## Content negotiation

Send \`Accept: text/markdown\` on HTML page requests for markdown representations.

## Contact

- Website: ${siteOrigin}/contact
- Email: hello@trekora.in
`;
}

function buildOAuthAuthorizationServer() {
  const prm = buildOAuthProtectedResource();
  return {
    resource: prm.resource,
    authorization_servers: prm.authorization_servers,
    scopes_supported: prm.scopes_supported,
    bearer_methods_supported: prm.bearer_methods_supported,
    issuer: siteOrigin,
    authorization_endpoint: `${siteOrigin}/oauth/authorize`,
    token_endpoint: `${siteOrigin}/oauth/token`,
    registration_endpoint: `${siteOrigin}/oauth/register`,
    revocation_endpoint: `${siteOrigin}/oauth/revoke`,
    jwks_uri: `${siteOrigin}/.well-known/jwks.json`,
    grant_types_supported: [
      "none",
      "client_credentials",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ],
    response_types_supported: ["none", "code"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post"],
    code_challenge_methods_supported: ["S256"],
    agent_auth: {
      skill: `${siteOrigin}/auth.md`,
      register_uri: `${siteOrigin}/oauth/register`,
      identity_endpoint: `${siteOrigin}/oauth/agent/identity`,
      claim_endpoint: `${siteOrigin}/oauth/agent/identity/claim`,
      revocation_uri: `${siteOrigin}/oauth/revoke`,
      identity_types_supported: ["anonymous"],
      credential_types_supported: ["none"],
      anonymous: {
        credential_types_supported: ["none"],
        claim_uri: `${siteOrigin}/auth.md`,
      },
      events_supported: [
        "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked",
      ],
    },
  };
}

function buildOAuthProtectedResource() {
  return {
    resource: `${siteOrigin}/api`,
    authorization_servers: [siteOrigin],
    scopes_supported: ["trekora.read", "trekora.write", "trekora.admin"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${siteOrigin}/docs/api.md`,
    resource_signing_alg_values_supported: ["RS256"],
  };
}

function buildJwks() {
  return { keys: [] };
}

function buildApiDocsMd() {
  return `# Trekora API Documentation

Base URL: \`${siteOrigin}/api\` (versioned alias: \`/api/v1\`)

## Reviews

\`\`\`
GET /api/reviews/{slug}?limit=100&skip=0
POST /api/reviews
\`\`\`

Returns approved reviews for a trek or yatra slug. POST submissions are moderated before publication.

## Gallery

\`\`\`
GET /api/gallery?trekSlug={slug}&type=trek&limit=120
\`\`\`

## Weather

\`\`\`
GET /api/weather?q=Manali
GET /api/weather?lat=32.24&lon=77.19
\`\`\`

Server-side OpenWeather proxy — no client API key required.

## Product photos

\`\`\`
GET /api/product-photos
\`\`\`

## Customer inquiries (POST)

| Endpoint | Purpose |
|----------|---------|
| \`POST /api/query\` | Plan-a-trek / general inquiry |
| \`POST /api/callback\` | Callback request |
| \`POST /api/booking\` | Booking intent |

## Health

\`\`\`
GET ${apiOrigin}/health
\`\`\`

Returns \`{ "ok": true, "mongo": ... }\`.

## Discovery

- [API catalog](${siteOrigin}/.well-known/api-catalog)
- [OpenAPI JSON](${siteOrigin}/.well-known/openapi.json)
- [Agent skills index](${siteOrigin}/.well-known/agent-skills/index.json)
`;
}

function buildHomeMarkdown() {
  return `# Trekora — Himalayan Treks & Yatras

${siteOrigin}

Expert-led Himalayan treks and sacred yatras in Uttarakhand, Himachal Pradesh, Kashmir, Ladakh, and across India. Certified guides, fixed departures, book online.

## Explore

- [Himalayan Treks](${siteOrigin}/treks)
- [Sacred Yatras](${siteOrigin}/yatras)
- [Trek & Yatra Packages](${siteOrigin}/packages)
- [Travel Blog](${siteOrigin}/blog)
- [Destinations](${siteOrigin}/destinations)
- [Upcoming Trek Batches](${siteOrigin}/upcoming-batches)
- [Contact](${siteOrigin}/contact)
- [About Trekora](${siteOrigin}/about)

## For agents

- API catalog: ${siteOrigin}/.well-known/api-catalog
- OpenAPI: ${siteOrigin}/.well-known/openapi.json
- Agent skills: ${siteOrigin}/.well-known/agent-skills/index.json
- Auth & access policy: ${siteOrigin}/auth.md

## Contact

- Email: hello@trekora.in
- Website: ${siteOrigin}/contact
`;
}

function buildListingMarkdown(title, path, description) {
  return `# ${title}

${description}

Browse on Trekora: [${title}](${siteOrigin}${path})

## Related

- [Home](${siteOrigin}/)
- [Treks](${siteOrigin}/treks)
- [Yatras](${siteOrigin}/yatras)
- [Packages](${siteOrigin}/packages)
- [API docs](${siteOrigin}/docs/api.md)
`;
}

function buildMcpServerCard() {
  return {
    $schema:
      "https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/schema/server-card.schema.json",
    serverInfo: {
      name: "trekora",
      title: "Trekora Travel Platform",
      version: "1.0.0",
      description:
        "Himalayan treks and sacred yatras — WebMCP browser tools plus REST APIs for reviews, gallery, and weather.",
    },
    transport: {
      type: "web",
      url: siteOrigin,
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
    },
    links: [
      {
        rel: "api-catalog",
        href: `${siteOrigin}/.well-known/api-catalog`,
      },
      {
        rel: "service-desc",
        href: `${siteOrigin}/.well-known/openapi.json`,
      },
      {
        rel: "service-doc",
        href: `${siteOrigin}/docs/api.md`,
      },
    ],
  };
}

function copySkillsAndBuildIndex() {
  const skillsOutDir = path.join(publicDir, ".well-known/agent-skills");
  const skills = [
    {
      name: "trekora-travel",
      type: "skill-md",
      description:
        "Discover Himalayan treks, yatras, and packages on Trekora using public APIs and site structure.",
      sourceDir: "trekora-travel",
    },
    {
      name: "trekora-api",
      type: "skill-md",
      description:
        "Call Trekora public REST APIs — reviews, gallery, weather, and inquiry endpoints.",
      sourceDir: "trekora-api",
    },
  ];

  const indexSkills = [];
  for (const skill of skills) {
    const srcPath = path.join(skillsSourceDir, skill.sourceDir, "SKILL.md");
    const content = fs.readFileSync(srcPath, "utf8");
    const destPath = path.join(skillsOutDir, skill.sourceDir, "SKILL.md");
    writeFileEnsuringDir(destPath, content);
    indexSkills.push({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: `${siteOrigin}/.well-known/agent-skills/${skill.sourceDir}/SKILL.md`,
      digest: sha256Digest(content),
    });
  }

  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: indexSkills,
  };
}

function main() {
  if (siteOrigin !== TREKORA_PUBLIC_SITE_ORIGIN && !process.env.VITE_SITE_ORIGIN) {
    console.log(`[agent-discovery] Using origin ${siteOrigin}`);
  }

  const openapi = buildOpenApi();
  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/openapi.json"),
    `${JSON.stringify(openapi, null, 2)}\n`,
  );

  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/api-catalog"),
    `${JSON.stringify(buildApiCatalog(), null, 2)}\n`,
  );

  writeFileEnsuringDir(path.join(publicDir, "auth.md"), buildAuthMd());
  writeFileEnsuringDir(path.join(publicDir, "docs/api.md"), buildApiDocsMd());

  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/oauth-authorization-server"),
    `${JSON.stringify(buildOAuthAuthorizationServer(), null, 2)}\n`,
  );

  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/oauth-protected-resource"),
    `${JSON.stringify(buildOAuthProtectedResource(), null, 2)}\n`,
  );

  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/jwks.json"),
    `${JSON.stringify(buildJwks(), null, 2)}\n`,
  );

  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/mcp/server-card.json"),
    `${JSON.stringify(buildMcpServerCard(), null, 2)}\n`,
  );

  const skillsIndex = copySkillsAndBuildIndex();
  writeFileEnsuringDir(
    path.join(publicDir, ".well-known/agent-skills/index.json"),
    `${JSON.stringify(skillsIndex, null, 2)}\n`,
  );

  const markdownRoutes = {
    "/": buildHomeMarkdown(),
    "/treks": buildListingMarkdown(
      "Himalayan Treks",
      "/treks",
      "Browse guided Himalayan treks — Kedarkantha, Hampta Pass, Valley of Flowers, and more.",
    ),
    "/yatras": buildListingMarkdown(
      "Sacred Yatras",
      "/yatras",
      "Char Dham, Do Dham, Kedarnath, Badrinath, and other sacred pilgrimage packages.",
    ),
    "/packages": buildListingMarkdown(
      "Trek & Yatra Packages",
      "/packages",
      "Curated multi-day trek and yatra packages with fixed departures.",
    ),
    "/blog": buildListingMarkdown(
      "Travel Blog",
      "/blog",
      "Trek preparation guides, destination stories, and seasonal advice.",
    ),
    "/contact": buildListingMarkdown(
      "Contact Trekora",
      "/contact",
      "Reach Trekora for trek planning, custom groups, and corporate outings.",
    ),
    "/about": buildListingMarkdown(
      "About Trekora",
      "/about",
      "Trekora is a Himalayan travel agency based in Dehradun, Uttarakhand.",
    ),
  };

  const apiGenDir = path.join(frontendRoot, "api/_generated");
  fs.mkdirSync(apiGenDir, { recursive: true });
  fs.writeFileSync(
    path.join(apiGenDir, "agent-markdown-routes.json"),
    JSON.stringify(markdownRoutes),
    "utf8",
  );

  console.log(
    `[agent-discovery] Wrote catalog, OpenAPI, auth.md, skills (${skillsIndex.skills.length}), MCP card (${siteOrigin})`,
  );
}

main();
