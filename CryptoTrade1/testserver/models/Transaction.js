const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    portfolio_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    cryptocurrency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    operation: {
        type: Boolean,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;
