require('dotenv').config();
const app=require("./src/app")
const connectDb=require("./src/DB/db");

const initSocketServer=require("./src/sockets/socket.server")
const httpServer=require('http').createServer(app);


connectDb()
initSocketServer(httpServer);

httpServer.listen(3000,(req,res)=>{
    console.log("Server is running at port 3000");
    
})