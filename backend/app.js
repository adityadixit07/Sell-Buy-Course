import { config } from "dotenv";
import express from "express";
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import ErrorMiddware from "./middlewares/Error.js";
import cookieParser from 'cookie-parser'
const app = express();

config({
  path: "./config/config.env",
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: "true",
  })
);
app.use(cookieParser());

// routes
app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;

app.use(ErrorMiddware);
