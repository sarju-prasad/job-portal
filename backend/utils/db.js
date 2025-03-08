import mongoose from "mongoose";

const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully")
    } catch (error) {
        console.log(`Mongodb is not connected ${error}`)
    }
}

export default connectDB;