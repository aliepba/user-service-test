const express = require('express');
const router = express.Router();
const refreshToken = require('../controllers/refresh-tokens');

router.post('/', refreshToken.create);

module.exports = router;