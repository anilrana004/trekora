import mongoose from "mongoose";
import { connectDBSafe } from "../db/connect.js";
import { isAdminRequest } from "../lib/admin-auth.js";
import { parseJsonBody } from "../lib/parse-body.js";
import { defaultReviewTags } from "../lib/product-seo-tags.js";
import {
  normalizeSlug as sanitizeSlug,
  sanitizeTagList,
  sanitizeText,
} from "../lib/http-security.js";
import { Review } from "../models/Review.model.js";

function normalizeSlug(slug) {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function isObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value) &&
    String(new mongoose.Types.ObjectId(value)) === value;
}

function isCloudinaryUrl(url) {
  return (
    typeof url === "string" &&
    /^https?:\/\//i.test(url) &&
    (url.includes("res.cloudinary.com") || url.includes("cloudinary.com"))
  );
}

function normalizePhotos(body) {
  const fromPhotos = Array.isArray(body.photos) ? body.photos : [];
  const normalized = [];

  for (const raw of fromPhotos.slice(0, 5)) {
    const url = String(raw?.url ?? raw?.secureUrl ?? "").trim();
    if (!isCloudinaryUrl(url)) continue;
    normalized.push({
      url,
      publicId: String(raw?.publicId ?? "").trim(),
      cloudinaryFolder: String(raw?.cloudinaryFolder ?? "").trim(),
      width: Number(raw?.width) || undefined,
      height: Number(raw?.height) || undefined,
    });
  }

  if (normalized.length > 0) return normalized;

  const urls = Array.isArray(body.photoUrls) ? body.photoUrls : [];
  return urls
    .filter((u) => isCloudinaryUrl(u))
    .slice(0, 5)
    .map((url) => ({ url, publicId: "", cloudinaryFolder: "" }));
}

function serializeReview(doc) {
  const photos = doc.photos ?? [];
  const photoUrls =
    photos.length > 0
      ? photos.map((p) => p.url).filter(Boolean)
      : (doc.photoUrls ?? []);

  return {
    id: String(doc._id),
    trekSlug: doc.trekSlug,
    trekName: doc.trekName,
    type: doc.type,
    userName: doc.userName,
    rating: doc.rating,
    reviewText: doc.reviewText,
    photoUrls,
    photos,
    tags: doc.tags ?? [],
    approved: doc.approved,
    createdAt: doc.createdAt,
  };
}

export async function createReviewLogic(body) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Review service is temporarily unavailable" };
  }

  const trekSlug = sanitizeSlug(body.trekSlug) || normalizeSlug(body.trekSlug);
  const trekName = sanitizeText(body.trekName, 120);
  const type = body.type === "yatra" ? "yatra" : "trek";
  const userName = sanitizeText(body.userName, 80);
  const rating = Number(body.rating);
  const reviewText = sanitizeText(body.reviewText, 4000);
  const photos = normalizePhotos(body);
  const photoUrls = photos.map((p) => p.url);
  const bodyTags = sanitizeTagList(body.tags, 8);
  const tags = [...new Set([...bodyTags, ...defaultReviewTags(trekSlug, type)])].slice(
    0,
    8,
  );

  if (!trekSlug || !trekName) {
    return { success: false, message: "Product slug and name are required" };
  }
  if (!userName) {
    return { success: false, message: "Your name is required" };
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { success: false, message: "Rating must be between 1 and 5" };
  }
  if (reviewText.length < 20) {
    return { success: false, message: "Review must be at least 20 characters" };
  }

  const doc = await Review.create({
    trekSlug,
    trekName,
    type,
    userName,
    rating,
    reviewText,
    photoUrls,
    photos,
    tags,
    approved: true,
    createdAt: new Date(),
  });

  const review = serializeReview(doc);

  return {
    success: true,
    message: "Thank you! Your review and photos are now live on this page and in our gallery.",
    review: { ...review, approved: true },
  };
}

export async function getReviewsBySlugLogic(
  slug,
  { includePending = false, limit: limitRaw, skip: skipRaw } = {},
) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Review service is temporarily unavailable" };
  }

  const trekSlug = normalizeSlug(slug);
  if (!trekSlug) {
    return { success: false, message: "Invalid product slug" };
  }

  const filter = { trekSlug };
  if (!includePending) filter.approved = true;

  const limit = Math.min(
    100,
    Math.max(1, Number.isFinite(Number(limitRaw)) ? Number(limitRaw) : 100),
  );
  const skip = Math.max(
    0,
    Number.isFinite(Number(skipRaw)) ? Number(skipRaw) : 0,
  );

  const [docs, total, ratingBuckets] = await Promise.all([
    Review.find(filter)
      .select(
        "trekSlug trekName type userName rating reviewText photoUrls photos tags approved createdAt",
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Review.countDocuments(filter),
    Review.aggregate([
      { $match: filter },
      { $group: { _id: "$rating", c: { $sum: 1 } } },
    ]),
  ]);

  const reviews = docs.map(serializeReview);
  const count = total;
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let ratingSum = 0;
  for (const row of ratingBuckets) {
    const star = Number(row._id);
    const c = Number(row.c) || 0;
    if (star >= 1 && star <= 5) {
      distribution[star] = c;
      ratingSum += star * c;
    }
  }
  const avgRating =
    count > 0 ? Math.round((ratingSum / count) * 10) / 10 : 0;

  return {
    success: true,
    trekSlug,
    count,
    avgRating,
    distribution,
    reviews,
    limit,
    skip,
    hasMore: skip + reviews.length < total,
  };
}

export async function listPendingReviewsLogic() {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Review service is temporarily unavailable" };
  }
  const docs = await Review.find({ approved: false })
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return {
    success: true,
    reviews: docs.map(serializeReview),
  };
}

export async function approveReviewLogic(id) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Review service is temporarily unavailable" };
  }
  if (!isObjectId(id)) {
    return { success: false, message: "Invalid review id" };
  }
  const doc = await Review.findByIdAndUpdate(
    id,
    { $set: { approved: true } },
    { new: true },
  );
  if (!doc) return { success: false, message: "Review not found" };
  return { success: true, review: serializeReview(doc) };
}

export async function deleteReviewLogic(id) {
  const ping = await connectDBSafe();
  if (!ping.ok) {
    return { success: false, message: "Review service is temporarily unavailable" };
  }
  if (!isObjectId(id)) {
    return { success: false, message: "Invalid review id" };
  }
  const doc = await Review.findById(id).select("trekSlug").lean();
  if (!doc) return { success: false, message: "Review not found" };
  await Review.findByIdAndDelete(id);
  return {
    success: true,
    message: "Review deleted",
    trekSlug: doc.trekSlug,
  };
}

async function handleReviewRoute(req, res) {
  res.setHeader("Content-Type", "application/json");
  const url = (req.url ?? "").split("?")[0];
  const method = req.method ?? "GET";
  const query = new URL(url, "http://local").searchParams;

  try {
    if (url === "/api/reviews" && method === "POST") {
      const body = await parseJsonBody(req);
      const result = await createReviewLogic(body);
      return res.status(result.success ? 201 : 400).json(result);
    }

    if (url === "/api/reviews/pending" && method === "GET") {
      if (!isAdminRequest(req)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const result = await listPendingReviewsLogic();
      return res.status(result.success ? 200 : 503).json(result);
    }

    const approveMatch = url.match(/^\/api\/reviews\/([a-f0-9]{24})\/approve$/i);
    if (approveMatch && method === "PATCH") {
      if (!isAdminRequest(req)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const result = await approveReviewLogic(approveMatch[1]);
      return res.status(result.success ? 200 : 400).json(result);
    }

    const deleteMatch = url.match(/^\/api\/reviews\/([a-f0-9]{24})$/i);
    if (deleteMatch && method === "DELETE") {
      if (!isAdminRequest(req)) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      const result = await deleteReviewLogic(deleteMatch[1]);
      return res.status(result.success ? 200 : 400).json(result);
    }

    const slugMatch = url.match(/^\/api\/reviews\/([^/]+)$/);
    if (slugMatch && method === "GET") {
      const slug = slugMatch[1];
      if (isObjectId(slug)) {
        return res.status(400).json({ success: false, message: "Use trek slug, not id" });
      }
      const includePending =
        query.get("pending") === "1" && isAdminRequest(req);
      const limit = query.get("limit");
      const skip = query.get("skip");
      const result = await getReviewsBySlugLogic(slug, {
        includePending,
        limit: limit != null ? Number(limit) : undefined,
        skip: skip != null ? Number(skip) : undefined,
      });
      return res.status(result.success ? 200 : 400).json(result);
    }

    return res.status(404).json({ success: false, message: "Not found" });
  } catch (err) {
    process.stderr.write(
      `[reviews] ${err instanceof Error ? err.message : String(err)}\n`,
    );
    return res.status(503).json({
      success: false,
      message: "Review service is temporarily unavailable",
    });
  }
}

export default handleReviewRoute;
