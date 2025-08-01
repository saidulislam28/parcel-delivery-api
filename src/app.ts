import cors from "cors";
import express from "express";
// import cookieParser from "cookie-parser";
// import passport from "passport";
import { router } from "./app/routes";

const app = express();
// app.use(
//   expressSession({
//     secret: envVars.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Successfully run",
    success: true,
  });
});

// app.use(globalMiddleHandler);

// app.use(NotFoundRoute);

export default app;
