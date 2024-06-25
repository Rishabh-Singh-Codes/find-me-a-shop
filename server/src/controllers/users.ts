import { Request, Response } from "express";
import usersService from "../services/users";
import { registerUserSchema } from "../../../shared/validation/user";

export const fetchCurrentUser = async (req: Request, res: Response) => {
  const {userId} = req;

  try {
    const {result, status} = await usersService.fetchCurrentUser(userId);
    return res.status(status).json(result);
  } catch (error) {
    console.log("Error: fetching user data \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
 }

export const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const parseResult = registerUserSchema.safeParse(userData);

  if (!parseResult.success) {
    return res
      .status(400)
      .json({ message: "Invalid user data", errors: parseResult.error.errors });
  }

  try {
    const { status, result, token } = await usersService.registerUser(userData);

    token &&
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60 * 1000, // 6 hrs
      });

    return res.status(status).json(result);
  } catch (error) {
    console.log("Error: registering user \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

