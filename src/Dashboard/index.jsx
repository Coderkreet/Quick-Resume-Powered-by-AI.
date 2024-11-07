import React, { useEffect, useState } from 'react'
import AddResume from './Components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../Service/GlobalApi';
import ResumeCardItem from './Components/ResumeCardItem';

const Dashboard = () => {
const {user} = useUser();
const [resumeList , setResumeList] = useState([])

  const getResumeList = ()=>{
    GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress).then
    (resp =>{
      setResumeList(resp.data.data) // Update the resume list state with the response data
      // Do something with the resume list here
    })
  }

  useEffect(()=>{
    user&&getResumeList();
  },[user])
  return (
    <div>
<div className='pl-10 mt-8  '>
  <h1 className='text-4xl font-bold'>My resume</h1>
  <p className='font-bold mt-4  text-gray-500'>Lets create Resume with Ai For Your New Job Role</p>
  <div className='flex flex-wrap w-[80%] justify-center items-center gap-x-10'>
  <AddResume />
  {
    resumeList.length>0 && resumeList.map((resume,index)=>{
      return <ResumeCardItem key={index} referenceData={getResumeList} resume={resume} />
    })
  }
</div>
</div>


    </div>
  )
}

export default Dashboard
