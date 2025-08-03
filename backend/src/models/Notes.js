import mongoose from "mongoose"

//1-create a schema
//2-create a model based on that schema

const noteSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        
        content:{
            type:String,
            required:true
        },
    },
    {timestamps:true} //mongoDB will automatically create createdAt, updated at
)

const Note = mongoose.model("Note",noteSchema)
export default Note