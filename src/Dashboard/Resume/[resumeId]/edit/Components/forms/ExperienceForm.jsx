import React, { useContext, useEffect, useState } from 'react'
import RichFormEdittor from './RichFormEdittor'
import { FiDelete } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ResumeInfoContext } from '../../../../../../Context/ResumeinfoContext'


const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}
function ExperienceForm() {
  const { resumeinfo, setResumeinfo } = useContext(ResumeInfoContext);
  const [experienceList,setexperiencelist] = useState([])


const AddNewExperience =()=>{
  setexperiencelist([...experienceList, {
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',
}])
}

const removeExperience =()=>{
  setexperiencelist(experienceList => experienceList.slice(0,-1))
}


function HandleChange(index , event) {  
  const newEntries = experienceList.slice();
  const{name ,value} =event.target;
  newEntries[index][name]=value;
  setexperiencelist(newEntries); 
}

const HandleRichFormEdittor=(e,name,index)=>{
  const newEntries = experienceList.slice();
  newEntries[index][name]=e.target.value;
setexperiencelist(newEntries);

}

useEffect(()=>{
console.log(experienceList)
  setResumeinfo({
    ...resumeinfo,
    experience:experienceList

  })


},[experienceList])

  return (
    <div>
  

     
        <div className='p-5 shadow-lg rounded-lg border-t-purple-400 border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
    <div>
      {
        experienceList.map((item, index)=>(
          <div key={index} className=''>
            <div className='gird grid-cols-2 gap-3'>
              <div className='flex gap-3 items-center'>
              <div className='flex gap-3 items-center'>
              <label htmlFor="">Position title</label>
              <input className='border py-3  my-5 rounded-lg' name='title' onChange={()=>{HandleChange(index , event)}} />
            </div>
            <div className='flex gap-3 items-center'>
              <label htmlFor="">Company Name </label>
              <input className='border py-3  my-5 rounded-lg' name='companyName' onChange={()=>{HandleChange(index , event)}} />
            </div>
              </div>

            <div className='flex gap-3 items-center'>
              <label htmlFor=""> City</label>
              <input className='border py-3 w-[80%] my-5 rounded-lg' name='city' onChange={()=>{HandleChange(index , event)}} />
            </div>
            <div className='flex gap-3 items-center'>
              <label htmlFor=""> State</label>
              <input className='border py-3 w-[80%] my-5 rounded-lg' name='state' onChange={()=>{HandleChange(index , event)}} />
            </div>
            <div className='flex  justify-between'>
            <div className='flex w-[50%] gap-3 items-center'>
              <label htmlFor=""> Start Date</label>
              <input type='date' className='border py-3   w-[70%] my-5 rounded-lg' name='startDate' onChange={()=>{HandleChange(index , event)}} />
            </div>
            <div className='flex gap-3 w-[50%] items-center'>
              <label htmlFor=""> End Date</label>
              <input type='date' className='border py-3  w-[70%] my-5 rounded-lg' name='endDate' onChange={()=>{HandleChange(index , event)}} />
            </div>
            </div>

            <div>
      <RichFormEdittor
      index ={index}
      onRichFormEdittor ={(e)=>{
        HandleRichFormEdittor(e ,'workSummery',index)
      }}
      />
    </div>
            </div>
          </div>

        )
      
      )
      }
    </div>



    <div className='flex justify-between mt-4'>
      <div className='flex items-center gap-x-5'>
      <button onClick={AddNewExperience} className=' flex gap-x-3 justify-center w-auto p-3 items-center bg-gray-300 text-blue-950 border-gray-600 border rounded-xl h-[2.5rem]'>+ Add More Experience</button>
      <div onClick={removeExperience} className='p-2 rounded-full cursor-pointer bg-slate-300'>
        <RiDeleteBin6Line className='text-3xl   text-red-700'/>
      </div>
      </div>
      <button className='w-[7rem] flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>Save</button>
    </div>




    </div>
     
    </div>
  )
}

export default ExperienceForm
