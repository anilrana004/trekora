import { connectDBSafe } from "../db/connect.js";
import { productCloudinaryFolder } from "../lib/cloudinary-admin.js";
import { buildGalleryItems } from "../lib/gallery-items.js";
import { galleryTagsForSlug } from "../lib/product-seo-tags.js";
import { parseJsonBody } from "../lib/parse-body.js";
import { ProductPhoto } from "../models/ProductPhoto.model.js";

function normalizeSlug(slug) {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function isCloudinaryUrl(url) {
  return (
    typeof url === "string" &&
    /^https?:\/\//i.test(url) &&
    url.includes("cloudinary.com")
  );
}

export async function createProductPhotosLogic(body) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return {
      success: false,
      message: "Photo service is temporarily unavailable",
    };
  }

  const trekSlug = normalizeSlug(body.trekSlug);
  const trekName = String(body.trekName ?? "").trim();
  const type = body.type === "yatra" ? "yatra" : "trek";
  const uploadedBy = String(body.uploadedBy ?? body.userName ?? "Trekora trekker").trim();

  if (!trekSlug || !trekName) {
    return { success: false, message: "Trek/yatra slug and name are required" };
  }

  const folderPath = productCloudinaryFolder(type, trekSlug);
  const rawPhotos = Array.isArray(body.photos) ? body.photos : [];
  const urls = Array.isArray(body.photoUrls) ? body.photoUrls : [];

  const entries = [];
  for (const raw of rawPhotos.slice(0, 8)) {
    const url = String(raw?.url ?? raw?.secureUrl ?? "").trim();
    if (!isCloudinaryUrl(url)) continue;
    entries.push({
      url,
      publicId: String(raw?.publicId ?? "").trim(),
      cloudinaryFolder: String(raw?.cloudinaryFolder ?? folderPath).trim(),
    });
  }
  if (entries.length === 0) {
    for (const url of urls.slice(0, 8)) {
      if (!isCloudinaryUrl(url)) continue;
      entries.push({ url, publicId: "", cloudinaryFolder: folderPath });
    }
  }

  if (entries.length === 0) {
    return { success: false, message: "At least one Cloudinary photo URL is required" };
  }

  const uploadSource =
    body.uploadSource === "gallery-page" ? "gallery-page" : "product-page";

  const seoTags = galleryTagsForSlug(trekSlug, type);
  const bodyTags = Array.isArray(body.tags)
    ? body.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 8)
    : [];
  const tags = [...new Set([...bodyTags, ...seoTags])].slice(0, 12);

  const docs = await ProductPhoto.insertMany(
    entries.map((e) => ({
      trekSlug,
      trekName,
      type,
      url: e.url,
      publicId: e.publicId,
      cloudinaryFolder: e.cloudinaryFolder || folderPath,
      uploadedBy,
      uploadSource,
      tags,
      approved: true,
      createdAt: new Date(),
    })),
  );

  const message =
    uploadSource === "gallery-page"
      ? `Photos saved for ${trekName} and are live in the community gallery.`
      : `Photos saved for ${trekName} and are live on the ${type} page and gallery.`;

  return {
    success: true,
    message,
    count: docs.length,
    trekSlug,
    trekName,
    type,
    photoIds: docs.map((d) => String(d._id)),
  };
}

export async function getProductPhotosBySlugLogic(slug, type) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return {
      success: false,
      message: "Photo service is temporarily unavailable",
    };
  }

  const trekSlug = normalizeSlug(slug);
  if (!trekSlug) {
    return { success: false, message: "Invalid product slug" };
  }

  const productType = type === "yatra" ? "yatra" : type === "trek" ? "trek" : undefined;
  const items = await buildGalleryItems({
    trekSlug,
    type: productType ?? "",
    limit: 80,
    includeCloudinaryFolders: false,
    productUploadSource: "product-page",
    includeReviews: false,
  });

  return {
    success: true,
    trekSlug,
    type: productType,
    count: items.length,
    items,
  };
}

async function handleProductPhotoRoute(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST") {
    try {
      const body = await parseJsonBody(req);
      const result = await createProductPhotosLogic(body);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (err) {
      process.stderr.write(
        `[product-photos] POST ${err instanceof Error ? err.message : String(err)}\n`,
      );
      return res.status(503).json({
        success: false,
        message: "Could not save photos",
      });
    }
  }

  if (req.method === "GET") {
    const raw = req.url ?? "/api/product-photos";
    const q = raw.indexOf("?");
    const search = q >= 0 ? raw.slice(q + 1) : "";
    const params = new URLSearchParams(search);
    const trekSlug = params.get("trekSlug") ?? params.get("slug") ?? "";
    const type = params.get("type") ?? "";

    try {
      const result = await getProductPhotosBySlugLogic(trekSlug, type);
      return res.status(result.success ? 200 : 400).json(result);
    } catch (err) {
      process.stderr.write(
        `[product-photos] GET ${err instanceof Error ? err.message : String(err)}\n`,
      );
      return res.status(503).json({
        success: false,
        message: "Could not load photos",
      });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

export default handleProductPhotoRoute;
