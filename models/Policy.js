import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    // policyNumber: { type: String, required: true, unique: true }, 
    policyType: { type: String, required: true },
    coverageAmount: { type: Number, required: true },
    premium: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Policy", policySchema);
