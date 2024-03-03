import mongoose from "mongoose";
import { MONGO_URI } from "../config/server.config.js";

export default async function connectMongoDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error.message);
  }
}
