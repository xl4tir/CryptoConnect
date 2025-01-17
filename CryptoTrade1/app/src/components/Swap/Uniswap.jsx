import React, { useState, useEffect, useContext } from 'react';
import { useWeb3 } from '../../context/UniswapContext';
import { TransactionContext } from '../../context/TransactionContext';
import TokenBalance from './TokenBalance';
import AboutSwap from './AboutSwap';
import { toast } from 'react-hot-toast';
import Loader from "../Loader";
import { IoArrowDown } from "react-icons/io5";
import Defiswap from '../SwapMain/Defiswap';

const UniswapComponent = () => {
    const { account, getBalanceETH, getBalance, swapEthToToken, swapTokenToEth, swapTokenToToken, isLoading } = useWeb3();
    const { connectWallet } = useContext(TransactionContext);
    const [balance, setBalance] = useState({
        ETH: 0,
        CoinA: 0,
        CoinB: 0,
        CoinC: 0
    });
    const [ethAmount, setEthAmount] = useState('');
    const [tokenAmount, setTokenAmount] = useState('');
    const [selectedToken, setSelectedToken] = useState('CoinA');
    const [destToken, setDestToken] = useState('CoinB');
    const [srcToken, setSrcToken] = useState('CoinA');
    const [inputAmount, setInputAmount] = useState('');
    const [outputAmount, setOutputAmount] = useState('');
    const [activeSwap, setActiveSwap] = useState('Polygon');

    useEffect(() => {
        const fetchBalances = async () => {
            if (account) {
                const balances = {
                    ETH: await getBalanceETH(account),
                    CoinA: await getBalance('CoinA', account),
                    CoinB: await getBalance('CoinB', account),
                    CoinC: await getBalance('CoinC', account),
                };
                setBalance(balances);
            }
        };
        fetchBalances();
    }, [account, getBalance]);

    const handleInputAmountChange = async (amount) => {
        setInputAmount(amount);
        if (amount === '') {
            setOutputAmount('');
            return;
        }
        if (srcToken === 'ETH') {
            setOutputAmount((amount * 10000).toFixed(3));
        } else if (destToken === 'ETH') {
            setOutputAmount((amount * 0.0001).toFixed(3));
        } else {
            setOutputAmount(amount);
        }
    };

    const handleSwapTokens = () => {
        const temp = srcToken;
        setSrcToken(destToken);
        setDestToken(temp);
        handleInputAmountChange(inputAmount);
    };

    const handleSwap = async () => {
        try {
            if (srcToken === 'ETH') {
                await swapEthToToken(destToken, inputAmount);
            } else if (destToken === 'ETH') {
                await swapTokenToEth(srcToken, inputAmount);
            } else {
                await swapTokenToToken(srcToken, destToken, inputAmount);
            }

        } catch (error) {

            console.error('Swap failed:', error);
            toast.error('Swap failed!', { className: "blue-glassmorphism-toast" });
        }
    };

    return (
        <div >
            <div>

                {account && (
                    <div className='max-w-3xl px-8  flex flex-col items-center justify-between pt-5 sm:pt-10 sm:flex-row m-auto'>
                        <TokenBalance name="CoinA" walletAddress={account} />
                        <TokenBalance name="CoinB" walletAddress={account} />
                        <TokenBalance name="CoinC" walletAddress={account} />
                    </div>
                )}
                {/* {account && (
                    <AboutSwap account={account} />
                )} */}
                <div className="flex flex-row w-full justify-around max-w-md m-auto pt-10">
                    <button
                        className={`bg-inherit p-2 rounded ${activeSwap === 'Polygon' ? ' text-white' : 'hover:text-white/80 text-white/50'}`}
                        onClick={() => setActiveSwap('Polygon')}
                    >
                        Polygon Swap
                    </button>
                    <button
                        className={`bg-inherit p-2 rounded ${activeSwap === 'Sepolia' ? ' text-white' : 'hover:text-white/80 text-white/50'}`}
                        onClick={() => setActiveSwap('Sepolia')}
                    >
                        Sepolia Swap
                    </button>
                </div>
                {activeSwap === 'Polygon' && <Defiswap />}
            </div>



            {activeSwap === 'Sepolia' && (
                <div className="flex justify-center  pb-20">
                    <div className=' max-w-md p-4 px-6 rounded-xl blue-glassmorphism'>
                        <div className='flex items-center justify-between py-4 px-1 text-white font-semibold text-xl'>
                            <p>Sepolia Swap</p>
                        </div>
                        <label htmlFor="price" className="block text-sm ml-2 leading-6 text-gray-300">
                            Balance: {isNaN(Number(balance[srcToken])) ? '0.000' : Number(balance[srcToken]).toFixed(3)} {srcToken}
                        </label>
                        <div className='relative white-glassmorphism p-4 py-6 rounded-xl mb-2 border-[1px] hover:border-zinc-600'>
                            <div className="relative my-2 rounded-md shadow-sm">
                                <input
                                    type="number"
                                    value={inputAmount}
                                    onChange={(e) => handleInputAmountChange(e.target.value)}
                                    className="block font-semibold w-full rounded-md h-8 py-1.5 pl-3 pr-20 text-3xl text-white custom-input no-arrows"
                                    placeholder="0.0"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label htmlFor="currency" className="sr-only">Currency</label>
                                    <select
                                        id="currency"
                                        name="currency"
                                        value={srcToken}
                                        onChange={(e) => setSrcToken(e.target.value)}
                                        className="rounded-md bg-gray-800 text-white custom-select"
                                    >
                                        <option value="ETH">ETH</option>
                                        <option value="CoinA">CoinA</option>
                                        <option value="CoinB">CoinB</option>
                                        <option value="CoinC">CoinC</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mb-2">
                            <button
                                onClick={handleSwapTokens}
                                className="flex-row hover:text-white hover:bg-opacity-10 items-center text-white/70 shadow-sm shadow-gray-300 rounded-lg bg-white p-2 bg-opacity-5"
                            >
                                <IoArrowDown size={30}></IoArrowDown>
                            </button>
                        </div>

                        <div className='relative white-glassmorphism p-4 py-6 rounded-xl border-[1px] hover:border-zinc-600'>
                            <div className="relative my-2 rounded-md shadow-sm">
                                <input
                                    type="text"
                                    value={outputAmount}
                                    readOnly
                                    className="block font-semibold w-full rounded-md h-8 py-1.5 pl-3 pr-20 text-3xl text-white custom-input no-arrows"
                                    placeholder="0.0"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                    <label htmlFor="currency" className="sr-only">Currency</label>
                                    <select
                                        value={destToken}
                                        onChange={(e) => setDestToken(e.target.value)}
                                        className="rounded-md bg-gray-800 text-white custom-select"
                                    >
                                        <option value="ETH">ETH</option>
                                        <option value="CoinA">CoinA</option>
                                        <option value="CoinB">CoinB</option>
                                        <option value="CoinC">CoinC</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        {isLoading ? (
                            <Loader />
                        ) : (
                            account ? (
                                <button
                                    type="button"
                                    onClick={handleSwap}
                                    className="text-white w-full mb-4 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-xl cursor-pointer"
                                >
                                    Swap
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="text-white w-full mb-4 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-xl cursor-pointer"
                                >
                                    Connect Wallet
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}
            <style jsx>{`
                .custom-input {
                    background-color: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .custom-select {
                    padding:15px 35px 15px 15px;
                    border: none !important;
                    box-shadow: none !important;
                }
                .no-arrows::-webkit-outer-spin-button,
                .no-arrows::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .no-arrows {
                    -moz-appearance: textfield;
                }
            `}</style>
        </div>
    );
};

export default UniswapComponent;
