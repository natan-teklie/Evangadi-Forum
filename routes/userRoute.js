const express = require('express');
const router = express.Router();

//controller file
const {Register, Login, Check} = require('../controller/userController')
const authHeader = require('../middlWare/authMidleware')


//register route
router.post('/register', Register);


//login route
router.post('/login', Login)


//check route
router.get ('/check',authHeader, Check)

module.exports = router;