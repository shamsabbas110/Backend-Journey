require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const app=require("./src/app");
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
const connectToDb=require("./src/config/database");
connectToDb();