const { validateEnv, PORT } = require('./config/env');
const connectDB = require('./config/db');
const app = require('./app');
const logger = require('./utils/logger');
const { cleanTempFolder } = require('./utils/fileCleanup');

// Validate environment variables
validateEnv();

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`ResumeX Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Clean temp folder every hour
setInterval(cleanTempFolder, 3600000);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
