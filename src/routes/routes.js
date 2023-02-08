const express = require('express');

const { registerUser, login, editUser } = require('../controller/users');
const tokenValidation = require('../middleware/tokenValidation');

const router = express();

router.post('/user', registerUser);
router.post('/login', login);

router.use(tokenValidation);

router.put('/user', editUser);

module.exports = router;