import { Router } from "express";
import { getGalleryLogic } from "../controllers/gallery.controller.js";
import { asyncHandler } from "../lib/async-handler.js";
import { cacheGetOrSet, galleryCacheKey } from "../lib/cache/index.js";
import { parsePositiveInt } from "../lib/http-security.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const trekSlug = req.query.trekSlug ?? req.query.slug ?? "";
    const type = req.query.type ?? "";
    const tag = req.query.tag ?? req.query.filter ?? "";
    const includeCloudinary = req.query.includeCloudinary !== "0";
    const limit = parsePositiveInt(req.query.limit, 120, 200);
    const cacheKey = galleryCacheKey({ trekSlug, type, tag, limit });
    const result = await cacheGetOrSet(
      cacheKey,
      () =>
        getGalleryLogic({
          trekSlug,
          type,
          tag,
          limit,
          includeCloudinaryFolders:
            includeCloudinary && Boolean(trekSlug && type),
        }),
      { ttlSeconds: 90 },
    );
    res.status(result.success ? 200 : 503).json(result);
  }),
);

export default router;
