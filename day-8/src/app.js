const express=require("express");
const app=express();
app.use(express.json());
const noteModel=require("./models/notes.model");

app.post("/notes",async(req,res)=>{
    const{title,description}=req.body;
    const note=await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note Created Successfully"
    })
})
app.get("/notes",async(req,res)=>{
    const note=await noteModel.find()
    res.status(200).json({
        message:"Note Fetched Successfully",
        note
    })
})











module.exports=app;