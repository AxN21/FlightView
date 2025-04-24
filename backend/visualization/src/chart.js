const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Function to generate a chart
const generateChart = async (data, type) => {
    const width = 800; // px
    const height = 600; // px
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const configuration = {
        type: type,
        data: {
            labels: data.map(d => d.time),
            datasets: [
                {
                    label: 'Altitude',
                    data: data.map(d => d.altitude),
                    borderColor: 'blue',
                    fill: false,
                },
            ],
        },
    };

    return await chartJSNodeCanvas.renderToDataURL(configuration);
};

module.exports = { generateChart };
