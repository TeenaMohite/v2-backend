// import Quote from "../models/Quote.js";

import Quote from "../models/Quote.js";

// Get all Quotes (Admin only)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.json(quotes);
  } catch (error) {
    console.error("Get All Quotes Error:", error);
    res.status(500).json({ message: "Error fetching quotes" });
  }
};

// Get Quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.json(quote);
  } catch (error) {
    console.error("Get Quote by ID Error:", error);
    res.status(500).json({ message: "Error fetching quote" });
  }
};

// Get Quotes for a User
export const getUserQuotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const quotes = await Quote.find({ user: userId });

    res.json(quotes);
  } catch (error) {
    console.error("Get User Quotes Error:", error);
    res.status(500).json({ message: "Error fetching user quotes" });
  }
};

// Create a New Quote
export const createQuote = async (req, res) => {
  try {
    const { amount, details } = req.body;

    if (!amount || !details) {
      return res.status(400).json({ message: "Amount and details are required" });
    }

    const newQuote = new Quote({ user: req.user.id, amount, details });
    await newQuote.save();

    res.status(201).json({ message: "Quote created successfully", quote: newQuote });
  } catch (error) {
    console.error("Create Quote Error:", error);
    res.status(500).json({ message: "Error creating quote" });
  }
};

// Update a Quote
export const updateQuote = async (req, res) => {
  try {
    const { amount, details } = req.body;

    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.amount = amount || quote.amount;
    quote.details = details || quote.details;

    const updatedQuote = await quote.save();
    res.json({ message: "Quote updated successfully", quote: updatedQuote });
  } catch (error) {
    console.error("Update Quote Error:", error);
    res.status(500).json({ message: "Error updating quote" });
  }
};

// Delete a Quote
export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    await quote.deleteOne();
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Delete Quote Error:", error);
    res.status(500).json({ message: "Error deleting quote" });
  }
};
