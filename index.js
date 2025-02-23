import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js"; 

// Load environment variables
dotenv.config();

// Import Routes 
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

import policyRoutes from "./routes/policyRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/tickets", ticketRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
