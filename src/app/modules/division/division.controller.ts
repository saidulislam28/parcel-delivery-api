/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "../../../utils/catchAsync";
import { divisionService } from "./division.service";
import { sendResponse } from "../../../utils/response.helper";
import httpStatus from "http-status-codes";
import { Types } from "mongoose";

const CreateDivision = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionService.CreateDivision(req.body);

    sendResponse(res, {
      success: true,
      message: "Division Created Successfully",
      statusCode: httpStatus.CREATED,
      data: division,
    });
  }
);
const GetAllDivision = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const division = await divisionService.GetAllDivision();

    sendResponse(res, {
      success: true,
      message: "Division retrieved Successfully",
      statusCode: httpStatus.CREATED,
      data: division,
    });
  }
);

const UpdateDivision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const divId: string = req.params.id;
  const payload = req.body;

  const division = await divisionService.UpdateDivision(divId, payload);

  sendResponse(res, {
    success: true,
    message: "Division Created Successfully",
    statusCode: httpStatus.CREATED,
    data: division,
  });
};

export const divisionController = {
  CreateDivision,
  GetAllDivision,
  UpdateDivision,
};
