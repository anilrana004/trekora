import { Router } from "express";
import {
  approveReviewLogic,
  createReviewLogic,
  deleteReviewLogic,
  getReviewsBySlugLogic,
  listPendingReviewsLogic,
} from "../controllers/review.controller.js";
import { asyncHandler } from "../lib/async-handler.js";
import { isAdminRequest } from "../lib/admin-auth.js";
import { parsePositiveInt } from "../lib/http-security.js";
import {
  apiGeneralLimiter,
  apiWriteLimiter,
} from "../lib/rate-limit.js";
import {
  cacheGetOrSet,
  cacheInvalidatePrefix,
  reviewsCacheKey,
} from "../lib/cache/index.js";

const router = Router();

router.use(apiGeneralLimiter);

router.post(
  "/",
  apiWriteLimiter,
  asyncHandler(async (req, res) => {
    const result = await createReviewLogic(req.body);
    if (result.success && result.review?.trekSlug) {
      cacheInvalidatePrefix(`trekora:v1:reviews:${result.review.trekSlug}`);
    }
    res.status(result.success ? 201 : 400).json(result);
  }),
);

router.get(
  "/pending",
  asyncHandler(async (req, res) => {
    if (!isAdminRequest(req)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await listPendingReviewsLogic();
    res.status(result.success ? 200 : 503).json(result);
  }),
);

router.patch(
  "/:id/approve",
  apiWriteLimiter,
  asyncHandler(async (req, res) => {
    if (!isAdminRequest(req)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await approveReviewLogic(req.params.id);
    if (result.success && result.review?.trekSlug) {
      cacheInvalidatePrefix(`trekora:v1:reviews:${result.review.trekSlug}`);
    }
    res.status(result.success ? 200 : 400).json(result);
  }),
);

router.delete(
  "/:id",
  apiWriteLimiter,
  asyncHandler(async (req, res) => {
    if (!isAdminRequest(req)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await deleteReviewLogic(req.params.id);
    if (result.success && result.trekSlug) {
      cacheInvalidatePrefix(`trekora:v1:reviews:${result.trekSlug}`);
    }
    res.status(result.success ? 200 : 400).json(result);
  }),
);

router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const includePending =
      req.query.pending === "1" && isAdminRequest(req);
    const limit = parsePositiveInt(req.query.limit, 100, 100);
    const skip = parsePositiveInt(req.query.skip, 0, 500);
    const slug = String(req.params.slug ?? "").trim().toLowerCase();

    let result;
    if (includePending) {
      result = await getReviewsBySlugLogic(slug, {
        includePending: true,
        limit,
        skip,
      });
    } else {
      const page = Math.floor(skip / limit) + 1;
      const cacheKey = reviewsCacheKey({ trekSlug: slug, page, limit });
      result = await cacheGetOrSet(
        cacheKey,
        () =>
          getReviewsBySlugLogic(slug, {
            includePending: false,
            limit,
            skip,
          }),
        { ttlSeconds: 45 },
      );
    }
    res.status(result.success ? 200 : 400).json(result);
  }),
);

export default router;
