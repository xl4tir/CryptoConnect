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

    const handleAnimateWave = () => {
        setAnimateWave(true);
        setTimeout(() => {
            setAnimateWave(false);
        }, 3000); // Час тривалості анімації, в мілісекундах
    };

    return (
        
            <div className='flex mx-2 my-2'>
                <div className='flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg'>
                    <p className='text-sm'>{name}</p>
                    <p className='bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100'>
                        {balance}
                    </p>
                </div>

                <div className='flex items-center p-2 px-2 bg-[#2172e5] rounded-r-lg'>
                    <copyIcon.icon
                        className='h-6 cursor-pointer'
                        onClick={() => {
                            navigator.clipboard.writeText(tokenAddress);
                            setCopyIcon({ icon: ClipboardCheckIcon });
                            toast.success('Address copied to clipboard!', {className: "blue-glassmorphism-toast"});
                            
                        }}
                    />
                </div>

                {txPending && <TransactionStatus />}

                <Toaster />

                
            </div>
    );
};

export default TokenBalance;