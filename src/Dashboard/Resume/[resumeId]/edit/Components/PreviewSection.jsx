import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../../../Context/ResumeinfoContext'
import PersonalDetailPreview from './previewInfo/PersonalDetailPreview';
import Summaryinfo from './previewInfo/Summaryinfo';
import ExperienceDatainfo from './previewInfo/ExperienceDatainfo';
import EducationDatainfo from './previewInfo/EducationDatainfo';
import SkillsDatainfo from './previewInfo/SkillsDatainfo';

const PreviewSection = () => {
const{resumeinfo , setResumeinfo} = useContext(ResumeInfoContext);

  return (
    <div
    style={{borderColor :`${resumeinfo?.themeColor}`}}
    className='shadow-lg h-full p-14 border-t-[20px]'>
      {/* Parsnol data */}
        <PersonalDetailPreview resumeinfo = {resumeinfo}/>

      {/* summary */}
      <Summaryinfo  resumeinfo = {resumeinfo} />
      {/* Education */}
      <EducationDatainfo resumeinfo={resumeinfo}/>
      {/* Experience */}
      <ExperienceDatainfo  resumeinfo ={resumeinfo}/>
      {/* Skill */}
      <SkillsDatainfo resumeinfo={resumeinfo} />
    </div>
  )
}

export default PreviewSection
