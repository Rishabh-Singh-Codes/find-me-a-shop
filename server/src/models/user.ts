import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { OrderType } from "../../../shared/validation/shop";
import { orderSchema } from "./shop";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  orders?: [OrderType];
};

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
