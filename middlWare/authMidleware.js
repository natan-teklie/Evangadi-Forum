const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

async function authMidleware (req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication Invalid"});
    }
    try {
        const data = jwt.verify(authHeader, 'secret');
        return res.status(StatusCodes.OK).json({data})
        return res.status(StatusCodes.OK).json({data})
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"authentication Invalid"})
    }
}

module.exports = authMidleware