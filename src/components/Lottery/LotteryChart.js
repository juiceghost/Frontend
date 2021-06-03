import React from 'react';
import { Line } from 'react-chartjs-2';


const LotteryChart = () => {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                label: 'Pool Size',
                data: [12, 19, 30, 50, 20, 30, 60, 70, 100, 80, 12, 19, 30, 50, 20, 30, 60, 70, 100, 80],
                fill: false,
                backgroundColor: '#4DD9F6',
                borderColor: '#4DD9F6',
                yAxisID: 'y',
            },

            {
                label: 'Burned',
                data: [5, 19, 30, 40, 10, 30, 20, 50, 90, 30, 19, 30, 40, 10, 30, 20, 50, 90, 30],
                fill: false,
                backgroundColor: '#3F6A73',
                borderColor: '#3F6A73',
                yAxisID: 'y1',
            },
        ],
    };

    const options = {

        plugins: {
            legend: {
                display: false,
            }
        },
        elements: {
            point: {
                radius: 0
            },
        },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                beginAtZero: true,
                ticks: {
                    stepSize: 20,
                    min: 0,
                },
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                beginAtZero: true,

                ticks: {
                    stepSize: 20,
                    min: 0,
                    color: "#4DD9F6",
                },
                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        },
    };
    return (<Line data={data} options={options} />);
}

export default LotteryChart;