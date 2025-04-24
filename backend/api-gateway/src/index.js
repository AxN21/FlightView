const express = require('express');
const { PORT } = require('./config');
const routes = require('./routes');
const setupLogging = require('./middlewares/loggingMiddleware');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Setup logging middleware
setupLogging(app);

// Register routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
