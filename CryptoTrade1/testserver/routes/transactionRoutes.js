const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, transactionController.createTransaction);
router.put('/:transaction_id', authMiddleware, transactionController.updateTransaction);
router.delete('/:transaction_id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;
