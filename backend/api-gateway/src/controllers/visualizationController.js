const axios = require('../utils/axiosInstance');
const { VISUALIZATION_URL } = require('../config');

const getVisualization = async (req, res) => {
    try {
        const response = await axios.get(`${VISUALIZATION_URL}/visualize`, { params: req.query });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Error fetching visualization' });
    }
};

module.exports = {
    getVisualization,
}