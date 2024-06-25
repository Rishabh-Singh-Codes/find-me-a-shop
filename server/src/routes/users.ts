import express from "express";
import {
  registerUser,
  fetchCurrentUser,
} from "../controllers/users";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/me", verifyToken, fetchCurrentUser);

router.post("/register", registerUser);

export default router;
