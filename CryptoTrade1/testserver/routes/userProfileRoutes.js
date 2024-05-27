const router = require('express').Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile/:userAddress', authMiddleware, userProfileController.getUserProfile);

router.post('/profile', authMiddleware, userProfileController.createUserProfile);

router.put('/profile/:userAddress', authMiddleware, userProfileController.updateUserProfile);

router.delete('/profile/:userAddress', authMiddleware, userProfileController.deleteUserProfile);

module.exports = router;
