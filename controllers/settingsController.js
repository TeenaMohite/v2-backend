import User2 from "../models/User2.js";

// Get User Settings
export const getUserSettings = async (req, res) => {
  try {
    const user = await User2.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update User Settings
export const updateUserSettings = async (req, res) => {
  try {
    const updatedUser = await User2.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error });
  }
};

// Delete User Account
export const deleteUserAccount = async (req, res) => {
  try {
    const deletedUser = await User2.findByIdAndDelete(req.params.userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Account Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed", error });
  }
};
