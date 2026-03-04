const express=require("express");
const app=express();
app.use(express.json());
const noteModel=require("./models/notes.model");

app.post("/api/notes",async(req,res)=>{
    const{title,description}=req.body;
    const note=await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note Created Successfully"
    })
})
app.get("/api/notes",async(req,res)=>{
    const note=await noteModel.find()
    res.status(200).json({
        message:"Note Fetched Successfully",
        note
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(204).json({
        message:"Note Deleted Successfully"
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id= req.params.id;
    const{description}=req.body;
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"Description Updated Successfully"
    })
})
module.exports=app;