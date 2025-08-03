import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import UpdatePage from './pages/updatePage.jsx'
import toast from "react-hot-toast"

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>

      <Routes>
        <Route data-theme="forest" path="/" element ={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
        <Route path="/note/update/:id" element={<UpdatePage />} />
      </Routes>

    </div>
  )
}

export default App

//<button className='btn btn-outline btn-accent' onClick={()=>{toast.success('Successfully toasted!')}} >Click me</button>

//npm i lucide-react    ----->  this package is used for various icons

//npm i axios     -----> using this package we can replace fetch API with axios