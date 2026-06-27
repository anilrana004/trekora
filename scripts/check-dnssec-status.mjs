/**
 * Check Cloudflare DNSSEC status and print DS record for the registrar.
 *
 * Requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID.
 * Run: node scripts/check-dnssec-status.mjs
 */
const zoneId = process.env.CLOUDFLARE_ZONE_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;

async function main() {
  if (!zoneId || !token) {
    console.error(
      "Set CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN.\n" +
        "Zone ID: Cloudflare dashboard → trekora.in → Overview.",
    );
    process.exit(1);
  }

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dnssec`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  const json = await res.json();
  if (!json.success) {
    throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  }

  const { status, ds, digest, key_tag, algorithm, digest_type } = json.result;
  console.log(`DNSSEC status: ${status}`);

  if (status === "active") {
    console.log("DNSSEC is active — validating resolvers should return AD=true.");
    return;
  }

  console.log("\nDNSSEC is NOT active yet. Add this DS record at GoDaddy (domain registrar):\n");
  console.log("GoDaddy → trekora.in → DNS → DS Records → Add\n");
  console.log(`  Key Tag:     ${key_tag}`);
  console.log(`  Algorithm:   ${algorithm} (ECDSAP256SHA256)`);
  console.log(`  Digest Type: ${digest_type} (SHA-256)`);
  console.log(`  Digest:      ${digest}`);
  console.log(`\nFull DS record:\n  ${ds}`);
  console.log(
    "\nAfter adding, wait 15–60 minutes, then verify:\n" +
      '  curl -s "https://cloudflare-dns.com/dns-query?name=_index._agents.trekora.in&type=HTTPS&do=1" \\\n' +
      '    -H "accept: application/dns-json" | jq ".AD"',
  );
  console.log("\nExpected: true");
}

main().catch((err) => {
  console.error("[dnssec]", err);
  process.exit(1);
});
