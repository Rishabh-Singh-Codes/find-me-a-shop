import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: 400,
      result: {
        message: "Invalid crendentials!",
      },
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      status: 400,
      result: {
        message: "Invalid crendentials!",
      },
    };
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "6h" }
  );

  return {
    status: 200,
    result: {
      userId: user._id,
    },
    token,
  };
};

export default {
  login,
};
