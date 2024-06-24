import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { CartItemType, OrderType } from "../../../shared/validation/shop";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orders?: [OrderType];
};

const cartItemSchema = new mongoose.Schema<CartItemType>({
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  itemQty: { type: Number, required: true },
  itemPrice: { type: String, required: true },
  itemCategory: { type: String, required: true },
});

const orderSchema = new mongoose.Schema<OrderType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userId: { type: String, required: true },
  shopId: {type: String, require: true},
  totalCost: { type: Number, required: true },
  cartItems: [cartItemSchema],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  orders: [orderSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

const User = mongoose.model<UserType>("user", userSchema);

export default User;
