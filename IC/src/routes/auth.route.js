const express=require("express");
const authRouter=express.Router();
const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const crypto=require("crypto");

authRouter.post("/register",async(req,res)=>{
    const{username,email,password,bio,profileImage}=req.body;
    const isuserEmailExists=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    });
    if(isuserEmailExists){
        return res.status(409).json({
            message:"User already exists with this"+(isuserEmailExists.email===email?"email":"username")
        })
    }
     const hashedPassword=crypto.createHash("md5").update(password).digest("hex");
     const user=userModel.create({
        username,email,password:hashedPassword,bio,profileImage
     })
     const token=jwt.sign({
        id:user._id
     },process.env.JWT_SECRET,{expiresIn:"1d"});
     res.cookie("token",token)
     res.status(201).json({
        message:"User registered successfully"
     })
})
authRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"User not exists with this email"
        })
    }
    const passwordMatched=user.password===crypto.createHash("md5").update(password).digest("hex");
    if(!passwordMatched){
        return res.status(401).json({
            message:"Incorrect password"
        })
    }
    const token=jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie("token",token)
    res.status(200).json({
        message:"User logged in successfully"
    })
})

module.exports=authRouter;