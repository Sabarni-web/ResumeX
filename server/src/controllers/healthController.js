const pythonApiService = require('../services/pythonApiService');
const { successResponse } = require('../utils/responseFormatter');

// @desc    Health check for server and ML service
// @route   GET /api/health
const healthCheck = async (req, res) => {
  const mlHealth = await pythonApiService.checkHealth();

  successResponse(res, {
    server: 'ok',
    database: 'connected',
    mlService: mlHealth.status || 'unavailable',
    timestamp: new Date().toISOString(),
  }, 'Health check');
};

module.exports = { healthCheck };
