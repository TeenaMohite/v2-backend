import express from "express";
import { signup, login, getUserProfile, updateUserProfile } from "../controllers/authController.js"; 
import authMiddleware from "../middleware/authMiddleware.js"; // Ensure you have this middleware

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// ✅ Add Profile Routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

export default router;
