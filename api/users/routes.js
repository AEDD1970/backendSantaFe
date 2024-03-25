
const express = require('express');
const router = express.Router();
const { auth } = require('../../utils/middleware/auth_middleware');
const { userRegister, userAuth } = require('./controller/userController');

console.log("llegue a primer ruta")
router.post('/register', userRegister)
router.post('/auth', userAuth)

module.exports = router;