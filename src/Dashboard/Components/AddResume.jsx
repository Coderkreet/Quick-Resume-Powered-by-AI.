import React, { useState } from 'react';
import { BsPlusSquare } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from '../../../Service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AddResume = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
const navigation = useNavigate()

  function onCreate() {
    if (!resumeTitle) return; // Validation to avoid unnecessary requests

    setLoading(true);
    const uuid = uuidv4();
    const data = {
      title: resumeTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    GlobalApi.CreateNewResume(data)
      .then((resp) => {
        if (resp) {
          navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`)
          setLoading(false);
          setIsDialogOpen(false); // Close the dialog after success
        }
      })
      .catch((e) => {
        console.error('Error while creating resume:', e);
        setLoading(false); // Stop loading spinner on error
      });
  }

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <div
        onClick={openDialog}
        className='hover:scale-105 cursor-pointer hover:shadow-purple-500 duration-300 transition-all hover:shadow-2xl rounded-lg text-5xl border-dashed border-blue-900 border-4 py-[10rem] w-[16rem] items-center flex justify-center bg-slate-400'
      >
        <BsPlusSquare />
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[24rem]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Create New Resume</h2>
              <AiOutlineClose 
                onClick={closeDialog} 
                className="text-2xl cursor-pointer"
              />
            </div>
            <div className="mt-4 flex flex-col gap-y-3 w-full">
              <p>Add a title to your Resume</p>
              <div>
                <input 
                  type="text" 
                  onChange={(event) => setResumeTitle(event.target.value)} 
                  value={resumeTitle}
                  className='w-full text-[1.3rem] border-gray-400 p-1 rounded-lg border-2' 
                  placeholder="Enter title here"
                />
              </div>
            </div>
            <div className='flex justify-between p-3'>
              <button 
                onClick={closeDialog} 
                className='w-[6rem] h-[3rem] rounded-xl bg-red-400'>
                Cancel
              </button>
              <button 
                onClick={onCreate} 
                className={`w-[6rem] h-[3rem] rounded-xl ${!resumeTitle || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400'}`} 
                disabled={!resumeTitle || loading}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-[3rem] w-[3rem]">
                    <div className="animate-spin text-purple-500">
                      <BsPlusSquare />
                    </div>
                  </div>
                ) : (
                  <span>Create</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResume;
