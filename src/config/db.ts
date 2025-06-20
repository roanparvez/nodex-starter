import mongoose from "mongoose";
import { ENV } from "./env.js";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  mongoose
    .connect(ENV.MONGO_URI)
    .then((data) =>
      logger.info(`MongoDB connected to: ${data.connection.host}`)
    )
    .catch((error) => {
      logger.error(`MongoDB connection error: ${error.message}`);
      process.exit(1); // Exit the process if connection fails
    });
};
