import { useParams, Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";
import ConvertDateFormat from "../lib/util";
import { CalendarDays, CalendarSync, Notebook, MoveLeft, Pencil, SquarePen, Trash2 } from "lucide-react";

const NoteDetailPage = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const note = await api.get(`/notes/${id}`)
        setTitle(note.data.title)
        setContent(note.data.content)
        setCreatedDate(note.data.createdAt)
        setUpdatedDate(note.data.updatedAt)
      } catch (error) {
        toast.error("No such Note exists !")
      }
    }

    fetchNote();
  }, [])


  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete the Note ?")) return

    try {
      await api.delete(`notes/${id}`);
      toast.success("deleted successfully");
      navigate("/")

    } catch (error) {
      toast.error("Failed to Delete the Note ! Try Again later");
    }
  }


  return (
    <div className='min-h-screen'>
      <div className="container mx-auto p-3">
        <div className="card dark-grey p-1 max-w-4xl  mx-auto mt-3">

          <div className="flex justify-between mr-2 mb-4">
            <button  className="btn hover:text-green-400" onClick={()=>{navigate("/")}} >
              <MoveLeft className="size-5 text-green-500 drop-shadow-[0_0_8px_#66cc99] " />
              Go back to Notes
            </button>
          </div>

          <div className="card card-body bg-base-100 ">
            <div className="flex justify-between px-1 mb-4">
              <div className=" text-yellow-400 drop-shadow-[0_0_8px_#facc15]">
                <span className="flex md:text-sm">Created At <CalendarDays className="text-yellow-200 drop-shadow-[0_0_2px_rgba(250,204,21,0.3)] md:text-sm ml-2" /> </span>
                <span>{ConvertDateFormat(createdDate)}</span>
              </div>
              <div className=" text-yellow-400 drop-shadow-[0_0_8px_#facc15]">
                <span className=" flex md:text-sm">Last Updated At <CalendarSync className="text-yellow-200 drop-shadow-[0_0_2px_rgba(250,204,21,0.3)] md:text-sm ml-2" /> </span>
                <span>{ConvertDateFormat(updatedDate)}</span>
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label-text text-lg mb-2 text-green-500 drop-shadow-[0_0_8px_#66cc99] flex"> Title <Pencil className="ml-3 size-5 mt-1" /></label>
              <span className="input input-bordered round_1 flex items-center shadow-[0_0_10px_#67e8f9]">{title}</span>
            </div>
            <div className="form-control ">
              <label className="label-text text-lg mb-2 flex text-green-500 drop-shadow-[0_0_8px_#66cc99]"> Content <Notebook className="ml-3 size-6 mt-1" /></label>
              <p className="textarea input-bordered round_1 shadow-[0_0_10px_#67e8f9] h-80 overflow-auto whitespace-pre-wrap">{content}</p>
            </div>


            <div className="card-actions h-8 justify-between mt-6">
              <button className="group-edit btn btn-s hover:text-red-500 hover:drop-shadow-[0_0_20px_#eb3636] text-lg" onClick={(e) => handleDelete(e)}>
                Delete
                <Trash2 className="size-5 text-[#e87373]  edit-trash " />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
