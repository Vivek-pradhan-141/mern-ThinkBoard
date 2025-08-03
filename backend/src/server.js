import express from "express"
import dotenv from "dotenv"
import cors from "cors"


import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
dotenv.config()


const app = express()
const port = process.env.PORT

//middleware
app.use(cors({
    origin: "http://localhost:5173",     // use to deal with cors error
}))
app.use(express.json())  //this a middle ware used for accessing request.body in post request
app.use(rateLimiter)



app.use("/api/notes", notesRoutes) // what it will do is whenever we encounter /api/notes instead of writing individial routes we will just call another script maintaining that route (even for multiple routes)



// connectDB() // see here 1st the server starts then db is connected hence we want 1st db gets connected then server starts 
//so use then ()

connectDB().then(() => {
    app.listen(port, () => {
        console.log("server is running onm port : " + port)
    })
})



//wu1LZtOJGSZujyGE

