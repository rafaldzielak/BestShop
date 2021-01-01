import express from "express";
import { getOrder, placeOrder, payForOrderViaPaypal, getAllOrders } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminMiddleware.js";
const router = express.Router();

router.route("/").post(protect, placeOrder);
// router.route("/:id/pay/paypal").post(protect, createStripeOrder);
router.route("/:id/pay/paypal").put(protect, payForOrderViaPaypal);
router.route("/:id").get(protect, getOrder);
router.route("/").get(protect, adminProtect, getAllOrders);

export default router;
