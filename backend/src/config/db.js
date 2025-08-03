import mongoose from "mongoose"
// import dotenv from "dotenv"  //already defined in server.js
// dotenv.config()

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully !")
    }
    catch(err){
        console.error("Error in connecting with the database",err)
        process.exit(1) // status code 1 means exit with faliure and 0 means success
    }
}
export default connectDB
//mongodb+srv://pradhanvivek222:wu1LZtOJGSZujyGE@cluster0.od03fld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0