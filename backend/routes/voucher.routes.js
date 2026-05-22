import { Router } from "express";
import {
  markVoucherUsed,
  validateVoucher,
} from "../controllers/voucher.controller.js";
import { asyncHandler } from "../lib/async-handler.js";

const router = Router();

router.post(
  "/validate",
  asyncHandler(async (req, res) => {
    await validateVoucher(req, res);
  }),
);

router.post(
  "/mark-used",
  asyncHandler(async (req, res) => {
    await markVoucherUsed(req, res);
  }),
);

export default router;
