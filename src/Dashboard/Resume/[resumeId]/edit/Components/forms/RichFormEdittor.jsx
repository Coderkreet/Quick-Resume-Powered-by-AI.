import React, { useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { 
  BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, 
  BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar 
} from 'react-simple-wysiwyg';
import { AIchatSession } from '../../../../../../../Service/AiModel';

const RichFormEdittor = ({ onRichFormEdittor }) => {
  const [value, setValue] = useState(''); // Ensure two-way binding with editor
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] = useState(''); // Store AI-generated summary

  const generateSummaryFromAI = async () => {
    setLoading(true);
    const prompt = `Position title: Full Stack Developer, based on the position title, give me 5-7 bullet points for my experience in resume in HTML format.only Bullet points and nothing Extra responce`;
    console.log(prompt);

    try {
      const result = await AIchatSession.sendMessage(prompt);
      let aiSummary = await result.response.text(); // Get the AI-generated response text
      aiSummary = aiSummary.replace(/```html/g, '').replace(/```/g, '').trim();
      console.log('AI Generated Summary:', aiSummary); // Log the response

      setAiGeneratedSummary(aiSummary); // Store in state
      setValue(aiSummary); // Set the AI summary as the editor's value
      onRichFormEdittor({ target: { value: aiSummary } }); // Pass the AI summary to the parent
      setLoading(false);
    } catch (error) {
      console.error('Error generating summary from AI:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex mb-6 justify-between items-center mt-6'>
        <label className='text-3xl font-bold'>Summary</label>

        <button
          onClick={generateSummaryFromAI} // Ensure the function is called correctly
          type='button'
          className='p-2 flex justify-center items-center bg-purple-500 text-white rounded-xl h-[2.5rem]'
        >
          <BsStars className='text-2xl' />
          {loading ? 'Generating...' : 'Generate from AI'}
        </button>
      </div>

      <EditorProvider>
        <Editor 
          value={value} // Bind the editor value
          onChange={(e) => {
            setValue(e.target.value); // Update the state on change
            onRichFormEdittor(e); // Call the parent handler
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichFormEdittor;
