const router = require("express").Router();
const controller = require('../controllers/authController')
const jwtMiddleware = require('../middleware/authMiddleware');

router.get('/', jwtMiddleware, controller.getUser);

module.exports = router;