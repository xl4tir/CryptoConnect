const Transaction = require('../models/transaction');

class TransactionController {
    async createTransaction(req, res) {
        try {
            const { portfolioId, cryptocurrency, amount, operation, purchasePrice, purchaseDate } = req.body;
            const transaction = new Transaction({ portfolioId, cryptocurrency, amount, operation, purchasePrice, purchaseDate });
            await transaction.save();
            res.status(201).json(transaction);
        } catch (error) {
            console.error('Помилка при створенні транзакції', error);
            res.status(500).json({ message: 'Помилка сервера при створенні транзакції' });
        }
    }

    async getTransactionsByPortfolioId(req, res) {
        try {
            const { portfolioId } = req.params;
            const transactions = await Transaction.find({ portfolioId });
            res.json(transactions);
        } catch (error) {
            console.error('Помилка при отриманні транзакцій за портфоліо', error);
            res.status(500).json({ message: 'Помилка сервера при отриманні транзакцій' });
        }
    }
}

module.exports = new TransactionController();
