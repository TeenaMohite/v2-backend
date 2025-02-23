import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    vin: { type: String, required: true },
    mileage: { type: String, required: true },
    condition: { type: String, required: true },
    requiredPolicy: {
      comprehensive: { type: Boolean, default: false },
      collision: { type: Boolean, default: false },
      liability: { type: Boolean, default: false },
    },
    coverage: {
      medical: { type: Boolean, default: false },
      rental: { type: Boolean, default: false },
      roadside: { type: Boolean, default: false },
    },
    documents: [{ type: String }], // Store file paths or URLs
    additionalNotes: { type: String },
    amount: { type: String, required: true },
    status: { type: String, default: "Pending" },
    requestDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", QuoteSchema);