const axios = require('../utils/axiosInstance');
const { DATA_SERVICE_URL } = require('../config');

const processCSV = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        // Forward the file to the data analysis service
        const response = await axios.post(
            `${DATA_SERVICE_URL}/data/process`,
            req.file.buffer, // Send the raw file buffer
            {
                headers: {
                    'Content-Type': req.file.mimetype, // Pass the file type (e.g., text/csv)
                },
            }
        );

        // Send the response back to the frontend
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error processing file:', error.message);

        // Handle Axios errors
        if (error.response) {
            return res.status(error.response.status).send(error.response.data);
        }

        res.status(500).send({ error: 'Error processing file' });
    }
};

module.exports = {
    processCSV,
};
