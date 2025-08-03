import { Link, useNavigate} from "react-router"
import { Trash2, PenSquare } from "lucide-react"  
import ConvertDateFormat from "../../lib/util.js"
import toast from "react-hot-toast"
import api from "../../lib/axios.js"


function NoteCard({note,setNotes}) {
    const navigate = useNavigate();
    const handleDelete = async(e,id)=>{
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete the Note ?")) return

        try {
            await api.delete(`notes/${id}`);
            setNotes((prev)=>prev.filter(note=>note._id!==id))
            toast.success("deleted successfully");
            
        } catch (error) {
            toast.error("Failed to Delete the Note ! Try Again later");
        }
        
    }

    const updateNote = (e,id)=>{
        try {
            e.preventDefault();
            navigate(`/note/update/${id}`);
        } catch (error) {
            toast.error("Couldn't update at the moment! Try again later")
        }
    }


  return (
    <Link to={`/note/${note._id}`} data-theme="forest" className="group card bg-base-100  hover:shadow-[0_0_12px_4px_#66caa4]  transition-all duration-200 border-t-4 border-solid border-[#66caa4] ">
        <div className="card-body ">
            <h3 className="card-title text-base-content group-hover:drop-shadow-[0_0_10px_#66cc99] group-hover:text-yellow-400 transition-all duration-200 ">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4  ">
                <span className="text-sm text-base-content/60 ">{ConvertDateFormat(note.createdAt)}</span>
                <div className="flex gap-2">
                    <button className="group-edit btn btn-ghost btn-s" onClick={(e)=>updateNote(e,note._id)}>
                        <PenSquare className="size-5 text-green-300 hover:drop-shadow-[0_0_10px_#66cc99] edit-icon "/>    
                    </button>
                    <button className="group-edit btn btn-ghost btn-s " onClick={(e)=>handleDelete(e,note._id)}>
                        <Trash2 className="size-5 text-[#e87373] hover:drop-shadow-[0_0_20px_#eb3636] edit-trash "/>
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard
