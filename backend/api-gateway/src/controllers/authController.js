const axios = require('axios');
const { USER_SERVICE_URL } = require('../config');
const { generateToken } = require('../utils/jwtUtils');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Forward credentials to the user-management service
        const response = await axios.post(`${USER_SERVICE_URL}/auth/verify`, { username, password });

        const { user_id } = response.data;
        console.log('full response from user-management serviec', response);
        console.log('Response data', response.data);

        if (response.status === 200) {
            // Generate a JWT token
            const token = generateToken({ user_id, username });
            return res.status(200).json({ status: 'success', access_token: token });
        } else {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    login,
};
