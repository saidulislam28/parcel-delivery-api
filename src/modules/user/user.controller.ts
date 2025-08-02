import { Request, Response } from "express";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";

const CreateUser = async (req: Request, res: Response) => {
  const body = req.body;
  const user = await UserService.CreateUser(body);

  res.send({
    success: true,
    message: "User Created Successfully!!!!",
    data: user,
  });
};
const GetAllUser = async (req: Request, res: Response) => {
  const users = await UserService.GetAllUser();
  res.send({
    success: true,
    message: "User Retrieved Successfully!!!!",
    data: users,
  });
};

const UpdateUser = async (req: Request, res: Response) => {
  const data: Partial<IUser> = req.body;
  const id: string = req.params.id;
  const user = await UserService.UpdateUser(id, data);

  res.send({
    success: true,
    message: "User Updated Successfully!!!!",
    data: user,
  });
};

export const UserController = {
  CreateUser,
  GetAllUser,
  UpdateUser,
};
