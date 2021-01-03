import express from "express";
import {
  createReview,
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  getCategories,
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminMiddleware.js";

const router = express.Router();

router.route("/categories").get(getCategories);
router.route("/:id/order/:orderId/review").put(protect, createReview);
router.route("/:id").get(getProduct).delete(protect, adminProtect, removeProduct);
router.route("/").get(getProducts).post(protect, adminProtect, createProduct);

export default router;
