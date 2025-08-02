import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const Login = async (req: Request, res: Response) => {
  const data = req.body;

  const user = await AuthService.Login(data);

  if (user.accessToken) {
    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: false,
    });
  }

  if (user.refreshToken) {
    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }

  res.send({
    success: true,
    message: "Logged in successful",
    data: {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      user: user.user,
    },
  });
};

export const AuthController = {
  Login,
};
