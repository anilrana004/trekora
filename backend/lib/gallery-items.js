import { galleryTagsForSlug } from "./product-seo-tags.js";
import { ProductPhoto } from "../models/ProductPhoto.model.js";
import { Review } from "../models/Review.model.js";

function normalizeTag(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function matchesTagFilter(entryTags, tagQuery) {
  const q = normalizeTag(tagQuery);
  if (!q) return true;
  const tags = (entryTags ?? []).map(normalizeTag);
  if (tags.some((t) => t.includes(q) || q.includes(t))) return true;
  return q.split(/\s+/).every((word) =>
    tags.some((t) => t.includes(word)),
  );
}

function categoryForType(type) {
  return type === "yatra" ? "Yatras" : "Treks";
}

function productLabel(type) {
  return type === "yatra" ? "Yatra" : "Trek";
}

/** Filter product_photos by upload origin (legacy docs without uploadSource = product-page). */
function productUploadSourceMongoFilter(productUploadSource) {
  if (productUploadSource === "gallery-page") {
    return { uploadSource: "gallery-page" };
  }
  if (productUploadSource === "product-page") {
    return {
      $or: [
        { uploadSource: "product-page" },
        { uploadSource: { $exists: false } },
        { uploadSource: null },
      ],
    };
  }
  return {
    $or: [
      { uploadSource: "gallery-page" },
      { uploadSource: "product-page" },
      { uploadSource: { $exists: false } },
      { uploadSource: null },
    ],
  };
}

function pushItem(items, seen, entry) {
  const src = entry.src;
  if (!src || seen.has(src)) return;
  seen.add(src);
  items.push(entry);
}

/**
 * Community gallery: trekker uploads only (Mongo product_photos + review photos).
 * Does not include official trek/yatra catalog images or Cloudinary folder scans.
 */
export async function buildGalleryItems({
  trekSlug = "",
  type = "",
  tag = "",
  limit = 120,
  includeCloudinaryFolders = false,
  /** gallery-page | product-page | all (default) */
  productUploadSource = "all",
  includeReviews = true,
} = {}) {
  const items = [];
  const seen = new Set();
  const slug = String(trekSlug ?? "").trim().toLowerCase();
  const typeFilter = type === "trek" || type === "yatra" ? type : null;
  const tagQuery = String(tag ?? "").trim();
  const cap = Math.min(Number(limit) || 120, 200);

  const productFilter = {
    approved: true,
    ...productUploadSourceMongoFilter(productUploadSource),
  };
  if (slug) productFilter.trekSlug = slug;
  if (typeFilter) productFilter.type = typeFilter;

  const productDocs = await ProductPhoto.find(productFilter)
    .select(
      "trekSlug trekName type url publicId uploadedBy tags approved createdAt uploadSource",
    )
    .sort({ createdAt: -1 })
    .limit(cap)
    .lean();

  for (const doc of productDocs) {
    const tags =
      Array.isArray(doc.tags) && doc.tags.length > 0
        ? doc.tags
        : galleryTagsForSlug(doc.trekSlug, doc.type);
    const entry = {
      id: `product-${doc._id}`,
      src: doc.url,
      publicId: doc.publicId ?? "",
      title: doc.trekName,
      subtitle: productLabel(doc.type),
      category: categoryForType(doc.type),
      credit: doc.uploadedBy
        ? `Photo by ${doc.uploadedBy}`
        : `${productLabel(doc.type)} gallery`,
      trekSlug: doc.trekSlug,
      trekName: doc.trekName,
      type: doc.type,
      tags,
      source: "product",
      uploadSource: doc.uploadSource ?? "product-page",
      reviewId: "",
      createdAt: doc.createdAt,
    };
    if (!matchesTagFilter(entry.tags, tagQuery)) continue;
    pushItem(items, seen, entry);
  }

  if (!includeReviews) {
    return items
      .filter((entry) => entry.source === "product")
      .slice(0, cap);
  }

  const reviewFilter = {
    approved: true,
    $or: [{ "photoUrls.0": { $exists: true } }, { "photos.0": { $exists: true } }],
  };
  if (slug) reviewFilter.trekSlug = slug;
  if (typeFilter) reviewFilter.type = typeFilter;

  const reviewDocs = await Review.find(reviewFilter)
    .select(
      "trekSlug trekName type userName photoUrls photos tags approved createdAt",
    )
    .sort({ createdAt: -1 })
    .limit(cap)
    .lean();

  for (const doc of reviewDocs) {
    const photoList =
      Array.isArray(doc.photos) && doc.photos.length > 0
        ? doc.photos.map((p) => ({ src: p.url, publicId: p.publicId }))
        : (doc.photoUrls ?? []).map((url) => ({ src: url, publicId: "" }));

    const label = productLabel(doc.type);

    for (let i = 0; i < photoList.length; i++) {
      const { src, publicId } = photoList[i];
      if (!src) continue;
      const tags =
        Array.isArray(doc.tags) && doc.tags.length > 0
          ? doc.tags
          : galleryTagsForSlug(doc.trekSlug, doc.type);
      const entry = {
        id: `review-${doc._id}-${i}`,
        src,
        publicId: publicId ?? "",
        title: doc.trekName,
        subtitle: label,
        category: categoryForType(doc.type),
        credit: `Photo by ${doc.userName}`,
        trekSlug: doc.trekSlug,
        trekName: doc.trekName,
        type: doc.type,
        tags,
        source: "review",
        reviewId: String(doc._id),
        createdAt: doc.createdAt,
      };
      if (!matchesTagFilter(entry.tags, tagQuery)) continue;
      pushItem(items, seen, entry);
    }
  }

  void includeCloudinaryFolders;

  return items
    .filter((entry) => entry.source === "product" || entry.source === "review")
    .slice(0, cap);
}
