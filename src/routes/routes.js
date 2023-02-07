const express = require('express');

const { registerUser, login } = require('../controller/users');

const router = express();

router.post('/user', registerUser);
router.post('/login', login);

module.exports = router;