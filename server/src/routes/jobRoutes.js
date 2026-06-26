const express = require('express');
const router = express.Router();
const { createJob, matchJob, getJobs, getJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');
const { jobDescriptionValidator, jobMatchValidator } = require('../validators/jobValidator');

router.post('/', protect, jobDescriptionValidator, validateRequest, createJob);
router.post('/:id/match', protect, jobMatchValidator, validateRequest, matchJob);
router.get('/', protect, getJobs);
router.get('/:id', protect, getJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;
