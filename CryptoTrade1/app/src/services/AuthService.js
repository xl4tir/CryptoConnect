import axios from 'axios';

const API_URL = 'http://localhost:8061/api/testlogin';

const login = async (userAddress) => {
    return await axios.post(`${API_URL}/login`, { userAddress }, { withCredentials: true });
};

const logout = async () => {
    return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

const getCurrentUser = async () => {
    return await axios.get(`${API_URL}/me`, { withCredentials: true });
};

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    login,
    logout,
    getCurrentUser,
    getUserById
};