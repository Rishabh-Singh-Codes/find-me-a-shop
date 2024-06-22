import { z } from "zod";
import { shopSchema, itemSchema } from "../../../shared/validation/shop";

export type ShopType = z.infer<typeof shopSchema>;

export type ItemSchema = z.infer<typeof itemSchema>;
