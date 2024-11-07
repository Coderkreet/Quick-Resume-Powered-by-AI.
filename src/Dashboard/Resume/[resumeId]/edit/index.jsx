import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './Components/FormSection'
import PreviewSection from './Components/PreviewSection'
import { ResumeInfoContext } from '../../../../Context/ResumeinfoContext'
import Dummy from '../../../../Data/Dummy'
import GlobalApi from '../../../../../Service/GlobalApi'

const EditResume = () => {
const {resumeId} = useParams()
const [resumeinfo , setResumeinfo] =useState({})
useEffect(()=>{
GetResumeInfo();
},[])



const GetResumeInfo = ()=>{
  GlobalApi.GetResumeById(resumeId).then(reso =>{
    console.log(reso.data.data)
    setResumeinfo(reso.data.data);

  })
}






  return (
    <ResumeInfoContext.Provider value={{resumeinfo,setResumeinfo}} >



<div className='flex w-full  gap-7 p-4 '>
      <div className='w-[50%]'>
        <FormSection/>
      </div>
      <div className='w-[50%]'>
        <PreviewSection/>
      </div>
    </div>
    </ResumeInfoContext.Provider>
    
 
  )
}

export default EditResume
