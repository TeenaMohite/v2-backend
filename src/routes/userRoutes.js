import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createQuote, getUserQuotes } from "../controllers/quoteController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.post("/quotes", authMiddleware, createQuote);
router.get("/quotes", authMiddleware, getUserQuotes);

export default router;
