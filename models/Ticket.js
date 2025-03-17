import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    fullName: { type: String, },
    email: { type: String, },
    phone: { type: String, },
    category: { type: String, },
    subject: { type: String, },
    description: { type: String, },
    status: { type: String, },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
