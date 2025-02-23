import Ticket from "../models/Ticket.js";

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

// Create a New Ticket
export const createTicket = async (req, res) => {
  try {
    console.log("Received Token:", req.headers.authorization);
    console.log("Decoded User:", req.user);
    console.log("Request Body:", req.body); // Debugging

    const { userId, subject } = req.body; // ✅ Use `subject`, not `issue`

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!subject) {
      return res.status(400).json({ message: "Subject is required" }); // ✅ Fix: Clear error message
    }

    const newTicket = new Ticket({
      userId, // ✅ Fix: Correct field name
      subject, // ✅ Fix: Correct field name
      status: "Open",
    });

    await newTicket.save();

    res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Error creating ticket", error });
  }
};


// Update a Ticket
export const updateTicket = async (req, res) => {
  try {
    const { issue, status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.issue = issue || ticket.issue;
    ticket.status = status || ticket.status;

    const updatedTicket = await ticket.save();
    res.json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({ message: "Error updating ticket" });
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
