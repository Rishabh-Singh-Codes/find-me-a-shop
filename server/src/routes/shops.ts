import express from "express";
import { addShop, getAllShops, getShopDetails } from "../controllers/shops";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, addShop);

router.get("/", getAllShops);

router.get("/:shopId", getShopDetails);

export default router;
