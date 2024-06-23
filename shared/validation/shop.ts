import { z } from "zod";

const itemSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  isVeg: z.boolean(),
  nutritionalInfo: z.string().optional(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string().optional(),
});

const shopSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  locality: z.string().min(1, "Locality is required"),
  address: z.string().min(1, "Address is required"),
  costForTwo: z.string().min(1, "Cost for two is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  logo: z.string().min(1, "Logo is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  createdAt: z.date(),
  lastUpdatedAt: z.date(),
  categories: z.record(z.array(itemSchema)),
});

const cartItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  itemName: z.string().min(1, "Item Name is required"),
  itemQty: z
    .number()
    .int()
    .positive("Item Quantity must be a positive integer"),
  itemPrice: z.string().min(1, "Item Price is required"),
  itemCategory: z.string().min(1, "Item Category is required"),
});

const cartStateSchema = z.object({
  items: z.array(cartItemSchema),
  store: z.string().nullable(),
});

export type CartItemType = z.infer<typeof cartItemSchema>;
export type ShopItemType = z.infer<typeof itemSchema>;
export type ShopType = z.infer<typeof shopSchema>;

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};

export type OrderType = {
  _id: string;
  userId: string;
  shopId: string;
  firstName: string;
  lastName: string;
  email: string;
  cartItems: CartItemType[];
  totalCost: number;
};

export { itemSchema, shopSchema, cartItemSchema, cartStateSchema };
