import express from "express";
import authMiddleware  from "../middleware/authMiddleware.js";
import {
  getAllQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote,
} from "../controllers/quoteController.js";

const router = express.Router();

// Get all quotes
router.get("/", authMiddleware, getAllQuotes);

// Get quote by ID
router.get("/:id", authMiddleware, getQuoteById);

// Create a new quote
router.post("/", authMiddleware, createQuote);

// Update a quote
router.put("/:id", authMiddleware, updateQuote);

// Delete a quote
router.delete("/:id", authMiddleware, deleteQuote);

export default router;
