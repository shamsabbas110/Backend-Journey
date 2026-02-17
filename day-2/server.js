const express=require("express")
const app=express();
app.get('/',(req,res)=>{
    res.send("shams bhai");
});
app.get('/about',(req,res)=>{
    res.send("This is about page");
});
app.get('/home',(req,res)=>{
    res.send("This is homepage")
})
app.listen(3000);