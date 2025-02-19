import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import quoteRoutes from "./src/routes/qouteRoutes.js";
import policyRoutes from "./src/routes/policyRoutes.js";
import ticketRoutes from "./src/routes/ticketRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/tickets", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
