import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== "Admin") return res.status(403).json({ message: "Access denied" });

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};
