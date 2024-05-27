const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getUser);
router.post('/logout', authController.logout);

module.exports = router;
