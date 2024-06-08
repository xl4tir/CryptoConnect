const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');

exports.createPortfolio = async (req, res) => {
    try {
        const user_id = req.session.userId;
        const { name } = req.body;

        const portfolio = new Portfolio({ name, user_id });
        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPortfolios = async (req, res) => {
    try {
        const user_id = req.session.userId;  // Беремо user_id з сесії
        const portfolios = await Portfolio.find({ user_id });
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPortfolioTransactions = async (req, res) => {
    try {
        const { portfolio_id } = req.params;
        const transactions = await Transaction.find({ portfolio_id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const { portfolio_id } = req.params;
        const { name } = req.body;
        const user_id = req.session.userId;  // Беремо user_id з сесії
        const portfolio = await Portfolio.findOneAndUpdate({ _id: portfolio_id, user_id }, { name }, { new: true });
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const { portfolio_id } = req.params;
        const user_id = req.session.userId;  // Беремо user_id з сесії
        const portfolio = await Portfolio.findOneAndDelete({ _id: portfolio_id, user_id });
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        // Видалимо всі транзакції, що належать до цього портфоліо
        await Transaction.deleteMany({ portfolio_id });
        res.status(200).json({ message: 'Portfolio and associated transactions deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getPortfoliosByUserId = async (req, res) => {
    try {
        const { user_id } = req.params;
        const portfolios = await Portfolio.find({ user_id });
        res.status(200).json(portfolios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
