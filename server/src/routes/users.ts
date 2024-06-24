import express from "express";
import {
  registerUser,
  fetchCurrentUser,
  fetchUserOrders,
} from "../controllers/users";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/me", verifyToken, fetchCurrentUser);

router.post("/register", registerUser);

router.get("/me/my-orders", verifyToken, fetchUserOrders);

export default router;
