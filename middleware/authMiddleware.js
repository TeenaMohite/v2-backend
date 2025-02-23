import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token part
      console.log("Received Token:", token); // Debugging

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      
      console.log("Decoded User:", req.user); // Debugging
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
