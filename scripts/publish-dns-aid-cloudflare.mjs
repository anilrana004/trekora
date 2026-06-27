/**
 * Publish DNS-AID (DNS for AI Discovery) records to Cloudflare.
 *
 * Requires:
 *   CLOUDFLARE_API_TOKEN — API token with Zone.DNS Edit
 *   CLOUDFLARE_ZONE_ID   — Zone ID for trekora.in
 *
 * Run: node scripts/publish-dns-aid-cloudflare.mjs
 * Dry run: node scripts/publish-dns-aid-cloudflare.mjs --dry-run
 */
import { TREKORA_PUBLIC_SITE_ORIGIN } from "./lib/public-site-origin.mjs";

const siteHost = new URL(TREKORA_PUBLIC_SITE_ORIGIN).hostname;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
const dryRun = process.argv.includes("--dry-run");

const RECORDS = [
  {
    type: "HTTPS",
    name: "_index._agents",
    ttl: 3600,
    data: {
      priority: 1,
      target: siteHost,
      value: 'alpn="h2,h3" port=443',
    },
    comment: "DNS-AID index entrypoint (RFC 9460 ServiceMode HTTPS)",
  },
  {
    type: "TXT",
    name: "_index._agents",
    ttl: 3600,
    content: `api-catalog=${TREKORA_PUBLIC_SITE_ORIGIN}/.well-known/api-catalog`,
    comment: "DNS-AID api-catalog pointer",
  },
];

async function cfRequest(method, path, body) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  }
  return json;
}

async function upsertRecord(record) {
  const list = await cfRequest(
    "GET",
    `/zones/${zoneId}/dns_records?type=${record.type}&name=${encodeURIComponent(`${record.name}.trekora.in`)}`,
  );
  const existing = list.result?.[0];
  const payload =
    record.type === "HTTPS"
      ? {
          type: "HTTPS",
          name: record.name,
          ttl: record.ttl,
          data: record.data,
          comment: record.comment,
        }
      : {
          type: "TXT",
          name: record.name,
          ttl: record.ttl,
          content: record.content,
          comment: record.comment,
        };

  if (dryRun) {
    console.log(`[dry-run] ${existing ? "UPDATE" : "CREATE"} ${record.type} ${record.name}`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  if (existing) {
    await cfRequest("PUT", `/zones/${zoneId}/dns_records/${existing.id}`, payload);
    console.log(`Updated ${record.type} ${record.name} (${existing.id})`);
    return;
  }

  const created = await cfRequest("POST", `/zones/${zoneId}/dns_records`, payload);
  console.log(`Created ${record.type} ${record.name} (${created.result.id})`);
}

async function main() {
  if (!zoneId || !token) {
    console.error(
      "Missing CLOUDFLARE_ZONE_ID or CLOUDFLARE_API_TOKEN.\n" +
        "Create a token at https://dash.cloudflare.com/profile/api-tokens with Zone.DNS Edit.\n" +
        "Zone ID: Cloudflare dashboard → trekora.in → Overview → Zone ID.",
    );
    process.exit(1);
  }

  console.log(`Publishing DNS-AID records for ${siteHost} (zone ${zoneId})`);
  for (const record of RECORDS) {
    await upsertRecord(record);
  }

  try {
    const dnssec = await cfRequest("GET", `/zones/${zoneId}/dnssec`);
    const { status, ds, digest, key_tag } = dnssec.result ?? {};
    console.log(`\nDNSSEC status: ${status ?? "unknown"}`);
    if (status !== "active") {
      console.log(
        "\nDNS-AID scans require DNSSEC validation (AD=true). Add this DS record at GoDaddy:\n" +
          `  Key Tag: ${key_tag}, Algorithm: 13, Digest Type: 2, Digest: ${digest}\n` +
          `  ${ds}\n` +
          "Run: node scripts/check-dnssec-status.mjs for details.",
      );
    }
  } catch (err) {
    console.warn("[dns-aid] Could not read DNSSEC status:", err.message);
  }

  console.log(
    `\nVerify DNS-AID: curl -s "https://cloudflare-dns.com/dns-query?name=_index._agents.trekora.in&type=HTTPS&do=1" -H "accept: application/dns-json"`,
  );
}

main().catch((err) => {
  console.error("[dns-aid]", err);
  process.exit(1);
});
