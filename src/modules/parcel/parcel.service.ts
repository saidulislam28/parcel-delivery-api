import httpStatus from "http-status-codes";
import AppError from "../../helpers/CustomError";
import { User } from "../user/user.model";
import { IParcel, Status } from "./parcel.interface";
import { Parcel } from "./parcel.model";
import { Types } from "mongoose";

const CreateParcel = async (data: Partial<IParcel>) => {
  const parcel = await Parcel.create(data);

  return parcel;
};

const GetAllParcel = async () => {
  const parcel = await Parcel.find();

  return parcel;
};

const GetSingleUserParcel = async (userId: string) => {
  console.log(userId);

  const isUserExist = await User.findOne({ _id: userId });

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not found!!!");
  }

  const parcel = await Parcel.find({ senderId: isUserExist.id });
  return parcel;
};

const CancelParcel = async (parcelId: string, userId: Types.ObjectId) => {
  const isParcelExist = await Parcel.findOne({ _id: parcelId });

  console.log("isParcelExist", isParcelExist);
  console.log("userId", userId);

  if (!isParcelExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel Not found!!!");
  }

  if (isParcelExist?.senderId?.toString() !== userId.toString()) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not authorized for this parcel"
    );
  }

  if (isParcelExist.status !== Status.Requested) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Parcel is Already on ${isParcelExist.status}`
    );
  }

  const updatedParcel = await Parcel.findOneAndUpdate(
    {
      _id: isParcelExist.id,
    },
    {
      status: Status.Cancelled,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedParcel;
};

const GetReceiverParcel = async (receiverId: string) => {
  const parcel = await Parcel.find({ receiverId: receiverId });
  return parcel;
};

export const ParcelService = {
  CreateParcel,
  GetAllParcel,
  GetSingleUserParcel,
  CancelParcel,
  GetReceiverParcel,
};
