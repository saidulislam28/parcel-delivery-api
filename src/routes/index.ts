import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.routes";
import { AuthRoutes } from "../app/modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
