import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import PreviewSection from '../../Dashboard/Resume/[resumeId]/edit/Components/PreviewSection';
import { ResumeInfoContext } from '../../Context/ResumeinfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../Service/GlobalApi';
import { RWebShare } from 'react-web-share';

const ViewResume = () => {
  const [resumeinfo , setResumeinfo] = useState(null); // Ensure it's null initially
  const { resumeId } = useParams();

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId)
      .then(resp => {
        console.log(resp.data.data);
        setResumeinfo(resp.data.data); // Set resumeInfo with the response data
      })
      .catch(error => {
        console.error("Error fetching resume data: ", error);
      });
  };

  useEffect(() => {
    GetResumeInfo();
  }, []);


  const HandleDownload = ()=>{

    window.print();
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeinfo , setResumeinfo }}>
      <div id='no-print'>
      <Header />
      
      <div className='flex  w-[70%] mx-auto items-center flex-col'>
        <div> 
          <h2 className='text-2xl font-bold'>
            Congratulations 🎉! Your Ultimate AI Generated Resume is Ready!
          </h2>
          <p className='text-gray-400 font-bold'>
            Now you are ready to download your resume, and you can share a unique resume URL with your friends and family.
          </p>
        </div>
        <div className='flex mt-9 mb-5 w-full gap-x-4 justify-between'>
          <button onClick={HandleDownload} className='flex p-5 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>
            Download
          </button>
          <RWebShare
        data={{
          text: "This is my resume ",
          url: "",
          title: resumeinfo?.firstName +" "+ resumeinfo?.lastName+" resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
          <button className='flex p-5 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>
            Share
          </button>
          </RWebShare>
        </div>
        </div>
        </div>
        
        {/* Conditionally render PreviewSection if resumeInfo is available */}
        <div className='' id='print-area'>
          {resumeinfo ? (
            <PreviewSection />
          ) : (
            <div>Loading resume preview...</div> // Loading placeholder
          )}
        </div>
    
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
