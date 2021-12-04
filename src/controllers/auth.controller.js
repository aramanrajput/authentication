require("dotenv").config()

const {body,validationResult} =require("express-validator")

const jwt = require("jsonwebtoken")


const User = require("../models/user.model")


const newToken = (user)=>{
    return jwt.sign({user:user},`${process.env.JWT_SECRET_KEY}`)
}

const register = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let newErrors = errors.array().map(err=>err.msg)
        return res.status(400).json({errors:newErrors})
    }
  
try{
let user = await User.findOne({email:req.body.email})

if(user){
    return res.status(400).json({status:"failed",message:"please provide a different email adress"})
}
else{
    user = await User.create(req.body)
    const token = newToken(user)
    res.status(201).json({user,token})

}

}catch(e){
    return res.status(500).json({status:"failed",message:e.message})
}


}

const login = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        let newErrors = errors.array().map(err=>err.msg)
        return res.status(400).json({errors:newErrors})
    }
    try{
        let user = await User.findOne({email:req.body.email})
        
        if(!user){
            return res.status(400).json({status:"failed",message:"please provide correct email adress and password"})
        }
        

        const match = await user.checkPassword(req.body.password)

  
        if(!match){
            return res.status(400).json({status:"failed",message:"please provide correct email adress and password"})
        }
        const token = newToken(user)
        res.status(201).json({user,token})
        
        }catch(e){
            return res.status(500).json({status:"failed",message:e.message})
        }
    }


    module.exports = {register,login}