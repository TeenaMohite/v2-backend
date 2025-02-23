import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Fix: Ensure required userId
    subject: { type: String, required: true }, // ✅ Fix: Ensure correct field name
    status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
