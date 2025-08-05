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
router.post(
  "/cancel-parcel/:id",
  CheckAuth(Role.SENDER),
  ParcelController.CancelParcel
);
router.post(
  "/receiver-delivered/:id",
  CheckAuth(Role.RECEIVER),
  ParcelController.DeliveredParcel
);
router.get(
  "/receiver-parcel",
  CheckAuth(Role.RECEIVER),
  ParcelController.GetReceiverParcel
);

export const ParcelRouter = router;
