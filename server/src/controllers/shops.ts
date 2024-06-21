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
