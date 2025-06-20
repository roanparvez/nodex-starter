import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const port = ENV.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(port, () => {
      logger.info(`Server is running on port: ${port}`);
    });

    // Graceful Shutdown
    const shutdown = async () => {
      logger.info("Graceful shutdown initiated...");

      try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed.");
      } catch (err) {
        logger.error("Error closing MongoDB connection:", err);
      }

      server.close(() => {
        logger.info("Server closed successfully.");
        process.exit(0);
      });

      setTimeout(() => {
        logger.warn("Force exit after 10 seconds.");
        process.exit(1);
      }, 10_000);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
