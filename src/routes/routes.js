const express = require('express');

const { registerUser } = require('../controller/users');

const router = express();

router.post('/user', registerUser);

module.exports = router;