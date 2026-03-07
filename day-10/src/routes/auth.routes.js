const express=require("express");
const authRouter=express.Router();
const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

authRouter.post("/register",async(req,res)=>{
          const{name,email,password}=req.body;
          const isUserAlreadyExists=await userModel.findOne({email})
          if(isUserAlreadyExists){
            return res.status(409).json({
                message:"User Already Exists With This Email"
            })
          }
          const hashedPassword=crypto.createHash("md5").update(password).digest("hex");
          const user=await userModel.create({
            name,email,password:hashedPassword
          })
          const token=jwt.sign({
            id:user._id,
          },process.env.JWT_SECRET)
          res.cookie("jwt_token",token);
          res.status(201).json({
            message:"User registered successfully",
            token
          })

})
authRouter.post("/login",async(req,res)=>{
          const {email,password}=req.body;
          const user=await userModel.findOne({email})
          if(!user){
            return res.status(404).json({
              message:"User Not Exists With This Email"
            })
          }
          const isPasswordMathched=user.password===crypto.createHash("md5").update(password).digest("hex");
          if(!isPasswordMathched){
            return res.status(401).json({
              message:"Inccorrect Password"
            })
          }
          const token=jwt.sign({
            id:user._id
          },process.env.JWT_SECRET)
          res.cookie("token",token);
          res.status(200).json({
            message:"User Logged In Successfully"
          })
})



module.exports=authRouter;