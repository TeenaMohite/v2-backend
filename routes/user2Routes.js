import express from "express";
import User2 from "../models/User2.js";

const router = express.Router();

// ✅ Get User Settings
router.get("/get/:id", async (req, res) => {
  try {
    const user = await User2.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
});
// ✅ Get All Users
router.get("/getall", async (req, res) => {
  try {
    const users = await User2.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ✅ Update User Settings
router.put("/update/:id", async (req, res) => {
  try {
    const updatedUser = await User2.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create New User
router.post("/create", async (req, res) => {
  try {
    const newUser = new User2(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete User
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User2.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
