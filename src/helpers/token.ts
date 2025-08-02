import { envVars } from "../configs/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./token.helper";

export const CreateUserToken =  (payload: Partial<IUser>) => {
  const jwtPayload = {
    userId: payload._id,
    email: payload.email,
    role: payload.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_ACCESS_TOKEN_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_TOKEN_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};
