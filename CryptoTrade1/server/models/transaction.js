const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    cryptocurrency: { type: String, required: true },
    amount: { type: Number, required: true },
    operation: { type: Boolean, required: true }, // true для покупки, false для продажу
    purchasePrice: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
