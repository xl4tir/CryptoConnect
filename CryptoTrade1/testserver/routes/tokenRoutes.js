const express = require('express');
const router = express.Router();
const { getTokens } = require('../controllers/tokenController');

router.get('/', getTokens);

module.exports = router;
