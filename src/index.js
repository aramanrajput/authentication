const express = require("express")

const {body,validationResult} =require("express-validator")
const app = express()


const {register,login} = require("./controllers/auth.controller")
const postController = require("./controllers/post.controller")

app.use(express.json())

app.post("/register",body("name").notEmpty().withMessage("name is required")
,body("email").notEmpty().withMessage("email is required"),
body("password").notEmpty().withMessage("password is required"),
register)

app.post("/login",body("email").notEmpty().withMessage("email is required"),
body("password").notEmpty().withMessage("password is required"),login)

app.use("/post",postController)

module.exports = app