import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { MdOutlineCandlestickChart, MdOutlineAutoGraph } from "react-icons/md";
import Forecast from './Forecast';

const Graph = ({ coinSymbol }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [days, setDays] = useState('7');
    const [activeButton, setActiveButton] = useState('7');
    const [activeChartType, setActiveChartType] = useState('line');
    const [historicalData, setHistoricalData] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const interval = getInterval(days);
                const response = await axios.get('https://api.binance.com/api/v3/klines', {
                    params: {
                        symbol: coinSymbol,
                        interval: interval,
                        limit: getLimit(days),
                    },
                });

                const prices = response.data;
                const labels = prices.map(price => new Date(price[0]).toLocaleDateString());
                const data = prices.map(price => parseFloat(price[4])); // Close price

                const initialPrice = data[0];

                setHistoricalData(prices.map(price => ({ ds: new Date(price[0]).toISOString(), y: parseFloat(price[4]) })));

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Price',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'transparent',
                            borderColor: ctx => {
                                const currentIndex = ctx.p0DataIndex;
                                return data[currentIndex] >= initialPrice ? 'green' : 'red';
                            },
                            borderWidth: 2,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'transparent',
                            pointBackgroundColor: 'transparent',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: ctx => {
                                const currentIndex = ctx.index;
                                return data[currentIndex] >= initialPrice ? 'green' : 'red';
                            },
                            pointHoverBorderColor: ctx => {
                                const currentIndex = ctx.index;
                                return data[currentIndex] >= initialPrice ? 'green' : 'red';
                            },
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data,
                            segment: {
                                borderColor: ctx => {
                                    const currentIndex = ctx.p0DataIndex;
                                    return data[currentIndex] >= initialPrice ? 'green' : 'red';
                                }
                            }
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptoData();
    }, [days, coinSymbol]);

    const getLimit = (days) => {
        switch (days) {
            case '1':
                return 24*7 // 48 hours
            case '7':
                return 7 * 24; // 7 days with 1-hour intervals
            case '30':
                return 30*6; // 30 days with 1-hour intervals
            case '365':
                return 365; // 365 days with 1-hour intervals
            default:
                return 1000; // Maximum number of data points
        }
    };

    const getInterval = (days) => {
        switch (days) {
            case '1':
                return '5m'; // 30-minute intervals for 1 day
            case '7':
                return '1h'; // 1-hour intervals for 7 days
            case '30':
                return '4h'; // 2-hour intervals for 30 days
            case '365':
                return '1d'; // 1-day intervals for 365 days
            default:
                return '3d'; // Default interval
        }
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const index = context.dataIndex;
                        
                        const price = context.dataset.data[index];
                        return `Price: ${price}`;
                    },
                    labelColor: function(context) {
                        const index = context.dataIndex;
                        const color = context.dataset.data[index] >= context.dataset.data[0] ? 'green' : 'red';
                        return {
                            borderColor: color,
                            backgroundColor: color,
                            borderWidth: 0,
                            borderRadius: 5, // Makes the tooltip color indicator a circle
                            pointStyle: 'circle', // Ensures the indicator is a circle
                        };
                    },
                },
                displayColors: true,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        hover: {
            mode: 'index',
            intersect: false,
        },
    };

    const handleDaysClick = (value) => {
        setDays(value);
        setActiveButton(value);
    };

    const handleChartTypeClick = (type) => {
        setActiveChartType(type);
    };

    return (
        <div className='w-full pt-5'>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-start gap-2  '>
                    <div className='flex p-1 rounded-md  flex-row bg-white/10  gap-1 items-center'>
                        <button className=" bg-white/30 px-1 py-0.5 text-xs text-white rounded" >Price</button>
                        <button className="  text-xs px-1 py-0.5 text-white rounded" >Market Cap</button>
                    </div>
                    <div className='flex p-1 rounded-md  flex-row bg-white/10  gap-2 items-center'>
                        <button
                            className={`bg-white/30 px-1 py-0.5 text-xs text-white rounded ${activeChartType === 'line' ? 'bg-blue-500' : ''}`}
                            onClick={() => handleChartTypeClick('line')}
                        >
                            <MdOutlineAutoGraph size={16} />
                        </button>
                        <button
                            className={`bg-white/30 px-1 py-0.5 text-xs text-white rounded ${activeChartType === 'candlestick' ? 'bg-blue-500' : ''}`}
                            onClick={() => handleChartTypeClick('candlestick')}
                        >
                            <MdOutlineCandlestickChart size={16} />
                        </button>
                    </div>
                </div>
                <div className='flex p-1 rounded-md  flex-row bg-white/10  gap-2 items-center '>
                    <button
                        className={`px-1 py-0.5 text-xs text-white rounded ${activeButton === '1' ? 'bg-white/30 ' : 'bg-white/0 hover:bg-white/10'}`}
                        onClick={() => handleDaysClick('1')}
                    >
                        1D
                    </button>
                    <button
                        className={`px-1 py-0.5 text-xs text-white rounded ${activeButton === '7' ? 'bg-white/30' : 'bg-white/0 hover:bg-white/10'}`}
                        onClick={() => handleDaysClick('7')}
                    >
                        7D
                    </button>
                    <button
                        className={`px-1 py-0.5 text-xs text-white rounded ${activeButton === '30' ? 'bg-white/30' : 'bg-white/0 hover:bg-white/10'}`}
                        onClick={() => handleDaysClick('30')}
                    >
                        1M
                    </button>
                    <button
                        className={`px-1 py-0.5 text-xs text-white rounded ${activeButton === '365' ? 'bg-white/30' : 'bg-white/0 hover:bg-white/10'}`}
                        onClick={() => handleDaysClick('365')}
                    >
                        1Y
                    </button>
                    <button
                        className={`px-1 py-0.5 text-xs text-white rounded ${activeButton === 'max' ? 'bg-white/30' : 'bg-white/0 hover:bg-white/10'}`}
                        onClick={() => handleDaysClick('max')}
                    >
                        All
                    </button>
                </div>
            </div>
            <div className='relative w-full mt-5 h-[500px]'>
                <Line data={chartData} options={options} />
            </div>
            {/* <Forecast historicalData={historicalData} /> */}
        </div>
    );
};

export default Graph;
