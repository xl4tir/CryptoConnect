const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрутизація для коментарів
router.post('/', authMiddleware, commentController.createComment);
router.get('/', authMiddleware, commentController.getAllComments);
router.get('/:id', authMiddleware, commentController.getCommentById);
router.get('/post/:post_id', authMiddleware, commentController.getCommentsByPostId); // Отримання коментарів за постом
router.get('/user/:user_id', authMiddleware, commentController.getCommentsByUserId); // Отримання коментарів за користувачем
router.put('/:id', authMiddleware, commentController.updateComment);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
