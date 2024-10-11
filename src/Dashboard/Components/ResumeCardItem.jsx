import React from 'react'
import { PiNotebookBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

const ResumeCardItem = (resume) => {
  return (
    <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
      <div className='hover:scale-105 cursor-pointer hover:shadow-purple-500 duration-300 transition-all hover:shadow-2xl rounded-lg text-5xl border-2 border-blue-900 border-4 py-[10rem] w-[16rem] items-center flex justify-center bg-slate-400'>
        <PiNotebookBold/>
      </div>
      <h2 className=' text-center my-1'> {resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem
