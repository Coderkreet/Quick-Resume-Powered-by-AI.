import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../../../Context/ResumeinfoContext'; // Adjust this path accordingly
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../Service/GlobalApi';
import { RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

const PersonalDetailForm = ({setEnableNext , enableNext}) => {

  const params = useParams();
  const { resumeinfo, setResumeinfo } = useContext(ResumeInfoContext);

const [formdata , setFormdata] = useState()
const [loading , setLoafing] = useState(false)

  useEffect(()=>{
console.log(params);
  },[])


  const HandleChange = (e) => {


    setEnableNext(false)
    const {name,value}=e.target;
    setResumeinfo({
      ...resumeinfo,
      [name]:value
  })
    setFormdata({
      ...formdata,
      [name]:value
  })
  };

  const HandleSubmit = (e) => {
    setLoafing(true)
    const data ={
      data: formdata
    }
    e.preventDefault();
    GlobalApi.UpdateResumeDetail(params?.resumeId,data).then((resp)=>{
      console.log(resp)
      setEnableNext(true)
      setLoafing(false);
      toast.success("Saved")
    },(e)=>{
      console.error('Error while updating resume:', e);
      setLoafing(false);
      setEnableNext(false);
    })

    setEnableNext(true)
  };

  return (
    <div className='p-5 shadow-xl rounded-lg border-t-4 mt-10 border-t-purple-400'>
      <div>
        <h2 className='font-bold text-lg'>Personal Detail</h2>
        <p>Get Started with the basic Information</p>
      </div>

      <form onSubmit={HandleSubmit}>
        <div className='flex flex-col mt-8 flex-wrap gap-y-8'>
          <div className='flex flex-wrap justify-between'>
            <div className='flex gap-x-4'>
              <label htmlFor=''>First Name</label>
              <input
              defaultValue={resumeinfo.firstName}
                type='text'
                name='firstName'
                onChange={HandleChange}
                required
                className='border-purple-400 hover:border-purple-600 border-2 rounded-md'
              />
            </div>
            <div className='flex gap-x-4'>
              <label htmlFor=''>Last Name</label>
              <input
                defaultValue={resumeinfo.lastName}
                type='text'
                name='lastName'
                onChange={HandleChange}
                required
                className='border-purple-400 hover:border-purple-600 border-2 rounded-md'
              />
            </div>
          </div>

          <div className='flex w-full gap-x-4'>
            <label htmlFor=''>Job Title</label>
            <input
                            defaultValue={resumeinfo.jobTitle}

              type='text'
              name='jobTitle'
              onChange={HandleChange}
              required
              className='border-purple-400 w-[89%] hover:border-purple-600 border-2 rounded-md'
            />
          </div>

          <div className='flex w-full gap-x-4'>
            <label htmlFor=''>Address</label>
            <input
            defaultValue={resumeinfo.address}
              type='text'
              name='address'
              onChange={HandleChange}
              required
              className='border-purple-400 w-[89%] hover:border-purple-600 border-2 rounded-md'
            />
          </div>

          <div className='flex flex-wrap justify-between'>
            <div className='flex gap-x-4'>
              <label htmlFor=''>Phone</label>
              <input
              defaultValue={resumeinfo.phone}
                type='text'
                name='phone'
                onChange={HandleChange}
                required
                className='border-purple-400 hover:border-purple-600 border-2 rounded-md'
              />
            </div>
            <div className='flex gap-x-4'>
              <label htmlFor=''>Email</label>
              <input
              defaultValue={resumeinfo.email}
                type='email'
                name='email'
                onChange={HandleChange}
                required
                className='border-purple-400 hover:border-purple-600 border-2 rounded-md'
              />
            </div>
          </div>

          <div className='flex justify-end'>
            <div className='w-[7rem] flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>
              <button type='submit'
              disabled={loading}
              >
                {
                  loading?<RiLoader2Line className='animate-spin'/>:
                  'Save'
                }
                </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailForm;
