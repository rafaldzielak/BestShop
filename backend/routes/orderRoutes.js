import express from "express";
import { getOrder, placeOrder } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, placeOrder);
router.route("/:id").get(protect, getOrder);

export default router;
