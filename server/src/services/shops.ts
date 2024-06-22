import Shop, { ShopType } from "../models/shop";

const addShop = async (newShop: ShopType) => {
  newShop.createdAt = new Date();
  newShop.lastUpdatedAt = new Date();

  const shop = new Shop(newShop);
  await shop.save();

  return shop;
};

const getAllShops = async () => {
  const shops = await Shop.find().select("-categories").sort("-lastUpdatedAt");
  return shops;
};

const getShopDetails = async (shopId: string) => {
  const shopDetails = await Shop.findById(shopId);
  return shopDetails;
};

export default { addShop, getAllShops, getShopDetails };
