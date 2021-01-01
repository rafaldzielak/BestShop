import express from "express";
import {
  authUser,
  getUserOrders,
  registerUser,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";
import adminProtect from "../middleware/adminMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.put("/profile", protect, updateProfile);
router.get("/orders", protect, getUserOrders);
router.get("/users", protect, adminProtect, getAllUsers);

export default router;
