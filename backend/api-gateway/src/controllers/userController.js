const axios = require('../utils/axiosInstance');
const { USER_SERVICE_URL } = require('../config');

const registerUser = async (req, res) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/auth/register`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: 'Error registering user' });
    }
};

const changeUsername = async (req, res) => {
    try {
        const userId = req.user.id;
        const { new_username } = req.body;

        // forward the request to the user-management service
        const response = await axios.post(`${USER_SERVICE_URL}/auth/profile/user-id=${userId}`, { new_username });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.log('Error forwarding the username change request:', error.message);

        if (error.response) {
            return res.status(error.response.status).send(error.response.data);
        }

        res.status(500).send({ error: 'An unexpected error occured' });
    }
}


module.exports = {
    registerUser,
    changeUsername,
};
