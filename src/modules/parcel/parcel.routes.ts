import { Router } from "express";
import { ParcelController } from "./parcel.controller";
import { CheckAuth } from "../../helpers/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/create", ParcelController.CreateParcel);
router.get("/", CheckAuth(Role.ADMIN), ParcelController.GetAllParcel);
router.get(
  "/user-parcel",
  CheckAuth(Role.SENDER),
  ParcelController.GetSingleUserParcel
);
router.get(
  "/cancel-parcel/:id",
  CheckAuth(Role.SENDER),
  ParcelController.CancelParcel
);
router.get(
  "/receiver-parcel",
  CheckAuth(Role.RECEIVER),
  ParcelController.GetReceiverParcel
);

export const ParcelRouter = router;
