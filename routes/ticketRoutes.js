import express from "express";
import authMiddleware  from "../middleware/authMiddleware.js"
import {
  getAllTickets,
  getTicketById,
  createTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// Get all tickets
router.get("/getall", getAllTickets);

// Get ticket by ID
router.get("/:id", getTicketById);

// Create a new ticket
router.post("/create", createTicket);



// Delete a ticket
router.delete("/delete/:id", deleteTicket);

export default router;
