import mongoose from "mongoose";
const DB_NAME = "userAuth";

const connectDb = async () => {
    try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("MONGO DB connected!")

    } catch(err){
        console.log("Error while connecting to daatabase", err);
        process.exit(1);
    }
}

export default connectDb