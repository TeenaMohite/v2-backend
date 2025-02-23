import express from "express";
import  authMiddleware  from "../middleware/authMiddleware.js";
import  adminMiddleware  from "../middleware/adminMiddleware.js";
import {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getAllQuotes,
  getAllPolicies,
  getAllTickets,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
router.put("/users/:id", authMiddleware, adminMiddleware, updateUserRole);

router.get("/quotes", authMiddleware, adminMiddleware, getAllQuotes);
router.get("/policies", authMiddleware, adminMiddleware, getAllPolicies);
router.get("/tickets", authMiddleware, adminMiddleware, getAllTickets);

export default router;
