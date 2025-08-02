import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create", UserController.CreateUser);
router.get("/all-users", UserController.GetAllUser);
router.patch("/:id", UserController.UpdateUser);

export const userExport = router;
