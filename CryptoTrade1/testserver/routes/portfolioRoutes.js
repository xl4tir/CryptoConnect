const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, portfolioController.createPortfolio);
router.get('/', authMiddleware, portfolioController.getPortfolios);
router.get('/:portfolio_id/transactions', authMiddleware, portfolioController.getPortfolioTransactions);
router.put('/:portfolio_id', authMiddleware, portfolioController.updatePortfolio);
router.delete('/:portfolio_id', authMiddleware, portfolioController.deletePortfolio);
router.get('/user/:user_id', authMiddleware, portfolioController.getPortfoliosByUserId); // Новий маршрут


module.exports = router;
