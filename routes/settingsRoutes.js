import express from "express";
import { getUserSettings, updateUserSettings, deleteUserAccount } from "../controllers/settingsController.js";

const router = express.Router();

// ✅ Get User Settings
router.get("/:userId", getUserSettings);

// ✅ Update User Settings
router.put("/:userId", updateUserSettings);

// ✅ Delete User Account
router.delete("/:userId", deleteUserAccount);

export default router;
