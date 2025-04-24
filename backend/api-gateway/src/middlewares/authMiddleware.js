const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ status: 'error', message: 'Token is missing'});
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded user:', decoded);

        req.user = { id: decoded.user_id, username: decoded.username };
        next();
    } catch (err) {
        return res.status(401).json({ status: 'error', message: 'Invalid or expired token'});
    }
};

module.exports = authMiddleware;
