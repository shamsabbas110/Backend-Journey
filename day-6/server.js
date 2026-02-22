require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]); 
const app=require("./src/app")
const mongoose=require("mongoose")
async function connectToDb(){
  await mongoose.connect("YOUR_MONGODB_CONNECTION_STRING_HERE")
}
connectToDb();
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})