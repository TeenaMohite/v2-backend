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
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Get user counts and statistics (Admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const quoteCount = await Quote.countDocuments({});
    const policyCount = await Policy.countDocuments({});
    const ticketCount = await Ticket.countDocuments({});
    
    const activeUsers = await User.countDocuments({ status: "Active" });
    const inactiveUsers = await User.countDocuments({ status: "Inactive" });
    
    const openTickets = await Ticket.countDocuments({ status: "Open" });
    
    res.json({
      users: {
        total: userCount,
        active: activeUsers,
        inactive: inactiveUsers
      },
      quotes: quoteCount,
      policies: policyCount,
      tickets: {
        total: ticketCount,
        open: openTickets
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }
    
    const newUser = new User({
      name,
      code,
      status: status || "Active",
      dateCreated: new Date()
    });
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { name, code, status } = req.body;
    
    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, code, status },
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
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
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error: error.message });
  }
};

// Get all quotes (Admin only)
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({});
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes", error: error.message });
  }
};

// Get all policies (Admin only)
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({});
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching policies", error: error.message });
  }
};

// Get all tickets (Admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error: error.message });
  }
};