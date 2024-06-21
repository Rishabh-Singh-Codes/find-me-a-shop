import Shop, { ShopType } from "../models/shop";

const addShop = async (newShop: ShopType) => {
  newShop.createdAt = new Date();
  newShop.lastUpdatedAt = new Date();

  const shop = new Shop(newShop);
  await shop.save();

  return shop;
};

export default { addShop };
