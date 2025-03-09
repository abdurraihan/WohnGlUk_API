import express from "express";
import { google, signup, sinin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", sinin);
router.post("/google", google);

export default router;
