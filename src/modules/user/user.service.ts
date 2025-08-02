import bcrypt from "bcryptjs";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import AppError from "../../helpers/CustomError";

const CreateUser = async (data: Partial<IUser>) => {
  const { email, password, ...rest } = data;

  const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!!!!");
  }

  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    ...rest,
  });

  return user;
};

const GetAllUser = async () => {
  const users = await User.find().select("-password");
  return users;
};

const UpdateUser = async (id: string, data: Partial<IUser>) => {
  const isUserExist = await User.findOne({ _id: id });

  if (!isUserExist) {
    throw new Error("User not found");
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const updateUser = await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updateUser;
};

export const UserService = {
  CreateUser,
  GetAllUser,
  UpdateUser,
};
