import { Router } from "express";
import {
  createProductPhotosLogic,
  getProductPhotosBySlugLogic,
} from "../controllers/product-photo.controller.js";
import { asyncHandler } from "../lib/async-handler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const result = await getProductPhotosBySlugLogic(
      req.query.trekSlug ?? req.query.slug,
      req.query.type,
    );
    res.status(result.success ? 200 : 400).json(result);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const result = await createProductPhotosLogic(req.body);
    res.status(result.success ? 201 : 400).json(result);
  }),
);

export default router;
