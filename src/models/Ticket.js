import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
