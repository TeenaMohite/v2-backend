import Ticket from '../models/Ticket.js';
import multer from 'multer';

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in an "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// create tickets


// Get all tickets (Admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    console.error("Get All Tickets Error:", error);
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// Get a Ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Get Ticket by ID Error:", error);
    res.status(500).json({ message: "Error fetching ticket" });
  }
};



export const createTicket = async (req, res) => {
  try {
    const { fullName, email, phone, category, subject, description } = req.body;
console.log(req.body);
    const newTicket = new Ticket({
      fullName,
      email,
      phone,
      category,
      subject,
      description,
      status: "Open",
    });

    await newTicket.save();

    res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Error creating ticket", error });
  }
};




// Delete a Ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await ticket.deleteOne();
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete Ticket Error:", error);
    res.status(500).json({ message: "Error deleting ticket" });
  }
};
