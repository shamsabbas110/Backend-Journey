require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const connectToDb = require("./src/config/database")
require("dotenv").config()
connectToDb();
const app=require("./src/app")
app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})