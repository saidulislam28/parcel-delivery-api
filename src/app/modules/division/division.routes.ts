import { Router } from "express";
import { divisionController } from "./division.controller";

const router = Router();

router.post("/create", divisionController.CreateDivision);
router.get("/", divisionController.GetAllDivision);
router.patch("/:id", divisionController.UpdateDivision);

export const DivisionRoutes = router;
