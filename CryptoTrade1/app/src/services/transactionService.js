import axios from 'axios';
import apiUrl from "../config";


// Функція для додавання нової транзакції
export const addTransaction = async (transactionData) => {
    try {
        // Створюємо об'єкт конфігурації для запиту Axios з токеном авторизації
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Виконуємо POST запит до сервера для додавання нової транзакції
        const response = await axios.post(`${apiUrl}/api/transactions/`, transactionData, config);

        // Повертаємо дані успішно доданої транзакції з сервера
        return response.data;
    } catch (error) {
        // Обробляємо помилки, якщо запит не вдалося виконати
        console.error('Помилка під час додавання транзакції:', error);
        throw error; // Передаємо помилку назад для обробки компонентом React
    }
};
