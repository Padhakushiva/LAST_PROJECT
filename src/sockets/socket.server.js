const {Server}=require("socket.io")
const cookie=require('cookie')
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model")
const messageModel=require("../models/message.model")

const aiService=require("../service/ai.service");
function initSocketServer(httpServer){
    const io = new Server(httpServer, { /* options */ });

  io.use(async(socket,next)=>{
    const cookies=cookie.parse(socket.handshake.headers?.cookie || "");
    console.log("Socket connection cookies:", cookies);


    if(!cookies.token){
      return next(new Error("Authentication error: NO token provided"));
    }
    try{
      const decoded =jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user=await userModel.findById(decoded.id);
      socket.user=user;
      next();
    }catch(err){
      return next(new Error("Authentication error : Invalid token"));
    }
  })


    io.on("connection", (socket) => {
      console.log("New Socket  connection:",socket.id);

      socket.on("ai-message", async(messagepayload)=>{
        try {
          console.log(messagepayload);
          const userMessage = typeof messagepayload?.content === "string" ? messagepayload.content.trim() : "";

          

          // Save user message first.
          await messageModel.create({
            user:socket.user._id,
            Chat:messagepayload.Chat,
            content:userMessage,
            role:"user"
          })

          

          const chatHistory=await messageModel.find({
            chat:messageModel.chat
          })
                    
          const response=await aiService.generateResponse(
            chatHistory.map(item=>{
            return {
            role:item.role,
            parts:[{text:item.content}]
            }
          }
          ));
          const modelResponse = response;
          

          await messageModel.create({
            user:socket.user._id,
            Chat:messagepayload.Chat,
            content:modelResponse,
            role:"model"
          })
          socket.emit("ai-response",{
            content:modelResponse,
            Chat:messagepayload.Chat
          })
        } catch (err) {
          console.error("ai-message error:", err.message);
          socket.emit("ai-error", { message: "Failed to process AI message" });
        }
      })  
      
    });
}

module.exports=initSocketServer;

