import { z } from "zod";
import { shopSchema, itemSchema, cartItemSchema } from "../../../shared/validation/shop";

export type ShopType = z.infer<typeof shopSchema>;

export type ItemSchema = z.infer<typeof itemSchema>;

export type CartItemType = z.infer<typeof cartItemSchema>;
