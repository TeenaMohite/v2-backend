import express from "express";
import { signup, login, getUserProfile, updateUserProfile } from "../controllers/authController.js"
// import authMiddleware from "../middleware/authMiddleware.js";
import { createQuote, getUserQuotes } from "../controllers/quoteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// User Authentication
router.post("/signup", signup);
router.post("/login", login);

// User Profile
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);

// Quotes
router.post("/quotes", authMiddleware, createQuote);
router.get("/quotes", authMiddleware, getUserQuotes);

export default router;
