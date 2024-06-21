import express from "express";
import { addShop } from "../controllers/shops";

const router = express.Router();

router.post("/", addShop);

export default router;