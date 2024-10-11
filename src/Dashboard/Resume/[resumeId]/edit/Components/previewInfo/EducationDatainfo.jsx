import React, { useEffect, useState } from 'react';

const EducationDatainfo = ({ resumeinfo }) => {
  // Check if resumeinfo and resumeinfo.education exist
  const infoedu = resumeinfo?.education ?? [];

  return (
    <div>
      <h2 className='text-center font-bold text-sm mb-2'
        style={{ color: `${resumeinfo?.themeColor}` }}
      >
        Education
      </h2>
      <hr
        style={{ borderColor: `${resumeinfo?.themeColor}` }}
      />

      <div>
        {
          infoedu.length > 0 ? (
            infoedu.map((edu, index) => (
              <div key={index} className='my-5'>
                <h2
                style={{ "color": `${resumeinfo?.themeColor}` }}
                className='text-sm font-bold'>{edu.universityName}</h2>
                <h2 className='flex justify-between'>{edu.degree} in {edu?.major}
                <span>{edu.startDate} - {edu.endDate}</span>
                </h2>
                <p className='text-xs my-2'>{edu.description}</p>
              </div>
            ))
          ) : (
            <p>No education details available.</p> // Optional message if there's no education info
          )
        }
      </div>
    </div>
  );
}

export default EducationDatainfo;
