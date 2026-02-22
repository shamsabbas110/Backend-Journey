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
module.exports=app