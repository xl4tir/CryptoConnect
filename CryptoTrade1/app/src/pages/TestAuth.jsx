import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Base/Navbar';
import Footer from '../components/Base/Footer';

const SwapPage = () => {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setLoggedIn(true);
                    getUser();
                }
            } catch (error) {
                console.error('Error checking MetaMask connection:', error);
            }
        };

        window.ethereum.on('accountsChanged', () => {
            setLoggedIn(false);
            setUser(null);
            axios.post('http://localhost:8061/api/testlogin/logout', {}, { withCredentials: true }).catch(console.error);
        });

        checkConnection();
    }, []);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAddress = accounts[0];
            await axios.post('http://localhost:8061/api/testlogin/login', { userAddress }, { withCredentials: true });
            setLoggedIn(true);
            getUser();
            alert('Logged in successfully');
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8061/api/testlogin/me', { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data', error);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="gradient-bg-main">
                <Navbar />

                <div className="text-white">
                    {loggedIn ? (
                        <>
                            <button onClick={() => { setLoggedIn(false); setUser(null); axios.post('http://localhost:8061/api/testlogin/logout', {}, { withCredentials: true }); }}>
                                Logout
                            </button>
                            {user && (
                                <div>
                                    <h2>Welcome, '{user._id}' {user.userAddress}</h2>
                                    <p>Registration Date: {new Date(user.registrationDate).toLocaleDateString()}</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <button onClick={handleLogin} disabled={loading}>
                            {loading ? 'Loading...' : 'Login with MetaMask'}
                        </button>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SwapPage;
