const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    fullname:{
        firstname:{
            type:String,
            require:true
        },
        lastname:{
            type:String,
            require:true
        }
    },
    password:{
        type:String,
    },
},
    {   
        timestamps:true
    }
)
const userModel=mongoose.model("user",userSchema)
module.exports=userModel