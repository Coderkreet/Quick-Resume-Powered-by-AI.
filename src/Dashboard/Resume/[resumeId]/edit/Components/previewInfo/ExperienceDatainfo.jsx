import React, { useEffect, useState } from 'react';

const ExperienceDatainfo = ({ resumeinfo }) => {
  const experienceList = resumeinfo?.experience ?? []; // Default to an empty array if experience is undefined

  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: `${resumeinfo?.themeColor}` }}
      >
        Professional Experience
      </h2>
      <hr style={{ "borderColor": `${resumeinfo?.themeColor}` }} />

      {experienceList.length > 0 ? (
        experienceList.map((experience, index) => (
          <div className='my-5' key={index}>
            <h2
             style={{ "color": `${resumeinfo?.themeColor}` }}
            className='text-sm font-bold'>{experience.title}</h2>
            <h2 className='text-[0.8rem] font-semibold'> {experience?.companyName}</h2>
            <h2 className='text-xs flex justify-between'>
              {experience?.city}, {experience?.state}.
              <span>
                {experience?.startDate} To {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </h2>
            {/* <p className='text-xs my-2'>{experience.workSummery}</p> */}

            <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience.workSummery}}/>

          </div>
        ))
      ) : (
        <p>No professional experience available.</p> // Optional fallback message
      )}
    </div>
  );
}

export default ExperienceDatainfo;
