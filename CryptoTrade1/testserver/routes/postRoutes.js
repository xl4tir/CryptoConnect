const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрутизація для постів
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.incrementViewCount, postController.getAllPosts);
router.get('/:id', authMiddleware, postController.incrementViewCount, postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

router.post('/:postId/repost', authMiddleware, postController.createRepost);
router.get('/:postId/reposts', authMiddleware, postController.incrementViewCount, postController.getRepostsByPostId);
router.get('/reposts/user/:userId', authMiddleware, postController.incrementViewCount, postController.getRepostsByUserId);
router.get('/posts_and_reposts/user/:userId', authMiddleware, postController.incrementViewCount, postController.getPostsAndRepostsByUserId );

router.get('/user/:userId', postController.incrementViewCount, postController.getPostsByUserId)

router.get('/crypto/:crypto_symbol', authMiddleware, postController.incrementViewCount, postController.getPostsByCryptoSymbol);

module.exports = router;
