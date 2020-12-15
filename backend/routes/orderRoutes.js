import express from "express";
import { getOrder, placeOrder, payForOrderViaPaypal } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, placeOrder);
// router.route("/:id/pay/paypal").post(protect, createStripeOrder);
router.route("/:id/pay/paypal").put(protect, payForOrderViaPaypal);
router.route("/:id").get(protect, getOrder);

export default router;
