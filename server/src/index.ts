import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import shopRoutes from "./routes/shops";
import cookieParser from "cookie-parser";
import path from "path";
import cron from "node-cron";

const PORT = 8080;

try {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  console.log("database connected");
} catch (error) {
  console.log("error connecting to mongoDB:", error);
}

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../../../client/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../../../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const url = "https://find-me-a-coffee-shop.onrender.com/";

cron.schedule("*/10 * * * *", async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`HTTP error while pinging at ${new Date()}`);
    }

    console.log(`Successfully pinged at ${new Date()}`);
  } catch (error) {
    console.log(`error while pinging at ${new Date()}`, error);
  }
});
