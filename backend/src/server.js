import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"  //use to join frontend and backend path means you can run the react app'n in port 5005 (backend)


import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
dotenv.config()


const app = express()
const PORT = process.env.PORT || 5005;
const __dirname = path.resolve()



//middleware

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",     // use to deal with cors error
    }))
}

app.use(express.json())  //this a middle ware used for accessing request.body in post request
app.use(rateLimiter)



app.use("/api/notes", notesRoutes) // what it will do is whenever we encounter /api/notes instead of writing individial routes we will just call another script maintaining that route (even for multiple routes)



if (process.env.NODE_ENV === "production") {
    // we will use another middleware to join front end path with backend
    app.use(express.static(path.join(__dirname, "../frontend/dist")))  // join path of backend D:/mern/backend with D:/frontend/dist

    app.get("*", (req, res) => {   // * -> if any route other than backend we will run the frontend app'n
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}



// connectDB() // see here 1st the server starts then db is connected hence we want 1st db gets connected then server starts 
//so use then ()

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running onm port : " + PORT)
    })
})



