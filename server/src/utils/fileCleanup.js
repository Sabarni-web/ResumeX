const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      logger.info(`Deleted file: ${filePath}`);
    }
  } catch (error) {
    logger.error(`Error deleting file ${filePath}: ${error.message}`);
  }
};

const cleanTempFolder = () => {
  const tempDir = path.join(__dirname, '../uploads/temp');
  try {
    if (fs.existsSync(tempDir)) {
      const files = fs.readdirSync(tempDir);
      files.forEach((file) => {
        if (file !== '.gitkeep') {
          const filePath = path.join(tempDir, file);
          const stat = fs.statSync(filePath);
          const now = Date.now();
          const endTime = new Date(stat.mtime).getTime() + 3600000; // 1 hour
          if (now > endTime) {
            fs.unlinkSync(filePath);
            logger.info(`Cleaned temp file: ${file}`);
          }
        }
      });
    }
  } catch (error) {
    logger.error(`Error cleaning temp folder: ${error.message}`);
  }
};

module.exports = { deleteFile, cleanTempFolder };
