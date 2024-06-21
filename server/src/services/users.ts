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
      Error
    },
    token,
  };
};

export default {
  registerUser,
};
