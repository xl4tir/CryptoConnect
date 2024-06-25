import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/UniswapContext';
import { ClipboardIcon, ClipboardCheckIcon } from '@heroicons/react/outline';
import { Toaster, toast } from 'react-hot-toast';

const TokenBalance = ({ name, walletAddress }) => {
    const { getBalance, getTokenAddress } = useWeb3();
    const [balance, setBalance] = useState('0');
    const [tokenAddress, setTokenAddress] = useState('');
    const [copyIcon, setCopyIcon] = useState({ icon: ClipboardIcon });
    const [txPending, setTxPending] = useState(false);
    const [animateWave, setAnimateWave] = useState(false);

    useEffect(() => {
        const fetchBalance = async () => {
            if (walletAddress) {
                const bal = await getBalance(name, walletAddress);
                setBalance(bal);
            }
        };

        const fetchTokenAddress = async () => {
            const address = await getTokenAddress(name);
            setTokenAddress(address);
        };

        fetchBalance();
        fetchTokenAddress();
    }, [walletAddress, name, getBalance, getTokenAddress]);



    return (

        <div className='  flex mx-2 my-2 items-center '>
            <div onClick={() => {
                navigator.clipboard.writeText(tokenAddress);
                setCopyIcon({ icon: ClipboardCheckIcon });
                toast.success('Address copied to clipboard!', { className: "blue-glassmorphism-toast" });

            }}
                className='hover:bg-opacity-10 flex cursor-pointer items-center  text-zinc-300 w-fit p-2 px-3 rounded-l-lg shadow-sm shadow-gray-300 rounded-lg bg-white  bg-opacity-5'>
                <p className='text-sm font-medium'>{name}</p>
                <p className=' p-0.5 px-3  rounded-lg text-zinc-300'>
                    {balance}
                </p>
                <copyIcon.icon
                    className='h-6 cursor-pointer text-zinc-300/90'

                />
            </div>





            {txPending && <TransactionStatus />}

            <Toaster />


        </div>
    );
};

export default TokenBalance;