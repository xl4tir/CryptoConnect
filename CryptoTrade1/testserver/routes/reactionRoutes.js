const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController.js');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрутизація для реакцій
router.post('/', authMiddleware, reactionController.createReaction);
router.get('/', authMiddleware, reactionController.getAllReactions);
router.get('/:id', authMiddleware, reactionController.getReactionById);
router.put('/:id', authMiddleware, reactionController.updateReaction);
router.delete('/:id', authMiddleware, reactionController.deleteReaction);

module.exports = router;
