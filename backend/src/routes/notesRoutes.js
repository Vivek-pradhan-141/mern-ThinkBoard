import express from "express"
import {createNote, deleteNote, getAllNotes, getNoteById, putNote} from"../controllers/notesControllers.js"
const router = express.Router()

router.get("/",getAllNotes)

router.get("/:id",getNoteById)

router.post("/",createNote)

router.put("/:id",putNote)

router.delete("/:id",deleteNote)


// remember this is what we call a route  - here we are using a get method to listen to port 5000/aapi/notes
//we get saomething from the client and sending back the response
// app.get("/api/notes",(request,res)=>{
//     res.send("you got 15 notes")
// })


// //lets make another route suppose a client sends a post request - he wants to send his response to the server
// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({
//         message:"your response recieved successfully"
//     })
// })

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({
//         message:"your response updated successfully"
//     })
// })


// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({
//         message:"your response deleted successfully"
//     })
// })

export default router