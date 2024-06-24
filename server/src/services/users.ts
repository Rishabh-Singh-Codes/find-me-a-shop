import User, { UserType } from "../models/user";
import jwt from "jsonwebtoken";

const registerUser = async (userData: UserType) => {
  let user = await User.findOne({
    email: userData.email,
  });

  if (user) {
    return {
      status: 400,
      result: {
        message: "Email already registered",
      },
    };
  }

  user = new User(userData);
  await user.save();

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "6h",
    }
  );

  return {
    status: 200,
    result: {
      message: "User registered",
      Error,
    },
    token,
  };
};

const fetchCurrentUser = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return {
      status: 400,
      result: {
        message: "User not found",
      },
    };
  }

  return {
    status: 200,
    result: user,
  };
};

const fetchUserOrders = async (userId: string) => {
  const user = await User.findById(userId);

  if(!user?.orders) {
    return {
      status: 400,
      result: {
        message: "No orders for current user"
      }
    }
  }

  // Need to update this
  return {
    status: 200,
    result: {
      message: "No orders for current user"
    }
  }
}

export default {
  registerUser,
  fetchCurrentUser,
  fetchUserOrders
};
