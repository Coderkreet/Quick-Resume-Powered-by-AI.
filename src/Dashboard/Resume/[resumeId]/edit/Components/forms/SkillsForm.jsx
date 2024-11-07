import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ResumeInfoContext } from '../../../../../../Context/ResumeinfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../../../../Service/GlobalApi'
import { toast } from 'react-toastify'

const SkillsForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading , setLoading] = useState(false);


const [skillList,setSkillList] = useState([
  {
    name:'',
    rating:0
  }
])

const HandleChange  = (index , name , value)=>{
  const newEntries = skillList.slice();
  newEntries[index][name]=value;
  setSkillList(newEntries); 
}

const AddNewSkills = ()=>{

  setSkillList([...skillList,{
    name:'',
    rating:0
  }])

}

const removeSkills = ()=>{

  setSkillList(skillList => skillList.slice(0,-1))


}

const onSave = () => {
  // Ensure all fields are filled before submitting
  for (const entry of skillList) {
    if (!entry.rating || !entry.name) {
      toast.error("All fields must be filled out.");
      return;
    }
  }

  setLoading(true);
  const data = {
    data: {
      skills: skillList
    }
  };

  console.log('Data being sent:', data);

  GlobalApi.UpdateResumeDetail(params.resumeId, data)
    .then(res => {
      console.log(res);
      setLoading(false);
      toast.success('Saved');
    })
    .catch(e => {
      console.error('Error while updating resume:', e.response?.data || e.message);
      setLoading(false);
      toast.error('Failed to save');
    });
};

useEffect(()=>{
  resumeinfo&&setSkillList(resumeinfo?.skills)
},[])

useEffect(()=>{
  setResumeinfo({
    ...resumeinfo,
    skills:skillList
  })
},[skillList])

  return (
    <div className='p-5 shadow-xl rounded-lg border-t-4 mt-10 border-t-purple-400'>
    <div>
      <h2 className='font-bold text-lg'>Skill</h2>
      <p>Add your Professional Skills</p>

    <div>
      {
        skillList.map((item , index)=>(
          <div key={index} className='flex border-2 px-4 mt-2 rounded-2xl border-gray-300  justify-between items-center'>
            <div className='flex items-center gap-x-4'>
              <label  className='font-bold text-sm' htmlFor="">Skill Name </label>
              <input 
              defaultValue={item.name}
              onChange={(e)=> HandleChange(index , 'name' , e.target.value)} type="text" className='border py-3  border-purple-500  my-5 rounded-lg' />
            </div>
            <Rating style={{ maxWidth: 150 }} value={item.rating} onChange={(v)=> HandleChange(index , 'rating' , v)} />
          </div>
        ))
      }
    </div>
    <div className='flex justify-between mt-4'>
      <div className='flex items-center gap-x-5'>
      <button onClick={AddNewSkills} className=' flex gap-x-3 justify-center w-auto p-3 items-center bg-gray-300 text-blue-950 border-gray-600 border rounded-xl h-[2.5rem]'>+ Add More Skills</button>
      <div onClick={removeSkills} className='p-2 rounded-full cursor-pointer bg-slate-300'>
        <RiDeleteBin6Line className='text-3xl   text-red-700'/>
      </div>
      </div>
      <button onClick={()=> onSave()} className='w-[7rem] flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>Save</button>
    </div>


      </div>
    </div>
  )
}

export default SkillsForm
