import axios from 'axios';
import apiUrl from "../config";

export const fetchUserPortfolios = async () => {
    try {
        const token = localStorage.getItem('token'); 
        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        };

        const response = await axios.get(`${apiUrl}/api/portfolios/`, config);  
        return response.data; 
    } catch (error) {
        console.error('Помилка при отриманні портфоліо', error);
        throw error;
    }
};


export const createPortfolio = async (name) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const data = { name }; // Об'єкт з властивістю name
        const response = await axios.post(`${apiUrl}/api/portfolios/`, data, config); // Передача об'єкта з ім'ям
        return response.data;
    } catch (error) {
        console.error('Помилка при створенні портфоліо', error);
        throw error;
    }
};
