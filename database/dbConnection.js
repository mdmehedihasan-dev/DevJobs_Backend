import mongoose from "mongoose";

export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"MERN_JOBS"
    }).then(()=>{
        console.log('Connected to MongoDb')
    }).catch((err)=>{
        console.log(`Failed to connect to MongoDb ${err}`)
    })
}