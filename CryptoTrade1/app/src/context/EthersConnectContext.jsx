import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './authContext';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';

export const EthersConnectContext= createContext();

export const EthersConnectProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const { login, logout } = useContext(AuthContext);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    login(accounts[0]);
                }
            } catch (error) {
                console.error('Error checking MetaMask connection:', error);
                window.location.reload();
            }
        };

        window.ethereum.on('accountsChanged', () => {
            logout();
        });

        checkConnection();
    }, [login, logout]);

    const connectWallet = async () => {
        try {
            setLoading(true);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await login(accounts[0]);
            window.location.reload();
            toast.success('Logged in successfully', {className: "blue-glassmorphism-toast"});
          
        } catch (error) {
            console.error('Login error', error);
            toast.error('Login failed', {className: "blue-glassmorphism-toast"});
        } finally {
            setLoading(false);
        }
    };

    const disconnectWallet = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.disconnect();
            toast.success('Disconnect successfully', {className: "blue-glassmorphism-toast"});
        } catch (error) {
            console.error('Disconnect error', error);
            toast.error('Disconnect failed', {className: "blue-glassmorphism-toast"});
        } finally {
            setLoading(false);
        }
    };

    return (
        <EthersConnectContext.Provider value={{ connectWallet, loading, disconnectWallet}}>
            {children}
        </EthersConnectContext.Provider>
    );
};
