const express = require('express');
const userRoutes = require('./user');
const dataRoutes = require('./data');
const visualizationRoutes = require('./visualization');


const router = express.Router();

router.use('/user', userRoutes);
router.use('/data', dataRoutes);
router.use('/visualize', visualizationRoutes);

module.exports = router;