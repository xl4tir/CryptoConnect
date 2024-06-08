import axios from 'axios';

const API_URL = 'http://localhost:8061/api/transactions';

class TransactionService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            withCredentials: true
        });
    }

    async createTransaction(transactionData) {
        try {
            const response = await this.api.post('/', transactionData);
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    }

    async updateTransaction(transaction_id, transactionData) {
        try {
            const response = await this.api.put(`/${transaction_id}`, transactionData);
            return response.data;
        } catch (error) {
            console.error('Error updating transaction:', error);
            throw error;
        }
    }

    async deleteTransaction(transaction_id) {
        try {
            const response = await this.api.delete(`/${transaction_id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting transaction:', error);
            throw error;
        }
    }
}

export default new TransactionService();
