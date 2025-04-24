const express = require('express');
const app = express();
const { generateChart } = require('./src/chart');

app.use(express.json());

// Route to generate visualizations
app.get('/visualize', async (req, res) => {
    try {
        // example to generate  a line chart for altitude vs time
        const charData = [
            { time: 0, altitude: 0},
            { time: 1, altitude: 100},
            { time: 2, altitude: 200},
        ];
        const chart = await generateChart(charData, 'line');

        res.status(200).send({ chart })
    }catch (error) {
        res.status(500).send({ error: "Error generating visualization" });
    }
});


app.listen(3001, () => {
    console.log('Visualization service running on port 3001');
});
