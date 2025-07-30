/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import AppError from "../../../helpers/CustomError";
import { Types } from "mongoose";
import { Tour, TourType } from "./tour.model";
import { ITour, ITourType } from "./tour.interface";

const CreateTourType = async (payload: ITourType) => {
  const checkTourType = await TourType.findOne({ name: payload.name });

  if (checkTourType) {
    throw new AppError(httpStatus.BAD_REQUEST, "Already Exist!!!");
  }
  // return;

  const tourType = await TourType.create(payload);

  return tourType;
};
const GetAllTourType = async () => {
  const tourType = await TourType.find();

  return tourType;
};

const UpdateTourType = async (id: string, payload: Partial<ITourType>) => {
  const findTour = await TourType.findOne({ name: payload.name });

  if (findTour) {
    throw new AppError(httpStatus.BAD_REQUEST, "Already exist!!!");
  }

  const tour = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return tour;
};

const DeleteTourType = async (id: string) => {
  const findById = await TourType.findOne({ _id: id });

  if (!findById) {
    throw new AppError(httpStatus.BAD_REQUEST, "Data not found");
  }

  const data = await TourType.findByIdAndDelete(id);
  return {
    delete: true,
  };
};

const CreateTour = async (payload: ITour) => {
  const { title, ...rest } = payload;

  const createSlug = title?.split(" ").join("-").toLocaleLowerCase();

  const checkSlugExisting = await Tour.findOne({ slug: createSlug });
  if (checkSlugExisting) {
    throw new AppError(httpStatus.BAD_REQUEST, "Slug Already exist ");
  }
  const TourData = {
    ...rest,
    title,
    slug: createSlug,
  };

  console.log("tour data>>", TourData);
  // return;

  const tour = await Tour.create(TourData);

  return tour;
};
const GetAllTour = async (query: any) => {
  console.log(query);
  const filter = query;
  const searchTerm = query.search;

  delete filter["search"];

  const tour = await Tour.find({
    $or: [
      { title: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
      { location: { $regex: searchTerm, $options: "i" } },
    ],
  }).find(filter);

  return tour;
};

const UpdateTour = async (id: string, payload: Partial<ITour>) => {
  const { title, ...rest } = payload;

  const findTour = await Tour.findOne({ title: payload.title });

  if (!findTour) {
    payload.slug = title?.split(" ").join("-").toLocaleLowerCase();
  }

  const tour = await Tour.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return tour;
};

const DeleteTour = async (id: string) => {
  const findById = await Tour.findOne({ _id: id });

  if (!findById) {
    throw new AppError(httpStatus.BAD_REQUEST, "Data not found");
  }

  const data = await Tour.findByIdAndDelete(id);
  return {
    delete: true,
  };
};

export const tourService = {
  CreateTour,
  GetAllTour,
  UpdateTour,
  DeleteTour,
  CreateTourType,
  GetAllTourType,
  UpdateTourType,
  DeleteTourType,
};
