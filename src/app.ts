import cors from "cors";
import express from "express";
import { globalMiddleHandler } from "./middleware/globalErrorHandler";
import { router } from "./routes";
const app = express();

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

export default app;
