import { useEffect, useState } from 'react'
import Navbar from './components/navbar.jsx'
import Ratelimit from './components/ratelimitUI.jsx'
import axios from "axios"
import toast from 'react-hot-toast'
import NoteCard from './components/NoteCard.jsx'
import api from "../lib/axios.js"


const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [nav, setNav] = useState(true)



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes"); //here we will get a CORS error becoz we have our frontend and backend at different origin URLs
        // frontend : http://localhost:5173/      backend : https://localhost:5005/api/notes -- to fix this we need to use a middleware in the backend
        setNotes(res.data);
        setIsRateLimited(false)
        console.log(res.data)
      }
      catch (error) {
        console.log("Error fetching notes !")
        if (error.response.status === 429) {
          setIsRateLimited(true);
          setNav(false)
        }
        else {
          toast.error("Failed to add Notes !")
        }
      }

      finally {
        // setTimeout(()=>{
        //   setLoading(false);
        // },1000)
        setLoading(false);
      }
    }

    fetchNotes();
  }, [])


  return (

    <div className='min-h-screen'>

      {nav && < Navbar />}

      {isRateLimited && <Ratelimit />}

      <div className='max-w-7xl h-56 mx-auto '>
        {loading && <div className='text-primary font-medium text-center text-xl pt-10 '>Loading ...</div>}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}

      </div>



    </div>
  )
}

export default HomePage
