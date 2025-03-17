import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
