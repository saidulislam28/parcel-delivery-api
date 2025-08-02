import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const Login = async (data: Partial<IUser>) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new Error("User not found!!");
  }
};

export const AuthService = {
  Login,
};
