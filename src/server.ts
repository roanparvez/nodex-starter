import app from "./app.js";
import logger from "./utils/logger.js";

const port = 3000;

const server = app.listen(port, () => {
  logger.info(`Server is running on: http://localhost:${port}`);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down server...");
  server.close(() => {
    logger.info("Server closed.");
    process.exit(0);
  });
});

// Export the server for testing purposes
export default server;
