const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken')
const userController = require ('../controller/userController')


async function authMidleware (req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication Invalid"});
        
    }
    const token = authHeader.split('')[1];
    console.log(token)
    console.log(authHeader)
    try {
        
        const {username, userid} = jwt.verify(token, 'secrte');
        req.user = {username, userid}
        // return res.status(StatusCodes.OK).json({data})
       next() 
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication Invali"})
    }
}

module.exports = authMidleware   