import { z } from "zod";

const itemSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  isVeg: z.boolean(),
  nutritionalInfo: z.string().optional(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  image: z.string().optional()
});

const shopSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  locality: z.string().min(1, "Locality is required"),
  address: z.string().min(1, "Address is required"),
  costForTwo: z.string().min(1, "Cost for two is required"),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
  logo: z.string().min(1, "Logo is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  createdAt: z.date(),
  lastUpdatedAt: z.date(),
  categories: z.record(z.array(itemSchema))
});

export { itemSchema, shopSchema };
