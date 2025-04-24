const express = require('express');
const { login } = require('../controllers/authController');
const { registerUser, changeUsername } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// login endpoint
router.post('/login', login);
router.post('/register', registerUser);
router.post('/profile', authMiddleware, changeUsername);

module.exports = router;