/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const starterServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saidulislams9028:rp6idvjsAZjfqFlv@cluster0.a1ptd7f.mongodb.net/tour-management-db"
    );

    console.log("connected to db");

    server = app.listen(5000, () => {
      console.log("server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

starterServer();

process.on("unhandledRejection", (err) => {
  console.log("unhandled rejection detected.. server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.log("uncaught Exception detected.. server shutting down", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("uncaught Exception detected.. server shutting down");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("server shutting down manually");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

export default app;
