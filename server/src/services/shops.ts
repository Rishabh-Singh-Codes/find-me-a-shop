import Shop, { ShopType } from "../models/shop";
import {
  CartItemType,
  OrderType,
  ShopItemType,
} from "../../../shared/validation/shop";
import Stripe from "stripe";
import User from "../models/user";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

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
  const shopDetails = await Shop.findById(shopId).select("-orders");
  return shopDetails;
};

const createPaymentIntent = async (
  userId: string,
  shopId: string,
  cartItems: CartItemType[]
) => {
  const shop = await Shop.findById(shopId);
  if (!shop) {
    return {
      status: 400,
      result: {
        message: "Shop not found",
      },
    };
  }

  const totalCost = cartItems?.reduce((acc, curr) => {
    const categoryItems = shop.categories.get(curr.itemCategory);

    if (categoryItems && categoryItems.length) {
      const currItem = categoryItems.find((item) => item._id === curr.itemId);
      if (currItem) {
        const currItemPrice = Number(currItem.price.split("₹")[1]);
        acc += currItemPrice * curr.itemQty;
      }
      acc;
    }

    return acc;
  }, 0);

  if (!totalCost) {
    return {
      status: 500,
      result: {
        message: "Internal Server Error",
      },
    };
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "inr",
    metadata: {
      userId,
      shopId,
      type: "coffeeShop"
    },
  });

  if (!paymentIntent.client_secret) {
    return {
      status: 500,
      result: {
        message: "Error creating payment intent",
      },
    };
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  return {
    status: 200,
    result: response,
  };
};

const createShopOrder = async (
  body: OrderType & { paymentIntentId: string },
  userId: string,
  shopId: string
) => {
  const { paymentIntentId } = body;
  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );

  if (!paymentIntent) {
    return {
      status: 400,
      result: {
        message: "Payment intent not found",
      },
    };
  }

  if (
    paymentIntent.metadata.shopId !== shopId ||
    paymentIntent.metadata.userId !== userId
  ) {
    return {
      status: 400,
      result: {
        message: "Payment intent mismatch",
      },
    };
  }

  if (paymentIntent.status !== "succeeded") {
    return {
      status: 400,
      result: {
        message: `Payment intent not succeeded. Status: ${paymentIntent.status}`,
      },
    };
  }

  const newOrder: OrderType = {
    ...body,
    userId,
    shopId
  };

  const shop = await Shop.findOneAndUpdate(
    { _id: shopId },
    {
      $push: { orders: newOrder },
    }
  );

  if (!shop) {
    return {
      status: 400,
      result: {
        message: "Shop not found",
      },
    };
  }

  await shop.save();

  const user = await User.findOneAndUpdate(
    { _id: userId },
    {
      $push: { orders: newOrder },
    }
  );

  if (!user) {
    return {
      status: 400,
      result: {
        message: "User not found",
      },
    };
  }

  await user.save();

  return {
    status: 200,
    result: { shop, user },
  };
};

export default {
  addShop,
  getAllShops,
  getShopDetails,
  createPaymentIntent,
  createShopOrder,
};
