const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/follow/:id', authMiddleware, followController.followUser);
router.post('/unfollow/:id', authMiddleware, followController.unfollowUser);

module.exports = router;
