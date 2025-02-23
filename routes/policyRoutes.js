import express from "express";
import  authMiddleware from "../middleware/authMiddleware.js";
import  adminMiddleware  from "../middleware/adminMiddleware.js";
import {
  getAllPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  updatePolicyStatus,
  deletePolicy,
  getUserPolicies,
} from "../controllers/policyController.js";

const router = express.Router();

// Get all policies (Admin only)
router.get("/", authMiddleware, adminMiddleware, getAllPolicies);

// Get policy by ID
router.get("/:id", authMiddleware, getPolicyById);

// Get policies for logged-in user
router.get("/user", authMiddleware, getUserPolicies);

// Create a new policy request
router.post("/", authMiddleware, createPolicy);

// Update policy details (User can update their own policy)
router.put("/:id", authMiddleware, updatePolicy);

// Approve/Reject Policy (Admin only)
router.put("/:id/status", authMiddleware, adminMiddleware, updatePolicyStatus);

// Delete a policy (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deletePolicy);

export default router;
