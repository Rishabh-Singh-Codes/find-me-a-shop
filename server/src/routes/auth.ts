import express from "express";
import { login, validateToken } from "../controllers/auth";
import verifyToken from "../middlewares/auth";

const router= express.Router();

router.post("/login", login);

router.get("/validate-token", verifyToken, validateToken);

export default router;