import mongoose from "mongoose";

const policySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  policyNumber: { type: String, required: true, unique: true },
  coverage: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Policy", policySchema);
