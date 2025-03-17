import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/tickets", upload.single("attachment"), createTicket);

// Apply authMiddleware to protect routes
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.post("/", createTicket);
router.delete("/:id", deleteTicket);
router.put("/:id",  updateTicket);

export default router;
