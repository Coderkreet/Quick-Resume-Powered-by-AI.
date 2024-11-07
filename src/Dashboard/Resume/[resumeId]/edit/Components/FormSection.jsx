import React, { useState } from 'react'
import PersonalDetailForm from './forms/PersonalDetailForm'
import SummaryForm from './forms/SummaryForm'
import EducationForm from './forms/EducationForm'
import ExperienceForm from './forms/ExperienceForm'
import SkillsForm from './forms/SkillsForm'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FiBox } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { CgHome } from 'react-icons/cg'
import { BiHomeAlt2 } from 'react-icons/bi'
import ThemeColor from './ThemeColor'

const FormSection = () => {
const [ActiveFormIndex, setActiveFormIndex] = useState(1)
const [enableNext , setEnableNext] = useState(false)
const {resumeId} = useParams();

  return (
    <div>
<div className='flex items-center justify-between'>

  <div className='flex items-center gap-7'>
   <ThemeColor/>
  </div>
    <div className='flex  gap-x-6 justify-end'>
      {
        ActiveFormIndex >1&& (
            <button onClick={()=>{setActiveFormIndex(ActiveFormIndex-1)}}  className='w-[7rem] flex gap-x-3  justify-center items-center bg-purple-500 text-white  rounded-xl h-[2.5rem]'> <BsArrowLeft/>Previous</button>
        )         
      }
      
        <button disabled={!enableNext} 
    
        onClick={()=>{setActiveFormIndex(ActiveFormIndex+1)}}
         className={`w-[7rem] ${!enableNext&&'bg-purple-400'} flex gap-x-3 justify-center items-center bg-purple-500 text-white  rounded-xl h-[2.5rem]`}>Next <BsArrowRight/></button>
    </div>
</div>

{/* personal Details */}
  {

ActiveFormIndex ===1 ? <PersonalDetailForm  enableNext ={enableNext} setEnableNext ={setEnableNext} /> : null
  }

    

{/* summary */}
{
  ActiveFormIndex ===2? <SummaryForm  enableNext ={enableNext} setEnableNext ={setEnableNext} /> : null
  
}

{/* Education */}
{

  ActiveFormIndex ===3? <EducationForm  enableNext ={enableNext} setEnableNext ={setEnableNext} /> : null
}

{/* Experience */}

{
  ActiveFormIndex ===4? <ExperienceForm  enableNext ={enableNext} setEnableNext ={setEnableNext} /> : null
}

{/* Skills */}
{
  ActiveFormIndex ===5? <SkillsForm  enableNext ={enableNext} setEnableNext ={setEnableNext} /> : null
}
{
 ActiveFormIndex ===6 ? <Navigate to={'/my-resume/'+resumeId+'/view'} />:null

}
      
    </div>
  )
}

export default FormSection
