import express from "express";
import { signup, sinin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", sinin);

export default router;
