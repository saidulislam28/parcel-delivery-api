import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const Login = async (req: Request, res: Response) => {
  const data = req.body;

  const user = await AuthService.Login(data);
};

export const AuthController = {
  Login,
};
