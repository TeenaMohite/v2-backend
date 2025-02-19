import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  details: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Quote", quoteSchema);
