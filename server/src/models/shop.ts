import mongoose from "mongoose";

export type ItemType = {
  _id: String;
  name: string;
  description: string;
  price: string;
  isVeg: boolean;
  nutritionalInfo: string;
  rating: number;
  image: string;
};

export type ShopType = {
  _id: String;
  name: string;
  locality: string;
  address: string;
  costForTwo: string;
  rating: number;
  logo: string;
  images: string[];
  createdAt: Date;
  lastUpdatedAt: Date;
  categories: Map<string, ItemType[]>;
};

const itemSchema = new mongoose.Schema<ItemType>({
  _id: { type: String, default: () => new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  isVeg: {type: Boolean, required: true},
  nutritionalInfo: { type: String },
  rating: { type: Number, required: true },
  image: { type: String },
});

const shopSchema = new mongoose.Schema<ShopType>({
  name: { type: String, required: true },
  locality: { type: String, required: true },
  address: { type: String, required: true },
  costForTwo: { type: String, required: true },
  rating: { type: Number, required: true },
  logo: { type: String, required: true },
  images: { type: [String], required: true },
  createdAt: {type: Date, required: true},
  lastUpdatedAt: {type: Date, required: true},
  categories: {
    type: Map,
    of: [itemSchema],
    required: true
  }
});

const Shop = mongoose.model<ShopType>("shop", shopSchema);

export default Shop;