const router = require('express').Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware'); 

router.get('/profile/:userId', authMiddleware, userProfileController.getUserProfile);
router.post('/profile', authMiddleware, userProfileController.createUserProfile);
router.put('/profile/:userId', authMiddleware, userProfileController.updateUserProfile);
router.delete('/profile/:userId', authMiddleware, userProfileController.deleteUserProfile);

router.post('/profile/photo/:userId', authMiddleware, uploadMiddleware.single('photo'), userProfileController.uploadProfilePhoto);
router.post('/profile/background/:userId', authMiddleware, uploadMiddleware.single('background'), userProfileController.uploadBackgroundPhoto);

module.exports = router;
