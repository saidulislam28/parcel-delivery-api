import cors from "cors";
import express from "express";
import { globalMiddleHandler } from "./middleware/globalErrorHandler";
import { router } from "./routes";
import NotFoundRoute from "./middleware/not_Found";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully run",
    success: true,
  });
});

app.use(globalMiddleHandler);

app.use(NotFoundRoute);

export default app;
