import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(protect, placeOrder);

export default router;
