import React from 'react';

const SkillsDatainfo = ({ resumeinfo }) => {
  const skillsList = resumeinfo?.skills ?? []; // Default to an empty array if skills is undefined

  return (
    <div>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: `${resumeinfo?.themeColor}` }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: `${resumeinfo?.themeColor}` }} />

      <div className='flex gap-5 flex-wrap'>
        {
          skillsList.length > 0 ? (
            skillsList.map((skill, index) => (
              <div key={index} className='my-2 w-[30%]'>
                <h2 className='text-xs'>{skill.name}</h2>
                <div className='h-2 bg-gray-200 w-[120px]'>
                  <div
                    className='h-2'
                    style={{
                      backgroundColor: `${resumeinfo?.themeColor}`, // Set the color for the skill bar
                      width: `${skill?.rating}%` // Set the width based on skill rating
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No skills available.</p> // Optional fallback message
          )
        }
      </div>
    </div>
  );
};

export default SkillsDatainfo;
