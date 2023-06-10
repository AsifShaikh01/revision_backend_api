const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {UserModel} = require("../model/User.model");


const userRouter = express.Router();


userRouter.post("/register" , async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const alreadyUser = await UserModel.findOne({email});
        if(alreadyUser){
            res.send("This email is already registered!! try different one!!")
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = new UserModel({name , email , password : hashedPassword});

        await user.save();

        const token = jwt.sign({email:user.email , id:user._id} , "revision")

        res.send({"msg":"registration successfull" , "token":token})
        
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login" , async(req,res)=>{
    const {email , password} = req.body;
    try {
        const alreadyUser = await UserModel.findOne({email});
        if(!alreadyUser){
            res.send("user not found")
        }

        const hashedPassword = await bcrypt.compare(password , alreadyUser.password);
        if(!hashedPassword){
            res.send("Invalid credentials");

        }

        const token = jwt.sign({email : alreadyUser.email , id:alreadyUser._id} , "revision")
        res.send({"msg":"login successfull!" , token:token})
        const user = UserModel.findOne({email})
        localStorage.setItem("token" ,JSON.stringify(token) )
        localStorage.setItem("user",JSON.stringify(user))
        
    } catch (error) {
        res.send(error)
    }
})

userRouter.get("/user" , async(req,res)=>{
   const user = JSON.parse(localStorage.getItem("user"));
//    const token = JSON.parse(localStorage.getItem("token"));

   res.send(user)
})

module.exports = {
    userRouter
}