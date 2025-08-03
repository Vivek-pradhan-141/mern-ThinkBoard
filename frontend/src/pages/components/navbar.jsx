import { Link } from "react-router"
import {PlusIcon} from "lucide-react"

function Navbar() {
  return (
    <header data-theme="forest" className='bg-base-300 border-b border-base-content/10 border-primary'>
        <div className='mx-auto max-w-6xl px-4 py-4 '>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>ThinkBoard</h1>
                <div className='flex gap-4 items-center '>
                    <Link to={"/create"} className="btn btn-primary">
                        <PlusIcon className="h-5 w-4" />
                        <span className="text font-bold ">New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar

//<header className='bg-base-10 border-b border-base-content/10 '>
//        <div className='mx-auto max-w-6xl px-4 py-4 border-b border-l border-r bg-base-300 border-primary'>