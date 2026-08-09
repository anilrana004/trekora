import { Router } from "express";
import blogApiHandler from "../controllers/blog.controller.js";

const router = Router();

router.use((req, res) => {
  const suffix = req.url === "/" ? "" : req.url;
  req.url = `/api/blogs${suffix.startsWith("?") ? `/${suffix}` : suffix.startsWith("/") ? suffix : `/${suffix}`}`;
  return blogApiHandler(req, res);
});

export default router;
