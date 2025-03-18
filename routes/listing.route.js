import express from "express";
import {
  createListing,
  deletListing,
  getUserListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deletListing);
router.patch("/update/:id", verifyToken, updateListing);

export default router;
