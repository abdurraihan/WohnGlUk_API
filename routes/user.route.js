import express from "express";
// import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// import controller
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";

router.get("/test", test);

// router.post("/update/:id", verifyToken, updateUser);
// router.delete("/delete/:id", verifyToken, deleteUser);

router.post("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
