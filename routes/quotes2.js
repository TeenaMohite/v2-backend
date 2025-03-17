import express from 'express';
import QuoteRequestModel from "../models/Quotes2.js"

const router = express.Router();

// Get all quote requests
router.get('/getall', async (req, res) => {
  try {
    const quoteRequests = await QuoteRequestModel.find();
    res.status(200).json(quoteRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new quote request
router.post('/create', async (req, res) => {
  const { vehicleMake, vehicleModel, vehicleYear, insuranceType, contactDetails } = req.body;

  if (!vehicleMake || !vehicleModel || !vehicleYear || !insuranceType || !contactDetails) {
    return res.status(400).json({ message: 'Please fill all fields.' });
  }

  try {
    const newQuoteRequest = new QuoteRequestModel({ vehicleMake, vehicleModel, vehicleYear, insuranceType, contactDetails });
    const savedQuoteRequest = await newQuoteRequest.save();
    res.status(201).json(savedQuoteRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a quote request by ID
router.put('/update/:id', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  try {
    const updatedQuoteRequest = await QuoteRequestModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedQuoteRequest) {
      return res.status(404).json({ message: 'Quote request not found.' });
    }

    res.status(200).json(updatedQuoteRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a quote request by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedQuoteRequest = await QuoteRequestModel.findByIdAndDelete(req.params.id);

    if (!deletedQuoteRequest) {
      return res.status(404).json({ message: 'Quote request not found.' });
    }

    res.status(200).json({ message: 'Quote request deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id',async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const quote = await QuoteRequestModel.findById(id);
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

}
)
export default router;