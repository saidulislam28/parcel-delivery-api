import { Types } from "mongoose";

export interface IParcel {
  type?: string;
  weight?: string;
  height?: string;
  senderId?: Types.ObjectId;
  receiverId?: Types.ObjectId;
  senderInfo?: string;
  receiverInfo?: string;
  address?: Address;
  fee?: string;
  deliveryDate?: Date;
  statusLog?: StatusLog;
  status?: Status;
}

export interface Address {
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
}

export enum Status {
  InTransit = "InTransit",
  Dispatched = "Dispatched",
  Approved = "Approved",
  Requested = "Requested",
  Cancelled = "Cancelled",
  Delivered = "Delivered",
}

export interface StatusLog {
  status?: string;
  timestamps?: Date;
  location?: string;
  note?: string;
}
