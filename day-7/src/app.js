const express=require("express");
const app=express()
app.use(express.json()); 
const notesModel=require("./models/notes.model")
app.post("/notes",async(req,res)=>{
    const {title,description}=req.body
    const note=await notesModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",note
    })
})
app.get("/notes",async(req,res)=>{
    let note=await notesModel.find()
    res.status(200).json({
        message:"Notes fetch successfully",note
    })
})
module.exports=app