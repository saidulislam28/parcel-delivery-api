import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/response.helper";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";

const credentialsLogin = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const user = await userService.createUser(req.body);

    const loginInfo = await AuthService.credentialsLogin(req.body);

    sendResponse(res, {
      success: true,
      message: "User Logged in Successfully",
      statusCode: httpStatus.OK,
      data: loginInfo,
    });
  }
);

export const AuthController = {
  credentialsLogin,
};
