export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: Role;
  isActive?: boolean;
  isVerified?: boolean;
  address?: string;
  image?: string;
}

export enum Role {
  SENDER = "SENDER",
  ADMIN = "ADMIN",
  RECEIVER = "RECEIVER",
}
