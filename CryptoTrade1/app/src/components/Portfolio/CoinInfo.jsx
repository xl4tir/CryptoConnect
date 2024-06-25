import { AiOutlineDelete } from "react-icons/ai";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const CoinInfo = ({ coin, onCoinClick }) => {

    const isProfit = parseFloat(coin.profit) > 0;

    return (
        <div className="flex flex-col ">
            <div className="coin-info w-full flex flex-row justify-between items-center">
                <div lassName="flex flex-col w-full">
                    <div className="flex flex-row gap-2 justify-start w-full items-center">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            onClick={() => onCoinClick(null)}
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={2} stroke="white"
                            className="size-7 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>

                        <img src={coin.image} alt="" className="w-8 ml-1" />

                        <p className="text-lg font-semibold text-gray-300 py-1">{coin.cryptocurrency}</p>
                        <p className="text-lg font-semibold text-gray-300 py-1">({coin.symbol})</p>
                    </div>
                    <p className="mt-3 font-semibold text-4xl">${coin.holdingsUSD}</p>
                </div>
                <div className="flex flex-row">
                    <button
                        className="text-white text-xs py-2 px-4 mx-4 h-max rounded-md border border-[#2952e3] cursor-pointer hover:bg-[#2952e3]"
                        type="submit"

                    >
                        + Add Transaction
                    </button>
                    <div className=' cursor-pointer  bg-inherit 
                 text-white rounded-md hover:bg-red-600 flex border-solid 
                border border-red-600 p-1.5'>
                        <AiOutlineDelete size={20} />
                    </div>
                </div>
            </div>

            <div>
                <div className='flex justify-start my-10'>

                    <div className="flex-row items-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                        <p className='text-sm text-gray-300'>Amount	</p>
                        <div className="flex items-center">

                            <p className='text-2xl font-semibold text-white'>{coin.holdings} {coin.symbol}</p>
                        </div>

                    </div>

                    <div className="flex-row mx-10 items-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                        <p className='text-sm text-gray-300'>Avr. purchase price	</p>
                        <div className="flex items-center">

                            <p className='text-2xl font-semibold text-white'>{coin.avgBuyPrice} {coin.symbol}</p>
                        </div>

                    </div>

                    <div className="flex-row items-center w-max shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                        <p className='text-sm text-gray-300'>Total profit / loss</p>
                        <div className="flex items-start flex-col justify-start">
                            <p className={`text-2xl font-semibold ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                {isProfit ? '+' : '-'} ${isProfit ? coin.profit : coin.profit * (-1)}
                            </p>
                            <div className="flex flex-row items-center gap-1">
                                <p className={`text-sm font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                    {isProfit ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </p>
                                <p className={`text-sm font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                    {isProfit ? coin.profitPercentage : coin.profitPercentage*(-1)}%
                                </p>
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </div>
    );
};

export default CoinInfo;
