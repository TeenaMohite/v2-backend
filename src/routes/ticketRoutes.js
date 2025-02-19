import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

// Get all tickets
router.get("/", authMiddleware, getAllTickets);

// Get ticket by ID
router.get("/:id", authMiddleware, getTicketById);

// Create a new ticket
router.post("/", authMiddleware, createTicket);

// Update a ticket
router.put("/:id", authMiddleware, updateTicket);

// Delete a ticket
router.delete("/:id", authMiddleware, deleteTicket);

export default router;
