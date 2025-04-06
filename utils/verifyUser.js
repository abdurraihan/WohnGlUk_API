import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "Unauthorized - No Bearer token"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(errorHandler(401, "Unauthorized - Token missing"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err); // Log the error for debugging
      return next(errorHandler(403, "Forbidden - Invalid token")); // Use 403 for invalid token
    }
    req.user = user;
    next();
  });
};
