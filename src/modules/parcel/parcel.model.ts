import { model, Schema } from "mongoose";
import { Address, IParcel, Status, StatusLog } from "./parcel.interface";

const AddressSchema = new Schema<Address>(
  {
    street: String,
    city: String,
    postalCode: String,
    state: String,
    country: String,
  },
  { _id: false } 
);

const StatusLogSchema = new Schema<StatusLog>(
  {
    status: String,
    timestamps: Date,
    location: String,
    note: String,
  },
  { _id: false }
);

const ParcelSchema = new Schema<IParcel>(
  {
    type: { type: String, required: true },
    weight: { type: String },
    height: { type: String },
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: Schema.Types.ObjectId, ref: "User" },
    senderInfo: { type: String },
    receiverInfo: { type: String },
    address: { type: AddressSchema },
    fee: { type: String },
    deliveryDate: { type: Date },
    statusLog: { type: StatusLogSchema },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Requested,
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel = model<IParcel>("Parcel", ParcelSchema);
