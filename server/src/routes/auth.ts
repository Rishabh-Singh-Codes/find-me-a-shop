import express from "express";
import { login, validateToken, logout } from "../controllers/auth";
import verifyToken from "../middlewares/auth";

const router= express.Router();

router.post("/login", login);

router.get("/validate-token", verifyToken, validateToken);

router.post("/logout", logout);

export default router;