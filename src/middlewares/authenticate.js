require("dotenv").config()

const jwt = require("jsonwebtoken")

const verifyToken = (token)=>{
    return jwt.verify(token,`${process.env.JWT_SECRET_KEY}`)
}


module.exports =(req,res,next)=>{

    const bearerToken = req?.headers?.authorization
    console.log(bearerToken)

    if(!bearerToken){
        return res.status(400).json({status:"failed",message:"please provide a valid token"})
    }

    const token = bearerToken.split(" ")[1]

    const user = verifyToken(token)

    if(!user){
        return res.status(400).json({status:"failed",message:"please provide a valid fwerwe token"})
    }

    req.user = user

  return  next()
}