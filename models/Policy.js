import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    policyNumber: { type: String, required: true },
    coverage: { type: String, required: true },
    premiumAmount: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Policy", PolicySchema);