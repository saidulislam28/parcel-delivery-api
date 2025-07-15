import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { envVars } from "../../../configs/env";
import AppError from "../../../helpers/CustomError";
import { generateToken } from "../../../utils/jwt";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

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
  const jwtRefreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES
  );

  const userWithoutPassword = await User.findOne({ email }).select("-password");

  return {
    jwtToken,
    jwtRefreshToken,
   user: userWithoutPassword,
  };
};

export const AuthService = {
  credentialsLogin,
};
