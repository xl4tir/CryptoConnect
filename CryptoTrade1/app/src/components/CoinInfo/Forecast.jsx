import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Forecast = ({ historicalData }) => {
    const [forecastData, setForecastData] = useState([]);


    const API_URL = 'http://localhost:8061/api/forecast';

    const api = axios.create({
        baseURL: API_URL,
        withCredentials: true,
    });

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                console.log(historicalData)
                const response = await api.post('/',  { data: historicalData });
                setForecastData(JSON.parse(response.data));
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchForecast();
    }, [historicalData]);

    const chartData = {
        labels: forecastData.map(data => data.ds),
        datasets: [
            {
                label: 'Прогноз ціни',
                data: forecastData.map(data => data.yhat),
                borderColor: 'blue',
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
            },
        },
    };

    return (
        <div>
            <h2>Прогноз цін на криптовалюту</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default Forecast;
