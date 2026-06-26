const express = require('express');
const router = express.Router();
const { getReports, getReport, deleteReport, getDashboard } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getDashboard);
router.get('/', protect, getReports);
router.get('/:id', protect, getReport);
router.delete('/:id', protect, deleteReport);

module.exports = router;
