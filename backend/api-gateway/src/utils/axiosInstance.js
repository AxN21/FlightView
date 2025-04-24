const axios = require('axios');

const axiosInstance = axios.create({
    timeout: 5000, // Set a timeout for requests
});

module.exports = axiosInstance;
