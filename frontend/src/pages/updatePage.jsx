import { RectangleEllipsis, MoveLeft, SquarePen, Pencil, Notebook, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";


function updatePage() {
  const id = useParams().id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, isSaving] = useState(false)
  const navigate= useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await api.get(`/notes/${id}`)
        setTitle(note.data.title)
        setContent(note.data.content)

      } catch (error) {
        toast.error("Error in Fetching the Current Note")
      }
    }

    fetchNote();
  }, [])

  const updateNote = async (e) => {
    e.preventDefault();

    if(!title.trim() || !content.trim()){
      toast.error("Please fill both title and Content")
      return;
    }

    if (!window.confirm("Do you want to Update ?")) return;

    try {
      await api.put(`/notes/${id}`, { title, content })
      isSaving(true)
      toast.success("Note Updated Successfully !!!")
    } catch (error) {
      toast.error("Note Couldn't Updated at the moment! Try again later")
    }
    finally {
      isSaving(false)
    }

  }

  const handleDelete = async(e)=>{
    e.preventDefault();

        if(!window.confirm("Are you sure you want to delete the Note ?")) return

        try {
            await api.delete(`notes/${id}`);
            toast.success("deleted successfully");
            navigate("/")
            
        } catch (error) {
            toast.error("Failed to Delete the Note ! Try Again later");
        }
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto dark-grey">

          <div className="flex justify-between mr-2 mb-4">
            <Link to={"http://localhost:5173"} className="btn hover:text-green-400">
              <MoveLeft className="size-5 text-green-500 drop-shadow-[0_0_8px_#66cc99] " />
              Go back to Notes
            </Link>
          </div>

          <div className="card bg-base-100 mb-3">
            <div className="card-body ">
              <div className="flex gap-6 px-4 mb-4  justify-between " >
                <h1 className="text-xl text-yellow-400 drop-shadow-[0_0_8px_#facc15]">Update Your Note</h1>
                <RectangleEllipsis className="size-9 text-yellow-400 drop-shadow-[0_0_8px_#facc15] " />
              </div>
              <form onSubmit={updateNote} className="px-4">
                <div className="form-control mb-8">
                  <label className="label-text text-lg">
                    <div className="form-control">
                      <label className="label-text text-lg text-green-500 drop-shadow-[0_0_8px_#66cc99] flex"> Title <Pencil className="ml-3 size-5 mt-1" /></label>
                    </div>
                  </label>
                  <input type="text"
                    className="input input-bordered round_1 mt-2 shadow-[0_0_10px_#67e8f9]"
                    value={title}
                    disabled={saving}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label-text text-lg">
                    <div className="form-control ">
                      <label className="label-text text-lg mb-2 flex text-green-500 drop-shadow-[0_0_8px_#66cc99]"> Content <Notebook className="ml-3 size-6 mt-1" /></label>
                    </div>
                  </label>
                  <textarea type="text"
                    className="textarea textarea-bordered round_1 mt-2 h-64 overflow-y-auto resize-none whitespace-pre-wrap shadow-[0_0_10px_#67e8f9]"
                    value={content}
                    disabled={saving}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions h-8 justify-between mt-6">
                  <button className="group-edit btn btn-s hover:text-red-500 hover:drop-shadow-[0_0_20px_#eb3636] text-lg" onClick={(e)=>handleDelete(e)}>
                    Delete
                    <Trash2 className="size-5 text-[#e87373]  edit-trash "/>
                  </button>
                  <button type="submit" className="btn hover:drop-shadow-[0_0_8px_#66ff99] hover:text-green-400 text-lg" disabled={saving}>
                    <SquarePen className="text-green-500 drop-shadow-[0_0_8px_#66cc99] size-5 " />
                    {saving ? "Saving ..." : "Update"}
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

export default updatePage
