import Note from "../models/Notes.js"


export async function  getAllNotes(_,res){  //instead of req which is not being used you can use '_' 
    try{
        const notes = await Note.find().sort({createdAt:1})// -1 finds the notes in decreasing order in which they are created & 1 finds in increasing order
        res.status(200).json(notes)
        
    }
    catch(err){
        console.log("error in getAllNotes ")
        res.status(500).json({message:"internal server error"})
    }
}


export async function getNoteById(req,res) {
    try {
        const resNote = await Note.findById(req.params.id)
        if(!resNote) return res.status(404).json({message:"Note not found!"})
        res.json(resNote)    
    } 
    catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}


export async function createNote(req,res){
    try {
        const {title,content} = req.body
        const note = new Note({title, content}) // or we can type like const newNote = new Note({title, content})
        const savedNode = await note.save()
        res.status(201).json(savedNode)

    } 
    catch (error) {
        console.log("error in createNewNote ")
        res.status(500).json({message:"internal server error"})
    }
}


export async function putNote(req,res){
    try {
        const {title,content} = req.body
        let updatedNote=await Note.findByIdAndUpdate(req.params.id,{title, content},{ new: true })
        if(!updatedNote) return res.status(404).json({message:"Note not found!"})
        // res.status(200).json({message:"your response updated successfully"})
        // console.log(s)
        res.status(201).json(updatedNote)
        
    } 
    catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}


export async function deleteNote(req,res){
    try {
        // const {content,title} = req.body
        let deletedNote= await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message:"Note not found!"})
        res.status(200).json(deletedNote)
    } 
    catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}

