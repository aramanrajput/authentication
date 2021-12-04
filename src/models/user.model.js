
const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
  
},{
    versionKey:false,
    timestamps:true
})


userSchema.pre("save",function(next){

    if(!this.isModified("password")){
        return next()
    }
    else{
        const hash = bcrypt.hashSync(this.password,10)
        this.password = hash
        return next()
    }
})

userSchema.methods.checkPassword=function(password){
    return new Promise((resolve,reject)=>{
         bcrypt.compare(password,this.password,function(err,res){

            if(err){
                return reject(err)
            }
            return resolve(res)
    })
    })
   
}

const User = mongoose.model("user",userSchema)


module.exports = User