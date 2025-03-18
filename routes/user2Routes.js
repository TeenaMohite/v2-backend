import express from "express";
import { createUser, deleteUser, getAllPolicies, getAllQuotes, getAllTickets, getAllUsers, getDashboardStats, updateUser, updateUserRole } from "../controllers/adminController.js";


const router = express.Router();

// User routes
router.get("/getall",  getAllUsers);
router.post("/create",  createUser);
router.put("/update/:id",  updateUser);
router.delete("/delete/:id",  deleteUser);
router.put("/role/:id",  updateUserRole);

// Other admin routes
router.get("/admin/dashboard-stats",  getDashboardStats);
router.get("/quotes/all",  getAllQuotes);
router.get("/policies/all",  getAllPolicies);
router.get("/tickets/all",  getAllTickets);

export default router;