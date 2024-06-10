const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Роути для автентифікації
router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.getUser);
router.post('/logout', authController.logout);

router.get('/users/:userId', authMiddleware, authController.getUserById);

module.exports = router;
