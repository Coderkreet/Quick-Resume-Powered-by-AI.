import React, { useContext, useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ResumeInfoContext } from '../../../../../../Context/ResumeinfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../../../../Service/GlobalApi';
import { toast } from 'react-toastify';
import isEqual from 'lodash/isEqual';

const EducationForm = () => {
  const { resumeinfo, setResumeinfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // Initialize educationList with resumeinfo.education if available, otherwise default
  const [educationList, setEducationList] = useState(
    resumeinfo.education || [
      {
        universityName: '',
        startDate: '',
        endDate: '',
        degree: '',
        major: '',
        description: '',
      },
    ]
  );

  function handleChange(event, index) {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  }

  function AddNewEducation() {
    setEducationList([
      ...educationList,
      {
        universityName: '',
        startDate: '',
        endDate: '',
        degree: '',
        major: '',
        description: '',
      },
    ]);
  }

  function removeEducation() {
    setEducationList(educationList => educationList.slice(0, -1));
  }

  useEffect(() => {
    // Update educationList if resumeinfo.education changes
    if (resumeinfo.education && !isEqual(resumeinfo.education, educationList)) {
      setEducationList(resumeinfo.education);
    }
  }, [resumeinfo.education]);

  useEffect(() => {
    // Only update resumeinfo if educationList has changed
    if (!isEqual(resumeinfo.education, educationList)) {
      setResumeinfo(prev => ({
        ...prev,
        education: educationList,
      }));
    }
  }, [educationList, resumeinfo.education, setResumeinfo]);

  const onSave = () => {
    // Ensure all fields are filled before submitting
    for (const entry of educationList) {
      if (
        !entry.universityName ||
        !entry.startDate ||
        !entry.endDate ||
        !entry.degree ||
        !entry.major ||
        !entry.description
      ) {
        toast.error('All fields must be filled out.');
        return;
      }
    }

    setLoading(true);
    const data = {
      data: {
        education: educationList,
      },
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

  return (
    <div className='p-5 shadow-xl rounded-lg border-t-4 mt-10 border-t-purple-400'>
      <div>
        <h2 className='font-bold text-lg'>Education Detail</h2>
        <p>Add your Education Details</p>
        <div>
          {educationList.map((item, index) => (
            <div key={index}>
              <div className=' '>
                <div className='flex flex-wrap justify-between'>
                  <div className='flex gap-3 items-center'>
                    <label htmlFor=''>University Name </label>
                    <input
                      className='border py-3 border-purple-500 my-5 rounded-lg'
                      name='universityName'
                      value={item.universityName}
                      onChange={e => handleChange(e, index)}
                      type='text'
                    />
                  </div>
                  <div className='flex gap-3 items-center'>
                    <label htmlFor=''>Degree </label>
                    <input
                      className='border py-3 border-purple-500 my-5 rounded-lg'
                      name='degree'
                      value={item.degree}
                      onChange={e => handleChange(e, index)}
                      type='text'
                    />
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <label htmlFor=''>Major </label>
                  <input
                    className='border w-[92%] py-3 border-purple-500 my-5 rounded-lg'
                    name='major'
                    value={item.major}
                    onChange={e => handleChange(e, index)}
                    type='text'
                  />
                </div>
                <div className='flex flex-wrap justify-between'>
                  <div className='flex gap-3 items-center'>
                    <label htmlFor=''>Start Date </label>
                    <input
                      className='border py-3 border-purple-500 my-5 rounded-lg'
                      name='startDate'
                      value={item.startDate}
                      onChange={e => handleChange(e, index)}
                      type='date'
                    />
                  </div>
                  <div className='flex gap-3 items-center'>
                    <label htmlFor=''>End Date </label>
                    <input
                      className='border py-3 border-purple-500 my-5 rounded-lg'
                      name='endDate'
                      value={item.endDate}
                      onChange={e => handleChange(e, index)}
                      type='date'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor=''>Description </label>
                  <div className='relative' data-twe-input-wrapper-init>
                    <textarea
                      name='description'
                      required
                      value={item.description}
                      onChange={e => handleChange(e, index)}
                      className='peer text-xl border-purple-700 rounded-xl block min-h-[auto] w-full border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0'
                      id='exampleFormControlTextarea1'
                      rows='5'
                      style={{ color: 'black' }}
                      placeholder='Your message'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between mt-4'>
            <div className='flex items-center gap-x-5'>
              <button
                onClick={AddNewEducation}
                className='flex gap-x-3 justify-center w-auto p-3 items-center bg-gray-300 text-blue-950 border-gray-600 border rounded-xl h-[2.5rem]'
              >
                + Add More Education
              </button>
              <div
                onClick={removeEducation}
                className='p-2 rounded-full cursor-pointer bg-slate-300'
              >
                <RiDeleteBin6Line className='text-3xl text-red-700' />
              </div>
            </div>
            <button
              onClick={onSave}
              className='w-[7rem] flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
