const express=require("express");
const authRouter=express.Router();
const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");

authRouter.post("/register",async(req,res)=>{
          const{name,email,password}=req.body;
          const isUserAlreadyExists=await userModel.findOne({email})
          if(isUserAlreadyExists){
            return res.status(409).json({
                message:"User Already Exists With This Email"
            })
          }

          const user=await userModel.create({
            name,email,password
          })
          const token=jwt.sign({
            id:user._id,
            email:user.email
          },process.env.JWT_SECRET)
          res.cookie("jwt_token",token);
          res.status(201).json({
            message:"User registered successfully",
            token
          })

})



module.exports=authRouter;