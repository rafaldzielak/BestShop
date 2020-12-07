import express from "express";
import { createProduct, getProduct, getProducts, removeProduct } from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, adminProtect, createProduct);
router.route("/:id").get(getProduct).delete(protect, adminProtect, removeProduct);

export default router;
