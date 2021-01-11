import express from "express";
import {
  createReview,
  createProduct,
  getProduct,
  getProducts,
  removeProduct,
  getCategories,
  updateProduct,
  getCategory,
  createCategory,
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import adminProtect from "../middleware/adminMiddleware.js";
import queryResultsMiddleware from "../middleware/queryResultsMiddleware.js";
import productModel from "../models/productModel.js";

const router = express.Router();

router.route("/categories/:id").get(getCategory);
router.route("/categories/").get(getCategories).post(protect, adminProtect, createCategory);
router.route("/:id/order/:orderId/review").put(protect, createReview);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, adminProtect, removeProduct)
  .put(protect, adminProtect, updateProduct);
router
  .route("/")
  .get(queryResultsMiddleware(productModel), getProducts)
  .post(protect, adminProtect, createProduct);

export default router;
