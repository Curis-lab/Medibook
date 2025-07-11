import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";

import BaseRouter from "./routes/index.js";

dotenv.config();
const connectDB = async () => {
  mongoose.set("strictQuery", false);

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb database is connected.");
  } catch (err) {
    console.log("Mongodb database is connection field.", err);
  }
};

export function startHTTPServer() {
  const app = express();
  const port = process.env.PORT || 8000;

  const corsOptions = {
    origin: true,
  };

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/v1", BaseRouter);

  app.listen(port, () => {
    connectDB();
    console.log("Server is lived.");
  });
}
