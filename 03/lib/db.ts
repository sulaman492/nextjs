import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGO_URI

export const connect=async () => {
    const connectionState=mongoose.connection.readyState;

    if(connectionState===1){
        console.log("Already connected ")
        return
    }
    if(connectionState===2){
        console.log("connecting...")
        return
    }
    try {
        await mongoose.connect(MONGODB_URI!,{
            dbName:"REST_API_NEXTJS",
            bufferCommands:true
        });
        console.log("Connected")
    } catch (error:any) {
        console.log("Error",error)
        throw new Error("Error",error)
    }
}