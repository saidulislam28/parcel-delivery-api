/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import AppError from "../../helpers/CustomError";
import { ParcelService } from "./parcel.service";
import httpStatus from "http-status-codes";

const CreateParcel = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const parcel = await ParcelService.CreateParcel(data);

    res.send({
      status: true,
      message: "parcel successfully created",
      data: parcel,
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const GetAllParcel = async (req: Request, res: Response) => {
  const parcel = await ParcelService.GetAllParcel();

  res.send({
    status: true,
    message: "parcel retrieved successfully!!",
    data: parcel,
  });
};
const GetSingleUserParcel = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;
    // console.log(user.userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "No valid requested user");
    }

    const parcel = await ParcelService.GetSingleUserParcel(user.userId);

    res.send({
      status: true,
      message: "parcel retrieved for single user successfully!!",
      data: parcel,
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};
const CancelParcel = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const user: any = req.user;
    console.log(id);

    if (!id) {
      throw new AppError(httpStatus.NOT_FOUND, "Not valid");
    }

    const parcel = await ParcelService.CancelParcel(id, user.userId);

    res.send({
      status: true,
      message: "parcel retrieved for single user successfully!!",
      data: parcel,
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};
const GetReceiverParcel = async (req: Request, res: Response) => {
  try {
    const user: any = req.user;

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "Not valid");
    }

    const parcel = await ParcelService.GetReceiverParcel(user?.userId);

    res.send({
      status: true,
      message: "Receiver parcel retrieved successfully!!",
      data: parcel,
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const ParcelController = {
  CreateParcel,
  GetAllParcel,
  GetSingleUserParcel,
  CancelParcel,
  GetReceiverParcel
};
