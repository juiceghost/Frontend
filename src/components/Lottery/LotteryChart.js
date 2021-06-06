import React from 'react';
import { Line } from 'react-chartjs-2';


const LotteryChart = ({idList, poolData, burnedData}) => {
    const data = {
        labels: idList,
        datasets: [
            {
                label: 'Pool Size',
                data: poolData,
                fill: false,
                backgroundColor: '#4DD9F6',
                borderColor: '#4DD9F6',
                yAxisID: 'y',
                animation: false,
            },

            {
                label: 'Burned',
                data: burnedData,
                fill: false,
                backgroundColor: '#3F6A73',
                borderColor: '#3F6A73',
                yAxisID: 'y1',
                animation: false,
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