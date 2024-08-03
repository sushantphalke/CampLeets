const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require("./config")

const authMiddleware = (req,res,next) =>{
    const token=req.headers.authorization;
    if(!token || !token.startsWith('Bearer '))
    {
        return res.status(403).json({
            message: "Invaid token"
        })
    }
    const jwtToken=token.split(' ')[1];
   
    try
    { 
        const decodedValue=jwt.verify(jwtToken,JWT_SECRET);
        req.userId=decodedValue.userId;
        next()
    }
    catch(err){
        return res.status(403).json({
            message : "Invalid token"
        })
    }
}

module.exports = authMiddleware