import { Request, Response } from "express";
import { loginUserSchema } from "../../../shared/validation/user";
import authService from "../services/auth";

export const login = async (req: Request, res: Response) => {
  const loginData = req.body;

  const parseResult = loginUserSchema.safeParse(loginData);

  if (parseResult.error) {
    return res
      .status(400)
      .json({ message: "Invalid login data", error: parseResult.error.errors });
  }

  try {
    const { email, password } = loginData;

    const { status, result, token } = await authService.login(email, password);

    token &&
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 6 * 60 * 60 * 1000, // 6 hrs
      });

    return res.status(status).json(result);
  } catch (error) {
    console.log("Error: login user \n", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const validateToken = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });

  res.send();
};
