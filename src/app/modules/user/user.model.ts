import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    address: { type: String },
    image: { type: String },
    isActive: { type: Boolean },
    isVerified: { type: Boolean },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.SENDER,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
