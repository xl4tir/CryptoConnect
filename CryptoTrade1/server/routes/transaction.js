const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const jwtMiddleware = require('../middleware/authMiddleware');

// POST: /api/transactions (створення нової транзакції)
router.post('/', jwtMiddleware, transactionController.createTransaction);

// GET: /api/transactions/:portfolioId (отримання транзакцій за обраним портфоліо)
router.get('/:portfolioId', jwtMiddleware, transactionController.getTransactionsByPortfolioId);

module.exports = router;
