import express from "express";
import { createPolicy, getAllPolicies, deletePolicy } from "../controllers/policyController.js";


const router = express.Router();

// Create a new policy
router.post("/create", createPolicy);

// Get all policies
router.get("/getall", getAllPolicies);

// Delete a policy
router.delete("/delete/:id", deletePolicy);

export default router;