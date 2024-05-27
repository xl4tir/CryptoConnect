import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await AuthService.getCurrentUser();
                setUser(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('User not logged in', error);
            }
        };

        checkLoginStatus();
    }, []);

    const login = async (userAddress) => {
        try {
            await AuthService.login(userAddress);
            const response = await AuthService.getCurrentUser();
            setUser(response.data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
