const express =require('express');
const cookieParser=require('cookie-parser');
const authRoutes=require("./routes/auth.routes");
const chatRoutes=require("./routes/chat.routes");

//MIDDLEWARES
const app=express();
app.use(express.json());
app.use(cookieParser());


// AUTHENTICATION 
app.use('/api/auth', authRoutes);

//CHAT ROUTES
app.use("/api/chat",chatRoutes);

module.exports=app;