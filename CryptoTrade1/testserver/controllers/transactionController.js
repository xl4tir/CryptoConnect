const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { portfolio_id, cryptocurrency, amount, operation, purchasePrice, purchaseDate } = req.body;
        const transaction = new Transaction({ portfolio_id, cryptocurrency, amount, operation, purchasePrice, purchaseDate });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const { cryptocurrency, amount, operation, purchasePrice, purchaseDate } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(transaction_id, { cryptocurrency, amount, operation, purchasePrice, purchaseDate }, { new: true });
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(transaction_id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
