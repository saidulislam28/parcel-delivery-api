import AppError from "../../../helpers/CustomError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not exist");
  }

  const isMatchPassword = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isMatchPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not Matched");
  }

  return {
    email: isUserExist.email,
  };
};

export const AuthService = {
  credentialsLogin,
};
