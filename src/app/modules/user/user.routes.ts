import { Router } from "express";
import { createUserZod } from "../../../utils/user_zod";
import { userController } from "./user.controller";

import { validateRequest } from "../../../utils/ValidateRequest";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZod),
  userController.createUser
);

router.get("/all-users", userController.getAllUsers);

export const UserRoutes = router;
