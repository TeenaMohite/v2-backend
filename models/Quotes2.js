import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema({
  vehicleMake: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  vehicleYear: { type: String, required: true },
  insuranceType: { type: String, required: true },
  contactDetails: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  quoteDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('QuoteRequest', quoteRequestSchema);