import express from "express";
import {
  addShop,
  getAllShops,
  getShopDetails,
  createPaymentIntent,
  createShopOrder
} from "../controllers/shops";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post("/", verifyToken, addShop);

router.get("/", getAllShops);

router.get("/:shopId", getShopDetails);

router.post("/:shopId/orders/payment-intent", verifyToken, createPaymentIntent);

router.post("/:shopId/orders", verifyToken, createShopOrder);

export default router;
