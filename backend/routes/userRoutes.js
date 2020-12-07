import express from "express";
import { authUser, registerUser, updateProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.put("/profile", protect, updateProfile);

export default router;
