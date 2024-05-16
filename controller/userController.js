//db
const express = require ('express')
const dbConnection = require('../db/dbConfig')
const bcrypt = require ('bcrypt')
const {StatusCodes} = require('http-status-codes')



async function Register(req, res){
    const {username, firstname, lastname, email, password} = req.body;

    if(!username || !firstname || !lastname|| !email || !password){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"please enter all required fields"})
    }
    try {
        const [user] = await dbConnection.query("select username, userid from users where username = ? or email = ?",[username,email])
        ////Elias codes optional
    //    const user = await dbConnection.query("select * from users where username = ? or email = ?",[username, email])
    //    if(user){
    //     return res.status(400).json({msg:"user already existed"})
    //    }
        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"user already registered"})
        }
        if(password.length < 8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"password must be at least 8 character"})
        }

//password encryption
const salt = await bcrypt.genSalt()
const hashedPassword = await bcrypt.hash(password, salt)

        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES(?,?,?,?,?)", [username, firstname, lastname, email, hashedPassword])
        return res.status(StatusCodes.CREATED).json({msg:"user created"})
    } catch (error) {
        console.log(error.message)
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong try again later"})
    }
}








async function Login(req, res){
    const {email, password} = req.body;
    if(!email || !password ){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"please fill all required fields"})
    }

    try {
        const [user] = await dbConnection.query("select username, userid from users where email = ?", [email])
      

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"something went wrong please try again"})
    }
}
function Check(req, res){
    res.send ("Well Come! We check users authentication")
}


module.exports = {Register, Login, Check}