import { useState } from "react"
import { Link, useNavigate } from "react-router";
import { MoveLeft, FilePlus, SquarePen, Pencil, Notebook, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";



const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All Fields are Reqired !!!")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes",{title,content})
      toast.success("Note created Successfully !")
      navigate("/")
    } 
    catch (error) {
      toast.error("Failed to create note")
      setLoading(false)
    }
    finally{
      setLoading(false)
    }

  }

  

  return (
    <div className='min-h-screen'>
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-3xl mx-auto dark-grey">
          <div className="flex justify-between mr-2">
            <Link to={"http://localhost:5173"} className="btn hover:text-green-400">
              <MoveLeft className="size-5 text-green-500 drop-shadow-[0_0_8px_#66cc99] " />
              Go back to Notes
            </Link>
            <FilePlus className="size-9 text-yellow-400 drop-shadow-[0_0_8px_#facc15] mt-2" />
          </div>
          <div className="card bg-base-100 mt-4">
            <div className="card-body">
              <h3 className="card-title text-2xl mb-4 text-yellow-400 drop-shadow-[0_0_8px_#facc15]">Create New Note</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-8">
                  <label className="label-text text-lg mb-2">
                    <div className="form-control">
                      <label className="label-text text-lg text-green-500 drop-shadow-[0_0_8px_#66cc99] flex"> Title <Pencil className="ml-3 size-5 mt-1" /></label>
                    </div>
                  </label>
                  <input type="text"
                    placeholder="Note Title"
                    className="input input-bordered round_1  shadow-[0_0_10px_#67e8f9]  "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label-text text-lg">
                    <div className="form-control ">
                      <label className="label-text text-lg mb-2 flex text-green-500 drop-shadow-[0_0_8px_#66cc99]"> Content <Notebook className="ml-3 size-6 mt-1" /></label>
                    </div>
                  </label>
                  <textarea
                    className="textarea textarea-bordered round_1 mt-2 h-64 overflow-y-auto resize-none whitespace-pre-wrap shadow-[0_0_10px_#67e8f9] "
                    placeholder="Enter your content ..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className="card-actions h-7 mt-8 justify-end  ">
                  <button type="submit" className="btn hover:drop-shadow-[0_0_8px_#facc15] hover:text-green-400 text-lg" disabled={loading}>
                    <SquarePen className="text-green-500 drop-shadow-[0_0_8px_#66cc99]" />
                    {loading? "Creating ...":"Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
