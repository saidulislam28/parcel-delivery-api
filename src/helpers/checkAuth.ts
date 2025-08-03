import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AppError from "./CustomError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../configs/env";

export const CheckAuth =
  (...authRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.BAD_REQUEST, "No token found");
      }

      const verifyToken = jwt.verify(token, envVars.JWT_SECRET) as JwtPayload;

      req.user = verifyToken;

      if (!authRoles.includes(verifyToken.role)) {
        throw new AppError(httpStatus.BAD_GATEWAY, "You are not authorized");
      }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
