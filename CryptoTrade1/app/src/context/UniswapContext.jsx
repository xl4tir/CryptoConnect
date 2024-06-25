import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractABI_Uniswap, contractAddress_Uniswap, contractABI_CustomToken } from '../utils/constants';
import { Toaster, toast } from 'react-hot-toast';

const UniswapContext = createContext();

export const UniswapProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [uniswapContract, setUniswapContract] = useState(null);
    const [tokenContracts, setTokenContracts] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const uniswapContractAddress = contractAddress_Uniswap;
    const uniswapContractABI = contractABI_Uniswap

    const customTokenABI = contractABI_CustomToken;

    useEffect(() => {
        const initEthers = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);
                const accounts = await provider.listAccounts();
                setAccount(accounts[0]);

                const uniswapInstance = new ethers.Contract(uniswapContractAddress, uniswapContractABI, signer);
                setUniswapContract(uniswapInstance);

                const tokenAddresses = await Promise.all(['CoinA', 'CoinB', 'CoinC'].map(async (tokenName) => {
                    const tokenAddress = await uniswapInstance.getTokenAddress(tokenName);
                    return { [tokenName]: new ethers.Contract(tokenAddress, customTokenABI, signer) };
                }));
                setTokenContracts(Object.assign({}, ...tokenAddresses));
            } else {
                alert('Please install MetaMask to use this app.');
            }
        };
        initEthers();
    }, []);

    const getBalance = async (tokenName, userAccount) => {
        if (uniswapContract && userAccount) {
            const balance = await uniswapContract.getBalance(tokenName, userAccount);
            return ethers.utils.formatEther(balance);
        }
        return 0;
    };

    const getBalanceETH = async (userAccount) => {
        if (uniswapContract && userAccount) {
            const balance = await provider.getBalance(userAccount);
            return ethers.utils.formatEther(balance);
        }
        return 0;
    };

    const swapEthToToken = async (tokenName, ethAmount) => {
        try {
            if (uniswapContract && account) {
                setIsLoading(true);
                const tx = await uniswapContract.swapEthToToken(tokenName, { value: ethers.utils.parseEther(ethAmount) });
                await tx.wait();
                setIsLoading(false);
                toast.success('Swap successful!', { className: "blue-glassmorphism-toast" });
            } else {
                throw new Error('Uniswap contract or account not connected');
            }
        } catch (error) {
            toast.error('Swap failed!', { className: "blue-glassmorphism-toast" });
            console.error('Error swapping ETH to token:', error);

        } finally {
            setIsLoading(false);
        }
    };

    const swapTokenToEth = async (tokenName, tokenAmount) => {
        try {
            if (uniswapContract && account) {
                setIsLoading(true);
                const amountInWei = ethers.utils.parseEther(tokenAmount);
                const tokenContract = tokenContracts[tokenName];
                const approveTx = await tokenContract.approve(uniswapContractAddress, amountInWei);
                await approveTx.wait();
                const tx = await uniswapContract.swapTokenToEth(tokenName, amountInWei);
                await tx.wait();
                setIsLoading(false);
                toast.success('Swap successful!', { className: "blue-glassmorphism-toast" });
            } else {
                throw new Error('Uniswap contract or account not connected');
            }
        } catch (error) {
            toast.error('Swap failed!', { className: "blue-glassmorphism-toast" });
            console.error('Error swapping token to ETH:', error);

        } finally {
            setIsLoading(false);
        }
    };

    const swapTokenToToken = async (srcTokenName, destTokenName, tokenAmount) => {
        try {
            if (uniswapContract && account) {
                setIsLoading(true);
                const amountInWei = ethers.utils.parseEther(tokenAmount);
                const tokenContract = tokenContracts[srcTokenName];
                const approveTx = await tokenContract.approve(uniswapContractAddress, amountInWei);
                await approveTx.wait();
                const tx = await uniswapContract.swapTokenToToken(srcTokenName, destTokenName, amountInWei);
                await tx.wait();
                setIsLoading(false);
                toast.success('Swap successful!', { className: "blue-glassmorphism-toast" });
            } else {
                
                throw new Error('Uniswap contract or account not connected');
            }
        } catch (error) {
            toast.error('Swap failed!', { className: "blue-glassmorphism-toast" });
            console.error('Error swapping token to token:', error);

        } finally {
            setIsLoading(false);
        }
    };


    const getTokenAddress = async (tokenName) => {
        if (uniswapContract) {
            return await uniswapContract.getTokenAddress(tokenName);
        }
        return '';
    };

    return (
        <UniswapContext.Provider value={{ provider, signer, account, getBalanceETH, getTokenAddress, getBalance, swapEthToToken, swapTokenToEth, swapTokenToToken, isLoading }}>
            {children}

        </UniswapContext.Provider>
    );
};

export const useWeb3 = () => useContext(UniswapContext);




