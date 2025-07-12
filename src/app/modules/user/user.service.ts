import httpStatus from "http-status-codes";
import AppError from "../../../helpers/CustomError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "user already exist");
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });

  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});

  const total = await User.countDocuments();

  return {
    data: users,
    meta: {
      total,
    },
  };
};

export const userService = {
  createUser,
  getAllUsers,
};
