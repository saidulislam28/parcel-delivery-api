
import express from "express";


const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully run",
    success: true,
  });
});

export default app;