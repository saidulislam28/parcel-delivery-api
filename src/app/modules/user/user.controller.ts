/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { userService } from "./user.service";
import { CatchAsync } from "../../../utils/catchAsync";

const createUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).json({
      message: "User Created Successfully",
      user,
    });
  }
);

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await userService.createUser(req.body);

//     res.status(httpStatus.CREATED).json({
//       message: "User Created Successfully",
//       user,
//     });
//   } catch (error: any) {
//     console.log(error);
//     next(error);
//   }
// };

const getAllUsers = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();
    res.status(httpStatus.CREATED).json({
      message: "User retrieved Successfully",
      success: true,
      data: users,
    });
  }
);

export const userController = {
  createUser,
  getAllUsers,
};
