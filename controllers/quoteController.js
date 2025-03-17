import Quote from "../models/Quote.js";

// Create a new quote
export const createQuote = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      make,
      model,
      year,
      vin,
      mileage,
      condition,
      requiredPolicy,
      coverage,
      documents,
      additionalNotes,
      amount,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !make ||
      !model ||
      !year ||
      !vin ||
      !mileage ||
      !condition ||
      !amount
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the quote to the database
    const newQuote = new Quote({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zipCode,
      make,
      model,
      year,
      vin,
      mileage,
      condition,
      requiredPolicy,
      coverage,
      documents,
      additionalNotes,
      amount,
    });

    await newQuote.save();

    res.status(201).json({ message: "Quote created successfully", newQuote });
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Get all quotes
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Update quote status
export const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedQuote = await Quote.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({ message: "Quote status updated", updatedQuote });
  } catch (error) {
    console.error("Error updating quote status:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};


// Get a single quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const quote = await Quote.findById(id);
    
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    
    res.status(200).json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    
    // Handle invalid ObjectId format error
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: "Invalid quote ID format" });
    }
    
    res.status(500).json({ message: "Server error, please try again" });
  }
};