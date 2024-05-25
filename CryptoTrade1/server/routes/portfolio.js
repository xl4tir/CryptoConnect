const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const jwtMiddleware = require('../middleware/authMiddleware');

// POST /portfolios - Створення портфоліо
router.post('/', jwtMiddleware, portfolioController.createPortfolio);

// GET /portfolios - Отримання портфоліо авторизованого користувача
router.get('/', jwtMiddleware, portfolioController.getUserPortfolios);

module.exports = router;
