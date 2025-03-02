const cache = require('memory-cache');

module.exports = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = cache.get(key);
    if (cachedBody) {
        res.send(cachedBody);
    } else {
        res.sendResponse = res.send;
        res.send = (body) => {
            cache.put(key, body, 10 * 1000); // cache for 10 seconds
            res.sendResponse(body);
        };
        next();
    }
};