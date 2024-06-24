import { Request, Response } from "express";
import shopsService from "../services/shops";

export const addShop = async (req: Request, res: Response) => {
  const newShop = req.body;

  try {
    const shop = await shopsService.addShop(newShop);
    return res.status(200).send(shop);
  } catch (error) {
    console.log("Error: adding shop \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllShops = async (req: Request, res: Response) => {
  try {
    const result = await shopsService.getAllShops();
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error: getting all shops \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getShopDetails = async (req: Request, res: Response) => {
  const shopId = req.params.shopId.toString();
  if (!shopId) {
    return res.status(400).json({ message: "Hotel Id missing" });
  }

  try {
    const result = await shopsService.getShopDetails(shopId);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error: getting shop details \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const shopId = req.params.shopId.toString();
    const {cartItems} = req.body;
    const { userId } = req;

    const {result, status} = await shopsService.createPaymentIntent(userId, shopId, cartItems);
    return res.status(status).send(result);
  } catch (error) {
    console.log("Error: creating payment intent \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createShopOrder = async (req: Request, res: Response) => {
  try {
    const { body, userId } = req;
    const shopId = req.params.shopId.toString();

    const { status, result } = await shopsService.createShopOrder(
      body,
      userId,
      shopId
    );

    res.status(status).send(result);
  } catch (error) {
    console.log("Error: creating order \n", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};