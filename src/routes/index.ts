import { Router } from "express";
import { userExport } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

export const router = Router();

const routeModule = [
  {
    path: "/user",
    route: userExport,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

routeModule.forEach((route) => {
  router.use(route.path, route.route);
});
