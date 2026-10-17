import mongoose from "mongoose"
export async function connectDb(){
    try{
        const mongoURI = process.env.mongo_uri
        if (!mongoURI){
            throw new Error("mongo uri not found")
        }
    
    const conn = await mongoose.connect(mongoURI)
    console.log("mongodb connected", conn.connection.host)
}
catch(error){
    console.error("MongoDB connection failed:", error.message);
}
}