const router = require('express').Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware'); 


router.get('/profile/:userAddress', authMiddleware, userProfileController.getUserProfile);
router.post('/profile', authMiddleware, userProfileController.createUserProfile);
router.put('/profile/:userAddress', authMiddleware, userProfileController.updateUserProfile);
router.delete('/profile/:userAddress', authMiddleware, userProfileController.deleteUserProfile);

router.post('/profile/photo/:userAddress', authMiddleware, uploadMiddleware.single('photo'), userProfileController.uploadProfilePhoto);
router.post('/profile/background/:userAddress', authMiddleware, uploadMiddleware.single('background'), userProfileController.uploadBackgroundPhoto);

module.exports = router;
