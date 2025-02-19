import User from "../models/User.js";
import Quote from "../models/Quote.js";
import Policy from "../models/Policy.js";
import Ticket from "../models/Ticket.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role" });
  }
};

// Get all quotes (Admin only)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes" });
  }
};

// Get all policies (Admin only)
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({});
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching policies" });
  }
};

// Get all tickets (Admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};
