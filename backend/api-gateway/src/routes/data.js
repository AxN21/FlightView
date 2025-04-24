const express = require('express');
const { processCSV } = require('../controllers/dataController');
const authMiddleware = require('../middlewares/authMiddleware');
const axios = require('../utils/axiosInstance');
const { DATA_SERVICE_URL } = require('../config');
const multer = require('multer');

const router = express.Router();
const upload = multer();

//Route to process CSV files
router.post('/upload', upload.single('file'), processCSV);

router.get('/protected', authMiddleware, async (req, res) => {
    try {
        const response = await axios.get(`${DATA_SERVICE_URL}/data/protected`, {
            headers: {
                'X-User-Info': JSON.stringify(req.user), // forwared user info as a custom header
            },
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.log('Error forwarding request:', error.message);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

module.exports = router;
