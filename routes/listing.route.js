import express from "express";
import {
  createListing,
  deletListing,
  getListing,
  getListings,
  getUser,
  getUserListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.get("/user/:id", verifyToken, getUserListing);
router.delete("/delete/:id", verifyToken, deletListing);
router.patch("/update/:id", verifyToken, updateListing);
//get single listing by id
router.get("/get/:id", getListing);
// for contact by email
router.get("/get", getListings);
router.get("/:id", verifyToken, getUser);

export default router;
