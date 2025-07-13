import AppError from "../../../helpers/CustomError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { envVars } from "../../../configs/env";
import { generateToken } from "../../../utils/jwt";

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

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const jwtToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES
  );

  return {
    jwtToken,
  };
};

export const AuthService = {
  credentialsLogin,
};
