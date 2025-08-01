import { Request, Response, Router } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log("I'm here");
});

export const userExport = router;
