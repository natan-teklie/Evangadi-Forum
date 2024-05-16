const express = require('express');
const router = express.Router();


const {Register, Login, Check} = require('../controller/userController')



//register route
router.post('/register', Register);


//login route
router.post('/login', Login)


//check route
router.get ('/check', Check)

module.exports = router;