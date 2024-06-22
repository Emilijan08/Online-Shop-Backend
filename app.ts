import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth";
import productRouter from "./routes/product";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["https://device-destination.vercel.app", "http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/products", productRouter);

export default app;
