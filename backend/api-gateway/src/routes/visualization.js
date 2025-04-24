const express = require('express');
const { getVisualization } = require('../controllers/visualizationController');

const router = express.Router();

// Route to fetch visualizations
router.get('/', getVisualization);

module.exports = router;
