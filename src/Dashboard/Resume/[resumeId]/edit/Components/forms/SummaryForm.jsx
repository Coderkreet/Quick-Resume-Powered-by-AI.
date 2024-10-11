import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../../../../Context/ResumeinfoContext';
import { RiLoader2Line } from 'react-icons/ri';
import GlobalApi from '../../../../../../../Service/GlobalApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { BsStars } from 'react-icons/bs';
import { AIchatSession } from '../../../../../../../Service/AiModel';

const SummaryForm = ({ setEnableNext, enableNext }) => {
  const params = useParams();
  const { resumeinfo, setResumeinfo } = useContext(ResumeInfoContext);

  const [summery, setsummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState(''); // New state for AI-generated summary

  useEffect(() => {
    if (summery) {
      setResumeinfo({
        ...resumeinfo,
        summery: summery,
      });
    }
  }, [summery]);

  const HandleSubmitForm = (e) => {
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };
    e.preventDefault();
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        setEnableNext(true);
        setLoading(false);
        toast.success('Saved');
      })
      .catch((e) => {
        console.error('Error while updating resume:', e.response?.data || e.message);
        setLoading(false);
        setEnableNext(false);
      });
  };

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const prompt = `Job Title: ${resumeinfo?.jobTitle}, based on the job title, provide a summary within 2-3 lines.`;
    console.log(prompt);

    try {
      const result = await AIchatSession.sendMessage(prompt);
      const aiSummary = await result.response.text(); // Get the response text
      console.log('AI Generated Summary:', aiSummary); // Only log the response
      setAiGeneratedSummary(aiSummary); // Store the response in state
      setsummary(aiSummary); // Optionally update the 'summery' state with AI-generated summary
      setLoading(false);
    } catch (error) {
      console.error('Error generating summary from AI:', error);
      setLoading(false);
    }
  };

  return (
    <div className='p-5 shadow-xl rounded-lg border-t-4 mt-10 border-t-purple-400'>
      <div>
        <h2 className='font-bold text-lg'>Summary Detail</h2>
        <p>Add Summary for your job title</p>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <label className='text-3xl font-bold' htmlFor=''>
          Add Summary
        </label>

        <button
          onClick={() => {
            generateSummaryFromAI();
          }}
          type='button'
          className='p-2 flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'
        >
          <BsStars className='text-2xl' />
          Generate from AI
        </button>
      </div>

      <form onSubmit={HandleSubmitForm}>
        <div className='relative  my-10 mb-3' data-twe-input-wrapper-init>
          <textarea
          defaultValue={aiGeneratedSummary}
            required
            value={summery} // Bind the summary state to the textarea value
            onChange={(e) => {
              setsummary(e.target.value);
            }}
            className='peer  text-xl border-purple-700 rounded-xl  block min-h-[auto] w-full  border-2 bg-transparent px-3  py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0'
            id='exampleFormControlTextarea1'
            rows='7'
            style={{ color: 'black' }}
            placeholder='Your message'
          ></textarea>
        </div>

        <div className='flex justify-end'>
          <div className='w-[7rem] flex gap-x-3 justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'>
            <button type='submit' disabled={loading}>
              {loading ? <RiLoader2Line className='animate-spin' /> : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SummaryForm;
