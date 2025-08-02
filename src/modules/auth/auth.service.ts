import httpStatus from "http-status-codes";
import AppError from "../../helpers/CustomError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { CreateUserToken } from "../../helpers/token";
const Login = async (data: Partial<IUser>) => {
  const { email, password } = data;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found!!");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not matched");
  }

  const { accessToken, refreshToken } = CreateUserToken(isUserExist);

  const userWithoutPassword = await User.findOne({ email }).select("-password");

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};




export const AuthService = {
  Login,
};
