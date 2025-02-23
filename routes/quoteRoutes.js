import express from "express";
import {
  createQuote,
  getAllQuotes,
  updateQuoteStatus,
} from "../controllers/quoteController.js";

const router = express.Router();

// Create a new quote
router.post("/create", createQuote);

// Get all quotes
router.get("/getall", getAllQuotes);

// Update quote status
router.put("/quotes/:id/status", updateQuoteStatus);

export default router;