import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Received Token:", token);

      // Check if secret key is correctly loaded
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in .env");
        return res.status(500).json({ message: "Server configuration error" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token Data:", decoded);

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found, invalid token" });
      }

      next();
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    console.error("No token received in headers:", req.headers);
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export default authMiddleware;
