//db
const express = require ('express')
const dbConnection = require('../db/dbConfig')



async function Register(req, res){
    const {username, firstname, lastname, email, password} = req.body;

    if(!username || !firstname || !lastname|| !email || !password){
       return res. status(400).json({msg:"please enter all required fields"})
    }
    try {
        const [user] = await dbConnection.query("select username, userid from users where username = ? or email = ?",[username,email])
    //    const user = await dbConnection.query("select * from users where username = ? or email = ?",[username, email])
    //    if(user){
    //     return res.status(400).json({msg:"user already existed"})
    //    }
        if(user.length > 0){
            return res.status(400).json({msg:"user already registered"})
        }
        if(password.length < 8){
            return res.status(300).json({msg:"password must be at least 8 character"})
        }
        await dbConnection.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES(?,?,?,?,?)", [username, firstname, lastname, email, password])
        return res.status(201).json({msg:"user created"})
    } catch (error) {
        console.log(error.message)
       return res.status(500).json({msg:"something went wrong try again later"})
    }
}








function Login(req, res){
    res.send ("Please Login")
}
function Check(req, res){
    res.send ("Well Come! We check users authentication")
}


module.exports = {Register, Login, Check}