const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Маршрутизація для постів
router.post('/', authMiddleware, postController.createPost);
router.get('/', authMiddleware, postController.getAllPosts);
router.get('/:id', authMiddleware, postController.getPostById);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

router.post('/:postId/repost', authMiddleware, postController.createRepost);
router.get('/:postId/reposts', authMiddleware, postController.getRepostsByPostId);
router.get('/reposts/user/:userId', authMiddleware, postController.getRepostsByUserId);
router.get('/posts_and_reposts/user/:userId', authMiddleware, postController.getPostsAndRepostsByUserId );

router.get('/user/:userId', postController.getPostsByUserId)

module.exports = router;
