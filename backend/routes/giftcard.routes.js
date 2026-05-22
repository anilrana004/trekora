import { Router } from "express";
import {
  redeemGiftCard,
  validateGiftCard,
} from "../controllers/giftcard.controller.js";
import { asyncHandler } from "../lib/async-handler.js";

const router = Router();

router.post(
  "/validate",
  asyncHandler(async (req, res) => {
    await validateGiftCard(req, res);
  }),
);

router.post(
  "/redeem",
  asyncHandler(async (req, res) => {
    await redeemGiftCard(req, res);
  }),
);

export default router;
