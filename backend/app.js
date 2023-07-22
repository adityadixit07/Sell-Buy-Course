import { config } from "dotenv";
import express from "express";
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";
import ErrorMiddware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
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

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods:["GET","POST","PUT","DELETE"]
  })
);

// routes
app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);

export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1> Server is Working. Click <a href=${process.env.FRONTEND_URL}>Here</a> to visit frontend.  </h1>`
  )
);

app.use(ErrorMiddware);
