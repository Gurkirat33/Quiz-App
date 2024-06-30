import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/Routes/user.routes.js";
import geminiRouter from "./src/Routes/gemini.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(cookieParser());

// routes
app.use("/api/v1/user", userRouter);

app.use("/api/v1/gemini", geminiRouter);

export { app };
