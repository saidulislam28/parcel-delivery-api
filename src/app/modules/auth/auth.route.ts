import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getAccessToken);
router.post("/logout", AuthController.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthController.ResetPassword
);

export const AuthRoutes = router;
