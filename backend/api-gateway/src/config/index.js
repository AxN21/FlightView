require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    DATA_SERVICE_URL: process.env.DATA_SERVICE_URL,
    VISUALIZATION_SERVICE_URL: process.env.VISUALIZATION_SERVICE_URL,
};