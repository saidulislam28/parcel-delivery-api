import express from "express";
import { UserRoutes } from "./app/modules/user/user.routes";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", UserRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully run",
    success: true,
  });
});

export default app;
