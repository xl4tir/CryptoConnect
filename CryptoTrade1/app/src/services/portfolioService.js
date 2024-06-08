import axios from 'axios';

const API_URL = 'http://localhost:8061/api/portfolios';

class PortfolioService {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            withCredentials: true
        });
    }

    async getAllPortfoliosByUserId(user_id) {
        try {
            const response = await this.api.get(`/user/${user_id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching portfolios:', error);
            throw error;
        }
    }

    async createPortfolio(portfolioData) {
        try {
            const response = await this.api.post('/', portfolioData);
            return response.data;
        } catch (error) {
            console.error('Error creating portfolio:', error);
            throw error;
        }
    }

    async updatePortfolio(portfolio_id, portfolioData) {
        try {
            const response = await this.api.put(`/${portfolio_id}`, portfolioData);
            return response.data;
        } catch (error) {
            console.error('Error updating portfolio:', error);
            throw error;
        }
    }

    async deletePortfolio(portfolio_id) {
        try {
            const response = await this.api.delete(`/${portfolio_id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            throw error;
        }
    }

    async getPortfolioTransactions(portfolio_id) {
        try {
            const response = await this.api.get(`/${portfolio_id}/transactions`);
            return response.data;
        } catch (error) {
            console.error('Error fetching portfolio transactions:', error);
            throw error;
        }
    }

}

export default new PortfolioService();
