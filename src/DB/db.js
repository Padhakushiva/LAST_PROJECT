const mongoose=require('mongoose');

async function connectDb() {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(("Connected to MongoDb"));
        
    }
    catch(err){
        console.error("Error connecting to mongodb: ",err)
    }
   
}

module.exports=connectDb;