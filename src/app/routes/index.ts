import { Router } from "express";
import { userExport } from "../modules/user/user.routes";

export const router = Router();

const routeModule = [
  {
    path: "/user",
    route: userExport,
  },
];

routeModule.forEach((route) => {
  router.use(route.path, route.route);
});
