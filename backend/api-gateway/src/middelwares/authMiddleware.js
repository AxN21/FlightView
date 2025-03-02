const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'secret-key', (err, decoded) => {
            if (err) return res.status(401).send('Unauthorized');
            req.user = decoded;
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
};