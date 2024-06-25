import React, { useEffect, useState } from 'react';
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { FiInfo } from "react-icons/fi";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Toaster, toast } from 'react-hot-toast';

const CoinDetailInfo = ({ coin }) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    const customStyle = {
        strokeWidth: 0.7,

    };

    const renderDescription = () => {
        if (isExpanded) {
            return coin.description;
        }
        if (coin.description.length > 200) {
            return `${coin.description.substring(0, 200)}...`;
        }
        return coin.description;
    };

    function formatMarketCap(marketCap) {
        if (marketCap >= 1e12) {
            return (marketCap / 1e12).toFixed(2) + 'T';
        } else if (marketCap >= 1e9) {
            return (marketCap / 1e9).toFixed(2) + 'B';
        } else if (marketCap >= 1e6) {
            return (marketCap / 1e6).toFixed(2) + 'M';
        } else {
            return marketCap.toString();
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const formattedGenesisDate = coin.genesisDate ? formatDate(coin.genesisDate) : 'N/A';


    const handleClosedFeature = () => {
        toast('This feature is currently closed.', {
        icon: <div className="toast-icon text-blue-950">ℹ️</div>,
          className: "blue-glassmorphism-toast" 
        }, {className: "blue-glassmorphism-toast" });
      };

    const low = coin.low24h;
    const high = coin.high24h;
    const current = coin.price;

    const position = ((current - low) / (high - low)) * 100;

    return (
        <div className='  p-5'>
            <Toaster></Toaster>
            <div className=' flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center justify-start gap-1'>
                    <img className='w-7' src={coin.image} alt={coin.name} />
                    <h1 className='text-md font-medium'>{coin.name}</h1>
                    <p className='text-xs text-white/80 pt-0.5'>{coin.symbol}</p>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <div className='cursor-pointer bg-white/20 hover:bg-white/30 rounded-md p-1 ' onClick={handleClosedFeature}>
                        <CiStar style={customStyle} />
                    </div>
                    <div className='cursor-pointer bg-white/20 hover:bg-white/30 rounded-md p-1' onClick={handleClosedFeature}>
                        <CiShare2 style={customStyle} />
                    </div>

                </div>
            </div>

            <div className='mt-4 flex flex-col gap-1'>
                <p className='text-4xl font-semibold tracking-wider'>${coin.price}</p>

                {coin.priceChangePercentage24h > 0 ? (
                    <div className='flex items-center justify-start gap-1.5'>

                        <svg className="  fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                            width="10px" height="10px"
                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                        </svg>
                        <p className='text-sm tracking-wider font-medium text-green-400 '>
                            {coin.priceChangePercentage24h?.toFixed(2)}%
                        </p>
                        <p className='text-sm tracking-wider font-medium  text-green-400  '>
                            (1d)
                        </p>

                    </div>
                ) : (
                    <div className='flex items-center justify-start'>
                        <svg className="  fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                            width="10px" height="10px"
                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                            transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                        </svg>
                        <p className='text-sm tracking-wider font-medium text-red-600 '>
                            {coin.priceChangePercentage24h?.toFixed(2)}%
                        </p>
                        <p className='text-sm tracking-wider font-medium text-red-600 '>
                            (1d)
                        </p>
                    </div>
                )}
            </div>

            <div className='flex flex-col mt-3 bg-white/10 p-1 px-3 rounded-md gap-2'>
                <div className='text-sm flex flex-row items-center justify-between font-medium text-white/80'>
                    <p >In all portfolios</p>
                    <p className='text-xl font-normal cursor-pointer' onClick={handleClosedFeature}>+</p>
                </div>
                <p className='text-xl font-medium text-white pb-1 tracking-wider'>$668.45</p>
            </div>

            <div className='flex flex-col mt-4 gap-1'>
                <div className='flex flex-row gap-1.5 items-center text-white/80  cursor-pointer' >
                    <p className='text-sm font-medium text-white/80'>Market Capitalization</p>
                    <FiInfo />
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <p className='tracking-wider text-white font-medium text-xl'>${formatMarketCap(coin.marketcap)}</p>
                    {coin.marketCapChangePercentage24h > 0 ? (
                        <div className='flex items-center justify-start gap-1.5'>

                            <svg className="  fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm tracking-wider font-medium text-green-400 '>
                                {coin.marketCapChangePercentage24h?.toFixed(2)}%
                            </p>
                            <p className='text-sm tracking-wider font-medium  text-green-400  '>
                                (1d)
                            </p>

                        </div>
                    ) : (
                        <div className='flex items-center justify-start'>
                            <svg className="  fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                                transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm tracking-wider font-medium text-red-600 '>
                                {coin.marketCapChangePercentage24h?.toFixed(2)}%
                            </p>
                            <p className='text-sm tracking-wider font-medium text-red-600 '>
                                (1d)
                            </p>
                        </div>
                    )}
                </div>
            </div>


            <div className='flex flex-col mt-4 gap-1'>
                <div className='flex flex-row gap-1.5 items-center text-white/80  cursor-pointer' >
                    <p className='text-sm font-medium text-white/80'>Volume</p>
                    <FiInfo />
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <p className='tracking-wider text-white font-medium text-xl'>${formatMarketCap(coin.volume)}</p>
                    {coin.marketCapChangePercentage24h > 0 ? (
                        <div className='flex items-center justify-start gap-1.5'>

                            <svg className="  fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm tracking-wider font-medium text-green-400 '>
                                {coin.marketCapChangePercentage24h?.toFixed(2)}%
                            </p>
                            <p className='text-sm tracking-wider font-medium  text-green-400  '>
                                (1d)
                            </p>

                        </div>
                    ) : (
                        <div className='flex items-center justify-start'>
                            <svg className="  fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                width="10px" height="10px"
                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                                transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                            </svg>
                            <p className='text-sm tracking-wider font-medium text-red-600 '>
                                {coin.marketCapChangePercentage24h?.toFixed(2)}%
                            </p>
                            <p className='text-sm tracking-wider font-medium text-red-600 '>
                                (1d)
                            </p>
                        </div>
                    )}
                </div>

            </div>

            <div className='flex flex-col mt-4 gap-1'>
                <div className='flex flex-row gap-1.5 items-center text-white/80 cursor-pointer'>
                    <p className='text-sm font-medium text-white/80'>Price performance</p>
                    <FiInfo />
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div>
                        <p className='text-xs text-white/80 font-medium'>Low</p>
                        <p className='text-sm text-white font-medium text-right'>${low}</p>
                    </div>
                    <div>
                        <p className='text-xs text-white/80 font-medium text-right'>High</p>
                        <p className='text-sm text-white font-medium text-right'>${high}</p>
                    </div>
                </div>
                <div className='relative mt-2'>
                    <div className='h-0.5 bg-white/40 w-full relative'>
                        <div
                            className='absolute bottom-0 h-2 bg-white '
                            style={{ left: `${position}%`, transform: 'translateX(-50%)', width: '3px' }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mt-7 bg-white/10 p-2 px-3 rounded-md gap-2'>
                <div className='text-sm flex flex-row items-center justify-between font-medium text-white/80'>
                    <p>Token description</p>
                    <button onClick={toggleExpand} className="focus:outline-none">
                        {isExpanded ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                    </button>
                </div>
                <p className='text-white text-justify w-56  text-xs tracking-wider'>{renderDescription()}</p>
            </div>

            <div className='flex flex-col mt-4 gap-1'>
                <div className='flex flex-row gap-1.5 items-center text-white/80  justify-between' >
                    <div className='flex flex-row gap-1.5 items-center text-white/80  cursor-pointer'>
                        <p className='text-sm font-medium text-white/80'>Genesis date</p>
                        <FiInfo />
                    </div>
                    <p className='text-sm text-white font-medium'> {formattedGenesisDate}</p>
                </div>

            </div>


        </div>
    );
};

export default CoinDetailInfo;
