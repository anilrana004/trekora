import { connectDBSafe } from "../db/connect.js";
import { buildGalleryItems } from "../lib/gallery-items.js";

export async function getGalleryLogic({
  trekSlug,
  type,
  tag = "",
  limit = 120,
  includeCloudinaryFolders = false,
  productUploadSource = "all",
  includeReviews = true,
} = {}) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Gallery service is temporarily unavailable" };
  }

  const slug = String(trekSlug ?? "").trim().toLowerCase();
  const typeFilter = type === "trek" || type === "yatra" ? type : "";

  const items = await buildGalleryItems({
    trekSlug: slug,
    type: typeFilter,
    tag,
    limit,
    includeCloudinaryFolders,
    productUploadSource,
    includeReviews,
  });

  return { success: true, count: items.length, items };
}

async function handleGalleryRoute(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const raw = req.url ?? "/api/gallery";
  const q = raw.indexOf("?");
  const search = q >= 0 ? raw.slice(q + 1) : "";
  const params = new URLSearchParams(search);
  const trekSlug = params.get("trekSlug") ?? params.get("slug") ?? "";
  const type = params.get("type") ?? "";
  const tag = params.get("tag") ?? params.get("filter") ?? "";
  const limit = params.get("limit") ?? "120";
  const uploadSourceRaw = params.get("uploadSource") ?? "";
  const productUploadSource =
    uploadSourceRaw === "gallery-page" || uploadSourceRaw === "product-page"
      ? uploadSourceRaw
      : "all";
  const includeReviews = params.get("includeReviews") !== "0";

  try {
    const result = await getGalleryLogic({
      trekSlug,
      type,
      tag,
      limit,
      includeCloudinaryFolders: false,
      productUploadSource,
      includeReviews,
    });
    return res.status(result.success ? 200 : 503).json(result);
  } catch (err) {
    process.stderr.write(
      `[gallery] ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: "Gallery service is temporarily unavailable",
    });
  }
}

export default handleGalleryRoute;
