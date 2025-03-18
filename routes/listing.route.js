import express from "express";
import {
  createListing,
  getUserListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user/:id", verifyToken, getUserListing);
export default router;
