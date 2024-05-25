const express = require('express');
const router = express.Router()
const authMidleware = require('../middlWare/authMidleware')

router.get("/all-question", (req,res)=>{
    res.send("you can ask any question")
})

module.exports = router