import React, { useEffect, useState } from "react";

const PortfolioBaseStatistics = ({ portfolioAssets }) => {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    // Початкове значення для зберігання суми профіту
    let totalProfit = 0;
    let initialPortfolioValue = 0;
    let currentPortfolioValue = 0;
    let allTimeProfitPercentage = 0;
    let bestPerformer = null; // Найкращий актив
    let worstPerformer = null; // Найгірший актив

    if (portfolioAssets && portfolioAssets.length > 0) {
        // Використовуємо метод map для перебору елементів масиву
        portfolioAssets.forEach((asset) => {
            if (asset.hasOwnProperty('profit')) {
                // Додаємо профіт до загальної суми
                totalProfit += parseFloat(asset.profit);
                initialPortfolioValue += parseFloat(asset.holdings * asset.avgBuyPrice);
                currentPortfolioValue += parseFloat(asset.holdings * asset.price);


                if (bestPerformer === null || asset.profit > bestPerformer.profit) {
                    bestPerformer = asset;
                }
                if (worstPerformer === null || asset.profit < worstPerformer.profit) {
                    worstPerformer = asset;
                }
            }

        });
        totalProfit = totalProfit.toFixed(2);
        allTimeProfitPercentage = (((currentPortfolioValue - initialPortfolioValue) / initialPortfolioValue) * 100).toFixed(2);

    }

    

    useEffect(() => {
        if (bestPerformer !== null && worstPerformer !== null) {
            setIsDataLoaded(true);
        }
    }, [bestPerformer, worstPerformer]);


    return (
        <div className="">
            {isDataLoaded ? (
            <div className='flex justify-start my-10'>
                <div className="flex-row imets-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-sm  text-gray-300'>All-time profit</p>
                    {totalProfit > 0 ? (
                        <p className='text-xl font-bold text-green-400'>+ ${totalProfit} </p>
                    ) : (
                        <p className='text-xl font-bold text-red-600'>- ${totalProfit * (-1)}</p>
                    )}
                    {allTimeProfitPercentage > 0 ? (
                        <div className='flex items-center  mt-1'>
                            <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm font-light text-green-400 ml-1 '>
                                {allTimeProfitPercentage}%
                            </p>
                        </div>
                    ) : (

                        <div className='flex items-center  mt-1'>
                            <svg className="fill-red-600" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm font-light text-red-600 ml-1 '>
                                {allTimeProfitPercentage * (-1)}%
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex-row mx-10 imets-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-sm  text-gray-300'>Best permormer</p>
                    <div className="flex items-center">
                        <img className="w-6 mr-2" src={bestPerformer.image} alt="" />
                        <p className='text-xl font-bold text-white'>{bestPerformer.symbol}</p>
                    </div>
                    <div className='flex items-center  mt-1'>
                        <p className='text-sm font-light tracking-wider text-green-400 py-1"'>
                            + ${bestPerformer.profit}
                        </p>
                        <svg className="ml-2 mr-0.5 fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                            width="10px" height="10px"
                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                        </svg>
                        <p className='text-sm font-light text-green-400 '>
                            {bestPerformer.profitPercentage}%
                        </p>
                    </div>

                </div>
                <div className="flex-row imets-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-sm  text-gray-300'>Worst Performer</p>
                    <div className="flex items-center">
                        <img className="w-6 mr-2" src={worstPerformer.image} alt="" />
                        <p className='text-xl font-bold text-white'>{worstPerformer.symbol}</p>
                    </div>
                    <div className='flex flex-row items-center mt-1'>
                        <p className='text-sm font-light tracking-wider text-red-600 py-1"'>
                            - ${worstPerformer.profit * (-1)}
                        </p>
                        <svg className='ml-2 mr-0.5' fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                            width="10px" height="10px"
                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                        </svg>
                        <p className='text-sm font-light text-red-600 '>
                            {worstPerformer.profitPercentage}%
                        </p>
                    </div>

                </div>

            </div>
            ) : (
                // Повідомлення про очікування, поки дані завантажуються
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default PortfolioBaseStatistics;