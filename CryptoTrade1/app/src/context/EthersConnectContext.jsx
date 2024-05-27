import React, { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ethers } from 'ethers';

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
            alert('Logged in successfully');
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const disconnectWallet = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.disconnect();
            alert('Disconnect successfully');
        } catch (error) {
            console.error('Disconnect error', error);
            alert('Disconnect failed');
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
